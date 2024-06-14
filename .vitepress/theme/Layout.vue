<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import Welcome from './views/welcome.vue'
import DocFloatPanel from './components/DocFloatPanel.vue'
import DocHeader from './components/DocHeader.vue'

const Layout = DefaultTheme.Layout
</script>

<template>
  <Layout>
    <template #home-features-after>
      <Welcome />
    </template>
    <template #doc-before>
      <DocFloatPanel />
      <DocHeader />
    </template>
  </Layout>
</template>
