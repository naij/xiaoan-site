var gulp    = require('gulp')
var path    = require('path')
var less    = require('gulp-less')
var rename  = require('gulp-rename')
var uglify  = require('gulp-uglify')
var cssmin  = require('gulp-cssmin')
var clean   = require('gulp-clean')
var combine = require('./tool/gulp-combine')

gulp.task('clean', function() {
  return gulp.src('./build', {read: false})
    .pipe(clean())
})

gulp.task('compress', ['clean'], function() {
  gulp.src([
    './app/**/*.js',
    '!./app/boot.js',
    '!./app/libs/sea.js'
  ])
    .pipe(combine())
    // .pipe(uglify({
    //   output: {
    //     ascii_only: true
    //   }
    // }))
    .pipe(gulp.dest('./build/app/'))

  gulp.src(['./app/boot.js'])
    .pipe(uglify({
      output: {
        ascii_only: true
      }
    }))
    .pipe(gulp.dest('./build/app/'))

  gulp.src(['./app/libs/sea.js'])
    .pipe(uglify({
      output: {
        ascii_only: true
      }
    }))
    .pipe(gulp.dest('./build/app/libs/'))

  gulp.src('./style/main.less')
    .pipe(less())
    .pipe(rename(function (path) {
      path.basename += "-min"
    }))
    .pipe(cssmin({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./build/style/'))

  gulp.src(['./img/*'])
    .pipe(gulp.dest('./build/img/'))
})

gulp.task('build', [
  'compress'
])