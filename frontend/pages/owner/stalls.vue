<!-- pages/owner/stalls/index.vue -->
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-white mb-2">Stalls Management</h1>
        <p class="text-slate-400">
          Manage all food court stalls and their operators
        </p>
      </div>
      <!-- <button
        @click="showAddModal = true"
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
        Add New Stall
      </button> -->
    </div>

    <!-- Filters & Search -->
    <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search stalls by name or operator..."
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
            <option value="Maintenance">Maintenance</option>
          </select>
          <select
            v-model="categoryFilter"
            class="bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option
              v-for="category in uniqueCategories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
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
            <p class="text-slate-400 text-sm">Active Stalls</p>
            <p class="text-2xl font-bold text-green-400">{{ stats.active }}</p>
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
            <p class="text-slate-400 text-sm">Inactive Stalls</p>
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

      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Monthly Revenue</p>
            <p class="text-2xl font-bold text-yellow-400">
              Rp {{ formatNumber(stats.revenue) }}
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Stalls Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="stall in filteredStalls"
        :key="stall.id"
        class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors duration-200"
      >
        <!-- Stall Image -->
        <div
          class="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800"
        >
          <img
            v-if="stall.image"
            :src="stall.image"
            :alt="stall.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg
              class="w-16 h-16 text-slate-600"
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
          <!-- Status Badge -->
          <div class="absolute top-3 right-3">
            <span
              :class="getStatusColor(stall.status)"
              class="px-2 py-1 rounded-full text-xs font-medium"
            >
              {{ stall.status }}
            </span>
          </div>
        </div>

        <!-- Stall Info -->
        <div class="p-4">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold text-white">{{ stall.name }}</h3>
            <span class="text-xs text-slate-400">#{{ stall.id }}</span>
          </div>

          <p class="text-slate-400 text-sm mb-2">{{ stall.category }}</p>

          <div class="flex items-center text-slate-400 text-sm mb-3">
            <svg
              class="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            {{ stall.operator }}
          </div>

          <div class="flex items-center justify-between text-sm mb-4">
            <span class="text-slate-400">Monthly Sales:</span>
            <span class="text-green-400 font-medium"
              >Rp {{ formatNumber(stall.monthlySales) }}</span
            >
          </div>

          <div class="flex items-center justify-between text-sm mb-4">
            <span class="text-slate-400">Menu Items:</span>
            <span class="text-white">{{ stall.menuItems }} items</span>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <button
              @click="viewStall(stall)"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors duration-200"
            >
              View Details
            </button>
            <button
              @click="toggleStallStatus(stall)"
              :class="
                stall.status === 'Active'
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-green-600 hover:bg-green-700'
              "
              class="px-3 py-2 rounded-lg text-white text-sm transition-colors duration-200"
            >
              {{ stall.status === "Active" ? "Disable" : "Enable" }}
            </button>
            <button
              @click="editStall(stall)"
              class="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

// Define page meta for layout
definePageMeta({
  layout: "owner",
})

// Reactive data
const searchQuery = ref("")
const statusFilter = ref("")
const categoryFilter = ref("")
const showAddModal = ref(false)
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
const stats = ref({
  total: 12,
  active: 9,
  inactive: 2,
  maintenance: 1,
  revenue: 85750000,
})

// New stall form data
const newStall = ref({
  name: "",
  category: "",
  operator: "",
  email: "",
})

// Sample stalls data
const stalls = ref([
  {
    id: "ST001",
    name: "Coffee Corner",
    category: "Coffee & Beverages",
    operator: "John Smith",
    email: "john@coffeecorner.com",
    status: "Active",
    monthlySales: 15750000,
    menuItems: 25,
    image: null,
  },
  {
    id: "ST002",
    name: "Nasi Padang Sederhana",
    category: "Asian Food",
    operator: "Siti Aminah",
    email: "siti@nasipadang.com",
    status: "Active",
    monthlySales: 22300000,
    menuItems: 18,
    image: null,
  },
  {
    id: "ST003",
    name: "Burger Palace",
    category: "Western Food",
    operator: "Mike Johnson",
    email: "mike@burgerpalace.com",
    status: "Active",
    monthlySales: 18200000,
    menuItems: 15,
    image: null,
  },
  {
    id: "ST004",
    name: "Healthy Bowl",
    category: "Healthy Food",
    operator: "Sarah Wilson",
    email: "sarah@healthybowl.com",
    status: "Inactive",
    monthlySales: 8900000,
    menuItems: 12,
    image: null,
  },
  {
    id: "ST005",
    name: "Sweet Treats",
    category: "Snacks & Desserts",
    operator: "Lisa Chen",
    email: "lisa@sweettreats.com",
    status: "Active",
    monthlySales: 12400000,
    menuItems: 30,
    image: null,
  },
  {
    id: "ST006",
    name: "Ramen House",
    category: "Asian Food",
    operator: "Tanaka Hiroshi",
    email: "hiroshi@ramenhouse.com",
    status: "Maintenance",
    monthlySales: 8200000,
    menuItems: 8,
    image: null,
  },
])

// Computed properties

const uniqueCategories = computed(() => {
  const categories = stalls.value.map((stall) => stall.category)
  return [...new Set(categories)] // remove duplicates
})
const filteredStalls = computed(() => {
  return stalls.value.filter((stall) => {
    const matchesSearch =
      !searchQuery.value ||
      stall.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      stall.operator.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus =
      !statusFilter.value || stall.status === statusFilter.value
    const matchesCategory =
      !categoryFilter.value || stall.category === categoryFilter.value

    return matchesSearch && matchesStatus && matchesCategory
  })
})

// Methods
const formatNumber = (num) => {
  if (num == null || isNaN(num)) return "0"
  return Number(num).toLocaleString("id-ID")
}

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-500/20 text-green-400"
    case "Inactive":
      return "bg-red-500/20 text-red-400"
    case "Maintenance":
      return "bg-yellow-500/20 text-yellow-400"
    default:
      return "bg-slate-500/20 text-slate-400"
  }
}

const viewStall = (stall) => {
  // Navigate to stall details page
  console.log("Viewing stall:", stall.id)
  // navigateTo(`/owner/stalls/${stall.id}`)
}

const toggleStallStatus = (stall) => {
  stall.status = stall.status === "Active" ? "Inactive" : "Active"

  // Update stats
  if (stall.status === "Active") {
    stats.value.active++
    stats.value.inactive--
  } else {
    stats.value.active--
    stats.value.inactive++
  }
}

onMounted(async () => {
  try {
    const response = await useApi(
      `api/pos/stalls/initStalls/${activeMerchant.value.merchantId}`
    )
    stalls.value = response.data.stalls
    stats.value = response.data.stats
    console.log(stalls.value)
  } catch (err) {
    console.error("Failed to load stalls:", err)
  } finally {
    loading.value = false
  }
})
</script>
