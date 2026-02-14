<script setup lang="ts">
import Section from '~/components/base/Section.vue'
import Hero from '~/components/base/Hero.vue'
import Headline from '~/components/base/Headline.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import Button from '~/components/base/Button.vue'

useHead({
  title: 'Sponsoring | TC Hardt',
  meta: [{ name: 'description', content: 'Werden Sie Partner des TC Hardt. Gemeinsam mehr bewegen für Sport und Jugend.' }]
})

const pricing = [
  {
    name: 'Homepage Banner',
    size: '600px Breite',
    icon: 'i-heroicons-computer-desktop',
    description: 'Digitale Präsenz auf unserer stark frequentierten Vereinswebsite mit direkter Verlinkung zu Ihrem Angebot.'
  },
  {
    name: 'Freunde-Tafel',
    size: '33 x 15,5 cm',
    icon: 'i-heroicons-user-group',
    description: 'Zeigen Sie Verbundenheit. Ihr Schild an prominenter Stelle direkt am Clubhaus-Eingang.'
  },
  {
    name: 'Bandenwerbung',
    size: '260 x 90 cm',
    icon: 'i-heroicons-megaphone',
    description: 'Der Klassiker: Große Werbefläche direkt am Platz. Maximale Sichtbarkeit für Spieler und Zuschauer.'
  },
  {
    name: 'Kombi: Web + Tafel',
    size: 'Digital & Analog',
    icon: 'i-heroicons-star',
    description: 'Doppelte Wirkung: Nutzen Sie die Reichweite unserer Website und die physische Präsenz vor Ort.'
  },
  {
    name: 'Kombi: Web + Bande',
    size: 'Hohe Sichtbarkeit',
    icon: 'i-heroicons-bolt',
    description: 'Die Profi-Lösung: Großflächige Bandenwerbung kombiniert mit digitaler Vernetzung.'
  },
  {
    name: 'Full-Package',
    size: 'Alles inklusive',
    icon: 'i-heroicons-trophy',
    description: 'Das Rundum-Sorglos-Paket für Premium-Partner. Maximale Sichtbarkeit auf allen Kanälen.'
  }
]

const impressions = [
  { src: '/img/sponsoring/homepage-mockup.jpg', alt: 'Beispiel Homepage Werbung', label: 'Homepage' },
  { src: '/img/sponsoring/freundetafel.jpg', alt: 'Beispiel Freunde-Tafel', label: 'Freunde-Tafel' },
  { src: '/img/sponsoring/bandenwerbung.jpg', alt: 'Beispiel Bandenwerbung', label: 'Bandenwerbung' }
]
</script>

