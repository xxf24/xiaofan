<script setup lang="ts">
defineProps<{
  tagList: string[]
  tagSize?: number[]
}>()

const activeTag = defineModel()
</script>

<template>
  <div class="flex flex-wrap gap-x-6 gap-y-1 py-4">
    <button
      v-for="(tag, index) in tagList"
      :key="tag"
      :class="
        activeTag === tag
          ? 'text-$vp-c-brand-1 underline underline-offset-2'
          : 'text-$vp-c-text-2'
      "
      class="relative p-2 text-sm transition hover:text-$vp-c-brand-1"
      @click="activeTag = tag"
    >
      <span>{{ tag }}</span>
      <span class="absolute top-1 -right-1">{{ tagSize?.[index] }}</span>
    </button>
  </div>
</template>
