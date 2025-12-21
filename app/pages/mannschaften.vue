<script setup lang="ts">
import db from '~/assets/data/db.json'

useHead({
  title: 'Mannschaften | TC Hardt',
  meta: [{ name: 'description', content: 'Unsere Mannschaften – Gemeinsam stark auf dem Platz. Von Jugend bis Senioren.' }]
})

// Teams gruppieren (Optional, hier zeigen wir sie einfach als Liste)
</script>

<template>
  <div>
    <UPageHero
      title="Unsere Mannschaften"
      description="Gemeinsam stark auf dem Platz – wo Tennis auf Teamgeist trifft."
      align="center"
      class="bg-gray-50 py-16"
    />

    <UContainer class="py-16">

      <div class="max-w-3xl mx-auto text-center mb-16 space-y-6">
        <p class="text-lg text-gray-600">
          Ob jung oder erfahren, ambitioniert oder einfach mit Spaß dabei – unsere Mannschaften sind das sportliche Herz des TC Hardt.
          In verschiedenen Alters- und Leistungsklassen vertreten wir unseren Verein mit
          <strong class="text-tennis-900">Teamgeist, Fairness und Freude am Wettkampf</strong>.
        </p>
        <p class="text-gray-600">
          Unsere Spielerinnen und Spieler nehmen regelmäßig an den offiziellen Medenspielen, dem Bezirkspokal
          sowie an Freundschafts- und Hobbyturnieren teil. Dabei steht nicht nur der sportliche Erfolg im Vordergrund,
          sondern auch das Miteinander – auf und neben dem Platz.
        </p>
      </div>

      <div class="mb-16">
        <h2 class="text-2xl font-bold text-tennis-900 mb-8 text-center border-b border-gray-200 pb-4">
          Aktuell spielen für den TC Hardt
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <UCard
            v-for="team in db.teams"
            :key="team.name"
            class="text-center hover:border-tennis-400 border-2 border-transparent transition-all"
          >
            <div class="py-4">
              <UIcon name="i-heroicons-user-group" class="w-8 h-8 text-tennis-300 mb-2" />
              <h3 class="font-bold text-lg text-tennis-800">{{ team.name }}</h3>
              <span class="text-xs text-gray-400 uppercase tracking-wider">{{ team.category }}</span>
            </div>
          </UCard>
        </div>
      </div>

      <div class="bg-tennis-50 rounded-2xl p-8 md:p-12 text-center">
        <h3 class="text-2xl font-bold text-tennis-900 mb-4">Du möchtest Teil eines Teams werden?</h3>
        <p class="text-gray-700 mb-8 max-w-2xl mx-auto">
          Dann sprich uns an – wir freuen uns über neue Gesichter, Spielstärke ist zweitrangig.
          Was zählt, ist der Spaß am Spiel und der Zusammenhalt im Team.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <UButton to="/kontakt" size="lg" color="primary">Kontakt aufnehmen</UButton>
          <UButton
            to="#"
            target="_blank"
            variant="outline"
            size="lg"
            color="black"
            icon="i-heroicons-arrow-top-right-on-square"
          >
            Spielpläne & Ergebnisse (nuLiga)
          </UButton>
        </div>
      </div>

    </UContainer>
  </div>
</template>
