import { sxzz } from '@sxzz/eslint-config'

export default sxzz([
  {
    rules: {
      'unicorn/filename-case': 'off',
      'vue/html-self-closing': 'off',
    },
  },
  {
    ignores: ['.vitepress/data/*.json', 'press/**/ts-handbook.md'],
  },
])
