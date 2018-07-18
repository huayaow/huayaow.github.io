var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlreplace = require('gulp-html-replace');
var htmlmin = require('gulp-minify-html');
var rimraf = require('rimraf');

var path = '../GIST-Deploy/huayao';

// clean dir
gulp.task('clean', function (cb) {
    rimraf(path, cb);
});

// minimize css
gulp.task('css', ['clean'], function () {
    gulp.src('css/*.css')
        .pipe(minifyCSS())
        //.pipe(concat('min.css'))
        .pipe(gulp.dest(path + '/css'))
});

// minimize js
gulp.task('script', ['clean'], function() {
    gulp.src('js/*.js')
        .pipe(uglify())
        //.pipe(concat('min.js'))
        .pipe(gulp.dest(path + '/js'))
});

// replace and minimize html
gulp.task('html', ['clean'], function() {
    var opts = {
        conditionals: true,
        spare: true
    };
    gulp.src('index.html')
        //.pipe(htmlreplace({
            //'css': 'css/min.css',
            //'js': 'js/min.js'
        //}))
        .pipe(htmlmin(opts))
        .pipe(gulp.dest(path));
});

// copy others
gulp.task('copy', ['clean'], function () {
    gulp.src('images/*')
        .pipe(gulp.dest(path + '/images'));
    gulp.src('fonts/*')
        .pipe(gulp.dest(path + '/fonts'));
});

gulp.task('build', ['css', 'script', 'html', 'copy']);

gulp.task('default', ['build']);