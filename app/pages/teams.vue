<script setup lang="ts">
import db from '~/assets/data/db.json'
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

useSeoMeta({
  title: 'Mannschaften',
  ogTitle: 'Mannschaften',
  description: 'Unsere Mannschaften – Gemeinsam stark auf dem Platz. Von Jugend bis Senioren. Erfahre mehr über unsere Teams und Ergebnisse.',
  ogDescription: 'Unsere Mannschaften – Gemeinsam stark auf dem Platz. Von Jugend bis Senioren. Erfahre mehr über unsere Teams und Ergebnisse.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <Hero height="small">
      <template #content>
        <Headline
          title="Unsere Mannschaften"
          description="Gemeinsam stark auf dem Platz – wo Tennis auf Teamgeist trifft."
          tag="h1"
          size="h1"
          mode="light"
          alignment="center"
          margin-bottom="sm"
        />
      </template>
    </Hero>

    <Section>
      <div class="intro-box">
        <p class="intro-lead">
          Ob jung oder erfahren, ambitioniert oder einfach mit Spaß dabei – unsere Mannschaften sind das sportliche Herz des TC Hardt.
          In verschiedenen Alters- und Leistungsklassen vertreten wir unseren Verein mit
          <strong>Teamgeist, Fairness und Freude am Wettkampf</strong>.
        </p>
        <p class="intro-sub">
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

      <div class="teams-grid">
        <div
          v-for="team in db.teams"
          :key="team.name"
          class="team-card"
        >
          <BaseIcon name="i-heroicons-user-group" class="team-icon" />
          <h3 class="team-name">{{ team.name }}</h3>
          <span class="team-cat">{{ team.category }}</span>
        </div>
      </div>
    </Section>

    <Section
      variant="accent-light"
      overlap-top
      rounded
      outer-container
      class="center-section"
      padding-top="sm"
      padding-bottom="md"
      margin-bottom="xl"
    >
      <Headline
        title="Spielpläne, Tabellen & Ergebnisse"
        tagline="Live dabei"
        alignment="center"
      />
      <p class="section-desc">
        Alle aktuellen Informationen zu den Spielen unserer Mannschaften, wie Termine, namentliche Meldungen und Ergebnisse,
        findest du auf der offiziellen Seite des Tennis-Verband Niederrhein (TVN) bei nuLiga.
      </p>
      <div class="action-wrap">
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
      <div class="center-section">
        <Headline
          title="Du möchtest Teil eines Teams werden?"
          alignment="center"
          tag="h3"
        />
        <p class="join-desc">
          Dann sprich uns an – wir freuen uns über neue Gesichter, Spielstärke ist zweitrangig.
          Was zählt, ist der Spaß am Spiel und der Zusammenhalt im Team.
        </p>
        <div class="join-actions">
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

<style lang="scss" scoped>
.intro-box {
  max-width: 48rem;
  margin-inline: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.intro-lead {
  margin: 0;
  font-size: 1.125rem;
  color: var(--color-gray-600);
}

.intro-sub {
  margin: 0;
  color: var(--color-gray-600);
}

.teams-grid {
  margin-top: var(--space-12);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);

  @include up("md") {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding-inline: var(--space-24);
  }
}

.team-card {
  text-align: center;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background-color: var(--color-pure-white);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-fast);

  &:hover {
    box-shadow: var(--shadow-md);
  }
}

.team-icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-brand-light-400);
  margin: 0 auto var(--space-2);
  display: block;
}

.team-name {
  margin: 0;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-gray-800);
}

.team-cat {
  font-size: 0.75rem;
  color: var(--color-gray-400);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.center-section {
  text-align: center;
}

.section-desc {
  color: var(--color-gray-700);
  margin: var(--space-4) auto;
  max-width: 42rem;
}

.action-wrap {
  margin-top: var(--space-8);
}

.join-desc {
  color: var(--color-gray-700);
  margin: var(--space-4) auto var(--space-8);
  max-width: 42rem;
}

.join-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-4);

  @include up("sm") {
    flex-direction: row;
  }
}
</style>
