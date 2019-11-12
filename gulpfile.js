const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const runSequence = require('run-sequence').use(gulp);
const browserSync = require('browser-sync').create();


// task for processing HTML files
gulp.task('processHTML', done => {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
});

// task for processing CSS files
gulp.task('processCSS', done => {
    gulp.src('src/css/*.css')
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('dist/css'));
    done();
});


// task for processing image files
gulp.task('processImage', done => {
    gulp.src('src/img/*.*')
    .pipe(gulp.dest('dist/img'));
    done();
});

// task for processing JS files
gulp.task('processJS', done => {
    gulp.src('./src/js/*.*')
    .pipe(eslint())
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel({ presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
    done();
  });


gulp.task('babelPolyfill', done => {
    gulp.src('node_modules/babel-polyfill/browser.js')
    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
    done();
});  

// task for browser for any changes
gulp.task('browserSync', done => {
    browserSync.init({
      server: './dist',
      port: 8080,
      ui: { port: 8081 }
    });
    done();
}); 

// task for watching for changes
gulp.task('watch', ['browserSync'], () => {
    gulp.watch('src/js/*.js', ['processJS']);
    gulp.watch('src/*.html', ['processHTML']);
    gulp.watch('src/css/*.css', ['processCSS']);

    gulp.watch('dist/js/*.js', browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
    gulp.watch('dist/css/*.css', browserSync.reload);
});

// task for running for all tasks concurrently  
gulp.task('default', (callback) => {
  runSequence([
      'processHTML', 'processJS', 
      'processImage', 'processCSS',
      'babelPolyfill'
    ], 'watch', callback);
});



