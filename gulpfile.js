var elixir = require('laravel-elixir');
var babelify = require('babelify');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
    mix.sass('app.scss')
        .browserify('index.js')
        .version(['css/app.css', 'js/index.js']);
    mix.copy('resources/assets/fonts/', 'public/fonts/');
});
