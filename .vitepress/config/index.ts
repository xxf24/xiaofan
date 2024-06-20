import { defineConfig } from "vitepress"
import unocss from "unocss/vite"
import postsJson from "../data/posts.json"
import notesJson from "../data/notes.json"
import { sidebar } from "./sidebar"
import { tsConfigPaths, vpComponentAlias } from "./alias"
import type { MarkdownMetaArr } from "../theme/utils/types"

export default defineConfig({
  srcDir: "press",
  outDir: "dist",
  cacheDir: "node_modules/.cache/.vitepress",

  title: "小凡の个人日志",
  description: "这个人很懒，什么描述都不想写",
  head: [
    ["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
  ],

  base: "/",
  cleanUrls: true,
  rewrites: {
    "posts/index.md": "posts.md",
    "notes/index.md": "notes.md",
  },

  themeConfig: {
    sidebar,
    nav: [
      { text: "日常", link: "/posts/", activeMatch: "^/posts" },
      { text: "笔记", link: "/notes/", activeMatch: "^/notes" },
      { text: "关于", link: "/about" },
    ],
    outline: { label: "在本页", level: [2, 3] },
    sidebarMenuLabel: "目录",
    returnToTopLabel: "返回顶部",
    darkModeSwitchLabel: "深色模式",
    externalLinkIcon: true,
  },

  vite: {
    resolve: {
      alias: [...tsConfigPaths, ...vpComponentAlias],
    },
    plugins: [
      unocss({
        // patch: don't extractor the content in default theme
        content: {
          pipeline: {
            include: ["../.vitepress/**/*.vue", "**/*.md"],
          },
        },
      }),
    ],
  },

  transformPageData({ relativePath, frontmatter }) {
    const isPosts = relativePath.startsWith("posts")
    const fileLink = `/${relativePath.replace(/\.md$/, "")}`
    const markMeta = getMarkdownMeta(fileLink, isPosts ? postsJson : notesJson)
    const presets: Record<string, any> = isPosts
      ? {
          center: true,
          prev: markMeta?.prev,
          next: markMeta?.next,
        }
      : {
          lastUpdateTime: markMeta?.lastUpdateTime,
        }
    return {
      frontmatter: {
        ...presets,
        ...frontmatter,
      },
    }
  },
})

function getMarkdownMeta(fileLink: string, press: MarkdownMetaArr) {
  const index = press.findIndex(({ link }) => link === fileLink)
  if (index > -1) {
    let prev, next
    if (press.length > 1) {
      prev =
        index > 0
          ? {
              link: press[index - 1].link,
              text: press[index - 1].title,
            }
          : void 0
      next =
        index < press.length - 1
          ? {
              link: press[index + 1].link,
              text: press[index + 1].title,
            }
          : void 0
    }
    const lastUpdateTime = press[index].lastUpdateTime
    return { prev, next, lastUpdateTime }
  }
}
