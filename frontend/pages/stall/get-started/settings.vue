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
        <!-- Store User -->
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-white">Informasi User</h2>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- User Name -->
            <div class="space-y-3">
              <label class="text-sm font-medium text-gray-300 block"
                >Nama User</label
              >
              <input
                v-model="form.nameUser"
                class="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Masukkan nama user Anda"
                required
              />
            </div>

            <!-- Email -->
            <div class="space-y-3">
              <label class="text-sm font-medium text-gray-300 block"
                >Email</label
              >
              <input
                v-model="form.emailUser"
                type="email"
                class="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Masukkan email Anda"
                required
              />
            </div>

            <!-- Password -->
            <div class="space-y-3 md:col-span-2">
              <label class="text-sm font-medium text-gray-300 block"
                >Password Baru</label
              >
              <input
                type="password"
                v-model="form.password"
                class="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Kosongkan jika tidak ingin mengubah password"
              />
              <p class="text-xs text-gray-400">
                Kosongkan jika tidak ingin mengubah password
              </p>
            </div>
          </div>
        </div>

        <!-- Store Details -->
        <div class="border-t border-slate-700 pt-8 mt-8">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center"
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
                v-model="form.nameStall"
                class="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Masukkan nama toko Anda"
                required
              />
            </div>

            <!-- Description -->
            <div class="space-y-3">
              <label class="text-sm font-medium text-gray-300 block"
                >Deskripsi</label
              >
              <input
                v-model="form.description"
                class="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Deskripsi toko Anda"
                required
              />
            </div>
          </div>
        </div>

        <!-- Jadwal Mingguan -->
        <div class="border-t border-slate-700 pt-8 mt-8">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center"
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-white">🕒 Jadwal Mingguan</h2>
          </div>

          <div class="space-y-4">
            <p class="text-sm text-gray-400">
              💡 Gunakan format 24 jam (00:00 - 23:59). Contoh: 09:00 untuk jam
              9 pagi, 21:00 untuk jam 9 malam
            </p>
            <div
              v-for="(day, index) in form.schedules"
              :key="index"
              class="flex flex-wrap gap-4 items-center p-4 bg-slate-700/30 rounded-lg"
            >
              <span class="w-20 text-gray-300 font-medium">{{
                dayNames[index]
              }}</span>
              <div class="flex items-center gap-2">
                <select
                  v-model="day.openHour"
                  :disabled="day.closed"
                  class="p-2 rounded bg-slate-700 text-white disabled:opacity-50"
                  title="Pilih jam buka (24 jam)"
                >
                  <option value="">Pilih jam</option>
                  <option value="00:00">00:00 (Tengah malam)</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00 (Siang)</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </select>
                <span class="text-gray-400">-</span>
                <select
                  v-model="day.closeHour"
                  :disabled="day.closed"
                  class="p-2 rounded bg-slate-700 text-white disabled:opacity-50"
                  title="Pilih jam buka (24 jam)"
                >
                  <option value="">Pilih jam</option>
                  <option value="00:00">00:00 (Tengah malam)</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00 (Siang)</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </select>
              </div>
              <label class="flex items-center gap-2 text-gray-300">
                <input type="checkbox" v-model="day.closed" class="rounded" />
                Tutup
              </label>
            </div>
          </div>
        </div>

        <!-- Override Khusus -->
        <div class="border-t border-slate-700 pt-8 mt-8">
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
                  d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 2h6M4 21h16a2 2 0 002-2V9a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-white">📅 Hari Khusus</h2>
          </div>

          <div class="space-y-4">
            <div
              v-for="(ovr, idx) in form.overrides"
              :key="idx"
              class="flex flex-wrap gap-4 items-center p-4 bg-slate-700/30 rounded-lg"
            >
              <input
                type="date"
                v-model="ovr.date"
                class="p-2 rounded bg-slate-700 text-white"
              />
              <select
                v-model="ovr.isOpen"
                class="p-2 rounded bg-slate-700 text-white"
              >
                <option :value="true">Buka</option>
                <option :value="false">Tutup</option>
              </select>
              <input
                type="text"
                v-model="ovr.note"
                placeholder="Catatan (opsional)"
                class="flex-1 min-w-[200px] p-2 rounded bg-slate-700 text-white"
              />
              <button
                @click="form.overrides.splice(idx, 1)"
                type="button"
                class="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
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
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <button
              type="button"
              @click="addSpecialDay"
              class="w-full p-3 border-2 border-dashed border-slate-600 rounded-lg text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-colors duration-200 flex items-center justify-center gap-2"
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
              Tambah Hari Khusus
            </button>
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
  layout: "stall",
  middleware: ["auth", "role"],
  allowedRoles: ["STALL_OWNER"],
})

const route = useRoute()
const { activeMerchant } = useAuth()
const fileInput = ref(null)
const saving = ref(false)
const notify = useNotifications()

const dayNames = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
]

