<script setup lang="ts">
import { computed } from 'vue'
import { useRequestURL } from '#app'

const props = defineProps<{
  date: string
  title?: string
}>()

const url = useRequestURL().href
const shareText = computed(() => encodeURIComponent(props.title || 'TC Hardt News'))
const shareUrl = computed(() => encodeURIComponent(url))

// const shareLinks = computed(() => [
//   {
//     name: 'WhatsApp',
//     icon: 'i-simple-icons-whatsapp',
//     href: `https://wa.me/?text=${shareText.value}%20${shareUrl.value}`,
//     class: 'hover:text-[#25D366] hover:bg-[#25D366]/10'
//   },
//   {
//     name: 'Facebook',
//     icon: 'i-simple-icons-facebook',
//     href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl.value}`,
//     class: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10'
//   },
//   {
//     name: 'E-Mail',
//     icon: 'i-heroicons-envelope',
//     href: `mailto:?subject=${shareText.value}&body=${shareUrl.value}`,
//     class: 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
//   }
// ])
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Artikel-Info</h3>
    <div class="space-y-3 text-sm">
      <div class="flex items-center gap-2">
        <span class="text-gray-500 dark:text-gray-400">Datum:</span>
        <span class="font-medium text-gray-900 dark:text-white">{{ date }}</span>
      </div>
      <slot />

      <!-- <div class="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
        <div class="text-xs font-bold text-gray-400 uppercase mb-2">Teilen</div>
        <div class="flex gap-2">
          <a
            v-for="link in shareLinks"
            :key="link.name"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-lg transition-colors text-gray-400 dark:text-gray-500"
            :class="link.class"
            :title="`${link.name} teilen`"
          >
            <UIcon :name="link.icon" class="w-5 h-5" />
          </a>
        </div>
      </div> -->
    </div>
  </div>
</template>
