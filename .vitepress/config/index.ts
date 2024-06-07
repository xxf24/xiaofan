import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: 'press',
  outDir: 'dist',
  cacheDir: 'node_modules/.cache/.vitepress',
  cleanUrls: true,
  metaChunk: true,

  title: '小凡の个人日志',
  description: '这个人很懒，什么都没有留下',
  lang: 'zh-Hans',
})
