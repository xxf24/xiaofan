<script setup lang="ts">
import { toggle } from '../utils/dark'
</script>

<template>
  <button
    class="flex items-center justify-center rounded-full p-2.5 text-base text-$vp-c-text-2 transition"
    hover="text-$vp-c-text-1 bg-black/5 dark:bg-white/10"
    @click="toggle"
  >
    <span class="i-line-md:sun-rising-loop dark:i-line-md:moon-rising-loop" />
  </button>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>
