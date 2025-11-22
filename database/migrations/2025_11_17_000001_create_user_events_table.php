<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('source');        // 'garmin', 'daylio', ...
            $table->string('type');          // 'run', 'mood', 'sleep', ...
            $table->timestamp('started_at');
            $table->timestamp('ended_at')->nullable();

            $table->double('value')->nullable(); 
            $table->string('unit')->nullable();  

            $table->json('inline_metrics')->nullable();
            $table->json('raw_payload')->nullable(); 

            $table->timestamps();

            // Normal index (optional but helpful)
            $table->index(['user_id', 'source', 'type', 'started_at']);

            // Uniqueness guarantee (no duplicate events for same identity)
            $table->unique(
                ['user_id', 'source', 'type', 'started_at'],
                'user_events_identity_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_events');
    }
};