<!-- components/Notification/Item.vue -->
<template>
  <div
    class="notification-item group relative overflow-hidden pointer-events-auto rounded-2xl shadow-xl backdrop-blur-lg border cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    :class="notificationClasses"
    @click="$emit('remove', notification.id)"
  >
    <!-- Animated background effect -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute inset-0 bg-gradient-to-br animate-pulse"
        :class="gradientClasses"
      ></div>
    </div>

    <!-- Auto-dismiss progress bar -->
    <div
      v-if="showProgress"
      class="absolute top-0 left-0 h-1 bg-gradient-to-r transition-all duration-[5000ms] ease-linear opacity-60"
      :class="progressClasses"
      :style="{ width: progressWidth }"
    ></div>

    <!-- Notification content -->
    <div class="relative p-5 flex items-start gap-4">
      <!-- Enhanced icon with multiple animation layers -->
      <div class="flex-shrink-0 relative">
        <!-- Main icon container -->
        <div
          class="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg relative overflow-hidden shadow-lg"
          :class="iconBgClasses"
        >
          <!-- Gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-br opacity-20"
            :class="gradientClasses"
          ></div>

          <!-- Icon -->
          <Icon :name="iconName" class="w-6 h-6 relative z-10 drop-shadow-sm" />

          <!-- Shimmer effect -->
          <div
            class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          ></div>
        </div>

        <!-- Pulsing ring animation -->
        <div
          class="absolute inset-0 rounded-xl animate-pulse opacity-30 scale-110"
          :class="iconBgClasses"
        ></div>

        <!-- Ripple effect on hover -->
        <div
          class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-opacity"
          :class="iconBgClasses"
        ></div>
      </div>

      <!-- Content area -->
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <h4
          v-if="notification.title"
          class="font-semibold text-sm mb-1.5 leading-tight tracking-wide"
        >
          {{ notification.title }}
        </h4>

        <!-- Message with improved typography -->
        <p class="text-sm leading-relaxed opacity-95 font-medium">
          {{ notification.message }}
        </p>

        <!-- Action buttons (if provided) -->
        <div v-if="notification.actions?.length" class="flex gap-2 mt-3">
          <button
            v-for="action in notification.actions"
            :key="action.id"
            class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="getActionButtonClasses(action.type)"
            @click.stop="handleAction(action)"
          >
            {{ action.label }}
          </button>
        </div>

        <!-- Timestamp with enhanced styling -->
        <p
          v-if="notification.timestamp"
          class="text-xs opacity-50 mt-2.5 font-mono tracking-wide"
        >
          {{ formatTimestamp(notification.timestamp) }}
        </p>
      </div>

      <!-- Enhanced close button -->
      <button
        class="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
        @click.stop="$emit('remove', notification.id)"
        aria-label="Close notification"
      >
        <Icon
          name="heroicons:x-mark-20-solid"
          class="w-5 h-5 transition-transform duration-200 group-hover:rotate-90"
        />
      </button>
    </div>

    <!-- Bottom accent line -->
    <div
      class="absolute bottom-0 left-0 right-0 h-0.5 opacity-30"
      :class="accentLineClasses"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"

const props = defineProps({
  notification: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["remove", "action"])

// Progress bar for auto-dismiss
const progressWidth = ref("100%")
const showProgress = computed(() => props.notification.autoClose !== false)

// Start progress animation
onMounted(() => {
  if (showProgress.value && props.notification.duration) {
    setTimeout(() => {
      progressWidth.value = "0%"
    }, 100)
  }
})

const notificationClasses = computed(() => {
  const baseClasses = "transition-all duration-300"

  switch (props.notification.type) {
    case "success":
      return `${baseClasses} bg-gradient-to-br from-emerald-50/95 to-emerald-100/80 text-emerald-900 border-emerald-200/60 dark:from-emerald-950/90 dark:to-emerald-900/80 dark:text-emerald-100 dark:border-emerald-700/60`
    case "error":
      return `${baseClasses} bg-gradient-to-br from-red-50/95 to-red-100/80 text-red-900 border-red-200/60 dark:from-red-950/90 dark:to-red-900/80 dark:text-red-100 dark:border-red-700/60`
    case "warning":
      return `${baseClasses} bg-gradient-to-br from-amber-50/95 to-amber-100/80 text-amber-900 border-amber-200/60 dark:from-amber-950/90 dark:to-amber-900/80 dark:text-amber-100 dark:border-amber-700/60`
    case "info":
    default:
      return `${baseClasses} bg-gradient-to-br from-blue-50/95 to-blue-100/80 text-blue-900 border-blue-200/60 dark:from-blue-950/90 dark:to-blue-900/80 dark:text-blue-100 dark:border-blue-700/60`
  }
})

const iconBgClasses = computed(() => {
  switch (props.notification.type) {
    case "success":
      return "bg-gradient-to-br from-emerald-500 to-emerald-600"
    case "error":
      return "bg-gradient-to-br from-red-500 to-red-600"
    case "warning":
      return "bg-gradient-to-br from-amber-500 to-amber-600"
    case "info":
    default:
      return "bg-gradient-to-br from-blue-500 to-blue-600"
  }
})

const gradientClasses = computed(() => {
  switch (props.notification.type) {
    case "success":
      return "from-emerald-300 via-emerald-400 to-emerald-600"
    case "error":
      return "from-red-300 via-red-400 to-red-600"
    case "warning":
      return "from-amber-300 via-amber-400 to-amber-600"
    case "info":
    default:
      return "from-blue-300 via-blue-400 to-blue-600"
  }
})

const progressClasses = computed(() => {
  switch (props.notification.type) {
    case "success":
      return "from-emerald-400 to-emerald-600"
    case "error":
      return "from-red-400 to-red-600"
    case "warning":
      return "from-amber-400 to-amber-600"
    case "info":
    default:
      return "from-blue-400 to-blue-600"
  }
})

const accentLineClasses = computed(() => {
  switch (props.notification.type) {
    case "success":
      return "bg-gradient-to-r from-emerald-400 to-emerald-600"
    case "error":
      return "bg-gradient-to-r from-red-400 to-red-600"
    case "warning":
      return "bg-gradient-to-r from-amber-400 to-amber-600"
    case "info":
    default:
      return "bg-gradient-to-r from-blue-400 to-blue-600"
  }
})

const iconName = computed(() => {
  switch (props.notification.type) {
    case "success":
      return "heroicons:check-circle-20-solid"
    case "error":
      return "heroicons:x-circle-20-solid"
    case "warning":
      return "heroicons:exclamation-triangle-20-solid"
    case "info":
    default:
      return "heroicons:information-circle-20-solid"
  }
})

const getActionButtonClasses = (type) => {
  const base = "focus:ring-current"
  switch (type) {
    case "primary":
      return `${base} bg-current text-white hover:brightness-110`
    case "secondary":
      return `${base} bg-transparent border border-current text-current hover:bg-current hover:text-white`
    default:
      return `${base} bg-black/10 text-current hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20`
  }
}

const formatTimestamp = (timestamp) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diff = Math.floor((now - time) / 1000)

  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return time.toLocaleDateString([], { month: "short", day: "numeric" })
}

const handleAction = (action) => {
  emit("action", { notification: props.notification, action })
  if (action.closeOnClick !== false) {
    emit("remove", props.notification.id)
  }
}
</script>

<style scoped>
/* Enhanced animations */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
  }
}

.notification-item {
  animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Smooth focus transitions */
.notification-item:focus-within {
  transform: scale(1.02);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Custom selection styling */
.notification-item ::selection {
  background-color: rgba(59, 130, 246, 0.2);
}
</style>
