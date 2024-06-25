import { type App, h } from 'vue'
import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import DocHeader from './components/DocHeader.vue'
import './styles/main.css'
import 'uno.css'

export default {
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-before': () => h(DocHeader),
    }),
  enhanceApp({ app }) {
    setupGlobalComponents(app)
  },
} satisfies Theme

function setupGlobalComponents(app: App) {
  // @ts-expect-error
  const items: Record<string, Component> = import.meta.glob(
    ['./components/*.vue', './pages/*.vue'],
    {
      import: 'default',
      eager: true,
    },
  )
  Object.values(items).forEach(item => {
    if (item.name) {
      app.component(item.name, item)
    }
  })
}
