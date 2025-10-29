export default defineNuxtPlugin(() => {
  const { login } = useAuth()
  const token = useCookie("token").value
  const admin = localStorage.getItem("admin")

  if (token && admin) {
    try {
      const parsedAdmin = JSON.parse(admin)
      login(token, parsedAdmin)

      console.log("Admin restored from local storage")
    } catch (err) {
      alert("Failed to restore admin:")
      console.error("Failed to restore admin:", err)
    }
  }
})
