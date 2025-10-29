<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
  >
    <!-- Header Section -->
    <div class="relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="grid grid-cols-8 gap-4 h-full">
          <div v-for="i in 32" :key="i" class="bg-white/10 rounded-lg"></div>
        </div>
      </div>

      <div class="relative max-w-7xl mx-auto px-6 py-16">
        <div class="text-center space-y-6">
          <div
            class="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3"
          >
            <div
              class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
            ></div>
            <span class="text-emerald-400 font-medium"
              >Sistem Manajemen Meja</span
            >
          </div>

          <h1
            class="text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
          >
            Pengaturan Meja QR
          </h1>

          <p class="text-xl text-slate-300 max-w-2xl mx-auto">
            Buat dan kelola meja restoran Anda dengan kode QR yang indah untuk
            pengalaman pelanggan yang seamless
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 pb-16">
      <!-- Control Panel -->
      <div
        class="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/10"
      >
        <div class="flex flex-col lg:flex-row gap-8 items-center">
          <!-- Bulk Creation -->
          <div class="flex-1 space-y-4">
            <h3 class="text-2xl font-semibold text-white">Pengaturan Cepat</h3>
            <form @submit.prevent="handleBulkAdd" class="flex gap-4">
              <div class="relative flex-1">
                <input
                  v-model.number="tableCount"
                  class="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Jumlah meja (contoh: 30)"
                  required
                />
                <div class="absolute right-3 top-3 text-slate-400">
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
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    ></path>
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                class="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
              >
                Buat Meja
              </button>
            </form>
          </div>

          <!-- Single Table Creation -->
          <div class="flex-1 space-y-4">
            <h3 class="text-2xl font-semibold text-white">Meja Khusus</h3>
            <form @submit.prevent="handleSingleAdd" class="flex gap-4">
              <div class="relative flex-1">
                <input
                  v-model="customTableName"
                  class="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  type="text"
                  placeholder="Nama meja (contoh: VIP-1, Teras-A)"
                  required
                />
                <div class="absolute right-3 top-3 text-slate-400">
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
                </div>
              </div>
              <button
                type="submit"
                class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
              >
                Tambah Meja
              </button>
            </form>
          </div>
        </div>

        <!-- Stats -->
        <div class="mt-8 pt-6 border-t border-white/10">
          <div class="flex items-center justify-between">
            <div class="text-slate-300">
              <span class="text-2xl font-bold text-white">{{
                tables.length
              }}</span>
              <span class="ml-2">Total Meja</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-slate-300">
                <span class="text-lg font-semibold text-emerald-400">{{
                  activeTablesCount
                }}</span>
                <span class="ml-1">Aktif</span>
              </div>
              <div class="w-1 h-6 bg-slate-600 rounded-full"></div>
              <button
                @click="generatePrintablePDF"
                class="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25 flex items-center space-x-2"
                v-if="tables.length > 0"
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
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  ></path>
                </svg>
                <span>Cetak Semua Kode QR</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tables Grid -->
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-3xl font-bold text-white">Meja Anda</h2>
          <div class="flex items-center space-x-4">
            <!-- View Toggle -->
            <div class="bg-slate-800/50 rounded-xl p-1 border border-slate-600">
              <button
                @click="viewMode = 'grid'"
                :class="
                  viewMode === 'grid'
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-400 hover:text-white'
                "
                class="p-2 rounded-lg transition-all"
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
              </button>
              <button
                @click="viewMode = 'list'"
                :class="
                  viewMode === 'list'
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-400 hover:text-white'
                "
                class="p-2 rounded-lg transition-all"
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
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="tables.length === 0" class="text-center py-20">
          <div
            class="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-full mb-6"
          >
            <svg
              class="w-10 h-10 text-slate-400"
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
          </div>
          <h3 class="text-2xl font-semibold text-slate-300 mb-2">
            Belum ada meja
          </h3>
          <p class="text-slate-400 max-w-md mx-auto">
            Mulai dengan membuat meja pertama Anda menggunakan form di atas.
            Anda dapat membuat beberapa meja sekaligus atau membuat meja dengan
            nama khusus.
          </p>
        </div>

        <!-- Grid View -->
        <div
          v-else-if="viewMode === 'grid'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="table in tables"
            :key="table.id"
            class="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-slate-900/50"
          >
            <!-- Table Header -->
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-white">{{ table.name }}</h3>
              <div class="flex items-center space-x-2">
                <div
                  class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                ></div>
                <span class="text-xs text-emerald-400 font-medium">AKTIF</span>
              </div>
            </div>

            <!-- QR Code Container -->
            <div class="relative mb-4">
              <div class="bg-white rounded-xl p-4 shadow-lg">
                <div class="relative inline-block" :data-table-id="table.id">
                  <qrcode-vue
                    :value="`${origin}/qr/${merchantSlug}/${table.id}`"
                    :size="140"
                    :level="'H'"
                    :render-as="'canvas'"
                  />

                  <!-- Elegant Logo Overlay -->
                  <div
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <div class="relative">
                      <!-- Outer ring -->
                      <div
                        class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-slate-900/20"
                      >
                        <!-- Inner logo -->
                        <div
                          class="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center"
                        >
                          <span class="text-white font-bold text-sm">J</span>
                        </div>
                      </div>

                      <!-- Subtle glow -->
                      <div
                        class="absolute inset-0 w-10 h-10 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full opacity-20 blur-sm"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Table Actions -->
            <div class="flex items-center justify-between">
              <div class="text-sm text-slate-400">ID: {{ table.id }}</div>
              <div class="flex items-center space-x-2">
                <button
                  @click="downloadQR(table)"
                  class="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
                  title="Unduh Kode QR"
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </button>
                <button
                  @click="deleteTable(table.id)"
                  class="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  title="Hapus Meja"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <div
            v-for="table in tables"
            :key="table.id"
            class="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-6">
                <div class="bg-white rounded-lg p-2 shadow-lg">
                  <div class="relative inline-block">
                    <qrcode-vue
                      :value="`${origin}/qr/${merchantSlug}/${table.id}`"
                      :size="60"
                      :level="'H'"
                      :render-as="'canvas'"
                    />

                    <!-- Mini Logo Overlay for List View -->
                    <div
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <div
                        class="w-3 h-3 bg-white rounded-full flex items-center justify-center shadow ring-1 ring-slate-900/20"
                      >
                        <div
                          class="w-2.5 h-2.5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center"
                        >
                          <span class="text-white font-bold text-xs">J</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white">{{ table.name }}</h3>
                  <p class="text-slate-400">ID: {{ table.id }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <div
                    class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                  ></div>
                  <span class="text-emerald-400 font-medium">AKTIF</span>
                </div>
                <button
                  @click="downloadQR(table)"
                  class="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </button>
                <button
                  @click="deleteTable(table.id)"
                  class="p-2 text-slate-400 hover:text-red-400 transition-colors"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "owner" })