<template>
  <div>
    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
      class="relative z-10"
    >
      <template #content>
        <div class="text-center">
          <h1 class="text-4xl sm:text-6xl font-heading font-bold text-white mb-6">
            Sponsoring
          </h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Gemeinsam mehr bewegen – Werden Sie Partner des TC Hardt.
          </p>
        </div>
      </template>
    </Hero>

    <Section
      variant="gray-light"
      :rounded="true"
      :overlap-top="true"
    >
      <Headline
        title="Warum Partner werden?"
        tagline="Unsere Werte"
        description="Der TC Hardt ist ein Treffpunkt für Klein bis Groß, um sportliche Gemeinschaft und Fairness zu erleben."
        alignment="center"
      />

      <div class="grid md:grid-cols-3 gap-8 mt-12">
        <FeatureCard
          title="Gastfreundschaft"
          description="Wir bieten ein familiäres Umfeld und eine sehr gute Infrastruktur für Mitglieder und Gäste."
          icon="i-heroicons-heart"
        />
        <FeatureCard
          title="Teamgeist"
          description="Von der U9 bis zu den Damen 55 – wir leben den Wettkampf mit Freude am Spiel."
          icon="i-heroicons-users"
        />
        <FeatureCard
          title="Fairness"
          description="Wir legen Wert auf sportliches Verhalten und eine Partnerschaft auf Augenhöhe."
          icon="i-heroicons-hand-raised"
        />
      </div>
    </Section>

    <Section>
      <Headline
        title="Ihre Werbemöglichkeiten"
        tagline="Pakete & Preise"
        description="Wählen Sie das passende Paket. Alle Preise verstehen sich pro Jahr (p.a.)."
        alignment="center"
      />

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in pricing"
          :key="item.name"
          class="group flex flex-col p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div class="w-16 h-16 mx-auto bg-brand-light-50 dark:bg-brand-light-900/30 rounded-2xl flex items-center justify-center mb-6 text-brand-light-600 dark:text-brand-light-400 group-hover:scale-110 transition-transform duration-300">
            <UIcon :name="item.icon" class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-heading font-bold text-brand-dark-900 dark:text-white mb-3 text-center group-hover:text-brand-light-600 transition-colors">{{ item.name }}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-base mb-8 flex-grow leading-relaxed text-center">{{ item.description }}</p>
          <div class="pt-6 border-t border-gray-100 dark:border-gray-700 mt-auto flex flex-col items-center text-center">
            <div class="w-full">
              <span class="text-xs font-bold text-brand-light-600 uppercase tracking-wider block mb-1">Format</span>
              <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ item.size }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-24">
        <Headline title="Impressionen" alignment="center" />
        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <div
            v-for="img in impressions"
            :key="img.label"
            class="group"
          >
            <div class="rounded-xl overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm mb-3">
              <img
                :src="img.src"
                :alt="img.alt"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              >
            </div>
            <p class="text-center text-sm font-medium text-gray-500">{{ img.label }}</p>
          </div>
        </div>
      </div>

      <div class="mt-12 p-8 bg-brand-dark-900 text-white rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
        <p class="text-lg font-medium">Windfänger, Sportausrüstung oder individuelle Pakete? Sprechen wir darüber!</p>
        <Button
          label="Individuelle Anfrage"
          variant="highlight"
          to="mailto:boris.ruetten@tc-hardt.de"
        />
      </div>
    </Section>

    <Section variant="highlight-light" margin-bottom="lg">
      <FeatureSection
        image-src="/img/anlage/tc-hardt-anlage-01.jpg"
        image-alt="TC Hardt Anlage"
        image-position="right"
      >
        <Headline
          title="Was machen wir mit dem Geld?"
          tagline="Transparenz"
          description="Ihre Sponsorengelder werden zweckgebunden eingesetzt, um unseren Verein nachhaltig zu stärken."
        />
        <ul class="space-y-4 text-gray-700">
          <li class="flex items-start gap-3">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-brand-dark-500 shrink-0" />
            <span><strong>Jugendförderung:</strong> In Zusammenarbeit mit der Grundschule und Tennisschule.</span>
          </li>
          <li class="flex items-start gap-3">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-brand-dark-500 shrink-0" />
            <span><strong>Events:</strong> Durchführung von Veranstaltungen und attraktiven Vereinsturnieren.</span>
          </li>
          <li class="flex items-start gap-3">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-brand-dark-500 shrink-0" />
            <span><strong>Infrastrukturinvestitionen:</strong> Wie z.B. Bänke, Sonnenschirme, Platzpflege und Instandhaltung.</span>
          </li>
        </ul>
      </FeatureSection>
    </Section>

    <Section
      variant="secondary-light"
      padding-top="md"
      padding-bottom="xl"
      overlap-bottom
      rounded="top"
      outer-container
    >
      <div class="grid md:grid-cols-[auto_1fr] gap-12 md:gap-0 items-center">
        <div class="flex justify-center md:px-24">
          <div class="w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden border-[12px] border-white shadow-sm shrink-0">
            <img
              src="/img/boris_ruetten.jpg"
              alt="Boris Rütten"
              class="w-full h-full object-cover"
            >
          </div>
        </div>

        <div class="text-center md:text-left">
          <Headline
            title="Lassen Sie uns sprechen!"
            tagline="Ihr Ansprechpartner"
            mode="dark"
            :use-container="false"
            class="mb-6 flex flex-col items-center md:items-start"
          />

          <p class="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
            Haben Sie Fragen zu unseren Paketen oder möchten Sie den TC Hardt individuell unterstützen?
            Ich freue mich auf den persönlichen Austausch!
          </p>

          <div class="mb-10 text-brand-dark-900">
            <p class="font-black text-3xl mb-1">Boris Rütten</p>
            <p class="text-brand-light-600 uppercase tracking-widest text-sm font-bold">Stv. Vorsitzender & Sponsoring</p>
          </div>

          <div class="flex flex-wrap justify-center md:justify-start gap-4">
            <Button
              to="mailto:boris.ruetten@tc-hardt.de"
              variant="primary"
              icon="i-heroicons-envelope"
              label="E-Mail senden"
            />
            <Button
              to="tel:+491632374893"
              variant="outline"
              icon="i-heroicons-phone"
              label="+49 163 237 48 93"
            />
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>
