import Layout from './Layout.vue'
import { setupComponents } from './components'
import type { Theme } from 'vitepress'
import './styles/index.css'
import 'uno.css'

export default {
  Layout,
  enhanceApp({ app }) {
    setupComponents(app)
  },
} satisfies Theme
