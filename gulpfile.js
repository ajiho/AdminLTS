// 引入 gulp
const gulp = require('gulp');

// 引入组件
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');


//样式处理
let scss_src = [
    'src/scss/bootstrap-admin.scss',
];
gulp.task('scss', function () {
    return gulp.src(scss_src)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({                           // 调用 gulp-autoprefixer 插件
            overrideBrowserslist: ['last 2 versions', '>= 0.5%', 'not ie < 11'],         // 定义浏览器参数
            cascade: true,                                     // 是否添加浏览器前缀，默认：true
            remove: true                                       // 是否移除不必要的浏览器前缀，默认：true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});


//javascript脚本处理
let js_src = [
    "src/js/bootstrap-admin.js"
];
gulp.task('js', function () {
    return gulp.src(js_src)
        .pipe(gulp.dest('dist/js'))
        .pipe(terser())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});


//静态资源处理
let img_src = [
    'src/images/*',
    'src/images/favicons/*',
];

gulp.task("img", (cb) => {
    gulp.src(img_src[0])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));

    gulp.src(img_src[1])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/favicons'));
    cb();
});


// 默认任务
gulp.task('default', gulp.series(['scss', 'js', 'img']));


//监听-目标文件
let watch_files = [
    './src/js/**/*.js',
    './src/scss/**/*.scss',
];
gulp.watch(watch_files, gulp.series('default'));//目标文件被修改则执行series里面的任务default



