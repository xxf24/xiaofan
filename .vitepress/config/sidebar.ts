import type { DefaultTheme } from 'vitepress'
import { formatDate } from '@vueuse/core'
import { sortPressByCategory, sortPressByTimeline } from '../theme/utils/sort'
import postsJson from '../data/posts.json'
import notesJson from '../data/notes.json'

export const sidebar: DefaultTheme.Sidebar = {
  '/posts': [
    {
      text: '😄 岁岁年年',
      link: '/posts',
      collapsed: false,
      items: getPostsSidebar(postsJson),
    },
    {
      text: '🍀 音·游·书·影',
      link: '/posts/arts/',
    },
    {
      text: '🍚 干饭记',
      link: '/posts/cooks/',
    },
    {
      text: '🏷️ 书签页',
      link: '/posts/share/',
    },
  ],
  '/notes': [
    {
      text: '🚀 目录页',
      link: '/notes',
    },
    ...getNotesSidebar(notesJson),
  ],
}

function getPostsSidebar(posts: MarkdownMetaArr): DefaultTheme.SidebarItem[] {
  const currentYearStr = new Date().getFullYear().toString()
  const zodiacEmojiList = [...'🐭🐮🐯🐰🐉🐍🐴🐑🐒🐔🐶🐷']
  return sortPressByTimeline(posts).map(({ label, items }) => ({
    collapsed: label !== currentYearStr,
    text: `<div class='flex justify-between'>
        <span>${label}</span>
        <span class='zodiac-emoji transition'>${zodiacEmojiList[(Number.parseInt(label) - 2020) % 12]}</span>
      </div>`,
    items: items.map(({ title, link, date }) => ({
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
  return sortPressByCategory(notes).map(({ label, items }) => ({
    text: `${categoryToEmoji[label] ?? ''} ${label}`,
    items: items.map(({ title, link }) => ({
      text: title,
      link,
    })),
  }))
}
