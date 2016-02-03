var babelify    = require('babelify');
var browserify  = require('browserify');
var gulp        = require('gulp');
var gulpIf      = require('gulp-if');
var uglify      = require('gulp-uglify');
var plumber     = require('gulp-plumber');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var runSequence = require('run-sequence');
var sourcemaps  = require('gulp-sourcemaps');
var sass        = require('gulp-sass');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var reactify    = require('reactify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var notify      = require("gulp-notify");

var jsDir       = './resources/assets/js/';
var fontDir     = './resources/assets/fonts/';
var sassDir     = './resources/assets/sass/';

var productionBuild = false;

var onError = function (err) {
    if (productionBuild) {
        throw err;
    } else {
        console.log(err);
    }
};


//Detect if a production run and set the production build flag
(function () {
    var argv = require('yargs').argv;
    if (typeof argv.production == 'undefined') {
        productionBuild = false;
    } else {
        productionBuild = argv.production;
    }
    if (productionBuild) {
        console.log("Production Build");
    } else {
        console.log("Development Build");
    }
})();








/*
 *******************************************************************
 *		Styles
 *******************************************************************
 */

var sassSources = [
    sassDir + 'app.scss'
];

gulp.task('sass', function() {
    return gulp.src(sassSources)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/build/css/'))
        .pipe(gulpIf(!productionBuild, notify("Sass build complete")));
});


/*
 *******************************************************************
 *		Javascript
 *******************************************************************
 */

//Js
gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify({
        entries: [jsDir + 'index.js'],
        transform: [babelify], // We want to convert JSX to normal javascript
        debug: !productionBuild
    })
    // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/build/js/'))
        .pipe(gulpIf(!productionBuild, notify("Browserify complete")));
})



/*
 *******************************************************************
 *		Static assets
 *******************************************************************
 */

//Fonts
var fontSources = [
    fontDir + '*'
];
gulp.task('fonts', function() {
    return gulp.src(fontSources)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('public/fonts/'))
        .pipe(gulpIf(!productionBuild, notify("Fonts copied")));
});


/*
 *******************************************************************
 *		Production tasks
 *******************************************************************
 */

gulp.task('version', function() {

    if ( ! productionBuild) {
        console.log("Local development - not versioning assets");
        return;
    }

    // Copied from elixir
    var vinylPaths  = require('vinyl-paths');
    var del         = require('del');
    var rev         = require('gulp-custom-rev');
    var fs          = require('fs');
    var argv        = require('yargs').argv;

    var buildDir    = 'public/build';
    var src         = ['public/build/js/main.js', 'public/build/css/app.css'];
    var files       = vinylPaths();
    var manifest    = buildDir + '/rev-manifest.json';

    fs.stat(manifest, function(err, stat) {
        if (err == null) {
            var oldManifest = JSON.parse(fs.readFileSync(manifest));

            for (var key in oldManifest) {
                del.sync(buildDir + '/' + oldManifest[key], { force: true });
            }
        }

    });

    return gulp.src(src, { base: './public/build' })
        .pipe(gulp.dest(buildDir))
        .pipe(files)
        .pipe(rev(argv.rev))
        .pipe(gulp.dest(buildDir))
        .pipe(rev.manifest())
        .pipe(gulp.dest(buildDir))
        .on('end', function() {
            // We'll get rid of the duplicated file that
            // usually gets put in the "build" folder,
            // alongside the suffixed version.
            // del(files.paths, { force: true });
        });
});



/*
 *******************************************************************
 *		Gulp tasks
 *******************************************************************
 */

gulp.task('buildProduction', function() {
    productionBuild = true;
    console.log("Performing a production build");
    return runSequence('build');
});

gulp.task('build', function() {
    return runSequence('sass', 'browserify', 'fonts', 'version');
});

gulp.task('watchFiles', function() {
    gulp.watch(jsDir + '**/*.js', {interval: 1000}, ['browserify']);
    gulp.watch(sassDir + '**/*.scss', {interval: 1000},  ['sass']);
});

gulp.task('default', ['build', 'watchFiles']);

gulp.task('production', ['buildProduction']);
