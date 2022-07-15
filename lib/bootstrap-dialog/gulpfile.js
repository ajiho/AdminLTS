// 引入 gulp
const gulp = require('gulp');

// 引入插件
const rename = require('gulp-rename');
const terser = require('gulp-terser');


gulp.task('dist', function () {
    return gulp.src([
        'src/bootdialog.js',
    ])
        .pipe(terser())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});


// 默认执行
gulp.task('default', gulp.series(['dist']));