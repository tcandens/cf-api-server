'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var nodemon = require('gulp-nodemon');
var del = require('del');
var karma = require('karma').server;
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var bs;

gulp.task('clean:build', function() {
  return del(['build/'], function( err, res ) {
    if ( err ) console.log( err );
  });
});

gulp.task('stylus:build', function() {
  return gulp.src('./app/public/stylus/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/public/css/'));
});

gulp.task('webpack:build', function() {
  return gulp.src('./app/public/js/index.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build/public/js/'));
});

gulp.task('webpack:karma', ['webpack:build'], function() {
  return gulp.src('test/karma/index_test.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/karma/'));
})

gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', './Gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copy:buildjs', function() {
  return gulp.src(['app/server.js', 'app/lib/**/*', 'app/models/**/*', 'app/routes/**/*'], { base: 'app' })
    .pipe(gulp.dest('build'));
});
gulp.task('copy:buildhtml', function() {
  return gulp.src(['app/public/**/*.html'])
    .pipe(gulp.dest('build/public/'));
});
gulp.task('copy:build', ['copy:buildjs', 'copy:buildhtml']);

gulp.task('nodemonTask', function() {
  nodemon({
    script: 'build/server.js'
  });
});

gulp.task('sync:build', ['nodemonTask'], function() {
  browserSync.init({
    proxy: {
      target: 'localhost:3000',
    },
    port: 3002
  });
});

gulp.task('mocha', ['lint'], function() {
  gulp.src(['./test/**/*.js'])
    .pipe(mocha({reporter:'list'}))
    .once('error', function() {
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});

gulp.task('karma', ['webpack:karma'], function( done ) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done );
})

gulp.task('watch:build', function() {
  gulp.watch(['app/public/**/*.html'], ['copy:buildhtml', reload ]);
  gulp.watch(['app/public/js/**/*.js'], ['webpack:build', reload ]);
  gulp.watch(['app/public/stylus/**/*.styl'], ['stylus:build', reload ]);
  gulp.watch(['app/server.js', 'app/lib/**/*.js', 'app/models/**/*.js', 'app/routes/**/*.js'], ['copy:buildjs', reload ]);
});

gulp.task('serve', ['copy:build', 'stylus:build', 'webpack:build', 'watch:build', 'sync:build']);
gulp.task('test', ['lint', 'mocha']);
gulp.task('default', ['serve']);
