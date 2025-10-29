<!-- components/qr/CartModal.vue -->
<template>
  <!-- Cart Modal - Only show when order form is NOT open -->
  <div
    v-if="!showOrderForm"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 h-full w-full flex items-start justify-center p-4 overflow-y-auto animate-fade-in"
    style="-webkit-overflow-scrolling: touch"
    @click="handleBackdropClick"
  >
    <div
      class="bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl w-full max-w-lg relative border border-slate-700/50 shadow-2xl transform animate-slide-up my-auto"
      @click.stop
    >
      <!-- Header with Gradient -->
      <div class="flex items-center justify-between p-6 pb-4">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center"
          >
            <span class="text-xl sm:text-2xl">🛒</span>
          </div>
          <div>
            <h2
              class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              Your Order
            </h2>
            <div class="flex items-center gap-2 text-sm text-gray-400">
              <span>{{ cart.length }} items</span>
              <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>{{ getTotalItems() }} qty</span>
              <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span class="text-green-400">{{ merchantSlug }}</span>
            </div>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors group"
        >
          <span
            class="text-xl sm:text-2xl text-gray-400 group-hover:text-white transition-colors"
            >×</span
          >
        </button>
      </div>

      <!-- Order Progress Bar -->
      <div class="px-6 pb-4">
        <div class="bg-slate-800 rounded-full h-2 mb-2">
          <div
            class="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
            :style="{ width: cart.length > 0 ? '60%' : '0%' }"
          ></div>
        </div>
        <p class="text-xs text-gray-400 text-center">
          {{ cart.length > 0 ? "Ready to order" : "Add items to continue" }}
        </p>
      </div>

      <!-- Empty Cart State -->
      <div v-if="cart.length === 0" class="px-6 py-8 text-center">
        <div class="text-6xl mb-4">🛒</div>
        <h3 class="text-lg font-semibold text-gray-300 mb-2">
          Your cart is empty
        </h3>
        <p class="text-sm text-gray-400 mb-4">
          Add some delicious items to get started!
        </p>
        <div
          class="flex items-center justify-center gap-2 text-xs text-gray-500"
        >
          <span>💡</span>
          <span>Tip: Browse our menu and tap the + button to add items</span>
        </div>
      </div>

      <!-- Items List -->
      <div v-else class="px-6">
        <!-- Cart Header Info -->
        <div
          class="bg-slate-800/50 rounded-lg p-3 mb-4 border border-slate-700/50"
        >
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2 text-gray-300">
              <span>🏪</span>
              <ClientOnly>
                <span>{{ tableName }}</span>
              </ClientOnly>
            </div>
            <div class="flex items-center gap-2 text-gray-400">
              <span>🕒</span>
              <span>{{ getCurrentTime() }}</span>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, index) in cart"
            :key="`${item.id}-${index}`"
            class="group bg-slate-800 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg"
          >
            <!-- Item Header -->
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <!-- Item Image -->
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg overflow-hidden bg-slate-700"
                >
                  <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.name"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center"
                  >
                    <span class="text-cyan-400 font-bold text-sm">{{
                      item.qty
                    }}</span>
                  </div>
                </div>

                <div class="min-w-0 flex-1">
                  <h3
                    class="font-semibold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors truncate"
                  >
                    {{ item.name }}
                  </h3>
                  <div
                    class="flex items-center gap-2 text-xs text-gray-400 mt-1"
                  >
                    <span>Rp{{ item.price.toLocaleString() }} each</span>
                    <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                  </div>
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="font-bold text-sm sm:text-lg text-cyan-400">
                  Rp{{ getItemTotalPrice(item).toLocaleString() }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ item.qty }} × Rp{{
                    (item.price + getVariantPrice(item)).toLocaleString()
                  }}
                </p>
              </div>
            </div>

            <!-- Variants -->
            <div
              v-if="item.selectedVariants && item.selectedVariants.length > 0"
              class="mb-3 ml-14"
            >
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="variant in item.selectedVariants"
                  :key="variant.variantId"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30"
                >
                  <span class="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></span>
                  {{ variant.variantName }}
                  <span
                    v-if="variant.extraPrice > 0"
                    class="ml-1 text-blue-200"
                  >
                    (+Rp{{ variant.extraPrice.toLocaleString() }})
                  </span>
                </span>
              </div>
            </div>

            <!-- Note -->
            <div
              v-if="item.note"
              class="mb-3 ml-14 bg-slate-700/50 rounded-lg p-2 sm:p-3 border-l-4 border-cyan-500/50"
            >
              <p
                class="text-xs sm:text-sm text-gray-300 flex items-start gap-2"
              >
                <span class="text-cyan-400 flex-shrink-0">📝</span>
                <em class="break-words">{{ item.note }}</em>
              </p>
            </div>

            <!-- Item Status & Actions -->
            <div class="flex items-center justify-between ml-14">
              <div class="flex items-center gap-3">
                <!-- Status Badge -->
                <div class="flex items-center gap-1 text-xs">
                  <div
                    class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                  ></div>
                  <span class="text-green-400">In Stock</span>
                </div>

                <!-- Edit Button -->
                <button
                  @click="$emit('editItem', item)"
                  class="flex items-center gap-1 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors group/edit px-2 py-1 hover:bg-cyan-500/10 rounded-md"
                >
                  <span class="group-hover/edit:rotate-12 transition-transform"
                    >✏️</span
                  >
                  Edit
                </button>

                <!-- Remove Button -->
                <button
                  @click="$emit('removeItem', index)"
                  class="flex items-center gap-1 text-xs sm:text-sm text-red-400 hover:text-red-300 transition-colors group/remove px-2 py-1 hover:bg-red-500/10 rounded-md"
                >
                  <span
                    class="group-hover/remove:scale-110 transition-transform"
                    >🗑️</span
                  >
                  Remove
                </button>
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center gap-2">
                <button
                  @click="updateQuantity(index, item.qty - 1)"
                  :disabled="item.qty <= 1"
                  class="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 flex items-center justify-center text-sm transition-colors"
                >
                  −
                </button>
                <span class="w-8 text-center font-semibold">{{
                  item.qty
                }}</span>
                <button
                  @click="updateQuantity(index, item.qty + 1)"
                  class="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-sm transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Total Section -->
      <div
        v-if="cart.length > 0"
        class="p-6 pt-4 border-t border-slate-700/50 bg-slate-900/50 mt-4"
      >
        <!-- Order Summary -->
        <div class="bg-slate-800 rounded-xl p-4 mb-4">
          <h3
            class="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2"
          >
            <span>💰</span>
            Order Summary
          </h3>

          <div class="space-y-2">
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-400"
                >Subtotal ({{ getTotalItems() }} items)</span
              >
              <span class="text-gray-300">
                Rp{{ cartSubtotal.toLocaleString() }}
              </span>
            </div>

            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-400">Variants & Extras</span>
              <span class="text-gray-300">
                Rp{{ getTotalVariantPrice().toLocaleString() }}
              </span>
            </div>

            <div class="border-t border-slate-700 pt-2">
              <div class="flex justify-between items-center">
                <span class="text-base font-medium text-gray-300"
                  >Total Amount</span
                >
                <span
                  class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                >
                  Rp{{ cartTotal.toLocaleString() }}
                </span>
              </div>
            </div>
          </div>

          <!-- Estimated Time -->
          <div class="mt-3 pt-3 border-t border-slate-700/50">
            <div
              class="flex items-center justify-between text-xs text-gray-400"
            >
              <div class="flex items-center gap-1">
                <span>⏱️</span>
                <span>Estimated prep time</span>
              </div>
              <span class="text-cyan-400 font-medium">15-20 minutes</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="$emit('clearCart')"
            class="bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group border border-red-600/30"
          >
            <span class="group-hover:rotate-12 transition-transform">🗑️</span>
            Clear Cart
          </button>

          <button
            @click="$emit('close')"
            class="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group order-2 sm:order-1"
          >
            <span class="group-hover:-translate-x-1 transition-transform"
              >⬅️</span
            >
            Continue Shopping
          </button>

          <button
            @click="showOrderForm = true"
            class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl order-1 sm:order-2"
          >
            <span class="text-lg">🚀</span>
            <div class="flex flex-col items-start">
              <span class="text-sm">Place Order</span>
              <span class="text-xs opacity-90"
                >Rp{{ cartTotal.toLocaleString() }}</span
              >
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Enhanced Order Form Modal - Completely separate with higher z-index -->
  <div
    v-if="showOrderForm"
    class="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 animate-fade-in"
    @click="showOrderForm = false"
  >
    <div
      class="bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-700 max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl"
      @click.stop
    >
      <div class="flex items-center gap-3 mb-4">
        <div
          class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
        >
          <span class="text-lg">👤</span>
        </div>
        <div>
          <h3 class="text-xl font-bold text-white">Order Details</h3>
          <p class="text-sm text-gray-400">Please fill in your information</p>
        </div>
      </div>

      <!-- Quick Order Summary -->
      <div
        class="bg-slate-800/50 rounded-lg p-3 mb-4 border border-slate-700/50"
      >
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-400"
            >{{ cart.length }} items • {{ getTotalItems() }} qty</span
          >
          <span class="text-cyan-400 font-bold"
            >Rp{{ cartTotal.toLocaleString() }}</span
          >
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label
            class="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-1"
          >
            <span class="text-red-400">*</span>
            Your Name
          </label>
          <input
            v-model="orderForm.customerName"
            type="text"
            class="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <!-- Order Type Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >🍽️ Service Type</label
          >
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="orderForm.serviceType = 'dine-in'"
              class="p-3 rounded-lg border text-sm transition-all"
              :class="
                orderForm.serviceType === 'dine-in'
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : 'bg-slate-800 border-slate-600 text-gray-300 hover:border-slate-500'
              "
            >
              <div class="text-center">
                <div class="text-lg mb-1">🪑</div>
                <div>Dine In</div>
              </div>
            </button>
            <button
              @click="orderForm.serviceType = 'takeaway'"
              class="p-3 rounded-lg border text-sm transition-all"
              :class="
                orderForm.serviceType === 'takeaway'
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : 'bg-slate-800 border-slate-600 text-gray-300 hover:border-slate-500'
              "
            >
              <div class="text-center">
                <div class="text-lg mb-1">🥡</div>
                <div>Takeaway</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Final Total Display -->
      <div
        class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-3 mt-4 border border-cyan-500/20"
      >
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-300">Total to pay:</span>
          <span class="text-lg font-bold text-cyan-400"
            >Rp{{ cartTotal.toLocaleString() }}</span
          >
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button
          @click="showOrderForm = false"
          class="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
        >
          ← Back
        </button>
        <button
          @click="submitOrder"
          :disabled="!orderForm.customerName.trim()"
          class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>✨</span>
          <span>Confirm Order</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cart: {
    type: Array,
    default: () => [],
  },
  merchantSlug: String,
  tableId: String,
  tableName: String,
})

