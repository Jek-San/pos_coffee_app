import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: []
  }),

  getters: {
    hasNotifications: (state) => state.notifications.length > 0
  },

  actions: {
    generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
    },

    addNotification(message, type, duration) {
      if (!type) type = 'info'
      if (!duration) duration = 3000

      const id = this.generateId()
      const notification = {
        id: id,
        message: message,
        type: type,
        duration: duration,
        timestamp: Date.now()
      }

      this.notifications.push(notification)

      if (process.client && duration > 0) {
        setTimeout(() => {
          this.removeNotification(id)
        }, duration)
      }

      return id
    },

    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },

    clearAllNotifications() {
      this.notifications = []
    },

    success(message, duration) {
      return this.addNotification(message, 'success', duration)
    },

    error(message, duration) {
      return this.addNotification(message, 'error', duration)
    },

    warning(message, duration) {
      return this.addNotification(message, 'warning', duration)
    },

    info(message, duration) {
      return this.addNotification(message, 'info', duration)
    }
  }
})