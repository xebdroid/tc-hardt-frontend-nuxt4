export interface ToastMessage {
  id: string
  title: string
  description?: string
  color?: 'primary' | 'success' | 'warning' | 'error'
  duration?: number
}

const toasts = ref<ToastMessage[]>([])

export function useToast() {
  function remove(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function add(toast: Omit<ToastMessage, 'id'>) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const duration = toast.duration ?? 5000
    toasts.value.push({
      ...toast,
      id,
      color: toast.color || 'primary'
    })

    if (import.meta.client && duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  return {
    toasts,
    add,
    remove
  }
}
