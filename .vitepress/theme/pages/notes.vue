<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import {
  type NotesView,
  getLinkByNoteView,
  parseNotesUrlHash,
} from '../utils/notes'
import {
  sortPressByTimeline,
  sortPressByCategory,
  sortPressByTag,
} from '../utils/sort'
import NotesNavBlock from '../components/NotesNavBlock.vue'
import NotesViewTabs from '../components/NotesViewTabs.vue'
import NotesTagPicker from '../components/NotesTagPicker.vue'
import notesData from '@/data/notes.json'

defineOptions({
  name: 'notes',
})

const viewTabs: Array<{ key: NotesView; text: string; icon: string }> = [
  { key: 'timeline', text: '时间线', icon: 'i-lucide-calendar' },
  { key: 'category', text: '文件夹', icon: 'i-lucide-folder-open' },
  { key: 'tags', text: '标签组', icon: 'i-lucide-tag' },
]
const activeViewIndex = ref(0)
const activeView = computed(() => viewTabs[activeViewIndex.value].key)

const orderTagNotes = sortPressByTag(notesData)
const tags = orderTagNotes.map(({ label, items }) => ({
  tag: label,
  len: items.length,
}))
const activeTag = ref(tags[0].tag)

watch([activeView, activeTag], ([view, tag]) => {
  const url = getLinkByNoteView(view, tag)
  window.open(url, '_self')
})

const notes = computed(() => {
  if (activeView.value === 'category') {
    return sortPressByCategory(notesData)
  }
  if (activeView.value === 'tags') {
    const index = tags.findIndex(({ tag }) => tag === activeTag.value)
    return [{ label: activeTag.value, items: orderTagNotes[index].items }]
  }
  return sortPressByTimeline(notesData)
})

onMounted(() => respectUrlHash())
useEventListener('hashchange', respectUrlHash)

function respectUrlHash() {
  const { view: newView, tag } = parseNotesUrlHash(location.hash)
  if (activeView.value !== newView) {
    activeViewIndex.value = viewTabs.findIndex(({ key }) => newView === key)
  }
  if (tag) {
    activeTag.value = tag
  }
}
</script>

<template>
  <main class="mx-auto max-w-3xl p-5 md:p-8">
    <div class="mb-20 flex flex-col">
      <NotesViewTabs class="mb-8" v-model="activeViewIndex" :tabs="viewTabs" />
      <template v-if="activeView === 'tags'">
        <NotesTagPicker class="mb-6" v-model="activeTag" :tags />
        <NotesNavBlock :notes :activeTag />
      </template>
      <template v-else-if="activeView === 'category'">
        <NotesNavBlock :notes />
      </template>
      <template v-else>
        <NotesNavBlock :notes showTimeline dateFormatStr="M月D日" />
      </template>
    </div>
  </main>
</template>
