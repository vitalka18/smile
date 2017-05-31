var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var config = require('../config');

gulp.task('watch', [
  'sass:watch',
  'copy:watch',
  'html:watch',
  'js:watch'
]);

gulp.task('default', function(cb) {
  gulpSequence(
    ['clean'], ['html', 'copy', 'js', 'sass', 'jslint', 'scss-lint'], ['server', 'watch'])(cb)
});
gulp.task('build', ['html', 'copy', 'js', 'jslint', 'sass', 'scss-lint'], function() {});
