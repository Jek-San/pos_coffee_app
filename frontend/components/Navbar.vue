<!-- components/Navbar.vue -->
<template>
  <nav class="w-full relative">
    <!-- Background with blur effect -->
    <div
      class="absolute inset-0 bg-[#0d1117]/90 backdrop-blur-md border-b border-gray-800/50"
    ></div>

    <!-- Main navbar content -->
    <div
      class="relative z-10 max-w-7xl mx-auto px-6 py-4 flex justify-between items-center"
    >
      <!-- Left: Site Title -->
      <div class="flex items-center">
        <router-link
          to="/"
          class="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <!-- Logo/Icon -->
          <div
            class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <svg
              class="w-6 h-6 text-white"
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
          <!-- Title -->
          <h1
            class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            Jekk's POS
          </h1>
        </router-link>
      </div>

      <!-- Middle: Navigation Links -->
      <ul class="hidden md:flex gap-8 font-medium">
        <li>
          <router-link
            to="/pos/get-started"
            class="relative text-gray-300 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/5 group"
          >
            Get Started
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
        </li>
        <!-- Uncomment and add more navigation items as needed -->
        <!-- <li>
          <router-link 
            to="/about" 
            class="relative text-gray-300 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/5 group"
          >
            About
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
        </li> -->
      </ul>

      <!-- Right: User Info & Actions -->
      <div class="flex items-center gap-4">
        <div v-if="admin" class="flex items-center gap-4">
          <!-- User Welcome -->
          <div class="hidden sm:flex items-center gap-2 text-sm">
            <div
              class="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <div class="text-gray-300">
              <span class="text-xs text-gray-400">Welcome,</span>
              <!-- <span
                v-for="(m, index) in dataAuth"
                :key="index"
                class="text-cyan-400 font-medium"
              >
                {{ m }}{{ index < dataAuth.length - 1 ? ", " : "" }}
              </span> -->
              <span> {{ ` ${dataAuth.merchantName}` }}</span>
            </div>
          </div>

          <!-- Logout Button -->
          <button
            @click="handleLogout"
            class="group flex items-center gap-2 text-sm text-gray-300 hover:text-red-400 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
          >
            <svg
              class="w-4 h-4 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          @click="toggleMobileMenu"
        >
          <svg
            class="w-6 h-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-[#0d1117]/95 backdrop-blur-md border-t border-gray-800/50"
      >
        <div class="px-6 py-4 space-y-2">
          <router-link
            to="/pos/get-started"
            class="block text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-colors"
            @click="closeMobileMenu"
          >
            Get Started
          </router-link>
          <!-- Add more mobile menu items here -->
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from "vue"
import { useAuth } from "~/composables/useAuth"

const { admin, dataAuth, logout } = useAuth()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleLogout = () => {
  logout()
  window.location.href = "/" // or use `navigateTo('/')` if using Nuxt
}
</script>

<style scoped>
/* Mobile menu animations */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
