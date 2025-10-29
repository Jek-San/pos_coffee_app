<!-- pages/cashier/dashboard.vue -->
<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">📋 Live Orders</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <OrderCard
        v-for="order in orders"
        :key="order.id"
        :order="order"
        @click="goToOrder(order.id)"
      />
    </div>
  </div>
</template>

<script setup>
const orders = await $fetch("/api/orders?status=new")
const router = useRouter()
const goToOrder = (id) => router.push(`/cashier/orders/${id}`)
</script>