import { ref, onMounted, computed } from "vue"
import { useApi } from "@/composables/useApi"
import { useAuth } from "@/composables/useAuth"
import QrcodeVue from "qrcode.vue"

const { activeMerchant } = useAuth()
const merchantSlug = computed(() => activeMerchant.value?.merchantSlug)
const tables = ref([])
const tableCount = ref(10)
const customTableName = ref("")
const viewMode = ref("grid")
const origin = ref("")

const activeTablesCount = computed(() => tables.value.length)

// Set origin on client side to avoid SSR issues
onMounted(() => {
  origin.value = window.location.origin
})

const loadTables = async () => {
  const id = activeMerchant.value?.merchantId
  if (!id) return
  try {
    tables.value = await useApi(`api/pos/tables/${id}`)
    // console.log(tables.value)
  } catch (error) {
    console.error("Error loading tables:", error)
  }
}

const handleBulkAdd = async () => {
  const id = activeMerchant.value?.merchantId
  if (!id || tableCount.value < 1) return

  const names = Array.from({ length: tableCount.value }, (_, i) => ({
    name: `M-${String(i + 1).padStart(2, "0")}`,
  }))

  try {
    await useApi(`api/pos/pos-setup/merchants/${id}/tables/bulk`, {
      method: "POST",
      body: names,
    })

    tableCount.value = 10
    await loadTables()
  } catch (error) {
    console.error("Error adding tables:", error)
  }
}

const handleSingleAdd = async () => {
  const id = activeMerchant.value?.merchantId
  if (!id || !customTableName.value.trim()) return

  try {
    await useApi(`api/pos/pos-setup/merchants/${id}/tables`, {
      method: "POST",
      body: { name: customTableName.value.trim() },
    })

    customTableName.value = ""
    await loadTables()
  } catch (error) {
    console.error("Error adding table:", error)
  }
}

const deleteTable = async (tableId) => {
  const id = activeMerchant.value?.merchantId
  if (!id) return

  try {
    await useApi(`api/pos/pos-setup/merchants/${id}/tables/${tableId}`, {
      method: "DELETE",
    })

    await loadTables()
  } catch (error) {
    console.error("Error deleting table:", error)
  }
}

const clearAllTables = async () => {
  if (
    !confirm(
      "Apakah Anda yakin ingin menghapus semua meja? Tindakan ini tidak dapat dibatalkan."
    )
  )
    return

  const id = activeMerchant.value?.merchantId
  if (!id) return

  try {
    // Delete all tables one by one
    await Promise.all(
      tables.value.map((table) =>
        useApi(`api/pos/pos-setup/merchants/${id}/tables/${table.id}`, {
          method: "DELETE",
        })
      )
    )

    await loadTables()
  } catch (error) {
    console.error("Error clearing tables:", error)
  }
}

