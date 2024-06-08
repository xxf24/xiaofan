<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  defaultOpen?: boolean
  text?: string
  icon?: string
}>()

const open = ref(props.defaultOpen)
</script>

<template>
  <div class="relative flex flex-col gap-2">
    <div v-show="open">
      <slot />
    </div>
    <div class="relative text-center" @click="open = !open">
      <div class="absolute top-50% z-0 w-full border-b" />
      <div
        class="relative mx-auto h-9 w-80 flex-center gap-2 border rounded-2xl bg-$vp-c-bg-alt transition"
        hover="cursor-pointer"
        active="scale-105"
      >
        <span
          :class="open ? 'i-lucide:chevron-up' : icon ?? 'i-lucide:lightbulb'"
        />
        <span v-if="text" class="text-sm">{{ text }}</span>
      </div>
    </div>
  </div>
</template>
