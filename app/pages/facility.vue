<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import type { SpacingSize, Responsive } from '~/types'

useSeoMeta({
  title: 'Anlage & Freizeit',
  ogTitle: 'Anlage & Freizeit',
  description: 'Entdecke die vielfältigen Möglichkeiten auf unserer Tennisanlage am Hardter Wald: 6 Ascheplätze, Clubhaus mit Sonnenterrasse, Beach-Volleyball und mehr.',
  ogDescription: 'Entdecke die vielfältigen Möglichkeiten auf unserer Tennisanlage am Hardter Wald: 6 Ascheplätze, Clubhaus mit Sonnenterrasse, Beach-Volleyball und mehr.',
  ogImage: '/img/facility/tc-hardt-facility-01.jpg',
  twitterCard: 'summary_large_image',
})

const sectionPaddings: { top: Responsive<SpacingSize>, bottom: Responsive<SpacingSize> } = {
  top: { base: 'xs', sm: 'sm', md: 'lg' },
  bottom: { base: 'xs', sm: 'sm', md: 'lg' }
}
</script>

<template>
  <div>
    <Hero
      :slides="[]"
      height="small"
    >
      <template #content>
        <div class="hero-header">
          <h1 class="hero-title">
            Anlage & Freizeit
          </h1>
          <p class="hero-subtitle">
            Viel Raum für Sport, Familie und Erholung direkt am Hardter Wald.
          </p>
        </div>
      </template>
    </Hero>

    <!-- 1. Sektion -->
    <Section
      variant="default"
      :padding-top="{ base: 'sm', sm: 'sm', md: 'lg' }"
      :padding-bottom="sectionPaddings.bottom"
    >
      <FeatureSection
        image-src="/img/facility/tc-hardt-facility-01.jpg"
        image-alt="Tennisplätze des TC Hardt"
        image-position="left"
      >
        <Headline
          tagline="Der Kern des Vereins"
          title="6 Gepflegte Ascheplätze"
          description="Unsere sechs Tennisplätze wurden 2023 komplett saniert. Dank unseres engagierten Platzwartes bieten sie während der gesamten Saison erstklassige Spielbedingungen."
        />
      </FeatureSection>
    </Section>

    <!-- 2. Sektion -->
    <Section
      variant="gray-light"
      :padding-top="sectionPaddings.top"
      :padding-bottom="sectionPaddings.bottom"
    >
      <FeatureSection
        image-src="/img/facility/clubhaus-sonnenterrasse.jpg"
        image-alt="Clubhaus Terrasse"
        image-position="right"
      >
        <Headline
          tagline="Geselligkeit"
          title="Clubhaus & Sonnenterrasse"
          description="Nach dem Match ist vor dem gemütlichen Teil. Unser Vereinsheim ist der soziale Mittelpunkt – mit bestem Blick von der Terrasse auf das Spielgeschehen."
        />
      </FeatureSection>
    </Section>

    <!-- 3. Sektion -->
    <Section
      variant="default"
      :padding-top="sectionPaddings.top"
      :padding-bottom="sectionPaddings.bottom"
    >
      <FeatureSection
        image-src="/img/facility/buegeln.jpg"
        image-alt="Bügelbahn am Niederrhein"
        image-position="left"
        image-object-position="object-bottom"
      >
        <Headline
          tagline="Niederrheinische Tradition"
          title="Bügeln & Boule"
          description="Entdecke das traditionelle Bügelspiel vom Niederrhein auf unserer eigenen Bahn. Wer es etwas klassischer mag, kann auf unserem Gelände auch eine Runde Boule spielen."
        />
      </FeatureSection>
    </Section>

    <!-- 4. Sektion -->
    <Section
      variant="gray-light"
      :padding-top="sectionPaddings.top"
      :padding-bottom="sectionPaddings.bottom"
    >
      <FeatureSection
        image-src="/img/facility/beachvolleyball.jpg"
        image-alt="Beach-Volleyball Feld"
        image-position="right"
      >
        <Headline
          tagline="Sommer-Vibes"
          title="Beach-Volleyball"
          description="Für alle, die Sand zwischen den Zehen lieben: Unser professionelles Beach-Volleyball-Feld steht für spannende Ballwechsel und sportliche Abwechslung bereit."
        />
      </FeatureSection>
    </Section>

    <!-- 5. Sektion -->
    <Section
      :padding-top="sectionPaddings.top"
      :padding-bottom="sectionPaddings.bottom"
    >
      <FeatureSection
        image-src="/img/facility/maedchen-auf-schaukel.jpg"
        image-alt="Kinderspielplatz Schaukel"
        image-position="left"
      >
        <Headline
          tagline="Für die Kleinen"
          title="Unsere Familien-Ecke"
          description="Tennis beim TC Hardt ist Familiensache. Während die Eltern auf dem Platz stehen, können die Kinder sicher im Sandkasten spielen oder schaukeln."
        />
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
      <div class="cta-box">
        <Headline
          title="Neugierig geworden?"
          description="Komm einfach vorbei und mach dir selbst ein Bild von unserer idyllischen Anlage. Wir freuen uns auf deinen Besuch am Hardter Wald!"
          tag="h2"
          size="h2"
          alignment="center"
          margin-bottom="lg"
        />
        <div class="cta-actions">
          <Button
            to="/kontakt#map"
            variant="primary"
            size="lg"
            label="Anlage besichtigen"
            icon="i-heroicons-map-pin"
          />
        </div>
      </div>
    </Section>
  </div>
</template>

<style lang="scss" scoped>
.hero-header {
  text-align: center;
}

.hero-title {
  margin: 0 0 var(--space-4);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 2.25rem;
  color: var(--color-white);

  @include up("sm") {
    font-size: 3rem;
  }
}

.hero-subtitle {
  margin: 0 auto;
  font-size: 1.25rem;
  color: var(--color-brand-light-100);
  max-width: 42rem;
}

.cta-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 42rem;
  margin-inline: auto;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
}
</style>
