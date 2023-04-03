import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import autoprefixer from "autoprefixer";
import cmq from 'node-css-mqpacker';
import imagemin from 'gulp-imagemin';
import {deleteAsync} from 'del';
import cleanCss from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'


gulp.task('expanded', function lintCssTask() {
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

gulp.task('compressed', function lintCssTask() {
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


gulp.task('expanded-plugins', function lintCssTask() {
    let postcssPlugins = [
        autoprefixer(),
        cmq()
    ];
    return gulp.src('src/scss/plugins/*.scss')
        .pipe(sourcemaps.init({debug: true}))
        .pipe(sass.sync({
            outputStyle: "expanded"
        }).on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/plugins'))
});


gulp.task('compressed-plugins', function lintCssTask() {
    let postcssPlugins = [
        autoprefixer(),
        cmq()
    ];
    return gulp.src('src/scss/plugins/*.scss')
        .pipe(sourcemaps.init({debug: true}))
        .pipe(sass.sync({
            outputStyle: "expanded"
        }).on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/plugins'))
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


gulp.task('css', gulp.series(['expanded', 'compressed', 'expanded-plugins', 'compressed-plugins']));
gulp.task('default', gulp.series(['css','img', 'lib']));

gulp.task("dev", function (cb) {
    gulp.watch(['src/scss/**/*.scss'], gulp.series('css'));
    cb()
});







