'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('gulp-webpack');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var bs;

gulp.task('clean:build', function() {
  return del(['build/'], function( err, res ) {
    if ( err ) console.log( err );
  });
});

gulp.task('webpack:client', function() {
  return gulp.src('app/public/js/index.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/public/js/'));
});

gulp.task('lint', function() {
  gulp.src(['./lib/**/*.js', './Gruntfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('serve:build', function() {
  bs = browserSync({
    port: 3434,
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task('test', function() {
  gulp.src(['./test/**/*.js'])
    .pipe(mocha({reporter:'list'}))
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

gulp.task('default', ['lint', 'test']);
gulp.task('serve', ['lint', 'test', ])
