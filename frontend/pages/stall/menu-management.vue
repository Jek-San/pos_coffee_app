<!-- pages/owner/menu/index.vue -->
<template>
  <section
    class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-3 py-4 pb-24"
  >
    <!-- Error State -->
    <div v-if="error" class="text-center py-8">
      <div class="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
        <h2 class="text-xl font-bold text-red-400 mb-2">Error</h2>
        <p class="text-red-300">{{ error }}</p>
        <button
          @click="retry"
          class="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="text-center py-8">
      <div
        class="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
      ></div>
      <p class="text-cyan-400">Loading menu...</p>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Animated Background Pattern -->
      <div class="fixed inset-0 opacity-5 pointer-events-none">
        <div
          class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%222%22 fill=%22white%22/%3E%3C/svg%3E')] bg-repeat opacity-20"
        ></div>
      </div>
      <div
        class="flex flex-col lg:flex-row gap-4 justify-center fixed bottom-4 right-4 z-50"
      >
        <!-- Bulk Actions -->
        <div
          v-if="selectedItems.length > 0"
          class="flex justify-center items-center gap-2"
        >
          <button
            @click="bulkToggleAvailability(true)"
            class="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors flex items-center gap-2"
          >
            <span class="text-lg sm:text-2xl">✅</span>
            Make Available ({{ selectedItems.length }})
          </button>
          <button
            @click="bulkToggleAvailability(false)"
            class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center gap-2"
          >
            <span class="text-lg">❌</span>
            Make Unavailable ({{ selectedItems.length }})
          </button>
          <button
            @click="bulkDelete"
            class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center gap-2"
          >
            <span class="text-lg">🗑️</span>
            Delete ({{ selectedItems.length }})
          </button>
        </div>
        <!-- Floating Action Button -->
        <div class="">
          <button
            @click="showAddModal = true"
            class="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl rounded-full px-6 py-4 flex items-center gap-3 hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 animate-pulse"
          >
            <span class="text-2xl">➕</span>
            <div class="flex flex-col items-start">
              <span class="font-bold text-sm">Add Item</span>
              <span class="text-xs opacity-90">New Menu</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Header with Stats -->
      <div class="text-center mb-6 relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 blur-3xl -z-10"
        ></div>
        <h1
          class="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 animate-fade-in p-2"
        >
          Menu Management
        </h1>
        <div class="flex justify-center gap-4 flex-wrap mt-4">
          <div
            class="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-cyan-500/20"
          >
            <span class="text-lg">🍽️</span>
            <span class="text-sm">
              <span class="font-bold text-cyan-400">{{ totalItems }}</span>
              <span class="text-gray-400 ml-1">Items</span>
            </span>
          </div>
          <div
            class="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-green-500/20"
          >
            <span class="text-lg">✅</span>
            <span class="text-sm">
              <span class="font-bold text-green-400">{{ availableItems }}</span>
              <span class="text-gray-400 ml-1">Available</span>
            </span>
          </div>
          <div
            class="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-red-500/20"
          >
            <span class="text-lg">❌</span>
            <span class="text-sm">
              <span class="font-bold text-red-400">{{ unavailableItems }}</span>
              <span class="text-gray-400 ml-1">Unavailable</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="flex justify-center items-center mb-6 flex-wrap gap-4">
        <!-- View Toggle Buttons -->
        <div class="flex gap-2">
          <div
            class="inline-flex items-center bg-slate-800/60 backdrop-blur-lg rounded-2xl p-2 border border-slate-700/50 shadow-2xl"
          >
            <button
              @click="viewMode = 'list'"
              :class="
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700/50'
              "
              class="px-4 py-2 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2"
            >
              <span class="text-lg">☰</span>List
            </button>
            <button
              @click="viewMode = 'grid'"
              :class="
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700/50'
              "
              class="px-4 py-2 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2"
            >
              <span class="text-lg">⚏</span>Grid
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Category Filter -->
      <div v-if="!isSearching" class="mb-4">
        <div class="flex justify-center gap-2 flex-wrap">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden text-sm"
            :class="{
              'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg':
                selectedCategory === cat,
              'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 border border-slate-600':
                selectedCategory !== cat,
            }"
          >
            <span class="relative z-10">{{ formatWords(cat) }}</span>
            <div
              v-if="selectedCategory === cat"
              class="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 animate-pulse"
            ></div>
          </button>
        </div>
      </div>

      <!-- Enhanced Subcategory Filter -->
      <div
        v-if="!isSearching && availableSubcategories.length > 1"
        class="mb-6"
      >
        <div class="text-center mb-3">
          <span class="text-sm text-gray-400 font-medium"
            >Filter by subcategory:</span
          >
        </div>
        <div class="flex justify-center gap-2 flex-wrap">
          <button
            v-for="subCat in availableSubcategories"
            :key="subCat"
            @click="selectedSubcategory = subCat"
            class="px-3 py-1.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden text-xs"
            :class="{
              'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg':
                selectedSubcategory === subCat,
              'bg-slate-600/40 text-gray-300 hover:bg-slate-500/40 border border-slate-500':
                selectedSubcategory !== subCat,
            }"
          >
            <span class="relative z-10">{{ formatWords(subCat) }}</span>
            <div
              v-if="selectedSubcategory === subCat"
              class="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse"
            ></div>
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="max-w-md mx-auto mb-6">
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <span class="text-gray-400 text-lg">🔍</span>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search menu items..."
            class="w-full pl-10 pr-10 py-3 bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
          />
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <span class="text-lg">✕</span>
          </button>
        </div>

        <!-- Search Results Count -->
        <div v-if="searchQuery" class="text-center mt-2">
          <span class="text-sm text-gray-400">
            {{ searchResultsCount }} item{{
              searchResultsCount !== 1 ? "s" : ""
            }}
            found
            <span v-if="searchQuery.length >= 2" class="text-cyan-400"
              >for "{{ searchQuery }}"</span
            >
          </span>
        </div>
      </div>

      <!-- Bulk Selection Header -->
      <div v-if="selectedItems.length > 0" class="mb-4 text-center">
        <div
          class="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-500/50"
        >
          <span class="text-blue-400 font-bold">{{
            selectedItems.length
          }}</span>
          <span class="text-blue-300">item(s) selected</span>
          <button
            @click="clearSelection"
            class="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Enhanced Grouped Menu -->
      <div v-if="Object.keys(groupedMenu).length > 0">
        <div
          v-for="(items, subCatKey) in groupedMenu"
          :key="subCatKey"
          class="mb-8 animate-fade-in-up"
        >
          <div class="flex items-center gap-3 mb-4">
            <h2
              class="text-xl text-white md:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
            >
              {{ subCatKey || "Uncategorized" }}
            </h2>
            <div
              class="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"
            ></div>
          </div>

          <!-- Grid View -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4"
          >
            <div
              v-for="item in items"
              :key="item.id"
              class="group bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-[1.02] border border-slate-700/50 hover:border-cyan-500/50 relative"
              :class="{
                'ring-2 ring-blue-500/50': selectedItems.includes(item.id),
              }"
            >
              <!-- Selection Checkbox -->
              <div class="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  :checked="selectedItems.includes(item.id)"
                  @change="toggleItemSelection(item.id)"
                  class="w-5 h-5 rounded border-2 border-slate-600 bg-slate-800/50 text-blue-500 focus:ring-blue-500/50"
                />
              </div>

              <!-- Status Badge -->
              <div class="absolute top-2 right-2 z-10">
                <div
                  :class="
                    item.available
                      ? 'bg-green-500/80 text-green-100'
                      : 'bg-red-500/80 text-red-100'
                  "
                  class="backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold"
                >
                  {{ item.available ? "Available" : "Unavailable" }}
                </div>
              </div>

              <!-- Square Image Container -->
              <div class="aspect-square relative overflow-hidden">
                <img
                  :src="item.image?.url ? item.image.url : '/assets/fvg.ico'"
                  :alt="item.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  :class="{ 'opacity-50': !item.available }"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                ></div>
              </div>

              <!-- Content -->
              <div class="p-3">
                <h3
                  class="text-sm font-semibold mb-1 group-hover:text-cyan-400 transition-colors line-clamp-2"
                  v-html="highlightSearchTerm(item.name)"
                ></h3>
                <p
                  class="text-xs text-gray-400 line-clamp-1 mb-2"
                  v-html="highlightSearchTerm(item.description)"
                ></p>
                <div class="flex items-center justify-between mb-2">
                  <p class="text-cyan-400 font-bold text-sm">
                    Rp{{ item.price.toLocaleString() }}
                  </p>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-1">
                  <button
                    @click="editItem(item)"
                    class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-md py-2 px-2 transition-colors text-xs"
                  >
                    Edit
                  </button>
                  <button
                    @click="toggleAvailability(item)"
                    :class="
                      item.available
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                        : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                    "
                    class="flex-1 rounded-md py-2 px-2 transition-colors text-xs"
                  >
                    {{ item.available ? "Disable" : "Enable" }}
                  </button>
                  <button
                    @click="deleteItem(item)"
                    class="bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md py-2 px-2 transition-colors text-xs"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div v-else class="space-y-3">
            <div
              v-for="item in items"
              :key="item.id"
              class="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-[1.01] border border-slate-700/50 hover:border-cyan-500/50 relative overflow-hidden"
              :class="{
                'ring-2 ring-blue-500/50': selectedItems.includes(item.id),
              }"
            >
              <!-- Hover Glow Effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>

              <div class="flex gap-4 relative z-10">
                <!-- Selection Checkbox -->
                <div class="flex items-start pt-2">
                  <input
                    type="checkbox"
                    :checked="selectedItems.includes(item.id)"
                    @change="toggleItemSelection(item.id)"
                    class="w-5 h-5 rounded border-2 border-slate-600 bg-slate-800/50 text-blue-500 focus:ring-blue-500/50"
                  />
                </div>

                <!-- Image -->
                <div
                  class="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg relative"
                >
                  <img
                    :src="item.image?.url ? item.image.url : ''"
                    :alt="item.name"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    :class="{ 'opacity-50': !item.available }"
                  />
                  <!-- Status Overlay -->
                  <div
                    :class="
                      item.available
                        ? 'bg-green-500/80 text-green-100'
                        : 'bg-red-500/80 text-red-100'
                    "
                    class="absolute top-1 right-1 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold"
                  >
                    {{ item.available ? "✓" : "✕" }}
                  </div>
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <h3
                    class="text-lg font-bold mb-1 group-hover:text-cyan-400 transition-colors"
                    v-html="highlightSearchTerm(item.name)"
                  ></h3>
                  <p
                    class="text-sm text-gray-400 mb-2 line-clamp-2"
                    v-html="highlightSearchTerm(item.description)"
                  ></p>
                  <div class="flex items-center justify-between mb-3">
                    <p class="text-cyan-400 font-bold text-lg">
                      Rp{{ item.price.toLocaleString() }}
                    </p>
                    <div class="flex items-center gap-2">
                      <span class="text-xs text-gray-500">{{
                        item.category
                      }}</span>
                      <span
                        v-if="item.subCategoryName"
                        class="text-xs text-gray-500"
                      >
                        • {{ item.subCategoryName }}
                      </span>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex gap-2">
                    <button
                      @click="editItem(item)"
                      class="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg px-3 py-2 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>✏️</span>Edit
                    </button>
                    <button
                      @click="toggleAvailability(item)"
                      :class="
                        item.available
                          ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                          : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                      "
                      class="rounded-lg px-3 py-2 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>{{ item.available ? "❌" : "✅" }}</span>
                      {{ item.available ? "Disable" : "Enable" }}
                    </button>
                    <button
                      @click="deleteItem(item)"
                      class="bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg px-3 py-2 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>🗑️</span>Delete
                    </button>
                  </div>
                </div>
              </div>

              <!-- Shine Effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results Message -->
      <div
        v-else-if="isSearching && Object.keys(groupedMenu).length === 0"
        class="text-center py-12"
      >
        <div class="mb-4">
          <span class="text-6xl opacity-50">🔍</span>
        </div>
        <h3 class="text-xl font-bold text-gray-300 mb-2">No items found</h3>
        <p class="text-gray-400 mb-4">
          No menu items match your search for "<span
            class="text-cyan-400 font-semibold"
            >{{ searchQuery }}</span
          >"
        </p>
        <button
          @click="clearSearch"
          class="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors"
        >
          Clear Search
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="menu.length === 0" class="text-center py-12">
        <div class="mb-4">
          <span class="text-6xl opacity-50">🍽️</span>
        </div>
        <h3 class="text-xl font-bold text-gray-300 mb-2">No menu items yet</h3>
        <p class="text-gray-400 mb-4">
          Start building your menu by adding your first item.
        </p>
        <button
          @click="showAddModal = true"
          class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-lg transition-colors font-semibold"
        >
          Add First Menu Item
        </button>
      </div>
    </div>

    <!-- Add/Edit Item Modal Placeholder -->
    <!-- You would implement ItemFormModal component here -->
    <!-- <div
      v-if="showAddModal || editingItem"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div class="bg-slate-800 rounded-xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-white mb-4">
          {{ editingItem ? "Edit Menu Item" : "Add New Menu Item" }}
        </h3>
        <p class="text-gray-400 mb-4">Item form would go here...</p>
        <div class="flex gap-2 justify-end">
          <button
            @click="closeModals"
            class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            @click="closeModals"
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            {{ editingItem ? "Update" : "Add" }}
          </button>
        </div>
      </div>
    </div> -->
    <!-- Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <div
        class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-y-auto"
      >
        <MenuManager
          :merchant-id="activeMerchant.merchantId"
          :show-continue-button="true"
          @close="closeModal"
          @continue="handleContinue"
          @item-added="handleItemAdded"
          @success="showSuccess"
          @error="showError"
        />
      </div>
    </div>
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <div
        class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-y-auto"
      >
        <MenuManager
          :merchant-id="activeMerchant.merchantId"
          :show-continue-button="true"
          :item="editingItem"
          :is-editing="true"
          @close="closeEditModal"
          @continue="handleContinue"
          @item-added="handleItemAdded"
          @success="showSuccess"
          @error="showError"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import MenuManager from "~/components/owner/menu/MenuManager.vue"
