

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

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
              .pipe(uglify()) // Call the uglify function on these files
              .pipe(gulp.dest('./build')); // Where do we put the result?

});

gulp.task('sass', function() {
  return gulp.src('./src/**/*.scss')
              .pipe(sass().on('error', sass.logError))
              .pipe(gulp.dest('./build'));
});
