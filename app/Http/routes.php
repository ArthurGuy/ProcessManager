<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


use App\CronJob;
use Illuminate\Http\Request;

Route::group(['middleware' => 'web'], function () {
    Route::auth();

    Route::get('/', 'HomeController@index');

    Route::get('/auth/github', 'Auth\GitHubController@redirectToProvider');
    Route::get('/auth/github/callback', 'Auth\GitHubController@handleProviderCallback');


    Route::any('/ping/{name}', 'PingController@hit');

    Route::get('/pings', 'PingController@index');
    Route::post('/pings', 'PingController@store');
    Route::put('/pings/{id}', 'PingController@update');
    Route::delete('/pings/{id}', 'PingController@destroy');


    Route::get('/cron', 'CronJobsController@index');
    Route::post('/cron', 'CronJobsController@store');
    Route::delete('/cron/{id}', 'CronJobsController@destroy');

});
