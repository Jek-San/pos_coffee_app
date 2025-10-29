<!-- components/owner/users/StallsTable.vue -->
<template>
  <div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-slate-900">
          <tr>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"
            >
              Stall
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"
            >
              Setup Status
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"
            >
              Last Login
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-700">
          <tr
            v-for="stall in stalls"
            :key="stall.id"
            class="hover:bg-slate-700 transition-colors duration-200"
          >
            <!-- Stall Info -->
            <td class="px-6 py-4">
              <div>
                <div class="text-white font-medium">{{ stall.name }}</div>
                <div class="text-slate-400 text-sm">{{ stall.email }}</div>
              </div>
            </td>

            <!-- Category -->
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getCategoryClass(stall.category)"
              >
                {{ stall.category }}
              </span>
            </td>

            <!-- Setup Status -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div
                  class="w-2 h-2 rounded-full"
                  :class="
                    stall.setupComplete ? 'bg-green-400' : 'bg-yellow-400'
                  "
                ></div>
                <span
                  class="text-sm font-medium"
                  :class="
                    stall.setupComplete ? 'text-green-400' : 'text-yellow-400'
                  "
                >
                  {{ stall.setupComplete ? "Complete" : "Pending" }}
                </span>
              </div>
              <div
                v-if="!stall.setupComplete"
                class="text-xs text-slate-500 mt-1"
              >
                Awaiting first login
              </div>
            </td>

            <!-- Last Login -->
            <td class="px-6 py-4 text-slate-300">
              <div v-if="stall.lastLogin" class="text-sm">
                {{ formatDate(stall.lastLogin) }}
              </div>
              <div v-else class="text-slate-500 text-sm">Never</div>
            </td>

            <!-- Status -->
            <td class="px-6 py-4">
              <button
                @click="$emit('toggle-status', stall)"
                class="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                :class="getStatusClass(stall.status)"
              >
                <div
                  class="w-2 h-2 rounded-full"
                  :class="
                    stall.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                  "
                ></div>
                {{ stall.status }}
              </button>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="$emit('reset-password', stall)"
                  class="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors duration-200"
                  title="Reset password"
                >
                  <div class="flex items-center gap-1.5">
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      ></path>
                    </svg>

                    <span>Reset</span>
                  </div>
                </button>
                <button
                  @click="$emit('toggle-status', stall)"
                  class="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors duration-200"
                  title="Reset password"
                >
                  <div class="flex items-center gap-1.5">
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      ></path>
                    </svg>

                    <span>{{
                      stall.status === "Active" ? "Deactivate" : "Activate"
                    }}</span>
                  </div>
                </button>
                <!-- More Actions Dropdown -->
                <!-- <div class="relative">
                  <button
                    @click="toggleDropdown(stall.id)"
                    class="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-600 rounded-lg transition-colors duration-200"
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
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      ></path>
                    </svg>
                  </button>

                  <div
                    v-if="activeDropdown === stall.id"
                    class="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-lg border border-slate-600 z-10"
                  >
                    <div class="py-1">
                      <button
                        @click="copyLoginInfo(stall)"
                        class="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-600 hover:text-white"
                      >
                        Copy Login Info
                      </button>
                      <button
                        @click="viewLoginHistory(stall)"
                        class="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-600 hover:text-white"
                      >
                        View Login History
                      </button>
                      <hr class="border-slate-600 my-1" />
                      <button
                        @click="archiveStall(stall)"
                        class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300"
                      >
                        Archive Stall
                      </button>
                    </div>
                  </div>
                </div> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="stalls.length === 0" class="text-center py-12">
        <svg
          class="w-12 h-12 text-slate-600 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          ></path>
        </svg>
        <h3 class="text-lg font-medium text-slate-400 mb-2">No stalls found</h3>
        <p class="text-slate-500">
          Create your first stall account to get started.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

// Props
const props = defineProps({
  stalls: {
    type: Array,
    required: true,
  },
})

// Emits
const emits = defineEmits(["edit-stall", "reset-password", "toggle-status"])

// Reactive data
const activeDropdown = ref(null)

// Methods
const getCategoryClass = (category) => {
  const classes = {
    "Food & Beverages":
      "bg-orange-900/30 text-orange-300 border border-orange-700",
    "Asian Food": "bg-red-900/30 text-red-300 border border-red-700",
    "Western Food": "bg-blue-900/30 text-blue-300 border border-blue-700",
    "Coffee & Beverages":
      "bg-amber-900/30 text-amber-300 border border-amber-700",
    "Snacks & Desserts": "bg-pink-900/30 text-pink-300 border border-pink-700",
    "Healthy Food": "bg-green-900/30 text-green-300 border border-green-700",
    Retail: "bg-purple-900/30 text-purple-300 border border-purple-700",
    Services: "bg-indigo-900/30 text-indigo-300 border border-indigo-700",
    Uncategorized: "bg-slate-700 text-slate-400 border border-slate-600",
  }
  return classes[category] || classes["Uncategorized"]
}

const getStatusClass = (status) => {
  return status === "Active"
    ? "bg-green-900/30 text-green-300 border border-green-700 hover:bg-green-900/50"
    : "bg-red-900/30 text-red-300 border border-red-700 hover:bg-red-900/50"
}

const formatDate = (date) => {
  if (!date) return "Never"
  const now = new Date()
  const diff = now - new Date(date)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) {
    return "Today"
  } else if (days === 1) {
    return "Yesterday"
  } else if (days < 7) {
    return `${days} days ago`
  } else {
    return new Date(date).toLocaleDateString()
  }
}

const toggleDropdown = (stallId) => {
  activeDropdown.value = activeDropdown.value === stallId ? null : stallId
}

const copyLoginInfo = (stall) => {
  const loginInfo = `Stall: ${stall.name}\nEmail: ${stall.email}\nDomain: Login at your market's portal`

  if (navigator.clipboard) {
    navigator.clipboard.writeText(loginInfo).then(() => {
      console.log("Login info copied to clipboard")
      // You could add a toast notification here
    })
  }

  activeDropdown.value = null
}

const viewLoginHistory = (stall) => {
  console.log("Viewing login history for:", stall.name)
  // Implement login history modal/page
  activeDropdown.value = null
}

const archiveStall = (stall) => {
  if (
    confirm(
      `Are you sure you want to archive "${stall.name}"? This will deactivate the account.`
    )
  ) {
    console.log("Archiving stall:", stall.name)
    // Implement archive functionality
  }
  activeDropdown.value = null
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    activeDropdown.value = null
  }
}

// Add event listener for clicking outside
if (typeof document !== "undefined") {
  document.addEventListener("click", handleClickOutside)
}
</script>
