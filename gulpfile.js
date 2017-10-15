const gulp = require('gulp')
const less = require('gulp-less')
const path = require('path')
const minifyCSS = require('gulp-csso')

gulp.task('app', () => {
  return gulp.src('./**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'styles' ) ]
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./static/css'))
})

gulp.task('default', ['app'])
