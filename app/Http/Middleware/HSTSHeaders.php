<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\RedirectResponse;

class HSTSHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure                 $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if ($response instanceof RedirectResponse) {
            return $response;
        }

        $cacheDays = 182; //180 days minimum reccomended by SSL Labs
        $maxAge     = 60 * 60 * 24 * $cacheDays;

        //Domains on which we want to serve the header
        // be careful with this as it can't be undone
        // the domain must always be available over https
        $protectedHosts = ['monitor.vestd.com'];

        if (in_array($request->getHttpHost(), $protectedHosts)) {
            return $response->header('Strict-Transport-Security', 'max-age=' . $maxAge . '; preload');
        }

        return $response;
    }
}