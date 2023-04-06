import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';


const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';

import gulpStylelint from '@ronilaukkarinen/gulp-stylelint';



import gulpCopy from "gulp-copy";
import concat from "gulp-concat";
import terser from "gulp-terser";
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


//压缩文档样式
gulp.task('docs_css', function () {
    return gulp.src([
        'node_modules/docsify-sidebar-collapse/dist/sidebar-folder.min.css',
        'node_modules/docsify/lib/themes/vue.css',
        'node_modules/purecss/build/buttons-min.css',
        'node_modules/docsify-plugin-toc/dist/light.css',
        'node_modules/bootstrap-icons/font/bootstrap-icons.css',
        'docs/src/css/style.css',
    ])
        .pipe(concat('docsify.css'))
        .pipe(cleanCss({level: {1: {specialComments: 0}}}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('docs/dist/css'));
});


//压缩文档js
gulp.task('docs_js', function () {
    return gulp.src([
        'node_modules/docsify/lib/docsify.min.js',
        'node_modules/prismjs/components/prism-bash.min.js',
        'node_modules/prismjs/components/prism-php.min.js',
        'node_modules/prismjs/components/prism-python.min.js',
        'node_modules/prismjs/components/prism-cmake.min.js',
        'node_modules/prismjs/components/prism-java.min.js',
        'node_modules/prismjs/components/prism-csharp.min.js',
        'node_modules/prismjs/components/prism-docker.min.js',
        'node_modules/prismjs/components/prism-powershell.min.js',
        'node_modules/docsify-tabs/dist/docsify-tabs.min.js',
        'node_modules/docsify-copy-code/dist/docsify-copy-code.min.js',
        'node_modules/docsify-pagination/dist/docsify-pagination.min.js',
        'node_modules/docsify/lib/plugins/external-script.min.js',
        'node_modules/docsify/lib/plugins/search.min.js',
        'node_modules/docsify/lib/plugins/zoom-image.min.js',
        'node_modules/docsify-count/dist/countable.min.js',
        'node_modules/docsify-sidebar-collapse/dist/docsify-sidebar-collapse.min.js',
        'node_modules/docsify-plugin-toc/dist/docsify-plugin-toc.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'docs/src/js/index.js',
    ])
        .pipe(concat('docsify.js'))
        .pipe(terser())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('docs/dist/js'));
});


gulp.task('docs_img', function (cb) {
    gulp.src('docs/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/dist/img'))
    cb();
})


gulp.task('docs_fonts', function() {
    return gulp.src([
        'node_modules/bootstrap-icons/font/fonts/*'
    ]) .pipe(gulpCopy('docs/dist',{prefix:3}))
});





//自动移入,注意该任务执行时间较长,请耐心等待。
gulp.task('move_lib', function() {
    return gulp.src([
        'node_modules/@eonasdan/**/*',
        'node_modules/@popperjs/**/*',
        'node_modules/@ztree/**/*',
        'node_modules/bootstrap/**/*',
        'node_modules/bootstrap-icons/**/*',
        'node_modules/bootstrap-quicktab/**/*',
        'node_modules/bootstrap-table/**/*',
        'node_modules/chart.js/**/*',
        'node_modules/croppie/**/*',
        'node_modules/dropzone/**/*',
        'node_modules/echarts/**/*',
        'node_modules/jquery/**/*',
        'node_modules/moment/**/*',
        'node_modules/select2/**/*',
        'node_modules/select2-bootstrap-5-theme/**/*',
        'node_modules/smooth-scrollbar/**/*',
        'node_modules/sweetalert2/**/*',
        'node_modules/tinymce/**/*',
        'node_modules/@fonticonpicker/**/*',
        'node_modules/bootstrap-fileinput/**/*',
    ])
        .pipe(gulpCopy('lib',{prefix:1}))
});



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
gulp.task('clean_lib', async function (cb) {
    const deletedFilePaths = await deleteAsync(files, {dot: true});
    console.log('lib依赖目录脏目录删除:\n', deletedFilePaths.join('\n'));
});

//tinymce插件的语言包
gulp.task('tinymce_langs', function() {
    return gulp.src([
        'src/langs/*'
    ]) .pipe(gulpCopy('lib/tinymce',{prefix:1}))
});

//formvalidation表单验证插件
gulp.task('move_formvalidation', function() {
    return gulp.src([
        'src/formvalidation/**/*'
    ]) .pipe(gulpCopy('lib',{prefix:1}))
});

gulp.task('style', gulp.series(['lint-css', 'lint-css-min']));

//文档统一指令
gulp.task('docs', gulp.series(['docs_css', 'docs_js','docs_img','docs_fonts']));

//lib目录统一指令
gulp.task('lib', gulp.series(['move_lib', 'clean_lib','tinymce_langs','move_formvalidation']));

gulp.task('default', gulp.series(['style', 'img', 'lib']));

gulp.task("dev", function (cb) {
    gulp.watch(['src/scss/**/*.scss'], gulp.series('css'));
    cb()
});







