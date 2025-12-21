<script setup lang="ts">
import db from '~/assets/data/db.json'

// Mapping der News
const newsItems = db.news.map(item => ({
  icon: 'i-heroicons-newspaper',
  title: item.title,
  description: item.excerpt + ` (${item.date})`
}))

const clubFeatures = [
  { icon: 'i-heroicons-trophy', title: '7 Ascheplätze', description: 'Gepflegte Plätze im Grünen.' },
  { icon: 'i-heroicons-user-group', title: 'Gemeinschaft', description: 'Spielpartner für jedes Niveau.' },
  { icon: 'i-heroicons-sparkles', title: 'Training', description: 'Förderung für Jugend & Erwachsene.' },
  { icon: 'i-heroicons-home-modern', title: 'Gastronomie', description: 'Sonnenterrasse & kühle Drinks.' }
]

// Werte für UPageSection
const values = [
  { icon: 'i-heroicons-home', title: 'Gastfreundschaft', description: 'Wir heißen alle herzlich willkommen.' },
  { icon: 'i-heroicons-user-group', title: 'Teamgeist', description: 'Wir fördern den Zusammenhalt.' },
  { icon: 'i-heroicons-scale', title: 'Fairness', description: 'Respektvoller Umgang ist uns wichtig.' },
  { icon: 'i-heroicons-face-smile', title: 'Spaß am Spiel', description: 'Freude am Sport steht im Vordergrund.' }
]
</script>

<template>
  <div class="flex flex-col">

    <div class="relative flex items-center min-h-[650px] bg-tennis-900">
      <img
        src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop"
        class="absolute inset-0 w-full h-full object-cover opacity-40"
        alt="Tennisplatz"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-tennis-900 via-tennis-900/40 to-transparent"></div>

      <UPageHero
        :title="$t('welcome')"
        description="Dein Treffpunkt für sportliche Gemeinschaft und Wettkampf am Hardter Wald."
        align="center"
        :links="[{
          label: 'Mitglied werden',
          to: '/kontakt',
          trailingIcon: 'i-heroicons-arrow-right',
          color: 'primary',
          size: 'xl'
        }, {
          label: 'Mehr erfahren',
          to: '/ueber-uns',
          color: 'white',
          variant: 'subtle',
          size: 'xl'
        }]"
        :ui="{
          wrapper: 'relative z-10 py-24',
          title: 'text-white font-extrabold sm:text-6xl',
          description: 'text-gray-100 mt-6 text-lg max-w-2xl mx-auto'
        }"
      >
         <template #headline>
           <UBadge variant="subtle" size="md" class="mb-4 rounded-full bg-white/10 text-white ring-1 ring-white/20">Seit 1976</UBadge>
        </template>
      </UPageHero>
    </div>

    <UPageSection
      title="Darauf legen wir Wert"
      description="Unsere Philosophie für ein gutes Miteinander."
      :features="values"
      class="bg-white dark:bg-gray-900"
    />

    <UPageSection
      title="Aktuelles vom Verein"
      :features="newsItems"
      class="bg-gray-50 dark:bg-gray-800"
    />

    <UPageCTA
      title="Werde Teil unserer Tennisfamilie"
      description="Komm vorbei, wir freuen uns auf dich!"
      :links="[{ label: 'Kontakt aufnehmen', to: '/kontakt', color: 'primary', size: 'lg' }]"
      class="bg-white dark:bg-gray-900"
    />

    <section class="py-12 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      <UContainer>
        <p class="text-center text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-widest mb-8">
          Unsere Partner
        </p>
        <div class="relative w-full overflow-hidden mask-gradient">
          <div class="flex w-max animate-scroll gap-12 items-center">
             <div v-for="i in 10" :key="i" class="h-12 w-32 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-400 rounded">LOGO {{ i }}</div>
          </div>
        </div>
      </UContainer>
    </section>

  </div>
</template>

<style scoped>
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-scroll {
  animation: scroll 30s linear infinite;
}
.mask-gradient {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
</style>
