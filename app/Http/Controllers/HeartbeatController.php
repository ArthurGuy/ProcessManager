<?php

namespace App\Http\Controllers;

use App\Ping;
use App\Http\Requests;
use Illuminate\Http\Request;

class HeartbeatController extends Controller
{

    public function beat($name)
    {
        $ping = Ping::findOrNewFromName($name);

        $ping->recordPingUpdate();

        return response('', 204);
    }
}
