<!-- pages/qr/[merchantSlug]/[tableId].vue -->
<!-- pages/qr/[merchantSlug]/[tableId].vue -->
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

      <!-- Floating Cart Button with Pulse Animation -->
      <div v-if="cartItemCount > 0" class="fixed bottom-4 right-4 z-50">
        <button
          @click="showCart = true"
          class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl rounded-full px-4 py-3 flex items-center gap-2 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 animate-pulse"
        >
          <span class="text-xl">🛒</span>
          <div class="flex flex-col items-start">
            <span class="font-bold text-sm">{{ cartItemCount }}</span>
            <span class="text-xs opacity-90"
              >Rp{{ cartTotal.toLocaleString() }}</span
            >
          </div>
        </button>
      </div>

      <!-- Compact Header -->
      <div class="text-center mb-6 relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 blur-3xl -z-10"
        ></div>
        <h1
          class="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 animate-fade-in"
        >
          {{ merchantName }}
        </h1>
        <div
          class="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-cyan-500/20"
        >
          <span class="text-lg">🏪</span>
          <ClientOnly>
            <p class="text-sm">
              <span class="font-bold text-cyan-400">{{ tableName }}</span>
            </p>
          </ClientOnly>
        </div>
      </div>

      <!-- View Toggle Buttons -->
      <div class="flex justify-center gap-2 mb-4">
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
            class="px-6 py-3 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2"
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
            class="px-6 py-3 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2"
          >
            <span class="text-lg">⚏</span>Grid
          </button>
        </div>
      </div>

      <!-- Enhanced Category Filter (Hidden when searching) -->
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

      <!-- Enhanced Subcategory Filter (Hidden when searching) -->
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

          <!-- Grid View (Instagram-like) -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4"
          >
            <div
              v-for="item in items"
              :key="item.id"
              @click="openItemModal(item)"
              class="group bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-slate-700/50 hover:border-cyan-500/50 relative"
            >
              <!-- Square Image Container -->
              <div class="aspect-square relative overflow-hidden">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                ></div>
                <div
                  class="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1"
                >
                  <span class="text-cyan-400 font-bold text-xs"
                    >Rp{{ item.price.toLocaleString() }}</span
                  >
                </div>
              </div>

              <!-- Compact Content -->
              <div class="p-3">
                <h3
                  class="text-sm font-semibold mb-1 group-hover:text-cyan-400 transition-colors line-clamp-2"
                  v-html="highlightSearchTerm(item.name)"
                ></h3>
                <p
                  class="text-xs text-gray-400 line-clamp-1 mb-2"
                  v-html="highlightSearchTerm(item.description)"
                ></p>
                <div class="flex items-center justify-between">
                  <p class="text-cyan-400 font-bold text-sm">
                    Rp{{ item.price.toLocaleString() }}
                  </p>
                  <div
                    class="bg-cyan-500/20 rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors"
                  >
                    <span class="text-cyan-400 text-sm">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- List View (Detailed) -->
          <div v-else class="space-y-3">
            <div
              v-for="item in items"
              :key="item.id"
              @click="openItemModal(item)"
              class="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] border border-slate-700/50 hover:border-cyan-500/50 relative overflow-hidden"
            >
              <!-- Hover Glow Effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>

              <div class="flex gap-4 relative z-10">
                <!-- Image -->
                <div
                  class="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg"
                >
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
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
                  <div class="flex items-center justify-between">
                    <p class="text-cyan-400 font-bold text-lg">
                      Rp{{ item.price.toLocaleString() }}
                    </p>
                    <div
                      class="bg-cyan-500/20 rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors"
                    >
                      <span class="text-cyan-400 text-lg">+</span>
                    </div>
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
    </div>
    <!-- MISSING CLOSING TAG WAS HERE -->

    <!-- Enhanced Modals -->
    <ItemModal
      v-if="selectedItem"
      :item="selectedItem"
      :defaultQty="selectedItem.prefill?.qty"
      :defaultNote="selectedItem.prefill?.note"
      @close="selectedItem = null"
      @confirm="handleAddToCart"
    />

    <!-- Cart Modal - Fixed and Enabled -->
    <CartModal
      v-if="showCart"
      :cart="memoryCart"
      :merchantSlug="merchantSlug"
      :tableId="tableId"
      :tableName="tableName"
      @close="showCart = false"
      @editItem="handleEditItem"
      @updateItem="handleUpdateCartItem"
      @removeItem="handleRemoveFromCart"
      @confirmPayment="submitOrder"
      @clearCart="clearCart"
    />
  </section>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import ItemModal from "~/components/qr/ItemModal.vue"
import CartModal from "~/components/qr/CartModal.vue"
import { addToRecentOrders } from "@/utils/orderStorage.js"

const route = useRoute()
const router = useRouter()
const notify = useNotifications()
const { notifications } = notify

const merchantSlug = route.params.merchantSlug
const tableId = route.params.tableId

// Component state
const merchantName = ref(null)
const tableName = ref(null)
const menu = ref([])
const categories = ref(["All"])
const selectedCategory = ref("All")
const selectedSubcategory = ref("All") // New subcategory state
const searchQuery = ref("") // New search state
const viewMode = ref("grid")
const selectedItem = ref(null)
const showCart = ref(false)
const loading = ref(true)
const error = ref(null)

// Cart state
const memoryCart = ref([])

const cartItemCount = computed(() => {
  return memoryCart.value.reduce((total, item) => total + item.qty, 0)
})

const cartTotal = computed(() => {
  return memoryCart.value.reduce((total, item) => {
    const variantPrice =
      item.selectedVariants?.reduce(
        (sum, variant) => sum + variant.extraPrice,
        0
      ) || 0
    return total + (item.price + variantPrice) * item.qty
  }, 0)
})

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

