<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'
import { formatDate } from '@vueuse/core'
import { getLinkByNoteTag } from '../utils/notes'

const props = withDefaults(
  defineProps<{
    notes: MarkdownMetaOrderArr
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
  Array.from({ length: props.notes.length }, () => !props.collapsible),
)

function doCollapsing(event: Event, index: number) {
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
      v-for="({ label, items }, index) in notes"
      :key="index"
      :open="openList[index]"
      @click="doCollapsing($event, index)"
    >
      <summary class="h-12 flex items-center">
        <span class="text-right text-2xl" :class="showTimeline && 'w-16'">{{
          label
        }}</span>
        <span v-if="showTimeline" class="relative z-1 w-12 inline-flex-center">
          <span
            class="h-3 w-3 rounded-full outline-$vp-c-brand-1 outline outline-3 -outline-offset-3"
          />
        </span>
      </summary>
      <ul>
        <li
          v-for="(item, index) in items"
          :key="index"
          class="not-last:border-b border-b-dotted"
        >
          <a
            :href="withBase(item.link)"
            class="group h-10 flex items-center rounded-lg transition"
            hover="bg-gray-400/10"
          >
            <div
              class="relative h-full flex-center"
              :class="
                showTimeline
                  ? 'w-12 before:content-empty before:absolute before:translate-x-[calc(50%-1px)] before:-top-50% before:h-100% before:w-full before:border-l-2 before:border-l-dotted'
                  : 'w-8'
              "
            >
              <span
                class="z-1 h-1.5 w-1.5 rounded-full bg-$vp-c-brand-1 transition-all group-hover:h-5"
              />
            </div>
            <div class="mr-2 transition sm:mr-4 group-hover:text-$vp-c-brand-1">
              {{ item.title }}
            </div>
            <div
              v-if="item.tags?.length"
              class="mr-2 gap-1"
              :class="[
                activeTag ? 'ml-auto sm:ml-0 flex flex-wrap' : 'hidden sm:flex',
                showTimeline && 'ml-auto',
              ]"
            >
              <a
                v-for="tag in item.tags"
                :key="tag"
                :href="getLinkByNoteTag(tag)"
                class="inline-flex rounded-md bg-gray-400/20 mt-1 px-2 py-0.5 text-xs transition"
                hover="text-$vp-c-brand-1"
                >{{ tag }}</a
              >
            </div>
            <div
              class="flex-shrink-0 text-right text-sm"
              :class="[
                showTimeline ? 'order-first w-16' : 'ml-auto mr-4 mt-1',
                activeTag && 'sm:block hidden',
              ]"
            >
              {{ formatDate(new Date(item.date), dateFormatStr) }}
            </div>
          </a>
        </li>
      </ul>
    </details>
  </div>
</template>
