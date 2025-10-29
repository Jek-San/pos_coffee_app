<template>
  <section class="max-w-4xl mx-auto py-10 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">💳 Metode Pembayaran</h1>
      <p class="text-gray-400">
        Kelola metode pembayaran yang diterima toko Anda
      </p>
    </div>

    <form @submit.prevent="handleSave" class="space-y-8">
      <div
        class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-2xl"
      >
        <!-- Payment Method Options -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3m0 0c1.657 0 3-1.343 3-3s-1.343-3-3-3m0 0V4m0 10v6"
                />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-white">
              Metode Pembayaran yang Diterima
            </h2>
          </div>

          <!-- Payment Method Cards -->
          <div
            v-for="(option, index) in form.paymentMethodOptions"
            :key="index"
            class="bg-slate-800 p-6 rounded-xl border border-slate-600 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-white">
                Metode Pembayaran {{ index + 1 }}
              </h3>
              <button
                type="button"
                class="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                @click="removePaymentMethod(index)"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>

            <!-- Type Selection -->
            <div class="flex flex-col space-y-2">
              <label class="text-sm font-medium text-gray-300"
                >Jenis Metode Pembayaran</label
              >
              <select
                v-model="option.type"
                class="bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="">Pilih metode pembayaran</option>
                <option value="CASH">💵 Tunai</option>
                <option value="BANK">🏦 Transfer Bank</option>
                <option value="QRIS">📱 QRIS</option>
              </select>
            </div>

            <!-- Bank Transfer Fields -->
            <div
              v-if="option.type === 'BANK'"
              class="space-y-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600"
            >
              <div class="flex items-center gap-2 mb-3">
                <svg
                  class="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 8h3m-3 4h3m-3 4h3m6-8h.01M17 12h.01M17 16h.01"
                  ></path>
                </svg>
                <h4 class="text-white font-medium">Detail Transfer Bank</h4>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-300 block mb-2"
                    >Nama Bank</label
                  >
                  <input
                    v-model="option.name"
                    placeholder="contoh: BCA, Mandiri, BNI"
                    class="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-300 block mb-2"
                    >Nomor Rekening</label
                  >
                  <input
                    v-model="option.accountNumber"
                    placeholder="contoh: 1234567890"
                    class="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="text-sm font-medium text-gray-300 block mb-2"
                    >Nama Pemegang Rekening</label
                  >
                  <input
                    v-model="option.accountName"
                    placeholder="contoh: John Doe"
                    class="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <!-- QRIS Fields -->
            <div
              v-if="option.type === 'QRIS'"
              class="space-y-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600"
            >
              <div class="flex items-center gap-2 mb-3">
                <svg
                  class="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
                <h4 class="text-white font-medium">Detail Pembayaran QRIS</h4>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-300 block mb-2"
                    >Nama Bank/Penyedia</label
                  >
                  <input
                    v-model="option.name"
                    placeholder="contoh: GoPay, OVO, Dana"
                    class="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-300 block mb-2"
                    >Nama Pemegang Akun</label
                  >
                  <input
                    v-model="option.accountName"
                    placeholder="contoh: John Doe"
                    class="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              <!-- QR Code Upload -->
              <div class="space-y-3">
                <label class="text-sm font-medium text-gray-300 block"
                  >Gambar Kode QR</label
                >
                <div class="flex items-start gap-4">
                  <div class="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      @change="(e) => handleQrImageChange(e, index)"
                      class="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-colors"
                    />
                    <p class="text-xs text-gray-400 mt-1">
                      PNG, JPG maksimal 5MB
                    </p>
                  </div>
                </div>

                <!-- QR Code Preview -->
                <div
                  v-if="option.preview"
                  class="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-600"
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-300">Pratinjau Kode QR</span>
                    <button
                      type="button"
                      @click="clearQrImage(index)"
                      class="text-red-400 hover:text-red-300 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                  <img
                    :src="option.preview"
                    alt="Pratinjau Kode QR"
                    class="max-h-48 max-w-48 object-contain border border-slate-600 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <!-- Cash Method (No additional fields needed) -->
            <div
              v-if="option.type === 'CASH'"
              class="p-4 bg-green-500/10 rounded-lg border border-green-500/20"
            >
              <div class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-green-400"
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
                <span class="text-green-400 font-medium"
                  >Metode pembayaran tunai telah dikonfigurasi</span
                >
              </div>
              <p class="text-sm text-gray-400 mt-1">
                Tidak diperlukan konfigurasi tambahan untuk pembayaran tunai.
              </p>
            </div>
          </div>

          <!-- Add Payment Method Button -->
          <button
            type="button"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            @click="addPaymentMethod"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Tambah Metode Pembayaran Baru
          </button>

          <!-- Empty State -->
          <div
            v-if="form.paymentMethodOptions.length === 0"
            class="text-center py-12 bg-slate-700/30 rounded-xl border-2 border-dashed border-slate-600"
          >
            <svg
              class="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3m0 0c1.657 0 3-1.343 3-3s-1.343-3-3-3m0 0V4m0 10v6"
              ></path>
            </svg>
            <h3 class="text-xl font-semibold text-white mb-2">
              Tidak Ada Metode Pembayaran
            </h3>
            <p class="text-gray-400 mb-4">
              Tambahkan metode pembayaran pertama Anda untuk mulai menerima
              pembayaran
            </p>
            <button
              type="button"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              @click="addPaymentMethod"
            >
              Tambah Metode Pembayaran
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="border-t border-slate-700 pt-8 mt-8">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-400">
              <p>
                💡 Konfigurasikan setidaknya satu metode pembayaran untuk mulai
                menerima pembayaran
              </p>
            </div>
            <button
              class="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              type="submit"
              :disabled="saving"
            >
              <svg
                v-if="saving"
                class="w-5 h-5 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                ></path>
              </svg>
              {{
                saving
                  ? isEditing
                    ? "Menyimpan..."
                    : "Membuat..."
                  : isEditing
                    ? "Perbarui Metode Pembayaran"
                    : "Simpan Metode Pembayaran"
              }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue"

definePageMeta({ layout: "owner" })

const { activeMerchant } = useAuth()
const notify = useNotifications()
const route = useRouter()
const saving = ref(false)

const form = ref({
  paymentMethodOptions: [],
})

const isEditing = ref(false)

// Payment method functions
const addPaymentMethod = () => {
  form.value.paymentMethodOptions.push({
    id: null,
    type: "",
    name: "",
    accountNumber: "",
    accountName: "",
    preview: null,
    qrImageFile: null,
  })
}

const removePaymentMethod = (index) => {
  // Clean up any blob URLs before removing
  const option = form.value.paymentMethodOptions[index]
  if (option.preview && option.preview.startsWith("blob:")) {
    URL.revokeObjectURL(option.preview)
  }
  form.value.paymentMethodOptions.splice(index, 1)
}

const handleQrImageChange = (e, index) => {
  const file = e.target.files?.[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith("image/")) {
    alert("Silakan pilih file gambar yang valid")
    return
  }

  // Validate file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    alert("Ukuran file harus kurang dari 5MB")
    return
  }

  // Clean up previous preview
  const option = form.value.paymentMethodOptions[index]
  if (option.preview && option.preview.startsWith("blob:")) {
    URL.revokeObjectURL(option.preview)
  }

  // Create new preview
  const reader = new FileReader()
  reader.onload = () => {
    form.value.paymentMethodOptions[index].preview = reader.result
    form.value.paymentMethodOptions[index].qrImageFile = file
  }
  reader.readAsDataURL(file)
}

