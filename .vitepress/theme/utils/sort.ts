export function sortPressByTimeline(
  source: MarkdownMetaArr,
): MarkdownMetaOrderArr {
  const acc = new Map<string, MarkdownMetaArr>()
  source.forEach(item => {
    const y = item.date.slice(0, 4)
    acc.set(y, [...(acc.get(y) || []), item])
  })
  return mapToArray(acc).sort((a, b) => Number(b.label) - Number(a.label))
}

export function sortPressByCategory(
  source: MarkdownMetaArr,
  fallback = '未分类',
): MarkdownMetaOrderArr {
  const acc = new Map<string, MarkdownMetaArr>()
  source.forEach(item => {
    const { category = fallback } = item
    acc.set(category, [...(acc.get(category) || []), item])
  })
  return mapToArray(acc)
}

export function sortPressByTag(source: MarkdownMetaArr): MarkdownMetaOrderArr {
  const acc = new Map<string, MarkdownMetaArr>()
  source.forEach(item => {
    const tags = item.tags
    if (tags?.length) {
      tags.forEach(tag => {
        acc.set(tag, [...(acc.get(tag) || []), item])
      })
    }
  })
  return mapToArray(acc).sort((a, b) => b.items.length - a.items.length)
}

function mapToArray(map: Map<string, MarkdownMetaArr>): MarkdownMetaOrderArr {
  return Array.from(map, ([label, items]) => ({ label, items }))
}
