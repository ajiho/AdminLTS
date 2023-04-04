import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';


const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';

import gulpStylelint from '@ronilaukkarinen/gulp-stylelint';


import autoprefixer from "autoprefixer";
import cmq from 'node-css-mqpacker';
import imagemin from 'gulp-imagemin';
import {deleteAsync} from 'del';
import cleanCss from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'

gulp.task('lint-css', function () {
    return gulp.src('src/scss/**/*.scss')
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
    let postcssPlugins = [
        autoprefixer(),
        cmq()
    ];
    return gulp.src('src/scss/bootstrap-admin.scss')
        .pipe(sourcemaps.init({debug: true}))
        .pipe(sass.sync({
            outputStyle: "expanded"
        }).on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
});


gulp.task('css_min', function () {
    let postcssPlugins = [
        autoprefixer(),
        cmq()
    ];
    return gulp.src('src/scss/bootstrap-admin.scss')
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
            'src/scss/**/*.scss',
            //除了plugins-override不需要修复
            '!src/scss/plugins-override/*.scss',
        ])
        .pipe(gulpStylelint({
            fix: true,
        }))
        .pipe(gulp.dest('src/scss'));

});


gulp.task('img', function (cb) {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
    cb();
})


let files = [
    ...[
        'lib/@eonasdan/tempus-dominus/*',
        '!lib/@eonasdan/tempus-dominus/dist',
    ],
    ...[
        'lib/@popperjs/core/*',
        '!lib/@popperjs/core/dist',
    ],
    ...[
        'lib/@ztree/ztree_v3/*',
        '!lib/@ztree/ztree_v3/css',
        '!lib/@ztree/ztree_v3/js',
    ],
    ...[
        'lib/bootstrap/*',
        '!lib/bootstrap/dist',
    ],
    ...[
        'lib/bootstrap-icons/*',
        '!lib/bootstrap-icons/font'
    ],
    ...[
        'lib/bootstrap-quicktab/*',
        '!lib/bootstrap-quicktab/dist'
    ],
    ...[
        'lib/bootstrap-table/*',
        '!lib/bootstrap-table/dist'
    ],
    ...[
        'lib/chart.js/*',
        '!lib/chart.js/dist',
    ],
    ...[
        'lib/croppie/*',
        '!lib/croppie/croppie.css',
        '!lib/croppie/croppie.js',
        '!lib/croppie/croppie.min.js',
    ],
    ...[
        'lib/dropzone/*',
        '!lib/dropzone/dist',
    ],
    ...[
        'lib/echarts/*',
        '!lib/echarts/dist',
    ],
    ...[
        'lib/jquery/*',
        '!lib/jquery/dist',
    ],
    ...[
        'lib/moment/*',
        '!lib/moment/dist',
        '!lib/moment/locale',
        '!lib/moment/min',
    ],
    ...[
        'lib/select2/*',
        '!lib/select2/dist',
    ],
    ...[
        'lib/select2-bootstrap-5-theme/*',
        '!lib/select2-bootstrap-5-theme/dist',
    ],
    ...[
        'lib/smooth-scrollbar/*',
        '!lib/smooth-scrollbar/dist',
    ],
    ...[
        'lib/sweetalert2/*',
        '!lib/sweetalert2/dist',
    ],
    ...[
        'lib/tinymce/*',
        '!lib/tinymce/icons',
        '!lib/tinymce/langs',
        '!lib/tinymce/models',
        '!lib/tinymce/plugins',
        '!lib/tinymce/skins',
        '!lib/tinymce/themes',
        '!lib/tinymce/tinymce.js',
        '!lib/tinymce/tinymce.min.js',
    ],
    ...[
        'lib/@fonticonpicker/fonticonpicker/*',
        '!lib/@fonticonpicker/fonticonpicker/dist',
    ],
    ...[
        'lib/bootstrap-fileinput/*',
        '!lib/bootstrap-fileinput/css',
        '!lib/bootstrap-fileinput/img',
        '!lib/bootstrap-fileinput/js',
        '!lib/bootstrap-fileinput/themes',
    ],
];


gulp.task('lib', async function (cb) {
    const deletedFilePaths = await deleteAsync(files, {dot: true});
    console.log('lib依赖目录脏目录删除:\n', deletedFilePaths.join('\n'));
});

gulp.task('style', gulp.series(['lint-css', 'lint-css-min']));

gulp.task('default', gulp.series(['style','img', 'lib']));

gulp.task("dev", function (cb) {
    gulp.watch(['src/scss/**/*.scss'], gulp.series('css'));
    cb()
});







