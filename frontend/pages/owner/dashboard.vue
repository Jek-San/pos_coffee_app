<!-- pages/owner/dashboard.vue -->
<template>
  <div class="min-h-screen bg-slate-900 text-white p-6">
    <!-- Header -->
    <header class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Owner Dashboard</h1>
      <div>
        <input
          v-model="filters.date"
          type="date"
          class="bg-slate-800 border border-slate-700 px-3 py-1 rounded"
        />
      </div>
    </header>

    <!-- KPI Cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KpiCard
        title="Total Sales"
        :value="`Rp ${formatNumber(kpis.totalSales)}`"
        :change="12"
      />
      <KpiCard title="Orders" :value="kpis.orders" :change="-5" />
      <KpiCard
        title="Avg Order Value"
        :value="`Rp ${formatNumber(kpis.avgOrderValue)}`"
        :change="3"
      />
      <KpiCard title="Top Stall" :value="kpis.topStall" :change="null" />
    </section>

    <!-- Charts -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <ChartCard title="Sales Over Time">
        <SalesChart :data="charts.salesOverTime" />
      </ChartCard>
      <ChartCard title="Best Selling Items">
        <BarChart :data="charts.bestSellingItems" />
      </ChartCard>
    </section>

    <!-- Quick Management & Orders -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h2 class="text-lg font-bold mb-3">Recent Orders</h2>
        <ul>
          <li
            v-for="order in recentOrders"
            :key="order.id"
            class="flex justify-between py-2 border-b border-slate-700 last:border-0"
          >
            <span>#{{ order.id }} - {{ order.customer }}</span>
            <span :class="statusColor(order.status)">{{ order.status }}</span>
          </li>
        </ul>
      </div>

      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h2 class="text-lg font-bold mb-3">Quick Actions</h2>
        <div class="flex flex-wrap gap-3">
          <button class="bg-green-500 px-3 py-2 rounded-lg hover:bg-green-600">
            + Add Menu Item
          </button>
          <button
            class="bg-yellow-500 px-3 py-2 rounded-lg hover:bg-yellow-600"
          >
            ⚡ Toggle Stall
          </button>
          <button class="bg-blue-500 px-3 py-2 rounded-lg hover:bg-blue-600">
            📄 Download Report
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue"
definePageMeta({
  layout: "owner",
})

/* Components (you can make these in /components/) */
import KpiCard from "~/components/owner/KpiCard.vue"
import ChartCard from "~/components/owner/ChartCard.vue"
import SalesChart from "~/components/owner/SalesChart.vue"
import BarChart from "~/components/owner/BarChart.vue"

const filters = ref({
  date: new Date().toISOString().substring(0, 10),
})

const kpis = ref({
  totalSales: 12500000,
  orders: 150,
  avgOrderValue: 83333,
  topStall: "Coffee Corner",
})

const charts = ref({
  salesOverTime: [
    { label: "09:00", value: 120000 },
    { label: "10:00", value: 350000 },
    { label: "11:00", value: 550000 },
    { label: "12:00", value: 800000 },
    { label: "13:00", value: 600000 },
  ],
  bestSellingItems: [
    { label: "Iced Latte", value: 120 },
    { label: "Cappuccino", value: 95 },
    { label: "Americano", value: 75 },
  ],
})

const recentOrders = ref([
  { id: 1012, customer: "John Doe", status: "Paid" },
  { id: 1013, customer: "Jane Smith", status: "In Progress" },
  { id: 1014, customer: "Michael Lee", status: "Canceled" },
])

function formatNumber(num) {
  return num.toLocaleString("id-ID")
}

function statusColor(status) {
  switch (status) {
    case "Paid":
      return "text-green-400"
    case "In Progress":
      return "text-yellow-400"
    case "Canceled":
      return "text-red-400"
    default:
      return ""
  }
}
</script>
