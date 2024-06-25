<script setup lang="ts">
import { toggle } from '../utils/dark'
</script>

<template>
  <div
    class="inline-flex-center rounded-full p-3 transition"
    hover="cursor-pointer bg-black/5 dark:bg-white/10"
    @click="toggle"
  >
    <span class="i-line-md-sun-rising-loop dark:i-line-md-moon-rising-loop" />
  </div>
</template>