import { useConfirm } from "~/composables/useConfirm"
definePageMeta({
  layout: "stall",
  middleware: ["auth", "role"],
  allowedRoles: ["STALL_OWNER"],
})
// Component state
const menu = ref([])
const categories = ref(["All"])
const selectedCategory = ref("All")
const selectedSubcategory = ref("All")
const searchQuery = ref("")
const viewMode = ref("grid")
const loading = ref(true)
const error = ref(null)
const selectedItems = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingItem = ref(null)

// Data Compossable
const { activeMerchant } = useAuth()
const notify = useNotifications()

// Stall Information
const stallInfo = ref({
  id: activeMerchant.value.stallId,
  merchantId: activeMerchant.value.merchantId,
  name: activeMerchant.value.stallName,
  location: activeMerchant.value.merchantName,
  isOpen: activeMerchant.value.isOpen,
})

const handleContinue = () => notify.success("Continue!")
const handleItemAdded = (item) => notify.success("New item:", item.name)
const showSuccess = (msg) => notify.success("Success:", msg)
const showError = (msg) => notify.error("Error:", msg)
// Computed properties for stats
const totalItems = computed(() => menu.value.length)
const availableItems = computed(
  () => menu.value.filter((item) => item.available).length
)
const unavailableItems = computed(
  () => menu.value.filter((item) => !item.available).length
)

