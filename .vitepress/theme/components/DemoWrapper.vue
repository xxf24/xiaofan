<script setup lang="ts">
withDefaults(
  defineProps<{
    client?: boolean
    center?: boolean
  }>(),
  {
    client: true,
    center: true,
  },
)
</script>

<template>
  <div
    class="w-screen flex -ml-6 sm:ml-0 sm:w-full"
    :class="center && 'justify-center'"
  >
    <div class="mx-2 w-fit overflow-hidden border rounded-lg p-4">
      <template v-if="client">
        <ClientOnly>
          <slot />
        </ClientOnly>
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>
