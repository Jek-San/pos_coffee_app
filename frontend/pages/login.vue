<!-- pages/pos/login.vue -->
<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 relative overflow-hidden"
  >
    <!-- Subtle Business Background -->
    <div class="absolute inset-0">
      <!-- Geometric Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute top-0 left-0 w-full h-full bg-business-pattern"
        ></div>
      </div>

      <!-- Floating Elements -->
      <div class="floating-card card-1"></div>
      <div class="floating-card card-2"></div>
      <div class="floating-card card-3"></div>

      <!-- Light Rays -->
      <div class="light-ray ray-1"></div>
      <div class="light-ray ray-2"></div>
    </div>

    <div class="w-full max-w-lg space-y-8 relative z-10">
      <!-- Professional Header -->
      <div class="text-center space-y-6">
        <div class="inline-block relative">
          <div class="logo-container">
            <div
              class="w-24 h-24 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10 backdrop-blur-sm"
            >
              <svg
                class="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <div
              class="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-70 animate-pulse"
            ></div>
          </div>
        </div>

        <div class="space-y-3">
          <h1
            class="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Jekk's
          </h1>
          <p class="text-xl text-slate-300 font-light">Point of Sale System</p>
          <div
            class="flex items-center justify-center space-x-2 text-sm text-slate-400"
          >
            <div
              class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
            ></div>
            <span>Secure Business Login</span>
          </div>
        </div>
      </div>

      <!-- Premium Login Card -->
      <div class="login-card">
        <div class="card-shine"></div>
        <div class="card-content">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email Field -->
            <div class="form-group">
              <label for="email" class="form-label"> Email Address </label>
              <div class="input-wrapper">
                <div class="input-icon">
                  <svg
                    class="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Enter your email address"
                  class="premium-input"
                  required
                  :class="{ error: error }"
                />
                <div class="input-focus-ring"></div>
              </div>
            </div>

            <!-- Password Field -->
            <div class="form-group">
              <label for="password" class="form-label"> Password </label>
              <div class="input-wrapper">
                <div class="input-icon">
                  <svg
                    class="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="premium-input pr-12"
                  required
                  :class="{ error: error }"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="password-toggle"
                >
                  <svg
                    v-if="!showPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    ></path>
                  </svg>
                </button>
                <div class="input-focus-ring"></div>
              </div>
            </div>

            <!-- Premium Login Button -->
            <div class="pt-2">
              <button
                :disabled="isLoading"
                class="premium-button group w-full"
                :class="{ loading: isLoading }"
              >
                <div class="button-bg"></div>
                <div class="button-content">
                  <div
                    v-if="isLoading"
                    class="flex items-center justify-center space-x-3"
                  >
                    <div class="loading-spinner"></div>
                    <span class="font-semibold">Authenticating...</span>
                  </div>
                  <div
                    v-else
                    class="flex items-center justify-center space-x-2"
                  >
                    <span class="font-semibold">Sign In to POS</span>
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
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="error-alert">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <svg
                    class="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div class="text-sm font-medium text-red-300">{{ error }}</div>
              </div>
            </div>
          </form>

          <!-- Security Notice -->
          <div class="mt-8 pt-6 border-t border-slate-700/50">
            <div
              class="flex items-center justify-center space-x-2 text-sm text-slate-400"
            >
              <svg
                class="w-4 h-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              <span>256-bit SSL encryption • SOC 2 compliant</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Business Stats -->
      <div class="grid grid-cols-3 gap-4 text-center">
        <div class="stat-card">
          <div class="text-2xl font-bold text-emerald-400">99.9%</div>
          <div class="text-xs text-slate-400 uppercase tracking-wide">
            Uptime
          </div>
        </div>
        <div class="stat-card">
          <div class="text-2xl font-bold text-teal-400">24/7</div>
          <div class="text-xs text-slate-400 uppercase tracking-wide">
            Support
          </div>
        </div>
        <div class="stat-card">
          <div class="text-2xl font-bold text-cyan-400">50k+</div>
          <div class="text-xs text-slate-400 uppercase tracking-wide">
            Merchants
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ✅ Clean page meta - no middleware needed
definePageMeta({
  layout: "admin",
  // No middleware here - redirect.global.ts handles everything
})

import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "@/composables/useAuth"
import { useApi } from "@/composables/useApi"

useMeta({
  title: "Login",
})

const email = ref("")
const password = ref("")
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref(null)

const { login, logout, getRoleBasedRoute } = useAuth()
const router = useRouter()
const notify = useNotifications()

