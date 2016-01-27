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
            sleep(1);
            return Ping::orderBy('created_at', 'asc')->get();
        }

        return view('pings');
    }

    public function store(Request $request)
    {
        sleep(2);
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255|unique:pings',
        ]);

        if ($validator->fails()) {
            /** @var \Illuminate\Validation\Validator $validator */
            if ($request->wantsJson()) {
                return response( $validator->getMessageBag(), 422);
            }
            return redirect('/pings')
                ->withInput()
                ->withErrors($validator);
        }

        $ping = Ping::createDefaultPing($request->get('name'), false, Auth::id());

        if ($request->wantsJson()) {

            $ping = Ping::findOrFail($ping->id);

            sleep(1);
            return $ping;
        }
        return redirect('/pings');
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'            => 'required|max:255',
            'description'     => 'max:255',
            'tags'            => 'max:255',
            'frequency'       => 'required',
            'frequency_value' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response($validator->errors()->all(), 422);
        }

        $ping = Ping::findOrFail($id);

        $ping->name            = $request->get('name');
        $ping->description     = $request->get('description');
        $ping->tags            = $request->get('tags');
        $ping->frequency       = $request->get('frequency');
        $ping->frequency_value = $request->get('frequency_value');

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
}
