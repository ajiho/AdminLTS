// 引入 gulp
const gulp = require('gulp');
// 引入组件
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');


//压缩css
gulp.task('min_css', function () {
    return gulp.src([
        'src/bootstrap-admin.css'
    ]).pipe(autoprefixer({                           // 调用 gulp-autoprefixer 插件
        overrideBrowserslist: ['last 2 versions', '> 5%'],         // 定义浏览器参数
        cascade: true,                                     // 是否添加浏览器前缀，默认：true
        remove: true                                       // 是否移除不必要的浏览器前缀，默认：true
    })).pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('static/css'));
});


//压缩js
gulp.task('min_js', function () {
    return gulp.src([
        'src/bootstrap-admin.js'
    ])
        .pipe(terser())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('static/js'));
});


// 默认任务
gulp.task('default', gulp.series(['min_css', 'min_js']));

//监听-自动化，目标文件被修改自动压缩
// gulp.watch(['file'], gulp.series('default'));



