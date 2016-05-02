

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var cssnano = require('gulp-cssnano');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');



gulp.task('default', ['uglify', 'sass', 'browser-sync']);

gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        proxy: '192.168.33.10/project-02'
    });

    // watch tasks
    gulp.watch('./src/*.js', ['uglify']);
    gulp.watch('./src/*.scss', ['sass']);
    gulp.watch(['./build/**/*.*', 'index.html']).on('change', browserSync.reload);
});


gulp.task('uglify', function() {

  return gulp.src(['./src/*.js']) // What files do we want gulp to consume?
              .pipe(plumber(function () {
                console.log("there was an error in uglify");
                this.emit('end');
              }))
              .pipe(uglify()) // Call the uglify function on these files
              .pipe(gulp.dest('./build')); // Where do we put the result?

});

gulp.task('sass', function() {
  return gulp.src('./src/**/*.scss')
              .pipe(sass().on('error', sass.logError))
              .pipe(gulp.dest('./build'));
});

gulp.task('cssnano', function () {
  return gulp.src('./build/*.css')
              .pipe(cssnano())
              .pipe(gulp.dest('./build'));
});

gulp.task('jscs', function() {
    gulp.src('./src/**/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('lint', function() {
    gulp.src('./src/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))

});
