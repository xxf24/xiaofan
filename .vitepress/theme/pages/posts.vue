<script setup lang="ts">
import DocNavCardView from '../components/DocNavCardView.vue'
import postsJson from '@/data/__posts.json'
</script>

<template>
  <DocNavCardView :items="postsJson" />
</template>
