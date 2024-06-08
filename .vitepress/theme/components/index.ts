import CollapseBox from './CollapseBox.vue'
import DemoWrapper from './DemoWrapper.vue'
import GitRepoCard from './GitRepoCard.vue'
import type { App, Component } from 'vue'

export const globals: Record<string, Component> = {
  CollapseBox,
  DemoWrapper,
  GitRepoCard,
}

export function setupComponents(app: App, rest?: typeof globals) {
  Object.entries({ ...globals, ...rest }).forEach(kv => app.component(...kv))
}
