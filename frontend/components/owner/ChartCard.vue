<template>
  <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
    <h3 class="text-lg font-bold mb-3">{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String,
})
</script>
