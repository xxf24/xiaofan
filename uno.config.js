import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.12,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'margin-top': '-2px',
      },
    }),
  ],
  transformers: [transformerDirectives()],
})
