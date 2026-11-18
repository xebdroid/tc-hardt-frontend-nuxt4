<script setup lang="ts">
import PageHero from '~/components/base/PageHero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Image from '~/components/base/Image.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import BaseGrid from '~/components/base/Grid.vue'
import BaseIconList, { type IconListItem } from '~/components/base/IconList.vue'
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

useSeoMeta({
  title: 'Sponsoring & Partner',
  ogTitle: 'Sponsoring & Partner',
  description: 'Werden Sie Partner des TC Hardt! Unterstützen Sie den Tennissport in Mönchengladbach und profitieren Sie von unserer Reichweite.',
  ogDescription: 'Werden Sie Partner des TC Hardt! Unterstützen Sie den Tennissport in Mönchengladbach und profitieren Sie von unserer Reichweite.',
  ogImage: '/img/sponsoring/sponsoring-bandenwerbung.jpg',
  twitterCard: 'summary_large_image',
})

function trackSponsoringContact(method: string) {
  if (import.meta.client && (window as any)._paq) {
    (window as any)._paq.push(['trackEvent', 'Sponsoring', 'Kontakt aufgenommen', method])
  }
}

const communityValues: IconListItem[] = [
  { icon: 'i-heroicons-heart', label: 'Gastfreundschaft:', text: 'Wir bieten ein familiäres Umfeld und eine erstklassige Infrastruktur für Mitglieder und Gäste.' },
  { icon: 'i-heroicons-users', label: 'Teamgeist:', text: 'Von der U9 bis zu den Damen 55 – wir leben den Wettkampf mit Freude am Spiel und starkem Zusammenhalt.' },
  { icon: 'i-heroicons-hand-raised', label: 'Fairness:', text: 'Wir legen Wert auf sportliches Verhalten und eine transparente Partnerschaft auf Augenhöhe.' }
]

const sponsorBenefits: IconListItem[] = [
  { icon: 'i-heroicons-megaphone', label: 'Hohe Sichtbarkeit:', text: 'Profitieren Sie von unserer starken Präsenz – online und vor Ort auf unserer Anlage mit hunderten wöchentlichen Besuchern.' },
  { icon: 'i-heroicons-user-group', label: 'Attraktive Zielgruppe:', text: 'Treffen Sie auf eine vielseitige Gemeinschaft aus Familien, lokalen Unternehmern und Sportbegeisterten.' },
  { icon: 'i-heroicons-sparkles', label: 'Positives Image:', text: 'Positionieren Sie sich als Förderer des lokalen Sports und der Jugendarbeit. Das schafft Sympathie und Vertrauen.' }
]

const fundUsage: IconListItem[] = [
  { label: 'Infrastrukturinvestitionen:', text: 'Wie z.B. Bänke, Sonnenschirme, Platzpflege und Instandhaltung.' },
  { label: 'Jugendförderung:', text: 'In Zusammenarbeit mit der Gemeinschaftsgrundschule Hardt, der Gesamtschule Hardt und unserer Tennisschule.' },
  { label: 'Events:', text: 'Durchführung von Veranstaltungen und attraktiven Vereinsturnieren.' }
]

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
</script>

<template>
  <div class="sponsoring-page">
    <PageHero
      title="Sponsoring"
      description="Gemeinsam mehr bewegen – Werden Sie Partner des TC Hardt."
    />

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

      <div class="values-stack">
        <FeatureSection
          image-src="/img/sponsoring/sponsoring-freundetafel_4x3.jpg"
          image-alt="Freundetafel des TC Hardt"
        >
          <Headline
            tagline="Unsere Werte"
            title="Eine starke Gemeinschaft"
            description="Als Partner des TC Hardt werden Sie Teil eines Vereins, der auf drei zentrale Werte aufgebaut ist."
            alignment="none"
            class="headline-left"
            :margin-bottom="'none'"
          />
          <BaseIconList :items="communityValues" margin-top="md" />
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
            class="headline-left"
            :margin-bottom="'none'"
          />
          <BaseIconList :items="sponsorBenefits" margin-top="md" />
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

      <BaseGrid :cols="3" gap="md">
        <div
          v-for="item in pricing"
          :key="item.name"
          class="package-card"
        >
          <div class="package-icon-box">
            <BaseIcon :name="item.icon" class="package-icon" />
          </div>
          <h3 class="package-title">{{ item.name }}</h3>
          <p class="package-desc">{{ item.description }}</p>
          <div class="package-footer">
            <div class="package-meta">
              <span class="meta-label">Format</span>
              <p class="meta-value">{{ item.size }}</p>
            </div>
          </div>
        </div>
      </BaseGrid>

      <div class="custom-banner">
        <p class="banner-text">Windfänger, Sportausrüstung oder individuelle Pakete? Sprechen wir darüber!</p>
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
        <BaseIconList :items="fundUsage" />
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
      <div class="contact-layout">
        <div class="contact-portrait">
          <Image
            src="/img/board/vorstand-boris-ruetten.jpg"
            alt="Boris Rütten"
            variant="portrait"
          />
        </div>

        <div class="contact-body">
          <Headline
            title="Lassen Sie uns sprechen!"
            tagline="Ihr Ansprechpartner"
            mode="dark"
            :use-container="false"
            alignment="none"
            class="contact-headline"
            margin-bottom="sm"
          />

          <p class="contact-text">
            Haben Sie Fragen zu unseren Paketen oder möchten Sie den TC Hardt individuell unterstützen?
            Ich freue mich auf den persönlichen Austausch!
          </p>

          <div class="contact-person">
            <p class="person-name">Boris Rütten</p>
            <p class="person-role">Stv. Vorsitzender & Sponsoring</p>
          </div>

          <div class="contact-actions">
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

