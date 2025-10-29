<!-- pages/select-merchant.vue -->
<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 relative overflow-hidden"
  >
    <!-- Animated Background -->
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

    <div class="w-full max-w-4xl space-y-8 relative z-10">
      <!-- Header Section -->
      <div class="text-center space-y-6">
        <div class="inline-block relative">
          <div class="logo-container">
            <div
              class="w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 backdrop-blur-sm"
            >
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <div
              class="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-70 animate-pulse"
            ></div>
          </div>
        </div>

        <div class="space-y-3">
          <h1
            class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Select Your Store
          </h1>
          <p class="text-lg text-slate-300 font-light">
            Welcome back, {{ admin?.name || admin?.email }}
          </p>
          <div
            class="flex items-center justify-center space-x-2 text-sm text-slate-400"
          >
            <div
              class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
            ></div>
            <span>Choose a merchant to continue</span>
          </div>
        </div>
      </div>

      <!-- Merchants Grid -->
      <div class="space-y-6">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center">
          <div class="loading-spinner-large"></div>
        </div>

        <!-- Merchants List -->
        <div
          v-else-if="admin?.merchants && admin.merchants.length > 0"
          class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="(merchant, index) in admin.merchants"
            :key="merchant.merchantId"
            class="merchant-card group cursor-pointer"
            :class="{
              'merchant-selected':
                selectedMerchant?.merchantId === merchant.merchantId,
            }"
            @click="selectMerchant(merchant)"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="card-shine"></div>
            <div class="card-content relative">
              <!-- Store Icon -->
              <div class="flex items-center justify-center mb-6">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300 shadow-lg border border-slate-600/50"
                >
                  <svg
                    class="w-8 h-8 text-slate-300 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                    ></path>
                  </svg>
                </div>
              </div>

              <!-- Store Info -->
              <div class="text-center space-y-3">
                <h3
                  class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300"
                >
                  {{ merchant.merchantName }}
                </h3>

                <!-- Role Badge -->
                <div class="flex justify-center">
                  <span
                    class="role-badge"
                    :class="getRoleBadgeClass(merchant.role)"
                  >
                    {{ formatRole(merchant.role) }}
                  </span>
                </div>

                <!-- Access Level Indicator -->
                <div
                  class="flex items-center justify-center space-x-2 text-sm text-slate-400"
                >
                  <div
                    class="w-2 h-2 rounded-full"
                    :class="getRoleIndicatorClass(merchant.role)"
                  ></div>
                  <span>{{ getRoleDescription(merchant.role) }}</span>
                </div>
              </div>

              <!-- Selection Indicator -->
              <div
                v-if="selectedMerchant?.merchantId === merchant.merchantId"
                class="absolute top-4 right-4"
              >
                <div
                  class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>

              <!-- Hover Arrow -->
              <div
                class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg
                  class="w-5 h-5 text-emerald-400"
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
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div
            class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-10 h-10 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-300 mb-2">
            No Merchants Found
          </h3>
          <p class="text-slate-500">
            You don't have access to any merchants yet.
          </p>
        </div>
      </div>

      <!-- Continue Button -->
      <div
        v-if="selectedMerchant && !isLoading"
        class="flex justify-center pt-6"
      >
        <button
          @click="continueToMerchant"
          :disabled="isRedirecting"
          class="premium-button group"
          :class="{ loading: isRedirecting }"
        >
          <div class="button-bg"></div>
          <div class="button-content">
            <div
              v-if="isRedirecting"
              class="flex items-center justify-center space-x-3"
            >
              <div class="loading-spinner"></div>
              <span class="font-semibold">Loading Dashboard...</span>
            </div>
            <div v-else class="flex items-center justify-center space-x-2">
              <span class="font-semibold">
                Continue to {{ selectedMerchant.merchantName }}
              </span>
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
      </div>

      <!-- Back to Login -->
      <div class="text-center pt-4">
        <button
          @click="handleLogout"
          class="text-slate-400 hover:text-slate-300 transition-colors duration-200 text-sm font-medium"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "@/composables/useAuth"

definePageMeta({
  layout: "admin",
  middleware: "auth", // Ensure user is authenticated
})

useMeta({
  title: "Select Merchant - Jekk's POS",
})

const { admin, setActiveMerchant, getRoleBasedRoute, logout } = useAuth()
const router = useRouter()

const selectedMerchant = ref(null)
const isLoading = ref(false)
const isRedirecting = ref(false)

// Handle merchant selection
const selectMerchant = (merchant) => {
  selectedMerchant.value = merchant
}

