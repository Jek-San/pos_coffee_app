<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <!-- Header -->
    <div class="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-3">
          <button
            @click="$router.push(`/cust/orders/${orderId}/detail`)"
            class="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
          >
            <span class="text-xl">←</span>
          </button>
          <div>
            <h1 class="text-xl font-bold">Lacak Pesanan</h1>
            <p class="text-sm text-gray-400">
              Pesanan #{{ order?.id?.slice(-6) }}
            </p>
          </div>
        </div>
        <StatusBadge v-if="order" :status="order.status" />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-16">
      <div class="text-6xl mb-4">⏳</div>
      <h3 class="text-lg font-semibold text-gray-300 mb-2">
        Memuat detail pesanan...
      </h3>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-16">
      <div class="text-6xl mb-4">❌</div>
      <h3 class="text-lg font-semibold text-gray-300 mb-2">
        Pesanan tidak ditemukan
      </h3>
      <button
        @click="$router.push('/cust/my-orders')"
        class="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-6 rounded-lg font-medium transition-colors"
      >
        Kembali ke Daftar Pesanan
      </button>
    </div>

    <!-- Order Tracker -->
    <div v-else-if="order" class="p-6 space-y-6">
      <div class="text-center">
        <h2 class="text-2xl font-bold">Status Pesanan</h2>
      </div>

      <!-- Langkah-langkah -->
      <div class="relative border-l-4 border-cyan-500 ml-6 pl-6 space-y-6">
        <div
          v-for="step in steps"
          :key="step.status"
          class="flex items-start gap-4"
        >
          <div
            class="w-6 h-6 rounded-full flex items-center justify-center"
            :class="step.active ? 'bg-cyan-500' : 'bg-slate-600'"
          >
            <span class="text-sm">
              {{ step.icon }}
            </span>
          </div>
          <div>
            <p
              class="font-semibold"
              :class="step.active ? 'text-white' : 'text-gray-500'"
            >
              {{ step.title }}
            </p>
            <p class="text-sm text-gray-400">{{ step.description }}</p>
          </div>
        </div>
      </div>

      <!-- Tombol -->
      <div class="text-center pt-6">
        <button
          @click="$router.push(`/cust/orders/${orderId}/detail`)"
          class="bg-slate-700 hover:bg-slate-600 text-white py-2 px-6 rounded-lg transition-colors"
        >
          Lihat Detail Pesanan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import StatusBadge from "~/components/cust/StatusBadge.vue"

useHead({ title: "Lacak Pesanan" })

const route = useRoute()
const router = useRouter()
const notify = useNotifications()

const orderId = route.params.id
const order = ref(null)
const loading = ref(true)
const error = ref(false)

onMounted(() => {
  fetchOrder()
})

const fetchOrder = async () => {
  try {
    const response = await useApi(`api/pos/orders/${orderId}`, {
      method: "GET",
    })
    order.value = response
  } catch (err) {
    error.value = true
    notify.error("Gagal memuat data pesanan")
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const steps = computed(() => {
  const status = order.value?.status || ""
  const all = [
    {
      status: "PENDING",
      icon: "⏳",
      title: "Menunggu Pembayaran",
      description: "Menunggu konfirmasi pembayaran.",
    },
    {
      status: "CONFIRMED",
      icon: "✅",
      title: "Pesanan Dikonfirmasi",
      description: "Pesanan dikonfirmasi oleh restoran.",
    },
    {
      status: "PREPARING",
      icon: "👨‍🍳",
      title: "Sedang Dipersiapkan",
      description: "Dapur sedang menyiapkan pesanan Anda.",
    },
    {
      status: "READY",
      icon: "🔔",
      title: "Siap Diambil",
      description: "Pesanan sudah siap di meja pengambilan.",
    },
    {
      status: "COMPLETED",
      icon: "✨",
      title: "Selesai",
      description: "Pesanan selesai dan sudah diambil.",
    },
    {
      status: "CANCELLED",
      icon: "❌",
      title: "Dibatalkan",
      description: "Pesanan telah dibatalkan.",
    },
  ]

  const currentIndex = all.findIndex((s) => s.status === status)
  return all.map((step, i) => ({
    ...step,
    active: i <= currentIndex,
  }))
})
</script>
