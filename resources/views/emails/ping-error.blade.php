Hi,

Nothing has been heard from ping {{ $ping->name }} since {{ (new \Carbon\Carbon($ping->last_ping))->toDateTimeString() }}.

Description: {{ $ping->description }}
Tags: {{ implode(', ', $ping->tags) }}
