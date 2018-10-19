let gulp = require('gulp');
let livereload = require('gulp-livereload');
let uglify = require('gulp-uglifyjs');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

/* Compile sass to css */
gulp.task('sass', function() {
  gulp
    .src('./sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('./css'));
});

/* Uglify javascript */
gulp.task('uglify', function() {
  gulp
    .src('./js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
    .pipe(
      uglify().on('error', function(e) {
        console.log(e);
      })
    );
});

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./js/**/*.js', ['uglify']);
  gulp.watch(['./css/style.css', './**/*.twig', './js/*.js'], function(files) {
    livereload.changed(files);
  });
});

gulp.task('default', ['watch']);
