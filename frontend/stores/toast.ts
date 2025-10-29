// stores/toast.ts
import { defineStore } from "pinia"

export type ToastType = "success" | "error" | "info"

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
  duration?: number
}

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [] as ToastMessage[],
  }),
  actions: {
    show(message: string, type: ToastType = "info", duration = 3000) {
      const id = crypto.randomUUID()
      this.toasts.push({ id, message, type, duration })

      // Auto-remove after duration
      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== id)
      }, duration)
    },
  },
})
