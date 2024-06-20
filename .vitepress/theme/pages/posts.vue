<script setup lang="ts">
import DocNavCard from "../components/DocNavCard.vue"
import type { MarkdownMetaArr } from "../utils/types"

defineProps<{
  items: MarkdownMetaArr
}>()
</script>

<template>
  <div class="mx-auto w-fit">
    <div class="px-5 pb-20 pt-5 md:px-8">
      <ul class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <li v-for="(item, index) in items" :key="index">
          <DocNavCard v-bind="item" />
        </li>
      </ul>
    </div>
  </div>
</template>
