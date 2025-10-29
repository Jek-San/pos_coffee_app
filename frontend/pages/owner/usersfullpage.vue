<!-- pages/owner/users.vue -->
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-white mb-2">Stall Operators</h1>
        <p class="text-slate-400">
          Manage stall operator accounts and permissions
        </p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Add New Operator
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Total Operators</p>
            <p class="text-2xl font-bold text-white">{{ stats.total }}</p>
          </div>
          <div
            class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-blue-400"
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
        </div>
      </div>

      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Active Accounts</p>
            <p class="text-2xl font-bold text-green-400">{{ stats.active }}</p>
          </div>
          <div
            class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Inactive Accounts</p>
            <p class="text-2xl font-bold text-red-400">{{ stats.inactive }}</p>
          </div>
          <div
            class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Unassigned</p>
            <p class="text-2xl font-bold text-yellow-400">
              {{ stats.unassigned }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-yellow-400"
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
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search operators by name or email..."
            class="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex gap-3">
          <select
            v-model="statusFilter"
            class="bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            v-model="stallFilter"
            class="bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Stalls</option>
            <option value="unassigned">Unassigned</option>
            <option
              v-for="stall in availableStalls"
              :key="stall.id"
              :value="stall.id"
            >
              {{ stall.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Operators Table -->
    <div
      class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
    >
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
              v-for="operator in filteredOperators"
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
                    @click="editOperator(operator)"
                    class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    @click="resetPassword(operator)"
                    class="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors duration-200"
                  >
                    Reset Password
                  </button>
                  <button
                    @click="toggleOperatorStatus(operator)"
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

    <!-- Add Operator Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-white">Add New Operator</h3>
            <button
              @click="closeAddModal"
              class="text-slate-400 hover:text-white"
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

          <form @submit.prevent="addOperator" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2"
                >Full Name</label
              >
              <input
                v-model="newOperator.name"
                type="text"
                required
                @input="generateAutoEmail"
                class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter operator's full name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2"
                >Assign to Stall</label
              >
              <select
                v-model="newOperator.stallId"
                @change="generateAutoEmail"
                class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No assignment (can assign later)</option>
                <option
                  v-for="stall in availableStalls"
                  :key="stall.id"
                  :value="stall.id"
                >
                  {{ stall.name }} - {{ stall.category }}
                </option>
              </select>
            </div>

            <!-- Auto-Generated Email Preview -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">
                Auto-Generated Email
                <span class="text-green-400 text-xs"
                  >(automatically created)</span
                >
              </label>
              <div class="relative">
                <input
                  :value="autoGeneratedEmail"
                  type="email"
                  readonly
                  class="w-full bg-slate-600 border border-slate-500 text-slate-300 px-3 py-2 rounded-lg cursor-not-allowed"
                  placeholder="Email will be generated automatically..."
                />
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <svg
                    class="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
              </div>
              <p class="text-xs text-slate-400 mt-1">
                Based on stall name and merchant domain
              </p>
            </div>

            <!-- Auto-Generated Password Preview -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">
                Auto-Generated Password
                <span class="text-green-400 text-xs"
                  >(secure random password)</span
                >
              </label>
              <div class="relative">
                <input
                  :value="autoGeneratedPassword"
                  :type="showPassword ? 'text' : 'password'"
                  readonly
                  class="w-full bg-slate-600 border border-slate-500 text-slate-300 px-3 py-2 pr-20 rounded-lg cursor-not-allowed"
                  placeholder="Password will be generated automatically..."
                />
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2"
                >
                  <button
                    type="button"
                    @click="generateNewPassword"
                    class="text-blue-400 hover:text-blue-300"
                    title="Generate new password"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="text-slate-400 hover:text-white"
                  >
                    <svg
                      v-if="showPassword"
                      class="w-4 h-4"
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
                    <svg
                      v-else
                      class="w-4 h-4"
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
                  </button>
                </div>
              </div>
              <p class="text-xs text-slate-400 mt-1">
                Operator will be asked to change this password on first login
              </p>
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="button"
                @click="closeAddModal"
                class="flex-1 px-4 py-2 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="!autoGeneratedEmail || !autoGeneratedPassword"
                class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Modal with Credentials -->
    <div
      v-if="showCredentialsModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-lg"
      >
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">
                Account Created Successfully!
              </h3>
              <p class="text-slate-400">
                Share these credentials with the operator
              </p>
            </div>
          </div>

          <div class="bg-slate-700 rounded-lg p-4 space-y-3">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1"
                >Operator Name</label
              >
              <div
                class="flex items-center justify-between bg-slate-600 rounded px-3 py-2"
              >
                <span class="text-white">{{ createdOperator.name }}</span>
                <button
                  @click="copyToClipboard(createdOperator.name)"
                  class="text-slate-400 hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1"
                >Login Email</label
              >
              <div
                class="flex items-center justify-between bg-slate-600 rounded px-3 py-2"
              >
                <span class="text-white">{{ createdOperator.email }}</span>
                <button
                  @click="copyToClipboard(createdOperator.email)"
                  class="text-slate-400 hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1"
                >Temporary Password</label
              >
              <div
                class="flex items-center justify-between bg-slate-600 rounded px-3 py-2"
              >
                <span class="text-white font-mono">{{
                  createdOperator.password
                }}</span>
                <button
                  @click="copyToClipboard(createdOperator.password)"
                  class="text-slate-400 hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div v-if="createdOperator.stallName">
              <label class="block text-sm font-medium text-slate-300 mb-1"
                >Assigned Stall</label
              >
              <div class="bg-slate-600 rounded px-3 py-2">
                <span class="text-white">{{ createdOperator.stallName }}</span>
              </div>
            </div>
          </div>

          <div
            class="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-4"
          >
            <p class="text-blue-300 text-sm">
              📱 The operator will be asked to change their password on first
              login for security.
            </p>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              @click="printCredentials"
              class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                ></path>
              </svg>
              Print Credentials
            </button>
            <button
              @click="shareCredentials"
              class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                ></path>
              </svg>
              Share Credentials
            </button>
            <button
              @click="closeCredentialsModal"
              class="px-4 py-2 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors duration-200"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Operator Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-white">Edit Operator</h3>
            <button
              @click="closeEditModal"
              class="text-slate-400 hover:text-white"
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

          <form @submit.prevent="updateOperator" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2"
                >Full Name</label
              >
              <input
                v-model="editingOperator.name"
                type="text"
                required
                class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter operator's full name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2"
                >Email Address</label
              >
              <input
                v-model="editingOperator.email"
                type="email"
                required
                class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="operator@example.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2"
                >Assign to Stall</label
              >
              <select
                v-model="editingOperator.stallId"
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
                @click="closeEditModal"
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
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

// Define page meta for layout
definePageMeta({
  layout: "owner",
})

// Reactive data
const searchQuery = ref("")
const statusFilter = ref("")
const stallFilter = ref("")
const showAddModal = ref(false)
const showEditModal = ref(false)
const showCredentialsModal = ref(false)
const showPassword = ref(false)

// Merchant info (this would come from auth/store)
const merchantInfo = ref({
  domain: "grandcentralmarket", // This would be dynamic
  name: "Grand Central Market",
})

// Stats data
const stats = ref({
  total: 8,
  active: 6,
  inactive: 2,
  unassigned: 1,
})

// Form data
const newOperator = ref({
  name: "",
  stallId: "",
})

const editingOperator = ref({
  id: "",
  name: "",
  email: "",
  stallId: "",
})

const createdOperator = ref({
  name: "",
  email: "",
  password: "",
  stallName: "",
})

// Auto-generated credentials
const autoGeneratedEmail = ref("")
const autoGeneratedPassword = ref("")

// Available stalls (this would come from API)
const availableStalls = ref([
  { id: "ST001", name: "Coffee Corner", category: "Coffee & Beverages" },
  { id: "ST002", name: "Nasi Padang Sederhana", category: "Asian Food" },
  { id: "ST003", name: "Burger Palace", category: "Western Food" },
  { id: "ST004", name: "Healthy Bowl", category: "Healthy Food" },
  { id: "ST005", name: "Sweet Treats", category: "Snacks & Desserts" },
  { id: "ST006", name: "Ramen House", category: "Asian Food" },
])

// Sample operators data
const operators = ref([
  {
    id: "OP001",
    name: "John Smith",
    email: "coffee-corner@grandcentralmarket.pos",
    status: "Active",
    assignedStall: { id: "ST001", name: "Coffee Corner" },
    lastLogin: new Date("2024-01-10"),
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "OP002",
    name: "Siti Aminah",
    email: "nasi-padang-sederhana@grandcentralmarket.pos",
    status: "Active",
    assignedStall: { id: "ST002", name: "Nasi Padang Sederhana" },
    lastLogin: new Date("2024-01-09"),
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "OP003",
    name: "Mike Johnson",
    email: "burger-palace@grandcentralmarket.pos",
    status: "Active",
    assignedStall: { id: "ST003", name: "Burger Palace" },
    lastLogin: new Date("2024-01-08"),
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "OP004",
    name: "Sarah Wilson",
    email: "healthy-bowl@grandcentralmarket.pos",
    status: "Inactive",
    assignedStall: { id: "ST004", name: "Healthy Bowl" },
    lastLogin: new Date("2024-01-05"),
    createdAt: new Date("2024-01-04"),
  },
  {
    id: "OP005",
    name: "Lisa Chen",
    email: "sweet-treats@grandcentralmarket.pos",
    status: "Active",
    assignedStall: { id: "ST005", name: "Sweet Treats" },
    lastLogin: new Date("2024-01-07"),
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "OP006",
    name: "Tanaka Hiroshi",
    email: "ramen-house@grandcentralmarket.pos",
    status: "Inactive",
    assignedStall: { id: "ST006", name: "Ramen House" },
    lastLogin: null,
    createdAt: new Date("2024-01-06"),
  },
  {
    id: "OP007",
    name: "Ahmad Rahman",
    email: "operator-007@grandcentralmarket.pos",
    status: "Active",
    assignedStall: null,
    lastLogin: new Date("2024-01-06"),
    createdAt: new Date("2024-01-07"),
  },
  {
    id: "OP008",
    name: "Maria Santos",
    email: "operator-008@grandcentralmarket.pos",
    status: "Active",
    assignedStall: null,
    lastLogin: null,
    createdAt: new Date("2024-01-08"),
  },
])

// Computed properties
const filteredOperators = computed(() => {
  return operators.value.filter((operator) => {
    const matchesSearch =
      !searchQuery.value ||
      operator.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus =
      !statusFilter.value || operator.status === statusFilter.value

    const matchesStall = (() => {
      if (!stallFilter.value) return true
      if (stallFilter.value === "unassigned") return !operator.assignedStall
      return operator.assignedStall?.id === stallFilter.value
    })()

    return matchesSearch && matchesStatus && matchesStall
  })
})

// Auto-generation methods
const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim("-") // Remove leading/trailing hyphens
}

const generateSecurePassword = () => {
  const length = 12
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  let password = ""

  // Ensure at least one of each type
  const lower = "abcdefghijklmnopqrstuvwxyz"
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*"

  password += lower[Math.floor(Math.random() * lower.length)]
  password += upper[Math.floor(Math.random() * upper.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)]
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
}

const generateAutoEmail = () => {
  if (!newOperator.value.name && !newOperator.value.stallId) {
    autoGeneratedEmail.value = ""
    return
  }

  let emailPrefix = ""

  if (newOperator.value.stallId) {
    // Use stall name for email prefix
    const stall = availableStalls.value.find(
      (s) => s.id === newOperator.value.stallId
    )
    if (stall) {
      emailPrefix = slugify(stall.name)
    }
  } else if (newOperator.value.name) {
    // Use operator name if no stall assigned
    emailPrefix = slugify(newOperator.value.name)
  }

  // Fallback to operator ID format
  if (!emailPrefix) {
    const nextId = String(operators.value.length + 1).padStart(3, "0")
    emailPrefix = `operator-${nextId}`
  }

  autoGeneratedEmail.value = `${emailPrefix}@${merchantInfo.value.domain}.pos`
}

const generateNewPassword = () => {
  autoGeneratedPassword.value = generateSecurePassword()
}

// Initialize auto-generation when modal opens
const initializeAutoGeneration = () => {
  generateNewPassword()
  generateAutoEmail()
}

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

const closeAddModal = () => {
  showAddModal.value = false
  newOperator.value = {
    name: "",
    stallId: "",
  }
  autoGeneratedEmail.value = ""
  autoGeneratedPassword.value = ""
  showPassword.value = false
}

const closeEditModal = () => {
  showEditModal.value = false
  editingOperator.value = {
    id: "",
    name: "",
    email: "",
    stallId: "",
  }
}

const closeCredentialsModal = () => {
  showCredentialsModal.value = false
  createdOperator.value = {
    name: "",
    email: "",
    password: "",
    stallName: "",
  }
}

const addOperator = async () => {
  try {
    // Generate new operator ID
    const newId = `OP${String(operators.value.length + 1).padStart(3, "0")}`

    // Find assigned stall if any
    const assignedStall = newOperator.value.stallId
      ? availableStalls.value.find(
          (stall) => stall.id === newOperator.value.stallId
        )
      : null

    // Create new operator
    const operator = {
      id: newId,
      name: newOperator.value.name,
      email: autoGeneratedEmail.value,
      status: "Active",
      assignedStall: assignedStall
        ? { id: assignedStall.id, name: assignedStall.name }
        : null,
      lastLogin: null,
      createdAt: new Date(),
    }

    operators.value.push(operator)

    // Update stats
    stats.value.total++
    stats.value.active++
    if (!assignedStall) stats.value.unassigned++

    // Store created operator details for display
    createdOperator.value = {
      name: newOperator.value.name,
      email: autoGeneratedEmail.value,
      password: autoGeneratedPassword.value,
      stallName: assignedStall?.name || "",
    }

    // In real app, you would make API call:
    // await $fetch('/api/operators', {
    //   method: 'POST',
    //   body: {
    //     name: newOperator.value.name,
    //     email: autoGeneratedEmail.value,
    //     password: autoGeneratedPassword.value,
    //     stallId: newOperator.value.stallId || null,
    //     role: 'STALL_OWNER'
    //   }
    // })

    console.log("Creating operator account:", {
      name: newOperator.value.name,
      email: autoGeneratedEmail.value,
      password: autoGeneratedPassword.value,
      stallId: newOperator.value.stallId,
      role: "STALL_OWNER",
    })

    closeAddModal()
    showCredentialsModal.value = true
  } catch (error) {
    console.error("Error creating operator:", error)
    // Handle error (show toast notification, etc.)
  }
}

const editOperator = (operator) => {
  editingOperator.value = {
    id: operator.id,
    name: operator.name,
    email: operator.email,
    stallId: operator.assignedStall?.id || "",
  }
  showEditModal.value = true
}

const updateOperator = async () => {
  try {
    // Find the operator to update
    const operatorIndex = operators.value.findIndex(
      (op) => op.id === editingOperator.value.id
    )

    if (operatorIndex === -1) return

    // Find assigned stall if any
    const assignedStall = editingOperator.value.stallId
      ? availableStalls.value.find(
          (stall) => stall.id === editingOperator.value.stallId
        )
      : null

    // Update operator
    operators.value[operatorIndex] = {
      ...operators.value[operatorIndex],
      name: editingOperator.value.name,
      email: editingOperator.value.email,
      assignedStall: assignedStall
        ? { id: assignedStall.id, name: assignedStall.name }
        : null,
    }

    // In real app, you would make API call:
    // await $fetch(`/api/operators/${editingOperator.value.id}`, {
    //   method: 'PUT',
    //   body: {
    //     name: editingOperator.value.name,
    //     email: editingOperator.value.email,
    //     stallId: editingOperator.value.stallId || null,
    //   }
    // })

    console.log("Updating operator:", editingOperator.value)

    closeEditModal()
  } catch (error) {
    console.error("Error updating operator:", error)
    // Handle error (show toast notification, etc.)
  }
}

const toggleOperatorStatus = async (operator) => {
  try {
    const newStatus = operator.status === "Active" ? "Inactive" : "Active"
    operator.status = newStatus

    // Update stats
    if (newStatus === "Active") {
      stats.value.active++
      stats.value.inactive--
    } else {
      stats.value.active--
      stats.value.inactive++
    }

    // In real app, you would make API call:
    // await $fetch(`/api/operators/${operator.id}/status`, {
    //   method: 'PATCH',
    //   body: { status: newStatus }
    // })

    console.log(`Operator ${operator.id} status changed to:`, newStatus)
  } catch (error) {
    console.error("Error toggling operator status:", error)
    // Revert the change
    operator.status = operator.status === "Active" ? "Inactive" : "Active"
  }
}

const resetPassword = async (operator) => {
  try {
    // Generate new secure password
    const newPassword = generateSecurePassword()

    // In real app, you would make API call:
    // const response = await $fetch(`/api/operators/${operator.id}/reset-password`, {
    //   method: 'POST'
    // })

    console.log(`Password reset for ${operator.email}:`, {
      operatorId: operator.id,
      tempPassword: newPassword,
      message:
        "New temporary password generated. Operator will be notified via email.",
    })

    // Store in createdOperator for credentials modal
    createdOperator.value = {
      name: operator.name,
      email: operator.email,
      password: newPassword,
      stallName: operator.assignedStall?.name || "",
    }

    showCredentialsModal.value = true
  } catch (error) {
    console.error("Error resetting password:", error)
    // Handle error (show toast notification, etc.)
  }
}

// Credential sharing methods
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // In real app, show toast notification
    console.log("Copied to clipboard:", text)
  } catch (error) {
    console.error("Failed to copy:", error)
  }
}

