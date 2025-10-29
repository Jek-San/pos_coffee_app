<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black/20 backdrop-blur-xl z-50 animate-fade-in"
      @click="handleBackdropClick"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      :aria-describedby="descriptionId"
    >
      <!-- Modal Container -->
      <div
        class="h-full w-full flex items-start justify-center p-4 overflow-y-auto"
      >
        <div
          ref="modalContent"
          class="bg-slate-900 text-white rounded-2xl overflow-hidden w-full max-w-md relative border border-slate-700/50 shadow-2xl transform animate-slide-up my-auto min-h-fit"
          @click.stop
          tabindex="-1"
        >
          <!-- Close Button -->
          <div class="absolute top-4 left-4 z-20">
            <button
              @click="handleClose"
              class="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              aria-label="Close modal"
            >
              <svg
                class="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          </div>

          <!-- Enhanced Image Gallery Section -->
          <div class="relative overflow-hidden rounded-t-2xl">
            <!-- Loading State -->
            <div
              v-if="imageLoading"
              class="w-full h-48 bg-slate-800 animate-pulse flex items-center justify-center absolute inset-0 z-10"
            >
              <div class="text-slate-400">Loading image...</div>
            </div>

            <!-- Main Image Display -->
            <div class="relative w-full h-48 overflow-hidden">
              <img
                :src="currentImage"
                :alt="item.name"
                class="w-full h-48 object-cover transition-all duration-500 cursor-pointer"
                :class="{
                  'opacity-0': imageLoading,
                  'opacity-100': !imageLoading,
                }"
                @load="imageLoading = false"
                @error="handleImageError"
                @click="openFullscreen"
              />

              <!-- Navigation Arrows (only show if multiple images) -->
              <template v-if="galleryImages.length > 1">
                <button
                  @click="previousImage"
                  class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center transition-all z-10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  aria-label="Previous image"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  @click="nextImage"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center transition-all z-10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  aria-label="Next image"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <!-- Image Counter -->
                <div
                  class="absolute bottom-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white"
                >
                  {{ currentImageIndex + 1 }} / {{ galleryImages.length }}
                </div>
              </template>

              <!-- Fullscreen Indicator -->
              <div
                class="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                @click="openFullscreen"
              >
                <svg
                  class="w-3 h-3 inline mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
                View
              </div>
            </div>

            <!-- Thumbnail Navigation (only show if multiple images) -->
            <div
              v-if="galleryImages.length > 1"
              class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            >
              <div
                class="flex gap-1 justify-center overflow-x-auto scrollbar-hide"
              >
                <button
                  v-for="(image, index) in galleryImages"
                  :key="index"
                  @click="setCurrentImage(index)"
                  class="flex-shrink-0 w-12 h-8 rounded-md overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  :class="{
                    'border-cyan-400 ring-1 ring-cyan-400/50':
                      index === currentImageIndex,
                    'border-white/30 hover:border-white/60':
                      index !== currentImageIndex,
                  }"
                  :aria-label="`View image ${index + 1}`"
                >
                  <img
                    :src="image"
                    :alt="`${item.name} view ${index + 1}`"
                    class="w-full h-full object-cover"
                    @error="(e) => handleThumbnailError(e, index)"
                  />
                </button>
              </div>
            </div>

            <!-- Gradient Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none"
            ></div>
          </div>

          <!-- Fullscreen Modal -->
          <div
            v-if="showFullscreen"
            class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
            @click="closeFullscreen"
            @keydown.escape="closeFullscreen"
          >
            <div
              class="relative max-w-screen-lg max-h-screen-lg w-full h-full p-4 flex items-center justify-center"
            >
              <img
                :src="currentImage"
                :alt="item.name"
                class="max-w-full max-h-full object-contain rounded-lg"
                @click.stop
              />

              <!-- Fullscreen Close Button -->
              <button
                @click="closeFullscreen"
                class="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center transition-all text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
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
                  />
                </svg>
              </button>

              <!-- Fullscreen Navigation -->
              <template v-if="galleryImages.length > 1">
                <button
                  @click.stop="previousImage"
                  class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center transition-all text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  @click.stop="nextImage"
                  class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center transition-all text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </template>
            </div>
          </div>

          <!-- Content Section (rest remains the same) -->
          <div class="p-6">
            <div class="mb-6">
              <h2
                :id="titleId"
                class="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              >
                {{ item.name }}
              </h2>
              <p :id="descriptionId" class="text-gray-400 leading-relaxed">
                {{ item.description }}
              </p>

              <div class="flex flex-wrap gap-2 mt-3 mb-4">
                <span
                  v-if="item.category"
                  class="px-2 py-1 bg-slate-800/50 text-xs rounded-full text-gray-300"
                >
                  {{ item.category }}
                </span>
                <span
                  v-if="item.isSpicy"
                  class="px-2 py-1 bg-red-500/20 text-xs rounded-full text-red-300 flex items-center gap-1"
                  >🌶️ Spicy</span
                >
                <span
                  v-if="item.isVegetarian"
                  class="px-2 py-1 bg-green-500/20 text-xs rounded-full text-green-300 flex items-center gap-1"
                  >🌱 Vegetarian</span
                >
                <span
                  v-if="item.isPopular"
                  class="px-2 py-1 bg-yellow-500/20 text-xs rounded-full text-yellow-300 flex items-center gap-1"
                  >⭐ Popular</span
                >
                <span
                  v-if="item.isNew"
                  class="px-2 py-1 bg-purple-500/20 text-xs rounded-full text-purple-300 flex items-center gap-1"
                  >✨ New</span
                >
              </div>

              <div class="mb-6">
                <p class="text-gray-400 text-sm leading-relaxed">
                  {{ item.longDescription || item.description }}
                </p>
              </div>

              <div class="mb-6">
                <label
                  class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
                  :for="noteId"
                >
                  <span class="text-cyan-400">📝</span>
                  Special Instructions
                  <span class="text-xs text-gray-500 ml-auto"
                    >{{ note.length }}/200</span
                  >
                </label>
                <textarea
                  :id="noteId"
                  v-model="note"
                  placeholder="Add any special requests (e.g., less sugar, extra spicy, no ice)"
                  class="w-full p-3 bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 text-white rounded-xl placeholder-gray-500 resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  rows="3"
                  maxlength="200"
                />
              </div>

              <!-- Fixed Variants Section -->
              <div v-if="Object.keys(groupedVariants).length > 0" class="mb-6">
                <div
                  v-for="(group, groupId) in groupedVariants"
                  :key="groupId"
                  class="mb-4"
                >
                  <p class="font-semibold text-gray-300 mb-2">
                    {{ group.name }}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <label
                      v-for="option in group.variants"
                      :key="option.id"
                      class="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-colors"
                      :class="{
                        'border-cyan-500 bg-cyan-500/10':
                          selectedVariants[groupId] === option.id,
                        'bg-slate-800/30':
                          selectedVariants[groupId] !== option.id,
                      }"
                    >
                      <input
                        type="radio"
                        :name="groupId"
                        :value="option.id"
                        v-model="selectedVariants[groupId]"
                        class="text-cyan-500 focus:ring-cyan-500/50"
                      />
                      <span class="text-sm">{{ option.name }}</span>
                      <span
                        v-if="option.extraPrice > 0"
                        class="text-xs text-cyan-400"
                      >
                        (+Rp{{ formatPrice(option.extraPrice) }})
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-300 mb-3"
                  >Quantity</label
                >
                <div class="flex items-center justify-center gap-3">
                  <button
                    @click="decreaseQty"
                    :disabled="qty <= 1"
                    class="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    :class="{ 'hover:bg-red-600': qty > 1 }"
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>

                  <div
                    class="flex items-center gap-3 bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-700/50 min-w-[140px]"
                  >
                    <span class="text-xl font-bold text-cyan-400">{{
                      qty
                    }}</span>
                    <div class="text-sm text-gray-400">
                      <div class="text-xs">{{ qty }}x {{ item.name }}</div>
                      <div class="font-semibold text-cyan-400 text-sm">
                        Rp{{ formatPrice(totalPrice) }}
                      </div>
                    </div>
                  </div>

                  <button
                    @click="increaseQty"
                    class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center text-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
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
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                @click="confirm"
                :disabled="isSubmitting"
                class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                <div
                  v-if="isSubmitting"
                  class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                ></div>
                <span v-else class="text-lg">🛒</span>
                <span>{{ isSubmitting ? "Adding..." : "Add to Cart" }}</span>
                <span class="bg-white/20 rounded-full px-2 py-1 text-xs"
                  >Rp{{ formatPrice(totalPrice) }}</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue"

