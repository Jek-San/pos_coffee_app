// middleware/redirect.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const {
    token,
    admin,
    isHydrated,
    initializeAuth,
    getRoleBasedRoute,
    dataAuth,
  } = useAuth()

  // Ensure client-side state is initialized
  if (process.client && !isHydrated.value) {
    initializeAuth()
    // Wait a bit for state to be restored
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  // ✅ RULE 1: If user is NOT authenticated, let them access anything
  if (!token.value || !admin.value) {
    console.log("🔓 Anonymous user accessing:", to.path)
    return // Let them go anywhere (login, homepage, etc.)
  }

  // ✅ RULE 2: User IS authenticated - apply smart redirects
  console.log(
    "🔐 Authenticated user accessing:",
    to.path,
    "Role:",
    dataAuth.value?.role
  )

  const currentPath = to.path
  const currentRole = dataAuth.value?.role?.toLowerCase()
  console.log("current ROle:", currentRole)

  // ✅ RULE 3: If authenticated user tries to access login, redirect to dashboard
  if (currentPath === "/login" || currentPath === "/login") {
    const targetDashboard = getRoleBasedRoute(currentRole)
    console.log(
      "➡️ Redirecting authenticated user from login to:",
      targetDashboard
    )
    return navigateTo(targetDashboard)
  }

  // ✅ RULE 4: If authenticated user visits homepage, redirect to dashboard
  if (currentPath === "/" || currentPath === "/dashboard") {
    const targetDashboard = getRoleBasedRoute(currentRole)
    console.log(
      "➡️ Redirecting authenticated user from homepage to:",
      targetDashboard
    )
    return navigateTo(targetDashboard)
  }

  // ✅ RULE 5: Define pages that ALL authenticated users can access
  const commonPages = [
    "/profile",
    "/settings",
    "/select-merchant",
    "/unauthorized",
  ]

  const isCommonPage = commonPages.some((page) => currentPath.startsWith(page))
  if (isCommonPage) {
    console.log("✅ Allowing access to common page:", currentPath)
    return // Let them access common pages
  }

  // ✅ RULE 6: Role-based area restrictions
  const roleAreas = {
    "/owner": ["owner", "admin"],
    "/stall": ["stall_owner", "owner", "admin"],
    "/manager": ["manager", "owner", "admin"],
    "/cashier": ["cashier", "staff", "manager", "owner", "admin"],
  }

  // Check if user is trying to access a role-specific area
  for (const [pathPrefix, allowedRoles] of Object.entries(roleAreas)) {
    if (currentPath.startsWith(pathPrefix)) {
      if (!allowedRoles.includes(currentRole || "")) {
        // User doesn't have permission, redirect to their dashboard
        const targetDashboard = getRoleBasedRoute(currentRole)
        console.log(
          "❌ Access denied to",
          pathPrefix,
          "for role",
          currentRole,
          "- redirecting to:",
          targetDashboard
        )
        return navigateTo(targetDashboard)
      }
      console.log("✅ Access granted to", pathPrefix, "for role", currentRole)
      return // User has permission, let them continue
    }
  }

  // ✅ RULE 7: For any other page, let them access it
  console.log("✅ Allowing access to other page:", currentPath)
})
