const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');


gulp.task('babel', () => {
    return gulp.src('./src/main.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('html', () => {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['babel', 'sass', 'html'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("./src/main.js", ['babel']);
    gulp.watch("./src/**/*.scss", ['sass']);
    gulp.watch("./src/index.html", ['html']);

    gulp.watch([
        "./dist/index.html",
        "./dist/main.js",
        "./dist/style.css"
    ]).on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist'));
});