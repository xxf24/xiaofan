import type { Theme } from "vitepress"
import type { App, Component } from "vue"
import Layout from "./Layout.vue"
import "./styles/index.css"
import "uno.css"

function setupGlobalComponents(app: App) {
  // @ts-expect-error
  const items: Record<string, Component> = import.meta.glob(
    "./components/*.vue",
    {
      import: "default",
      eager: true,
    },
  )
  Object.values(items).forEach((item) => {
    if (item.name) {
      app.component(item.name, item)
    }
  })
}

export default {
  Layout,
  enhanceApp(ctx) {
    setupGlobalComponents(ctx.app)
  },
} satisfies Theme
