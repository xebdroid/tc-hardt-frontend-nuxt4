<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/sections/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import FeatureCard from '~/components/sections/FeatureCard.vue'
import FeatureSection from '~/components/sections/FeatureSection.vue'
import BaseGrid from '~/components/base/Grid.vue'
import BaseCtaSection from '~/components/sections/CtaSection.vue'
import Button from '~/components/base/Button.vue'

useSeoMeta({
  title: 'Training & Tennisschule',
  ogTitle: 'Training & Tennisschule',
  description: 'Professionelles Training für jedes Niveau beim TC Hardt durch die Tennisschule Rot-Weiß. Kinder, Erwachsene & Mannschaften.',
  ogDescription: 'Professionelles Training für jedes Niveau beim TC Hardt durch die Tennisschule Rot-Weiß. Kinder, Erwachsene & Mannschaften.',
  ogImage: '/img/training/mann-haelt-tennisschlaeger-mit-ball.jpg',
  twitterCard: 'summary_large_image',
})

const slides: HeroSlide[] = [
  {
    type: 'image',
    src: '/img/training/mann-haelt-tennisschlaeger-mit-ball.jpg',
    contentImage: '/img/training/tennisschule-rot-weiss.jpg',
    contentImageClass: 'school-badge-logo',
    title: 'Training',
    subtitle: 'Professionelles Training für jedes Niveau – direkt bei uns auf der Anlage.',
    contentPosition: 'bottom-center',
    overlayClass: 'overlay-brand-dark'
  }
]

const trainingTypes = [
  {
    title: 'Kinder & Jugend',
    desc: 'Spielerisch vom ersten Ballkontakt bis zur Mannschaft. Mit Geduld und Begeisterung.',
    icon: 'i-heroicons-face-smile'
  },
  {
    title: 'Erwachsene & Wiedereinsteiger',
    desc: 'In kleinen Gruppen oder im Einzeltraining schnell zurück ins Spiel finden – ohne Druck.',
    icon: 'i-heroicons-user-plus'
  },
  {
    title: 'Mannschafts- & Leistungstraining',
    desc: 'Intensives Technik-, Taktik- und Konditionstraining für Punktspiele und Turniere.',
    icon: 'i-heroicons-trophy'
  },
  {
    title: 'Schul-Kooperationen',
    desc: 'Seit über 12 Jahren begeistern wir Kinder in der Tennis-AG der Gemeinschafts-Grundschule Hardt. Ab Sommer 2026 bringen wir den Spaß am Tennis auch in die Gesamtschule Hardt.',
    icon: 'i-heroicons-academic-cap'
  }
]
</script>

<template>
  <div>
    <Hero
      :slides="slides"
      height="large"
    />

    <Section>
      <div class="partner-intro">
        <Headline
          tagline="Unser Partner für dein Spiel"
          title="Qualifiziertes Training"
          description="Seit der Sommersaison 2014 ist die Tennisschule Rot-Weiss unser starker Partner auf dem Platz. Mit Erfahrung seit 2011 und Expertise aus verschiedenen Vereinen steht sie für modernes, professionelles Training mit klaren Qualitätsstandards. Egal auf welchem Level Du spielst – Du hast gerade erst angefangen, oder hast bereits einige Erfahrung oder Du spielst sogar ambitioniert in einer Mannschaft – hier wird jeder mit Leidenschaft gefördert."
          alignment="center"
          margin-bottom="sm"
        />
        <div class="partner-cta">
          <Button
            to="https://tennisschule-rotweiss.de/"
            target="_blank"
            label="Zur Website der Tennisschule"
            variant="primary"
            icon="i-heroicons-arrow-top-right-on-square"
          />
        </div>
      </div>
    </Section>

    <Section
      variant="secondary-light"
      rounded="top"
      padding-top="md"
      padding-bottom="xl"
    >
      <Headline
        title="Unser Trainingsangebot"
        tagline="Für jedes Ziel der richtige Weg"
        alignment="center"
      />
      <BaseGrid :cols="2" margin-top="lg">
        <FeatureCard
          v-for="training in trainingTypes"
          :key="training.title"
          :title="training.title"
          :description="training.desc"
          :icon="training.icon"
        />
      </BaseGrid>
    </Section>

    <Section
      variant="highlight-light"
      rounded
      overlap-top
      padding-top="md"
      padding-bottom="md"
      margin-bottom="xl"
    >
      <Headline
        title="Unsere Trainer"
        tagline="Kompetenz und Erfahrung für deinen Erfolg"
        alignment="center"
      />
      <div class="coaches-stack">
        <FeatureSection
          image-src="/img/training/trainer-nicole-gafert.jpg"
          image-alt="Trainerin Nicole Gafert"
        >
          <Headline
            title="Nicole Gafert"
            description="Staatlich geprüfte Tennislehrerin und DTB B-Trainerin. Sie begeistert mit ihrer positiven Art und modernen Trainingsmethoden nach den aktuellen Trainingsrichtlinien des DTB."
            alignment="left"
            margin-bottom="none"
          />
        </FeatureSection>
        <FeatureSection
          image-src="/img/training/trainer-marc-wigge.jpg"
          image-alt="Trainer Marc Wigge"
          image-position="right"
        >
          <Headline
            title="Marc Wigge"
            description="Staatlich geprüfter Tennislehrer und DTB B-Trainer. Mit seiner langjährigen Erfahrung bringt er dein Spiel auf das nächste Level."
            alignment="left"
            margin-bottom="none"
          />
        </FeatureSection>
      </div>
    </Section>

    <BaseCtaSection
      title="Interesse geweckt?"
      tagline="Nimm Kontakt auf"
      description="Für weitere Informationen zum Trainingsangebot, Preisen oder zur Buchung einer Probestunde, kontaktiere die Tennisschule Rot-Weiss direkt."
      :actions="[
        {
          to: 'tel:01608081655',
          label: 'Nicole Gafert anrufen',
          variant: 'outline',
          icon: 'i-heroicons-phone'
        },
        {
          to: 'tel:017696519561',
          label: 'Marc Wigge anrufen',
          variant: 'outline',
          icon: 'i-heroicons-phone'
        },
        {
          to: 'mailto:info@tennisschule-rotweiss.de',
          label: 'E-Mail schreiben',
          variant: 'outline',
          icon: 'i-heroicons-envelope'
        }
      ]"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.school-badge-logo) {
  width: 100%;
  max-width: 250px;
  border-radius: var(--radius-full);
  background-color: var(--color-pure-white);
  padding: var(--space-3);
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));

  @include up("lg") {
    width: 300px;
    max-width: 300px;
  }
}

.partner-intro {
  max-width: 56rem;
  margin-inline: auto;
  text-align: center;
}

.partner-cta {
  margin-top: var(--space-8);
}

.coaches-stack {
  margin-top: var(--space-12);
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}
</style>
