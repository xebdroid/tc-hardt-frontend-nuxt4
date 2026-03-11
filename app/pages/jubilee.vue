<script setup lang="ts">
import type { HeroSlide } from '~/components/base/Hero.vue'
import Hero from '~/components/base/Hero.vue'
import Headline from '~/components/base/Headline.vue'
import Section from '~/components/base/Section.vue'
import EventDate from '~/components/base/EventDate.vue'

useHead({
  title: '50 Jahre Tennis op de Hardt - Jubiläum 2026',
  meta: [
    { name: 'description', content: 'Der TC Hardt 1976 e.V. feiert sein 50-jähriges Vereinsjubiläum.' }
  ]
})

// 1. Hero Data
const heroSlides: HeroSlide[] = [
  {
    type: 'image',
    src: '/img/jubilee/tennis-plaetze-von-oben.jpg',
    contentImage: '/img/jubilee/50-jahre-emblem.png',
    contentImageClass: 'w-80 mb-4',
    title: 'TC Hardt',
    titleClass: 'bg-clip-text text-transparent bg-gradient-to-br from-amber-400 via-yellow-100 to-amber-400 animate-gold-rotate font-bold',
    subtitle: 'Tennis op de Hardt',
    subtitleClass: 'bg-clip-text text-transparent bg-gradient-to-br from-amber-400 via-yellow-100 to-amber-400 animate-gold-rotate',
    description: 'Leidenschaft, Gemeinschaft und Tennis',
    descriptionClass: 'bg-clip-text text-transparent bg-gradient-to-br from-amber-400 via-yellow-100 to-amber-400 animate-gold-rotate',
    contentPosition: 'center',
    overlayClass: 'bg-gradient-to-t from-brand-light-900/90 via-brand-light-900/40 to-transparent',
    ctaPrimary: { variant: 'gold1', label: 'Unsere Jubiläums-Highlights', to: '#events' }
  },
]

// 2. Timeline Data
const timelineItems = [
  {
    date: '19.04.2026',
    title: 'Tag der offenen Tür / Saisoneröffnung',
    description: 'Wir starten unser Jubiläumsjahr mit einem bunten Saisonauftakt. Alle Tennisinteressierten sind herzlich eingeladen, den TC Hardt kennenzulernen, den Schläger selbst in die Hand zu nehmen und gemeinsam mit unseren Mitgliedern und dem Verein in die neue Saison zu starten.',
    icon: 'i-heroicons-home-modern',
  },
  {
    date: '27.06.2026',
    title: 'Jubiläumsfeier',
    description: 'Das Highlight unseres Festjahres für unsere Mitglieder! Freut euch auf eine Jubiläums-Gala mit Musik, leckerem Essen, Getränken und einigen weiteren Highlights. Ein Abend, an dem Sport, Geselligkeit und Erinnerungen an 50 Jahre TC Hardt im Mittelpunkt stehen.',
    icon: 'i-heroicons-cake',
    image: '/img/jubilee/konfetti.jpg'
  },
  {
    date: '25.07.2026',
    title: 'Sangria Open',
    description: 'Sommer, Sonne, Sangria – unser Kultturnier verbindet lockeren Tennisspaß mit geselligem Beisammensein. Ein Event für Jung und Alt, für Vereinsmitglieder und Freunde, für Anfänger und Profis, das längst zum festen Bestandteil des Clublebens gehört.',
    icon: 'i-heroicons-sun',
  },
  {
    date: '29.08. – 13.09.2026',
    title: 'Kreis- & Stadtmeisterschaften',
    description: 'Wir freuen uns, Gastgeber der Kreis- und Stadtmeisterschaften 2026 zu sein! Spannende Matches, hochklassiges Tennis und eine tolle Atmosphäre sind garantiert – kommt vorbei und feuert die Spielerinnen und Spieler an. Wir freuen uns auf viele Zuschauer aus dem gesamten Stadtgebiet!',
    icon: 'i-heroicons-trophy',
    image: '/img/jubilee/tennis-plaetze-von-oben.jpg'
  },
  {
    date: '26.09. – 27.09.2026',
    title: 'Finaltag der Clubmeisterschaften',
    description: 'Wer wird Clubmeister 2026? Beim großen Finalwochenende unserer Clubmeisterschaften entscheidet sich, wer die Titel mit nach Hause nimmt. Ein sportlicher Vereins-Höhepunkt zum Ende der Sommersaison.',
    icon: 'i-heroicons-star',
  },
  {
    date: '10.10.2026',
    title: 'Glühwein Open & Saisonabschluss',
    description: 'Zum Ausklang unseres Jubiläumsjahres laden wir traditionellerweise gemeinsam mit unserer Tennisschule Rot-Weiss zu den Glühwein Open ein. Freut euch auf ein gemütliches Herbstturnier mit Glühwein und geselligem Beisammensein. Der Tag mündet in einem gemeinsamen Saisonabschluss in unserem Clubhaus mit leckerem Essen und guter Musik. Der perfekte Abschluss für ein Jahr voller unvergesslicher Momente.',
    icon: 'i-heroicons-fire',
    image: '/img/jubilee/gluehwein.jpg'
  }
]
</script>

<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen">

    <Hero :slides="heroSlides" height="large" />

    <div id="events" class="scroll-mt-16">
      <div
        class="text-center relative"
        :style="{ zIndex: timelineItems.length + 1 }"
      >
        <Section>
          <div class="max-w-4xl mx-auto px-6 lg:px-8">
            <Headline
              title="Unsere Jubiläums-Highlights 2026"
              description="Das Jahr 2026 steht ganz im Zeichen unseres 50-jährigen Bestehens. Dieses besondere Jubiläum wollen wir gemeinsam mit euch feiern – Mitgliedern, Sponsoren, Freunden, Tennisfans und allen, die Lust auf ein tolles Festjahr haben."
              tag="h2"
              size="h2"
              alignment="center"
              title-class="tracking-tight"
            />
          </div>
        </Section>
      </div>

      <template
        v-for="(item, index) in timelineItems"
        :key="index"
      >
        <div
          class="relative"
          :style="{ zIndex: timelineItems.length - index }"
        >
          <Section
            :variant="index % 2 === 0 ? 'secondary-light' : 'default'"
            :background-image="index % 2 !== 0 ? item.image : undefined"
            :parallax="index % 2 !== 0"
            :rounded="index === 0 ? true : 'bottom'"
            :padding-top="index === 0 ? 'md' : 'xl'"
            padding-bottom="md"
            :overlap-top="index !== 0 ? true : false"
            :margin-bottom="index === timelineItems.length - 1 ? 'xl' : undefined"
            outer-container
          >
            <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-3xl mx-auto">
              <EventDate :date-string="item.date" variant="jubilee" />
              <Headline
                :title="item.title"
                :description="item.description"
                tag="h3"
                size="h3"
                alignment="center"
                title-class="tracking-tight"
                description-class="text-lg text-gray-700 dark:text-gray-300"
              />
            </div>
          </Section>
        </div>
      </template>
    </div>

  </div>
</template>
