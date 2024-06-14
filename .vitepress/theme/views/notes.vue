<script setup lang="ts">
import { useCycleList, useEventListener } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import {
  sortPressByCategory,
  sortPressByNoteTags,
  sortPressByTimeline,
} from '../utils/sort'
import { getLinkByNoteView, parseNotesUrlHash } from '../utils/notes'
import DocTagPanel from '../components/DocTagPanel.vue'
import DocNavTextList from '../components/DocNavTextList.vue'
import type { MarkdownMetaArr, NotesView } from '../utils/types'

const props = defineProps<{
  docs: MarkdownMetaArr
}>()

const viewTabs: { key: NotesView; text: string; icon: string }[] = [
  { key: 'timeline', text: '时间线', icon: 'i-lucide:calendar' },
  { key: 'category', text: '文件夹', icon: 'i-lucide:folder-open' },
  { key: 'tags', text: '标签组', icon: 'i-lucide:tag' },
]

const view = computed(() => viewTab.value.key)
const { state: viewTab, index: activeViewIndex } = useCycleList(viewTabs, {
  fallbackIndex: 0,
})

const notesTag = sortPressByNoteTags(props.docs)
const tagList = Object.keys(notesTag)
const tagNum = tagList.map(item => notesTag[item].length)
const activeTag = ref(tagList[0])

const notes = computed(() => {
  if (view.value === 'tags') {
    return activeTag.value !== 'undefined'
      ? { [activeTag.value]: notesTag[activeTag.value] }
      : {}
  }
  if (view.value === 'category') {
    return sortPressByCategory(props.docs)
  }
  return sortPressByTimeline(props.docs)
})

const labels = computed(() => {
  if (view.value === 'timeline') {
    return Object.keys(notes.value).sort((a, b) => Number(b) - Number(a))
  }
  return Object.keys(notes.value)
})

onMounted(() => respectUrlHash())
useEventListener('hashchange', respectUrlHash)

function respectUrlHash() {
  const { view: nextView, tag } = parseNotesUrlHash(location.hash)
  if (view.value !== nextView) {
    activeViewIndex.value = viewTabs.findIndex(({ key }) => nextView === key)
  }
  if (tag) {
    activeTag.value = tag
  }
}
</script>

<template>
  <div class="mx-auto mb-20 max-w-3xl flex flex-col p-5 md:px-8">
    <nav class="mb-8 flex">
      <ul
        class="relative w-fit flex overflow-hidden rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800"
      >
        <li
          v-for="item in viewTabs"
          :key="item.key"
          :class="[
            'z-1 relative',
            viewTab.key === item.key
              ? 'text-$vp-c-text-1'
              : 'text-$vp-c-text-2',
          ]"
        >
          <a
            :href="getLinkByNoteView(item.key, activeTag)"
            class="h-7.5 w-24 inline-flex items-center justify-center gap-2 rounded-md bg-transparent text-sm transition hover:text-$vp-c-text-1"
          >
            <span :class="item.icon" />
            <span>{{ item.text }}</span>
          </a>
        </li>
        <li
          class="absolute inset-1 z-0 w-24 rounded-md bg-$vp-c-bg transition duration-300"
          :style="{ transform: `translateX(${activeViewIndex * 100}%` }"
        ></li>
      </ul>
    </nav>
    <template v-if="view === 'tags'">
      <DocTagPanel
        v-model="activeTag"
        class="mb-4"
        :tag-list="tagList"
        :tag-num="tagNum"
      />
      <DocNavTextList :labels="labels" :docs="notes" :active-tag="activeTag" />
    </template>
    <template v-else-if="view === 'category'">
      <DocNavTextList :labels="labels" :docs="notes" />
    </template>
    <template v-else>
      <DocNavTextList
        :labels="labels"
        :docs="notes"
        show-timeline
        date-format-str="M月D日"
      />
    </template>
  </div>
</template>
