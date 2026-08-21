<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import Sponsors from '~/components/base/Sponsors.vue'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: 'Kreis- und Stadtmeisterschaften 2026',
  ogTitle: 'Kreis- und Stadtmeisterschaften 2026 | TC Hardt',
  description: 'Offizielle Kreis- und Stadtmeisterschaften der Erwachsenen des Tenniskreises Mönchengladbach vom 29.08. bis 13.09.2026 beim TC Hardt.',
  ogDescription: 'Offizielle Kreis- und Stadtmeisterschaften der Erwachsenen des Tenniskreises Mönchengladbach vom 29.08. bis 13.09.2026 beim TC Hardt.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})

// --- FACTS / HIGHLIGHTS ---
const tournamentFacts = computed(() => [
  {
    icon: 'i-heroicons-calendar',
    title: '29.08. – 13.09.2026',
    description: 'Zwei Wochen hochklassiges Tennis mit dem großen Finalsonntag am 13. September.',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50 dark:bg-blue-900/10'
  },
  {
    icon: 'i-heroicons-map-pin',
    title: 'Austragungsorte',
    description: 'Hauptanlage mit 6 Sandplätzen beim TC Hardt sowie Spiele beim TC Venn & TG Blau-Weiss Meer.',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50 dark:bg-orange-900/10'
  },
  {
    icon: 'i-heroicons-user-group',
    title: 'Konkurrenzen',
    description: 'Damen & Herren in der Offenen Klasse sowie Senioren-Altersklassen (30+, 40+, 50+, 60+) in Einzel & Doppel.',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50 dark:bg-green-900/10'
  },
  {
    icon: 'i-heroicons-trophy',
    title: 'Offizielles LK-Turnier',
    description: 'Gewertet für Leistungsklassen & deutsche Rangliste des DTB. Offizielle Bälle & Oberschiedsrichter.',
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-50 dark:bg-teal-900/10'
  }
])

// --- ABLAUF ---
const scheduleMilestones = [
  {
    date: 'Ab sofort',
    title: 'Online-Meldung geöffnet',
    desc: 'Anmeldung über das offizielle Turnierportal tennis.de / mybigpoint möglich.'
  },
  {
    date: '29.08.2026',
    title: 'Turnierstart & Eröffnungsmatches',
    desc: 'Beginn der ersten Hauptfeldrunden auf allen Plätzen ab 10:00 Uhr.'
  },
  {
    date: 'Mo – Fr ab 17:00 Uhr',
    title: 'Hauptrunde & Abend-Sessions',
    desc: 'Spannende Flutlicht- und Abendspiele unter der Woche auf unserer Anlage.'
  },
  {
    date: '13.09.2026',
    title: 'Großer Finaltag & Siegerehrung',
    desc: 'Die Endspiele aller Altersklassen, gefolgt von der feierlichen Siegerehrung und Ausklang im Clubhaus.'
  }
]

// --- SPONSOREN KSM 2026 ---
const ksmSponsors = [
  { src: '/img/sponsors/ksm-2026/sponsor-tennis-kreis-moenchengladbach.png', alt: 'Tenniskreis Mönchengladbach' },
  { src: '/img/sponsors/ksm-2026/sponsor-tc-venn.png', alt: 'TC Venn' },
  { src: '/img/sponsors/ksm-2026/sponsor-blau-weiss-meer-tennis.png', alt: 'TG Blau-Weiss Meer' },
  { src: '/img/sponsors/ksm-2026/sponsor-heister-sport.png', alt: 'Sport Heister', url: 'https://www.sport-heister.de/' },
  { src: '/img/sponsors/ksm-2026/sponsor-luce-eiscafe.png', alt: 'Eiscafé Luce' },
  { src: '/img/sponsors/ksm-2026/sponsor-mg-sport.png', alt: 'MG-Sport' }
]
</script>

<template>
  <div>
    <!-- 1. Hero (Exakter Stil der Termine-Seite) -->
    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <Headline
          title="Kreis- und Stadtmeisterschaften 2026"
          :tag="'h1'"
          :size="'h1'"
          :mode="'light'"
          :alignment="'center'"
          :margin-bottom="'none'"
        />
      </template>
    </Hero>

    <!-- 2. Key-Facts Section (Sauberer Anschluss ohne Overlap) -->
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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        <FeatureCard
          v-for="(fact, index) in tournamentFacts"
          :key="index"
          v-bind="fact"
        />
      </div>
    </Section>

    <!-- 3. Schedule / Ablauf Section -->
    <div class="my-8 sm:my-14 lg:my-20">
      <Section
        variant="secondary-light"
        rounded
        padding-top="lg"
        padding-bottom="lg"
        class="relative z-10"
      >
        <Headline
          alignment="center"
          tagline="Turnier-Ablauf"
          tagline-variant="brand"
          title="Wichtige Termine & Zeitplan"
          description="Plane deine Turnierteilnahme oder deinen Besuch auf der Anlage am Birkmannsweg."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div
            v-for="(item, idx) in scheduleMilestones"
            :key="idx"
            class="flex flex-col p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-brand-light-200/70 dark:border-gray-700 transition-transform duration-300 hover:scale-[1.01]"
          >
            <div class="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-brand-light-100 dark:bg-brand-light-900/30 text-brand-dark-800 dark:text-brand-light-300 w-fit mb-3">
              {{ item.date }}
            </div>
            <h4 class="font-bold text-lg text-brand-dark-900 dark:text-white mb-2">
              {{ item.title }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </Section>
    </div>

    <!-- 4. Sponsoren & Partner der KSM -->
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

      <div class="flex justify-center mt-6 mb-10">
        <Button
          :to="localePath('sponsoring')"
          variant="outline"
          label="Partner der KSM werden"
          trailing-icon="i-heroicons-arrow-right"
        />
      </div>

      <!-- Sponsoren Karussell -->
      <Sponsors :items="ksmSponsors" contained />
    </Section>

    <!-- 5. Turnierleitung & Kontakt (Exakt wie auf der Training-Seite) -->
    <Section
      variant="secondary-light"
      padding-top="md"
      padding-bottom="xl"
      overlap-bottom
      rounded="top"
      outer-container
      class="text-center"
    >
      <Headline
        title="Noch Fragen zum Turnier?"
        tagline="Turnierleitung & Kontakt"
        alignment="center"
      />
      <p class="text-gray-700 dark:text-gray-300 my-4 max-w-2xl mx-auto">
        Unser Sportwart und das Organisationsteam stehen dir für alle Fragen rund um Konkurrenzen, Meldungen und Spielzeiten gerne zur Verfügung.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          to="https://www.tennis.de/spielen/spielbetrieb/turniersuche.html#detail/783899"
          target="_blank"
          label="Zur Anmeldung (tennis.de)"
          variant="outline"
          icon="i-heroicons-arrow-top-right-on-square"
        />
        <Button
          to="mailto:sportwart@tc-hardt.de"
          label="E-Mail an Sportwart"
          variant="outline"
          icon="i-heroicons-envelope"
        />
        <Button
          :to="localePath('contact')"
          label="Kontaktformular"
          variant="outline"
          icon="i-heroicons-chat-bubble-left-right"
        />
      </div>
    </Section>
  </div>
</template>
