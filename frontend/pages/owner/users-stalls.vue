<!-- pages/owner/stalls.vue -->
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-white mb-2">Stall Accounts</h1>
        <p class="text-slate-400">
          Manage stall accounts and access credentials
        </p>
      </div>
      <div class="flex gap-3">
        <button
          @click="openBulkCreateModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          Bulk Create
        </button>
        <button
          @click="openAddModal"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add Single Stall
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Total Stalls</p>
            <p class="text-2xl font-bold text-white">{{ stats.total }}</p>
          </div>
          <div
            class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-blue-400"
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
          </div>
        </div>
      </div>

      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Setup Complete</p>
            <p class="text-2xl font-bold text-green-400">
              {{ stats.setupComplete }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Pending Setup</p>
            <p class="text-2xl font-bold text-yellow-400">
              {{ stats.pendingSetup }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Inactive</p>
            <p class="text-2xl font-bold text-red-400">{{ stats.inactive }}</p>
          </div>
          <div
            class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search stalls by name or email..."
            class="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex gap-3">
          <select
            v-model="statusFilter"
            class="bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            v-model="setupFilter"
            class="bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Setup Status</option>
            <option value="complete">Setup Complete</option>
            <option value="pending">Pending Setup</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Stalls Table Component -->
    <StallsTable
      :stalls="filteredStalls"
      @edit-stall="editStall"
      @reset-password="resetPassword"
      @toggle-status="toggleStallStatus"
    />

    <!-- Modal Components -->
    <AddStallModal
      :show="showAddModal"
      :merchant-info="merchantInfo"
      @close="closeAddModal"
      @stall-created="handleStallCreated"
    />

    <BulkCreateModal
      :show="showBulkCreateModal"
      :merchant-info="merchantInfo"
      @close="closeBulkCreateModal"
      @stalls-created="handleStallsCreated"
    />

    <!-- <EditStallModal
      :show="showEditModal"
      :stall="editingStall"
      @close="closeEditModal"
      @stall-updated="handleStallUpdated"
    /> -->

    <CredentialsModal
      :show="showCredentialsModal"
      :credentials="createdStalls"
      :merchant-info="merchantInfo"
      @close="closeCredentialsModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import StallsTable from "~/components/owner/users/StallsTable.vue"
import AddStallModal from "~/components/owner/users/AddStallModal.vue"
import BulkCreateModal from "~/components/owner/users/BulkCreateModal.vue"
// import EditStallModal from "~/components/owner/users/EditStallModal.vue"
import CredentialsModal from "~/components/owner/users/CredentialsModal.vue"

// Define page meta for layout
definePageMeta({
  layout: "owner",
})

// Reactive data
const searchQuery = ref("")
const statusFilter = ref("")
const setupFilter = ref("")
const showAddModal = ref(false)
const showBulkCreateModal = ref(false)
const showEditModal = ref(false)
const showCredentialsModal = ref(false)
const loading = ref(true)

// Data Compossable
const { activeMerchant } = useAuth()
const notify = useNotifications()
// Merchant info (this would come from auth/store)
const merchantInfo = ref({
  domain: activeMerchant.value.merchantSlug, // This would be dynamic
  name: activeMerchant.value.merchantName,
  merchantId: activeMerchant.value.merchantId,
  merchantName: activeMerchant.value.merchantName,
  merchantSlug: activeMerchant.value.merchantSlug,
})

// Stats data
const stats = ref({})

// Form data
const editingStall = ref({
  id: "",
  name: "",
  email: "",
  category: "",
})

const createdStalls = ref([])

// Sample stalls data
const stalls = ref([])

// Computed properties
const filteredStalls = computed(() => {
  return stalls.value.filter((stall) => {
    const matchesSearch =
      !searchQuery.value ||
      stall.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      stall.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus =
      !statusFilter.value || stall.status === statusFilter.value

    const matchesSetup = (() => {
      if (!setupFilter.value) return true
      if (setupFilter.value === "complete") return stall.setupComplete
      if (setupFilter.value === "pending") return !stall.setupComplete
      return true
    })()

    return matchesSearch && matchesStatus && matchesSetup
  })
})

// Methods
const openAddModal = () => {
  showAddModal.value = true
}

const openBulkCreateModal = () => {
  showBulkCreateModal.value = true
}

const closeAddModal = () => {
  showAddModal.value = false
}

const closeBulkCreateModal = () => {
  showBulkCreateModal.value = false
}

const closeEditModal = () => {
  showEditModal.value = false
  editingStall.value = {
    id: "",
    name: "",
    email: "",
    category: "",
  }
}

const closeCredentialsModal = () => {
  showCredentialsModal.value = false
  createdStalls.value = []
}

const editStall = (stall) => {
  editingStall.value = {
    id: stall.id,
    name: stall.name,
    email: stall.email,
    category: stall.category,
  }
  showEditModal.value = true
}

const handleStallCreated = async (stallData) => {
  // Generate new stall ID
  const newId = `ST${String(stalls.value.length + 1).padStart(3, "0")}`

  // Create new stall
  const stall = {
    id: newId,
    name: stallData.name,
    email: stallData.email,
    category: stallData.category,
    status: "Active",
    setupComplete: false,
    lastLogin: null,
    createdAt: new Date(),
  }

  stalls.value.push(stall)

  // Update stats
  stats.value.total++
  stats.value.pendingSetup++

  // Store created stall details for display
  createdStalls.value = [
    {
      name: stallData.name,
      email: stallData.email,
      password: stallData.password,
      category: stallData.category,
      stallName: stallData.stallName,
    },
  ]

  // api create stall
  try {
    const response = await useApi(
      `api/pos/stalls/create-user-stalls/${merchantInfo.value.merchantId}`,
      { method: "POST", body: stallData }
    )
    console.log("Stall account created:", response.data)
    showCredentialsModal.value = true
    console.log("Creating stall account:", stallData)
  } catch (error) {
    console.error("Error creating stall account:", error)
  }
}

const handleStallsCreated = async (stallsData) => {
  // Add all stalls to the list
  stallsData.forEach((stallData) => {
    const newId = `ST${String(stalls.value.length + 1).padStart(3, "0")}`

    const stall = {
      id: newId,
      name: stallData.name,
      email: stallData.email,
      category: stallData.category,
      status: "Active",
      setupComplete: false,
      lastLogin: null,
      createdAt: new Date(),
    }

    stalls.value.push(stall)
  })

  // Update stats
  stats.value.total += stallsData.length
  stats.value.pendingSetup += stallsData.length

  // Store created stalls for display
  createdStalls.value = stallsData

  // api create stalls
  console.log(stallsData)
  try {
    const response = await useApi(
      `api/pos/stalls/create-bulk-user-stalls/${merchantInfo.value.merchantId}`,
      { method: "POST", body: { stalls: stallsData } }
    )
    console.log("Bulk stalls created:", response.data.user)
    showCredentialsModal.value = true
    console.log("Creating bulk stalls:", stallsData)
  } catch (error) {
    console.error("Error creating bulk stalls:", error)
    for (let i = 0; i < stallsData.length; i++) {
      stalls.value.pop()
    }
  }
}

const handleStallUpdated = (stallData) => {
  // Find the stall to update
  const stallIndex = stalls.value.findIndex(
    (stall) => stall.id === stallData.id
  )
  if (stallIndex === -1) return

  // Update stall
  stalls.value[stallIndex] = {
    ...stalls.value[stallIndex],
    name: stallData.name,
    email: stallData.email,
    category: stallData.category,
  }

  console.log("Updating stall:", stallData)
}

const toggleStallStatus = async (stall) => {
  try {
    const newStatus = stall.status === "Active" ? "Inactive" : "Active"
    stall.status = newStatus

    // api toggle stall status
    const response = await useApi(`api/pos/stalls/toggle-status/${stall.id}`, {
      method: "PATCH",
      body: { status: newStatus },
    })
    if (response.success) {
      notify.success("Stall status updated successfully")
    }
    // Update stats
    if (newStatus === "Inactive") {
      stats.value.inactive++
      if (stall.setupComplete) {
        stats.value.setupComplete--
      } else {
        stats.value.pendingSetup--
      }
    } else {
      stats.value.inactive--
      if (stall.setupComplete) {
        stats.value.setupComplete++
      } else {
        stats.value.pendingSetup++
      }
    }
  } catch (error) {
    console.error("Error toggling stall status:", error)
    // Revert the change
    stall.status = stall.status === "Active" ? "Inactive" : "Active"
  }
}

const resetPassword = async (stall) => {
  try {
    console.log("Resetting password for:", stall)
    // Generate new secure password
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

    const newPassword = generateSecurePassword()
    // api reset password
    const response = await useApi(`api/pos/stalls/reset-password/${stall.id}`, {
      method: "POST",
      body: { password: newPassword },
    })
    if (response.success) {
      createdStalls.value = [
        {
          name: stall.name,
          email: stall.email,
          password: newPassword,
          category: stall.category,
        },
      ]

      showCredentialsModal.value = true
    }
    console.log(`Password reset for ${stall.email}:`, {
      stallId: stall.id,
      tempPassword: newPassword,
      message:
        "New temporary password generated. Stall operator will be notified via email.",
    })

    // Store in createdStalls for credentials modal
  } catch (error) {
    console.error("Error resetting password:", error)
  }
}
onMounted(async () => {
  try {
    const response = await useApi(
      `api/pos/stalls/initUserStalls/${activeMerchant.value.merchantId}`
    )
    stalls.value = response.data.stalls
    stats.value = response.data.stats
  } catch (err) {
    console.error("Failed to load stalls:", err)
  } finally {
    loading.value = false
  }
})
</script>
