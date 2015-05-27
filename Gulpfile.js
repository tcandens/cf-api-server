'use strict';

var config = require('./.siteconfig');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('gulp-webpack');
var nodemon = require('gulp-nodemon');
var del = require('del');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('clean:build', function() {
  return del(['build/'], function( err, res ) {
    if ( err ) console.log( err );
  });
});

gulp.task('webpack:build', function() {
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

gulp.task('copy:buildjs', function() {
  return gulp.src(['app/server.js', 'app/lib/**/*', 'app/models/**/*', 'app/routes/**/*'], { base: 'app' })
    .pipe(gulp.dest('build'));
});
gulp.task('copy:buildhtml', function() {
  return gulp.src(['app/public/index.html'])
    .pipe(gulp.dest('build/public/'));
});
gulp.task('copy:build', ['copy:buildjs', 'copy:buildhtml']);

gulp.task('nodemonTask', ['copy:buildjs'], function() {
  nodemon({
    script: 'build/server.js'
  });
});

gulp.task('sync:build', ['nodemonTask'], function() {
  browserSync({
    proxy: {
      host: 'http://localhost:3000',
    }
  });
});

gulp.task('test', ['lint'], function() {
  gulp.src(['./test/**/*.js'])
    .pipe(mocha({reporter:'list'}))
    .once('error', function() {
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});

gulp.task('watch:build', function() {
  gulp.watch(['app/public/**/*.html'], ['copy:buildhtml']);
  gulp.watch(['app/public/**/*.js'], ['webpack:build']);
  gulp.watch(['app/server.js', 'app/lib/**/*.js', 'app/models/**/*.js', 'app/routes/**/*.js'], ['copy:buildjs']);
});

gulp.task('serve:dev', ['copy:build', 'webpack:build', 'nodemonTask', 'watch:build' ]);
gulp.task('default', ['lint', 'test']);
gulp.task('serve', ['lint', 'test', ])
