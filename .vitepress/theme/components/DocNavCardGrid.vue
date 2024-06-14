<script setup lang="ts">
import { withBase } from 'vitepress'
import { formatDate } from '@vueuse/core'
import type { MarkdownMetaArr } from '../utils/types'

defineProps<{
  docs: MarkdownMetaArr
}>()
</script>

<template>
  <div class="mx-auto w-fit">
    <div class="px-5 pb-20 pt-5 md:px-8">
      <ul class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <li v-for="(doc, index) in docs" :key="index">
          <a
            :href="withBase(doc.link)"
            class="mx-auto max-w-96 flex flex-col overflow-hidden border rounded-lg shadow transition"
            hover="shadow-xl dark:shadow-[0_0_15px_rgba(255,255,255,0.2),0_0_3px_1px_rgba(255,255,255,0.15)]"
          >
            <div class="h-52 w-full md:h-48">
              <img
                v-if="doc.cover?.length"
                :src="doc.cover[0]"
                class="h-full w-full rounded-b-none object-cover duration-1000 hover:scale-105"
                alt=""
                loading="lazy"
              />
            </div>
            <div class="mt-1 p-4 space-y-4">
              <div class="flex items-center justify-between leading-tight">
                <div>{{ doc.title }}</div>
                <div class="text-sm">
                  {{ formatDate(new Date(doc.date), 'YYYY年M月D日') }}
                </div>
              </div>
              <div
                class="line-clamp-2 overflow-hidden text-sm text-$vp-c-text-2"
              >
                {{ doc.description }}
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
