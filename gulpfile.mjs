import gulp from 'gulp';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

import postcss from 'gulp-postcss';
import autoprefixer from "autoprefixer";
import cmq from 'node-css-mqpacker';
import imagemin from 'gulp-imagemin';
import {deleteAsync} from 'del';


//css
gulp.task('css', function lintCssTask() {

    //插件
    let plugins = [
        //根据.browserslistrc文件自动给css添加浏览器前缀
        autoprefixer(),
        //媒体查询合并处理,解决大量的媒体查询标签问题
        cmq()
    ];

    return gulp.src('src/scss/bootstrap-admin.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('css:plugins', function lintCssTask() {

    //插件
    let plugins = [
        //根据.browserslistrc文件自动给css添加浏览器前缀
        autoprefixer(),
        //媒体查询合并处理,解决大量的媒体查询标签问题
        cmq()
    ];

    return gulp.src('src/scss/plugins/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/css/plugins'));
});



//处理lib目录多余的文件
gulp.task('cleanLib', async function (cb) {


    const deletedFilePaths = await deleteAsync([
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
    ]);
    console.log('Deleted files:\n', deletedFilePaths.join('\n'));
});


//图片资源压缩处理(否则有的图片可能有好几M)
gulp.task('img', function (cb) {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
    cb();
})


//gulp 压缩css  img ,清理lib插件目录的所有文件
gulp.task('default', gulp.series(['css', 'img', 'cleanLib']));


// gulp dev:开发时改变对应的文件会自动执行对应的任务
gulp.task("dev", function (cb) {
    gulp.watch(['src/scss/**/*.scss'], gulp.series('css'));
    cb()
});







