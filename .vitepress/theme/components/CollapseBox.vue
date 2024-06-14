<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean
    slotPlace?: 'top' | 'bottom'
    label?: string
    icon?: string
  }>(),
  {
    defaultOpen: false,
    slotPlace: 'top',
    icon: 'i-lucide:lightbulb',
  },
)

const open = ref(props.defaultOpen)
</script>

<template>
  <div class="flex flex-col">
    <div class="relative text-center">
      <div class="absolute top-1/2 w-full border-b" />
      <div
        class="relative mx-auto h-9 w-80 inline-flex items-center justify-center gap-2 border rounded-2xl bg-$vp-c-bg transition"
        hover="cursor-pointer bg-$vp-c-bg-alt"
        @click="open = !open"
      >
        <span :class="open ? 'i-lucide:chevron-up' : icon" />
        <span v-if="label" class="text-sm">{{ label }}</span>
      </div>
    </div>
    <div v-show="open" :class="props.slotPlace === 'top' && 'order-first'">
      <slot />
    </div>
  </div>
</template>
