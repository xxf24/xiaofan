export type NotesView = 'category' | 'timeline' | 'tags'

export type MarkdownMeta = {
  link: string
  date: string
  title: string
  description?: string
  category?: string
  tags?: string[]
  cover?: string[]
  draft?: boolean
  lastUpdateTime?: string
}

export type MarkdownMetaArr = Array<MarkdownMeta>
export type MarkdownMetaMap = Record<string, MarkdownMetaArr>
