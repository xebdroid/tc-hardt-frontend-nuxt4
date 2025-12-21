<script setup lang="ts">
// Importiere die Datenbank für News (bleibt vorerst statisch/deutsch, da Datenbank-Inhalt)
import db from '~/assets/data/db.json'

// Wir brauchen 't' für Übersetzungen und 'localePath' für Links
const { t } = useI18n()
const localePath = useLocalePath()

// News Mapping (Inhalt kommt aus DB, daher Titel hier nur bedingt übersetzbar,
// außer du übersetzt auch die DB. Fürs Layout reicht das so.)
const newsItems = db.news.map(item => ({
  icon: 'i-heroicons-newspaper',
  title: item.title,
  description: item.excerpt + ` (${item.date})`
}))

// Statische Features (Ascheplätze etc.) - hier mischen wir Icons mit Übersetzungen
const clubFeatures = computed(() => [
  { icon: 'i-heroicons-trophy', title: '7 Ascheplätze', description: 'Gepflegte Plätze im Grünen.' },
  { icon: 'i-heroicons-user-group', title: 'Gemeinschaft', description: 'Spielpartner für jedes Niveau.' },
  { icon: 'i-heroicons-sparkles', title: 'Training', description: 'Förderung für Jugend & Erwachsene.' },
  { icon: 'i-heroicons-home-modern', title: 'Gastronomie', description: 'Sonnenterrasse & kühle Drinks.' }
])

// Werte des Vereins (Das ist jetzt voll übersetzt!)
// Wir nutzen 'computed', damit es sich aktualisiert, wenn man die Sprache wechselt
const values = computed(() => [
  {
    icon: 'i-heroicons-home',
    title: t('home.features.items.hospitality.title'),
    description: t('home.features.items.hospitality.desc')
  },
  {
    icon: 'i-heroicons-user-group',
    title: t('home.features.items.team_spirit.title'),
    description: t('home.features.items.team_spirit.desc')
  },
  {
    icon: 'i-heroicons-scale',
    title: t('home.features.items.fairness.title'),
    description: t('home.features.items.fairness.desc')
  },
  {
    icon: 'i-heroicons-face-smile',
    title: t('home.features.items.fun.title'),
    description: t('home.features.items.fun.desc')
  }
])
</script>

<template>
  <div class="flex flex-col">

    <div class="relative flex items-center min-h-[650px] bg-tennis-900">
      <img src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop"
        class="absolute inset-0 w-full h-full object-cover opacity-40" alt="Tennisplatz" />
      <div class="absolute inset-0 bg-gradient-to-t from-tennis-900 via-tennis-900/40 to-transparent"></div>

      <UPageHero :title="$t('home.hero.title')" :description="$t('home.hero.description')" align="center" :links="[{
        label: $t('home.hero.cta_primary'),
        to: localePath('contact'),
        trailingIcon: 'i-heroicons-arrow-right',
        color: 'primary',
        size: 'xl'
      }, {
        label: $t('home.hero.cta_secondary'),
        to: localePath('about'),
        color: 'white',
        variant: 'subtle',
        size: 'xl'
      }]" :ui="{
          wrapper: 'relative z-10 py-24',
          title: 'text-white font-extrabold sm:text-6xl',
          description: 'text-gray-100 mt-6 text-lg max-w-2xl mx-auto'
        }">
        <template #headline>
          <UBadge variant="subtle" size="md" class="mb-4 rounded-full bg-white/10 text-white ring-1 ring-white/20">
            {{ $t('home.hero.badge') }}
          </UBadge>
        </template>
      </UPageHero>
    </div>

    <UPageSection :title="$t('home.features.title')" :description="$t('home.features.description')" :features="values"
      class="bg-white dark:bg-gray-900" />

    <UPageSection :title="$t('home.news.title')" :features="newsItems" class="bg-gray-50 dark:bg-gray-800" />

    <UPageCTA :title="$t('home.cta_bottom.title')" :description="$t('home.cta_bottom.description')" :links="[{
      label: $t('home.cta_bottom.button'),
      to: localePath('contact'),
      color: 'primary',
      size: 'lg'
    }]" class="bg-white dark:bg-gray-900" />

    <section class="py-12 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      <UContainer>
        <p class="text-center text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-widest mb-8">
          Unsere Partner
        </p>
        <div class="relative w-full overflow-hidden mask-gradient">
          <div class="flex w-max animate-scroll gap-12 items-center">
            <div v-for="i in 10" :key="i"
              class="h-12 w-32 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-400 rounded">
              LOGO {{ i }}</div>
          </div>
        </div>
      </UContainer>
    </section>

  </div>
</template>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.mask-gradient {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
</style>
