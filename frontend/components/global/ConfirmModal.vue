<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <p class="mt-2 text-gray-600">{{ message }}</p>

        <div class="mt-4 flex justify-center gap-4">
          <button
            @click="handleChoice(true)"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Yes
          </button>
          <button
            @click="handleChoice(false)"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue"

const isOpen = ref(false)
const title = ref("")
const message = ref("")
let resolver = null

// Opens the modal and returns a promise
const open = (opts = {}) => {
  title.value = opts.title || "Are you sure?"
  message.value = opts.message || ""
  isOpen.value = true

  return new Promise((resolve) => {
    resolver = resolve
  })
}

const handleChoice = (choice) => {
  isOpen.value = false
  if (resolver) resolver(choice)
}

defineExpose({ open })
</script>
