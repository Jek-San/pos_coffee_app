<template>
  <div
    class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
    :class="statusClasses"
  >
    <span>{{ statusIcon }}</span>
    <span>{{ statusText }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  status: String,
})

const statusConfig = {
  PENDING: {
    icon: "⏳",
    text: "Pending",
    classes: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  },
  CONFIRMED: {
    icon: "✅",
    text: "Confirmed",
    classes: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  },
  PREPARING: {
    icon: "👨‍🍳",
    text: "Preparing",
    classes: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  },
  READY: {
    icon: "🔔",
    text: "Ready",
    classes: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  },
  COMPLETED: {
    icon: "🎉",
    text: "Completed",
    classes: "bg-green-500/20 text-green-300 border border-green-500/30",
  },
  CANCELLED: {
    icon: "❌",
    text: "Cancelled",
    classes: "bg-red-500/20 text-red-300 border border-red-500/30",
  },
}

const config = statusConfig[props.status] || statusConfig["PENDING"]
const statusIcon = config.icon
const statusText = config.text
const statusClasses = config.classes
</script>
