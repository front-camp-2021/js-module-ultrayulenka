const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

gulp.task('uglify', done => {
  gulp.src('src/**/solution/index.js')
    .pipe(babel({
      presets: [
        ['@babel/preset-env', {
          modules: false,
        }]
      ]
    }))
    .pipe(uglify())
    .pipe(rename( path => {
      return {
        dirname: path.dirname.replace('solution', ''),
        basename: path.basename,
        extname: '.example.js'
      };
    }))
    .pipe(gulp.dest(file => {
      return file.base;
    }));

  done();
});
