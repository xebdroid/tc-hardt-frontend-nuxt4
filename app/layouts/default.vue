<template>
  <div class="page-wrapper flex flex-col min-h-screen">
    <div class="page-inner">
      <TopBar />
      <AppHeader />

      <UMain>
        <NuxtPage />
      </UMain>

      <AppFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-wrapper {
    background-color: var(--color-primary-950);
    padding: 16px;
  }

  .page-inner > *:first-child {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  .page-inner > *:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
</style>
