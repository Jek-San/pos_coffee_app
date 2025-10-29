<!-- pages/cust/orders/[id]/detail.vue -->
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
            <h1 class="text-xl font-bold">Detail Pesanan</h1>
            <p class="text-sm text-gray-400">
              Pesanan #{{ order?.id?.slice(-6) }}
            </p>
          </div>
        </div>
        <StatusBadge v-if="order" :status="order.status" />
      </div>
    </div>

    <div class="p-4">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="text-6xl mb-4">⏳</div>
        <h3 class="text-lg font-semibold text-gray-300 mb-2">
          Memuat detail pesanan...
        </h3>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-6xl mb-4">❌</div>
        <h3 class="text-lg font-semibold text-gray-300 mb-2">
          Pesanan tidak ditemukan
        </h3>
        <p class="text-sm text-gray-400 mb-6">
          Pesanan ini mungkin sudah dihapus atau tidak ada
        </p>
        <button
          @click="$router.push('/cust/my-orders')"
          class="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-6 rounded-lg font-medium transition-colors"
        >
          Kembali ke Pesanan
        </button>
      </div>

      <!-- Order Details -->
      <div v-else-if="order" class="space-y-4">
        <!-- Order Info Card -->
        <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center"
            >
              <span class="text-xl">🍽️</span>
            </div>
            <div class="flex-1">
              <h2 class="text-xl font-bold">
                Pesanan #{{ order.id.slice(-6) }}
              </h2>
              <p class="text-sm text-gray-400">
                {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-cyan-400">
                Rp{{ order.totalAmount.toLocaleString() }}
              </p>
              <p v-if="!order.paid" class="text-sm text-red-400">
                Belum Dibayar
              </p>
              <p v-else class="text-sm text-green-400">Sudah Dibayar</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-400">Pelanggan</p>
              <p class="font-medium">{{ order.customerName }}</p>
            </div>
            <div>
              <p class="text-gray-400">Meja</p>
              <p class="font-medium">{{ order.table.name }}</p>
            </div>
            <div>
              <p class="text-gray-400">Restoran</p>
              <p class="font-medium">{{ order.merchant.name }}</p>
            </div>
            <div>
              <p class="text-gray-400">Status</p>
              <StatusBadge :status="order.status" />
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🛒</span>
            Item Pesanan ({{ order.items.length }})
          </h3>

          <div class="space-y-4">
            <div
              v-for="(item, index) in order.items"
              :key="index"
              class="bg-slate-700/50 rounded-lg p-4 flex gap-4"
            >
              <!-- Item Image -->
              <div
                class="w-16 h-16 rounded-lg overflow-hidden bg-slate-600 flex-shrink-0"
              >
                <img
                  v-if="item.images && item.images.length > 0"
                  :src="item.images[0].url"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-2xl"
                >
                  🍽️
                </div>
              </div>

              <!-- Item Details -->
              <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="font-semibold">{{ item.name }}</h4>
                    <p v-if="item.description" class="text-sm text-gray-400">
                      {{ item.description }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-cyan-400">
                      Rp{{ item.totalPrice.toLocaleString() }}
                    </p>
                    <p class="text-sm text-gray-400">
                      {{ item.quantity }}× Rp{{
                        item.unitPrice.toLocaleString()
                      }}
                    </p>
                  </div>
                </div>

                <!-- Variants -->
                <div
                  v-if="item.variants && item.variants.length > 0"
                  class="mb-2"
                >
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="variant in item.variants"
                      :key="variant.name"
                      class="bg-slate-600 text-xs px-2 py-1 rounded-full"
                    >
                      {{ variant.name }}
                      <span
                        v-if="variant.extraPrice > 0"
                        class="text-green-400"
                      >
                        (+Rp{{ variant.extraPrice.toLocaleString() }})
                      </span>
                    </span>
                  </div>
                </div>

                <!-- Notes -->
                <div
                  v-if="item.note"
                  class="text-sm text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded"
                >
                  📝 {{ item.note }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📊</span>
            Ringkasan Pesanan
          </h3>

          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Subtotal:</span>
              <span>Rp{{ order.subtotal.toLocaleString() }}</span>
            </div>

            <div
              v-if="order.discountAmount > 0"
              class="flex justify-between text-green-400"
            >
              <span>Diskon:</span>
              <span>-Rp{{ order.discountAmount.toLocaleString() }}</span>
            </div>

            <div v-if="order.taxAmount > 0" class="flex justify-between">
              <span class="text-gray-400">Pajak:</span>
              <span>Rp{{ order.taxAmount.toLocaleString() }}</span>
            </div>

            <div v-if="order.serviceCharge > 0" class="flex justify-between">
              <span class="text-gray-400">Biaya Layanan:</span>
              <span>Rp{{ order.serviceCharge.toLocaleString() }}</span>
            </div>

            <hr class="border-slate-600 my-3" />

            <div
              class="flex justify-between text-lg font-semibold text-cyan-400"
            >
              <span>Total Bayar:</span>
              <span>Rp{{ order.totalAmount.toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-2">
          <!-- Pay Now Button - Show for PENDING orders that are unpaid -->
          <button
            v-if="order.status === 'PENDING' && !order.paid"
            @click="continuePayment"
            class="flex-1 bg-green-600 hover:bg-green-500 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>💳</span>
            Bayar Sekarang
          </button>

          <!-- Track Order Button - Show for CONFIRMED, PREPARING, READY orders -->
          <button
            v-else-if="
              ['CONFIRMED', 'PREPARING', 'READY'].includes(order.status)
            "
            @click="trackOrder"
            class="flex-1 bg-blue-600 hover:bg-blue-500 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>📍</span>
            Lacak Pesanan
          </button>

          <!-- Order Again Button - Show for COMPLETED orders -->
          <button
            v-else-if="order.status === 'COMPLETED'"
            @click="reorderItems"
            class="flex-1 bg-purple-600 hover:bg-purple-500 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            Pesan Lagi
          </button>

          <!-- Cancel Order Button - Show for PENDING orders only -->
          <button
            v-if="order.status === 'PENDING' && canCancelOrder()"
            @click="cancelOrder"
            class="bg-red-600 hover:bg-red-500 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>❌</span>
            Batalkan
          </button>
        </div>

        <!-- Order Status Info -->
        <div
          v-if="getStatusMessage()"
          class="bg-slate-800/50 rounded-lg p-4 border border-slate-600"
        >
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ getStatusIcon() }}</span>
            <div>
              <p class="font-medium">{{ getStatusTitle() }}</p>
              <p class="text-sm text-gray-400">{{ getStatusMessage() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import StatusBadge from "~/components/cust/StatusBadge.vue"

// Set page title
useHead({
  title: "Detail Pesanan",
})

const route = useRoute()
const router = useRouter()
const notify = useNotifications()

const order = ref(null)
const loading = ref(true)
const error = ref(false)

onMounted(() => {
  loadOrderDetails()
})

const loadOrderDetails = async () => {
  try {
    const orderId = route.params.id
    const response = await useApi(`api/pos/orders/${orderId}`, {
      method: "GET",
    })

    order.value = response
  } catch (err) {
    console.error("Failed to load order details:", err)
    error.value = true
    notify.error("Gagal memuat detail pesanan")
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const continuePayment = () => {
  router.push(`/cust/orders/${order.value.id}/payment`)
}

const trackOrder = () => {
  router.push(`/cust/orders/${order.value.id}/track`)
}

const reorderItems = () => {
  router.push(`/cust/orders/${order.value.id}/reorder`)
}

const cancelOrder = async () => {
  if (!confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) {
    return
  }

  try {
    await useApi(`api/pos/orders/${order.value.id}/cancel`, {
      method: "POST",
    })

    notify.success("Pesanan berhasil dibatalkan")
    await loadOrderDetails() // Refresh order data
  } catch (err) {
    console.error("Failed to cancel order:", err)
    notify.error("Gagal membatalkan pesanan")
  }
}

const contactSupport = () => {
  router.push("/cust/support")
}

const canCancelOrder = () => {
  // Can only cancel PENDING orders that are not paid yet
  return order.value.status === "PENDING" && !order.value.paid
}

const getStatusIcon = () => {
  const statusIcons = {
    PENDING: "⏳",
    CONFIRMED: "✅",
    PREPARING: "👨‍🍳",
    READY: "🔔",
    COMPLETED: "✨",
    CANCELLED: "❌",
  }
  return statusIcons[order.value?.status] || "📋"
}

const getStatusTitle = () => {
  const statusTitles = {
    PENDING: "Pesanan Menunggu",
    CONFIRMED: "Pesanan Dikonfirmasi",
    PREPARING: "Sedang Diproses",
    READY: "Siap Diambil",
    COMPLETED: "Pesanan Selesai",
    CANCELLED: "Pesanan Dibatalkan",
  }
  return statusTitles[order.value?.status] || "Status Tidak Diketahui"
}

const getStatusMessage = () => {
  const statusMessages = {
    PENDING: order.value?.paid
      ? "Pesanan Anda sudah dikonfirmasi dan menunggu untuk diproses."
      : "Silakan selesaikan pembayaran untuk mengkonfirmasi pesanan Anda.",
    CONFIRMED: "Pesanan Anda sudah dikonfirmasi dan akan segera diproses.",
    PREPARING: "Dapur sedang memproses pesanan Anda. Akan segera selesai!",
    READY:
      "Pesanan Anda sudah siap! Silakan datang ke konter untuk mengambilnya.",
    COMPLETED:
      "Terima kasih atas pesanan Anda! Semoga Anda menikmati makanannya.",
    CANCELLED:
      "Pesanan ini telah dibatalkan. Jika ada pertanyaan, silakan hubungi dukungan pelanggan.",
  }
  return statusMessages[order.value?.status] || ""
}
</script>
