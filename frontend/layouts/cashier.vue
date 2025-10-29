<!-- layouts/cashier.vue -->
<template>
  <div class="min-h-screen flex bg-slate-900 text-white">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-800 p-4 space-y-4">
      <h1 class="text-xl font-bold mb-6">☕ POS Cashier</h1>
      <nav class="flex flex-col space-y-2">
        <NuxtLink
          to="/cashier/dashboard"
          class="px-4 py-2 rounded hover:bg-slate-700 transition"
          >📋 Dashboard</NuxtLink
        >
        <NuxtLink
          to="/cashier/sales"
          class="px-4 py-2 rounded hover:bg-slate-700 transition"
          >📊 Sales Summary</NuxtLink
        >
        <NuxtLink
          to="/cashier/menu"
          class="px-4 py-2 rounded hover:bg-slate-700 transition"
          >🍽 Menu Manager</NuxtLink
        >
        <NuxtLink
          to="/cashier/orders/new"
          class="px-4 py-2 rounded hover:bg-slate-700 transition"
          >➕ Manual Order</NuxtLink
        >
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
