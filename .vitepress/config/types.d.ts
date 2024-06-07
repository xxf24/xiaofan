declare interface MarkdownFileMeta {
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

declare type MarkdownMetaArr = MarkdownFileMeta[]
declare type MarkdownMetaMap = Record<string, MarkdownMetaArr>
