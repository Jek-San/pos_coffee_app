<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">Test Notifications</h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <button
        @click="showSuccess"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Success
      </button>

      <button
        @click="showError"
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Error
      </button>

      <button
        @click="showWarning"
        class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
      >
        Warning
      </button>

      <button
        @click="showInfo"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Info
      </button>
    </div>

    <div class="flex gap-4 mb-8">
      <button
        @click="showLong"
        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Long Duration (10s)
      </button>

      <button
        @click="clearAll"
        class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
      >
        Clear All
      </button>
    </div>

    <div class="bg-gray-100 p-4 rounded-lg">
      <h2 class="font-semibold text-black mb-2">
        Active: {{ notifications.length }}
      </h2>
      <p class="text-sm text-gray-600">Click notifications to dismiss them</p>
    </div>
  </div>
</template>

<script setup>
const notify = useNotifications()
const { notifications } = notify

const showSuccess = () => {
  notify.success("Operation completed successfully!")
}

const showError = () => {
  notify.error("Something went wrong!")
}

const showWarning = () => {
  notify.warning("Please be careful!")
}

const showInfo = () => {
  notify.info("Here is some information")
}

const showLong = () => {
  notify.success("This will stay for 10 seconds!", 10000)
}

const clearAll = () => {
  notify.clearAll()
}

onMounted(() => {
  notify.info("Page loaded! Notification system ready.")
})
</script>
