<?php

namespace App\Http\Controllers\Auth;

use Auth;
use App\User;
use GrahamCampbell\GitHub\GitHubManager;
use Socialite;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GitHubController extends Controller
{
    protected $github;

    public function __construct(GitHubManager $github)
    {
        $this->github = $github;
    }

    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return Response
     */
    public function redirectToProvider()
    {
        return Socialite::driver('github')->scopes(['read:org', 'user:email'])->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return Response
     */
    public function handleProviderCallback()
    {
        $socialiteUser = Socialite::driver('github')->user();

        $this->github->authenticate(\Github\Client::AUTH_URL_TOKEN, $socialiteUser->token);

        $organizations = $this->github->currentUser()->memberships()->all();

        $loginValid = false;
        foreach ($organizations as $org) {
            if ($org['organization']['login'] === env('VALID_GITHUB_ORG')) {
                $loginValid = true;
            }
        }

        if ($loginValid) {

            $user = User::where('email', $socialiteUser->getEmail())->first();
            if (!$user) {
                //Register user
                $user = User::create(['email' => $socialiteUser->getEmail(), 'name' => $socialiteUser->getName()]);
            }
            Auth::login($user);
            return redirect('/');

        } else {
            return redirect('/login')->withError('Invalid');
        }

        //dd($organizations);

        // $user->token;
    }
}
