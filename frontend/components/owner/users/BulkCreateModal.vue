<!-- components/owner/users/BulkCreateModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl"
    >
      <!-- Fixed Header -->
      <div
        class="flex justify-between items-center p-6 pb-4 border-b border-slate-700 flex-shrink-0"
      >
        <h3 class="text-xl font-bold text-white">Bulk Create Stalls</h3>
        <button
          @click="closeModal"
          class="text-slate-400 hover:text-white transition-colors"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Scrollable Content with Custom Scrollbar -->
      <div class="flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar">
        <div class="mb-6">
          <div
            class="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-4"
          >
            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h4 class="text-blue-300 font-medium mb-1">Quick Setup</h4>
                <p class="text-blue-200 text-sm">
                  Create multiple stall accounts instantly. Each stall will get
                  default credentials and can customize their details after
                  first login.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="createBulkStalls" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Number of Stalls
            </label>
            <input
              v-model="bulkCount"
              type="number"
              min="1"
              max="50"
              required
              @input="updatePreview"
              class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter number of stalls (1-50)"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Default Category
            </label>
            <select
              v-model="defaultCategory"
              class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="Uncategorized">
                Uncategorized (can change later)
              </option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Asian Food">Asian Food</option>
              <option value="Western Food">Western Food</option>
              <option value="Snacks & Desserts">Snacks & Desserts</option>
              <option value="Retail">Retail</option>
              <option value="Services">Services</option>
            </select>
          </div>

          <!-- Preview Section -->
          <div
            v-if="bulkCount > 0"
            class="bg-slate-700 rounded-lg p-4 border border-slate-600"
          >
            <h4 class="text-slate-300 font-medium mb-3 flex items-center gap-2">
              <svg
                class="w-4 h-4 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              Preview (first 3 accounts)
            </h4>
            <div
              class="space-y-2 text-sm max-h-40 overflow-y-auto custom-scrollbar-sm"
            >
              <div
                v-for="i in Math.min(bulkCount, 3)"
                :key="i"
                class="bg-slate-800 rounded p-3 border border-slate-600/50"
              >
                <div class="text-white font-medium">{{ getStallName(i) }}</div>
                <div class="text-slate-400">{{ getStallEmail(i) }}</div>
                <div class="text-slate-500 text-xs">
                  Password: Auto-generated secure password
                </div>
              </div>
              <div v-if="bulkCount > 3" class="text-slate-400 text-center py-2">
                ... and {{ bulkCount - 3 }} more stalls
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Fixed Footer -->
      <div
        class="border-t border-slate-700 p-6 pt-4 flex-shrink-0 bg-slate-800 rounded-b-xl"
      >
        <div class="flex gap-3">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 px-4 py-2 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700 hover:border-slate-500 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!bulkCount || bulkCount < 1 || bulkCount > 50"
            @click="createBulkStalls"
            class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 font-medium"
          >
            Create {{ bulkCount || 0 }} Stalls
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  merchantInfo: {
    type: Object,
    required: true,
  },
})

// Emits
const emit = defineEmits(["close", "stalls-created"])

// Reactive data
const bulkCount = ref(5)
const defaultCategory = ref("Uncategorized")

// Methods
const generateSecurePassword = () => {
  const length = 12
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  let password = ""

  // Ensure at least one of each type
  const lower = "abcdefghijklmnopqrstuvwxyz"
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*"

  password += lower[Math.floor(Math.random() * lower.length)]
  password += upper[Math.floor(Math.random() * upper.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)]
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
}

const getStallName = (index) => {
  return `Stall ${index}`
}

const getStallEmail = (index) => {
  return `stall${index}@${props.merchantInfo.domain}.pos`
}

const updatePreview = () => {
  // This function triggers reactivity for the preview
}

const closeModal = () => {
  // Reset form
  bulkCount.value = 5
  defaultCategory.value = "Uncategorized"

  emit("close")
}

const createBulkStalls = () => {
  const stallsData = []

  for (let i = 1; i <= bulkCount.value; i++) {
    stallsData.push({
      name: getStallName(i),
      email: getStallEmail(i),
      password: generateSecurePassword(),
      category: defaultCategory.value,
    })
  }

  emit("stalls-created", stallsData)
  closeModal()
}

// Watch for modal opening to reset form
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      bulkCount.value = 5
      defaultCategory.value = "Uncategorized"
    }
  }
)
</script>

<style scoped>
/* Custom scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(71, 85, 105, 0.6);
  border-radius: 3px;
  transition: all 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(71, 85, 105, 0.8);
}

/* Firefox scrollbar */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(71, 85, 105, 0.6) rgba(30, 41, 59, 0.3);
}

/* Smaller scrollbar for preview section */
.custom-scrollbar-sm::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar-sm::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.2);
  border-radius: 2px;
}

.custom-scrollbar-sm::-webkit-scrollbar-thumb {
  background: rgba(71, 85, 105, 0.4);
  border-radius: 2px;
}

.custom-scrollbar-sm::-webkit-scrollbar-thumb:hover {
  background: rgba(71, 85, 105, 0.6);
}

.custom-scrollbar-sm {
  scrollbar-width: thin;
  scrollbar-color: rgba(71, 85, 105, 0.4) rgba(30, 41, 59, 0.2);
}
</style>
