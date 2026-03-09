<script setup lang="ts">
import Section from '~/components/base/Section.vue'
import Hero from '~/components/base/Hero.vue'
import Headline from '~/components/base/Headline.vue'
import Image from '~/components/base/Image.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import Button from '~/components/base/Button.vue'
import 'swiper/css'
import 'swiper/css/pagination'

useHead({
  title: 'Sponsoring | TC Hardt',
  meta: [{ name: 'description', content: 'Werden Sie Partner des TC Hardt. Gemeinsam mehr bewegen für Sport und Jugend.' }]
})

// --- NEU: Tracking für Sponsoring-Kontakt ---
function trackSponsoringContact(method: string) {
  if (import.meta.client && (window as any)._paq) {
    (window as any)._paq.push(['trackEvent', 'Sponsoring', 'Kontakt aufgenommen', method])
  }
}

const pricing = [
  {
    name: 'Homepage Banner',
    size: 'Präsenz auf der Website',
    icon: 'i-heroicons-computer-desktop',
    description: 'Digitale Präsenz auf unserer stark frequentierten Vereinswebsite mit direkter Verlinkung zu Ihrem Angebot.'
  },
  {
    name: 'Freunde-Tafel',
    size: '33 x 15,5 cm',
    icon: 'i-heroicons-user-group',
    description: 'Zeigen Sie Verbundenheit. Ihr Schild an erlesener Stelle direkt am Eingang des Vereinsgeländes.'
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
  { src: '/img/sponsoring/sponsoring-freundetafel.jpg', alt: 'Beispiel Freunde-Tafel', label: 'Freunde-Tafel' },
  { src: '/img/sponsoring/sponsoring-bandenwerbung.jpg', alt: 'Beispiel Bandenwerbung', label: 'Bandenwerbung' },
  { src: '/img/sponsoring/sponsoring-website.jpg', alt: 'Beispiel Homepage Werbung', label: 'Homepage' }
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
        description="Der TC Hardt ist ein Treffpunkt von Klein bis Groß, um sportliche Gemeinschaft und Fairness zu erleben."
        alignment="center"
      />

      <div class="mt-16 space-y-20">
        <FeatureSection
          image-src="/img/sponsoring/sponsoring-freundetafel_4x3.jpg"
          image-alt="Freundetafel des TC Hardt"
        >
          <Headline
            tagline="Unsere Werte"
            title="Eine starke Gemeinschaft"
            description="Als Partner des TC Hardt werden Sie Teil eines Vereins, der auf drei zentrale Werte aufgebaut ist."
            alignment="none"
            class="text-left items-start"
            :margin-bottom="'none'"
          />
          <ul class="space-y-4 text-gray-700 mt-8">
            <li class="flex items-start gap-3">
              <UIcon name="i-heroicons-heart" class="w-6 h-6 text-brand-dark-500 shrink-0 mt-1" />
              <span><strong>Gastfreundschaft:</strong> Wir bieten ein familiäres Umfeld und eine erstklassige Infrastruktur für Mitglieder und Gäste.</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-heroicons-users" class="w-6 h-6 text-brand-dark-500 shrink-0 mt-1" />
              <span><strong>Teamgeist:</strong> Von der U9 bis zu den Damen 55 – wir leben den Wettkampf mit Freude am Spiel und starkem Zusammenhalt.</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-heroicons-hand-raised" class="w-6 h-6 text-brand-dark-500 shrink-0 mt-1" />
              <span><strong>Fairness:</strong> Wir legen Wert auf sportliches Verhalten und eine transparente Partnerschaft auf Augenhöhe.</span>
            </li>
          </ul>
        </FeatureSection>

        <FeatureSection
          image-src="/img/sponsoring/sponsoring-bandenwerbung.jpg"
          image-alt="Bandenwerbung auf der Anlage des TC Hardt"
          image-position="right"
        >
          <Headline
            tagline="Ihre Vorteile"
            title="Ein Gewinn für Ihre Marke"
            description="Ihr Engagement bei uns ist mehr als nur ein Logo – es ist eine Investition, die sich auszahlt."
            alignment="none"
            class="text-left items-start"
            :margin-bottom="'none'"
          />
          <ul class="space-y-4 text-gray-700 mt-8">
            <li class="flex items-start gap-3">
              <UIcon name="i-heroicons-megaphone" class="w-6 h-6 text-brand-dark-500 shrink-0 mt-1" />
              <span><strong>Hohe Sichtbarkeit:</strong> Profitieren Sie von unserer starken Präsenz – online und vor Ort auf unserer Anlage mit hunderten wöchentlichen Besuchern.</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-heroicons-user-group" class="w-6 h-6 text-brand-dark-500 shrink-0 mt-1" />
              <span><strong>Attraktive Zielgruppe:</strong> Treffen Sie auf eine vielseitige Gemeinschaft aus Familien, lokalen Unternehmern und Sportbegeisterten.</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-brand-dark-500 shrink-0 mt-1" />
              <span><strong>Positives Image:</strong> Positionieren Sie sich als Förderer des lokalen Sports und der Jugendarbeit. Das schafft Sympathie und Vertrauen.</span>
            </li>
          </ul>
        </FeatureSection>
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

      <div class="mt-12 p-8 bg-brand-dark-900 text-white rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
        <p class="text-lg font-medium">Windfänger, Sportausrüstung oder individuelle Pakete? Sprechen wir darüber!</p>
        <Button
          label="Individuelle Anfrage"
          variant="highlight"
          to="mailto:boris.ruetten@tc-hardt.de"
          @click="trackSponsoringContact('Individuelle Anfrage (Info-Box)')"
        />
      </div>
    </Section>

    <Section variant="highlight-light" margin-bottom="lg">
      <FeatureSection
        image-src="/img/facility/tc-hardt-facility-01.jpg"
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
            <span><strong>Infrastrukturinvestitionen:</strong> Wie z.B. Bänke, Sonnenschirme, Platzpflege und Instandhaltung.</span>
          </li>
          <li class="flex items-start gap-3">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-brand-dark-500 shrink-0" />
            <span><strong>Jugendförderung:</strong> In Zusammenarbeit mit der Gemeinschaftsgrundschule Hardt, der Gesamtschule Hardt und unserer Tennisschule.</span>
          </li>
          <li class="flex items-start gap-3">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-brand-dark-500 shrink-0" />
            <span><strong>Events:</strong> Durchführung von Veranstaltungen und attraktiven Vereinsturnieren.</span>
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
          <Image
            src="/img/boris_ruetten.jpg"
            alt="Boris Rütten"
            variant="portrait"
          />
        </div>

        <div class="text-center md:text-left">
          <Headline
            title="Lassen Sie uns sprechen!"
            tagline="Ihr Ansprechpartner"
            mode="dark"
            :use-container="false"
            alignment="none"
            class="items-center md:items-start text-center md:text-left mx-auto md:mx-0"
            margin-bottom="sm"
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
              @click="trackSponsoringContact('E-Mail (Boris Rütten)')"
            />
            <Button
              to="tel:+491632374893"
              variant="outline"
              icon="i-heroicons-phone"
              label="+49 163 237 48 93"
              @click="trackSponsoringContact('Telefon (Boris Rütten)')"
            />
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>
