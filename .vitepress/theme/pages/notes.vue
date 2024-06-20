<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, watch, watchEffect } from "vue"
import { useCycleList, useEventListener } from "@vueuse/core"
import {
  sortPressByCategory,
  sortPressByTag,
  sortPressByTimeline,
} from "../utils/sort"
import {
  getLinkByNoteTag,
  getLinkByNoteView,
  parseNotesUrlHash,
} from "../utils/notes"
import type {
  MarkdownMetaArr,
  MarkdownMetaOrderArr,
  NotesView,
} from "../utils/types"
import TagPicker from "../components/TagPicker.vue"
import DocNavTextBlock from "../components/DocNavTextBlock.vue"

const props = defineProps<{
  items: MarkdownMetaArr
}>()

const viewTabs: Array<{ key: NotesView; text: string; icon: string }> = [
  { key: "timeline", text: "时间线", icon: "i-lucide-calendar" },
  { key: "category", text: "文件夹", icon: "i-lucide-folder-open" },
  { key: "tags", text: "标签组", icon: "i-lucide-tag" },
]
const { state: viewState, index: activeViewIndex } = useCycleList(viewTabs)
const view = computed(() => viewState.value.key)

const tagList: string[] = []
const tagSize: number[] = []
const notesByTag = sortPressByTag(props.items)
notesByTag.forEach(({ label, items }) => {
  tagList.push(label)
  tagSize.push(items.length)
})
const activeTag = ref(tagList[0])

watch(activeTag, (tag) => window.open(getLinkByNoteTag(tag), "_self"))

const notes = shallowRef<MarkdownMetaOrderArr>([])
watchEffect(() => {
  if (view.value === "category") {
    notes.value = sortPressByCategory(props.items)
  } else if (view.value === "tags") {
    const index = tagList.findIndex((tag) => tag === activeTag.value)
    notes.value = [{ label: activeTag.value, items: notesByTag[index].items }]
  } else {
    notes.value = sortPressByTimeline(props.items)
  }
})

onMounted(() => respectUrlHash())
useEventListener("hashchange", respectUrlHash)

function respectUrlHash() {
  const { view: newView, tag } = parseNotesUrlHash(location.hash)
  if (view.value !== newView) {
    activeViewIndex.value = viewTabs.findIndex(({ key }) => newView === key)
  }
  if (tag) {
    activeTag.value = tag
  }
}
</script>

<template>
  <div class="mx-auto mb-20 max-w-3xl flex flex-col p-5 md:px-8">
    <div class="mb-8 flex">
      <ul
        class="relative flex overflow-hidden rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800"
      >
        <li
          v-for="item in viewTabs"
          :key="item.key"
          :class="[
            'z-1 relative',
            viewState.key === item.key
              ? 'text-$vp-c-text-1'
              : 'text-$vp-c-text-2',
          ]"
        >
          <a
            :href="getLinkByNoteView(item.key, activeTag)"
            class="h-7.5 w-24 inline-flex items-center justify-center text-sm rounded-md bg-transparent transition"
            hover="text-$vp-c-text-1"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.text }}</span>
          </a>
        </li>
        <span
          class="absolute inset-1 z-0 w-24 rounded-md bg-$vp-c-bg transition"
          :style="{
            transform: `translateX(${activeViewIndex * 100}%`,
          }"
        />
      </ul>
    </div>
    <template v-if="view === 'tags'">
      <TagPicker v-model="activeTag" :tagList :tagSize />
      <DocNavTextBlock class="mt-4" :notes :activeTag />
    </template>
    <template v-else-if="view === 'category'">
      <DocNavTextBlock :notes />
    </template>
    <template v-else-if="view === 'timeline'">
      <DocNavTextBlock :notes showTimeline dateFormatStr="M月D日" />
    </template>
  </div>
</template>
