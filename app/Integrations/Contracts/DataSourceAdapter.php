<?php

namespace App\Integrations\Contracts;

use Illuminate\Support\Collection;

interface DataSourceAdapter
{
    /**
     * Return a collection of normalized events for the given user.
     * Each item should be an array ready to feed into UserEvent::create().
     */
    public function fetchNormalizedEvents(int $userId): Collection;
}