<style lang="scss" scoped>
.values-stack {
  margin-top: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-20);
}

.headline-left {
  text-align: left;
  align-items: flex-start;
}

.package-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-8);
  background-color: var(--color-pure-white);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-gray-100);
  box-shadow: var(--shadow-sm);
  transition: all 300ms ease;

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-0.25rem);

    .package-icon-box {
      transform: scale(1.1);
    }

    .package-title {
      color: var(--color-brand-light-600);
    }
  }
}

.package-icon-box {
  width: 4rem;
  height: 4rem;
  margin-inline: auto;
  margin-bottom: var(--space-6);
  background-color: var(--color-brand-light-50);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-light-600);
  transition: transform 300ms ease;

  @include dark {
    background-color: rgb(9 44 60 / 0.3);
    color: var(--color-brand-light-400);
  }
}

.package-icon {
  width: 2rem;
  height: 2rem;
}

.package-title {
  margin: 0 0 var(--space-3);
  font-family: var(--font-heading);
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);
  text-align: center;
  transition: color var(--transition-fast);

  @include dark {
    color: var(--color-white);
  }
}

.package-desc {
  margin: 0 0 var(--space-8);
  color: var(--color-gray-600);
  font-size: 1rem;
  flex-grow: 1;
  line-height: 1.625;
  text-align: center;

  @include dark {
    color: var(--color-gray-300);
  }
}

.package-footer {
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-gray-100);
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @include dark {
    border-top-color: var(--color-gray-700);
  }
}

.package-meta {
  width: 100%;
}

.meta-label {
  display: block;
  margin-bottom: var(--space-1);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: var(--color-brand-light-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-value {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);

  @include dark {
    color: var(--color-gray-100);
  }
}

.custom-banner {
  margin-top: var(--space-12);
  padding: var(--space-8);
  background-color: var(--color-brand-dark-900);
  color: var(--color-pure-white);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-6);
  box-shadow: var(--shadow-lg);

  @include up('md') {
    flex-direction: row;
  }
}

.banner-text {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
}

.contact-layout {
  display: grid;
  gap: var(--space-12);
  align-items: center;

  @include up('md') {
    grid-template-columns: auto 1fr;
    gap: 0;
  }
}

.contact-portrait {
  display: flex;
  justify-content: center;

  @include up('md') {
    padding-inline: var(--space-24);
  }
}

.contact-body {
  text-align: center;

  @include up('md') {
    text-align: left;
  }
}

.contact-headline {
  align-items: center;
  text-align: center;
  margin-inline: auto;

  @include up('md') {
    align-items: flex-start;
    text-align: left;
    margin-inline: 0;
  }
}

.contact-text {
  margin: 0 auto var(--space-8);
  color: var(--color-gray-600);
  font-size: 1.125rem;
  line-height: 1.625;
  max-width: 42rem;

  @include up('md') {
    margin-inline: 0;
  }
}

.contact-person {
  margin-bottom: var(--space-10);
  color: var(--color-brand-dark-900);
}

.person-name {
  margin: 0 0 var(--space-1);
  font-weight: 900;
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.person-role {
  margin: 0;
  color: var(--color-brand-light-600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);

  @include up('md') {
    justify-content: flex-start;
  }
}
</style>
