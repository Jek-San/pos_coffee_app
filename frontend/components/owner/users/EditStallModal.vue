<!-- components/admin/EditOperatorModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md"
    >
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-white">Edit Operator</h3>
          <button @click="closeModal" class="text-slate-400 hover:text-white">
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

        <form @submit.prevent="updateOperator" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>
            <input
              v-model="editForm.name"
              type="text"
              required
              class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter operator's full name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <input
              v-model="editForm.email"
              type="email"
              required
              class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="operator@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Assign to Stall
            </label>
            <select
              v-model="editForm.stallId"
              class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No assignment</option>
              <option
                v-for="stall in availableStalls"
                :key="stall.id"
                :value="stall.id"
              >
                {{ stall.name }} - {{ stall.category }}
              </option>
            </select>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-2 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  stall: {
    type: Object,
    default: () => ({}),
  },
  availableStalls: {
    type: Array,
    required: true,
  },
})

// Emits
const emit = defineEmits(["close", "operator-updated"])

// Reactive data
const editForm = ref({})

// Methods
const closeModal = () => {
  // Reset form
  editForm.value = {}

  emit("close")
}

const updateOperator = () => {
  const operatorData = {
    id: editForm.value.id,
    name: editForm.value.name,
    email: editForm.value.email,
    stallId: editForm.value.stallId || null,
  }

  emit("operator-updated", operatorData)
  closeModal()
}

// Watch for operator prop changes to populate form
watch(
  () => props.stall,
  (newOperator) => {
    if (newOperator && props.show) {
      editForm.value = {
        id: newOperator.id || "",
        name: newOperator.name || "",
        email: newOperator.email || "",
        stallId: newOperator.stallId || "",
      }
    }
  },
  { immediate: true }
)

// Watch for modal opening to populate form
watch(
  () => props.show,
  (newValue) => {
    if (newValue && props.operator) {
      editForm.value = {
        id: props.operator.id || "",
        name: props.operator.name || "",
        email: props.operator.email || "",
        stallId: props.operator.stallId || "",
      }
    }
  }
)
</script>
