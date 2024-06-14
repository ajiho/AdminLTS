import browserSync from 'browser-sync'

const bs = browserSync.create();


bs.init({
  notify: false,
  port: 3001,
  open: true,
  files: [
    "dist/css/*.css",
    "dist/js/*.js",
    "dist/*.html",
    "dist/img/*",
  ],
  reloadDelay: 500,
  reloadDebounce: 500,
  //禁止其它设备映射相同的行为
  ghostMode: false,
  server: {
    baseDir: ['dist'],
    routes: {
      '/node_modules': '../node_modules'
    }
  }
})
