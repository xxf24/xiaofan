<script setup lang="ts">
import DefaultTheme from "vitepress/theme-without-fonts"
import DocCtrlPanel from "./components/DocCtrlPanel.vue"
import DocHeader from "./components/DocHeader.vue"
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <DocCtrlPanel />
      <DocHeader />
    </template>
  </DefaultTheme.Layout>
</template>
