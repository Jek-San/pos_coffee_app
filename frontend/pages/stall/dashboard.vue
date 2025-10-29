<!-- pages/stall-owner/dashboard.vue -->
<template>
  <div class="min-h-screen bg-slate-900 text-white p-6">
    <!-- Header -->
    <header
      class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold">My Stall Dashboard</h1>
        <p class="text-slate-400">
          {{ stallInfo.name }} - {{ stallInfo.location }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <span class="text-sm text-slate-400">Status:</span>
          <span :class="stallInfo.isOpen ? 'text-green-400' : 'text-red-400'">
            {{ stallInfo.isOpen ? "Open" : "Closed" }}
          </span>
          <button
            @click="toggleStall"
            :class="
              stallInfo.isOpen
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            "
            class="px-3 py-1 rounded text-sm transition-colors"
          >
            {{ stallInfo.isOpen ? "Close" : "Open" }}
          </button>
        </div>
        <input
          v-model="filters.date"
          type="date"
          class="bg-slate-800 border border-slate-700 px-3 py-1 rounded text-sm"
        />
      </div>
    </header>

    <!-- KPI Cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KpiCard
        title="Today's Sales"
        :value="`Rp ${formatNumber(kpis.todaySales)}`"
        :change="15"
        icon="💰"
      />
      <KpiCard
        title="Orders Today"
        :value="kpis.ordersToday"
        :change="-3"
        icon="📦"
      />
      <KpiCard
        title="Avg Order Value"
        :value="`Rp ${formatNumber(kpis.avgOrderValue)}`"
        :change="8"
        icon="📊"
      />
      <KpiCard
        title="Customer Rating"
        :value="`${kpis.rating}/5.0`"
        :change="2"
        icon="⭐"
      />
    </section>

    <!-- Charts -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <ChartCard title="Sales Today (Hourly)">
        <SalesChart :data="charts.hourlySales" />
      </ChartCard>
      <ChartCard title="Top Menu Items">
        <BarChart :data="charts.topMenuItems" />
      </ChartCard>
    </section>

    <!-- Orders & Menu Management -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Active Orders -->
      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-bold">Active Orders</h2>
          <span class="bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
            {{ activeOrders.length }} pending
          </span>
        </div>
        <div class="max-h-64 overflow-y-auto">
          <div
            v-for="order in activeOrders"
            :key="order.id"
            class="flex justify-between items-center py-3 border-b border-slate-700 last:border-0"
          >
            <div>
              <p class="font-medium">#{{ order.id }} - {{ order.customer }}</p>
              <p class="text-sm text-slate-400">{{ order.items.join(", ") }}</p>
              <p class="text-xs text-slate-500">{{ order.orderTime }}</p>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span class="text-green-400 font-medium"
                >Rp {{ formatNumber(order.total) }}</span
              >
              <button
                @click="completeOrder(order.id)"
                class="bg-green-500 hover:bg-green-600 px-2 py-1 rounded text-xs transition-colors"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Status -->
      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h2 class="text-lg font-bold mb-3">Menu Status</h2>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          <div
            v-for="item in menuItems"
            :key="item.id"
            class="flex justify-between items-center py-2"
          >
            <div>
              <p class="font-medium">{{ item.name }}</p>
              <p class="text-sm text-slate-400">
                Rp {{ formatNumber(item.price) }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span
                :class="item.available ? 'text-green-400' : 'text-red-400'"
                class="text-xs"
              >
                {{ item.available ? "Available" : "Out of Stock" }}
              </span>
              <button
                @click="toggleMenuItem(item.id)"
                :class="
                  item.available
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                "
                class="px-2 py-1 rounded text-xs transition-colors"
              >
                {{ item.available ? "Disable" : "Enable" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h2 class="text-lg font-bold mb-3">Quick Actions</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          class="bg-green-500 px-4 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <span>➕</span>
          Add Menu Item
        </button>
        <button
          class="bg-blue-500 px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <span>📝</span>
          Update Prices
        </button>
        <button
          class="bg-purple-500 px-4 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
        >
          <span>📊</span>
          View Analytics
        </button>
        <button
          class="bg-orange-500 px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <span>📄</span>
          Export Report
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue"

definePageMeta({
  layout: "stall",
})

/* Components */
import KpiCard from "~/components/stall/dashboard/KpiCard.vue"
import ChartCard from "~/components/stall/dashboard/ChartCard.vue"
import SalesChart from "~/components/stall/dashboard/SalesChart.vue"
import BarChart from "~/components/stall/dashboard/BarChart.vue"

// Data Compossable
const { activeMerchant } = useAuth()
const notify = useNotifications()

// Stall Information
const stallInfo = ref({
  id: activeMerchant.value.stallId,
  name: activeMerchant.value.stallName,
  location: activeMerchant.value.merchantName,
  isOpen: activeMerchant.value.isOpen,
})

const filters = ref({
  date: new Date().toISOString().substring(0, 10),
})

// KPIs focused on individual stall performance
const kpis = ref({
  todaySales: 2750000,
  ordersToday: 45,
  avgOrderValue: 61111,
  rating: 4.7,
})

// Charts data
const charts = ref({
  hourlySales: [
    { label: "08:00", value: 150000 },
    { label: "09:00", value: 220000 },
    { label: "10:00", value: 280000 },
    { label: "11:00", value: 420000 },
    { label: "12:00", value: 650000 },
    { label: "13:00", value: 480000 },
    { label: "14:00", value: 320000 },
    { label: "15:00", value: 230000 },
  ],
  topMenuItems: [
    { label: "Nasi Gudeg", value: 25 },
    { label: "Ayam Bakar", value: 18 },
    { label: "Gado-gado", value: 15 },
    { label: "Soto Ayam", value: 12 },
    { label: "Es Teh Manis", value: 35 },
  ],
})

// Active orders that need attention
const activeOrders = ref([
  {
    id: 2024001,
    customer: "Budi Santoso",
    items: ["Nasi Gudeg", "Es Teh"],
    total: 25000,
    orderTime: "13:45",
  },
  {
    id: 2024002,
    customer: "Siti Aminah",
    items: ["Ayam Bakar", "Nasi", "Es Jeruk"],
    total: 45000,
    orderTime: "13:52",
  },
  {
    id: 2024003,
    customer: "Ahmad Rahman",
    items: ["Gado-gado", "Kerupuk"],
    total: 20000,
    orderTime: "14:02",
  },
])

// Menu items with availability status
const menuItems = ref([
  { id: 1, name: "Nasi Gudeg", price: 18000, available: true },
  { id: 2, name: "Ayam Bakar", price: 35000, available: true },
  { id: 3, name: "Gado-gado", price: 15000, available: false },
  { id: 4, name: "Soto Ayam", price: 20000, available: true },
  { id: 5, name: "Es Teh Manis", price: 5000, available: true },
  { id: 6, name: "Es Jeruk", price: 8000, available: true },
])

// Functions
function formatNumber(num) {
  return num.toLocaleString("id-ID")
}

async function toggleStall() {
  // Here you would typically make an API call to update stall status
  try {
    // api toggle stall status
    const newStatus = stallInfo.value.isOpen === true ? "Inactive" : "Active"
    const response = await useApi(
      `api/pos/stalls/toggle-status/${stallInfo.value.id}`,
      {
        method: "PATCH",
        body: { status: newStatus },
      }
    )
    if (response.success) {
      stallInfo.value.isOpen = !stallInfo.value.isOpen
      notify.success("Stall status updated successfully")
    }

    stallInfo.value.status = newStatus
  } catch (error) {
    console.error("Error toggling stall status:", error)
    // Revert the change
  }
}

function completeOrder(orderId) {
  const index = activeOrders.value.findIndex((order) => order.id === orderId)
  if (index !== -1) {
    activeOrders.value.splice(index, 1)
    // Here you would typically make an API call to complete the order
    console.log(`Order #${orderId} completed`)
  }
}

function toggleMenuItem(itemId) {
  const item = menuItems.value.find((item) => item.id === itemId)
  if (item) {
    item.available = !item.available
    // Here you would typically make an API call to update menu item status
    console.log(
      `${item.name} is now ${item.available ? "available" : "unavailable"}`
    )
  }
}
</script>
