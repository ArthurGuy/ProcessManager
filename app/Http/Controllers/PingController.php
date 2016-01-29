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

        return view('template');
    }

    public function store(Request $request)
    {
        if (!$request->wantsJson()) {
            return response("Pings can only be created via json requests", 400);
        }

        sleep(1);

        $requestData = $request->all();

        $validator = Validator::make($requestData, [
            'name' => 'required|alpha_dash|max:255|unique:pings,name,NULL,id,deleted_at,NULL',
        ]);

        if ($validator->fails()) {
            /** @var \Illuminate\Validation\Validator $validator */
            return response($validator->getMessageBag(), 422);
        }

        $ping = Ping::createDefaultPing($requestData['name'], true, Auth::id());

        return Ping::findOrFail($ping->id);
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
