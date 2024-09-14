import { defineConfig } from "astro/config"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      {
        name: "watch-and-reload",
        configureServer(server) {
          const reload = (filePath) => {
            if (filePath.startsWith(path.join(__dirname, "../../.tmp/dist"))) {
              server.ws.send({
                type: "full-reload",
                path: "*",
              })
            }
          }

          server.watcher.on("add", (path) => reload(path))
          server.watcher.on("change", (path) => reload(path))
        },
      },
    ],
  },
  //构建配置
  build: {
    // 示例：在生成过程中生成`page.html`而不是`page/index.html`
    format: "file",
  },
  // 不要压缩html
  compressHTML: false,
  // 公共静态资源目录
  publicDir: "./.tmp/dist",
  // 源码目录
  srcDir: "./src/view",
  // 缓存目录
  cacheDir: "./dist",
  //输出目录
  outDir: "./dist",
  //开发工具栏
  devToolbar: {
    enabled: false,
  },
})
