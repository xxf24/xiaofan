import { formatDate } from '@vueuse/core'
import type { DefaultTheme } from 'vitepress'
import postsJson from '../data/__posts.json'
import notesJson from '../data/__notes.json'
import { sortPressByCategory, sortPressByTimeline } from './sort'

export const sidebar: DefaultTheme.Sidebar = {
  '/posts': [
    {
      text: '😋 岁岁年年',
      link: '/posts/',
      collapsed: false,
      items: [...getPostsSidebar(postsJson)],
    },
    {
      text: '🍀 音·游·书·影',
      link: '/posts/arts/',
      collapsed: true,
      items: [
        { text: '读《逃避自由》', link: '/posts/arts/逃避自由' },
        { text: '读《四十自述》', link: '/posts/arts/四十自述' },
        { text: '年度回顾之 2024', link: '/posts/arts/2024' },
        { text: '年度回顾之 2023', link: '/posts/arts/2023' },
      ],
    },
    {
      text: '🍚 干饭记',
      link: '/posts/cooks/',
    },
    {
      text: '⭐ 书签页',
      link: '/posts/share/',
    },
  ],
  '/notes': [
    {
      text: '🚀 目录页',
      link: '/notes/',
    },
    ...getNotesSidebar(notesJson),
  ],
}

function getPostsSidebar(posts: MarkdownMetaArr): DefaultTheme.SidebarItem[] {
  const zodiacEmojiList = [...'🐭🐮🐯🐰🐉🐍🐴🐑🐒🐔🐶🐷']
  const postsByTimeline = sortPressByTimeline(posts)
  const isCollapsed = (key: string) =>
    key !== new Date().getFullYear().toString()
  return Object.keys(postsByTimeline)
    .reverse()
    .map(key => ({
      text: `<div class='flex justify-between'>
        <span>${key}</span>
        <span class='zodiac-emoji transition'>${zodiacEmojiList[(Number.parseInt(key) - 2020) % 12]}</span>
      </div>`,
      collapsed: isCollapsed(key),
      items: postsByTimeline[key].map(({ title, link, date }) => ({
        text: `<div class='flex justify-between items-center'>
          <span>${title}</span>
          <span class="text-xs">${formatDate(new Date(date), 'M/D')}</span>
        </div>`,
        link,
      })),
    }))
}

function getNotesSidebar(notes: MarkdownMetaArr): DefaultTheme.SidebarItem[] {
  const categoryToEmoji: Record<string, string> = {
    开发: '👨‍💻',
    练习: '📐',
    问答: '🙋‍♂️',
    上网: '🗺️',
  }
  const notesByCategory = sortPressByCategory(notes)
  return Object.keys(notesByCategory).map(key => ({
    text: `${categoryToEmoji[key]} ${key}`,
    collapsed: false,
    items: notesByCategory[key].map(({ title: text, link }) => ({
      text,
      link,
    })),
  }))
}
