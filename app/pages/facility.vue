<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'

useHead({
  title: 'Anlage & Freizeit | TC Hardt',
  meta: [{ name: 'description', content: 'Entdecke die vielfältigen Möglichkeiten auf unserer Tennisanlage am Hardter Wald: Tennis, Beach-Volleyball, Bügeln, Boule und Spielplatz.' }]
})
</script>

<template>
  <div>
    <Hero
      :slides="[]"
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Anlage & Freizeit
          </h1>
          <p class="text-xl text-brand-light-100 max-w-2xl mx-auto">
            Viel Raum für Sport, Familie und Erholung direkt am Hardter Wald.
          </p>
        </div>
      </template>
    </Hero>

    <Section variant="default" padding-top="xl">
      <FeatureSection
        image-src="/img/anlage/tc-hardt-anlage-01.jpg"
        image-alt="Tennisplätze des TC Hardt"
        image-position="left"
        badge-text="Top Zustand"
      >
        <Headline
          tagline="Der Kern des Vereins"
          title="6 Gepflegte Ascheplätze"
          description="Unsere sechs Tennisplätze wurden 2023 komplett saniert. Dank unseres engagierten Platzwartes bieten sie während der gesamten Saison erstklassige Spielbedingungen."
        />
      </FeatureSection>
    </Section>

    <Section variant="gray-light">
      <FeatureSection
        image-src="https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=1000&auto=format&fit=crop"
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

    <Section variant="default">
      <FeatureSection
        image-src="/img/anlage/buegeln.jpg"
        image-alt="Bügelbahn am Niederrhein"
        image-position="left"
      >
        <Headline
          tagline="Niederrheinische Tradition"
          title="Bügeln & Boule"
          description="Entdecke das traditionelle Bügelspiel vom Niederrhein auf unserer eigenen Bahn. Wer es etwas klassischer mag, kann auf unserem Gelände auch eine Runde Boule spielen."
        />
      </FeatureSection>
    </Section>

    <Section variant="gray-light">
      <FeatureSection
        image-src="/img/anlage/beachvolleyball.jpg"
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

    <Section padding-bottom="none">
      <FeatureSection
        image-src="https://images.unsplash.com/photo-1597091361793-3149a9777210?q=80&w=1750&auto=format&fit=crop"
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

    <Section>
      <div class="flex flex-col items-center text-center max-w-2xl mx-auto">
        <div class="w-12 h-1.5 bg-highlight-500 rounded-full mb-8" />
        <h2 class="text-3xl font-heading font-bold text-brand-dark-900 dark:text-white mb-6">
          Neugierig geworden?
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-10">
          Komm einfach vorbei und mach dir selbst ein Bild von unserer idyllischen Anlage. Wir freuen uns auf deinen Besuch am Hardter Wald!
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <Button
            to="/kontakt"
            variant="primary"
            size="lg"
            label="Anlage besichtigen"
            icon="i-heroicons-map-pin"
          />
          <Button
            to="/mitglied-werden"
            variant="outline"
            size="lg"
            label="Mitglied werden"
          />
        </div>
      </div>
    </Section>
  </div>
</template>
