<template>
  <section class="min-h-screen bg-[#0d1117] text-white px-4 py-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold text-cyan-400">
        Welcome to {{ cafeName }}
      </h1>
      <p class="text-lg mt-2">
        You're ordering from
        <span class="font-semibold">Table #{{ tableId }}</span>
      </p>
    </div>

    <!-- Menu Filter Tabs -->
    <div class="flex justify-center gap-4 mb-6 flex-wrap">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        class="px-4 py-2 rounded-full"
        :class="{
          'bg-cyan-600 text-white': selectedCategory === cat,
          'bg-slate-700 text-gray-300': selectedCategory !== cat,
        }"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Menu Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="item in filteredMenu"
        :key="item.id"
        class="bg-slate-800 rounded-xl p-4 shadow"
      >
        <img
          :src="item.image"
          alt=""
          class="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h2 class="text-xl font-semibold">{{ item.name }}</h2>
        <p class="text-sm text-gray-400 mb-2">{{ item.description }}</p>
        <p class="text-cyan-400 font-bold mb-4">
          Rp{{ item.price.toLocaleString() }}
        </p>
        <div class="flex items-center justify-between">
          <button
            @click="decreaseQty(item)"
            class="w-8 h-8 bg-slate-700 rounded-full text-white text-lg"
          >
            −
          </button>
          <span>{{ cart[item.id]?.qty || 0 }}</span>
          <button
            @click="increaseQty(item)"
            class="w-8 h-8 bg-cyan-500 rounded-full text-white text-lg"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Cart Bar -->
    <div
      v-if="cartItemCount > 0"
      class="fixed bottom-4 inset-x-4 bg-cyan-600 text-white rounded-xl flex justify-between items-center px-6 py-3 shadow-lg"
    >
      <p>{{ cartItemCount }} item(s) • Rp{{ cartTotal.toLocaleString() }}</p>
      <button
        @click="showReview = true"
        class="bg-white text-cyan-700 font-bold px-4 py-2 rounded-lg"
      >
        🧾 Review Order
      </button>
    </div>

    <!-- Review Modal -->
    <div
      v-if="showReview"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div class="bg-slate-900 rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 class="text-xl font-bold text-cyan-400 mb-2">Order Summary</h2>

        <ul class="space-y-2 max-h-64 overflow-y-auto">
          <li
            v-for="(entry, id) in cart"
            :key="id"
            class="flex justify-between"
          >
            <span>{{ entry.qty }}x {{ entry.item.name }}</span>
            <span>Rp{{ (entry.item.price * entry.qty).toLocaleString() }}</span>
          </li>
        </ul>

        <textarea
          v-model="note"
          placeholder="Add note (e.g. no sugar)"
          class="w-full p-2 rounded bg-slate-700 text-white"
        />

        <div class="flex justify-between mt-4">
          <button @click="showReview = false" class="text-gray-300">
            ❌ Cancel
          </button>
          <button
            @click="submitOrder"
            class="bg-cyan-500 text-white px-4 py-2 rounded"
          >
            ✅ Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Success Dialog -->
    <div
      v-if="orderSuccess"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div class="bg-green-700 text-white p-6 rounded-xl text-center space-y-4">
        <h2 class="text-2xl font-bold">🎉 Order Sent!</h2>
        <p>Thank you. Your order has been received and is being prepared.</p>
        <button
          @click="resetPage"
          class="bg-white text-green-700 px-4 py-2 rounded"
        >
          Order More
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const tableId = route.params.id
const cafeSlug = route.params.merchantSlug
const cafeName = "Jekk Coffee"

// Mock menu data (replace with API call later)
const menu = ref([
  {
    id: 1,
    name: "Cappuccino",
    description: "Espresso with milk foam",
    price: 15000,
    image: "/coffee1.jpg",
    category: "Coffee",
  },
  {
    id: 2,
    name: "Americano",
    description: "Espresso with hot water",
    price: 13000,
    image: "/coffee2.jpg",
    category: "Coffee",
  },
  {
    id: 3,
    name: "Brownies",
    description: "Rich chocolate cake",
    price: 12000,
    image: "/brownie.jpg",
    category: "Snacks",
  },
])

const categories = ["All", ...new Set(menu.value.map((m) => m.category))]
const selectedCategory = ref("All")

const filteredMenu = computed(() =>
  selectedCategory.value === "All"
    ? menu.value
    : menu.value.filter((item) => item.category === selectedCategory.value)
)

const cart = ref({})
const showReview = ref(false)
const orderSuccess = ref(false)
const note = ref("")

const increaseQty = (item) => {
  if (!cart.value[item.id]) {
    cart.value[item.id] = { item, qty: 1 }
  } else {
    cart.value[item.id].qty++
  }
}

const decreaseQty = (item) => {
  if (cart.value[item.id]) {
    cart.value[item.id].qty--
    if (cart.value[item.id].qty <= 0) {
      delete cart.value[item.id]
    }
  }
}

const cartItemCount = computed(() =>
  Object.values(cart.value).reduce((sum, entry) => sum + entry.qty, 0)
)

const cartTotal = computed(() =>
  Object.values(cart.value).reduce(
    (sum, entry) => sum + entry.qty * entry.item.price,
    0
  )
)

const submitOrder = async () => {
  const payload = {
    tableId: parseInt(tableId),
    items: Object.values(cart.value).map((entry) => ({
      id: entry.item.id,
      qty: entry.qty,
    })),
    note: note.value,
  }

  try {
    // TODO: Replace with real backend API call
    console.log("Order payload:", payload)
    showReview.value = false
    orderSuccess.value = true
  } catch (err) {
    alert("Failed to submit order!")
  }
}

const resetPage = () => {
  cart.value = {}
  orderSuccess.value = false
  note.value = ""
}
</script>
