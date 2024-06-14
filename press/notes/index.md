---
layout: page
---

<script setup>
import Notes from '@/theme/views/notes.vue'
import notesJson from '@/data/__notes.json'
</script>

<Notes :docs="notesJson" />
