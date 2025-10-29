export const useNotifications = () => {
  const store = useNotificationStore()

  return {
    notifications: computed(() => store.notifications),
    hasNotifications: computed(() => store.hasNotifications),

    showNotification: (message, type, duration) => store.addNotification(message, type, duration),
    removeNotification: (id) => store.removeNotification(id),
    clearAll: () => store.clearAllNotifications(),

    success: (message, duration) => store.success(message, duration),
    error: (message, duration) => store.error(message, duration),
    warning: (message, duration) => store.warning(message, duration),
    info: (message, duration) => store.info(message, duration)
  }
}