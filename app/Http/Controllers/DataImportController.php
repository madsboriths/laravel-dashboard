<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Integrations\Adapters\DaylioAdapter;
use App\Models\UserEvent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DataImportController extends Controller
{

    /**
     * Import Daylio data from CSV into user_events.
    */
    public function importDaylio(Request $request, DaylioAdapter $adapter): RedirectResponse
    {
        // 2025-10-26 The date i started logging speaking ability, mental load, stress etc. from 1-4 
        Log::info("DaylioController entered!");

        $user = $request->user();

        //TODO : learn how and why the adapter gets passed in 
        // Read and normalize events from Daylio CSV
        $events = $adapter->fetchNormalizedEvents($user->id);

        Log::info('sample events', [
            'events' => $events
                ->filter(fn ($e) => $e['started_at'] >= '2025-10-24')
                ->take(5)
                ->toArray(),
        ]);

        // TODO : Learn what is global namespaces, and the purpose of using backslash/when to use it.
        // Log::info(message: 'events count', ['count' => \count($events)]);

        // 2) Store them in the DB, updating existing ones instead of duplicating
        foreach ($events as $event) {
            UserEvent::updateOrCreate(
                [
                    'user_id'    => $event['user_id'],
                    'source'     => $event['source'],
                    'type'       => $event['type'],
                    'started_at' => $event['started_at'],
                ],
                $event
            );
        }

        return back()->with('status', 'Daylio data imported.');
    }
}