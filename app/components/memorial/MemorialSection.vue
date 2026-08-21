<script setup lang="ts">
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import MemorialPlaque from '~/components/memorial/MemorialPlaque.vue'

interface Props {
  portraitSrc?: string
  name?: string
}

withDefaults(defineProps<Props>(), {
  portraitSrc: '/img/memorial/reinhard.jpg',
  name: 'Reinhard'
})
</script>

<template>
  <div class="my-8 sm:my-14 lg:my-20">
    <Section
      variant="secondary-light"
      rounded
      padding-top="lg"
      padding-bottom="lg"
      class="relative z-10"
    >
      <!-- Sektions-Headline -->
      <Headline
        alignment="center"
        title="In stillem Gedenken an unseren Freund Reinhard"
        title-class="text-2xl sm:text-3xl lg:text-4xl text-brand-dark-900"
        description="Ein treuer Wegbegleiter, Tennisfreund und geschätzter Teil unserer Vereinsfamilie."
        margin-bottom="md"
      />

      <!-- Inhalt: Plakette und gerahmtes Porträtfoto mit gleicher Box-Höhe -->
      <div class="mt-6 flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-10 max-w-5xl mx-auto">
        <!-- Linke Box: Nachbildung der Gedenkplakette -->
        <div class="w-full lg:w-7/12 flex flex-col">
          <MemorialPlaque class="h-full" />
        </div>

        <!-- Rechte Box: Porträtfoto von Reinhard (exakt gleiche Gesamthöhe) -->
        <div class="w-full sm:w-auto lg:w-5/12 max-w-sm flex flex-col mx-auto lg:mx-0">
          <div
            class="h-full flex flex-col justify-between p-2.5 sm:p-3.5 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-brand-light-200/70 dark:border-gray-700 transition-transform duration-300 hover:scale-[1.01]"
          >
            <!-- Bildbereich (füllt die Box flexibel aus) -->
            <div class="overflow-hidden rounded-xl flex-1 relative bg-slate-100 dark:bg-slate-900 min-h-[260px] sm:min-h-[300px]">
              <img
                :src="portraitSrc"
                :alt="name"
                class="w-full h-full object-cover object-top absolute inset-0"
                loading="lazy"
              >

              <!-- Dezent weicher Schattenverlauf am unteren Bildrand -->
              <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            <!-- Bildunterschrift -->
            <div class="pt-3 pb-1 text-center">
              <p class="font-serif italic text-base sm:text-lg text-brand-dark-900 dark:text-white font-medium">
                In lieber Erinnerung an {{ name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>