const handleLogin = async () => {
  isLoading.value = true
  error.value = null

  try {
    console.log("🔐 Attempting login for:", email.value)

    const data = await useApi("api/pos/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    })

    notify.success("Login successful")

    // Validate response
    if (!data.token || !data.admin) {
      throw new Error("Invalid login response from server")
    }

    // Perform login
    login(data.token, data.admin)

    // Handle routing - let the redirect middleware handle most of this
    if (!data.admin.merchants || data.admin.merchants.length === 0) {
      error.value = "No merchant access assigned to this account"
      logout()
      return
    }

    if (data.admin.merchants.length > 1) {
      // Multiple merchants - go to selection page
      console.log("➡️ Multiple merchants found - redirecting to selection page")
      await router.push("/select-merchant")
    } else {
      // Single merchant - redirect middleware will handle the dashboard redirect
      console.log(
        "➡️ Single merchant - redirect middleware will handle routing"
      )
      await router.push("/") // This will trigger redirect middleware to send them to dashboard
    }
  } catch (err) {
    console.error("❌ Login error:", err)
    error.value = err?.data?.message || err?.message || "Login failed"
    logout() // Clear any partial login state
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Business Pattern Background */
.bg-business-pattern {
  background-image:
    radial-gradient(
      circle at 25% 25%,
      rgba(16, 185, 129, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(6, 182, 212, 0.1) 0%,
      transparent 50%
    );
  background-size: 200px 200px;
  animation: pattern-drift 30s linear infinite;
}

@keyframes pattern-drift {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

/* Floating Business Cards */
.floating-card {
  position: absolute;
  width: 80px;
  height: 50px;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.1),
    rgba(6, 182, 212, 0.1)
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  animation: float-business 8s ease-in-out infinite;
}

.card-1 {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 70%;
  right: 15%;
  animation-delay: 3s;
}

.card-3 {
  bottom: 20%;
  left: 15%;
  animation-delay: 6s;
}

@keyframes float-business {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-15px) rotate(2deg);
    opacity: 0.6;
  }
}

/* Light Rays */
.light-ray {
  position: absolute;
  width: 2px;
  height: 100px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(16, 185, 129, 0.4),
    transparent
  );
  animation: light-sweep 6s ease-in-out infinite;
}

.ray-1 {
  top: 20%;
  left: 30%;
  animation-delay: 0s;
}

.ray-2 {
  top: 60%;
  right: 25%;
  animation-delay: 3s;
}

@keyframes light-sweep {
  0%,
  100% {
    opacity: 0;
    transform: translateX(0px);
  }
  50% {
    opacity: 1;
    transform: translateX(20px);
  }
}

/* Logo Container */
.logo-container {
  position: relative;
  display: inline-block;
  animation: logo-glow 4s ease-in-out infinite;
}

@keyframes logo-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5));
  }
}

/* Premium Login Card */
.login-card {
  position: relative;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
}

.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: card-shine 3s ease-in-out infinite;
}

@keyframes card-shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.card-content {
  padding: 2.5rem;
  position: relative;
  z-index: 1;
}

/* Form Styling */
.form-group {
  space-y: 0.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.premium-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(30, 41, 59, 0.6);
  border: 2px solid rgba(148, 163, 184, 0.3);
  border-radius: 16px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.premium-input::placeholder {
  color: rgba(148, 163, 184, 0.6);
}

.premium-input:focus {
  outline: none;
  border-color: #10b981;
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
}

.premium-input.error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.input-focus-ring {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  border: 2px solid transparent;
  background: linear-gradient(135deg, #10b981, #06b6d4) border-box;
  mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none; /* 👈 Add this line */
}

.premium-input:focus ~ .input-focus-ring {
  opacity: 1;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  transition: color 0.3s ease;
  z-index: 2;
}

.password-toggle:hover {
  color: #10b981;
}

/* Premium Button */
.premium-button {
  position: relative;
  padding: 1rem 2rem;
  border: none;
  border-radius: 16px;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.button-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #10b981, #06b6d4);
  transition: all 0.3s ease;
}

.premium-button:hover:not(.loading) .button-bg {
  background: linear-gradient(135deg, #059669, #0891b2);
  transform: scale(1.02);
}

.premium-button:active:not(.loading) {
  transform: scale(0.98);
}

.premium-button.loading {
  cursor: not-allowed;
  opacity: 0.8;
}

.button-content {
  position: relative;
  z-index: 1;
}

/* Loading Spinner */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error Alert */
.error-alert {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 1rem;
  animation: error-slide-in 0.3s ease-out;
}

@keyframes error-slide-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stats Cards */
.stat-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 640px) {
  .card-content {
    padding: 2rem;
  }

  h1 {
    font-size: 3rem;
  }

  .stat-card {
    padding: 0.75rem;
  }
}
</style>
