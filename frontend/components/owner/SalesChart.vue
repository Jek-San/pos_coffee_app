<template>
  <div>
    <div
      v-for="point in props.data"
      :key="point.label"
      class="flex items-center mb-2"
    >
      <!-- Label -->
      <div class="w-16 text-sm text-slate-400">{{ point.label }}</div>

      <!-- Bar -->
      <div class="flex-1 bg-slate-700 rounded h-4 overflow-hidden">
        <div
          class="bg-green-500 h-4"
          :style="{ width: calcWidth(point.value) }"
        ></div>
      </div>

      <!-- Value -->
      <div class="ml-2 text-sm">{{ formatNumber(point.value) }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

// computed max value (guard for empty)
const maxValue = computed(() => {
  if (!props.data || props.data.length === 0) return 1
  const vals = props.data.map((d) => Number(d.value) || 0)
  const m = Math.max(...vals)
  return m > 0 ? m : 1
})

function calcWidth(value) {
  const val = Number(value) || 0
  const max = maxValue.value || 1
  // round to integer percent for nicer rendering
  return `${Math.round((val / max) * 100)}%`
}

function formatNumber(num) {
  const n = Number(num) || 0
  return n.toLocaleString("id-ID")
}
</script>
