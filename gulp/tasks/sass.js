var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-ruby-sass');
var scsslint = require('gulp-scss-lint');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var mqpacker = require("css-mqpacker");
var config = require('../config');
var gulpIf = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var cssimport = require("gulp-cssimport");
var fs = require('fs');

var isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
var isProd = process.env.NODE_ENV == 'prod';

gulp.task('sass', function() {
  var processors = [
    autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }),
    mqpacker()
  ];

  return sass(config.src.sass + '*.scss', {
      sourcemap: isDev,
      style: 'compact',
      emitCompileError: true
    })
    .on('error', notify.onError({
      title: 'Sass Error!',
      message: '<%= error.message %>'
    }))
    .pipe(cssimport())
    .pipe(postcss(processors))
    .pipe(gulpIf(isDev, sourcemaps.write('./')))
    .pipe(gulpIf(isProd, cleanCSS({
      sourceMap: false
    })))
    .pipe(gulp.dest(config.dest.css));
});



gulp.task('scss-lint', function() {
  return gulp.src([config.src.sass + '**/*.scss',
      '!' + config.src.sass + 'lib/**/*.*'
    ])
    .pipe(scsslint({
      options: {
        formatter: 'stylish',
        'merge-default-rules': false,
      },
      config: '.scss-lint.yml'
    }));
});

gulp.task('sass:watch', function() {
  gulp.watch(config.src.sass + '/**/*', ['sass']);
});
