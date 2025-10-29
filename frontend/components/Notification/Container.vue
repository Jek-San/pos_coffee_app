<!-- components/Notification/Container.vue -->
<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-if="hasNotifications"
        class="fixed top-6 right-6 z-100 flex flex-col gap-4 max-w-sm pointer-events-none"
      >
        <TransitionGroup
          name="notification"
          tag="div"
          class="flex flex-col gap-4"
        >
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="pointer-events-auto group relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-lg border cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            :class="getNotificationClass(notification.type)"
            @click="removeNotification(notification.id)"
          >
            <!-- Animated background gradient -->
            <div class="absolute inset-0 opacity-10">
              <div
                class="absolute inset-0 bg-gradient-to-r animate-pulse"
                :class="getGradientClass(notification.type)"
              ></div>
            </div>

            <!-- Progress bar (auto-dismiss indicator) -->
            <div
              v-if="notification.autoClose !== false"
              class="absolute top-0 left-0 h-1 bg-gradient-to-r transition-all duration-[5000ms] ease-linear"
              :class="getProgressClass(notification.type)"
              :style="{ width: notification.progress || '100%' }"
            ></div>

            <div class="relative p-4 flex items-start gap-4">
              <!-- Enhanced Icon with animation -->
              <div class="flex-shrink-0 relative">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg relative overflow-hidden"
                  :class="getIconBgClass(notification.type)"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br opacity-20"
                    :class="getGradientClass(notification.type)"
                  ></div>
                  <span class="relative z-10 animate-pulse">{{
                    getIcon(notification.type)
                  }}</span>
                </div>
                <!-- Ripple effect -->
                <div
                  class="absolute inset-0 rounded-full animate-ping opacity-20"
                  :class="getIconBgClass(notification.type)"
                ></div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <!-- Title (if provided) -->
                <h4
                  v-if="notification.title"
                  class="font-semibold text-sm mb-1 leading-tight"
                >
                  {{ notification.title }}
                </h4>

                <!-- Message -->
                <p class="text-sm leading-relaxed opacity-90">
                  {{ notification.message }}
                </p>

                <!-- Timestamp -->
                <p
                  v-if="notification.timestamp"
                  class="text-xs opacity-60 mt-2"
                >
                  {{ formatTimestamp(notification.timestamp) }}
                </p>
              </div>

              <!-- Enhanced Close Button -->
              <button
                class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 group-hover:scale-110"
                @click.stop="removeNotification(notification.id)"
                aria-label="Close notification"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
const { notifications, hasNotifications, removeNotification } =
  useNotifications()

const getNotificationClass = (type) => {
  const classes = {
    success:
      "bg-emerald-50/95 text-emerald-900 border-emerald-200/60 dark:bg-emerald-950/90 dark:text-emerald-100 dark:border-emerald-800/60",
    error:
      "bg-red-50/95 text-red-900 border-red-200/60 dark:bg-red-950/90 dark:text-red-100 dark:border-red-800/60",
    warning:
      "bg-amber-50/95 text-amber-900 border-amber-200/60 dark:bg-amber-950/90 dark:text-amber-100 dark:border-amber-800/60",
    info: "bg-blue-50/95 text-blue-900 border-blue-200/60 dark:bg-blue-950/90 dark:text-blue-100 dark:border-blue-800/60",
  }
  return classes[type] || classes.info
}

const getIconBgClass = (type) => {
  const classes = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  }
  return classes[type] || classes.info
}

const getGradientClass = (type) => {
  const classes = {
    success: "from-emerald-400 to-emerald-600",
    error: "from-red-400 to-red-600",
    warning: "from-amber-400 to-amber-600",
    info: "from-blue-400 to-blue-600",
  }
  return classes[type] || classes.info
}

const getProgressClass = (type) => {
  const classes = {
    success: "from-emerald-400 to-emerald-600",
    error: "from-red-400 to-red-600",
    warning: "from-amber-400 to-amber-600",
    info: "from-blue-400 to-blue-600",
  }
  return classes[type] || classes.info
}

const getIcon = (type) => {
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ⓘ",
  }
  return icons[type] || icons.info
}

const formatTimestamp = (timestamp) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diff = Math.floor((now - time) / 1000)

  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
</script>

<style scoped>
.notification-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.notification-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.notification-move {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Custom scrollbar for overflow content */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
