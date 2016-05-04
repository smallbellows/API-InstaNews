

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var autoprefix = require('gulp-autoprefixer');
var babel = require('gulp-babel');

gulp.task('default', ['es2015', 'css', 'browser-sync']);

gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        proxy: '192.168.33.10/project-02'
    });

    // watch tasks
    gulp.watch('./src/**/*.js', ['es2015']);
    gulp.watch('./src/**/*.scss', ['css ']);
    gulp.watch(['./build/**/*.*', 'index.html']).on('change', browserSync.reload);
});

gulp.task('es2015', function() {
  return gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build'));
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


gulp.task('css', function () {
  return gulp.src('./src/**/*.scss')
              .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
              .pipe(autoprefix({
			            browsers: ['last 2 versions'],
                	cascade: false
		            }))
              .pipe(gulp.dest('./build'));
});

gulp.task('jscs', function() {
    gulp.src('./src/**/*.js')
        .pipe(jscs({configPath: '.jscsrc'}))
        .pipe(jscs.reporter());
});

gulp.task('lint', function() {
    gulp.src('./src/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))

});
