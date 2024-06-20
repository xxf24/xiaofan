export interface MarkdownMeta {
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
export type MarkdownMetaOrderArr = Array<{
  label: string
  items: MarkdownMetaArr
}>

export type NotesView = "category" | "timeline" | "tags"
