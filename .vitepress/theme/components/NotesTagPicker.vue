<script setup lang="ts">
defineProps<{
  tags: Array<{ tag: string; len?: number }>
}>()

const activeTag = defineModel<string>({ required: true })
</script>

<template>
  <div class="flex flex-wrap gap-x-6 gap-y-1 py-4">
    <button
      v-for="{ tag, len } in tags"
      :key="tag"
      :class="
        activeTag === tag
          ? 'text-$vp-c-brand-1 underline underline-offset-2'
          : 'text-$vp-c-text-2'
      "
      class="relative p-2 text-sm transition"
      hover="text-$vp-c-brand-1"
      @click="activeTag = tag"
    >
      <span v-if="len" class="absolute top-1 -right-1">{{ len }}</span>
      {{ tag }}
    </button>
  </div>
</template>
