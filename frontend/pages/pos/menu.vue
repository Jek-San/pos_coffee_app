<!-- pages/pos/menu.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8 sm:mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">
          Atur Menu Anda
        </h1>
        <p class="text-slate-400 text-lg">
          Buat dan kelola menu restoran Anda dengan mudah
        </p>
      </div>

      <!-- Main Content Grid - Fixed -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Form Section - Takes 8 columns out of 12 -->
        <div class="lg:col-span-2">
          <div
            class="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl"
          >
            <h2
              class="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-3"
            >
              <div
                class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
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
              Tambah Item Menu Baru
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name & Price Row -->
              <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300"
                    >Nama Item</label
                  >
                  <input
                    v-model="form.name"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                    placeholder="Masukkan nama item"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300"
                    >Harga (Rp)</label
                  >
                  <input
                    v-model.number="form.price"
                    type="number"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <!-- Category & Subcategory Row -->
              <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300"
                    >Kategori</label
                  >
                  <select
                    v-model="form.category"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                    required
                  >
                    <option value="" disabled>Pilih kategori</option>
                    <option value="FOOD">🍽️ Makanan</option>
                    <option value="DRINK">🥤 Minuman</option>
                    <option value="SNACK">🍿 Camilan</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300"
                    >Subkategori</label
                  >
                  <input
                    v-model="form.subCategoryName"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                    placeholder="contoh: Kopi, Nasi Goreng"
                  />
                </div>
              </div>
              <!-- Variants -->
              <div class="space-y-4">
                <div class="flex items-center gap-3 mb-6">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      ></path>
                    </svg>
                  </div>
                  <label class="text-xl font-semibold text-white"
                    >Grup Varian</label
                  >
                  <span class="text-slate-400 text-sm">(Opsional)</span>
                </div>

                <div
                  v-if="variantGroups.length === 0"
                  class="text-center py-8 border-2 border-dashed border-slate-600 rounded-xl"
                >
                  <div
                    class="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-3"
                  >
                    <svg
                      class="w-6 h-6 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      ></path>
                    </svg>
                  </div>
                  <p class="text-slate-400 text-sm mb-2">
                    Belum ada grup varian
                  </p>
                  <p class="text-slate-500 text-xs">
                    Tambahkan varian seperti ukuran, tipe, atau opsi kustomisasi
                  </p>
                </div>

                <div v-else class="space-y-4">
                  <div
                    v-for="(group, groupIndex) in variantGroups"
                    :key="groupIndex"
                    class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg"
                  >
                    <!-- Group Header -->
                    <div class="flex items-center justify-between mb-6">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                        >
                          {{ groupIndex + 1 }}
                        </div>
                        <h4 class="text-lg font-medium text-white">
                          Grup Varian
                        </h4>
                      </div>
                      <button
                        type="button"
                        @click="removeVariantGroup(groupIndex)"
                        class="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg flex items-center justify-center transition-all duration-200 border border-red-500/20"
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

                    <!-- Group Name Input -->
                    <div class="space-y-2 mb-6">
                      <label class="block text-sm font-medium text-slate-300"
                        >Nama Grup</label
                      >
                      <input
                        v-model="group.name"
                        class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                        placeholder="contoh: Ukuran, Tipe, Suhu"
                      />
                    </div>

                    <!-- Options -->
                    <div class="space-y-3 mb-4">
                      <div class="flex items-center gap-2 mb-3">
                        <div
                          class="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded flex items-center justify-center"
                        >
                          <svg
                            class="w-3 h-3 text-white"
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
                        <h5 class="text-sm font-medium text-slate-300">Opsi</h5>
                      </div>

                      <div
                        v-for="(option, optionIndex) in group.options"
                        :key="optionIndex"
                        class="flex items-center gap-3 p-3 bg-slate-900/40 rounded-xl border border-slate-700/30"
                      >
                        <div class="flex-1 space-y-1">
                          <label
                            class="block text-xs font-medium text-slate-400"
                            >Nama Opsi</label
                          >
                          <input
                            v-model="group.options[optionIndex].name"
                            class="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white text-sm placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                            placeholder="contoh: Kecil, Besar"
                          />
                        </div>

                        <div class="flex-1 space-y-1">
                          <label
                            class="block text-xs font-medium text-slate-400"
                            >Harga Tambahan (Rp)</label
                          >
                          <input
                            v-model="group.options[optionIndex].extraPrice"
                            type="number"
                            step="100"
                            class="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white text-sm placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                            placeholder="0"
                          />
                        </div>

                        <button
                          type="button"
                          @click="removeOption(groupIndex, optionIndex)"
                          class="w-8 h-8 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg flex items-center justify-center transition-all duration-200 border border-red-500/20 flex-shrink-0"
                          :disabled="group.options.length <= 1"
                          :class="{
                            'opacity-50 cursor-not-allowed':
                              group.options.length <= 1,
                          }"
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
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>

                      <button
                        type="button"
                        @click="addOption(groupIndex)"
                        class="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 rounded-xl border border-emerald-500/20 hover:border-emerald-500/30 transition-all duration-200"
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                        Tambah Opsi
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  @click="addVariantGroup"
                  class="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-purple-500/10 to-pink-600/10 hover:from-purple-500/20 hover:to-pink-600/20 text-purple-400 hover:text-purple-300 rounded-xl border border-purple-500/20 hover:border-purple-500/30 transition-all duration-200"
                >
                  <div
                    class="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
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
                  Tambah Grup Varian
                </button>
              </div>
              <!-- Description -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300"
                  >Deskripsi</label
                >
                <textarea
                  v-model="form.description"
                  class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 h-24 resize-none"
                  placeholder="Deskripsikan item menu Anda..."
                ></textarea>
              </div>

              <!-- Thumbnail Upload Section -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-slate-300"
                  >Gambar Thumbnail</label
                >

                <!-- Thumbnail Preview Card -->
                <div
                  v-if="preview.thumbnail"
                  class="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50"
                >
                  <div class="flex items-center gap-4">
                    <div class="relative group">
                      <img
                        :src="preview.thumbnail"
                        class="w-20 h-20 object-cover rounded-xl border-2 border-slate-600 shadow-lg"
                        alt="Preview thumbnail"
                      />
                      <div
                        class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center"
                      >
                        <button
                          type="button"
                          @click="removeThumbnail"
                          class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-200"
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
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="flex-1">
                      <p class="text-white font-medium text-sm">
                        Thumbnail Siap
                      </p>
                      <p class="text-slate-400 text-xs">
                        Klik gambar untuk menghapus
                      </p>
                    </div>
                    <label
                      class="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg text-white text-sm cursor-pointer hover:from-violet-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Ganti
                      <input
                        type="file"
                        accept="image/*"
                        @change="handleThumbnailChange"
                        class="hidden"
                      />
                    </label>
                  </div>
                </div>

                <!-- Upload Button (when no thumbnail) -->
                <div
                  v-else
                  class="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-slate-500 transition-colors duration-200"
                >
                  <div
                    class="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-3"
                  >
                    <svg
                      class="w-6 h-6 text-slate-400"
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
                  <p class="text-slate-400 text-sm mb-2">
                    Unggah gambar thumbnail
                  </p>
                  <label
                    class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg text-white text-sm cursor-pointer hover:from-violet-700 hover:to-purple-700 transition-all duration-200"
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
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    Pilih Gambar
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleThumbnailChange"
                      class="hidden"
                    />
                  </label>
                </div>
              </div>

              <!-- Gallery Upload Section -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-slate-300"
                  >Gambar Galeri</label
                >

                <div
                  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4"
                  v-if="preview.gallery.length"
                >
                  <div
                    v-for="(src, i) in preview.gallery"
                    :key="i"
                    class="relative group aspect-square"
                  >
                    <img
                      :src="src"
                      class="w-full h-full object-cover rounded-lg border border-slate-600 shadow-lg"
                      alt="Gambar galeri"
                    />
                    <div
                      class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center"
                    >
                      <button
                        type="button"
                        class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-200"
                        @click="removeGalleryImage(i)"
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
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  @click="galleryInput.click()"
                  class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700 hover:border-slate-500 transition-all duration-200"
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
                  {{
                    preview.gallery.length
                      ? "Tambah Gambar Lainnya"
                      : "Tambah Gambar Galeri"
                  }}
                </button>
                <input
                  ref="galleryInput"
                  type="file"
                  multiple
                  accept="image/*"
                  class="hidden"
                  @change="handleGalleryChange"
                />
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 focus:ring-4 focus:ring-cyan-500/30 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isSubmitting"
              >
                <span
                  v-if="isSubmitting"
                  class="flex items-center justify-center gap-2"
                >
                  <svg
                    class="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Menyimpan...
                </span>
                <span v-else>Tambah Item Menu</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Sidebar - Takes 4 columns out of 12 -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Menu Items List -->
          <div
            class="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl"
          >
            <h3
              class="text-xl font-semibold text-white mb-4 flex items-center gap-3"
            >
              <div
                class="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
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
              </div>
              Item Menu ({{ items.length }})
            </h3>

            <div v-if="items.length === 0" class="text-center py-8">
              <div
                class="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-slate-400"
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
              <p class="text-slate-400 text-sm">Belum ada item menu</p>
              <p class="text-slate-500 text-xs mt-1">
                Tambahkan item pertama Anda untuk memulai
              </p>
            </div>

            <div v-else class="space-y-3 max-h-80 overflow-y-auto">
              <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors duration-200"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center"
                  >
                    <span class="text-white text-sm">
                      {{
                        item.category === "FOOD"
                          ? "🍽️"
                          : item.category === "DRINK"
                            ? "🥤"
                            : "🍿"
                      }}
                    </span>
                  </div>
                  <div>
                    <p class="text-white font-medium text-sm">
                      {{ item.name }}
                    </p>
                    <p class="text-slate-400 text-xs">
                      {{
                        item.category === "FOOD"
                          ? "Makanan"
                          : item.category === "DRINK"
                            ? "Minuman"
                            : "Camilan"
                      }}
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-cyan-400 font-semibold text-sm">
                    Rp{{ item.price?.toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Continue Button -->
          <div
            class="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl"
          >
            <button
              @click="goNext"
              :disabled="items.length === 0 || form.name !== ''"
              class="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-700"
            >
              <span
                v-if="items.length === 0"
                class="flex items-center justify-center gap-2"
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
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Tambah minimal 1 item menu
              </span>
              <span v-else class="flex items-center justify-center gap-2">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Selesai Setup{{ form.name }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "role"],
  allowedRoles: ["OWNER", "CASHIER"], // 👈 define allowed roles here
})

