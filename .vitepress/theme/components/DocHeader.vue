<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { formatDate, formatTimeAgo } from '@vueuse/core'
import { getLinkByNoteTag } from '../utils/notes'

const { frontmatter } = useData()

const props = computed(() => {
  let ctime = ''
  let mtime = ''
  const { custom, title, date, tags, lastUpdateTime } = frontmatter.value
  if (!custom) {
    return
  }
  if (date) {
    ctime =
      custom === 'center'
        ? formatDate(new Date(date), 'YYYY年M月D日', { locales: 'zh-CN' })
        : formatDate(new Date(date), 'MMM D, YYYY', { locales: 'en' })
  }
  if (lastUpdateTime) {
    mtime = formatTimeAgo(new Date(lastUpdateTime))
  }
  return {
    custom,
    title,
    ctime,
    mtime,
    tags,
  }
})
</script>

<template>
  <div
    v-if="!!props?.custom"
    class="flex flex-col gap-4 pb-4"
    :class="props.custom === 'center' && 'items-center'"
  >
    <h1 v-if="props.title" class="text-3xl font-bold">
      {{ props.title }}
    </h1>
    <ul class="flex flex-wrap gap-x-6 gap-y-3 text-sm text-$vp-c-text-2">
      <li
        v-if="props.ctime"
        class="flex items-center gap-1"
        title="本文首次发布"
      >
        <span class="i-lucide:calendar" />
        <span>{{ props.ctime }}</span>
      </li>
      <li
        v-if="props.mtime"
        class="flex items-center gap-1"
        title="最近一次修改"
      >
        <span class="i-lucide:file-pen" />
        <span>{{ props.mtime }}</span>
      </li>
      <li v-if="props.tags" class="flex items-center">
        <span
          class="mr-1 transition peer-hover:text-$vp-c-brand-1"
          :class="props.tags.length > 1 ? 'i-lucide:tags' : 'i-lucide:tag'"
        />
        <template v-for="(tag, index) in props.tags" :key="index">
          <a
            :href="getLinkByNoteTag(tag)"
            class="peer transition hover:text-$vp-c-brand-1"
            >{{ tag }}</a
          >
          <span v-if="index < props.tags.length - 1" class="ml-0.5 mr-1.5"
            >,</span
          >
        </template>
      </li>
    </ul>
  </div>
</template>
