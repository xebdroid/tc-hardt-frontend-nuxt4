<script setup lang="ts">
import AppButton from '~/components/base/AppButton.vue'

const { footerLinks, socialLinks } = useNavigation()
const localePath = useLocalePath()

// Das aktuelle Jahr für das Copyright einmal berechnen
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto w-full isolate">

    <div class="relative z-10 px-4 lg:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto -mb-20 lg:-mb-32">

      <div class="relative w-full rounded-3xl overflow-hidden shadow-2xl aspect-auto md:aspect-[21/7] lg:aspect-[21/6]">

        <div class="absolute inset-0 bg-brand-light-300" />

        <div class="relative md:absolute inset-0 flex flex-col items-center justify-center text-center p-6 py-12 md:py-6">
          <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark-800 mb-8 drop-shadow-md">
            {{ $t('footer.cta.title') }}
          </h3>

          <AppButton
            :to="localePath('membership')"
            :label="$t('footer.cta.button')"
            size="xl"
            variant="brand-dark"
            cta
          />
        </div>
      </div>
    </div>

    <div class="bg-brand-dark-900 text-white pt-32 lg:pt-52 pb-12 rounded-t-3xl relative z-0 mt-0">

      <div class="lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-6 lg:px-0">

        <div class="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 mb-12">

          <div class="flex items-center gap-4">
            <img
              src="/tc-hardt-logo.svg"
              alt="TC Hardt"
              class="h-16 w-auto"
            />
            <div class="flex flex-col leading-none gap-1">
              <span class="font-euro-extended font-bold text-3xl lg:text-2xl text-brand-dark-200">
                {{ $t('footer.logo.name') }}
              </span>
              <span class="font-euro-bold text-base lg:text-xs text-brand-dark-200">
                {{ $t('footer.logo.suffix') }}
              </span>
            </div>
          </div>

          <nav class="flex flex-wrap justify-center lg:justify-end gap-x-8 gap-y-4">
            <NuxtLink
              v-for="(link, index) in footerLinks"
              :key="index"
              :to="link.to"
              class="text-lg font-medium text-gray-300 hover:text-white transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <div class="w-full h-px bg-brand-dark-700 mb-8" />

        <div class="flex flex-col-reverse md:flex-row justify-between items-center gap-6">

          <span class="text-sm text-gray-400">
            {{ $t('footer.copyright', { year: currentYear }) }}
          </span>

          <div class="flex items-center gap-6 md:gap-3">
            <UButton
              v-for="(social, index) in socialLinks"
              :key="index"
              :to="social.href"
              target="_blank"
              variant="ghost"
              :icon="social.icon"
              size="lg"
              :ui="{
                icon: {
                  base: 'w-10 h-10 md:w-5 md:h-5 transition-transform hover:scale-110'
                }
              }"
              class="text-gray-300 hover:text-white hover:bg-brand-dark-700"
            />
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>
