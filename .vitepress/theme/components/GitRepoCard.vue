<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { formatTimeAgo, useElementVisibility } from '@vueuse/core'
import { ofetch } from 'ofetch'

defineOptions({
  name: 'GitRepoCard',
})

const { endPoint, timeout = 6000 } = defineProps<{
  endPoint: string
  timeout?: number
}>()

const data = shallowRef<Record<string, any>>({})
const state = ref<'loading' | 'ok' | 'error'>('loading')

const target = ref()
const targetVisibility = useElementVisibility(target)
const stop = watch(targetVisibility, value => {
  if (value) {
    requestRemote()
    stop()
  }
})

function requestRemote() {
  ofetch(`https://api.github.com/repos/${endPoint}`, {
    timeout,
    headers: {
      Accept: 'application/vnd.github.v4+json',
    },
  })
    .then(res => {
      data.value = {
        ...wrapperResData(res),
        avatar_url: res.owner.avatar_url,
      }
      state.value = 'ok'
    })
    .catch(() => requestLocalCache())
}

function requestLocalCache() {
  ofetch(new URL('../../data/repos.json', import.meta.url).href)
    .then(res => {
      const item = res.items?.[endPoint]
      if (item) {
        data.value = {
          ...wrapperResData(item),
          avatar_url: item.avatar_url,
          stamp: res.stamp,
        }
        state.value = 'ok'
      } else {
        throw new Error('request error')
      }
    })
    .catch(() => {
      state.value = 'error'
    })
}

function wrapperResData(res: any) {
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
      class="h-30 animate-pulse bg-black/5 dark:bg-white/10"
    />
    <div v-else class="p-4">
      <a
        :href="data.html_url"
        target="_blank"
        class="mb-2 inline-flex items-center gap-2 !after:hidden"
      >
        <img
          :src="data.avatar_url"
          class="h-5 w-5 overflow-hidden rounded-full"
          alt=""
        />
        {{ endPoint }}
      </a>
      <div class="mb-4 break-words text-sm">{{ data.description }}</div>
      <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs text-$vp-c-text-2">
        <div class="flex items-center gap-1">
          <span
            class="h-2.5 w-2.5 rounded-full border border-gray-500/40"
            :style="{ 'background-color': getLanguageColor(data.language) }"
          />
          {{ data.language }}
        </div>
        <div class="flex items-center gap-1" title="GitHub Stars">
          <span class="i-lucide-star" />{{ data.stargazers_count }}
        </div>
        <div class="flex items-center gap-1" title="GitHub Forks">
          <span class="i-lucide-git-fork" />{{ data.forks_count }}
        </div>
        <div
          v-if="data.stamp"
          class="ml-auto flex items-center gap-1"
          title="Last Updated"
        >
          <span class="i-lucide-save" />
          <span>data updated {{ formatTimeAgo(new Date(data.stamp)) }}</span>
        </div>
        <div class="flex items-center gap-1" title="Latest PR">
          <span class="i-lucide-git-pull-request-create-arrow" />
          <span>{{ formatTimeAgo(new Date(data.pushed_at)) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
