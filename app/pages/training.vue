<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import Button from '~/components/base/Button.vue'
import type { HeroSlide } from '~/components/base/Hero.vue'

useSeoMeta({
  title: 'Training & Tennisschule | TC Hardt',
  ogTitle: 'Training & Tennisschule | TC Hardt',
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
    contentImageClass: 'w-full max-w-[250px] lg:w-[300px] drop-shadow-lg rounded-full bg-white p-3',
    title: 'Training',
    subtitle: 'Professionelles Training für jedes Niveau – direkt bei uns auf der Anlage.',
    contentPosition: 'bottom-center',
    overlayClass: 'bg-gradient-to-t from-brand-dark-900/90 via-brand-dark-900/20 to-transparent'
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
      <div class="max-w-4xl mx-auto text-center">
        <Headline
          tagline="Unser Partner für dein Spiel"
          title="Qualifiziertes Training"
          description="Seit der Sommersaison 2014 ist die Tennisschule Rot-Weiss unser starker Partner auf dem Platz. Mit Erfahrung seit 2011 und Expertise aus verschiedenen Vereinen steht sie für modernes, professionelles Training mit klaren Qualitätsstandards. Egal auf welchem Level Du spielst – Du hast gerade erst angefangen, oder hast bereits einige Erfahrung oder Du spielst sogar ambitioniert in einer Mannschaft – hier wird jeder mit Leidenschaft gefördert."
          alignment="center"
          :margin-bottom="'sm'"
        />
        <div class="mt-8">
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
      <div class="grid md:grid-cols-2 gap-8 mt-12">
        <FeatureCard
          v-for="training in trainingTypes"
          :key="training.title"
          :title="training.title"
          :description="training.desc"
          :icon="training.icon"
        />
      </div>
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
      <div class="mt-12 mx-auto space-y-16">
        <FeatureSection
          image-src="/img/training/trainer-nicole-gafert.jpg"
          image-alt="Trainerin Nicole Gafert"
          :image-rounded="true"
        >
          <Headline
            title="Nicole Gafert"
            description="Staatlich geprüfte Tennislehrerin und DTB B-Trainerin. Sie begeistert mit ihrer positiven Art und modernen Trainingsmethoden nach den aktuellen Trainingsrichtlinien des DTB."
            alignment="none"
            class="items-start text-left"
            :margin-bottom="'none'"
          />
        </FeatureSection>
        <FeatureSection
          image-src="/img/training/trainer-marc-wigge.jpg"
          image-alt="Trainer Marc Wigge"
          :image-rounded="true"
          image-position="right"
        >
          <Headline
            title="Marc Wigge"
            description="Staatlich geprüfter Tennislehrer und DTB B-Trainer. Mit seiner langjährigen Erfahrung bringt er dein Spiel auf das nächste Level."
            alignment="none"
            class="items-start text-left"
            :margin-bottom="'none'"
          />
        </FeatureSection>
      </div>
    </Section>

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
        title="Interesse geweckt?"
        tagline="Nimm Kontakt auf"
        alignment="center"
      />
      <p class="text-gray-700 my-4 max-w-2xl mx-auto">
        Für weitere Informationen zum Trainingsangebot, Preisen oder zur Buchung einer Probestunde, kontaktiere die Tennisschule Rot-Weiss direkt.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          to="tel:01608081655"
          label="Nicole Gafert anrufen"
          variant="outline"
          icon="i-heroicons-phone"
        />
        <Button
          to="tel:017696519561"
          label="Marc Wigge anrufen"
          variant="outline"
          icon="i-heroicons-phone"
        />
        <Button
          to="mailto:info@tennisschule-rotweiss.de"
          label="E-Mail schreiben"
          variant="outline"
          icon="i-heroicons-envelope"
        />
      </div>
    </Section>

  </div>
</template>
