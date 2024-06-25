<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'CollapseBox',
})

const { defaultOpen } = withDefaults(
  defineProps<{
    defaultOpen?: boolean
    slotPlace?: 'top' | 'bottom'
    text?: string
    icon?: string
  }>(),
  {
    defaultOpen: false,
    slotPlace: 'top',
    text: '展开',
    icon: 'i-lucide-lightbulb',
  },
)

const open = ref(defaultOpen)
</script>

<template>
  <div class="flex flex-col">
    <div class="relative text-center">
      <div class="absolute top-1/2 w-full border-b" />
      <div
        class="relative h-9 w-80 inline-flex-center gap-2 border rounded-full bg-$vp-c-bg transition"
        hover="cursor-pointer bg-$vp-c-bg-alt"
        active="scale-105"
        @click="open = !open"
      >
        <span class="text-sm">{{ open ? '收起' : text }}</span>
        <span :class="open ? 'i-lucide-chevron-up' : icon" />
      </div>
    </div>
    <div v-show="open" :class="slotPlace === 'top' && 'order-first'">
      <slot />
    </div>
  </div>
</template>