const printCredentials = () => {
  const printWindow = window.open("", "_blank")
  const credentials = createdOperator.value

  printWindow.document.write(`
    <html>
      <head>
        <title>Stall Operator Credentials</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .credential-card { border: 2px solid #333; border-radius: 8px; padding: 20px; max-width: 400px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #666; }
          .value { font-size: 18px; margin-top: 5px; }
          .password { font-family: monospace; font-size: 16px; }
          .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="credential-card">
          <div class="header">
            <h2>${merchantInfo.value.name}</h2>
            <h3>Stall Operator Login Credentials</h3>
          </div>
          
          <div class="field">
            <div class="label">Operator Name:</div>
            <div class="value">${credentials.name}</div>
          </div>
          
          <div class="field">
            <div class="label">Login Email:</div>
            <div class="value">${credentials.email}</div>
          </div>
          
          <div class="field">
            <div class="label">Temporary Password:</div>
            <div class="value password">${credentials.password}</div>
          </div>
          
          ${
            credentials.stallName
              ? `
          <div class="field">
            <div class="label">Assigned Stall:</div>
            <div class="value">${credentials.stallName}</div>
          </div>
          `
              : ""
          }
          
          <div class="footer">
            <p>⚠️ Please change your password after first login</p>
            <p>Generated on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.print()
}

const shareCredentials = () => {
  const credentials = createdOperator.value
  const message = `
🏪 ${merchantInfo.value.name} - Stall Operator Login

👤 Name: ${credentials.name}
📧 Email: ${credentials.email}
🔐 Password: ${credentials.password}
${credentials.stallName ? `🏭 Stall: ${credentials.stallName}` : ""}

⚠️ Please change your password after first login.
  `.trim()

  if (navigator.share) {
    navigator.share({
      title: "Stall Operator Credentials",
      text: message,
    })
  } else {
    // Fallback - copy to clipboard
    copyToClipboard(message)
    alert("Credentials copied to clipboard!")
  }
}

// Watch for modal opening to initialize auto-generation
const openAddModal = () => {
  showAddModal.value = true
  initializeAutoGeneration()
}

// Override the button click to use our custom method
// Update the template to use @click="openAddModal" instead of @click="showAddModal = true"
</script>
