import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import anchor from 'markdown-it-anchor'
import prism from 'markdown-it-prism'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  // 部署在 GitHub Pages 子路径时由 CI 注入 BASE_PATH，本地开发保持根路径
  base: process.env.BASE_PATH || '/',
  plugins: [
    // 让 .md 文件也能作为 Vue 组件被编译
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      markdownItSetup(md) {
        // 给标题生成锚点 id，便于后续做页内目录跳转
        md.use(anchor, { permalink: anchor.permalink.headerLink() })
        // 代码块语法高亮（依赖 prismjs）
        md.use(prism)
      },
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
})
