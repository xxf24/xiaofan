import { computed } from 'vue'
import { useData } from 'vitepress'

const fallback = {
  link: '/',
  text: '返回首页',
}

export function useBackLink() {
  const { page, frontmatter } = useData()
  return computed(() => {
    const ret = [{ ...fallback }]
    const { relativePath } = page.value
    const back = frontmatter.value?.back
    if (back === false) {
      return ret
    }
    if (back) {
      ret.unshift(
        typeof back === 'string'
          ? {
              link: back,
              text: '返回目录页',
            }
          : {
              text: '返回目录页',
              ...back,
            },
      )
    } else if (
      relativePath.startsWith('posts/') ||
      relativePath.startsWith('notes/')
    ) {
      ret.unshift({
        link: `/${relativePath.slice(0, 5)}`,
        text: '返回目录页',
      })
    }
    return ret
  })
}