// Initialize form with proper structure
const form = ref({
  schedules: Array.from({ length: 7 }, (_, i) => ({
    dayOfWeek: i,
    openHour: "09:00",
    closeHour: "21:00",
    closed: false,
  })),
  overrides: [],
  nameStall: "",
  description: "",
  nameUser: "",
  emailUser: "",
  password: "",
  schedules: [],
  overrides: [],
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

// Initialize default schedules (7 days)
const initializeSchedules = () => {
  const schedules = []
  for (let i = 0; i < 7; i++) {
    schedules.push({
      dayOfWeek: i,
      openHour: "09:00",
      closeHour: "21:00",
      closed: false,
    })
  }
  return schedules
}

const loadStall = async () => {
  const id = activeMerchant.value?.stallId
  if (!id) return

  try {
    const response = await useApi(`api/pos/stalls/initSettingsStall/${id}`)
    const data = response.data

    // Set form values
    form.value = {
      nameStall: data.stall?.name || "",
      description: data.stall?.description || "",
      nameUser: data.admin?.name || "",
      emailUser: data.admin?.email || "",
      password: "",
      schedules: data.stall.schedules?.length
        ? data.stall.schedules
        : form.value.schedules, // fallback ke default
      overrides: data.stall.overrides?.length ? data.stall.overrides : [],
    }

    // Handle schedules - merge existing with defaults
    const defaultSchedules = initializeSchedules()
    if (data.stall?.schedules && data.stall.schedules.length > 0) {
      // Map existing schedules
      data.stall.schedules.forEach((schedule) => {
        const dayIndex = schedule.dayOfWeek
        if (dayIndex >= 0 && dayIndex < 7) {
          defaultSchedules[dayIndex] = {
            dayOfWeek: schedule.dayOfWeek,
            openHour: schedule.openHour || "09:00",
            closeHour: schedule.closeHour || "21:00",
            closed: schedule.closed || false,
          }
        }
      })
    }
    form.value.schedules = defaultSchedules

    // Handle overrides
    if (data.stall?.overrides && data.stall.overrides.length > 0) {
      form.value.overrides = data.stall.overrides.map((override) => ({
        date: override.date
          ? new Date(override.date).toISOString().split("T")[0]
          : "",
        isOpen: override.isOpen !== undefined ? override.isOpen : true,
        note: override.note || "",
      }))
    }

    // Handle logo
    const logoImage = data.stall?.images?.find((img) => img.type === "logo")
    logoFromServer.value = logoImage?.url || logoImage?.path || null
  } catch (error) {
    console.error("Gagal memuat data stall:", error)
    notify.error("Gagal memuat data stall")
    // Initialize with defaults on error
    form.value.schedules = initializeSchedules()
  }
}

const handleLogoChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  // Validasi tipe file
  if (!file.type.startsWith("image/")) {
    notify.info("Silakan pilih file gambar yang valid (PNG, JPG, JPEG, GIF)")
    return
  }

  // Validasi ukuran file (maksimal 5MB)
  if (file.size > 5 * 1024 * 1024) {
    notify.info("Ukuran file harus kurang dari 5MB")
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

const addSpecialDay = () => {
  form.value.overrides.push({
    date: "",
    isOpen: true,
    note: "",
  })
}

const handleSave = async () => {
  const id = activeMerchant.value?.stallId
  if (!id) {
    notify.error("ID Stall tidak ditemukan")
    return
  }

  // Validasi form
  if (!form.value.nameStall.trim()) {
    notify.info("Nama toko wajib diisi")
    return
  }

  if (!form.value.nameUser.trim()) {
    notify.info("Nama user wajib diisi")
    return
  }

  if (!form.value.emailUser.trim()) {
    notify.info("Email user wajib diisi")
    return
  }

  saving.value = true

  try {
    const formData = new FormData()

    // Basic stall info
    formData.append("nameStall", form.value.nameStall.trim())
    formData.append("description", form.value.description.trim())
    formData.append("nameUser", form.value.nameUser.trim())
    formData.append("emailUser", form.value.emailUser.trim())

    // Only include password if it's provided
    if (form.value.password && form.value.password.trim()) {
      formData.append("password", form.value.password.trim())
    }

    // Schedules
    formData.append("schedules", JSON.stringify(form.value.schedules))

    // Overrides - filter out empty dates
    const validOverrides = form.value.overrides.filter((ovr) => ovr.date.trim())
    formData.append("overrides", JSON.stringify(validOverrides))

    // Logo if changed
    if (logoFile.value) {
      formData.append("logo", logoFile.value)
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }
    const response = await useApi(
      `api/pos/stalls/update-settings-stall/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    )

    notify.success("Pengaturan stall berhasil diperbarui!")

    // Redirect after successful save
    setTimeout(() => {
      if (route.redirectedFrom) {
        navigateTo(route.redirectedFrom)
      } else {
        navigateTo("/owner/dashboard")
      }
    }, 1000)
  } catch (err) {
    console.error("Gagal menyimpan:", err)
    notify.error(
      "Gagal menyimpan perubahan: " + (err.message || "Kesalahan tidak dikenal")
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

// Muat data stall saat komponen di-mount
onMounted(() => {
  loadStall()
})
</script>
