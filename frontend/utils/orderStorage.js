// utils/orderStorage.js

// Get recent order IDs from localStorage
export const getRecentOrders = () => {
  try {
    const stored = localStorage.getItem('recentOrders')
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading recent orders:', error)
    return []
  }
}

// Add new order ID to recent orders
export const addToRecentOrders = (orderId) => {
  const recentOrders = getRecentOrders()

  // Remove if already exists to avoid duplicates
  const filtered = recentOrders.filter(id => id !== orderId)

  // Add new order ID to beginning of array
  filtered.unshift(orderId)

  // Keep only last 10 orders to avoid storage bloat
  const limitedOrders = filtered.slice(0, 10)

  localStorage.setItem('recentOrders', JSON.stringify(limitedOrders))
}

// Remove order ID from recent orders
export const removeFromRecentOrders = (orderId) => {
  const recentOrders = getRecentOrders()
  const filtered = recentOrders.filter(id => id !== orderId)
  localStorage.setItem('recentOrders', JSON.stringify(filtered))
}

