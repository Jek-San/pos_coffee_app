<template>
  <div
    class="bg-slate-800 p-4 rounded-xl shadow hover:ring-2 hover:ring-green-400 cursor-pointer"
  >
    <div class="text-lg font-bold">#{{ order.code }}</div>
    <div class="text-sm text-gray-400">{{ order.items.length }} items</div>
    <div class="mt-2 text-green-300 font-semibold">Rp {{ order.total }}</div>
    <div class="text-xs text-gray-500">{{ order.paymentMethod }}</div>
    <div class="text-xs text-yellow-400 mt-1">
      🕒 {{ formatDate(order.createdAt) }}
    </div>
  </div>
</template>

<script setup>
defineProps({ order: Object })
const formatDate = (d) =>
  new Date(d).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })
</script>
