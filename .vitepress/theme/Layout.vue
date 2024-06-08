<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import DocHeader from './components/DocHeader.vue'
import Begin from './pages/begin.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <DocHeader />
    </template>
    <template #home-features-after>
      <Begin />
    </template>
  </DefaultTheme.Layout>
</template>