// Enhanced computed properties for filtering
const isSearching = computed(() => searchQuery.value.length >= 2)

const searchResults = computed(() => {
  if (!isSearching.value) return menu.value

  const query = searchQuery.value.toLowerCase().trim()
  return menu.value.filter(
    (item) =>
      item.name?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query) ||
      (item.subCategoryName &&
        item.subCategoryName?.toLowerCase().includes(query))
  )
})

const searchResultsCount = computed(() => {
  return isSearching.value ? searchResults.value.length : 0
})

const categoryFilteredMenu = computed(() => {
  const baseMenu = isSearching.value ? searchResults.value : menu.value

  return selectedCategory.value === "All"
    ? baseMenu
    : baseMenu.filter((item) => item.category === selectedCategory.value)
})

const filteredMenu = computed(() => {
  let filtered = categoryFilteredMenu.value

  if (!isSearching.value && selectedSubcategory.value !== "All") {
    filtered = filtered.filter(
      (item) =>
        (item.subCategoryName || "Uncategorized") === selectedSubcategory.value
    )
  }

  return filtered
})

const availableSubcategories = computed(() => {
  const subCatSet = new Set()
  categoryFilteredMenu.value.forEach((item) => {
    subCatSet.add(item.subCategoryName || "Uncategorized")
  })

  const subCats = ["All", ...Array.from(subCatSet)]

  // Reset subcategory if current selection is not available
  if (!subCats.includes(selectedSubcategory.value)) {
    selectedSubcategory.value = "All"
  }

  return subCats
})

