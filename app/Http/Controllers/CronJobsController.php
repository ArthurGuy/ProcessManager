<?php

namespace App\Http\Controllers;

use \Validator;
use App\CronJob;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CronJobsController extends Controller
{
    public function index()
    {
        return view('cron-jobs', [
            'cronJobs' => CronJob::orderBy('created_at', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return redirect('/cron')
                ->withInput()
                ->withErrors($validator);
        }

        $task = new CronJob;
        $task->name = $request->get('name');
        $task->save();

        return redirect('/cron');
    }

    public function destroy($id)
    {
        CronJob::findOrFail($id)->delete();

        return redirect('/cron');
    }
}
