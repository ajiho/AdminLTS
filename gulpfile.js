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


let scss_src = [
    'src/scss/bootstrap-admin.scss',
];
gulp.task('scss', function () {
    return gulp.src(scss_src)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({                           // 调用 gulp-autoprefixer 插件
            overrideBrowserslist: ['last 2 versions', '> 5%'],         // 定义浏览器参数
            cascade: true,                                     // 是否添加浏览器前缀，默认：true
            remove: true                                       // 是否移除不必要的浏览器前缀，默认：true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});


let js_src = [
    "src/js/bootstrap-admin.js"
];
gulp.task('js', function () {
    return gulp.src(js_src)
        .pipe(terser())
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});

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


let watch_files = [
    './src/js/**/*.js',
    './src/scss/**/*.scss',
];

//监听-自动化，目标文件被修改自动执行任务
gulp.watch(watch_files, gulp.series('default'));



