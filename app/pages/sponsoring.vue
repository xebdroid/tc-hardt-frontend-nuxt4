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
  { name: 'Homepage', price: '100 €', size: '600 Pixel', icon: 'i-heroicons-computer-desktop' },
  { name: 'Freunde-Tafel', price: '200 €', size: '33 cm x 15,5 cm', icon: 'i-heroicons-user-group' },
  { name: 'Kombi: Web + Tafel', price: '250 €', size: 'Bestes Preis-Leistungs-Verhältnis', icon: 'i-heroicons-star', highlight: true },
  { name: 'Bandenwerbung', price: '450 €', size: '260 cm x 90 cm', icon: 'i-heroicons-megaphone' },
  { name: 'Kombi: Web + Bande', price: '500 €', size: 'Hohe Sichtbarkeit digital & analog', icon: 'i-heroicons-bolt' },
  { name: 'Full-Package', price: '650 €', size: 'Homepage, Tafel + Bande', icon: 'i-heroicons-trophy' }
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
      class="relative z-0"
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
      />

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="item in pricing"
          :key="item.name"
          class="flex flex-col"
          :class="[item.highlight ? 'ring-2 ring-highlight-500 shadow-md' : 'border border-gray-100']"
        >
          <div class="mb-4 flex items-center gap-2">
            <UIcon :name="item.icon" class="w-6 h-6 text-brand-light-600" />
            <span class="font-bold">{{ item.name }}</span>
          </div>
          <div class="text-3xl font-black text-brand-dark-900 mb-1">{{ item.price }}</div>
          <p class="text-xs text-gray-500 mb-4">{{ item.size }}</p>
          <div v-if="item.name.includes('Bande')" class="mt-auto text-[10px] text-gray-400 italic">
            * Bei 3 Jahren Laufzeit entfallen die Erstellungskosten.
          </div>
        </UCard>
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

    <Section variant="highlight-light">
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
      padding-top="xl"
      padding-bottom="xl"
    >
      <div class="max-w-5xl mx-auto bg-brand-light-100 rounded-3xl p-8 md:p-16 shadow-sm flex flex-col md:flex-row items-center gap-16 border border-gray-100">

        <div class="shrink-0">
          <div class="w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden border-[12px] border-white shadow-sm">
            <img
              src="/img/boris_ruetten.jpg"
              alt="Boris Rütten"
              class="w-full h-full object-cover"
            >
          </div>
        </div>

        <div class="flex-1 text-center md:text-left">
          <Headline
            title="Lassen Sie uns sprechen!"
            tagline="Ihr Ansprechpartner"
            mode="dark"
            :use-container="false"
            class="mb-6"
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
