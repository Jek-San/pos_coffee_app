// composables/useAuth.ts
interface AdminMerchant {
  merchantId: string
  merchantName: string
  role: string
}

interface AdminUser {
  id: string
  email: string
  name?: string
  merchants: AdminMerchant[]
}

import { computed, ref, reactive, watch } from "vue"

export const useAuth = () => {
  const token = useCookie<string | null>("token", {
    default: () => null,
    secure: true,
    sameSite: "strict",
  })

  const admin = useState<AdminUser | null>("auth:admin", () => null)
  const activeMerchant = useState<AdminMerchant | null>(
    "auth:activeMerchant",
    () => null
  )

  const isHydrated = useState<boolean>("auth:isHydrated", () => false)

  // ✅ Properly handle client-side restoration
  const initializeAuth = () => {
    if (process.client && !isHydrated.value) {
      // Restore admin data
      if (!admin.value) {
        const savedAdmin = localStorage.getItem("admin")
        if (savedAdmin) {
          try {
            admin.value = JSON.parse(savedAdmin)
          } catch (e) {
            console.error("Failed to parse saved admin data:", e)
            localStorage.removeItem("admin")
          }
        }
      }

      // Restore active merchant
      if (!activeMerchant.value) {
        const savedMerchant = localStorage.getItem("activeMerchant")
        if (savedMerchant) {
          try {
            activeMerchant.value = JSON.parse(savedMerchant)
          } catch (e) {
            console.error("Failed to parse saved merchant data:", e)
            localStorage.removeItem("activeMerchant")
          }
        }
      }

      // Sync token with localStorage if needed
      if (!token.value) {
        const savedToken = localStorage.getItem("token")
        if (savedToken) {
          token.value = savedToken
        }
      } else {
        // Ensure localStorage is in sync
        localStorage.setItem("token", token.value)
      }

      isHydrated.value = true
    }
  }

  // Initialize on client
  if (process.client) {
    nextTick(() => {
      initializeAuth()
    })
  }

  const login = (_token: string, _admin: AdminUser) => {
    token.value = _token
    admin.value = _admin

    console.log("Admin logged in:", _admin)

    // Store in localStorage
    if (process.client) {
      localStorage.setItem("token", _token)
      localStorage.setItem("admin", JSON.stringify(_admin))

      // Auto-select merchant if only one
      if (_admin.merchants?.length === 1) {
        activeMerchant.value = _admin.merchants[0]
        localStorage.setItem(
          "activeMerchant",
          JSON.stringify(_admin.merchants[0])
        )
      }
    }
  }

  const logout = () => {
    token.value = null
    admin.value = null
    activeMerchant.value = null
    isHydrated.value = false

    if (process.client) {
      localStorage.removeItem("token")
      localStorage.removeItem("admin")
      localStorage.removeItem("activeMerchant")
    }
  }

  // ✅ Computed property for auth data
  const dataAuth = computed(() => {
    if (!admin.value) return null

    const currentMerchant = activeMerchant.value || admin.value?.merchants[0]
    return {
      merchantName: currentMerchant?.merchantName,
      role: currentMerchant?.role,
      merchantId: currentMerchant?.merchantId,
      idUser: admin.value?.id,
    }
  })

  // ✅ Computed property to check if user is authenticated
  const isAuthenticated = computed(() => {
    return !!(token.value && admin.value)
  })

  // ✅ Helper function to get role-based route
  const getRoleBasedRoute = (role?: string) => {
    if (!role) return "/dashboard"

    switch (role.toLowerCase()) {
      case "owner":
      case "admin":
        return "/owner/dashboard"
      case "manager":
        return "/manager/dashboard"
      case "cashier":
      case "staff":
        return "/cashier/dashboard"
      case "stall_owner":
        return "/stall/dashboard"
      default:
        return "/dashboard"
    }
  }

  // ✅ Helper to set active merchant
  const setActiveMerchant = (merchant: AdminMerchant) => {
    activeMerchant.value = merchant
    if (process.client) {
      localStorage.setItem("activeMerchant", JSON.stringify(merchant))
    }
  }

  return {
    token,
    admin,
    activeMerchant,
    isHydrated,
    isAuthenticated,
    login,
    logout,
    dataAuth,
    getRoleBasedRoute,
    setActiveMerchant,
    initializeAuth,
  }
}
