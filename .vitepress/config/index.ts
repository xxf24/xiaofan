import { defineConfig } from 'vitepress'
import unocss from 'unocss/vite'
import { sidebar } from './sidebar'
import { tsConfigPaths, vpComponentAlias } from './alias'

export default defineConfig({
  srcDir: 'press',
  outDir: 'dist',
  cacheDir: 'node_modules/.cache/.vitepress',
  metaChunk: true,

  base: '/',
  title: '小凡の个人日志',
  description: '这个人很懒，什么都没有留下',
  lang: 'zh-Hans',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ],

  themeConfig: {
    sidebar,
    logo: { light: '/ai.jpg', dark: '/ff.jpg' },
    nav: [
      { text: '日常', link: '/posts/', activeMatch: '^/posts' },
      { text: '笔记', link: '/notes/', activeMatch: '^/notes' },
      { text: '关于', link: '/about' },
    ],
    externalLinkIcon: true,
    outline: { label: '在本页', level: [2, 3] },
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '深色模式',
  },

  cleanUrls: true,
  rewrites: {
    'posts/index.md': 'posts.md',
    'notes/index.md': 'notes.md',
  },

  markdown: {},

  vite: {
    resolve: {
      alias: [...tsConfigPaths, ...vpComponentAlias],
    },
    plugins: [
      unocss({
        // patch: don't extractor the content in default theme
        content: {
          pipeline: {
            include: ['../.vitepress/**/*.vue', '**/*.md'],
          },
        },
      }),
    ],
  },
})