const emit = defineEmits([
  "close",
  "editItem",
  "updateItem",
  "removeItem",
  "confirmPayment",
  "clearCart",
])

const showOrderForm = ref(false)
const orderForm = ref({
  customerName: "",
  customerPhone: "",
  specialInstructions: "",
  serviceType: "dine-in", // dine-in or takeaway
})

// Helper methods
const getItemTotalPrice = (item) => {
  const variantPrice = getVariantPrice(item)
  return (item.price + variantPrice) * item.qty
}

const getVariantPrice = (item) => {
  return (
    item.selectedVariants?.reduce(
      (sum, variant) => sum + (variant.extraPrice || 0),
      0
    ) || 0
  )
}

const getTotalItems = () => {
  return props.cart.reduce((sum, item) => sum + item.qty, 0)
}

const getTotalVariantPrice = () => {
  return props.cart.reduce((sum, item) => {
    return sum + getVariantPrice(item) * item.qty
  }, 0)
}

const getCurrentTime = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

// Computed properties
const cartSubtotal = computed(() => {
  return props.cart.reduce((sum, item) => {
    return sum + item.price * item.qty
  }, 0)
})

const cartTotal = computed(() => {
  return props.cart.reduce((sum, item) => {
    return sum + getItemTotalPrice(item)
  }, 0)
})

// Methods
const updateQuantity = (index, newQty) => {
  if (newQty < 1) return
  emit("updateItem", index, { qty: newQty })
}

const submitOrder = () => {
  emit("confirmPayment", orderForm.value)
  showOrderForm.value = false
  // Reset form
  orderForm.value = {
    customerName: "",
    customerPhone: "",
    serviceType: "dine-in",
  }
}

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    emit("close")
  }
}
</script>

<style scoped>
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
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 640px) {
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
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
