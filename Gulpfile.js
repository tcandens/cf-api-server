'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', './Gruntfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
  gulp.src(['./test/**/*.js'])
    .pipe(mocha({reporter:'list', timeout: 4000}))
    .once('error', function() {
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});

gulp.task('watch', function() {
  gulp.watch(['./app/**/*.js'], ['lint', 'test']);
});

gulp.task('default', ['lint', 'test']);
