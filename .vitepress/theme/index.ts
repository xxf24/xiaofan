import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './styles/index.css'
import 'uno.css'

export default {
  Layout,
  enhanceApp() {},
} satisfies Theme
