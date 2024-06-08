import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import { setupComponents } from './components'
import notes from './pages/notes.vue'
import './styles/index.css'
import 'uno.css'

export default {
  Layout,
  enhanceApp({ app }) {
    setupComponents(app, { notes })
  },
} satisfies Theme
