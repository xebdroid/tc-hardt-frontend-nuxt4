<script setup lang="ts">
import db from '~/assets/data/db.json'

// Wir verdreifachen die Liste für den nahtlosen Loop
const sponsors = [...db.sponsors, ...db.sponsors, ...db.sponsors]
</script>

<template>
  <div class="py-12 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800 overflow-hidden">
    <UContainer>
      <p class="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-10">
        Unsere Partner & Sponsoren
      </p>

      <div class="relative w-full overflow-hidden group">

        <div class="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div class="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

        <div class="flex animate-marquee items-center py-4">

          <div
            v-for="(sponsor, i) in sponsors"
            :key="i"
            class="
              flex-shrink-0
              mx-4 sm:mx-6 /* <-- LÜCKE VERKLEINERT (war mx-8 sm:mx-12) */
              cursor-pointer
              transition-all duration-300
              transform hover:scale-110 /* <-- HOVER SCALE EFFEKT HINZUGEFÜGT */
              opacity-60 hover:opacity-100
            "
          >
            <img
              v-if="sponsor.image"
              :src="sponsor.image"
              :alt="sponsor.name"
              class="
                h-20 sm:h-24 w-auto /* <-- BILDER GRÖSSER GEMACHT (war h-12) */
                object-contain
                grayscale hover:grayscale-0
                transition-all duration-300
                rounded-lg /* Sieht bei 4:3 oft besser aus */
              "
            >

            <div
              v-else
              class="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 h-20 sm:h-24"
            >
              <UIcon name="i-heroicons-building-storefront" class="w-6 h-6 text-gray-400" />
              <span class="font-heading font-bold text-gray-500 text-sm whitespace-nowrap">
                {{ sponsor.name }}
              </span>
            </div>
          </div>

        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.animate-marquee {
  /* Geschwindigkeit evtl. anpassen, da die Strecke jetzt kürzer ist */
  animation: marquee 35s linear infinite;
  width: max-content;
  will-change: transform;
}

/* Pausieren beim Hover über die gesamte Gruppe */
.group:hover .animate-marquee {
  animation-play-state: paused;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  /* Der mathematisch korrekte Loop-Punkt für 3 Listen */
  100% { transform: translateX(-33.33333%); }
}
</style>