const props = defineProps({
  item: Object,
  defaultQty: { type: Number, default: 1 },
  defaultNote: { type: String, default: "" },
})
const emit = defineEmits(["confirm", "close"])

const qty = ref(props.defaultQty)
const note = ref(props.defaultNote)
const isVisible = ref(false)
const imageLoading = ref(true)
const isSubmitting = ref(false)
const modalContent = ref(null)

// Gallery related state
const currentImageIndex = ref(0)
const showFullscreen = ref(false)

const uid = Math.random().toString(36).substring(2, 9)
const titleId = `modal-title-${uid}`
const descriptionId = `modal-desc-${uid}`
const noteId = `modal-note-${uid}`

const fallbackImage = "/placeholder.png"
const selectedVariants = ref({})

// Gallery images computed property
const galleryImages = computed(() => {
  // If item has gallery array, use it
  if (
    props.item.gallery &&
    Array.isArray(props.item.gallery) &&
    props.item.gallery.length > 0
  ) {
    return props.item.gallery
  }
  // If item has images array, use it
  if (
    props.item.images &&
    Array.isArray(props.item.images) &&
    props.item.images.length > 0
  ) {
    return props.item.images
  }
  // Fallback to single image
  if (props.item.image) {
    return [props.item.image]
  }
  // Ultimate fallback
  return [fallbackImage]
})

