<?php

namespace App\Http\Controllers;

use App\Models\UserEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class MoodChartController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        Log::info("yoo");

        // Get all mood events for this user, ordered by date
        $events = UserEvent::query()
            ->where('user_id', $user->id)
            ->where('source', 'daylio')
            ->orderBy('started_at')
            ->get(['started_at', 'value']);

        Log::info("events: " . $events->toJson());

        // Shape into [{ date: 'YYYY-MM-DD', mood: 3 }, ...]
        $chartData = $events->map(function ($e) {
            return [
                'date' => $e->started_at->toDateString(),
                'mood' => $e->value,
            ];
        })->values()->all();

        Log::info("chartData: " . json_encode($chartData));

        return Inertia::render('mood', [
            'chartData' => $chartData,
        ]);
    }
}