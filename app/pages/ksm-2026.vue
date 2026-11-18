<script setup lang="ts">
import PageHero from '~/components/sections/PageHero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import FeatureCard from '~/components/sections/FeatureCard.vue'
import BaseGrid from '~/components/base/Grid.vue'
import BaseCtaSection from '~/components/sections/CtaSection.vue'
import Sponsors from '~/components/sections/Sponsors.vue'

const localePath = useLocalePath()

useSeoMeta({
  title: 'Kreis- und Stadtmeisterschaften 2026',
  ogTitle: 'Kreis- und Stadtmeisterschaften 2026 | TC Hardt',
  description: 'Offizielle Kreis- und Stadtmeisterschaften der Erwachsenen des Tenniskreises Mönchengladbach vom 29.08. bis 13.09.2026 beim TC Hardt.',
  ogDescription: 'Offizielle Kreis- und Stadtmeisterschaften der Erwachsenen des Tenniskreises Mönchengladbach vom 29.08. bis 13.09.2026 beim TC Hardt.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})

const tournamentFacts = computed(() => [
  {
    icon: 'i-heroicons-calendar',
    title: '29.08. – 13.09.2026',
    description: 'Zwei Wochen hochklassiges Tennis mit dem großen Finalsonntag am 13. September.',
    iconColor: 'color-blue',
    iconBg: 'bg-blue'
  },
  {
    icon: 'i-heroicons-map-pin',
    title: 'Austragungsorte',
    description: 'Hauptanlage mit 6 Sandplätzen beim TC Hardt sowie Spiele beim TC Venn & TG Blau-Weiss Meer.',
    iconColor: 'color-orange',
    iconBg: 'bg-orange'
  },
  {
    icon: 'i-heroicons-user-group',
    title: 'Konkurrenzen',
    description: 'Damen & Herren in der Offenen Klasse sowie Senioren-Altersklassen (30+, 40+, 50+, 60+) in Einzel & Doppel.',
    iconColor: 'color-green',
    iconBg: 'bg-green'
  },
  {
    icon: 'i-heroicons-trophy',
    title: 'Offizielles LK-Turnier',
    description: 'Gewertet für Leistungsklassen & deutsche Rangliste des DTB. Offizielle Bälle & Oberschiedsrichter.',
    iconColor: 'color-teal',
    iconBg: 'bg-teal'
  }
])

const scheduleMilestones = [
  {
    date: '29.08.2026',
    title: 'Turnierstart & Eröffnungsmatches',
    desc: 'Beginn der ersten Hauptfeldrunden auf allen Plätzen ab 10:00 Uhr.'
  },
  {
    date: 'Mo – Fr ab 17:00 Uhr',
    title: 'Hauptrunde & Abend-Sessions',
    desc: 'Spannende Abendspiele unter der Woche auf unserer Anlage.'
  },
  {
    date: '13.09.2026',
    title: 'Großer Finaltag & Siegerehrung',
    desc: 'Die Endspiele aller Altersklassen, gefolgt von der feierlichen Siegerehrung und Ausklang im Clubhaus.'
  }
]

const ksmSponsors = [
  { src: '/img/sponsors/ksm-2026/sponsor-shirt-company.png', alt: 'Männer Moden Geldern', url: 'https://share.google/PjF0RdCRTC4iQIWmq' },
  { src: '/img/sponsors/ksm-2026/sponsor-tennis-kreis-moenchengladbach.png', alt: 'Tenniskreis Mönchengladbach', url: 'https://tenniskreis-moenchengladbach.de/' },
  { src: '/img/sponsors/ksm-2026/sponsor-tc-venn.png', alt: 'TC Venn', url: 'https://www.tcvenn.de/' },
  { src: '/img/sponsors/ksm-2026/sponsor-blau-weiss-meer-tennis.png', alt: 'TG Blau-Weiss Meer', url: 'https://www.tg-blau-weiss-meer.de/' },
  { src: '/img/sponsors/ksm-2026/sponsor-heister-sport.png', alt: 'Sport Heister', url: 'https://www.sport-heister.de/' },
  { src: '/img/sponsors/ksm-2026/sponsor-luce-eiscafe.png', alt: 'Eiscafé Luce', url: 'https://share.google/UINqUnzIMIQQnGMP6' },
  { src: '/img/sponsors/ksm-2026/sponsor-mg-sport.png', alt: 'MG-Sport', url: 'https://www.mg-sport.de/' },
]
</script>

<template>
  <div class="ksm-page">
    <PageHero
      title="Kreis- und Stadtmeisterschaften 2026"
      margin-bottom="none"
    />

    <Section>
      <Headline
        title="Das Turnier auf einen Blick"
        tagline="Tenniskreis Mönchengladbach"
        tagline-variant="brand"
        tag="h2"
        size="h2"
        alignment="center"
        margin-bottom="sm"
        description="Der TC Hardt ist stolzer Hauptausrichter der Kreis- und Stadtmeisterschaften der Erwachsenen."
      />

      <div class="results-cta">
        <Button
          to="https://www.tennis.de/spielen/spielbetrieb/turniersuche.html#detail/783899"
          label="Aktuelle Ergebnisse"
          variant="primary"
          icon="i-heroicons-trophy"
          target="_blank"
        />
      </div>

      <BaseGrid :cols="4" margin-top="md">
        <FeatureCard
          v-for="(fact, index) in tournamentFacts"
          :key="index"
          v-bind="fact"
        />
      </BaseGrid>
    </Section>

    <div class="schedule-wrapper">
      <Section
        variant="secondary-light"
        rounded
        padding-top="lg"
        padding-bottom="lg"
        class="schedule-section"
      >
        <Headline
          alignment="center"
          tagline="Turnier-Ablauf"
          tagline-variant="brand"
          title="Wichtige Termine & Zeitplan"
          description="Plane deine Turnierteilnahme oder deinen Besuch auf der Anlage am Birkmannsweg."
        />

        <BaseGrid :cols="3" gap="md" margin-top="md">
          <div
            v-for="(item, idx) in scheduleMilestones"
            :key="idx"
            class="milestone-card"
          >
            <div class="milestone-badge">
              {{ item.date }}
            </div>
            <h4 class="milestone-title">
              {{ item.title }}
            </h4>
            <p class="milestone-desc">
              {{ item.desc }}
            </p>
          </div>
        </BaseGrid>
      </Section>
    </div>

    <Section
      variant="default"
      padding-top="xl"
      padding-bottom="xl"
    >
      <Headline
        alignment="center"
        tagline="Sponsoring & Partner"
        tagline-variant="accent"
        title="Unterstützt von starken Partnern"
        description="Ein herzliches Dankeschön an unsere Sponsoren und Förderer, die dieses Sportevent für die Region Mönchengladbach ermöglichen."
      />

      <div class="sponsor-cta">
        <Button
          :to="localePath('sponsoring')"
          variant="outline"
          label="Jetzt TC-Hardt Sponsor werden"
          trailing-icon="i-heroicons-arrow-right"
        />
      </div>

      <Sponsors :items="ksmSponsors" contained />
    </Section>

    <BaseCtaSection
      title="Noch Fragen zum Turnier?"
      tagline="Turnierleitung & Kontakt"
      description="Unser Sportwart und das Organisationsteam stehen dir für alle Fragen rund um Konkurrenzen, Meldungen und Spielzeiten gerne zur Verfügung."
      :actions="[
        {
          to: 'mailto:sportwart@tc-hardt.de',
          label: 'E-Mail an Sportwart',
          variant: 'outline',
          icon: 'i-heroicons-envelope'
        },
        {
          to: localePath('contact'),
          label: 'Kontaktformular',
          variant: 'outline',
          icon: 'i-heroicons-chat-bubble-left-right'
        }
      ]"
    />
  </div>
</template>

<style lang="scss" scoped>
.results-cta {
  display: flex;
  justify-content: center;
}

.schedule-wrapper {
  margin-block: var(--space-8);

  @include up('sm') {
    margin-block: 3.5rem;
  }

  @include up('lg') {
    margin-block: var(--space-20);
  }
}

.schedule-section {
  position: relative;
  z-index: 10;
}

.milestone-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background-color: var(--color-pure-white);
  box-shadow: var(--shadow-md);
  border: 1px solid rgb(189 229 249 / 0.7);
  transition: transform 300ms ease;

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }

  &:hover {
    transform: scale(1.01);
  }
}

.milestone-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-full);
  background-color: var(--color-brand-light-100);
  color: var(--color-brand-dark-800);
  width: fit-content;
  margin-bottom: var(--space-3);

  @include dark {
    background-color: rgb(9 44 60 / 0.3);
    color: var(--color-brand-light-300);
  }
}

.milestone-title {
  margin: 0 0 var(--space-2);
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: var(--color-brand-dark-900);

  @include dark {
    color: var(--color-white);
  }
}

.milestone-desc {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.625;
  color: var(--color-gray-600);

  @include dark {
    color: var(--color-gray-400);
  }
}

.sponsor-cta {
  display: flex;
  justify-content: center;
  margin-top: var(--space-6);
  margin-bottom: var(--space-10);
}
</style>
