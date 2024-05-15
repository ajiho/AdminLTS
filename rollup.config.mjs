import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import stripBanner from 'rollup-plugin-strip-banner';
import getBanner from "./build/banner.mjs"


const plugins = [
  resolve(),
  commonjs(),
  stripBanner({
    include: '**/*.js',
    exclude: 'node_modules/**'
  }),
  babel({
    babelHelpers: 'bundled',
    exclude: ['node_modules/**', 'src/js/utils/vent.js']
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(terser({
    output: {
      comments() {
        return false
      }
    }
  }))
}


const config = [];


const base = {
  banner: getBanner(),
  sourcemap: true,//方便调试
}


let input = 'src/js/bootstrap-admin.js'
let file = 'dist/js/bootstrap-admin.js'
if (process.env.NODE_ENV === 'production') {
  file = file.replace(/\.js$/, '.min.js')
}

config.push({
  input,
  output: {
    ...base,
    format: 'umd',
    name: 'BootstrapAdmin',
    file,
    globals: {
      jquery: 'jQuery'
    },
  },
  external: ['jquery'],
  plugins
})


input = 'src/mock/index.js'
file = 'dist/js/bootstrap-admin.mock.js'
if (process.env.NODE_ENV === 'production') {
  file = file.replace(/\.js$/, '.min.js')
}

config.push({
  input,
  output: {
    ...base,
    format: 'iife',
    // name: 'BootstrapAdmin',
    file,
    globals: {
      jquery: 'jQuery'
    },
  },
  external: ['jquery'],
  plugins,
  onwarn: function (message) {//避免打包mock.js的时候会报错
    if (message.code === 'EVAL') {
      return;
    }
    this.onwarn(message)
  }
})


export default config;
