var gulp = require('gulp');
var config = require('../config').manualjs;

gulp.task('manualjs', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
