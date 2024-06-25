<script setup lang="ts">
defineOptions({
  name: 'DemoWrapper',
})

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
      <component :is="client ? 'ClientOnly' : 'div'">
        <slot />
      </component>
    </div>
  </div>
</template>