import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "@/composables/useAuth"
import { useApi } from "@/composables/useApi"

const notify = useNotifications()
const { notifications } = notify

const { dataAuth } = useAuth()
const merchantId = dataAuth.merchantId
const router = useRouter()

const form = ref({
  name: "",
  price: null,
  category: "",
  subCategoryName: "",
  description: "",
})
const variantGroups = ref([])
const thumbnailFile = ref(null)
const galleryFiles = ref([])
const preview = ref({
  thumbnail: null,
  gallery: [],
})

const items = ref([])
const isSubmitting = ref(false)
const galleryInput = ref(null)

function addVariantGroup() {
  variantGroups.value.push({
    name: "",
    options: [
      {
        name: "",
        extraPrice: 0,
      },
    ],
  })
}

function removeVariantGroup(index) {
  variantGroups.value.splice(index, 1)
}

function addOption(groupIndex) {
  variantGroups.value[groupIndex].options.push({
    name: "",
    extraPrice: 0,
  })
}

function removeOption(groupIndex, optionIndex) {
  variantGroups.value[groupIndex].options.splice(optionIndex, 1)
}
const handleThumbnailChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    thumbnailFile.value = file
    preview.value.thumbnail = URL.createObjectURL(file)
  }
}

const removeThumbnail = () => {
  if (preview.value.thumbnail) {
    URL.revokeObjectURL(preview.value.thumbnail)
  }
  thumbnailFile.value = null
  preview.value.thumbnail = null
}

