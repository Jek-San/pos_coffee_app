<!-- pages/cust/orders/[id]/view-payment.vue -->
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
            <h1 class="text-xl font-bold">Status Pembayaran</h1>
            <p class="text-sm text-gray-400">
              Pesanan #{{ order?.id?.slice(-6) }}
            </p>
          </div>
        </div>
        <button
          @click="refreshPaymentStatus"
          :disabled="refreshing"
          class="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors disabled:opacity-50"
        >
          <span class="text-xl" :class="{ 'animate-spin': refreshing }"
            >🔄</span
          >
        </button>
      </div>
    </div>

    <div class="p-4">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="text-6xl mb-4">⏳</div>
        <h3 class="text-lg font-semibold text-gray-300 mb-2">
          Memuat status pembayaran...
        </h3>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-6xl mb-4">❌</div>
        <h3 class="text-lg font-semibold text-gray-300 mb-2">
          Pesanan tidak ditemukan
        </h3>
        <p class="text-sm text-gray-400 mb-6">
          Pesanan ini mungkin telah dihapus atau tidak ada
        </p>
        <button
          @click="$router.push('/cust/my-orders')"
          class="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-6 rounded-lg font-medium transition-colors"
        >
          Kembali ke Pesanan
        </button>
      </div>

      <!-- Payment Status -->
      <div v-else-if="order" class="space-y-4">
        <!-- CASH Payment - Simple Instructions -->
        <div v-if="order.paymentMethod?.type === 'CASH'" class="space-y-4">
          <!-- Cash Payment Status Card -->
          <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div class="text-center mb-6">
              <div class="text-6xl mb-4">
                <span v-if="order.paid">✅</span>
                <span v-else>💵</span>
              </div>

              <h2 class="text-2xl font-bold mb-2">
                <span v-if="order.paid" class="text-green-400"
                  >Pembayaran Terkonfirmasi</span
                >
                <span v-else class="text-yellow-400"
                  >Pembayaran Tunai Diperlukan</span
                >
              </h2>

              <p class="text-gray-400 mb-4">
                <span v-if="order.paid">
                  Pembayaran tunai Anda telah dikonfirmasi oleh kasir.
                </span>
                <span v-else>
                  Silakan menuju kasir untuk menyelesaikan pembayaran.
                </span>
              </p>

              <div class="text-3xl font-bold text-cyan-400">
                Rp{{ order.totalAmount.toLocaleString() }}
              </div>
            </div>

            <!-- Cash Payment Instructions -->
            <div
              v-if="!order.paid"
              class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6"
            >
              <h3
                class="font-semibold mb-4 text-yellow-400 flex items-center gap-2 text-lg"
              >
                <span>📋</span>
                Petunjuk Pembayaran
              </h3>

              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-sm"
                  >
                    1
                  </div>
                  <div>
                    <p class="font-medium">Pergi ke kasir</p>
                    <p class="text-sm text-gray-400">
                      Kunjungi meja kasir {{ order.merchant.name }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-sm"
                  >
                    2
                  </div>
                  <div>
                    <p class="font-medium">Tunjukkan ID Pesanan Anda</p>
                    <div
                      class="mt-2 bg-slate-700 p-3 rounded-lg border-2 border-dashed border-yellow-500"
                    >
                      <p class="text-xs text-gray-400 mb-1">ID Pesanan:</p>
                      <p class="font-mono text-lg font-bold text-yellow-400">
                        #{{ order.id.slice(-8) }}
                      </p>
                      <p class="text-xs text-gray-400 mb-1">Nama Pelanggan:</p>
                      <p class="font-mono text-lg font-bold text-yellow-400">
                        {{ order.customerName }}
                      </p>
                      <p class="text-xs text-gray-400 mb-1">Meja:</p>
                      <p class="font-mono text-lg font-bold text-yellow-400">
                        {{ order.table.name }}
                      </p>
                      <p class="text-xs text-gray-400 mb-1">Waktu Pesan:</p>
                      <p class="font-mono text-lg font-bold text-yellow-400">
                        {{ formatTime(order.createdAt) }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-sm"
                  >
                    3
                  </div>
                  <div>
                    <p class="font-medium">Bayar jumlah total</p>
                    <p class="text-2xl font-bold text-green-400 mt-1">
                      Rp{{ order.totalAmount.toLocaleString() }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-sm"
                  >
                    4
                  </div>
                  <div>
                    <p class="font-medium">Tunggu konfirmasi</p>
                    <p class="text-sm text-gray-400">
                      Kasir akan mengonfirmasi pembayaran dan memperbarui status
                      pesanan Anda
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Success message for paid cash orders -->
            <div
              v-else
              class="bg-green-500/10 border border-green-500/30 rounded-lg p-4"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">✅</span>
                <div>
                  <p class="font-semibold text-green-400">
                    Pembayaran Terkonfirmasi!
                  </p>
                  <p class="text-sm text-gray-400">
                    Pembayaran tunai Anda telah diterima dan dikonfirmasi oleh
                    kasir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- NON-CASH Payment - Upload Payment Proof -->
        <div v-else class="space-y-4">
          <!-- Digital Payment Status Card -->
          <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div class="text-center mb-6">
              <div class="text-6xl mb-4">
                <span v-if="order.paid">✅</span>
                <span v-else-if="order.paymentProof && !order.paid">⏳</span>
                <span v-else>💳</span>
              </div>

              <h2 class="text-2xl font-bold mb-2">
                <span v-if="order.paid" class="text-green-400"
                  >Pembayaran Terkonfirmasi</span
                >
                <span
                  v-else-if="order.paymentProof && !order.paid"
                  class="text-yellow-400"
                  >Menunggu Verifikasi</span
                >
                <span v-else class="text-cyan-400"
                  >Unggah Bukti Pembayaran</span
                >
              </h2>

              <p class="text-gray-400 mb-4">
                <span v-if="order.paid"
                  >Pembayaran Anda telah diverifikasi dan dikonfirmasi oleh
                  kasir.</span
                >
                <span v-else-if="order.paymentProof && !order.paid"
                  >Bukti pembayaran Anda sedang ditinjau oleh kasir.</span
                >
                <span v-else
                  >Selesaikan pembayaran Anda dan unggah screenshot
                  buktinya.</span
                >
              </p>

              <div class="text-3xl font-bold text-cyan-400">
                Rp{{ order.totalAmount.toLocaleString() }}
              </div>
            </div>

            <!-- Payment Method Info -->
            <div
              v-if="order.paymentMethod"
              class="bg-slate-700/50 rounded-lg p-4 mb-4"
            >
              <h3 class="font-semibold mb-2 flex items-center gap-2">
                <span>💳</span>
                Metode Pembayaran
              </h3>
              <div class="flex items-center gap-3">
                <div class="text-2xl">
                  {{ getPaymentMethodIcon(order.paymentMethod.type) }}
                </div>
                <div>
                  <p class="font-medium">
                    {{ order.paymentMethod.name }}
                  </p>
                  <p class="text-sm text-gray-400">
                    {{ getPaymentMethodDescription(order.paymentMethod.type) }}
                  </p>
                  <div
                    v-if="
                      order.paymentMethod.accountName ||
                      order.paymentMethod.accountNumber
                    "
                    class="text-xs text-gray-500 mt-1"
                  >
                    <span v-if="order.paymentMethod.accountName">{{
                      order.paymentMethod.accountName
                    }}</span>
                    <span v-if="order.paymentMethod.accountNumber">
                      - {{ order.paymentMethod.accountNumber }}</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- QR Code Display for QRIS -->
            <div
              v-if="
                order.paymentMethod?.type === 'QRIS' &&
                order.paymentMethod.images?.length > 0
              "
              class="bg-slate-700/50 rounded-lg p-4 mb-4"
            >
              <h3
                class="font-semibold mb-3 text-blue-400 flex items-center gap-2"
              >
                <span>📱</span>
                Pindai Kode QR untuk Membayar
              </h3>
              <div class="text-center">
                <img
                  :src="order.paymentMethod.images[0].url"
                  alt="QR Code"
                  class="w-48 h-48 mx-auto rounded-lg bg-white p-2"
                />
                <p class="text-sm text-gray-400 mt-2">
                  Pindai kode QR ini dengan aplikasi
                  {{ order.paymentMethod.name }} Anda
                </p>
              </div>
            </div>

            <!-- Payment Instructions -->
            <div
              v-if="order.paymentMethod?.type !== 'CASH'"
              class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4"
            >
              <h3
                class="font-semibold mb-3 text-blue-400 flex items-center gap-2"
              >
                <span>📋</span>
                Petunjuk Pembayaran
              </h3>

              <!-- QRIS Instructions -->
              <div
                v-if="order.paymentMethod?.type === 'QRIS'"
                class="space-y-2 text-sm"
              >
                <p>1. Buka aplikasi {{ order.paymentMethod.name }} Anda</p>
                <p>2. Pindai kode QR di atas atau transfer ke rekening</p>
                <p v-if="order.paymentMethod.accountName">
                  3. Nama Rekening:
                  <span class="font-semibold text-cyan-400">{{
                    order.paymentMethod.accountName
                  }}</span>
                </p>
                <p>
                  {{ order.paymentMethod.accountName ? "4" : "3" }}. Jumlah:
                  <span class="font-semibold text-cyan-400"
                    >Rp{{ order.totalAmount.toLocaleString() }}</span
                  >
                </p>
                <p>
                  {{ order.paymentMethod.accountName ? "5" : "4" }}. Ambil
                  screenshot dari transaksi yang berhasil
                </p>
                <p>
                  {{ order.paymentMethod.accountName ? "6" : "5" }}. Unggah
                  screenshot di bawah ini
                </p>
              </div>

              <!-- Bank Transfer Instructions -->
              <div
                v-else-if="order.paymentMethod?.type === 'BANK'"
                class="space-y-2 text-sm"
              >
                <p>1. Buka aplikasi perbankan Anda atau kunjungi ATM</p>
                <p>2. Transfer ke rekening berikut:</p>
                <div class="bg-slate-600 p-3 rounded-lg my-2">
                  <p class="font-semibold">{{ order.paymentMethod.name }}</p>
                  <p v-if="order.paymentMethod.accountNumber">
                    Rekening: {{ order.paymentMethod.accountNumber }}
                  </p>
                  <p v-if="order.paymentMethod.accountName">
                    Nama: {{ order.paymentMethod.accountName }}
                  </p>
                </div>
                <p>
                  3. Jumlah:
                  <span class="font-semibold text-cyan-400"
                    >Rp{{ order.totalAmount.toLocaleString() }}</span
                  >
                </p>
                <p>4. Ambil screenshot dari transfer yang berhasil</p>
                <p>5. Unggah screenshot di bawah ini</p>
              </div>
            </div>

            <!-- Payment Proof Upload Section -->
            <div
              v-if="!order.paid && !order.paymentProof"
              class="bg-slate-700/50 rounded-lg p-4 mb-4"
            >
              <h3
                class="font-semibold mb-3 text-green-400 flex items-center gap-2"
              >
                <span>📷</span>
                Unggah Bukti Pembayaran
              </h3>

              <div class="space-y-4">
                <!-- File Upload Area -->
                <div
                  @click="$refs.fileInput.click()"
                  @dragover.prevent
                  @drop.prevent="handleFileDrop"
                  class="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 transition-colors"
                  :class="{ 'border-green-400 bg-green-400/5': dragover }"
                >
                  <div class="text-4xl mb-2">📷</div>
                  <p class="font-medium mb-1">
                    Klik untuk mengunggah screenshot pembayaran
                  </p>
                  <p class="text-sm text-gray-400">
                    atau seret dan letakkan gambar Anda di sini
                  </p>
                  <p class="text-xs text-gray-500 mt-2">
                    Mendukung: JPG, PNG, JPEG (Maks 5MB)
                  </p>
                </div>

                <!-- Hidden File Input -->
                <input
                  ref="fileInput"
                  type="file"
                  @change="handleFileSelect"
                  accept="image/jpeg,image/jpg,image/png"
                  class="hidden"
                />

                <!-- Selected Image Preview -->
                <div v-if="selectedImage" class="space-y-3">
                  <div class="bg-slate-600 rounded-lg p-3">
                    <div class="flex items-center gap-3">
                      <img
                        :src="selectedImage.preview"
                        alt="Bukti pembayaran"
                        class="w-16 h-16 object-cover rounded"
                      />
                      <div class="flex-1">
                        <p class="font-medium">{{ selectedImage.name }}</p>
                        <p class="text-sm text-gray-400">
                          {{ formatFileSize(selectedImage.size) }}
                        </p>
                      </div>
                      <button
                        @click="removeSelectedImage"
                        class="text-red-400 hover:text-red-300"
                      >
                        <span class="text-xl">❌</span>
                      </button>
                    </div>
                  </div>

                  <!-- Upload Button -->
                  <button
                    @click="uploadPaymentProof"
                    :disabled="uploading"
                    class="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-600 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <span v-if="uploading" class="animate-spin">⏳</span>
                    <span v-else>📤</span>
                    {{
                      uploading ? "Mengunggah..." : "Unggah Bukti Pembayaran"
                    }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Uploaded Payment Proof Display -->
            <div
              v-else-if="order.paymentProof"
              class="bg-slate-700/50 rounded-lg p-4 mb-4"
            >
              <h3
                class="font-semibold mb-3 text-yellow-400 flex items-center gap-2"
              >
                <span>📷</span>
                Bukti Pembayaran Dikirim
              </h3>

              <div class="flex items-start gap-4">
                <img
                  :src="order.paymentProof"
                  alt="Bukti pembayaran"
                  class="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                  @click="viewPaymentProof"
                />
                <div class="flex-1">
                  <p class="font-medium text-green-400">
                    ✅ Bukti pembayaran diunggah
                  </p>
                  <p class="text-sm text-gray-400 mt-1">
                    <span v-if="order.paid"
                      >Diverifikasi dan dikonfirmasi oleh kasir</span
                    >
                    <span v-else>Menunggu verifikasi kasir</span>
                  </p>
                  <button
                    v-if="!order.paid"
                    @click="replacePaymentProof"
                    class="text-blue-400 hover:text-blue-300 text-sm mt-2"
                  >
                    Ganti gambar
                  </button>
                </div>
              </div>
            </div>

            <!-- Payment Status Message -->
            <div
              v-if="order.paid"
              class="bg-green-500/10 border border-green-500/30 rounded-lg p-4"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">✅</span>
                <div>
                  <p class="font-semibold text-green-400">
                    Pembayaran Terkonfirmasi!
                  </p>
                  <p class="text-sm text-gray-400">
                    Pembayaran Anda telah diverifikasi dan dikonfirmasi oleh
                    kasir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Details Summary -->
        <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📋</span>
            Detail Pesanan
          </h3>

          <div class="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p class="text-gray-400">ID Pesanan</p>
              <p class="font-mono">#{{ order.id.slice(-6) }}</p>
            </div>
            <div>
              <p class="text-gray-400">Status</p>
              <StatusBadge :status="order.status" />
            </div>
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
              <p class="text-gray-400">Waktu Pemesanan</p>
              <p class="font-medium">{{ formatTime(order.createdAt) }}</p>
            </div>
          </div>

          <!-- Items Summary -->
          <div class="bg-slate-700/50 rounded-lg p-3">
            <p class="text-sm text-gray-400 mb-2">
              {{ order.items.length }} item dipesan
            </p>
            <div class="space-y-1">
              <div
                v-for="(item, index) in order.items.slice(0, 2)"
                :key="index"
                class="flex justify-between text-sm"
              >
                <span>{{ item.quantity }}× {{ item.name }}</span>
                <span class="text-gray-400"
                  >Rp{{ item.totalPrice.toLocaleString() }}</span
                >
              </div>
              <div
                v-if="order.items.length > 2"
                class="text-xs text-gray-500 italic"
              >
                +{{ order.items.length - 2 }} item lainnya...
              </div>
            </div>
          </div>
        </div>

        <!-- Auto-refresh indicator for non-cash payments with uploaded proof -->
        <div
          v-if="
            !order.paid &&
            order.paymentMethod?.type !== 'CASH' &&
            order.paymentProof
          "
          class="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700"
        >
          <p
            class="text-sm text-gray-400 flex items-center justify-center gap-2"
          >
            <span class="animate-pulse">🔄</span>
            Memperbarui status pembayaran setiap 30 detik
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-2">
          <button
            v-if="order.paid"
            @click="viewOrderDetails"
            class="flex-1 bg-green-600 hover:bg-green-500 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>👁️</span>
            Lihat Detail Pesanan
          </button>

          <button
            @click="contactSupport"
            class="bg-purple-600 hover:bg-purple-500 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>💬</span>
            Hubungi Dukungan
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Proof Modal -->
    <div
      v-if="showPaymentProofModal"
      class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      @click="closePaymentProofModal"
    >
      <div class="max-w-lg w-full bg-slate-800 rounded-xl p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Bukti Pembayaran</h3>
          <button
            @click="closePaymentProofModal"
            class="text-gray-400 hover:text-white"
          >
            <span class="text-xl">✕</span>
          </button>
        </div>
        <img
          :src="order.paymentProof"
          alt="Bukti pembayaran"
          class="w-full rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import StatusBadge from "~/components/cust/StatusBadge.vue"

// Set page title
useHead({
  title: "Status Pembayaran",
})

const route = useRoute()
const router = useRouter()
const notify = useNotifications()

const order = ref(null)
const loading = ref(true)
const error = ref(false)
const refreshing = ref(false)
const selectedImage = ref(null)
const uploading = ref(false)
const dragover = ref(false)
const showPaymentProofModal = ref(false)
let refreshInterval = null

onMounted(() => {
  loadOrderDetails()

  // Auto-refresh every 30 seconds if payment proof is uploaded but not yet confirmed
  refreshInterval = setInterval(() => {
    if (
      order.value &&
      !order.value.paid &&
      order.value.paymentMethod?.type !== "CASH" &&
      order.value.paymentProof
    ) {
      refreshPaymentStatus()
    }
  }, 30000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
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

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processSelectedFile(file)
  }
}

const handleFileDrop = (event) => {
  dragover.value = false
  const file = event.dataTransfer.files[0]
  if (file) {
    processSelectedFile(file)
  }
}

const processSelectedFile = (file) => {
  // Validate file type
  if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
    notify.error("Silakan pilih file gambar yang valid (JPG, PNG)")
    return
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    notify.error("Ukuran file harus kurang dari 5MB")
    return
  }

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    selectedImage.value = {
      file: file,
      name: file.name,
      size: file.size,
      preview: e.target.result,
    }
  }
  reader.readAsDataURL(file)
}

const removeSelectedImage = () => {
  selectedImage.value = null
}

const uploadPaymentProof = async () => {
  if (!selectedImage.value) return

  uploading.value = true
  try {
    const formData = new FormData()
    formData.append("paymentProof", selectedImage.value.file)
    formData.append("orderId", order.value.id)
    formData.append("paid", true)
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }
    const response = await useApi(
      `api/pos/orders/${order.value.id}/payment-proof`,
      {
        method: "POST",
        body: formData,
      }
    )

    order.value.paymentProof = response.paymentProofUrl
    // selectedImage.value = null
    notify.success("Bukti pembayaran berhasil diunggah!")
  } catch (err) {
    console.error("Failed to upload payment proof:", err)
    notify.error("Gagal mengunggah bukti pembayaran")
  } finally {
    uploading.value = false
  }
}

const replacePaymentProof = () => {
  order.value.paymentProof = null
  selectedImage.value = null
}

const viewPaymentProof = () => {
  showPaymentProofModal.value = true
}

const closePaymentProofModal = () => {
  showPaymentProofModal.value = false
}

const refreshPaymentStatus = async () => {
  if (refreshing.value) return

  refreshing.value = true
  try {
    const orderId = route.params.id
    const response = await useApi(`api/pos/orders/${orderId}/payment-status`, {
      method: "GET",
    })

    if (response.paid !== order.value.paid) {
      order.value = { ...order.value, ...response }

      if (response.paid) {
        notify.success("Pembayaran dikonfirmasi oleh kasir!")
        clearInterval(refreshInterval)
      }
    }
  } catch (err) {
    console.error("Failed to refresh payment status:", err)
  } finally {
    refreshing.value = false
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

const getPaymentMethodIcon = (type) => {
  const icons = {
    QRIS: "📱",
    BANK: "🏦",
    CASH: "💵",
  }
  return icons[type] || "💳"
}

const getPaymentMethodDescription = (type) => {
  const descriptions = {
    QRIS: "Pindai kode QR untuk membayar",
    BANK: "Pembayaran transfer bank",
    CASH: "Bayar di kasir",
  }
  return descriptions[type] || "Metode pembayaran"
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString("id-ID", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const viewOrderDetails = () => {
  router.push(`/cust/orders/${order.value.id}/detail`)
}

const contactSupport = () => {
  const message = `Halo, saya butuh bantuan dengan Pesanan #${order.value.id.slice(-6)}. Metode pembayaran: ${order.value.paymentMethod?.name || "Tidak diketahui"}`
  const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}
</script>
