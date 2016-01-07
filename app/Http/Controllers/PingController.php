<?php

namespace App\Http\Controllers;

use App\Ping;
use \Validator;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PingController extends Controller
{
    public function index()
    {
        return view('pings', [
            'pings' => Ping::orderBy('created_at', 'asc')->get()
        ]);
    }

}
