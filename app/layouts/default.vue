<template>
  <div class="relative flex flex-col min-h-screen lg:p-4 bg-white dark:bg-gray-900">

    <div class="hidden lg:block fixed inset-x-0 top-0 z-50 pointer-events-none">

      <div class="h-4 w-full bg-white dark:bg-gray-900 absolute top-0 left-0"></div>

      <AppCorner class="fixed top-4 left-4 pointer-events-auto" :angle="90" />
      <AppCorner class="fixed top-4 right-4 pointer-events-auto" :angle="180" />

    </div>


    <div class="hidden lg:block fixed inset-x-0 bottom-0 z-50 pointer-events-none">

      <div class="h-4 w-full bg-white dark:bg-gray-900 absolute bottom-0 left-0"></div>

      <AppCorner class="fixed bottom-4 left-4 pointer-events-auto" :angle="0" />
      <AppCorner class="fixed bottom-4 right-4 pointer-events-auto" :angle="-90" />

    </div>


    <div class="flex-1 flex flex-col bg-white dark:bg-gray-900">

      <AppHeader />

      <UMain>
        <NuxtPage />
      </UMain>

      <AppFooter />

    </div>
  </div>
</template>
