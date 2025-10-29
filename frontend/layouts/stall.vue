<!-- layouts/owner.vue -->
<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo/Brand -->
      <div
        class="flex items-center justify-between h-16 px-6 border-b border-slate-700"
      >
        <h1 class="text-xl font-bold text-white">Stall Owner</h1>
        <button
          @click="sidebarOpen = false"
          class="lg:hidden text-slate-400 hover:text-white"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="px-4 py-6 space-y-2">
        <NuxtLink
          to="/stall/get-started"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
          :class="
            $route.name === 'stall-get-started-settings' ||
            $route.name === 'stall-get-started-menu' ||
            $route.name === 'stall-get-started-payment-method-options' ||
            $route.name === 'stall-get-started-payment-method-options' ||
            $route.name === 'stall-get-started-payment-method-tables' ||
            $route.name === 'stall-get-started'
              ? 'bg-slate-700 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
            ></path>
          </svg>
          GET STARTED
        </NuxtLink>
        <NuxtLink
          to="/owner/dashboard"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
          :class="
            $route.name === 'stall-dashboard'
              ? 'bg-slate-700 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
            ></path>
          </svg>
          Dashboard
        </NuxtLink>

        <NuxtLink
          to="/stall/stalls"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
          :class="
            $route.name?.startsWith('stall-stalls')
              ? 'bg-slate-700 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
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
          Stalls Management
        </NuxtLink>

        <NuxtLink
          to="/stall/menu-management"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
          :class="
            $route.name?.startsWith('stall-menu')
              ? 'bg-slate-700 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
          Menu Items
        </NuxtLink>

        <NuxtLink
          to="/stall/orders"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
          :class="
            $route.name?.startsWith('stall-orders')
              ? 'bg-slate-700 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
          </svg>
          Orders
        </NuxtLink>

        <NuxtLink
          to="/stall/users-stalls"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
          :class="
            $route.name?.startsWith('stall-users-stalls')
              ? 'bg-slate-700 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            ></path>
          </svg>
          Users Stalls Management
        </NuxtLink>

        <NuxtLink
          to="/stall/analytics"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
          :class="
            $route.name?.startsWith('stall-analytics')
              ? 'bg-slate-700 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
          Analytics
        </NuxtLink>

        <NuxtLink
          to="/stall/settings"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
          :class="
            $route.name?.startsWith('stall-settings')
              ? 'bg-slate-700 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          Settings
        </NuxtLink>
      </nav>

      <!-- User Profile Section -->
      <div
        class="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-slate-300"
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
          <div class="flex-1">
            <p class="text-sm font-medium text-white">
              {{ activeMerchant.merchantName }}
            </p>
            <p class="text-xs text-slate-400">{{ activeMerchant.role }}</p>
          </div>
        </div>
        <button
          @click="handleLogout"
          class="w-full mt-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <svg
            class="w-4 h-4 mr-2"
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
          Logout
        </button>
      </div>
    </aside>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
    ></div>

    <!-- Main Content Area -->
    <div class="lg:pl-64">
      <!-- Top Header -->
      <header
        class="sticky top-0 z-30 bg-slate-800 border-b border-slate-700 px-6 py-4"
      >
        <div class="flex items-center justify-between">
          <!-- Mobile Menu Button -->
          <button
            @click="sidebarOpen = true"
            class="lg:hidden text-slate-400 hover:text-white"
          >
            <svg
              class="w-6 h-6"
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

          <!-- Page Title -->
          <div class="flex-1 lg:flex-none">
            <h1 class="text-xl font-semibold text-white ml-4 lg:ml-0">
              {{ pageTitle }}
            </h1>
          </div>

          <!-- Header Actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="relative text-slate-400 hover:text-white">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-5-5h5l-5-5H9l5 5-5 5z"
                ></path>
              </svg>
              <span
                class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
              ></span>
            </button>

            <!-- Date Filter (can be customized per page) -->
            <input
              type="date"
              class="bg-slate-700 border border-slate-600 text-white px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              :value="currentDate"
              @input="updateDate($event.target.value)"
            />
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main
        class="p-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAuth } from "~/composables/useAuth"

const route = useRoute()
const router = useRouter()
const { admin, dataAuth, logout, activeMerchant } = useAuth()
const sidebarOpen = ref(false)
const currentDate = ref(new Date().toISOString().substring(0, 10))

// Compute page title based on current route
const pageTitle = computed(() => {
  const routeMap = {
    "stall-get-started": "Get Started",
    "stall-get-started-menu": "Get Started Menu",
    "stall-get-started-settings": "Get Started Settings",
    "stall-dashboard": "Dashboard",
    "stall-stalls": "Stalls Management",
    "stall-stalls-id": "Stall Details",
    "stall-menu-management": "Menu Items",
    "stall-menu-create": "Add Menu Item",
    "stall-menu-id": "Edit Menu Item",
    "stall-orders": "Orders",
    "stall-orders-id": "Order Details",
    "stall-users": "Users Management",
    "stall-analytics": "Analytics",
    "stall-settings": "Settings",
  }

  return routeMap[route.name] || "Owner Dashboard"
})
useMeta({
  title: pageTitle,
})
// Close sidebar when clicking outside on mobile
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      sidebarOpen.value = false
    }
  }

  window.addEventListener("resize", handleResize)

  // Cleanup
  return () => {
    window.removeEventListener("resize", handleResize)
  }
})

// Functions
const updateDate = (date) => {
  currentDate.value = date
  // Emit event or call parent method to update filters
  // You can customize this based on your needs
}

const handleLogout = () => {
  // Handle logout logic
  logout()
  window.location.href = "/"
}
</script>
