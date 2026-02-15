<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import Button from '~/components/base/Button.vue'

useHead({
  title: 'Training & Tennisschule | TC Hardt',
  meta: [{ name: 'description', content: 'Professionelles Training für jedes Niveau beim TC Hardt durch die Tennisschule Rot-Weiß.' }]
})

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
  }
]
</script>

<template>
  <div>
    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <Headline
          title="Tennisschule Rot-Weiss"
          description="Professionelles Training für jedes Niveau – direkt bei uns auf der Anlage."
          :tag="'h1'"
          :size="'h1'"
          :mode="'light'"
          :alignment="'center'"
          :margin-bottom="'sm'"
        />
      </template>
    </Hero>

    <Section>
      <FeatureSection
        image-src="/img/training/tennisschule-rot-weiss.jpg"
        image-alt="Logo der Tennisschule Rot-Weiss"
      >
        <Headline
          tagline="Unser Partner für dein Spiel"
          title="Qualifiziertes Training mit DTB/VDT-Lizenz"
          description="Seit der Sommersaison 2014 arbeiten wir erfolgreich mit der Tennisschule Rot-Weiss zusammen. Als „Deutsche Tennisschule“, anerkannt vom DTB und VDT, garantiert sie ein qualifiziertes Training nach modernsten Methoden und festgelegten Qualitätsstandards."
          alignment="none"
          class="items-start text-left"
          :margin-bottom="'none'"
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
      </FeatureSection>
    </Section>

    <Section
      variant="secondary-light"
      rounded="top"
      padding-bottom="xl"
    >
      <Headline
        title="Unser Trainingsangebot"
        tagline="Für jedes Ziel der richtige Weg"
        alignment="center"
      />
      <div class="grid md:grid-cols-3 gap-8 mt-12">
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
      padding-bottom="xl"
    >
      <Headline
        title="Unsere Trainer"
        tagline="Kompetenz und Erfahrung für deinen Erfolg"
        alignment="center"
      />
      <div class="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-16">
        <FeatureSection
          image-src="/img/training/trainer-marc-wigge.jpg"
          image-alt="Trainer Marc Wigge"
          :image-rounded="true"
        >
          <Headline
            title="Marc Wigge"
            description="Staatlich geprüfter Tennislehrer und DTB B-Trainer. Mit seiner langjährigen Erfahrung bringt er dein Spiel auf das nächste Level."
            alignment="none"
            class="items-start text-left"
            :margin-bottom="'none'"
          />
        </FeatureSection>
        <FeatureSection
          image-src="/img/training/trainer-nicole-gafert.jpg"
          image-alt="Trainerin Nicole Gafert"
          :image-rounded="true"
        >
          <Headline
            title="Nicole Gafert"
            description="Staatlich geprüfte Tennislehrerin und DTB B-Trainerin. Sie begeistert mit ihrer positiven Art und modernen Trainingsmethoden."
            alignment="none"
            class="items-start text-left"
            :margin-bottom="'none'"
          />
        </FeatureSection>
      </div>
    </Section>

    <Section>
      <div class="bg-brand-light-50 rounded-2xl p-8 md:p-12 text-center">
        <Headline
          title="Interesse geweckt?"
          tagline="Nimm Kontakt auf"
          alignment="center"
        />
        <p class="text-gray-700 my-4 max-w-2xl mx-auto">
          Für weitere Informationen zum Trainingsangebot, Preisen oder zur Buchung einer Probestunde, kontaktiere die Tennisschule Rot-Weiss direkt.
        </p>
        <div class="mt-8 text-gray-800 space-y-2">
          <p><strong>Tennisschule Rot-Weiss (M. Wigge und N. Gafert GbR)</strong></p>
          <p>Marc Wigge: <a href="tel:017696519561" class="hover:underline">0176 / 96 51 95 61</a></p>
          <p>Nicole Gafert: <a href="tel:01608081655" class="hover:underline">0160 / 8 08 16 55</a></p>
          <p><a href="mailto:info@tennisschule-rotweiss.de" class="hover:underline">info@tennisschule-rotweiss.de</a></p>
        </div>
      </div>
    </Section>

  </div>
</template>