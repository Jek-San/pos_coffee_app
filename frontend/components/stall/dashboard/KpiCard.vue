<template>
  <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
    <h3 class="text-sm text-slate-400">{{ title }}</h3>
    <p class="text-2xl font-bold">{{ value }}</p>
    <p
      v-if="change !== null"
      :class="change >= 0 ? 'text-green-400' : 'text-red-400'"
    >
      {{ change >= 0 ? "+" : "" }}{{ change }}%
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  change: Number,
})
</script>
