<script setup lang="ts">
import { formatDate } from '@vueuse/core'
import { ref } from 'vue'
import { withBase } from 'vitepress'
import { getLinkByNoteTag } from '../utils/notes'
import type { MarkdownMetaMap } from '../utils/types'

const props = withDefaults(
  defineProps<{
    labels: string[]
    docs: MarkdownMetaMap
    activeTag?: string
    dateFormatStr?: string
    showTimeline?: boolean
    collapsible?: boolean
  }>(),
  {
    dateFormatStr: 'YYYY/MM/DD',
    collapsible: void 0,
  },
)

const openList = ref<boolean[]>(
  Array.from({ length: props.labels.length }, () => !props.collapsible),
)

function preventCollapsing(event: Event, index: number) {
  if (props.collapsible === void 0) {
    event.preventDefault()
    return
  }
  openList.value[index] = !openList.value[index]
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <details
      v-for="(label, index) in labels"
      :key="index"
      :open="openList[index]"
      @click="preventCollapsing($event, index)"
    >
      <summary class="h-12 w-full flex items-center">
        <span class="text-right text-2xl" :class="showTimeline && 'w-16'">
          {{ label }}
        </span>
        <span
          v-if="showTimeline"
          class="relative z-1 w-12 inline-flex items-center justify-center"
        >
          <span
            class="h-3 w-3 rounded-full outline-$vp-c-brand-1 outline -outline-offset-2"
          />
        </span>
      </summary>
      <ul>
        <li
          v-for="(doc, key) in docs[label]"
          :key="key"
          class="group rounded-lg transition hover:bg-gray-400/10"
        >
          <a class="flex items-center" :href="withBase(doc.link)">
            <div
              class="relative h-10 flex flex-shrink-0 items-center"
              :class="
                showTimeline
                  ? 'w-12 before:content-empty before:absolute before:left-[calc(50%-1px)] before:-top-50% before:h-[calc(100%-5px)] before:mt-1 before:w-full before:border-l-2 before:border-l-dotted'
                  : 'w-8'
              "
            >
              <span
                class="z-1 mx-auto h-1.5 w-1.5 rounded-full bg-$vp-c-brand-1 transition-all group-hover:h-5"
              />
            </div>
            <div
              class="mr-2 py-2 underline underline-current underline-offset-4 underline-dotted transition sm:mr-4 group-hover:text-$vp-c-brand-1 group-hover:underline-solid"
            >
              {{ doc.title }}
            </div>
            <div
              v-if="doc.tags?.length"
              class="mr-2 gap-1"
              :class="[
                activeTag ? 'ml-auto sm:ml-0 flex flex-wrap' : 'hidden sm:flex',
                showTimeline && 'ml-auto',
              ]"
            >
              <a
                v-for="tag in doc.tags"
                :key="tag"
                :href="getLinkByNoteTag(tag)"
                class="inline-flex-center rounded-md bg-gray-400/20 px-2 py-0.5 text-xs transition hover:text-$vp-c-brand-1"
                >{{ tag }}</a
              >
            </div>
            <div
              class="flex-shrink-0 text-right text-sm"
              :class="[
                showTimeline ? 'order-first w-16' : 'ml-auto mr-4',
                activeTag && 'sm:block hidden',
              ]"
            >
              {{ formatDate(new Date(doc.date), dateFormatStr) }}
            </div>
          </a>
        </li>
      </ul>
    </details>
  </div>
</template>
