<?php

namespace App\Integrations\Adapters;

use App\Integrations\Contracts\DataSourceAdapter;
use Illuminate\Support\Collection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class DaylioAdapter implements DataSourceAdapter
{
    private const CATEGORY_ORDER = [
        'word_finding',
        'anger',
        'negative_thoughts',
        'concentration',
        'stress',
        'socialization',
        'alcohol',
    ];

    private string $csvPath;

    public function __construct(
        ?string $csvPath = null,
    ) {
        // Default path for now – you can change this later.'
        $this->csvPath = $csvPath ?? storage_path('app\daylio_export_2025_11_22.csv');
    }

    public function fetchNormalizedEvents(int $userId): Collection
    {
        $rows = $this->readCsv();

        return collect($rows)
            ->map(function (array $row) use ($userId) {
                return $this->mapRowToEvent($row, $userId);
            })
            ->filter(); // drop nulls / invalid rows
    }

    /**
     * Read CSV into an array of associative arrays.
     */
    private function readCsv(): array
    {
        if (! file_exists($this->csvPath)) {
            // Later you can throw an exception; for now, just return empty.
            return [];
        }
        
        $handle = fopen($this->csvPath, 'r');
        if ($handle === false) {
            return [];
        }

        $header = null;
        $rows   = [];

        while (($data = fgetcsv($handle, 0, ',')) !== false) {
            if ($header === null) {
                // Strip UTF-8 BOM from first header cell
                if (isset($data[0])) {
                    $data[0] = preg_replace('/^\xEF\xBB\xBF/', '', $data[0]);
                }

                $header = array_map('trim', $data);
                continue;
            }

            // Map header → row values
            $row = [];
            foreach ($header as $index => $columnName) {
                $row[$columnName] = $data[$index] ?? null;
            }

            $rows[] = $row;
        }

        fclose($handle);

        return $rows;
    }

    /**
     * Map a single Daylio CSV row → canonical user_events structure.
     *
     * You *must* adjust the column names here to match your CSV header.
     */
    private function mapRowToEvent(array $row, int $userId): ?array
    {
        // Guessing column names – fix these once you see the actual CSV:
        $date      = $row['full_date'] ?? $row['date'] ?? null;
        $time      = $row['time'] ?? '00:00';
        $moodLabel = $row['mood'] ?? $row['rating'] ?? null;

        if (! $date || ! $moodLabel) {
            return null; // skip malformed rows
        }
        
        $startedAt = $this->parseDateTime($date, $time);
        if (! $startedAt) {
            return null;
        }

        $moodScore = $this->mapMoodLabelToScore($moodLabel);
        if ($moodScore === null) {
            return null;
        }

        $cutoff = Carbon::parse('2025-10-24');

        $rawMetrics = $row['activities'] ?? null;

        
        if ($startedAt->lessThan($cutoff)) {
            $inlineMetrics = null; 
        } else {
            $inlineMetrics = $this->parseInlineMetrics($rawMetrics);
        }

        return [
            'user_id'     => $userId,
            'source'      => 'daylio',
            'type'        => 'mood',
            'started_at'  => $startedAt,
            'ended_at'    => null,
            'value'       => $moodScore,
            'unit'        => '1-5',
            'inline_metrics' => $inlineMetrics,
            'raw_payload' => $row,
        ];
    }

    /**
     * Map Daylio’s mood text to a numeric score.
     * Adjust this to match your moods.
     */
    private function mapMoodLabelToScore(string $label): ?int
    {
        $label = mb_strtolower(trim($label));

        return match ($label) {
            'awful', 'forfærdeligt' => 1,
            'bad', 'dårligt'  => 2,
            'meh', 'ok', 'okay' => 3,
            'chill' => 4,
            'banger dag', 'great' => 5,
            default => null,
        };
    }

    /**
     * Parse date + time into a Carbon instance.
     * Tweak formats to match your CSV.
     */
    private function parseDateTime(string $date, string $time): ?Carbon
    {
        $dateTimeString = trim($date . ' ' . $time);

        $formats = [
            'Y-m-d H:i',
            'Y-m-d H:i:s',
            'Y-m-d H.i',
            'd.m.Y H:i',
            'd.m.Y H:i:s',
            'd.m.Y H.i',
        ];

        foreach ($formats as $format) {
            try {
                return Carbon::createFromFormat($format, $dateTimeString);
            } catch (\Throwable $e) {
                // Log::warning('Failed to parse datetime', [
                //     'format' => $format,
                //     'input'  => $dateTimeString,
                //     'error'  => $e->getMessage(),
                // ]);
            }
        }

        return null;
    }
    
    private function parseInlineMetrics(?string $raw): ?array
    {
        if ($raw === null || trim($raw) === '') {
            return [];
        }

        $segments = array_map('trim', explode('|', $raw));
        $result   = [];

        $startIndex    = 1;                          // skip 1st element
        $numCategories = \count(self::CATEGORY_ORDER);

        for ($j = 0; $j < $numCategories; $j++) {
            $segIndex = $startIndex + $j;

            if (! isset($segments[$segIndex])) {
                return null; 
            }

            $segment = $segments[$segIndex];

            if (! preg_match('/^(\d+)\s*:/', $segment, $match)) {
                $value = null;
            } else {
                $value = (int) $match[1];
            }

            $category = self::CATEGORY_ORDER[$j];    // j = 0..N-1
            $result[$category] = $value;
        }

        return $result;
    }
}