const handleGalleryChange = (e) => {
  const files = Array.from(e.target.files)
  for (const file of files) {
    galleryFiles.value.push(file)
    preview.value.gallery.push(URL.createObjectURL(file))
  }
  e.target.value = null
}

const removeGalleryImage = (index) => {
  const url = preview.value.gallery[index]
  if (url) {
    URL.revokeObjectURL(url)
  }
  galleryFiles.value.splice(index, 1)
  preview.value.gallery.splice(index, 1)
}

const fetchItems = async () => {
  try {
    const res = await useApi(`api/pos/menus/merchant/${merchantId}`)
    items.value = res || []
  } catch (error) {
    console.log("Gagal memuat item:", error.data?.message)
    items.value = []
  }
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true

    const payload = new FormData()
    Object.entries(form.value).forEach(([key, val]) => {
      if (val !== null && val !== "") {
        payload.append(key, val)
      }
    })
    payload.append("variantGroups", JSON.stringify(variantGroups.value))
    payload.append("merchantId", merchantId)

    if (thumbnailFile.value) {
      payload.append("thumbnail", thumbnailFile.value)
    }

    for (const file of galleryFiles.value) {
      payload.append("gallery", file)
    }

    const res = await useApi("api/pos/menus", {
      method: "POST",
      body: payload,
    })

    notify.success(res.message || "Item berhasil ditambahkan!")

    await fetchItems()

    // Reset form
    form.value = {
      name: "",
      price: null,
      category: "",
      subCategoryName: "",
      description: "",
    }

    // Clean up URLs and reset files
    if (preview.value.thumbnail) {
      URL.revokeObjectURL(preview.value.thumbnail)
    }
    preview.value.gallery.forEach((url) => URL.revokeObjectURL(url))

    thumbnailFile.value = null
    galleryFiles.value = []
    preview.value = { thumbnail: null, gallery: [] }
  } catch (err) {
    notify.error(err.message || "Gagal menambahkan item")
  } finally {
    isSubmitting.value = false
  }
}

const goNext = () => {
  router.push("/pos/get-started")
}

onMounted(fetchItems)
</script>
