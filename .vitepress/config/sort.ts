export function sortPressByTimeline(
  source: MarkdownMetaArr,
  reverse?: boolean,
) {
  const acc = new Map<string, MarkdownMetaArr>()
  const copied = reverse ? source.slice().reverse() : source
  copied.forEach(item => {
    const y = item.date.slice(0, 4)
    acc.set(y, [...(acc.get(y) || []), item])
  })
  return Object.fromEntries(acc)
}

export function sortPressByCategory(
  source: MarkdownMetaArr,
  localeOrder = false,
  fallback = '',
) {
  const acc = new Map<string, MarkdownMetaArr>()
  source.forEach(item => {
    const { category = fallback } = item
    acc.set(category, [...(acc.get(category) || []), item])
  })
  if (localeOrder) {
    acc.forEach((value, key) => {
      acc.set(
        key,
        value.sort((a, b) => b.title.localeCompare(a.title)),
      )
    })
  }
  return Object.fromEntries(acc)
}

export function sortPressByNoteTags(source: MarkdownMetaArr) {
  const raw = source.reduce((acc, cur) => {
    if (cur?.tags?.length) {
      cur.tags.forEach(tag => {
        if (acc[tag]) {
          acc[tag]!.push(cur)
        } else {
          acc[tag] = [cur]
        }
      })
    }
    return acc
  }, {} as MarkdownMetaMap)

  return Object.fromEntries(
    Object.entries(raw).sort((a, b) => b[1].length - a[1].length),
  )
}
