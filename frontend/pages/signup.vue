<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 relative overflow-hidden"
  >
    <!-- Background, floating cards, etc. same as login.vue (reuse if layout component) -->

    <div class="w-full max-w-lg space-y-8 relative z-10">
      <div class="text-center space-y-3">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Create Your POS
        </h1>
        <p class="text-slate-400 text-sm">
          No credit card. Just coffee and code ☕
        </p>
      </div>

      <!-- Signup Form Card -->
      <div class="login-card">
        <div class="card-content">
          <form @submit.prevent="handleSignup" class="space-y-6">
            <div class="form-group">
              <label class="form-label">Business Name</label>
              <div class="input-wrapper">
                <input
                  v-model="name"
                  type="text"
                  class="premium-input"
                  placeholder="Ex: Jekk Coffee"
                  required
                />
                <div class="input-focus-ring"></div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <div class="input-wrapper">
                <input
                  v-model="email"
                  type="email"
                  class="premium-input"
                  placeholder="your@email.com"
                  required
                />
                <div class="input-focus-ring"></div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Password</label>
              <div class="input-wrapper">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="premium-input"
                  placeholder="Choose a password"
                  required
                />
                <div class="input-focus-ring"></div>
              </div>
            </div>

            <button
              type="submit"
              class="premium-button group w-full"
              :class="{ loading: isLoading }"
              :disabled="isLoading"
            >
              <div class="button-content">
                <div
                  v-if="isLoading"
                  class="flex items-center justify-center space-x-2"
                >
                  <div class="loading-spinner"></div>
                  <span>Creating merchant...</span>
                </div>
                <div v-else class="flex items-center justify-center space-x-2">
                  <span>Get Started</span>
                  <svg
                    class="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </div>
              </div>
            </button>

            <div v-if="error" class="error-alert mt-4">{{ error }}</div>
          </form>
        </div>
      </div>

      <div class="text-center text-sm text-slate-500">
        Already have an account?
        <NuxtLink to="admin/login" class="text-emerald-400 hover:underline"
          >Sign In</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({ layout: "admin" })

import { ref } from "vue"
import { useRouter } from "vue-router"
import { useApi } from "@/composables/useApi"
import { useAuth } from "@/composables/useAuth"

useHead({ title: "Sign Up" })

const email = ref("")
const password = ref("")
const name = ref("")
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref(null)

const router = useRouter()
const { login } = useAuth()

const handleSignup = async () => {
  isLoading.value = true
  error.value = null

  try {
    const data = await useApi("api/pos/signup", {
      method: "POST",
      body: { email: email.value, password: password.value, name: name.value },
    })

    login(data.token, data.admin)

    router.push("/pos/get-started")
  } catch (err) {
    alert(err)
    error.value = err?.data?.message || "Signup failed"
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Reuse styles from login.vue (premium-input, premium-button, error-alert, etc.) */
</style>
