// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { token, admin, isHydrated, initializeAuth } = useAuth()

  // Ensure client-side state is initialized
  if (process.client && !isHydrated.value) {
    initializeAuth()
    await new Promise((resolve) => setTimeout(resolve, 10))
  }

  console.log("🔐 Auth Middleware - Checking authentication for:", to.path)
  console.log("Token exists:", !!token.value, "Admin exists:", !!admin.value)

  // Simple job: just check if user is authenticated
  if (!token.value || !admin.value) {
    console.log("❌ Not authenticated - redirecting to login")
    return navigateTo("/login")
  }

  console.log("✅ User is authenticated - allowing access")
})
