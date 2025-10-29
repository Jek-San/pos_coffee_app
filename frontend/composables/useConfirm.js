import { ref } from 'vue'

const modalRef = ref(null)

export function registerConfirmModal(refInstance) {
  modalRef.value = refInstance
}

export function useConfirm() {
  if (!modalRef.value) {
    throw new Error('Confirm modal not registered yet')
  }
  return modalRef.value.open
}
