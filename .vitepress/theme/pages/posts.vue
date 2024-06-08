<script setup lang="ts">
import postsJson from '@/data/__posts.json'
import DocNavCardView from '../components/DocNavCardView.vue'
</script>

<template>
  <DocNavCardView :items="postsJson" />
</template>
