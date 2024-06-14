<script setup lang="ts">
import { ref, watch } from 'vue'
import { formatTimeAgo, useElementVisibility } from '@vueuse/core'
import axios from 'axios'

const { endPoint, timeout = 6000 } = defineProps<{
  endPoint: string
  timeout?: number
}>()

const state = ref<'loading' | 'success' | 'failed'>('loading')
const data = ref<Record<string, any>>({})

const target = ref()
const targetVisibility = useElementVisibility(target)

const stop = watch(targetVisibility, value => {
  if (value) {
    request()
    stop()
  }
})

function request() {
  const api = `https://api.github.com/repos/${endPoint}`
  axios
    .get(api, {
      timeout,
      headers: {
        Accept: 'application/vnd.github.v4+json',
      },
    })
    .then(res => {
      data.value = {
        ...prepareRespData(res.data),
        avatar_url: res.data.owner.avatar_url,
      }
      state.value = 'success'
    })
    .catch(() => {
      const url = new URL('../../data/repos.json', import.meta.url).href
      axios.get(url).then(res => {
        const item = res.data.items?.[endPoint]
        if (item) {
          data.value = {
            ...prepareRespData(item),
            avatar_url: item.avatar_url,
            stamp: res.data.stamp,
          }
          state.value = 'success'
        } else {
          state.value = 'failed'
        }
      })
    })
}

function prepareRespData(res: any) {
  return {
    html_url: res.html_url,
    description: res.description,
    language: res.language,
    stargazers_count: formatNumber(res.stargazers_count),
    forks_count: formatNumber(res.forks_count),
    pushed_at: res.pushed_at,
  }
}

function formatNumber(value: number) {
  return value > 999 ? `${(value / 1000).toFixed(1)}k` : value.toString()
}

function getLanguageColor(language?: string) {
  const colorMap: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Vue: '#41b883',
    Other: '#ededed',
  }
  if (language && colorMap[language]) {
    return colorMap[language]
  } else {
    return colorMap.Other
  }
}
</script>

<template>
  <div ref="target" class="overflow-hidden border rounded-lg">
    <div
      v-if="state === 'loading'"
      class="min-h-30 animate-pulse bg-black/5 dark:bg-white/10"
    />
    <div v-else class="p-4">
      <a
        :href="data.html_url"
        target="_blank"
        class="mb-2 inline-flex items-center !after:hidden"
      >
        <div class="mr-2">
          <img
            :src="data.avatar_url"
            class="h-5 w-5 overflow-hidden rounded-full"
            alt="avatar"
          />
        </div>
        <span>{{ endPoint }}</span>
      </a>
      <div class="mb-4 break-words text-sm">{{ data.description }}</div>
      <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs text-$vp-c-text-2">
        <div class="flex items-center">
          <span
            class="h-2.5 w-2.5 rounded-full"
            :style="{ 'background-color': getLanguageColor(data.language) }"
          />
          <span class="ml-1">{{ data.language }}</span>
        </div>
        <div class="flex items-center" title="GitHub Stars">
          <span class="i-lucide:star" />
          <span class="ml-1">{{ data.stargazers_count }}</span>
        </div>
        <div class="flex items-center" title="GitHub Forks">
          <span class="i-lucide:git-fork" />
          <span class="ml-1">{{ data.forks_count }}</span>
        </div>
        <div :class="data.stamp && 'ml-auto'">
          {{
            data.stamp
              ? `Updated ${formatTimeAgo(new Date(data.stamp))}`
              : `Last PR on ${formatTimeAgo(new Date(data.pushed_at))}`
          }}
        </div>
      </div>
    </div>
  </div>
</template>
