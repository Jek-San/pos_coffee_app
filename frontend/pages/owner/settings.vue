<template>
  <section class="max-w-4xl mx-auto py-10 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">⚙️ Pengaturan Toko</h1>
      <p class="text-gray-400">Sesuaikan tampilan dan informasi toko Anda</p>
    </div>

    <form @submit.prevent="handleSave" class="space-y-8">
      <div
        class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-2xl"
      >
        <!-- Logo Section -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-white">Logo Toko</h2>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <label class="text-sm font-medium text-gray-300 block"
                >Unggah Logo</label
              >
              <div class="relative">
                <input
                  type="file"
                  @change="handleLogoChange"
                  accept="image/*"
                  ref="fileInput"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  class="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-blue-500 transition-colors duration-200"
                >
                  <svg
                    class="w-12 h-12 text-gray-400 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class="text-gray-300 font-medium">
                    Klik untuk mengunggah logo
                  </p>
                  <p class="text-sm text-gray-500 mt-1">
                    PNG, JPG maksimal 5MB
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <label class="text-sm font-medium text-gray-300 block"
                >Pratinjau</label
              >
              <div
                class="bg-slate-700/50 rounded-xl p-6 min-h-[120px] flex items-center justify-center"
              >
                <div v-if="currentLogo" class="relative group">
                  <img
                    :src="currentLogo"
                    alt="Pratinjau Logo"
                    class="max-h-20 max-w-full rounded-lg shadow-lg"
                  />
                  <button
                    @click="clearLogo"
                    type="button"
                    class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
                <div v-else class="text-center">
                  <svg
                    class="w-12 h-12 text-gray-500 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <p class="text-gray-500 text-sm">Belum ada logo dipilih</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Store Details -->
        <div class="border-t border-slate-700 pt-8 mt-8">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center"
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 8h3m-3 4h3m-3 4h3m6-8h.01M17 12h.01M17 16h.01"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-white">Informasi Toko</h2>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Store Name -->
            <div class="space-y-3">
              <label class="text-sm font-medium text-gray-300 block"
                >Nama Toko</label
              >
              <input
                v-model="form.name"
                class="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Masukkan nama toko Anda"
                required
              />
            </div>

            <!-- Slug -->
            <div class="space-y-3">
              <label class="text-sm font-medium text-gray-300 block"
                >URL Toko</label
              >
              <input
                v-model="form.slug"
                class="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="url-toko-anda"
                required
              />
              <p class="text-xs text-gray-400 flex items-center gap-1">
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
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  ></path>
                </svg>
                URL toko Anda:
                <span class="text-blue-400 font-mono"
                  >/c/{{ form.slug || "url-anda" }}</span
                >
              </p>
            </div>
          </div>
        </div>

        <!-- Theme Color -->
        <div class="border-t border-slate-700 pt-8 mt-8">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center"
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
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-white">Warna Tema</h2>
          </div>

          <div class="flex items-center gap-4">
            <div class="relative">
              <input
                type="color"
                v-model="form.themeColor"
                class="w-16 h-16 rounded-lg border-2 border-slate-600 cursor-pointer"
                :style="{ backgroundColor: form.themeColor }"
              />
            </div>
            <div>
              <p class="text-white font-medium">{{ form.themeColor }}</p>
              <p class="text-sm text-gray-400">
                Warna ini akan digunakan untuk tombol dan aksen
              </p>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="border-t border-slate-700 pt-8 mt-8">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-400">
              <p>Semua perubahan akan disimpan segera</p>
            </div>
            <button
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
              {{ saving ? "Menyimpan..." : "Simpan Perubahan" }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue"

definePageMeta({
  layout: "owner",
  middleware: ["auth", "role"],
  allowedRoles: ["OWNER", "CASHIER"], // 👈 define allowed roles here
})

const { activeMerchant } = useAuth()
const fileInput = ref(null)
const saving = ref(false)

const form = ref({
  name: "",
  slug: "",
  themeColor: "#3b82f6",
})

const logoFile = ref(null)
const logoPreview = ref(null)
const logoFromServer = ref(null)

// Computed property untuk tampilan logo saat ini
const currentLogo = computed(() => {
  return (
    logoPreview.value ||
    (logoFromServer.value ? useAssetUrl(logoFromServer.value) : null)
  )
})

const loadMerchant = async () => {
  const id = activeMerchant.value?.merchantId
  if (!id) return

  try {
    const data = await useApi(`api/pos/merchants/id/${id}`)

    form.value = {
      name: data.name || "",
      slug: data.slug || "",
      themeColor: data.themeColor || "#3b82f6",
    }

    // Cari gambar logo dari respon server
    const logoImage = data.images?.find((img) => img.type === "logo")
    logoFromServer.value = logoImage?.url || logoImage?.path || null
  } catch (error) {
    console.error("Gagal memuat data merchant:", error)
  }
}

const handleLogoChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  // Validasi tipe file
  if (!file.type.startsWith("image/")) {
    alert("Silakan pilih file gambar yang valid (PNG, JPG, JPEG, GIF)")
    return
  }

  // Validasi ukuran file (maksimal 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert("Ukuran file harus kurang dari 5MB")
    return
  }

  // Bersihkan pratinjau sebelumnya
  cleanupFilePreview()

  // Set file baru dan buat pratinjau
  logoFile.value = file
  logoPreview.value = URL.createObjectURL(file)
}

const clearLogo = () => {
  cleanupFilePreview()
  logoFromServer.value = null

  // Reset input file
  if (fileInput.value) {
    fileInput.value.value = ""
  }
}

const handleSave = async () => {
  const id = activeMerchant.value?.merchantId
  if (!id) return

  // Validasi form
  if (!form.value.name.trim()) {
    alert("Nama toko wajib diisi")
    return
  }

  if (!form.value.slug.trim()) {
    alert("URL toko wajib diisi")
    return
  }

  saving.value = true

  try {
    const formData = new FormData()
    formData.append("name", form.value.name.trim())
    formData.append("slug", form.value.slug.trim())
    formData.append("themeColor", form.value.themeColor)
    formData.append("storage", "local")

    // Sertakan logo jika diubah
    if (logoFile.value) {
      formData.append("logo", logoFile.value)
    }

    const response = await useApi(`api/pos/merchants/${id}`, {
      method: "PUT",
      body: formData,
    })

    alert("✅ Pengaturan toko berhasil diperbarui!")
  } catch (err) {
    console.error("Gagal menyimpan:", err)
    alert(
      "❌ Gagal menyimpan perubahan: " +
        (err.message || "Kesalahan tidak dikenal")
    )
  } finally {
    saving.value = false
  }
}

const cleanupFilePreview = () => {
  if (logoPreview.value && logoPreview.value.startsWith("blob:")) {
    URL.revokeObjectURL(logoPreview.value)
  }
  logoPreview.value = null
  logoFile.value = null
}

// Bersihkan saat komponen di-unmount
onUnmounted(() => {
  cleanupFilePreview()
})

// Muat data merchant saat komponen di-mount
onMounted(() => {
  loadMerchant()
})
</script>
