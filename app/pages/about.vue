<script setup lang="ts">
import PageHero from '~/components/sections/PageHero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import FeatureCard from '~/components/sections/FeatureCard.vue'
import FeatureSection from '~/components/sections/FeatureSection.vue'
import BaseGrid from '~/components/base/Grid.vue'
import BaseIconList, { type IconListItem } from '~/components/base/IconList.vue'
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

useSeoMeta({
  title: 'Über uns',
  ogTitle: 'Über uns',
  description: 'Der Tennisclub Hardt 1976 e.V. – Tennis mit Herz und Seele am Hardter Wald. Erfahre mehr über unsere Anlage, unsere Werte und unsere Geschichte.',
  ogDescription: 'Der Tennisclub Hardt 1976 e.V. – Tennis mit Herz und Seele am Hardter Wald. Erfahre mehr über unsere Anlage, unsere Werte und unsere Geschichte.',
  ogImage: '/img/about/tc-hardt-anlage.jpg',
  twitterCard: 'summary_large_image',
})

const highlightsList: IconListItem[] = [
  { label: '6 frisch sanierte Sandplätze', text: 'für optimale Spielbedingungen.' },
  { label: 'Einladendes Clubhaus', text: 'mit Sonnenterrasse für gesellige Stunden.' },
  { text: 'Professionelles Training für alle Alters- und Spielklassen.' },
  { text: 'Eine einzigartige Bügelbahn für Spaß abseits des Tennisplatzes.' }
]
</script>

<template>
  <div>
    <PageHero
      title="Über uns"
      description="Tennis mit Herz und Seele – seit 1976 im Herzen von Hardt."
    />

    <Section>
      <FeatureSection
        image-src="/img/about/tc-hardt-anlage.jpg"
        image-alt="Luftaufnahme der Tennisanlage des TC Hardt"
      >
        <Headline
          tagline="Mitten im Grünen"
          title="Eine der schönsten Anlagen der Region"
          description="Im Herzen von Hardt, direkt am Wald gelegen, findest du unseren mit Herz und Seele geführten Tennisverein. Unsere Anlage glänzt durch ihre traumhafte Lage und einen top-gepflegten Zustand, was sie zu einer der schönsten in Mönchengladbach macht."
          alignment="left"
          margin-bottom="none"
        />
        <BaseIconList
          :items="highlightsList"
          icon-color="brand-light"
          icon-size="lg"
          margin-top="md"
        />
        <div class="cta-wrap">
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
      <div class="values-container">
        <dl class="values-dl">
          <div class="value-entry">
            <dt>
              <div class="value-badge">
                <BaseIcon name="i-heroicons-hand-raised" class="badge-icon" />
              </div>
              <p class="value-name">Gastfreundschaft</p>
            </dt>
            <dd class="value-text">
              Wir heißen alle Mitglieder und Gäste herzlich willkommen und schaffen eine einladende Atmosphäre.
            </dd>
          </div>
          <div class="value-entry">
            <dt>
              <div class="value-badge">
                <BaseIcon name="i-heroicons-users" class="badge-icon" />
              </div>
              <p class="value-name">Teamgeist</p>
            </dt>
            <dd class="value-text">
              Wir fördern den Zusammenhalt und die Zusammenarbeit innerhalb des Teams.
            </dd>
          </div>
          <div class="value-entry">
            <dt>
              <div class="value-badge">
                <BaseIcon name="i-heroicons-scale" class="badge-icon" />
              </div>
              <p class="value-name">Fairness</p>
            </dt>
            <dd class="value-text">
              Wir legen großen Wert auf Fairplay und respektvollen Umgang miteinander, sowohl im Training, als auch im Wettkampf.
            </dd>
          </div>
          <div class="value-entry">
            <dt>
              <div class="value-badge">
                <BaseIcon name="i-heroicons-face-smile" class="badge-icon" />
              </div>
              <p class="value-name">Freude am Spiel</p>
            </dt>
            <dd class="value-text">
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
      <BaseGrid :cols="3" margin-top="lg">
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
      </BaseGrid>
      <div class="bottom-cta">
        <Button
          label="Jetzt Mitglied werden"
          :to="$localePath('membership')"
          variant="primary"
          size="lg"
        />
      </div>
    </Section>
  </div>
</template>

<style lang="scss" scoped>
.cta-wrap {
  margin-top: var(--space-8);
}

.values-container {
  margin-top: var(--space-12);
  max-width: 64rem;
  margin-inline: auto;
}

.values-dl {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  column-gap: var(--space-12);
  row-gap: var(--space-16);

  @include up("md") {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.value-entry {
  position: relative;
}

.value-badge {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-brand-light-500);
  color: var(--color-white);
}

.badge-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.value-name {
  margin: 0 0 0 4rem;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: var(--color-gray-900);
}

.value-text {
  margin: var(--space-2) 0 0 4rem;
  font-size: 1rem;
  color: var(--color-gray-500);
}

.bottom-cta {
  margin-top: var(--space-12);
  text-align: center;
}
</style>
