const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')
const scss = require('rollup-plugin-scss')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')


module.exports = {
    input: 'build/js/Bsa.js',
    output: [
        {
            file: 'dist/js/Bsa.js',
            format: 'umd',
            name: 'BSA'
        },
        {
            file: 'dist/js/Bsa.min.js',
            format: 'umd',
            name: 'BSA',
            plugins: [terser({compress: {drop_console: false}})]
        }
    ],
    //使用json插件
    plugins: [
        json(),
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            // 单副本
            babelHelpers: 'bundled'
        }),
        scss({
            //输出文件名
            output: "./dist/css/Bsa.css",
            processor: () => postcss([autoprefixer({
                // 定义浏览器参数
                overrideBrowserslist: ['last 2 versions', '>= 0.5%', 'not ie < 11'],
                // 是否添加浏览器前缀，默认：true
                cascade: true,
                // 是否移除不必要的浏览器前缀，默认：true
                remove: true
            })]),
            //输出格式
            outputStyle: 'compressed',
            failOnError: true,
            //监听变化的文件
            watch: [
                'build/scss',
            ]
        })
    ]
}