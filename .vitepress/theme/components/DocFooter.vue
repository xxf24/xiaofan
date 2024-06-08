<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()

const prevNext = computed(() => {
  const { prev, next } = frontmatter.value
  return {
    prev,
    next,
  }
})
</script>

<template>
  <div class="mt-24">
    <div
      v-if="prevNext.prev || prevNext.next"
      class="flex flex-wrap gap-4 border-t text-sm text-$vp-c-text-2"
      :class="!prevNext.prev ? 'justify-end' : 'justify-between'"
    >
      <a
        v-if="prevNext.prev"
        :href="withBase(prevNext.prev.link)"
        class="group inline-flex flex-col gap-2 py-4"
      >
        <div class="flex items-center gap-1">
          <span class="i-lucide:chevron-left" />
          <span class="text-xs">早些时候</span>
        </div>
        <div
          class="text-$vp-c-text-1 transition group-hover:text-$vp-c-brand-1"
        >
          {{ prevNext.prev.text }}
        </div>
      </a>
      <a
        v-if="prevNext.next"
        :href="withBase(prevNext.next.link)"
        class="group inline-flex flex-col gap-2 py-4"
      >
        <div class="flex items-center justify-end gap-1">
          <span class="text-xs">晚些时候</span>
          <span class="i-lucide:chevron-right" />
        </div>
        <div
          class="text-$vp-c-text-1 transition group-hover:text-$vp-c-brand-1"
        >
          {{ prevNext.next.text }}
        </div>
      </a>
    </div>
  </div>
</template>
