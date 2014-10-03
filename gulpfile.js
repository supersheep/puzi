var gulp = require('gulp');
var stylus = require('gulp-stylus');
var path = require('path');
var nib = require('nib');
var cssmin = require('gulp-cssmin');

gulp.task('style', function(){
  gulp.src('style/**/*.styl')
    .pipe(stylus({
      use: [ nib() ]
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('style'));
});

gulp.task('watch', function(){
  gulp.watch('style/**/*.styl', ['style']);
});

gulp.task('default', ['style', 'watch']);