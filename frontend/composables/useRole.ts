// composables/useRole.ts

export const useRole = () => {
  const { activeMerchant } = useAuth()

  const hasRole = (...roles: string[]) => {
    return roles.includes((activeMerchant.value as any)?.role)
  }

  const role = computed(() => activeMerchant.value?.role ?? null)

  return {
    role,
    hasRole,
  }
}
