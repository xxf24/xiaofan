<script setup lang="ts">
import PostsNavCard from '../components/PostsNavCard.vue'
import postsData from '@/data/posts.json'

defineOptions({
  name: 'posts',
})
</script>

<template>
  <main class="mx-auto w-fit">
    <div class="px-5 pb-20 pt-5 md:px-8">
      <ul class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <li v-for="(data, index) in postsData" :key="index">
          <PostsNavCard v-bind="data" />
        </li>
      </ul>
    </div>
  </main>
</template>