// Watch for search changes to reset filters
watch(searchQuery, (newQuery) => {
  if (newQuery.length >= 2) {
    // When starting to search, we could optionally reset filters
    // selectedCategory.value = "All"
    // selectedSubcategory.value = "All"
  }
})

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

// Cart methods
const handleAddToCart = (itemData) => {
  console.log("Adding to cart:", itemData)

  // Check if same item+variants already in cart
  const existingIndex = memoryCart.value.findIndex((cartItem) => {
    if (cartItem.id !== itemData.id) return false

    // Compare variant arrays properly
    const cartVariants = cartItem.selectedVariants || []
    const newVariants = itemData.selectedVariants || []

    if (cartVariants.length !== newVariants.length) return false

    return cartVariants.every((cv) =>
      newVariants.some((nv) => nv.variantId === cv.variantId)
    )
  })

  if (existingIndex >= 0) {
    // Update quantity of existing item
    memoryCart.value[existingIndex].qty += itemData.qty
  } else {
    // Add new item to cart
    memoryCart.value.push({
      id: itemData.id,
      name: itemData.name,
      price: itemData.price,
      qty: itemData.qty,
      selectedVariants: itemData.selectedVariants || [],
      note: itemData.note || "",
      image: itemData.image,
    })
  }

  console.log("Updated cart:", memoryCart.value)
  console.log("Cart Total:", cartTotal.value)
  selectedItem.value = null // Close modal
}

const handleEditItem = (cartItem) => {
  // Find the original menu item
  const originalItem = menu.value.find((item) => item.id === cartItem.id)
  if (!originalItem) return

  // Set prefill data for editing
  selectedItem.value = {
    ...originalItem,
    prefill: {
      qty: cartItem.qty,
      note: cartItem.note,
      selectedVariants: cartItem.selectedVariants || [],
    },
  }

  // Remove from cart temporarily (will be re-added when confirmed)
  const index = memoryCart.value.findIndex((item, idx) => {
    if (item.id !== cartItem.id) return false

    const itemVariants = item.selectedVariants || []
    const cartVariants = cartItem.selectedVariants || []

    if (itemVariants.length !== cartVariants.length) return false

    return itemVariants.every((iv) =>
      cartVariants.some((cv) => cv.variantId === iv.variantId)
    )
  })

  if (index >= 0) {
    memoryCart.value.splice(index, 1)
  }

  showCart.value = false
}

const handleUpdateCartItem = (index, updatedItem) => {
  if (index >= 0 && index < memoryCart.value.length) {
    memoryCart.value[index] = { ...memoryCart.value[index], ...updatedItem }
  }
}

const handleRemoveFromCart = (index) => {
  if (index >= 0 && index < memoryCart.value.length) {
    memoryCart.value.splice(index, 1)
  }
}

const clearCart = () => {
  memoryCart.value = []
  showCart.value = false
}

const submitOrder = async (orderData) => {
  try {
    for (const item of memoryCart.value) {
      console.log(item.image)
    }
    // Prepare order payload
    const orderPayload = {
      merchantSlug,
      tableId,
      items: memoryCart.value.map((item) => ({
        menuId: item.id,
        qty: item.qty,
        selectedVariants: item.selectedVariants || [],
        note: item.note || "",
      })),
      customerName: orderData.customerName || "",
      customerPhone: orderData.customerPhone || "",
      specialInstructions: orderData.specialInstructions || "",
      total: cartTotal.value,
    }
    console.log("Submitting order:", orderData)
    console.log("🚀 SUBMITTING ORDER:")
    console.log("Order Form:", orderData)
    console.log("Cart Items:", memoryCart.value)
    console.log("Final Payload:", orderPayload)

    // Submit order to API
    const response = await useApi("api/pos/orders", {
      method: "POST",
      body: orderPayload,
    })

    addToRecentOrders(response.orderId)

    // Clear cart and show success
    memoryCart.value = []
    showCart.value = false
    // Optionally redirect to order confirmation page
    notify.success(response.message || "Order submitted successfully!")
    setInterval(() => {
      router.push(`/cust/orders`)
    }, 3000)
  } catch (err) {
    console.error("Error submitting order:", err)
    notify.error("Failed to submit order. Please try again.")
  }
}

// Methods
const openItemModal = (item) => {
  selectedItem.value = { ...item }
}

const loadMenu = async () => {
  try {
    loading.value = true
    error.value = null

    const { merchant, menus, table } = await useApi(
      `api/pos/init-menu/${merchantSlug}/${route.params.tableId}`
    )

    merchantName.value = merchant.name
    tableName.value = table.name
    const data = menus || []
    console.log(data)

    // Process menu data
    const categorySet = new Set()
    menu.value = data.map((item) => {
      const galleryImages = item.images.filter((img) => img.type === "gallery")
      const thumbnail =
        item.images.find((img) => img.type === "thumbnail") || galleryImages[0]

      categorySet.add(item.category)

      return {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        subCategoryName: item.subCategory?.name || null,
        subCategoryId: item.subCategoryId,
        menuVariants: item.menuVariants,
        image: useAssetUrl(thumbnail),
        gallery: galleryImages.map((img) => useAssetUrl(img)),
        available: item.available,
      }
    })

    categories.value = ["All", ...Array.from(categorySet)]
    console.log("Menu.variant data:", menu.value[0].menuVariants)
    console.log("🍽️ Menu loaded:", menu.value)
  } catch (err) {
    console.error("Error loading menu:", err)
    error.value =
      "Failed to load menu. Please check your connection and try again."
  } finally {
    loading.value = false
  }
}

function formatWords(input) {
  if (!input || typeof input !== "string") return ""

  return input
    .split(" ") // split by space
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

const retry = () => {
  loadMenu()
}

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
</style>
