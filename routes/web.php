<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DataImportController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('notes', function () {
        return Inertia::render('dashboard_menus/notes');
    })->name('notes');
    Route::get('mood', function () {
        return Inertia::render('mood');
    })->name('mood');
    Route::post('mood/sync', [DataImportController::class, 'importDaylio'])
        ->name('mood.sync');
});

require __DIR__ . '/settings.php';