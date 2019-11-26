const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify-es').default;
const runSequence = require('run-sequence').use(gulp);
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


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


// task for processing js files
gulp.task('processJS', done => {
    browserify('./src/js/index.js', { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
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
gulp.task('watch', ['browserSync'], done => {
    gulp.watch('src/js/*.js', ['processJS']);
    gulp.watch('src/*.html', ['processHTML']);
    gulp.watch('src/css/*.css', ['processCSS']);

    gulp.watch('dist/js/*.js', browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
    gulp.watch('dist/css/*.css', browserSync.reload);
    done();
});

// task for running for all tasks concurrently  
gulp.task('default', (callback) => {
  runSequence([
      'processHTML',
      'processJS', 
      'processImage', 
      'processCSS'
    ], 'watch', callback);
});



