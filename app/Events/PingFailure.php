<?php

namespace App\Events;

use App\Events\Event;
use App\Ping;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PingFailure extends Event
{
    use SerializesModels;
    /**
     * @var Ping
     */
    public $ping;

    /**
     * Create a new event instance.
     */
    public function __construct(Ping $ping)
    {
        $this->ping = $ping;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
