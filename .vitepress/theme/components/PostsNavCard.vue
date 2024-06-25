<script setup lang="ts">
import { withBase } from 'vitepress'
import { formatDate } from '@vueuse/core'

defineProps<{
  link: string
  date: string
  title: string
  cover?: string[]
  description?: string
}>()
</script>

<template>
  <a
    :href="withBase(link)"
    class="group max-w-96 flex flex-col overflow-hidden border rounded-lg shadow transition"
    hover="shadow-xl dark:shadow-[0_0_15px_rgba(255,255,255,0.2),0_0_3px_1px_rgba(255,255,255,0.15)]"
  >
    <div class="h-52 w-full md:h-48">
      <img
        v-if="cover?.length"
        :src="cover[0]"
        class="h-full w-full rounded-b-none object-cover duration-1000"
        hover="scale-105"
        alt=""
        loading="lazy"
      />
    </div>
    <div class="w-full p-4 pt-5">
      <div class="flex items-center justify-between leading-tight">
        <div class="group-hover:text-$vp-c-brand-1 transition">{{ title }}</div>
        <div class="text-sm">
          {{ formatDate(new Date(date), 'YYYY年M月D日') }}
        </div>
      </div>
      <div class="mt-4 line-clamp-2 overflow-hidden text-sm text-$vp-c-text-2">
        {{ description }}
      </div>
    </div>
  </a>
</template>
