<script setup lang="ts">
import db from '~/assets/data/db.json'
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'

useHead({
  title: 'Mannschaften | TC Hardt',
  meta: [{ name: 'description', content: 'Unsere Mannschaften – Gemeinsam stark auf dem Platz. Von Jugend bis Senioren.' }]
})

</script>

<template>
  <div>
    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <Headline
          title="Unsere Mannschaften"
          description="Gemeinsam stark auf dem Platz – wo Tennis auf Teamgeist trifft."
          :tag="'h1'"
          :size="'h1'"
          :mode="'light'"
          :alignment="'center'"
          :margin-bottom="'sm'"
        />
      </template>
    </Hero>

    <Section>
      <div class="max-w-3xl mx-auto text-center space-y-6">
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
    </Section>

    <Section
      variant="highlight-light"
      outer-container
      rounded
      padding-bottom="xl"
    >
      <Headline
        title="Aktuell spielen für den TC Hardt"
        alignment="center"
        tag="h2"
      />

      <div class="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:px-24">
        <div
          v-for="team in db.teams"
          :key="team.name"
          class="text-center p-4 rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
        >
          <UIcon name="i-heroicons-user-group" class="w-8 h-8 text-brand-light-400 mb-2 mx-auto" />
          <h3 class="font-bold text-lg text-gray-800">{{ team.name }}</h3>
          <span class="text-xs text-gray-400 uppercase tracking-wider">{{ team.category }}</span>
        </div>
      </div>
    </Section>

    <Section
      variant="accent-light"
      overlap-top
      rounded
      outer-container
      class="text-center"
      padding-top="sm"
      padding-bottom="md"
      margin-bottom="xl"
    >
      <Headline
        title="Spielpläne, Tabellen & Ergebnisse"
        tagline="Live dabei"
        alignment="center"
      />
      <p class="text-gray-700 my-4 max-w-2xl mx-auto">
        Alle aktuellen Informationen zu den Spielen unserer Mannschaften, wie Termine, namentliche Meldungen und Ergebnisse,
        findest du auf der offiziellen Seite des Tennis-Verband Niederrhein (TVN) bei nuLiga.
      </p>
      <div class="mt-8">
        <Button
          to="https://tvn.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/clubTeams?club=35786"
          target="_blank"
          variant="primary"
          size="lg"
          label="Zu den Mannschaften auf nuLiga"
          icon="i-heroicons-arrow-top-right-on-square"
        />
      </div>
    </Section>

    <Section
      variant="secondary-light"
      padding-top="md"
      padding-bottom="xl"
      overlap-bottom
      rounded="top"
      outer-container
    >
      <div class=" text-center">
        <Headline
          title="Du möchtest Teil eines Teams werden?"
          alignment="center"
          tag="h3"
        />
        <p class="text-gray-700 mt-4 mb-8 max-w-2xl mx-auto">
          Dann sprich uns an – wir freuen uns über neue Gesichter, Spielstärke ist zweitrangig.
          Was zählt, ist der Spaß am Spiel und der Zusammenhalt im Team.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            :to="$localePath('contact')"
            size="lg"
            variant="primary"
            label="Kontakt aufnehmen"
          />
        </div>
      </div>
    </Section>

  </div>
</template>
