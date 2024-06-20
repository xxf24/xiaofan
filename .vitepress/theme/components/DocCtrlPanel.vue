<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core"

const { y: scrollY } = useWindowScroll()

function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}
</script>

<template>
  <div
    class="fixed bottom-5 right-8 z-50 hidden h-12 w-12 items-center justify-center rounded-full opacity-60 transition sm:inline-flex"
    hover="opacity-100 cursor-pointer bg-black/5 dark:bg-white/10"
    active="scale-105"
    :class="scrollY < 700 && 'pointer-events-none !opacity-0'"
    @click="toTop"
  >
    <span class="i-lucide:arrow-up" />
  </div>
</template>
