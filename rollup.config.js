'use strict'

const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const {babel} = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')
const eslint = require('@rollup/plugin-eslint')

const pkg = require('./package')
const year = new Date().getFullYear()
const banner = `/*!
 * bootstrap-admin v${pkg.version} (${pkg.homepage})
 * Copyright 2021-${year} ${pkg.author}
 * license ${pkg.license} (https://gitee.com/ajiho/bootstrap-admin/blob/2.x/LICENSE)
 */`


//注意：每次修改配置都要重新开启监听
module.exports = {
    input: 'src/js/bootstrap-admin.js',
    output: [
        {
            banner,
            file: 'dist/js/bootstrap-admin.js',
            format: 'umd',
            globals: {
                jquery: 'jQuery',
                'smooth-scrollbar': 'Scrollbar',
                'bootstrap-quicktab': 'Quicktab',
            },
            name: 'BootstrapAdmin'
        },
        {
            banner,
            file: 'dist/js/bootstrap-admin.min.js',
            format: 'umd',
            globals: {
                jquery: 'jQuery',
                'smooth-scrollbar': 'Scrollbar',
                'bootstrap-quicktab': 'Quicktab',
            },
            name: 'BootstrapAdmin',
            plugins: [
                terser({compress: {drop_console: false}})
            ]
        }
    ],
    external: ['jquery','smooth-scrollbar','bootstrap-quicktab'],
    //使用json插件
    plugins: [
        json(),
        resolve(),
        commonjs(),
        eslint({
            throwOnError: true,
            throwOnWarning: true,
            include: ['src/**'],
            exclude: ['node_modules/**'],
            fix: true
        }),
        babel({
            exclude: 'node_modules/**',
            // Include the helpers in the bundle, at most one copy of each
            babelHelpers: 'bundled'
        }),

    ]
}