<!-- pages/payment/[orderId].vue -->
<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Payment Successful</h1>
      <p class="text-lg text-slate-400 mb-8">
        Your payment has been processed successfully.
      </p>
      <NuxtLink
        to="/pos/dashboard"
        class="text-emerald-400 underline hover:text-emerald-300"
      >
        ← Back to Dashboard
      </NuxtLink>
    </div>
  </div>
</template>
