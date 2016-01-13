<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Process Manager</title>

    <link href="{{ elixir('css/app.css') }}" rel="stylesheet">

</head>
<body id="app">
    <nav class="navbar navbar-full navbar-dark bg-primary m-b-1">

        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header">
            &#9776;
        </button>
        <div class="collapse navbar-toggleable-xs" id="navbar-header">
            <a class="navbar-brand" href="{{ url('/') }}">Process Manager</a>

            <!-- Left Side Of Navbar -->
            <ul class="nav navbar-nav">
                <li class="nav-item"><a class="nav-link" href="{{ url('/') }}">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="{{ url('/cron') }}">Cron Jobs</a></li>
                <li class="nav-item"><a class="nav-link" href="{{ url('/pings') }}">Pings</a></li>
            </ul>

            <!-- Right Side Of Navbar -->
            <ul class="nav navbar-nav pull-xs-right">
                @if (Auth::guest())
                    <li class="nav-item"><a class="nav-link" href="{{ url('/login') }}">Login</a></li>
                    @if (in_array(env('ACCESS_TYPE', 'all'), ['all', 'email']))
                        <li class="nav-item"><a class="nav-link" href="{{ url('/register') }}">Register</a></li>
                    @endif
                @else
                    <li class="nav-item"><span class="nav-link">{{ Auth::user()->name }}</span></li>
                    <li class="nav-item"><a class="nav-link" href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                    <li class="nav-item"><img width="40" height="40" src="{{ Gravatar::get(Auth::user()->email) }}"></li>
                @endif
            </ul>
        </div>
    </nav>

    @yield('content')

    <script src="{{ elixir('js/app.js') }}"></script>
</body>
</html>