const groupedMenu = computed(() => {
  const groups = {}
  filteredMenu.value.forEach((item) => {
    const groupKey = item.subCategoryName || "Uncategorized"
    if (!groups[groupKey]) groups[groupKey] = []
    groups[groupKey].push(item)
  })
  return groups
})

// Watch for category changes to reset subcategory
watch(selectedCategory, () => {
  selectedSubcategory.value = "All"
})

// Watch for search changes
watch(searchQuery, (newQuery) => {
  if (newQuery.length >= 2) {
    // When starting to search, optionally reset filters
  }
})

// Methods
const loadMenu = async () => {
  try {
    loading.value = true
    error.value = null

    // Simulate API call - replace with your actual API
    const { merchant, menus } = await useApi(
      `api/pos/init-menu/${"jekk-coffe"}`
    )
    const data = menus || []

    // Extract categories
    const categorySet = new Set()
    menu.value = data.map((item) => {
      const galleryImages = item.images.filter((img) => img.type === "gallery")
      const thumbnail =
        item.images.find((img) => img.type === "thumbnail") || galleryImages[0]

      categorySet.add(item.category)
      console.log("thumbnail", thumbnail)
      console.log("imagge useAssetUrl", useAssetUrl(thumbnail))
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        subCategoryName: item.subCategory?.name || null,
        subCategoryId: item.subCategoryId,
        menuVariants: item.menuVariants,
        image: thumbnail,
        gallery: galleryImages,
        available: item.available,
      }
    })
    categories.value = ["All", ...Array.from(categorySet)]
  } catch (err) {
    console.error("Error loading menu:", err)
    error.value =
      "Failed to load menu. Please check your connection and try again."
  } finally {
    loading.value = false
  }
}

