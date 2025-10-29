// composables/useOrderStorage.js
import { useStorage } from '@vueuse/core'
import { ref, computed } from 'vue'

export const useOrderStorage = () => {
  // These are stored in localStorage automatically
  const customerId = useStorage('customerId', () => crypto.randomUUID())
  const merchantId = useStorage('merchantId', null)
  const merchantName = useStorage('merchantName', null)
  const tableId = useStorage('tableId', null)
  const activeOrderId = useStorage('activeOrderId', null)
  const lastActivity = useStorage('lastActivity', Date.now())

  // Order history stored in localStorage
  const orderHistory = useStorage('orderHistory', [])

  // MEMORY ONLY - Cart state (not stored until submit)
  const memoryCart = ref({})

  // Methods to handle cart
  const addToCart = (itemWithData) => {
    console.log("🛒 Adding to cart:", itemWithData)
    memoryCart.value[itemWithData.id] = {
      item: itemWithData,
      qty: itemWithData.qty,
      note: itemWithData.note,
      selectedVariants: itemWithData.selectedVariants

    }
  }

  const updateCartItem = (itemId, data) => {
    if (memoryCart.value[itemId]) {
      memoryCart.value[itemId] = { ...memoryCart.value[itemId], ...data }
    }
  }

  const removeFromCart = (itemId) => {
    delete memoryCart.value[itemId]
  }

  const clearCart = () => {
    memoryCart.value = {}
  }

  // Save order to localStorage (called on submit)
  const saveOrderToStorage = (orderData) => {
    const order = {
      id: orderData.orderId || Date.now(),
      merchantSlug: orderData.merchantSlug,
      tableId: orderData.tableId,
      items: Object.values(memoryCart.value).map(entry => ({
        id: entry.item.id,
        name: entry.item.name,
        price: entry.item.price,
        qty: entry.qty,
        note: entry.note,
      })),
      total: cartTotal.value,
      timestamp: new Date().toISOString(),
      status: 'submitted'
    }

    // Add to order history
    orderHistory.value.push(order)

    // Set as active order
    activeOrderId.value = order.id

    // Update last activity
    lastActivity.value = Date.now()

    // Clear memory cart after saving
    clearCart()

    return order
  }

  // Load a previous order back to memory cart (for editing)
  const loadOrderToCart = (orderId) => {
    const order = orderHistory.value.find(o => o.id === orderId)
    if (order) {
      memoryCart.value = {}
      order.items.forEach(item => {
        memoryCart.value[item.id] = {
          item: item,
          qty: item.qty,
          note: item.note
        }
      })
      return true
    }
    return false
  }

  // Computed values for cart
  const cartItemCount = computed(() => {
    return Object.values(memoryCart.value).reduce((sum, entry) => sum + entry.qty, 0)
  })

  const cartTotal = computed(() => {
    console.log("extraPrice", memoryCart.value)
    console.log("memoryCart.value", Object.values(memoryCart.value).map(item => console.log(item)))
    return Object.values(memoryCart.value).reduce(
      (sum, entry) => sum + entry.qty * (entry.item.price + entry.item.selectedVariants.reduce((sum, variant) => sum + variant.extraPrice, 0)),
      0
    )
  })

  const cartItems = computed(() => {
    return Object.values(memoryCart.value)
  })

  // Clean up old orders (older than 30 days)
  const cleanupOldOrders = () => {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
    orderHistory.value = orderHistory.value.filter(
      order => new Date(order.timestamp).getTime() > thirtyDaysAgo
    )
  }

  const resetAll = () => {
    merchantId.value = null
    tableId.value = null
    activeOrderId.value = null
    clearCart()
  }

  return {
    // Storage values
    customerId,
    merchantId,
    tableId,
    activeOrderId,
    orderHistory,
    lastActivity,

    // Memory cart
    memoryCart,
    cartItemCount,
    cartTotal,
    cartItems,

    // Cart methods
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,

    // Storage methods
    saveOrderToStorage,
    loadOrderToCart,
    cleanupOldOrders,
    resetAll
  }
}