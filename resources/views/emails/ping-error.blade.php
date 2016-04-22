Hi,

Nothing has been heard from ping {{ $ping->name }} since {{ (new \Carbon\Carbon($ping->last_ping))->toDateTimeString() }}.

Tags: {{ implode(', ', $ping->tags) }}

{{ url('pings') }}