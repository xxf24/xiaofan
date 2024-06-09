<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useIntervalFn, useTimestamp, useWebWorkerFn } from '@vueuse/core'
import { nQueens$3 as nQueens } from './solutions'
import ChessBoard from './chess-board.vue'

const N_Max = 15
const n = ref(8)
const _n = ref(n.value)

const solving = ref(false)
const playing = ref(false)
const loading = computed(() => solving.value && n.value > 13)

const results = ref<number[][]>([])
const current = computed(() => results.value[index.value - 1] || [])
const index = ref(1)
const total = computed(() => results.value.length)

const stamp = useTimestamp()
const start = ref(0)
const timer = ref('?')
const lockedPlaces = ref<number[]>([])

const { workerFn, workerTerminate } = useWebWorkerFn(nQueens)
const { resume, pause } = useIntervalFn(() => setIndex(index.value + 1), 2500, {
  immediate: false,
})

watch(n, value => value !== _n.value && startCalculate(value))
watch(playing, () => (playing.value ? resume() : pause()))
watchEffect(() => {
  if (solving.value) {
    const ms = Math.max(stamp.value - start.value, 10)
    timer.value = (ms / 1000).toFixed(2)
  }
})

onMounted(() => startCalculate(_n.value))

function startCalculate(value: number) {
  start.value = Date.now()
  playing.value && pause()
  solving.value = true
  lockedPlaces.value = Array.from({ length: 4 })
  workerFn(value)
    .then(res => {
      solving.value = false
      results.value = JSON.parse(res)
      index.value = 1
      _n.value = value
      playing.value && resume()
    })
    .catch(() => stopCalculate())
}

function stopCalculate() {
  workerTerminate()
  n.value = _n.value
  solving.value = false
  playing.value && resume()
}

function setIndex(value: number) {
  if (solving.value) {
    return
  }
  if (value === total.value + 1 && index.value === total.value) {
    index.value = 1
    return
  }
  if (value === 0 && index.value === 1) {
    index.value = total.value
    return
  }
  index.value = Math.max(1, Math.min(value, total.value))
}

function setLockedPlaces(x: number, y: number) {
  if (lockedPlaces.value[0] === x && lockedPlaces.value[1] === y) {
    lockedPlaces.value = Array.from({ length: 4 })
  } else {
    lockedPlaces.value = [x, y, x + y, x - y]
  }
}
</script>

<template>
  <div class="relative space-y-4">
    <div class="flex items-center gap-4">
      <div class="text-3xl font-bold">
        <span>N</span>
        <span class="ml-4">=</span>
      </div>
      <div class="flex overflow-hidden border rounded-md">
        <button
          class="w-8 inline-flex-center bg-gray-400/20 disabled:opacity-60"
          :disabled="n === 1 || solving"
          @click="n -= 1"
        >
          <span class="i-lucide:minus" />
        </button>
        <input v-model="n" class="w-16 p-1 text-center text-xl" readonly />
        <button
          class="w-8 inline-flex-center bg-gray-400/20 disabled:opacity-60"
          :disabled="n === N_Max || solving"
          @click="n += 1"
        >
          <span class="i-lucide:plus" />
        </button>
      </div>
      <button
        v-if="loading"
        class="inline-flex-center gap-2 border border-gray-500/20 rounded-md border-solid px-4 py-1.5 transition"
        hover="bg-black/5 dark:bg-white/10"
        @click="stopCalculate"
      >
        <span class="i-svg-spinners:clock"></span>
        <span class="text-sm">取消</span>
      </button>
    </div>

    <div class="flex items-center gap-2 text-sm">
      找到<span class="min-w-12 border-b text-center">{{
        solving ? '🤔' : total
      }}</span
      >种摆法，用时<span class="min-w-10 border-b text-center">{{ timer }}</span
      >秒
    </div>

    <div class="max-w-full overflow-x-auto overflow-y-hidden">
      <div class="relative inline-block">
        <ChessBoard
          :n="_n"
          :queens="current"
          :locked="lockedPlaces"
          @tap="setLockedPlaces"
        ></ChessBoard>
        <Transition name="fade">
          <div
            v-if="loading"
            class="absolute inset-0 flex-center flex-col rounded-md bg-white/70 dark:bg-black/70"
          >
            <span class="i-svg-spinners:blocks-shuffle-3 h-7 w-7" />
            <span class="mt-2 text-sm">努力计算中...</span>
          </div>
        </Transition>
      </div>
    </div>

    <div v-if="!loading && current.length" class="flex items-center">
      <button
        :title="playing ? '停止演示' : '点击自动轮播'"
        class="inline-flex-center rounded-md bg-gray-400/20 p-2"
        @click="playing = !playing"
      >
        <span v-if="!playing" class="i-lucide:play h-5 w-5" />
        <span v-else class="i-lucide:pause h-5 w-5" />
      </button>
      <span
        v-if="playing"
        class="i-svg-spinners:3-dots-scale-middle ml-4 h-5 w-5"
      ></span>
      <div class="ml-4 flex items-center gap-2">
        <div class="text-sm">第</div>
        <div class="flex overflow-hidden border rounded-md">
          <button
            class="w-8 inline-flex-center bg-gray-400/20"
            @click="setIndex(index - 1)"
          >
            <span class="i-lucide:skip-back" />
          </button>
          <input
            v-model="index"
            class="w-20 p-1 text-center text-base"
            @change="setIndex(index)"
            @keydown.enter="setIndex(index)"
          />
          <button
            class="w-8 inline-flex-center bg-gray-400/20"
            @click="setIndex(index + 1)"
          >
            <span class="i-lucide:skip-forward" />
          </button>
        </div>
        <div class="text-sm">种摆法</div>
      </div>
    </div>
  </div>
</template>
