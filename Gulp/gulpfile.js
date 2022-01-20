const gulp = require("gulp");
const { src, dest , watch, series , parallel} = require("gulp")


const htmlmin = require('gulp-htmlmin');
function copyHtml() {
    return src('project/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'))
}
exports.html = copyHtml

const imgMin = require('gulp-imagemin');
function imgMinify() {
    return gulp.src('project/pics/*')
        .pipe(imgMin())
        .pipe(gulp.dest('dist/images'));
}
exports.img = imgMinify


const concat = require('gulp-concat');
var cssMin = require('gulp-clean-css');
function cssMinify() {
    return src("project/css/**/*.css")
        .pipe(concat('style.min.css'))
        .pipe(cssMin())
        .pipe(dest('dist/assets/css'))
}
exports.css = cssMinify


const terser = require('gulp-terser');
function jsMinify(){
    return src('project/js/**/*.js' , {sourcemaps:true})
        .pipe(concat('all.min.js'))
        .pipe(terser())
        .pipe(dest('dist/assets/js',{sourcemaps:'.'}))
}
exports.js = jsMinify;

var browserSync = require('browser-sync');
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}


function reloadTask(done) {
    browserSync.reload()
    done()
  }
  
  function watchTask() {
      watch('project/*.html',series(copyHtml, reloadTask))
      watch('project/js/**/*.js',series(jsMinify, reloadTask))
      watch(["project/css/**/*.css","project/sass/**/*.scss"], parallel(reloadTask));
  }
  

  exports.default = series(parallel(imgMinify, jsMinify , cssMinify , copyHtml), serve,watchTask)

