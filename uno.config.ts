import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'inline-flex-center': 'inline-flex items-center justify-center',
  },
})
