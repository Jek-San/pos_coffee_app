// middleware/role.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { dataAuth, isHydrated, initializeAuth } = useAuth()

  // Ensure client-side state is initialized
  if (process.client && !isHydrated.value) {
    initializeAuth()
    await new Promise((resolve) => setTimeout(resolve, 10))
  }

  const allowedRoles = (to.meta.allowedRoles as string[]) || []

  // Skip if no specific roles are required for this page
  if (!allowedRoles.length) {
    console.log("👥 No specific roles required for:", to.path)
    return
  }

  const currentRole = dataAuth.value?.role?.toLowerCase()
  console.log(
    "👥 Role Middleware - Current role:",
    currentRole,
    "Required roles:",
    allowedRoles
  )

  // Check if user's role is in the allowed roles
  if (!allowedRoles.map((r) => r.toLowerCase()).includes(currentRole || "")) {
    console.log("❌ Role access denied - redirecting to unauthorized")
    return navigateTo("/unauthorized")
  }

  console.log("✅ Role access granted")
})
