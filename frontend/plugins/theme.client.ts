// plugins/theme.client.ts
export default defineNuxtPlugin(() => {
  const { initTheme } = useTheme()
  initTheme()
})