const downloadQR = async (table) => {
  try {
    // Create a temporary canvas to generate the QR code
    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")

    // Set temporary canvas size for QR generation
    tempCanvas.width = 300
    tempCanvas.height = 300

    // Create QR code using qrcode-vue component data
    const qrData = `${origin.value}/qr/${merchantSlug.value}/${table.id}`

    // We'll use the existing QR code canvas from the DOM
    const qrCanvas = document.querySelector(
      `[data-table-id="${table.id}"] canvas`
    )
    if (!qrCanvas) {
      console.error("QR canvas not found")
      return
    }

    // Create final canvas
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    // Set canvas size
    canvas.width = 300
    canvas.height = 360

    // Draw white background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw QR code (scaled up from the existing canvas)
    ctx.drawImage(qrCanvas, 25, 25, 250, 250)

    // Add table name
    ctx.fillStyle = "black"
    ctx.font = "bold 20px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(table.name, canvas.width / 2, 320)

    // Download
    const link = document.createElement("a")
    link.download = `qr-${table.name.toLowerCase().replace(/\s+/g, "-")}.png`
    link.href = canvas.toDataURL()
    link.click()
  } catch (error) {
    console.error("Error downloading QR code:", error)
  }
}

const generatePrintablePDF = async () => {
  try {
    // Create a new window for printing
    const printWindow = window.open("", "_blank")

    // Generate HTML for all QR codes
    let htmlContent = `
<!DOCTYPE html>
<html>
<head>
<title>Kode QR - ${activeMerchant.value?.name || "Restoran"}</title>
<style>
body {
font-family: Arial, sans-serif;
margin: 0;
padding: 20px;
background: white;
}
.page-title {
text-align: center;
font-size: 24px;
font-weight: bold;
margin-bottom: 30px;
color: #333;
}
.qr-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 20px;
margin-bottom: 30px;
}
.qr-card {
border: 2px dashed #ccc;
border-radius: 8px;
padding: 20px;
text-align: center;
background: #fafafa;
page-break-inside: avoid;
}
.qr-code {
background: white;
padding: 10px;
border-radius: 8px;
margin-bottom: 15px;
display: inline-block;
}
.table-name {
font-size: 18px;
font-weight: bold;
color: #333;
margin-bottom: 5px;
}
.table-id {
font-size: 12px;
color: #666;
}
.cutting-guide {
font-size: 12px;
color: #999;
margin-top: 10px;
}
@media print {
body { margin: 0; padding: 10px; }
.qr-grid { gap: 15px; }
.qr-card { border: 1px solid #ccc; }
}
</style>
</head>
<body>
<div class="page-title">Kode QR - ${activeMerchant.value?.name || "Restoran"}</div>
<div class="qr-grid">
`

    // Add each table's QR code
    for (const table of tables.value) {
      const qrDataURL = await generateQRDataURL(table)
      htmlContent += `
<div class="qr-card">
<div class="qr-code">
<img src="${qrDataURL}" alt="Kode QR untuk ${table.name}" style="width: 150px; height: 150px;">
</div>
<div class="table-name">${table.name}</div>

<div class="cutting-guide">✂️ Potong mengikuti garis putus-putus</div>
</div>
`
    }

    htmlContent += `
</div>
<div style="text-align: center; margin-top: 20px; font-size: 14px; color: #666;">
Dibuat pada ${new Date().toLocaleDateString("id-ID")} - Total: ${tables.value.length} meja
</div>
</body>
</html>
`

    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Wait for images to load then print
    setTimeout(() => {
      printWindow.print()
    }, 1000)
  } catch (error) {
    console.error("Error generating printable PDF:", error)
  }
}

const generateQRDataURL = async (table) => {
  return new Promise((resolve) => {
    try {
      // Create canvas for QR code generation
      const canvas = document.createElement("canvas")
      const qrData = `${origin.value}/qr/${merchantSlug.value}/${table.id}`

      // Use QRious library (which should be available in the print window)
      // For now, we'll copy the QR code from the existing canvas in the DOM
      const existingQRCanvas = document.querySelector(
        `[data-table-id="${table.id}"] canvas`
      )

      if (existingQRCanvas) {
        // Create a new canvas to copy the QR code
        const newCanvas = document.createElement("canvas")
        const ctx = newCanvas.getContext("2d")

        // Set size
        newCanvas.width = 150
        newCanvas.height = 150

        // Fill with white background
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, newCanvas.width, newCanvas.height)

        // Draw the existing QR code
        ctx.drawImage(existingQRCanvas, 0, 0, newCanvas.width, newCanvas.height)

        resolve(newCanvas.toDataURL())
      } else {
        // Fallback: create QR code using canvas and manual generation
        // You should install a QR code library for this to work properly
        console.warn("QR canvas not found, creating fallback")

        const fallbackCanvas = document.createElement("canvas")
        const ctx = fallbackCanvas.getContext("2d")

        fallbackCanvas.width = 150
        fallbackCanvas.height = 150

        // White background
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, fallbackCanvas.width, fallbackCanvas.height)

        // Add a placeholder message
        ctx.fillStyle = "black"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Kode QR", 75, 70)
        // ctx.fillText(table.name, 75, 90)

        resolve(fallbackCanvas.toDataURL())
      }
    } catch (error) {
      console.error("Error generating QR data URL:", error)
      resolve("") // Return empty string on error
    }
  })
}
onMounted(loadTables)
</script>
