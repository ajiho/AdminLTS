import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel'
import getBanner from '../../build/data/banner.mjs'

const plugins = [
  resolve(),
  commonjs({
    exclude: 'src/js/loading.js',
  }),
  babel({
    babelHelpers: 'bundled',
    exclude: ['node_modules/**'],
  }),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    terser({
      output: {
        comments() {
          return false
        },
      },
    }),
  )
}

const config = []

const base = {
  banner: getBanner(),
  sourcemap: true, //方便调试
}

let input = 'src/js/adminlts.js'
let file = '.tmp/dist/js/adminlts.js'
if (process.env.NODE_ENV === 'production') {
  file = file.replace(/\.js$/, '.min.js')
}

config.push({
  input,
  output: {
    ...base,
    format: 'umd',
    name: 'adminlts',
    file,
    globals: {
      jquery: 'jQuery',
      quicktab: 'Quicktab',
    },
  },
  external: ['jquery', 'quicktab'],
  plugins,
})

input = 'src/mock/index.js'
file = '.tmp/dist/js/adminlts.mock.js'
if (process.env.NODE_ENV === 'production') {
  file = file.replace(/\.js$/, '.min.js')
}

config.push({
  input,
  output: {
    ...base,
    format: 'iife',
    file,
    globals: {
      mockjs: 'Mock',
    },
  },
  external: ['mockjs'],
  plugins,
})

export default config
