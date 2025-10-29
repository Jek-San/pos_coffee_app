<!-- pages/cust/orders/[id]/payment.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-ping"
      ></div>
    </div>

    <!-- Glassmorphism Header -->
    <div
      class="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50 shadow-2xl"
    >
      <div class="flex items-center justify-between p-6">
        <div class="flex items-center gap-4">
          <button
            @click="$router.go(-1)"
            class="group w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
          >
            <span class="text-xl group-hover:text-cyan-400 transition-colors"
              >←</span
            >
          </button>
          <div class="relative">
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              Pembayaran
            </h1>
            <p class="text-sm text-gray-300 mt-1">
              Pesanan #{{ order?.id?.slice(-6) }}
            </p>
            <div
              class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"
            ></div>
          </div>
        </div>

        <!-- Status Indicator -->
        <div
          class="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30"
        >
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-sm text-green-300 font-medium">Aktif</span>
        </div>
      </div>
    </div>

    <div class="p-6 relative z-10">
      <!-- Loading State with Premium Animation -->
      <div v-if="loading" class="text-center py-20">
        <div class="relative inline-block">
          <div
            class="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-6"
          ></div>
          <div
            class="absolute inset-0 w-16 h-16 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin animate-reverse m-2"
          ></div>
        </div>
        <h3 class="text-xl font-semibold text-gray-200 mb-2">
          Memuat detail pembayaran...
        </h3>
        <p class="text-gray-400">Mohon tunggu sebentar</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="relative inline-block mb-6">
          <div class="text-6xl filter drop-shadow-lg">❌</div>
          <div class="absolute inset-0 text-6xl animate-ping opacity-30">
            ❌
          </div>
        </div>
        <h3 class="text-xl font-semibold text-gray-200 mb-2">
          Pesanan tidak ditemukan
        </h3>
        <p class="text-sm text-gray-400 mb-8">
          Pesanan ini mungkin telah dihapus atau tidak ada
        </p>
        <button
          @click="$router.push('/cust/my-orders')"
          class="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 px-8 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          <span class="relative z-10">Kembali ke Pesanan</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          ></div>
        </button>
      </div>

      <!-- Payment Form -->
      <div v-else-if="order" class="space-y-6">
        <!-- Premium Order Summary Card -->
        <div
          class="group relative overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-2xl"
        >
          <!-- Decorative corner elements -->
          <div
            class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-full blur-xl"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-xl"
          ></div>

          <h2
            class="text-xl font-bold mb-6 flex items-center gap-3 relative z-10"
          >
            <div
              class="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <span class="text-lg">📋</span>
            </div>
            <span
              class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              Ringkasan Pesanan
            </span>
          </h2>

          <div class="flex items-center gap-4 mb-6 relative z-10">
            <div
              class="w-14 h-14 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse"
            >
              <span class="text-xl">🍽️</span>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-white">
                {{ order.customerName }}
              </h3>
              <p class="text-sm text-gray-300 flex items-center gap-2">
                <span class="w-2 h-2 bg-cyan-400 rounded-full"></span>
                {{ order.table.name }} • {{ order.merchant.name }}
              </p>
            </div>
            <div class="text-right">
              <p
                class="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
              >
                Rp{{ order.totalAmount.toLocaleString() }}
              </p>
              <p class="text-sm text-gray-400 flex items-center gap-1">
                <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                {{ order.items.length }} item
              </p>
            </div>
          </div>

          <!-- Enhanced Payment Breakdown -->
          <div
            class="bg-gradient-to-r from-slate-700/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-4 text-sm space-y-3 border border-white/5"
          >
            <div class="flex justify-between items-center">
              <span class="text-gray-300 flex items-center gap-2">
                <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                Subtotal:
              </span>
              <span class="font-medium"
                >Rp{{ order.subtotal.toLocaleString() }}</span
              >
            </div>

            <div
              v-if="order.discountAmount > 0"
              class="flex justify-between items-center text-green-400"
            >
              <span class="flex items-center gap-2">
                <span class="w-1 h-1 bg-green-400 rounded-full"></span>
                Diskon:
              </span>
              <span class="font-medium"
                >-Rp{{ order.discountAmount.toLocaleString() }}</span
              >
            </div>

            <div
              v-if="order.taxAmount > 0"
              class="flex justify-between items-center"
            >
              <span class="text-gray-300 flex items-center gap-2">
                <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                Pajak:
              </span>
              <span class="font-medium"
                >Rp{{ order.taxAmount.toLocaleString() }}</span
              >
            </div>

            <div
              v-if="order.serviceCharge > 0"
              class="flex justify-between items-center"
            >
              <span class="text-gray-300 flex items-center gap-2">
                <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                Biaya Layanan:
              </span>
              <span class="font-medium"
                >Rp{{ order.serviceCharge.toLocaleString() }}</span
              >
            </div>

            <div
              class="h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent my-2"
            ></div>

            <div class="flex justify-between items-center text-lg font-bold">
              <span
                class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              >
                Total Bayar:
              </span>
              <span
                class="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
              >
                Rp{{ order.totalAmount.toLocaleString() }}
              </span>
            </div>
          </div>
        </div>

        <!-- Premium Payment Methods Section -->
        <div
          class="group relative overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500 shadow-2xl"
        >
          <div
            class="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-xl"
          ></div>

          <h2
            class="text-xl font-bold mb-6 flex items-center gap-3 relative z-10"
          >
            <div
              class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <span class="text-lg">💳</span>
            </div>
            <span
              class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Pilih Metode Pembayaran
            </span>
          </h2>

          <!-- Loading Payment Methods -->
          <div v-if="loadingPaymentMethods" class="text-center py-12">
            <div class="inline-block relative">
              <div
                class="w-16 h-16 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"
              ></div>
              <div
                class="absolute inset-2 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin animate-reverse"
              ></div>
            </div>
            <p class="text-gray-300 mt-4 font-medium">
              Memuat metode pembayaran...
            </p>
          </div>

          <!-- Payment Methods Error -->
          <div v-else-if="paymentMethodsError" class="text-center py-12">
            <div class="text-5xl mb-4 filter drop-shadow-lg">❌</div>
            <p class="text-red-400 mb-6 font-medium">
              Gagal memuat metode pembayaran
            </p>
            <button
              @click="loadPaymentMethods"
              class="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105"
            >
              <span class="relative z-10">Coba Lagi</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              ></div>
            </button>
          </div>

          <!-- Step 1: Premium Payment Type Selection -->
          <div v-else-if="!paymentType" class="space-y-4 relative z-10">
            <p class="text-gray-200 mb-6 text-center font-medium">
              Bagaimana Anda ingin membayar?
            </p>

            <!-- Pay at Cashier Option -->
            <div
              v-if="paymentMethods.cash.length > 0"
              @click="paymentType = 'cashier'"
              class="group relative overflow-hidden border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:border-cyan-500/50 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transform hover:scale-[1.02] backdrop-blur-sm"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <div class="flex items-center gap-6 relative z-10">
                <div
                  class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl group-hover:shadow-green-500/25 transition-all duration-300 group-hover:scale-110"
                >
                  💵
                </div>
                <div class="flex-1">
                  <h3
                    class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors"
                  >
                    Bayar di Kasir
                  </h3>
                  <p
                    class="text-sm text-gray-300 mt-2 group-hover:text-gray-200 transition-colors"
                  >
                    Selesaikan pembayaran langsung di kasir
                  </p>
                </div>
                <div
                  class="text-3xl text-gray-400 group-hover:text-cyan-400 transition-all duration-300 group-hover:translate-x-2"
                >
                  →
                </div>
              </div>
            </div>

            <!-- Transfer/Digital Payment Option -->
            <div
              v-if="
                paymentMethods.bank.length > 0 || paymentMethods.qris.length > 0
              "
              @click="paymentType = 'transfer'"
              class="group relative overflow-hidden border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:border-purple-500/50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transform hover:scale-[1.02] backdrop-blur-sm"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <div class="flex items-center gap-6 relative z-10">
                <div
                  class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110"
                >
                  💳
                </div>
                <div class="flex-1">
                  <h3
                    class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors"
                  >
                    Transfer / Pembayaran Digital
                  </h3>
                  <p
                    class="text-sm text-gray-300 mt-2 group-hover:text-gray-200 transition-colors"
                  >
                    Bayar via transfer bank atau dompet digital
                  </p>
                </div>
                <div
                  class="text-3xl text-gray-400 group-hover:text-purple-400 transition-all duration-300 group-hover:translate-x-2"
                >
                  →
                </div>
              </div>
            </div>

            <!-- No Payment Methods Available -->
            <div
              v-if="
                paymentMethods.cash.length === 0 &&
                paymentMethods.bank.length === 0 &&
                paymentMethods.qris.length === 0
              "
              class="text-center py-12 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/20"
            >
              <div class="text-5xl mb-4 filter drop-shadow-lg">😔</div>
              <p class="text-gray-300 font-medium">
                Tidak ada metode pembayaran tersedia
              </p>
            </div>
          </div>

          <!-- Step 2: Specific Payment Methods -->
          <div v-else class="space-y-6 relative z-10">
            <!-- Enhanced Back Button -->
            <div class="flex items-center gap-3 mb-6">
              <button
                @click="backToPaymentType"
                class="group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <span class="group-hover:-translate-x-1 transition-transform"
                  >←</span
                >
                Kembali ke pilihan pembayaran
              </button>
            </div>

            <!-- Cash Payment Methods -->
            <div v-if="paymentType === 'cashier'">
              <h3
                class="text-lg font-bold mb-4 text-gray-200 flex items-center gap-2"
              >
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                Bayar di Kasir
              </h3>
              <div class="space-y-3">
                <div
                  v-for="method in paymentMethods.cash"
                  :key="method.id"
                  @click="selectedPaymentMethod = method.id"
                  class="group relative overflow-hidden border rounded-2xl p-5 cursor-pointer transition-all duration-500 transform hover:scale-[1.02]"
                  :class="{
                    'border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 shadow-xl shadow-cyan-500/25':
                      selectedPaymentMethod === method.id,
                    'border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5':
                      selectedPaymentMethod !== method.id,
                  }"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
                    >
                      💵
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-white">{{ method.name }}</h4>
                      <p class="text-sm text-gray-300 mt-1">
                        Bayar langsung ke kasir
                      </p>
                    </div>
                    <div
                      class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                      :class="{
                        'border-cyan-500 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg':
                          selectedPaymentMethod === method.id,
                        'border-gray-400 group-hover:border-cyan-400':
                          selectedPaymentMethod !== method.id,
                      }"
                    >
                      <div
                        v-if="selectedPaymentMethod === method.id"
                        class="w-2 h-2 bg-white rounded-full animate-pulse"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Transfer/Digital Payment Methods -->
            <div v-else-if="paymentType === 'transfer'">
              <!-- QRIS Payment Methods -->
              <div v-if="paymentMethods.qris.length > 0" class="mb-8">
                <h3
                  class="text-lg font-bold mb-4 text-gray-200 flex items-center gap-2"
                >
                  <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Dompet Digital
                </h3>
                <div class="space-y-3">
                  <div
                    v-for="method in paymentMethods.qris"
                    :key="method.id"
                    @click="selectedPaymentMethod = method.id"
                    class="group relative overflow-hidden border rounded-2xl p-5 cursor-pointer transition-all duration-500 transform hover:scale-[1.02]"
                    :class="{
                      'border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-xl shadow-purple-500/25':
                        selectedPaymentMethod === method.id,
                      'border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5':
                        selectedPaymentMethod !== method.id,
                    }"
                  >
                    <div class="flex items-center gap-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden"
                      >
                        <img
                          v-if="method.images.length > 0"
                          :src="method.images[0].url"
                          :alt="method.name"
                          class="w-8 h-8 object-cover rounded"
                        />
                        <span v-else class="text-xl">📱</span>
                      </div>
                      <div class="flex-1">
                        <h3 class="font-bold text-white">{{ method.name }}</h3>
                        <p class="text-sm text-gray-300 mt-1">
                          Bayar dengan dompet digital {{ method.name }}
                        </p>
                        <p
                          v-if="method.accountName"
                          class="text-xs text-cyan-400 mt-1 font-medium"
                        >
                          Akun: {{ method.accountName }}
                        </p>
                      </div>
                      <div
                        class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                        :class="{
                          'border-purple-500 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg':
                            selectedPaymentMethod === method.id,
                          'border-gray-400 group-hover:border-purple-400':
                            selectedPaymentMethod !== method.id,
                        }"
                      >
                        <div
                          v-if="selectedPaymentMethod === method.id"
                          class="w-2 h-2 bg-white rounded-full animate-pulse"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bank Transfer -->
              <div v-if="paymentMethods.bank.length > 0">
                <h3
                  class="text-lg font-bold mb-4 text-gray-200 flex items-center gap-2"
                >
                  <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Transfer Bank
                </h3>
                <div class="space-y-3">
                  <div
                    v-for="method in paymentMethods.bank"
                    :key="method.id"
                    @click="selectedPaymentMethod = method.id"
                    class="group relative overflow-hidden border rounded-2xl p-5 cursor-pointer transition-all duration-500 transform hover:scale-[1.02]"
                    :class="{
                      'border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 shadow-xl shadow-blue-500/25':
                        selectedPaymentMethod === method.id,
                      'border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5':
                        selectedPaymentMethod !== method.id,
                    }"
                  >
                    <div class="flex items-center gap-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
                      >
                        🏦
                      </div>
                      <div class="flex-1">
                        <h4 class="font-bold text-white">{{ method.name }}</h4>
                        <p class="text-sm text-gray-300 mt-1">
                          Transfer ke {{ method.name }}
                        </p>
                        <div
                          v-if="method.accountName || method.accountNumber"
                          class="text-xs text-cyan-400 mt-2 space-y-1"
                        >
                          <p v-if="method.accountName" class="font-medium">
                            Nama Akun: {{ method.accountName }}
                          </p>
                          <p v-if="method.accountNumber" class="font-mono">
                            Nomor: {{ method.accountNumber }}
                          </p>
                        </div>
                      </div>
                      <div
                        class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                        :class="{
                          'border-blue-500 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg':
                            selectedPaymentMethod === method.id,
                          'border-gray-400 group-hover:border-blue-400':
                            selectedPaymentMethod !== method.id,
                        }"
                      >
                        <div
                          v-if="selectedPaymentMethod === method.id"
                          class="w-2 h-2 bg-white rounded-full animate-pulse"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- WhatsApp Number Input -->
        <div
          v-if="
            !paymentMethods.cash
              .map((m) => m.id)
              .includes(selectedPaymentMethod)
          "
          class="group relative overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-500 shadow-2xl"
        >
          <div
            class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-400/20 to-transparent rounded-full blur-xl"
          ></div>

          <h3
            class="text-lg font-bold mb-4 flex items-center gap-3 relative z-10"
          >
            <div
              class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <span class="text-lg">📱</span>
            </div>
            <span
              class="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
            >
              Nomor WhatsApp
            </span>
          </h3>
          <div class="relative">
            <input
              type="text"
              inputmode="numeric"
              v-model="whatsappNumber"
              placeholder="Masukkan nomor WhatsApp Anda (contoh: 08123456789)"
              class="w-full bg-gradient-to-r from-slate-700/60 to-slate-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
            />
            <div
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400"
            >
              <span class="text-lg">💬</span>
            </div>
          </div>
        </div>

        <!-- Processing State -->
        <div
          v-if="processing"
          class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center shadow-2xl"
        >
          <div class="relative inline-block mb-6">
            <div
              class="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"
            ></div>
            <div
              class="absolute inset-2 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin animate-reverse"
            ></div>
            <div
              class="absolute inset-4 border-4 border-green-500/30 border-t-green-400 rounded-full animate-spin"
            ></div>
          </div>
          <h3
            class="text-xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            Memproses Pembayaran...
          </h3>
          <p class="text-sm text-gray-300">
            Mohon tunggu sementara kami memproses pembayaran Anda
          </p>
        </div>

        <!-- Enhanced Action Buttons -->
        <div v-else class="flex gap-4 pt-4">
          <button
            @click="$router.go(-1)"
            class="group relative overflow-hidden flex-1 bg-gradient-to-r from-slate-700/80 to-slate-800/80 backdrop-blur-sm hover:from-slate-600/80 hover:to-slate-700/80 border border-white/10 hover:border-red-400/30 py-4 px-6 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              <span class="text-lg">✕</span>
              Batal
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>

          <button
            @click="processPayment"
            :disabled="!selectedPaymentMethod"
            class="group relative overflow-hidden flex-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed py-4 px-8 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-xl hover:shadow-green-500/25 disabled:shadow-none flex items-center justify-center gap-3"
          >
            <span class="relative z-10 flex items-center gap-3">
              <div
                class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
              >
                <span class="text-sm">💳</span>
              </div>
              <span>Bayar Rp{{ order.totalAmount.toLocaleString() }}</span>
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 group-disabled:hidden"
            ></div>

            <!-- Pulsing effect for enabled state -->
            <div
              v-if="selectedPaymentMethod"
              class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl animate-pulse"
            ></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom gradient overlay -->
    <div
      class="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

