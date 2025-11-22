<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'source',
        'type',
        'started_at',
        'ended_at',
        'value',
        'unit',
        'raw_payload',
        'inline_metrics',
    ];

    protected $casts = [
        'started_at'  => 'datetime',
        'ended_at'    => 'datetime',
        'inline_metrics' => 'array',
        'raw_payload' => 'array',
    ];
}