// Continue to selected merchant dashboard
const continueToMerchant = async () => {
  if (!selectedMerchant.value) return

  isRedirecting.value = true

  try {
    // Set the active merchant
    setActiveMerchant(selectedMerchant.value)

    // Small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Navigate to role-based dashboard
    const route = getRoleBasedRoute(selectedMerchant.value.role)
    await router.push(route)
  } catch (error) {
    console.error("Navigation error:", error)
  } finally {
    isRedirecting.value = false
  }
}

// Handle logout
const handleLogout = async () => {
  logout()
  await router.push("/pos/login")
}

// Role helper functions
const formatRole = (role) => {
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
}

const getRoleBadgeClass = (role) => {
  const roleClasses = {
    owner:
      "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30",
    admin:
      "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30",
    manager:
      "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30",
    cashier:
      "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30",
    staff:
      "bg-gradient-to-r from-slate-500/20 to-gray-500/20 text-slate-300 border-slate-500/30",
  }
  return roleClasses[role.toLowerCase()] || roleClasses.staff
}

const getRoleIndicatorClass = (role) => {
  const indicatorClasses = {
    owner: "bg-purple-400",
    admin: "bg-emerald-400",
    manager: "bg-blue-400",
    cashier: "bg-amber-400",
    staff: "bg-slate-400",
  }
  return indicatorClasses[role.toLowerCase()] || indicatorClasses.staff
}

const getRoleDescription = (role) => {
  const descriptions = {
    owner: "Full Access",
    admin: "Full Access",
    manager: "Management Access",
    cashier: "Sales Access",
    staff: "Limited Access",
  }
  return descriptions[role.toLowerCase()] || "Standard Access"
}

// Check if user has access to merchants
onMounted(() => {
  if (
    !admin.value ||
    !admin.value.merchants ||
    admin.value.merchants.length === 0
  ) {
    // Redirect back to login if no merchants
    router.push("/pos/login")
  }
})
</script>

<style>
/* Merchant Selection Page Styles */

/* Floating Background Elements */
.floating-card {
  position: absolute;
  width: 200px;
  height: 120px;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.1),
    rgba(6, 182, 212, 0.05)
  );
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  top: 10%;
  left: -5%;
  animation-delay: 0s;
}

.card-2 {
  top: 50%;
  right: -8%;
  animation-delay: 2s;
}

.card-3 {
  bottom: 20%;
  left: 10%;
  animation-delay: 4s;
}

/* Light Rays */
.light-ray {
  position: absolute;
  width: 2px;
  height: 200px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(16, 185, 129, 0.3),
    transparent
  );
  transform-origin: top;
  animation: lightRay 8s linear infinite;
}

.ray-1 {
  top: 0;
  left: 20%;
  animation-delay: 0s;
}

.ray-2 {
  top: 0;
  right: 30%;
  animation-delay: 4s;
}

/* Background Pattern */
.bg-business-pattern {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.1) 1px,
    transparent 0
  );
  background-size: 20px 20px;
}

/* Logo Container */
.logo-container {
  position: relative;
  display: inline-block;
}

/* Card Shine Effect */
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
  transition: left 0.6s;
  border-radius: inherit;
}

.merchant-card:hover .card-shine {
  left: 100%;
}

/* Card Content */
.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
}

/* Premium Button */
.premium-button {
  position: relative;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  min-width: 280px;
}

.premium-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
}

.premium-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Button Background */
.button-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #10b981, #0891b2, #06b6d4);
  border-radius: inherit;
  transition: all 0.3s ease;
}

.premium-button:hover .button-bg {
  background: linear-gradient(135deg, #059669, #0e7490, #0891b2);
}

/* Button Content */
.button-content {
  position: relative;
  z-index: 2;
  padding: 16px 24px;
  color: white;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: inherit;
  backdrop-filter: blur(10px);
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

.loading-spinner-large {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(148, 163, 184, 0.3);
  border-top: 4px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
  }
}

@keyframes lightRay {
  0% {
    transform: rotate(0deg) scaleY(0);
    opacity: 0;
  }
  50% {
    transform: rotate(2deg) scaleY(1);
    opacity: 1;
  }
  100% {
    transform: rotate(0deg) scaleY(0);
    opacity: 0;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .premium-button {
    min-width: 260px;
  }

  .merchant-card {
    min-height: 180px;
  }
}

@media (max-width: 640px) {
  .floating-card {
    display: none; /* Hide floating elements on small screens */
  }

  .light-ray {
    display: none; /* Hide light rays on small screens */
  }
}
</style>
