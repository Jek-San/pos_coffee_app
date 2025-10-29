// composables/useAccessControl.ts
import { useRoute } from "vue-router"
import { computed } from "vue"

type Role = "OWNER" | "MANAGER" | "STAFF"
type AccessMap = Record<string, Role[]>

const accessMap: AccessMap = {
  "/admin/users": ["OWNER"],
  "/admin/settings": ["OWNER", "MANAGER"],
  "/admin/dashboard": ["OWNER", "MANAGER", "STAFF"],
}

// Access control map

type AccessPath = keyof typeof accessMap

export function useAccessControl(activeMerchant: Ref<{ role?: Role } | null>) {
  const route = useRoute()

  const role = computed(() => activeMerchant.value?.role ?? null)

  const canAccess = computed(() => {
    const path = route.path as AccessPath

    if (path in accessMap) {
      const allowedRoles = accessMap[path]
      return role.value ? allowedRoles.includes(role.value) : false
    }

    return true // Allow if path not listed
  })

  return {
    role,
    canAccess,
  }
}
