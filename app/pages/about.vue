<script setup lang="ts">
// Metadaten für SEO
useHead({
  title: 'Über uns | TC Hardt',
  meta: [{ name: 'description', content: 'Der Tennisclub Hardt 1976 e.V. – Tennis mit Herz und Seele am Hardter Wald.' }]
})
</script>

<template>
  <div>
    <pre class="bg-black text-white p-4 my-4 rounded">
      Routen-Name: {{ $route.name }}
    </pre>
    <UPageHero
      title="Unser Verein"
      description="Tennis mit Herz und Seele mitten in Hardt."
      align="center"
      class="bg-gray-50 py-16"
    />

    <UContainer class="py-16 space-y-16">

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6 text-lg text-gray-600 leading-relaxed">
          <p>
            Der <strong class="text-tennis-900">Tennisclub Hardt 1976 e.V.</strong> ist mehr als nur ein Sportverein.
            In unmittelbarer Nähe zur Bezirkssportanlage des SC Hardt und in direkter Nachbarschaft zum Hardter Wald
            glänzt unsere Tennisanlage durch eine traumhafte Lage. [cite: 77, 78]
          </p>
          <p>
            Unser Verein feiert 2026 sein 50-jähriges Bestehen. So lange wird bei uns bereits Tennis gespielt.
            Dank unseres Platzwartes und der vielen aktiven Mitglieder zählt unsere Anlage zu den schönsten im
            gesamten Stadtgebiet Mönchengladbach. [cite: 79, 87]
          </p>
        </div>
        <div class="rounded-xl overflow-hidden shadow-lg h-64 md:h-full bg-gray-200 relative">
           <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1000&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover" alt="Tennisplatz im Grünen" />
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <UCard class="hover:border-tennis-400 transition-colors border-t-4 border-t-transparent hover:border-t-tennis-400">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-tennis-500" />
              <h3 class="font-bold text-lg">6 Sanierte Plätze</h3>
            </div>
          </template>
          <p class="text-gray-600">
            Unsere 6 Tennisplätze wurden 2023 saniert und bieten beste Bedingungen für Hobby- und Turnierspieler. [cite: 80]
          </p>
        </UCard>

        <UCard class="hover:border-tennis-400 transition-colors border-t-4 border-t-transparent hover:border-t-tennis-400">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-home-modern" class="w-6 h-6 text-tennis-500" />
              <h3 class="font-bold text-lg">Clubhaus & Terrasse</h3>
            </div>
          </template>
          <p class="text-gray-600">
            Unser gepflegtes Vereinsheim mit sonniger Terrasse ist der perfekte Treffpunkt nach dem Match.
            Wir legen großen Wert auf Sauberkeit in Umkleiden und Sanitäranlagen. [cite: 82, 83, 84]
          </p>
        </UCard>

        <UCard class="hover:border-tennis-400 transition-colors border-t-4 border-t-transparent hover:border-t-tennis-400">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-trophy" class="w-6 h-6 text-tennis-500" />
              <h3 class="font-bold text-lg">Training & Extras</h3>
            </div>
          </template>
          <p class="text-gray-600">
            Dank der Tennisschule Rot-Weiß trainieren hier Neulinge und Profis.
            Als Highlight findest du bei uns sogar eine <span class="text-tennis-600 font-bold">Bügelbahn</span>! [cite: 81, 86]
          </p>
        </UCard>
      </div>

    </UContainer>

    <UPageCTA
      title="Fragen zum Verein?"
      description="Melde dich gerne bei uns – wir helfen dir weiter!"
      :links="[{ label: 'Kontakt aufnehmen', to: '/kontakt', color: 'primary' }]"
    />
  </div>
</template>
