<script setup lang="ts">
import { withBase } from 'vitepress'
import { formatDate } from '@vueuse/core'
import { getLinkByNoteTag } from '../utils/notes'

const { collapsible } = defineProps<{
  label: string
  notes: MarkdownMetaArr
  activeTag?: string
  dateFormatStr?: string
  showTimeline?: boolean
  collapsible?: boolean
}>()

const open = defineModel({ default: true })

// for eslint error
defineEmits(['update:modelValue'])

function preventCollapsing(event: Event) {
  if (!collapsible) {
    event.preventDefault()
  }
}
</script>

<template>
  <!-- <details
    :open="open"
    @toggle="$emit('update:modelValue', $event.target.open)"
  > -->
  <details :open="open">
    <summary class="h-12 w-full flex items-center" @click="preventCollapsing">
      <span class="text-right text-2xl" :class="showTimeline && 'w-16'">
        {{ label }}
      </span>
      <span v-if="showTimeline" class="relative z-1 w-12 inline-flex-center">
        <span
          class="h-3 w-3 rounded-full outline-$vp-c-brand-1 outline -outline-offset-2"
        />
      </span>
      <span class="ml-auto">
        <slot name="label-right" />
      </span>
    </summary>
    <ul>
      <li
        v-for="(note, index) in notes"
        :key="index"
        class="group rounded-lg transition hover:bg-gray-400/10"
      >
        <a class="flex items-center" :href="withBase(note.link)">
          <div
            class="relative h-10 flex flex-shrink-0 items-center"
            :class="
              showTimeline
                ? 'w-12 before:content-empty before:absolute before:left-[calc(50%-1px)] before:-top-50% before:h-[calc(100%-5px)] before:mt-1 before:w-full before:border-l-2 before:border-l-dotted'
                : 'w-8'
            "
          >
            <span
              class="z-1 mx-auto h-[5px] w-[5px] rounded-full bg-$vp-c-brand-1 transition-all group-hover:h-5"
            />
          </div>
          <div
            class="mr-2 py-2 underline underline-current underline-offset-4 underline-dotted transition sm:mr-4 group-hover:text-$vp-c-brand-1 group-hover:underline-solid"
          >
            {{ note.title }}
          </div>
          <div
            v-if="note.tags?.length"
            class="mr-2 gap-1"
            :class="[
              activeTag ? 'ml-auto sm:ml-0 flex flex-wrap' : 'hidden sm:flex',
              showTimeline && 'ml-auto',
            ]"
          >
            <a
              v-for="tag in note.tags"
              :key="tag"
              :href="getLinkByNoteTag(tag)"
              class="inline-flex-center rounded-md bg-gray-400/20 px-2 py-0.5 text-xs transition hover:text-$vp-c-brand-1"
              >{{ tag }}</a
            >
          </div>
          <div
            class="flex-shrink-0 text-right text-sm"
            :class="[
              showTimeline
                ? 'order-first w-16'
                : 'font-$vp-font-family-mono ml-auto mr-4',
              activeTag && 'sm:block hidden',
            ]"
          >
            {{ formatDate(new Date(note.date), dateFormatStr ?? 'YYYY/MM/DD') }}
          </div>
        </a>
      </li>
    </ul>
  </details>
</template>
