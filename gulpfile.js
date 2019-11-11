const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence').use(gulp);
const browserSync = require('browser-sync').create();

gulp.task('processHTML', done => {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
});


gulp.task('processCSS', done => {
    gulp.src('src/css/*.css')
    .pipe(uglify())
    .pipe(gulp.dest('dist/css'));
    done();
});


gulp.task('processImage', done => {
    gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images'));
    done();
});


gulp.task('processJS', done => {
    gulp.src(['src/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel({ presets: ['env']}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
    done();
  });


  gulp.task('babelPolyfill', done => {
    gulp.src('node_modules/babel-polyfill/browser.js')
    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
    done();
  });  


 gulp.task('browserSync', done => {
    browserSync.init({
      server: './dist',
      port: 8080,
      ui: { port: 8081 }
    });
    done();
  }); 


  gulp.task('watch', ['browserSync'], () => {
    gulp.watch('src/js/*.js', ['processJS']);
    gulp.watch('src/*.html', ['processHTML']);
    gulp.watch('src/css/*.css', ['processCSS']);

    gulp.watch('dist/js/*.js', browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
    gulp.watch('dist/css/*.css', browserSync.reload);
  });

  
gulp.task('default', (callback) => {
  runSequence([
      'processHTML', 'processJS', 
      'processImage', 'processCSS',
      'babelPolyfill'
    ], 'watch', callback);
});



