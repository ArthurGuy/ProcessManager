<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Process Manager</title>

    <link href="{{ elixir('css/app.css') }}" rel="stylesheet">

</head>
<body>
    <div id="{!! Request::segment(1)==='pings' || Request::segment(1)==='contacts' ? 'root' : '' !!}">
        <nav class="navbar navbar-full navbar-dark bg-primary m-b-1">

            <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header">
                &#9776;
            </button>
            <div class="collapse navbar-toggleable-xs" id="navbar-header">
                <span class="navbar-brand">Process Manager</span>

                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav pull-xs-right">
                    @if (Auth::guest())
                        <li class="nav-item"><a class="nav-link" href="{{ url('/login') }}">Login</a></li>
                        @if (in_array(env('ACCESS_TYPE', 'all'), ['all', 'email']))
                            <li class="nav-item"><a class="nav-link" href="{{ url('/register') }}">Register</a></li>
                        @endif
                    @else
                        <li class="nav-item"><a class="nav-link" href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                    @endif
                </ul>
            </div>
        </nav>

        @yield('content')
    </div>

    <script src="{{ elixir('js/index.js') }}"></script>
</body>
</html>
