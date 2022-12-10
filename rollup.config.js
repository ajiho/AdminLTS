'use strict'

const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { babel } = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')

const pkg = require('./package')
const year = new Date().getFullYear()
const banner = `/*!
 * bootstrap-admin v${pkg.version} (${pkg.homepage})
 * Copyright 2021-${year} ${pkg.author}
 * license ${pkg.license} (https://gitee.com/ajiho/bootstrap-admin/blob/master/LICENSE)
 */`


module.exports = {
    input: 'build/js/Admin.js',
    output: [
        {
            banner,
            file: 'dist/js/bootstrap-admin.js',
            format: 'umd',
            name: 'BSA'
        },
        {
            banner,
            file: 'dist/js/bootstrap-admin.min.js',
            format: 'umd',
            name: 'BSA',
            plugins: [
                terser({compress: {drop_console: false}})
            ]
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
        })
    ]
}