const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
//const gulpMerge = require('gulp-merge');

var webpackStream = require('webpack-stream');
var webpack2 = require('webpack');

const sourcemaps = require('gulp-sourcemaps');
const obfuscate = require('gulp-javascript-obfuscator');
//const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('js', (cb) => {

    pump([
        gulp.src('./src/main.js'),
        sourcemaps.init(),
        webpackStream( require('./webpack.config.js'), webpack2 ),
        concat('player.js'),
        obfuscate(),
        sourcemaps.write(),
        gulp.dest('./dist')
    ],cb);
});

/*
gulp.task('jsOld', (cb) => {

    pump([
        gulp.src('./src/main.js'),
        sourcemaps.init(),
        // transform the files here.
        rollup({
            entry: './src/main.js',
            format: 'iife',
            plugins : [ npm({jsnext : true}), commonjs() ],
        }),
        babel({
            "presets": ['es2015']
        }),
        concat('player.js'),
        uglify(),
        obfuscate(),
        sourcemaps.write(),
        gulp.dest('./dist')
    ],cb);
});
*/


// html
//----------------------------------------------------------------------------------------------------------------------
gulp.task('html', () => {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});


// style
//----------------------------------------------------------------------------------------------------------------------
gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist'));
});


// Static Server + watching scss/html files
//----------------------------------------------------------------------------------------------------------------------
gulp.task('default', ['js', 'sass', 'html'], function () {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("./src/*.js", ['js']);
    gulp.watch("./src/**/*.scss", ['sass']);
    gulp.watch("./src/index.html", ['html']);

    gulp.watch([
        "./dist/index.html",
        "./dist/player.js",
        "./dist/style.css"
    ]).on('change', browserSync.reload);
});

