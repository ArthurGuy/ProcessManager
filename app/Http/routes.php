<?php


Route::group(['middleware' => 'web'], function () {
    Route::auth();

    Route::get('/', 'HomeController@index');

    Route::get('/auth/github', 'Auth\GitHubController@redirectToProvider');
    Route::get('/auth/github/callback', 'Auth\GitHubController@handleProviderCallback');


    Route::get(env('PING_URL_PREFIX') . '/{name}', 'HeartbeatController@beat')->name('ping_url');
    Route::post(env('PING_URL_PREFIX') . '/{name}', 'HeartbeatController@beat');

    Route::group(['middleware' => 'auth'], function () {

        Route::get('/pings', 'PingController@index');
        Route::post('/pings', 'PingController@store');
        Route::put('/pings/{id}', 'PingController@update');
        Route::delete('/pings/{id}', 'PingController@destroy');


        Route::get('/cron', 'CronJobsController@index');
        Route::post('/cron', 'CronJobsController@store');
        Route::delete('/cron/{id}', 'CronJobsController@destroy');

    });

});
