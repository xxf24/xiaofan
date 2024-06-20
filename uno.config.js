import { defineConfig, presetAttributify, presetIcons, presetUno } from "unocss"

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      scale: 1.12,
    }),
  ],
  theme: {
    duration: {
      DEFAULT: "250ms",
    },
  },
})
