<script setup lang="ts">
const isVisible = ref(false)

function handleScroll() {
  isVisible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <ClientOnly>
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-10 opacity-0"
    >
      <button
        v-if="isVisible"
        class="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-brand-dark-900 text-white shadow-lg hover:bg-brand-dark-800 hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-brand-light-400"
        aria-label="Nach oben scrollen"
        @click="scrollToTop"
      >
        <UIcon name="i-heroicons-arrow-up" class="w-6 h-6" />
      </button>
    </Transition>
    <template #fallback>
      <!-- Leerer Platzhalter für den Server, um Hydration-Fehler zu vermeiden -->
      <div class="fixed bottom-6 right-6 w-12 h-12 pointer-events-none" />
    </template>
  </ClientOnly>
</template>
