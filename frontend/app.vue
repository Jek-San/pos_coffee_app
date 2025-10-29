<script setup>
import NotificationContainer from "~/components/Notification/Container.vue"
import ConfirmModal from "~/components/global/ConfirmModal.vue"
import { registerConfirmModal } from "~/composables/useConfirm"

const confirmModal = ref(null)

onMounted(() => {
  registerConfirmModal(confirmModal.value)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <NotificationContainer />
    <ConfirmModal ref="confirmModal" />
  </NuxtLayout>
</template>
