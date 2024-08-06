import { defineConfig } from 'vitepress'
import { shared } from './shared.mjs'
import { zh } from './zh.mjs'
import { en } from './en.mjs'

export default defineConfig({
  ...shared,

  locales: {
    en: { label: 'English', ...en },
    root: { label: '简体中文', ...zh },
  },
})
