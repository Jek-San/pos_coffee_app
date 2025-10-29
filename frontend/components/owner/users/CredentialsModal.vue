<!-- components/admin/CredentialsModal.vue -->
<template>
  <div
    v-if="show"
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

        <div
          v-for="(cred, idx) in credentials"
          :key="idx"
          class="bg-slate-700 rounded-lg p-4 space-y-3 mb-4"
        >
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">
              Operator Name
            </label>
            <div
              class="flex items-center justify-between bg-slate-600 rounded px-3 py-2"
            >
              <span class="text-white">{{ cred.name }}</span>
              <button
                @click="copyToClipboard(cred.name)"
                class="text-slate-400 hover:text-white"
              >
                📋
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
              <span class="text-white">{{ cred.email }}</span>
              <button
                @click="copyToClipboard(cred.email)"
                class="text-slate-400 hover:text-white"
              >
                📋
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
              <span class="text-white font-mono">{{ cred.password }}</span>
              <button
                @click="copyToClipboard(cred.password)"
                class="text-slate-400 hover:text-white"
              >
                📋
              </button>
            </div>
          </div>

          <div v-if="cred.stallName">
            <label class="block text-sm font-medium text-slate-300 mb-1"
              >Assigned Stall</label
            >
            <div class="bg-slate-600 rounded px-3 py-2">
              <span class="text-white">{{ cred.stallName }}</span>
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
            @click="closeModal"
            class="px-4 py-2 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  credentials: {
    type: Array,
    default: () => [],
  },
  merchantInfo: {
    type: Object,
    required: true,
  },
})

// Compossable
const notify = useNotifications()

// Emits
const emit = defineEmits(["close"])

// Methods
const closeModal = () => {
  emit("close")
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // In real app, show toast notification
    notify.info(`Copied to clipboard: ${text}`)
  } catch (error) {
    console.error("Failed to copy:", error)
  }
}

const printCredentials = () => {
  const printWindow = window.open("", "_blank")

  const allCards = props.credentials
    .map(
      (cred, idx) => `
    <div class="credential-card">
      <div class="header">
        <h2>${props.merchantInfo.name}</h2>
        <h3>Stall Operator Login Credentials</h3>
        <h4>#${idx + 1}</h4>
      </div>
      
      <div class="field">
        <div class="label">Operator Name:</div>
        <div class="value">${cred.name}</div>
      </div>
      
      <div class="field">
        <div class="label">Login Email:</div>
        <div class="value">${cred.email}</div>
      </div>
      
      <div class="field">
        <div class="label">Temporary Password:</div>
        <div class="value password">${cred.password}</div>
      </div>
      
      ${
        cred.stallName
          ? `
      <div class="field">
        <div class="label">Assigned Stall:</div>
        <div class="value">${cred.stallName}</div>
      </div>
      `
          : ""
      }
      
      <div class="footer">
        <p>⚠️ Please change your password after first login</p>
        <p>Generated on: ${new Date().toLocaleString()}</p>
      </div>
    </div>
    <hr style="margin:40px 0;" />
  `
    )
    .join("")

  printWindow.document.write(`
    <html>
      <head>
        <title>Stall Operator Credentials</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .credential-card { border: 2px solid #333; border-radius: 8px; padding: 20px; max-width: 500px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #666; }
          .value { font-size: 18px; margin-top: 5px; }
          .password { font-family: monospace; font-size: 16px; }
          .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        ${allCards}
      </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.print()
}

const shareCredentials = () => {
  const message = props.credentials
    .map(
      (cred, idx) => `
#${idx + 1}
👤 Name: ${cred.name}
📧 Email: ${cred.email}
🔐 Password: ${cred.password}
${cred.stallName ? `🏭 Stall: ${cred.stallName}` : ""}
`
    )
    .join("\n\n")

  if (navigator.share) {
    navigator.share({
      title: `${props.merchantInfo.name} - Stall Operator Credentials`,
      text: message,
    })
  } else {
    copyToClipboard(message)
    notify.info("Credentials copied to clipboard!")
  }
}
</script>
