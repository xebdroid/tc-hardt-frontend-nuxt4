<script setup lang="ts">
import Hero from '~/components/section/Hero.vue'

useHead({
  title: 'Über uns | TC Hardt',
  meta: [{ name: 'description', content: 'Der Tennisclub Hardt 1976 e.V. – Tennis mit Herz und Seele am Hardter Wald.' }]
})
</script>

<template>
  <div>
    <Hero
      :slides="[]"
      height="small"
      fallback-class="bg-tennis-900"
    >
      <template #content>
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Unser Verein
          </h1>
          <p class="text-xl text-tennis-100 max-w-2xl mx-auto">
            Tennis mit Herz und Seele mitten in Hardt.
          </p>
        </div>
      </template>
    </Hero>

    <UContainer class="py-16 space-y-16">
       <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6 text-lg text-gray-600 leading-relaxed dark:text-gray-300">
          <p>
            Der <strong class="text-tennis-900 dark:text-white">Tennisclub Hardt 1976 e.V.</strong> ist mehr als nur ein Sportverein.
            In unmittelbarer Nähe zur Bezirkssportanlage des SC Hardt und in direkter Nachbarschaft zum Hardter Wald
            glänzt unsere Tennisanlage durch eine traumhafte Lage.
          </p>
          <p>
            Unser Verein feiert 2026 sein 50-jähriges Bestehen. So lange wird bei uns bereits Tennis gespielt.
            Dank unseres Platzwartes und der vielen aktiven Mitglieder zählt unsere Anlage zu den schönsten im
            gesamten Stadtgebiet Mönchengladbach.
          </p>
        </div>
        <div class="rounded-xl overflow-hidden shadow-lg h-64 md:h-full bg-gray-200 relative">
           <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1000&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover" alt="Tennisplatz im Grünen" />
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <UCard class="hover:border-tennis-400 transition-colors border-t-4 border-t-transparent hover:border-t-tennis-400 dark:bg-gray-800">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-tennis-500" />
              <h3 class="font-bold text-lg">6 Sanierte Plätze</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Unsere 6 Tennisplätze wurden 2023 saniert und bieten beste Bedingungen für Hobby- und Turnierspieler.
          </p>
        </UCard>

        <UCard class="hover:border-tennis-400 transition-colors border-t-4 border-t-transparent hover:border-t-tennis-400 dark:bg-gray-800">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-home-modern" class="w-6 h-6 text-tennis-500" />
              <h3 class="font-bold text-lg">Clubhaus & Terrasse</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Unser gepflegtes Vereinsheim mit sonniger Terrasse ist der perfekte Treffpunkt nach dem Match.
          </p>
        </UCard>

        <UCard class="hover:border-tennis-400 transition-colors border-t-4 border-t-transparent hover:border-t-tennis-400 dark:bg-gray-800">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-trophy" class="w-6 h-6 text-tennis-500" />
              <h3 class="font-bold text-lg">Training & Extras</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Dank der Tennisschule Rot-Weiß trainieren hier Neulinge und Profis. Highlight: Unsere Bügelbahn!
          </p>
        </UCard>
      </div>
    </UContainer>

    <div class="bg-gray-100 dark:bg-gray-800 py-16 text-center">
      <UContainer>
        <h2 class="text-2xl font-bold mb-4">Fragen zum Verein?</h2>
        <p class="mb-8 text-gray-600 dark:text-gray-300">Melde dich gerne bei uns – wir helfen dir weiter!</p>
        <UButton to="/kontakt" color="primary" size="xl" class="text-slate-900 font-bold">Kontakt aufnehmen</UButton>
      </UContainer>
    </div>
  </div>
</template>