const retry = () => {
  loadMenu()
}

// Search methods
const clearSearch = () => {
  searchQuery.value = ""
}

const highlightSearchTerm = (text) => {
  if (!isSearching.value || !text) return text

  const query = searchQuery.value.trim()
  if (!query) return text

  const regex = new RegExp(`(${query})`, "gi")
  return text.replace(
    regex,
    '<span class="bg-yellow-400/30 text-yellow-300 px-1 rounded">$1</span>'
  )
}

// Selection methods
const toggleItemSelection = (itemId) => {
  const index = selectedItems.value.indexOf(itemId)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(itemId)
  }
}

const clearSelection = () => {
  selectedItems.value = []
}

// Item management methods
const editItem = (item) => {
  editingItem.value = { ...item }
  showEditModal.value = true
}

const deleteItem = async (item) => {
  const confirm = useConfirm()
  const ok = await confirm({
    title: `Delete ${item.name}?`,
    message: "This action cannot be undone.",
  })
  if (ok) {
    // Call API to delete
    try {
      // Simulate API call
      console.log(`Deleting item ${item.id}`)
      const response = await useApi(`api/pos/menus/delete/${item.id}`, {
        method: "PATCH",
      })
      notify.success(`Item ${item.name} deleted successfully!`)

      const index = menu.value.findIndex((i) => i.id === item.id)
      if (index > -1) {
        menu.value.splice(index, 1)
      }

      // Remove from selection if selected
      const selIndex = selectedItems.value.indexOf(item.id)
      if (selIndex > -1) {
        selectedItems.value.splice(selIndex, 1)
      }
    } catch (err) {
      notify.error("Failed to delete item. Please try again.")
    }

    // Remove from local array
  } else {
    notify.info("❌ User cancelled")
  }
  // if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
  //   try {
  //     // Simulate API call
  //
  //   } catch (err) {
  //     console.error("Error deleting item:", err)
  //     alert("Failed to delete item. Please try again.")
  //   }
  // }
}

