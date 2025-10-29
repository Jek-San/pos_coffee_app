<!-- pages/my-orders.vue -->
<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <!-- Header -->
    <div class="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-3">
          <button
            @click="$router.go(-1)"
            class="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
          >
            <span class="text-xl">←</span>
          </button>
          <div>
            <h1 class="text-xl font-bold">Pesanan Saya</h1>
            <p class="text-sm text-gray-400">Riwayat pesanan terbaru</p>
          </div>
        </div>

        <div class="flex items-center gap-2 text-sm text-gray-400">
          <span>📱</span>
          <span>{{ recentOrders.length }} pesanan</span>
        </div>
      </div>
    </div>

    <div class="p-4">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="text-6xl mb-4">⏳</div>
        <h3 class="text-lg font-semibold text-gray-300 mb-2">
          Memuat pesanan...
        </h3>
      </div>

      <!-- Empty State -->
      <div v-else-if="recentOrders.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">📋</div>
        <h3 class="text-lg font-semibold text-gray-300 mb-2">
          Belum ada pesanan
        </h3>
        <p class="text-sm text-gray-400 mb-6">
          Riwayat pesanan akan muncul di sini setelah Anda melakukan pemesanan
        </p>
        <button
          @click="$router.push('/')"
          class="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-6 rounded-lg font-medium transition-colors"
        >
          Lihat Menu
        </button>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-4">
        <div
          v-for="order in recentOrders"
          :key="order.id"
          class="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-all"
        >
          <!-- Order Header -->
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center"
              >
                <span class="text-xl">🍽️</span>
              </div>
              <div>
                <h3 class="font-semibold text-lg">
                  Pesanan #{{ order.id.slice(-6) }}
                </h3>
                <p class="text-sm text-gray-400">
                  {{ formatDate(order.createdAt) }}
                </p>
                <p class="text-sm text-gray-400">
                  {{ order.table.name }} • {{ order.customerName }}
                </p>
                <p class="text-sm text-gray-400">
                  {{ order.merchant.name }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <StatusBadge :status="order.status" />
              <div class="mt-1">
                <p class="text-lg font-bold text-cyan-400">
                  Rp{{ order.totalAmount.toLocaleString() }}
                </p>
                <p v-if="!order.paid" class="text-xs text-red-400">
                  Belum Dibayar
                </p>
                <p v-else class="text-xs text-green-400">Sudah Dibayar</p>
              </div>
            </div>
          </div>

          <!-- Order Items Summary -->
          <div class="bg-slate-700/50 rounded-lg p-3 mb-4">
            <p class="text-sm text-gray-400 mb-2 flex items-center gap-1">
              <span>🛒</span>
              <span>{{ order.items.length }} item</span>
            </p>
            <div class="space-y-1">
              <div
                v-for="(item, index) in order.items.slice(0, 3)"
                :key="index"
                class="flex justify-between text-sm"
              >
                <span class="text-gray-300">
                  {{ item.quantity }}× {{ item.name }}
                  <span
                    v-if="item.variants && item.variants.length > 0"
                    class="text-gray-500"
                  >
                    ({{ item.variants.map((v) => v.name).join(", ") }})
                  </span>
                </span>
                <span class="text-gray-400">
                  Rp{{ item.totalPrice.toLocaleString() }}
                </span>
              </div>
              <div
                v-if="order.items.length > 3"
                class="text-xs text-gray-500 italic"
              >
                +{{ order.items.length - 3 }} item lainnya...
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div
            v-if="
              order.discountAmount > 0 ||
              order.taxAmount > 0 ||
              order.serviceCharge > 0
            "
            class="bg-slate-700/30 rounded-lg p-3 mb-4 text-sm"
          >
            <div class="flex justify-between text-gray-400 mb-1">
              <span>Subtotal:</span>
              <span>Rp{{ order.subtotal.toLocaleString() }}</span>
            </div>
            <div
              v-if="order.discountAmount > 0"
              class="flex justify-between text-green-400 mb-1"
            >
              <span>Diskon:</span>
              <span>-Rp{{ order.discountAmount.toLocaleString() }}</span>
            </div>
            <div
              v-if="order.taxAmount > 0"
              class="flex justify-between text-gray-400 mb-1"
            >
              <span>Pajak:</span>
              <span>Rp{{ order.taxAmount.toLocaleString() }}</span>
            </div>
            <div
              v-if="order.serviceCharge > 0"
              class="flex justify-between text-gray-400 mb-1"
            >
              <span>Biaya Layanan:</span>
              <span>Rp{{ order.serviceCharge.toLocaleString() }}</span>
            </div>
            <hr class="border-slate-600 my-2" />
            <div class="flex justify-between font-semibold text-white">
              <span>Total:</span>
              <span>Rp{{ order.totalAmount.toLocaleString() }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <button
              @click="viewOrderDetails(order)"
              class="flex-1 bg-slate-700 hover:bg-slate-600 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>👁️</span>
              Lihat Detail
            </button>

            <!-- Pay Now Button - Show only for PENDING orders that are unpaid -->
            <button
              v-if="order.status === 'PENDING' && !order.paid"
              @click="continuePayment(order)"
              class="flex-1 bg-green-600 hover:bg-green-500 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>💳</span>
              Bayar Sekarang
            </button>

            <!-- Reorder Button - Show for completed orders -->
            <button
              v-if="order.status === 'COMPLETED'"
              @click="reorderItems(order)"
              class="bg-purple-600 hover:bg-purple-500 py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-1"
              title="Pesan ulang item ini"
            >
              <span>🔄</span>
              <span class="hidden sm:inline">Pesan Lagi</span>
            </button>

            <!-- Cancel Button - Show only for PENDING orders -->
            <button
              v-if="order.status === 'PENDING' && order.paid === false"
              @click="cancelOrder(order)"
              class="bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-1"
              title="Batalkan pesanan"
            >
              <span>❌</span>
              <span class="hidden sm:inline">Batal</span>
            </button>

            <!-- Remove from History Button -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import {
  getRecentOrders,
  removeFromRecentOrders,
} from "@/utils/orderStorage.js"
import StatusBadge from "~/components/cust/StatusBadge.vue"

// Set page title
useHead({
  title: "Pesanan Saya - Riwayat Pesanan",
})

const notify = useNotifications()
const router = useRouter()
const recentOrders = ref([])
const loading = ref(false)

onMounted(() => {
  loadRecentOrders()
})

const loadRecentOrders = async () => {
  const orderIds = getRecentOrders()

  if (orderIds.length === 0) return

  loading.value = true

  try {
    const orderIds = JSON.parse(localStorage.getItem("recentOrders") || "[]")
    if (orderIds.length === 0) {
      loading.value = false
      return
    }

    const loadData = await useApi("api/pos/orders/multiple-get", {
      method: "POST",
      body: { ids: orderIds },
    })

    // Sort orders by creation date (newest first)
    recentOrders.value = loadData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  } catch (error) {
    console.error("Failed to load recent orders:", error)
    notify.error("Gagal memuat riwayat pesanan")
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = (now - date) / (1000 * 60 * 60)

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInHours * 60)
    return `${diffInMinutes} menit yang lalu`
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} jam yang lalu`
  } else {
    return date.toLocaleDateString("id-ID", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
}

const viewOrderDetails = (order) => {
  router.push(`/cust/orders/${order.id}/detail`)
}

const continuePayment = (order) => {
  router.push(`/cust/orders/${order.id}/payment`)
}

const reorderItems = (order) => {
  // Navigate to menu with items pre-selected
  router.push({
    path: `/cust/orders/${order.id}/reorder`,
    query: { reorder: order.id },
  })
}

const cancelOrder = async (order) => {
  if (confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) {
    try {
      await useApi(`api/pos/orders/${order.id}/cancel`, {
        method: "PATCH",
      })

      notify.success("Pesanan berhasil dibatalkan")
      loadRecentOrders() // Reload to get updated status
    } catch (error) {
      console.error("Failed to cancel order:", error)
      notify.error("Gagal membatalkan pesanan")
    }
  }
}

const removeFromHistory = (orderId) => {
  if (confirm("Hapus pesanan ini dari riwayat?")) {
    removeFromRecentOrders(orderId)
    loadRecentOrders()
    notify.success("Pesanan dihapus dari riwayat")
  }
}
</script>
