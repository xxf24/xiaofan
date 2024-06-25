<script setup lang="ts">
import type { NotesView } from '../utils/notes'

defineProps<{
  tabs: Array<{ key: NotesView; text: string; icon: string }>
}>()

const activeIndex = defineModel<number>({ required: true })
</script>

<template>
  <div class="flex">
    <ul
      class="relative overflow-hidden rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800"
    >
      <li
        v-for="(tab, idx) in tabs"
        :key="idx"
        :class="activeIndex === idx ? 'text-$vp-c-text-1' : 'text-$vp-c-text-2'"
        class="z-1 relative inline-flex"
      >
        <button
          class="h-8 w-24 inline-flex-center gap-2 text-sm rounded-md bg-transparent transition"
          hover="text-$vp-c-text-1"
          @click="activeIndex = idx"
        >
          <span :class="tab.icon" />{{ tab.text }}
        </button>
      </li>
      <li
        class="absolute inset-1 z-0 w-24 rounded-md bg-$vp-c-bg transition duration-300"
        :style="{ transform: `translateX(${activeIndex * 100}%` }"
      ></li>
    </ul>
  </div>
</template>
