import { withBase } from 'vitepress'

export type NotesView = 'category' | 'timeline' | 'tags'

const notesPathPrefix = withBase('/notes#')

export function getLinkByNoteTag(tag: string, prefix = notesPathPrefix) {
  return `${prefix}view=tags&tag=${tag}`
}

export function getLinkByNoteView(
  view: NotesView,
  tag: string,
  prefix = notesPathPrefix,
) {
  const url = view !== 'tags' ? `${prefix}view=${view}` : getLinkByNoteTag(tag)
  return decodeURIComponent(url)
}

export function parseNotesUrlHash(hash: string) {
  const params = new URLSearchParams(hash.slice(1))
  const view = params.get('view') as NotesView
  const tag = params.get('tag')
  return view === 'tags' && tag
    ? {
        view,
        tag: decodeURIComponent(tag),
      }
    : {
        view: view || 'timeline',
      }
}
