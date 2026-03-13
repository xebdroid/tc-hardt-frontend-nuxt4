<script setup lang="ts">
const scrollY = ref(0)
const isVisible = computed(() => scrollY.value > 400)

function handleScroll() {
  scrollY.value = window.scrollY
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
    <div class="hidden sm:block">
      <Transition
        enter-active-class="transition duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)"
        enter-from-class="translate-x-20 rotate-180 opacity-0"
        enter-to-class="translate-x-0 rotate-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="translate-x-0 rotate-0 opacity-100"
        leave-to-class="translate-x-20 rotate-180 opacity-0"
      >
        <div
          v-if="isVisible"
          class="fixed bottom-8 right-8 z-50 pointer-events-none"
        >
          <div class="relative group pointer-events-auto">
            <!-- Subtiler Glow Effekt -->
            <div class="absolute -inset-1 bg-gray-400 rounded-full blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
            
            <!-- Äußerer Rahmen mit Glas-Effekt -->
            <div class="relative bg-white/90 dark:bg-gray-900/90 border border-white dark:border-gray-800 rounded-full p-1 shadow-2xl backdrop-blur-md">
              <button
                class="w-12 h-12 flex items-center justify-center rounded-full bg-brand-dark-900 text-white shadow-sm hover:bg-brand-dark-800 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-light-400"
                aria-label="Nach oben scrollen"
                @click="scrollToTop"
              >
                <UIcon name="i-heroicons-arrow-up" class="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <template #fallback>
      <!-- Leerer Platzhalter für SSR -->
      <div class="hidden sm:block fixed bottom-8 right-8 w-14 h-14 pointer-events-none" />
    </template>
  </ClientOnly>
</template>
