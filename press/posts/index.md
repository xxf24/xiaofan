---
layout: page
---

<script setup lang="ts">
import DocNavCardGrid from '@/theme/components/DocNavCardGrid.vue'
import postsJson from '@/data/__posts.json'
</script>

<DocNavCardGrid :docs="postsJson" />
