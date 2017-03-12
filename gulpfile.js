const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();


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
gulp.task('serve', ['babel', 'html'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("./src/main.js", ['babel']);
    gulp.watch("./src/index.js", ['html']);
    gulp.watch("./dist/index.html").on('change', browserSync.reload);
    gulp.watch("./dist/main.js").on('change', browserSync.reload);
});