const toggleAvailability = async (item) => {
  try {
    // Simulate API call
    console.log(
      `Toggling availability for item ${item.id} to ${!item.available}`
    )
    const dataBody = { menuId: item.id, available: !item.available }

    // Update API
    const res = await useApi(`api/pos/menus/availability`, {
      method: "PATCH",
      body: dataBody,
    })
    notify.info(
      `Item ${item.name} availability updated to ${item.available ? "unavailable" : "available"}`
    )
    // Update local data
    const index = menu.value.findIndex((i) => i.id === item.id)
    if (index > -1) {
      menu.value[index].available = !menu.value[index].available
    }
  } catch (err) {
    console.error("Error toggling availability:", err)
    notify.error("Failed to update item availability. Please try again.")
  }
}

// Bulk operations
const bulkToggleAvailability = async (available) => {
  if (selectedItems.value.length === 0) return

  try {
    console.log(
      `Setting availability to ${available} for items:`,
      selectedItems.value
    )

    // Update local data
    selectedItems.value.forEach((itemId) => {
      const index = menu.value.findIndex((i) => i.id === itemId)
      if (index > -1) {
        menu.value[index].available = available
      }
    })

    clearSelection()
  } catch (err) {
    console.error("Error bulk updating availability:", err)
    alert("Failed to update item availability. Please try again.")
  }
}

const bulkDelete = async () => {
  if (selectedItems.value.length === 0) return

  if (
    confirm(
      `Are you sure you want to delete ${selectedItems.value.length} item(s)?`
    )
  ) {
    try {
      console.log("Bulk deleting items:", selectedItems.value)

      // Remove from local array
      menu.value = menu.value.filter(
        (item) => !selectedItems.value.includes(item.id)
      )
      clearSelection()
    } catch (err) {
      console.error("Error bulk deleting items:", err)
      alert("Failed to delete items. Please try again.")
    }
  }
}

// Modal methods
const closeModal = () => {
  showAddModal.value = false
  editingItem.value = null
  loadMenu()
}
const closeEditModal = () => {
  showEditModal.value = false
  editingItem.value = null
  loadMenu()
}

// Utility functions
function formatWords(input) {
  if (!input || typeof input !== "string") return ""

  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

// Lifecycle

// Lifecycle
onMounted(() => {
  loadMenu()
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom checkbox styling */
input[type="checkbox"] {
  appearance: none;
  background-color: rgb(30 41 59 / 0.5);
  border: 2px solid rgb(71 85 105);
  padding: 0;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

input[type="checkbox"]:checked {
  background-color: rgb(59 130 246);
  border-color: rgb(59 130 246);
}

input[type="checkbox"]:checked::before {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}

input[type="checkbox"]:hover {
  border-color: rgb(59 130 246);
}

input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgb(59 130 246 / 0.5);
}
</style>
