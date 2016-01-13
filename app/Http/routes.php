<?php


Route::group(['middleware' => 'web'], function () {

    Route::get('/', 'HomeController@index');

    Route::get('logout', 'Auth\AuthController@logout');
    Route::get('login', 'Auth\AuthController@showLoginForm');

    if (in_array(env('ACCESS_TYPE', 'all'), ['all', 'email'])) {
        // Authentication Routes...
        Route::post('login', 'Auth\AuthController@login');

        // Registration Routes...
        Route::get('register', 'Auth\AuthController@showRegistrationForm');
        Route::post('register', 'Auth\AuthController@register');

        // Password Reset Routes...
        Route::get('password/reset/{token?}', 'Auth\PasswordController@showResetForm');
        Route::post('password/email', 'Auth\PasswordController@sendResetLinkEmail');
        Route::post('password/reset', 'Auth\PasswordController@reset');
    }


    if (in_array(env('ACCESS_TYPE', 'all'), ['all', 'github'])) {
        Route::get('/auth/github', 'Auth\GitHubController@redirectToProvider');
        Route::get('/auth/github/callback', 'Auth\GitHubController@handleProviderCallback');
    }


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
