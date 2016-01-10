<?php

namespace App\Listeners;

use App\Events\PingFailure;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyPeopleAboutPingFailure
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  PingFailure  $event
     * @return void
     */
    public function handle(PingFailure $event)
    {
        dd($event->ping->name);
    }
}
