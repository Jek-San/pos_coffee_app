<!-- pages/pos/get-started.vue -->
<template>
  <section
    class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16"
  >
    <div class="max-w-4xl mx-auto px-6">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg"
        >
          <svg
            class="w-10 h-10 text-white"
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
        <h1 class="text-4xl font-bold text-white mb-4">
          Siapkan Sistem POS Anda
        </h1>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto">
          Ikuti langkah-langkah sederhana ini untuk menjalankan sistem point of
          sale Anda dalam hitungan menit
        </p>
      </div>

      <!-- Progress Bar -->
      <div class="mb-12">
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm font-medium text-slate-300"
            >Progres Pengaturan</span
          >
          <span class="text-sm font-medium text-slate-300"
            >{{ completedSteps }}/{{ totalSteps }} Selesai</span
          >
        </div>
        <div class="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Setup Steps -->
      <div class="space-y-4">
        <StepCard
          :step="1"
          title="Kustomisasi Brand Anda"
          description="Unggah logo dan pilih warna tema yang sesuai dengan identitas bisnis Anda"
          :done="merchant.logoUrl || merchant.themeColor"
          to="/owner/get-started/settings"
          icon="palette"
        />

        <StepCard
          :step="2"
          title="Opsi Metode Pembayaran"
          description="Tambahkan metode pembayaran seperti tunai, bank, dan QRIS"
          :done="paymentMethod.length > 0"
          to="/owner/get-started/payment-method-options"
          icon="grid"
        />

        <StepCard
          :step="3"
          title="Buat Meja Anda"
          description="Atur layout meja dengan nama seperti A1, B1, dll. untuk mengorganisir area tempat duduk"
          :done="tables.length > 0"
          to="/owner/get-started/tables"
          icon="grid"
        />

        <StepCard
          :step="4"
          title="Bangun Menu Anda"
          description="Tambahkan item menu dengan harga, deskripsi, dan kategori untuk pelanggan Anda"
          :done="menuItems.length > 0"
          to="/owner/get-started/menu"
          icon="menu"
        />

        <div v-if="tables.length > 0">
          <StepCard
            :step="5"
            title="Pratinjau Pengalaman Pelanggan"
            description="Lihat bagaimana pelanggan akan melihat dan berinteraksi dengan menu QR Anda"
            :done="true"
            :to="`/qr/${merchant.slug}/${tables[0].id}`"
            external
            icon="eye"
          />
        </div>
      </div>

      <!-- Quick Actions -->
      <div
        class="mt-12 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-white mb-2">
              Butuh Bantuan?
            </h3>
            <p class="text-slate-300">
              Tim dukungan kami siap membantu Anda memulai
            </p>
          </div>
          <button
            class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Hubungi Dukungan
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "owner",
  middleware: ["auth", "role"],
  allowedRoles: ["owner", "cashier"], // 👈 tentukan peran yang diizinkan di sini
})
import { ref, onMounted, computed } from "vue"
import { useApi } from "@/composables/useApi"
import { useAuth } from "@/composables/useAuth"
import StepCard from "@/components/StepCard.vue"

const { activeMerchant } = useAuth()
console.log(activeMerchant.value)
const merchant = ref({})
const tables = ref([])
const menuItems = ref([])
const paymentMethod = ref([])

const totalSteps = 5
const completedSteps = computed(() => {
  let count = 0
  if (merchant.value.logoUrl || merchant.value.themeColor) count++
  if (tables.value.length > 0) count++
  if (menuItems.value.length > 0) count++
  if (paymentMethod.value.length > 0) count++
  count++ // Langkah pratinjau selalu selesai
  return count
})

const progressPercentage = computed(() => {
  return (completedSteps.value / totalSteps) * 100
})

onMounted(async () => {
  console.log(activeMerchant)
  console.log("ID Merchant:", activeMerchant.value?.merchantId)
  const id = activeMerchant.value?.merchantId
  if (!id) return

  const [m, p, t, menu] = await Promise.all([
    useApi(`api/pos/merchants/id/${id}`),
    useApi(`api/pos/payment-method/${id}`),
    useApi(`api/pos/pos-setup/tables?id=${id}`),
    useApi(`api/pos/pos-setup/menu-items?id=${id}`),
  ])

  merchant.value = m
  paymentMethod.value = p
  tables.value = t
  menuItems.value = menu
})
</script>
