'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('lint', function() {
  gulp.src(['./lib/*.js', './Gruntfile.js'])
    .pipe(jshint({lookup: true}))
    .pipe(jshint.reporter('jshint-stylish'));
});