// Set page title
useHead({
  title: "Pembayaran - POS Premium",
})

const route = useRoute()
const router = useRouter()
const notify = useNotifications()

const order = ref(null)
const loading = ref(true)
const error = ref(false)
const processing = ref(false)
const selectedPaymentMethod = ref("")
const whatsappNumber = ref(getWhatsappNumber() ? getWhatsappNumber() : "")

// Payment methods state
const paymentMethods = ref({
  cash: [],
  bank: [],
  qris: [],
})
const loadingPaymentMethods = ref(false)
const paymentMethodsError = ref(false)

// Payment type selection
const paymentType = ref("") // 'cashier' or 'transfer'

onMounted(() => {
  loadOrderDetails()
})

const loadOrderDetails = async () => {
  try {
    const orderId = route.params.id
    const response = await useApi(`api/pos/orders/${orderId}`, {
      method: "GET",
    })

    if (response.paid) {
      notify.info("Pesanan ini sudah dibayar")
      router.push(`/cust/orders/${orderId}/detail`)
      return
    }

    order.value = response

    // Load payment methods for this merchant
    await loadPaymentMethods()
  } catch (err) {
    console.error("Failed to load order details:", err)
    error.value = true
    notify.error("Gagal memuat detail pesanan")
  } finally {
    loading.value = false
  }
}

