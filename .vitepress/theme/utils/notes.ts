import { withBase } from "vitepress"

import type { NotesView } from "./types"

const defaultNotesPathPrefix = withBase("/notes#")

export function getLinkByNoteTag(tag: string, prefix = defaultNotesPathPrefix) {
  return `${prefix}view=tags&tag=${tag}`
}

export function getLinkByNoteView(
  view: NotesView,
  tag: string,
  prefix = defaultNotesPathPrefix,
) {
  const url = view !== "tags" ? `${prefix}view=${view}` : getLinkByNoteTag(tag)
  return decodeURIComponent(url)
}

export function parseNotesUrlHash(hash: string) {
  const params = new URLSearchParams(hash.slice(1))
  const view = params.get("view") as NotesView
  const tag = params.get("tag")
  return view === "tags" && tag
    ? {
        view,
        tag: decodeURIComponent(tag),
      }
    : {
        view: view || "timeline",
      }
}
