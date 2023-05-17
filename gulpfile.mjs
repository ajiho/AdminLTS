import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import gulpStylelint from '@ronilaukkarinen/gulp-stylelint';
import gulpCopy from "gulp-copy";
import autoprefixer from "autoprefixer";
import cmq from 'node-css-mqpacker';
import imagemin from 'gulp-imagemin';
import {deleteAsync} from 'del';
import cleanCss from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import gulpIf from 'gulp-if'
import * as fs from 'fs';
//lib目录自动化(可以避免手动把插件从node_modules里面复制出来)
import {libIgnore} from './build/config/libIgnore.mjs';
import {libMoveMapping} from "./build/config/libMoveMapping.mjs";


//sass
const sass = gulpSass(dartSass);
//postcss插件
const postcssPlugins = [
    autoprefixer(), cmq({
        sort: function (a, b) {
            var aMax = a.match(/\d+/)[0];
            var bMax = b.match(/\d+/)[0];
            return bMax - aMax;
        }
    })
];


//负责把build/js/app.js移动到dist/js目录
gulp.task('app.js', function () {
    return gulp.src('build/js/app.js').pipe(gulp.dest('dist/js'))
})

gulp.task('lint-css', function () {
    return gulp.src('build/scss/**/*.scss')
        .pipe(gulpStylelint({
            //打印错误堆栈跟踪
            debug: false,
            //报错后是否直接终止程序
            failAfterError: true,
            //报错类型和格式处理
            reporters: [
                {formatter: 'string', console: true}
            ]
        }))
})


gulp.task('css', function () {
    return gulp.src('build/scss/**/*.scss')
        .pipe(sourcemaps.init({debug: true}))
        .pipe(sass.sync({
            outputStyle: "expanded"
        }).on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
});


gulp.task('css_min', function () {
    return gulp.src('build/scss/**/*.scss')
        .pipe(sourcemaps.init({debug: true}))
        .pipe(sass.sync({
            outputStyle: "expanded"
        }).on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
});


gulp.task('lint-css', gulp.series(['lint-css', 'css']));
gulp.task('lint-css-min', gulp.series(['lint-css', 'css_min']));


gulp.task('fix-css', function () {
    return gulp
        .src([
            'build/scss/**/*.scss',
            //除了plugins-override不需要修复
            '!build/scss/plugins-override/*.scss',
        ])
        .pipe(gulpStylelint({
            fix: true,
        }))
        .pipe(gulp.dest('build/scss'));
});


gulp.task('img', async function () {
    gulp.src('build/img/*')
        .pipe(await imagemin())
        .pipe(gulp.dest('dist/img'))
})


gulp.task('move_lib', function (cb) {
    return gulp.series(
        function (done) {
            console.log('-------依赖复制任务耗时较长，请耐心等待------')
            done();
        },
        gulp.parallel(
            libMoveMapping.map(function (file) {
                return function () {
                    return gulp.src(file.form)
                        .pipe(gulpIf(!fs.existsSync(file.to), gulpCopy('lib', {prefix: 1})))
                };
            })
        ),
        function (done) {
            console.log('-------依赖复制任务结束------')
            done();
            cb();
        }
    )();
});


gulp.task('clean_lib', async function (cb) {
    const deletedFilePaths = await deleteAsync(libIgnore, {dot: true});
    console.log('lib依赖目录脏目录删除:\n', deletedFilePaths.join('\n'));
});


//formvalidation表单验证插件
gulp.task('move_formvalidation_to_lib', function () {
    return gulp.src([
        'build/formvalidation/**/*'
    ]).pipe(gulpCopy('lib', {prefix: 1}))
});


gulp.task('style', gulp.series(['lint-css', 'lint-css-min']));


//lib目录统一指令
gulp.task('lib', gulp.series(['move_lib', 'clean_lib', 'move_formvalidation_to_lib']));


gulp.task('default', gulp.series(['style', 'img', 'lib']));

gulp.task("dev", function (cb) {
    gulp.watch(['build/scss/**/*.scss'], gulp.series('css'));
    cb()
});