// Current image computed property
const currentImage = computed(() => {
  return galleryImages.value[currentImageIndex.value] || fallbackImage
})

// Gallery navigation methods
const nextImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value + 1) % galleryImages.value.length
  imageLoading.value = true
}

const previousImage = () => {
  currentImageIndex.value =
    currentImageIndex.value === 0
      ? galleryImages.value.length - 1
      : currentImageIndex.value - 1
  imageLoading.value = true
}

const setCurrentImage = (index) => {
  currentImageIndex.value = index
  imageLoading.value = true
}

// Fullscreen methods
const openFullscreen = () => {
  showFullscreen.value = true
  document.body.style.overflow = "hidden"
}

const closeFullscreen = () => {
  showFullscreen.value = false
  document.body.style.overflow = "hidden" // Keep modal overflow hidden
}

// Keyboard navigation
const handleKeydown = (e) => {
  if (showFullscreen.value) {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault()
        previousImage()
        break
      case "ArrowRight":
        e.preventDefault()
        nextImage()
        break
      case "Escape":
        closeFullscreen()
        break
    }
  } else if (e.key === "Escape") {
    handleClose()
  }
}

const formatPrice = (price) => new Intl.NumberFormat("id-ID").format(price)
const increaseQty = () => qty.value++
const decreaseQty = () => qty.value > 1 && qty.value--

// Test variants - you can replace this with your actual data
const testVariants = [
  {
    id: "391f03c9-540e-461d-8d10-61f3d1e36b35",
    name: "Dingin",
    extraPrice: 3000,
    menuItemId: "some-id",
    variantTypeId: "type-1",
    variantType: {
      id: "type-1",
      name: "Suhu",
    },
  },
  {
    id: "dcc0cced-5429-4a6b-a05e-46f0c45f8ad7",
    name: "Panas",
    extraPrice: 0,
    menuItemId: "some-id2",
    variantTypeId: "type-1",
    variantType: {
      id: "type-1",
      name: "Suhu",
    },
  },
]

