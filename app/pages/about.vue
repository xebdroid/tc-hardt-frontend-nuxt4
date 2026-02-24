<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import Button from '~/components/base/Button.vue'

useHead({
  title: 'Über uns | TC Hardt',
  meta: [{ name: 'description', content: 'Der Tennisclub Hardt 1976 e.V. – Tennis mit Herz und Seele am Hardter Wald.' }]
})
</script>

<template>
  <div>
    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <Headline
          title="Über uns"
          description="Tennis mit Herz und Seele – seit 1976 im Herzen von Hardt."
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
        image-src="/img/about/tc-hardt-facility-06.jpg"
        image-alt="Luftaufnahme der Tennisanlage des TC Hardt"
      >
        <Headline
          tagline="Mitten im Grünen"
          title="Eine der schönsten Anlagen der Region"
          description="Im Herzen von Hardt, direkt am Wald gelegen, findest du unseren mit Herz und Seele geführten Tennisverein. Unsere Anlage glänzt durch ihre traumhafte Lage und einen top-gepflegten Zustand, was sie zu einer der schönsten in Mönchengladbach macht."
          alignment="none"
          class="items-start text-left"
          :margin-bottom="'none'"
        />
        <ul class="mt-8 grid gap-4 text-gray-700">
          <li class="flex items-center gap-3">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-xl text-brand-light-600"
            />
            <span><b>6 frisch sanierte Sandplätze</b> für optimale Spielbedingungen.</span>
          </li>
          <li class="flex items-center gap-3">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-xl text-brand-light-600"
            />
            <span><b>Einladendes Clubhaus</b> mit Sonnenterrasse für gesellige Stunden.</span>
          </li>
          <li class="flex items-center gap-3">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-xl text-brand-light-600"
            />
            <span>Professionelles Training für alle Alters- und Spielklassen.</span>
          </li>
          <li class="flex items-center gap-3">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-xl text-brand-light-600"
            />
            <span>Eine einzigartige <b>Bügelbahn</b> für Spaß abseits des Tennisplatzes.</span>
          </li>
        </ul>
        <div class="mt-8">
          <Button
            :to="$localePath('contact')"
            label="Fragen? Meld dich!"
            variant="outline"
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
        title="Unsere Werte"
        tagline="Darauf legen wir Wert"
        alignment="center"
      />
      <div class="mt-12 max-w-5xl mx-auto">
        <dl class="grid md:grid-cols-2 gap-x-12 gap-y-16">
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-light-500 text-white">
                <UIcon
                  name="i-heroicons-hand-raised"
                  class="h-6 w-6"
                />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                Gastfreundschaft
              </p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              Wir heißen alle Mitglieder und Gäste herzlich willkommen und schaffen eine einladende Atmosphäre.
            </dd>
          </div>
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-light-500 text-white">
                <UIcon
                  name="i-heroicons-users"
                  class="h-6 w-6"
                />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                Teamgeist
              </p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              Wir fördern den Zusammenhalt und die Zusammenarbeit innerhalb des Teams.
            </dd>
          </div>
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-light-500 text-white">
                <UIcon
                  name="i-heroicons-scale"
                  class="h-6 w-6"
                />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                Fairness
              </p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              Wir legen großen Wert auf Fairplay und respektvollen Umgang miteinander, sowohl im Training, als auch im Wettkampf.
            </dd>
          </div>
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-light-500 text-white">
                <UIcon
                  name="i-heroicons-face-smile"
                  class="h-6 w-6"
                />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                Freude am Spiel
              </p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              Der Spaß am Sport steht bei uns im Vordergrund. Wir genießen jede Trainingseinheit und jeden Wettkampf mit Begeisterung.
            </dd>
          </div>
        </dl>
      </div>
    </Section>

    <Section
      variant="highlight-light"
      rounded
      overlap-top
    >
      <Headline
        title="Das zeichnet uns aus"
        tagline="Deine Vorteile"
        alignment="center"
      />
      <div class="grid md:grid-cols-3 gap-8 mt-12">
        <FeatureCard
          title="Faire Beiträge"
          description="Wir bieten attraktive Mitgliedsbeiträge mit Vergünstigungen für Familien, Azubis, Studierende und Senioren."
          icon="i-heroicons-banknotes"
        />
        <FeatureCard
          title="Top Infrastruktur"
          description="Unsere Anlage am Hardter Wald zählt zu den schönsten der Stadt und bietet 6 neue Plätze sowie ein gemütliches Clubhaus."
          icon="i-heroicons-building-office-2"
        />
        <FeatureCard
          title="Familiäres Umfeld"
          description="Wir pflegen einen persönlichen Umgang und stärken die Gemeinschaft durch gemeinsame Veranstaltungen."
          icon="i-heroicons-home-modern"
        />
      </div>
      <div class="mt-12 text-center">
        <Button
          label="Jetzt Mitglied werden"
          :to="$localePath('membership')"
          variant="primary"
          size="lg"
        />
      </div>
    </Section>

    <Section>
      <FeatureSection
        image-src="/img/jubilee/50-jahre-tc-hardt.jpg"
        image-alt="50 Jahre TC Hardt Logo"
        image-position="right"
      >
        <Headline
          tagline="Tradition & Zukunft"
          title="Wir feiern 50 Jahre!"
          description="Seit 1976 schlägt unser Herz für den Tennissport. Im Jahr 2026 feiern wir unser großes Jubiläum. Sei dabei und gestalte mit uns die nächsten 50 Jahre Vereinsgeschichte."
          alignment="none"
          class="items-start text-left"
          :margin-bottom="'none'"
        />
        <div class="mt-8">
          <Button
            :to="$localePath('jubilee')"
            label="Mehr zum Jubiläum"
            variant="primary"
          />
        </div>
      </FeatureSection>
    </Section>
  </div>
</template>
