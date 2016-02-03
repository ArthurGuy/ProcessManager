<?php

namespace App\Http\Controllers;

use Validator;
use App\Contact;
use App\Http\Requests;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        if ($request->wantsJson()) {
            return Contact::all();
        }

        return view('template');
    }

    public function store(Request $request)
    {
        if (!$request->wantsJson()) {
            return response("Contacts can only be created via json requests", 400);
        }

        $requestData = $request->all();

        $validator = Validator::make($requestData, [
            'name'        => 'required|max:255',
            'email'       => 'required|email|max:255|unique:contacts,email,NULL,id,deleted_at,NULL',
            'filter_tags' => 'max:255',
        ]);

        if ($validator->fails()) {
            return response($validator->getMessageBag(), 422);
        }

        $contact              = new Contact;
        $contact->name        = $requestData['name'];
        $contact->email       = $requestData['email'];
        $contact->filter_tags = $requestData['filter_tags'];
        $contact->active      = true;
        $contact->save();

        //Re-fetch so we have a full record
        return Contact::findOrFail($contact->id);
    }

    public function destroy(Request $request, $id)
    {
        Contact::findOrFail($id)->delete();

        return response(null, 204);
    }
}
