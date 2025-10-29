<!-- components/admin/OperatorsTable.vue -->
<template>
  <div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-slate-700">
          <tr>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
            >
              Operator
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
            >
              Assigned Stall
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
            >
              Last Login
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
            >
              Created
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-700">
          <tr
            v-for="operator in operators"
            :key="operator.id"
            class="hover:bg-slate-700/50 transition-colors duration-200"
          >
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div
                  class="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-medium">
                    {{ getInitials(operator.name || operator.email) }}
                  </span>
                </div>
                <div class="ml-3">
                  <p class="text-white font-medium">
                    {{ operator.name || "No Name" }}
                  </p>
                  <p class="text-slate-400 text-sm">{{ operator.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="operator.assignedStall">
                <p class="text-white font-medium">
                  {{ operator.assignedStall.name }}
                </p>
                <p class="text-slate-400 text-sm">
                  #{{ operator.assignedStall.id }}
                </p>
              </div>
              <span v-else class="text-yellow-400 text-sm">Unassigned</span>
            </td>
            <td class="px-6 py-4">
              <span
                :class="getStatusColor(operator.status)"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ operator.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-slate-400 text-sm">
              {{
                operator.lastLogin ? formatDate(operator.lastLogin) : "Never"
              }}
            </td>
            <td class="px-6 py-4 text-slate-400 text-sm">
              {{ formatDate(operator.createdAt) }}
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button
                  @click="$emit('edit-operator', operator)"
                  class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  @click="$emit('reset-password', operator)"
                  class="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors duration-200"
                >
                  Reset Password
                </button>
                <button
                  @click="$emit('toggle-status', operator)"
                  :class="
                    operator.status === 'Active'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                  "
                  class="px-3 py-1 text-white text-sm rounded transition-colors duration-200"
                >
                  {{ operator.status === "Active" ? "Disable" : "Enable" }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  operators: {
    type: Array,
    required: true,
  },
  availableStalls: {
    type: Array,
    required: true,
  },
})

// Emits
defineEmits(["edit-operator", "reset-password", "toggle-status"])

// Methods
const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2)
}

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-500/20 text-green-400"
    case "Inactive":
      return "bg-red-500/20 text-red-400"
    default:
      return "bg-slate-500/20 text-slate-400"
  }
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}
</script>
