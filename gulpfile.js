var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('javascript', function () {
    return gulp.src('src/BizibleScripts.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
});
gulp.task('html', function () {
    return gulp.src('src/BizibleScripts.html')
        .pipe(gulp.dest('dist/'));
});
gulp.task('FrameJavascript', function () {
    return gulp.src('src/BizibleFrame.js')
        .pipe(webpack(require('./webpack.config-frame.js')))
        .pipe(gulp.dest('dist/'));
});
gulp.task('FrameHtml', function () {
    return gulp.src('src/BizibleFrame.html')
        .pipe(gulp.dest('dist/'));
});
gulp.task('default', ['html', 'javascript', 'FrameJavascript', 'FrameHtml']);