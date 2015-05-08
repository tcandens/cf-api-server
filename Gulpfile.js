'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('lint', function() {
  gulp.src(['./lib/**/*.js', './Gruntfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
  gulp.src(['./test/**/*.js'])
    .pipe(mocha({reporter:'landing'}))
    .once('error', function() {
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});

gulp.task('watch', function() {
  gulp.watch(['./lib/**/*.js'], ['lint', 'test']);
});
