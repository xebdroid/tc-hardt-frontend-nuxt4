<template>
  <div class="relative flex flex-col min-h-screen lg:p-4 bg-white dark:bg-gray-900">

    <div class="hidden lg:block fixed inset-x-0 top-0 z-50 pointer-events-none">

      <div class="h-4 w-full bg-white dark:bg-gray-900 absolute top-0 left-0"></div>

      <InverseCorner class="fixed top-4 left-4 pointer-events-auto" :angle="90" />
      <InverseCorner class="fixed top-4 right-4 pointer-events-auto" :angle="180" />

    </div>


    <div class="hidden lg:block fixed inset-x-0 bottom-0 z-50 pointer-events-none">

      <div class="h-4 w-full bg-white dark:bg-gray-900 absolute bottom-0 left-0"></div>

      <InverseCorner class="fixed bottom-4 left-4 pointer-events-auto" :angle="0" />
      <InverseCorner class="fixed bottom-4 right-4 pointer-events-auto" :angle="-90" />

    </div>


    <div class="flex-1 flex flex-col bg-white dark:bg-gray-900">

      <Header />

      <UMain>
        <NuxtPage />
      </UMain>

      <Footer />

    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import InverseCorner from '~/components/layout/InverseCorner.vue'
</script>
