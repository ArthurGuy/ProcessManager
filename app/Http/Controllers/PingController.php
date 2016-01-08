<?php

namespace App\Http\Controllers;

use \Auth;
use App\Ping;
use \Validator;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PingController extends Controller
{
    public function index(Request $request)
    {
        if ($request->wantsJson()) {
            return Ping::orderBy('created_at', 'asc')->get();
        }

        return view('pings');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return redirect('/pings')
                ->withInput()
                ->withErrors($validator);
        }

        $ping = $this->createDefaultPing($request->get('name'), false, Auth::id());

        return redirect('/pings');
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|max:255',
            'description' => 'max:255',
            'tags'        => 'max:255',
        ]);

        if ($validator->fails()) {
            return response($validator->errors()->all(), 422);
        }

        $ping = Ping::findOrFail($id);

        $ping->name        = $request->get('name');
        $ping->description = $request->get('description');
        $ping->tags        = $request->get('tags');

        $ping->updated_by = Auth::id();

        $ping->save();

        return $ping;
    }

    public function destroy(Request $request, $id)
    {
        Ping::findOrFail($id)->delete();
        if ($request->wantsJson()) {
            return 'OK';
        }

        return redirect('/cron');
    }

    public function hit($name)
    {
        $ping = Ping::where('name', $name)->first();

        if (!$ping) {

            $ping = $this->createDefaultPing($name, true);

        }

        return $ping;
    }


    private function createDefaultPing($name, $active, $createdBy = null)
    {
        $ping       = new Ping;
        $ping->name = $name;
        if ($createdBy) {
            $ping->created_by = $createdBy;
        }
        $ping->active          = $active;
        $ping->error           = false;
        $ping->frequency       = 'day';
        $ping->frequency_value = '1';
        $ping->save();

        return $ping;
    }
}
