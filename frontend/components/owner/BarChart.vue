<template>
  <div>
    <div v-for="item in props.data" :key="item.label" class="mb-3">
      <!-- Label & Value -->
      <div class="flex justify-between text-sm mb-1">
        <span>{{ item.label }}</span>
        <span>{{ item.value }}</span>
      </div>

      <!-- Bar -->
      <div class="bg-slate-700 rounded h-3 overflow-hidden">
        <div
          class="bg-blue-500 h-3"
          :style="{ width: calcWidth(item.value) }"
        ></div>
      </div>
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

const maxValue = computed(() => {
  if (!props.data || props.data.length === 0) return 1
  const vals = props.data.map((d) => Number(d.value) || 0)
  const m = Math.max(...vals)
  return m > 0 ? m : 1
})

function calcWidth(value) {
  const val = Number(value) || 0
  const max = maxValue.value || 1
  return `${Math.round((val / max) * 100)}%`
}
</script>
