<?php

namespace App\Http\Controllers;

use Validator;
use App\Contact;
use App\Http\Requests;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return view('contacts', [
            'contacts' => Contact::all()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|max:255',
            'email'       => 'required|email|max:255',
            'filter_tags' => 'max:255',
        ]);

        if ($validator->fails()) {
            return redirect('/contacts')
                ->withInput()
                ->withErrors($validator);
        }

        $contact              = new Contact;
        $contact->name        = $request->get('name');
        $contact->email       = $request->get('email');
        $contact->filter_tags = $request->get('filter_tags');
        $contact->active      = true;
        $contact->save();

        return redirect('/contacts');
    }

    public function destroy($id)
    {
        Contact::findOrFail($id)->delete();

        return redirect('/contacts');
    }
}