const clearQrImage = (index) => {
  const option = form.value.paymentMethodOptions[index]
  if (option.preview && option.preview.startsWith("blob:")) {
    URL.revokeObjectURL(option.preview)
  }
  form.value.paymentMethodOptions[index].preview = null
  form.value.paymentMethodOptions[index].qrImageFile = null
}

const loadPaymentMethods = async () => {
  const id = activeMerchant.value?.merchantId
  if (!id) return

  try {
    const data = await useApi(`api/pos/payment-method/${id}`)
    if (data.length > 0) isEditing.value = true
    const processed = (data || []).map((option) => {
      let preview = null

      if (option.type === "QRIS" && option.images?.length > 0) {
        const qrImage = option.images.find((img) => img.type === "qrImage")
        if (qrImage?.url) {
          preview = qrImage.url
        }
      }

      return {
        ...option,
        preview,
        qrImageFile: null,
      }
    })

    form.value.paymentMethodOptions = processed
  } catch (error) {
    notify.error("Gagal memuat metode pembayaran:", error)
  }
}

const handleSave = async () => {
  const id = activeMerchant.value?.merchantId
  if (!id) return

  // Validate payment methods
  for (let i = 0; i < form.value.paymentMethodOptions.length; i++) {
    const option = form.value.paymentMethodOptions[i]

    if (!option.type) {
      notify.warning(`Jenis metode pembayaran ${i + 1} harus diisi`)
      return
    }

    if (option.type === "BANK") {
      if (!option.name || !option.accountNumber || !option.accountName) {
        notify.warning(
          `Metode pembayaran ${i + 1} memerlukan nama bank, nomor rekening, dan nama pemegang rekening`
        )
        return
      }
    }

    if (option.type === "QRIS") {
      if (!option.name || !option.accountName) {
        notify.warning(
          `Metode pembayaran ${i + 1} memerlukan nama penyedia dan nama pemegang akun`
        )
        return
      }
    }
  }

  saving.value = true

  try {
    const formData = new FormData()
    formData.append("storage", "cloudinary")

    // JSON stringify method options (without image blob)
    const sanitized = form.value.paymentMethodOptions.map(
      ({ preview, qrImageFile, ...rest }) => rest
    )
    formData.append("paymentMethodOptions", JSON.stringify(sanitized))

    // Include QR images
    form.value.paymentMethodOptions.forEach((opt, i) => {
      if (opt.qrImageFile) {
        formData.append(`qr_${i}`, opt.qrImageFile)
      }
    })

    if (isEditing.value) {
      const response = await useApi(`api/pos/payment-method/${id}`, {
        method: "PATCH",
        body: formData,
      })
    } else {
      const response = await useApi(`api/pos/payment-method/${id}`, {
        method: "POST",
        body: formData,
      })
    }

    notify.success("Metode pembayaran berhasil diperbarui!")
    setTimeout(() => {
      navigateTo("/owner/get-started")
    }, 1000)
  } catch (err) {
    console.error(err)
    notify.error(
      "❌ Gagal menyimpan metode pembayaran: " +
        (err.message || "Kesalahan tidak diketahui")
    )
  } finally {
    saving.value = false
  }
}

// Watch for changes in payment method options to clean up blob URLs
watch(
  () => form.value.paymentMethodOptions,
  (newVal, oldVal) => {
    // Clean up removed items
    if (oldVal) {
      oldVal.forEach((oldOption, index) => {
        const newOption = newVal[index]
        if (
          !newOption &&
          oldOption.preview &&
          oldOption.preview.startsWith("blob:")
        ) {
          URL.revokeObjectURL(oldOption.preview)
        }
      })
    }
  },
  { deep: true }
)

// Cleanup on component unmount
onUnmounted(() => {
  // Clean up all payment method previews
  form.value.paymentMethodOptions.forEach((option) => {
    if (option.preview && option.preview.startsWith("blob:")) {
      URL.revokeObjectURL(option.preview)
    }
  })
})

// Load payment methods on mount
onMounted(() => {
  loadPaymentMethods()
})
</script>
