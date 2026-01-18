<script setup lang="ts">
const { footerLinks, socialLinks } = useNavigation()
</script>

<template>
  <footer class="mt-auto w-full isolate">

    <div class="relative z-10 px-4 lg:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto -mb-32">
      <div class="relative w-full rounded-3xl overflow-hidden shadow-2xl aspect-[21/9] md:aspect-[21/7] lg:aspect-[21/6]">
        <div class="absolute inset-0 bg-brand-light-300" />

        <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark-800 mb-8 drop-shadow-md">
            Werde Teil unserer Gemeinschaft
          </h3>
          <UButton
            to="/mitgliedschaft"
            size="xl"
            color="primary"
            variant="solid"
            label="Mitglied werden"
            :ui="{ rounded: 'rounded-full', padding: { xl: 'px-10 py-4' }, font: 'font-bold text-lg' }"
          />
        </div>
      </div>
    </div>

    <div class="bg-brand-dark-900 text-white pt-52 pb-24 rounded-t-3xl relative z-0 mt-0">

      <div class="lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-6 lg:px-0">

        <div class="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10">

          <div class="flex items-center gap-4">
            <img
              src="/tc-hardt-logo.svg"
              alt="TC Hardt"
              class="h-32 w-auto"
            />
            <div class="flex flex-col leading-none gap-1">
              <span class="font-euro-extended font-bold text-3xl lg:text-4xl text-brand-dark-200">
                TC Hardt
              </span>
              <span class="font-euro-bold text-base lg:text-lg text-brand-dark-200">
                1976 e.V.
              </span>
            </div>
          </div>

          <div class="flex flex-col w-full lg:w-auto items-center lg:items-end gap-6">

            <nav class="flex flex-wrap justify-center lg:justify-end gap-x-8 gap-y-2">
              <NuxtLink
                v-for="(link, index) in footerLinks"
                :key="index"
                :to="link.to"
                class="text-lg font-medium text-gray-300 hover:text-white transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </nav>

            <USeparator />

            <div class="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8">

              <span class="text-sm text-gray-400 whitespace-nowrap">
                © {{ new Date().getFullYear() }} TC Hardt 1976 e.V.
              </span>

              <div class="flex items-center gap-3">
                <UButton
                  v-for="(social, index) in socialLinks"
                  :key="index"
                  :to="social.href"
                  target="_blank"
                  variant="ghost"
                  :icon="social.icon"
                  size="lg"
                  class="text-gray-300 hover:text-white hover:bg-brand-dark-700"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </footer>
</template>
