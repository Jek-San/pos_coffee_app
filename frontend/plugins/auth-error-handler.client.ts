// plugins/auth-error-handler.client.ts
export default defineNuxtPlugin(() => {
  const { logout } = useAuth()

  // Listen for 401 errors and auto-logout
  window.addEventListener("unhandledrejection", (event) => {
    if (event.reason?.status === 401) {
      logout()
      navigateTo("/login")
    }
  })
})
