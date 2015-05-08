var gulp = require('gulp');
var clean = require('gulp-rimraf');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var concat = require('gulp-concat');

var jsFolder = 'assets/js/';
var cssFolder = 'assets/stylesheets/';

var buildFolder = 'build';

var js = [
  'jquery-2.1.4.js',
  'angular.js',
  'moment.js',
  'moment-timezone-with-data-2010-2020.js'
];

var css = [ 'app.css' ];

gulp.task('clean', function() {
  return gulp.src(buildFolder, { read: false })
        .pipe(clean());
});

gulp.task('images', function() {
  return gulp.src('assets/images/**')
    .pipe(plumber())
    .pipe(gulp.dest(buildFolder + '/assets/images'));
});

gulp.task('css', function() {
  return gulp.src(css.map(function(f){ return 'assets/stylesheets/' + f; }))
    .pipe(plumber())
    .pipe(gulp.dest(buildFolder + '/assets/stylesheets'));
});

gulp.task('js', function() {
  return gulp.src(js.map(function(f) { return 'assets/js/' + f; }))
    .pipe(gulp.dest(buildFolder + '/assets/js'));
});

gulp.task('html', function() {
  var locals = {
   scripts: js.map(function(f) { return '/assets/js/' + f; }),
   css: css.map(function(f) { return '/assets/stylesheets/' + f; })
  };

  return gulp.src('index.jade')
    .pipe(jade({ locals: locals, pretty: true }))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('build', [ 'css', 'js', 'images', 'html' ]);