// Fixed groupedVariants computed property
const groupedVariants = computed(() => {
  const groups = {}

  // Use props.item.menuVariants if available, otherwise use testVariants
  const variants = props.item.menuVariants || testVariants

  if (!Array.isArray(variants)) {
    return groups
  }

  variants.forEach((variant) => {
    const typeId = variant.variantTypeId
    const typeName = variant.variantType?.name || "Unknown"

    if (!groups[typeId]) {
      groups[typeId] = {
        name: typeName,
        variants: [],
      }
    }

    groups[typeId].variants.push(variant)
  })

  return groups
})

// Initialize default selections for variants
const initializeDefaultSelections = () => {
  Object.keys(groupedVariants.value).forEach((groupId) => {
    const group = groupedVariants.value[groupId]
    if (group.variants.length > 0) {
      const defaultVariant =
        group.variants.find((v) => v.extraPrice === 0) || group.variants[0]
      selectedVariants.value[groupId] = defaultVariant.id
    }
  })
}

// Calculate total price including variant extra costs
const totalPrice = computed(() => {
  let basePrice = props.item.price * qty.value
  let extraCosts = 0

  Object.keys(selectedVariants.value).forEach((groupId) => {
    const selectedVariantId = selectedVariants.value[groupId]
    const group = groupedVariants.value[groupId]
    if (group) {
      const selectedVariant = group.variants.find(
        (v) => v.id === selectedVariantId
      )
      if (selectedVariant) {
        extraCosts += selectedVariant.extraPrice * qty.value
      }
    }
  })

  return basePrice + extraCosts
})

const handleImageError = () => {
  imageLoading.value = false
  // Set current image to fallback
  galleryImages.value[currentImageIndex.value] = fallbackImage
}

const handleThumbnailError = (event, index) => {
  event.target.src = fallbackImage
}

const confirm = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  try {
    await new Promise((r) => setTimeout(r, 500))

    const selectedVariantDetails = Object.keys(selectedVariants.value).map(
      (groupId) => {
        const selectedVariantId = selectedVariants.value[groupId]
        const group = groupedVariants.value[groupId]
        const selectedVariant = group.variants.find(
          (v) => v.id === selectedVariantId
        )
        return {
          groupId,
          groupName: group.name,
          variantId: selectedVariantId,
          variantName: selectedVariant?.name,
          extraPrice: selectedVariant?.extraPrice || 0,
        }
      }
    )

    emit("confirm", {
      ...props.item,
      qty: qty.value,
      note: note.value,
      selectedVariants: selectedVariantDetails,
      totalPrice: totalPrice.value,
      timestamp: new Date().toISOString(),
    })
    handleClose()
  } catch (e) {
    console.error(e)
  } finally {
    isSubmitting.value = false
  }
}

const handleClose = () => {
  isVisible.value = false
  showFullscreen.value = false
  setTimeout(() => emit("close"), 300)
}

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) handleClose()
}

const focusModal = async () => {
  await nextTick()
  modalContent.value?.focus()
}

onMounted(() => {
  isVisible.value = true
  imageLoading.value = true
  focusModal()
  document.body.style.overflow = "hidden"
  document.addEventListener("keydown", handleKeydown)

  nextTick(() => {
    initializeDefaultSelections()
  })
})

onUnmounted(() => {
  document.body.style.overflow = ""
  document.removeEventListener("keydown", handleKeydown)
})

watch(qty, (val) => {
  if (val < 1) qty.value = 1
})

watch(
  groupedVariants,
  () => {
    initializeDefaultSelections()
  },
  { immediate: true }
)

defineExpose({ close: handleClose, focusModal })
</script>

<style>
html,
body {
  touch-action: manipulation;
  overscroll-behavior: contain;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Enhanced scrollbar styling for the main container */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.3);
  border-radius: 3px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    rgba(34, 211, 238, 0.4),
    rgba(59, 130, 246, 0.4)
  );
  border-radius: 3px;
  border: 1px solid rgba(34, 211, 238, 0.2);
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    rgba(34, 211, 238, 0.6),
    rgba(59, 130, 246, 0.6)
  );
}

/* Ensure proper touch scrolling on mobile */
@media (max-width: 768px) {
  .overflow-y-auto {
    -webkit-overflow-scrolling: touch;
  }
}
</style>
