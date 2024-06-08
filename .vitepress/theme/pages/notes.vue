<script setup lang="ts">
import { useCycleList, useEventListener } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
import {
  sortPressByCategory,
  sortPressByNoteTags,
  sortPressByTimeline,
} from '@/config/sort'
import notesJson from '@/data/__notes.json'
import {
  type NotesView,
  getLinkByNoteTag,
  getLinkByNoteView,
  parseNotesUrlHash,
} from '../utils/notes'
import DocNavTextList from '../components/DocNavTextList.vue'

const viewTabs: { key: NotesView; text: string; icon: string }[] = [
  { key: 'timeline', text: '时间线', icon: 'i-lucide:calendar' },
  { key: 'category', text: '文件夹', icon: 'i-lucide:folder-open' },
  { key: 'tags', text: '标签组', icon: 'i-lucide:tag' },
]

const { state: viewTab, index: activeViewIndex } = useCycleList(viewTabs, {
  fallbackIndex: 0,
})
const view = computed(() => viewTab.value.key)

const notesTag = sortPressByNoteTags(notesJson)
const tagList = Object.keys(notesTag)
const tagNum = tagList.map(item => notesTag[item].length)
const activeTag = ref(tagList[0])

watch(activeTag, tag => window.open(getLinkByNoteTag(tag), '_self'))

const notes = computed(() => {
  if (view.value === 'tags') {
    return activeTag.value !== 'undefined'
      ? { [activeTag.value]: notesTag[activeTag.value] }
      : {}
  }
  if (view.value === 'category') {
    return sortPressByCategory(notesJson)
  }
  return sortPressByTimeline(notesJson)
})

const notesKeyList = computed(() => {
  if (view.value === 'timeline') {
    return Object.keys(notes.value).sort((a, b) => Number(b) - Number(a))
  }
  return Object.keys(notes.value)
})

const openFlags = ref<{
  timeline: boolean[]
  category: boolean[]
}>({
  timeline: [],
  category: [],
})

watch(
  () => view.value,
  value => {
    if (value === 'timeline' && openFlags.value.timeline.length === 0) {
      openFlags.value.timeline = Array.from(
        { length: Object.keys(notes.value).length },
        () => true,
      )
    }
  },
)

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
  <div class="">
    <div class="mx-auto mb-20 max-w-3xl flex flex-col gap-8 p-5 md:px-8">
      <nav class="flex">
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
              class="h-7.5 w-24 inline-flex-center gap-2 rounded-md bg-transparent text-sm transition hover:text-$vp-c-text-1"
              >{{ item.text }}</a
            >
          </li>
          <li
            class="absolute inset-1 z-0 w-24 rounded-md bg-$vp-c-bg transition"
            :style="{ transform: `translateX(${activeViewIndex * 100}%` }"
          ></li>
        </ul>
      </nav>

      <div class="space-y-4">
        <template v-if="view === 'tags'">
          <div class="flex flex-wrap gap-x-6 gap-y-1 p-1 sm:p-4">
            <button
              v-for="(tag, index) in tagList"
              :key="tag"
              :class="
                activeTag === tag
                  ? 'text-$vp-c-brand-1 underline underline-offset-2'
                  : 'text-$vp-c-text-2'
              "
              class="relative p-2 transition hover:text-$vp-c-brand-1"
              @click="activeTag = tag"
            >
              <span>{{ tag }}</span>
              <span class="absolute top-1 -right-1">{{ tagNum?.[index] }}</span>
            </button>
          </div>
          <DocNavTextList
            v-for="key in notesKeyList"
            :key="key"
            :label="key"
            :notes="notes[key]"
            :active-tag="activeTag"
          ></DocNavTextList>
        </template>
        <template v-else-if="view === 'category'">
          <DocNavTextList
            v-for="(key, index) in notesKeyList"
            :key="key"
            v-model="openFlags.category[index]"
            :label="key"
            :notes="notes[key]"
          ></DocNavTextList>
        </template>
        <template v-else>
          <DocNavTextList
            v-for="(key, index) in notesKeyList"
            :key="key"
            v-model="openFlags.timeline[index]"
            :label="key"
            :notes="notes[key]"
            date-format-str="M月D日"
            show-timeline
          ></DocNavTextList>
        </template>
      </div>
    </div>
  </div>
</template>
