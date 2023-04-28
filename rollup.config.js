import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {babel} from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import eslint from '@rollup/plugin-eslint';


import pkg from './package.json'

const year = new Date().getFullYear()
const banner = `/*!
 * bootstrap-admin v${pkg.version} (${pkg.homepage})
 * Copyright 2021-${year} ${pkg.author}
 * license ${pkg.license} (https://gitee.com/ajiho/bootstrap-admin/blob/2.x/LICENSE)
 */`

export default {
    input: 'build/js/bootstrap-admin.js',
    output: [
        {
            banner,
            file: 'dist/js/bootstrap-admin.js',
            format: 'umd',
            globals: {
                jquery: 'jQuery',
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
                'bootstrap-quicktab': 'Quicktab',
            },
            name: 'BootstrapAdmin',
            plugins: [
                terser({compress: {drop_console: false}})
            ]
        }
    ],
    external: ['jquery','bootstrap-quicktab'],
    //使用json插件
    plugins: [
        json(),
        resolve(),
        commonjs(),
        eslint({
            throwOnError: true,
            throwOnWarning: true,
            include: ['build/**'],
            exclude: ['node_modules/**'],
            fix: true
        }),
        babel({
            exclude: 'node_modules/**',
            // 用于指定 Babel 在转换 ES6+ 代码时使用的辅助函数的路径
            babelHelpers: 'bundled'
        })
    ]
};