const loadPaymentMethods = async () => {
  if (!order.value?.merchant?.id) return

  loadingPaymentMethods.value = true
  paymentMethodsError.value = false

  try {
    const response = await fetch(
      `http://localhost:3001/api/pos/payment-method/${order.value.merchant.id}`
    )

    if (!response.ok) {
      throw new Error("Failed to fetch payment methods")
    }

    const methods = await response.json()

    // Group payment methods by type
    const groupedMethods = {
      cash: [],
      bank: [],
      qris: [],
    }

    methods.forEach((method) => {
      switch (method.type) {
        case "CASH":
          groupedMethods.cash.push(method)
          break
        case "BANK":
          groupedMethods.bank.push(method)
          break
        case "QRIS":
          groupedMethods.qris.push(method)
          break
        default:
          // Handle any other types as needed
          break
      }
    })

    paymentMethods.value = groupedMethods
  } catch (err) {
    console.error("Failed to load payment methods:", err)
    paymentMethodsError.value = true
    notify.error("Gagal memuat metode pembayaran")
  } finally {
    loadingPaymentMethods.value = false
  }
}

const backToPaymentType = () => {
  paymentType.value = ""
  selectedPaymentMethod.value = ""
}

const processPayment = async () => {
  if (!selectedPaymentMethod.value) {
    notify.error("Silakan pilih metode pembayaran")
    return
  }

  if (!whatsappNumber.value.trim() && paymentType.value !== "cashier") {
    notify.error("Silakan masukkan nomor WhatsApp")
    return
  }

  processing.value = true

  try {
    // Find the selected payment method details
    const allMethods = [
      ...paymentMethods.value.cash,
      ...paymentMethods.value.bank,
      ...paymentMethods.value.qris,
    ]
    const selectedMethod = allMethods.find(
      (method) => method.id === selectedPaymentMethod.value
    )

    const paymentData = {
      orderId: order.value.id,
      paymentMethodId: selectedPaymentMethod.value,
      paymentMethod: selectedMethod?.type || "UNKNOWN",
      amount: order.value.totalAmount,
      whatsappNumber: whatsappNumber.value,
      paid: false,
    }

    console.log("Payment Data:", paymentData)

    if (selectedMethod?.type === "CASH") {
      // For cash payment, just update order status
      await useApi(`api/pos/orders/${order.value.id}/payment`, {
        method: "POST",
        body: {
          ...paymentData,
          status: "PENDING",
        },
      })

      notify.success("Pembayaran tunai terdaftar. Silakan bayar di kasir.")
      router.push(`/cust/orders/${order.value.id}/view-payment`)
    } else {
      // For digital payments, create payment session
      const paymentResponse = await useApi(
        `api/pos/orders/${order.value.id}/payment`,
        {
          method: "POST",
          body: paymentData,
        }
      )
      const whatsappNumberLocalStorage = setWhatsappNumber(whatsappNumber.value)
      if (whatsappNumberLocalStorage) {
        notify.success("Nomor WhatsApp terdaftar. Silakan bayar di kasir.")
        router.push(`/cust/orders/${order.value.id}/view-payment`)
      }

      if (paymentResponse.paymentUrl) {
        // Redirect to payment gateway
        window.location.href = paymentResponse.paymentUrl
      } else {
        // Show payment instructions
        notify.success("Pembayaran dimulai. Silakan selesaikan pembayaran.")
        router.push(`/cust/orders/${order.value.id}/view-payment`)
      }
    }
  } catch (err) {
    console.error("Payment processing failed:", err)
    notify.error("Proses pembayaran gagal. Silakan coba lagi.")
  } finally {
    processing.value = false
  }
}
</script>

<style scoped>
@keyframes animate-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-reverse {
  animation: animate-reverse 1s linear infinite;
}

/* Custom gradient animations */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-animated {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* Enhanced glow effects */
.shadow-glow-cyan {
  box-shadow:
    0 0 20px rgba(34, 211, 238, 0.3),
    0 0 40px rgba(34, 211, 238, 0.1);
}

.shadow-glow-purple {
  box-shadow:
    0 0 20px rgba(168, 85, 247, 0.3),
    0 0 40px rgba(168, 85, 247, 0.1);
}

.shadow-glow-green {
  box-shadow:
    0 0 20px rgba(34, 197, 94, 0.3),
    0 0 40px rgba(34, 197, 94, 0.1);
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(51, 65, 85, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #0891b2, #7c3aed);
}
</style>
