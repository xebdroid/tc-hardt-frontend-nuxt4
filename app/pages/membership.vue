<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/section/Hero.vue'
import AppButton from '~/components/base/AppButton.vue'
import db from '~/assets/data/db.json'

useHead({
  title: 'Mitglied werden | TC Hardt',
  meta: [{ name: 'description', content: 'Werde Teil unserer Tennis-Gemeinschaft. Tarife und Aufnahmeantrag.' }]
})

// --- CONFIG ---
const PDF_PATH = '/downloads/Aufnahmeantrag_TC_Hardt.pdf'

// --- DATA ---
const rawTariffs = db.tariffs

// 1. HERO SLIDES
const heroSlides = computed<HeroSlide[]>(() => [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop',
    title: 'Dein Platz ist bei uns.',
    subtitle: 'Tennis, Gemeinschaft & Leidenschaft.',
    description: 'Egal ob Anfänger oder Profi – beim TC Hardt findest du ideale Bedingungen und ein lebendiges Vereinsleben.',
    overlayPosition: 'center',
    ctaPrimary: { label: 'Tarife wählen', to: '#tarife' },
    ctaSecondary: { label: 'Direkt zum Antrag', to: '#anmeldung', icon: 'i-heroicons-arrow-down-tray' }
  }
])

// 2. BENEFITS
const benefits = [
  { icon: 'i-heroicons-sparkles', title: '6 Top-Plätze', desc: 'Hervorragend gepflegte Ascheplätze.', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/10' },
  { icon: 'i-heroicons-user-group', title: 'Tolle Community', desc: 'Vom Schleifchenturnier bis zum Sommerfest.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
  { icon: 'i-heroicons-academic-cap', title: 'Training', desc: 'Tennisschule für Groß & Klein.', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/10' },
  { icon: 'i-heroicons-home-modern', title: 'Gastronomie', desc: 'Sonnenterrasse & Clubhaus.', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/10' },
]

// --- HELPER ---
const formatPrice = (price: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)

const scrollToDownload = () => {
  const el = document.getElementById('anmeldung')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

// --- TRANSFORMER ---
const mapToPlan = (t: any) => {
  const isTrial = t.id.startsWith('trial_')
  const hasDiscount = ['adult', 'family', 'student', 'youth'].includes(t.id)

  // Design Logic
  let borderClass = isTrial
    ? 'ring-2 ring-highlight-500 shadow-lg'
    : 'border border-gray-200 dark:border-gray-800 hover:border-brand-dark-500 hover:shadow-lg'

  // Badges
  let badge = undefined
  if (t.id === 'adult') badge = { label: 'Bestseller', variant: 'soft', color: 'primary' }
  if (t.id === 'family') badge = { label: 'Top Deal', variant: 'subtle', color: 'primary' }
  if (isTrial && t.price === 0) badge = { label: 'Kostenlos', variant: 'solid', color: 'primary' }

  return {
    title: t.label,
    description: t.description,
    price: formatPrice(t.price),
    discount: hasDiscount ? formatPrice(t.price / 2) : undefined,
    billingCycle: t.suffix,
    features: t.features,
    badge: badge,

    class: `bg-white dark:bg-gray-900 rounded-2xl p-6 flex flex-col h-full relative transition-all duration-300 ${borderClass}`,

    // Config für AppButton
    button: {
      label: 'Zum Antrag',
      icon: 'i-heroicons-arrow-down-tray',
      variant: 'primary', // HIER GEÄNDERT: Immer Primary für bessere Sichtbarkeit
      block: true,
      size: 'md',
    }
  }
}

const trialPlans = computed(() => rawTariffs.filter(t => t.id.startsWith('trial_')).map(mapToPlan))
const adultPlans = computed(() => rawTariffs.filter(t => ['adult', 'family', 'senior'].includes(t.id)).map(mapToPlan))
const otherPlans = computed(() => rawTariffs.filter(t => ['student', 'youth', 'child', 'passive'].includes(t.id)).map(mapToPlan))

// --- ACCORDION CONFIG ---
const accordionItems = [
  {
    label: '1. Schnupperangebot (Risikofrei testen)',
    icon: 'i-heroicons-sparkles',
    slot: 'trial',
    value: 'trial',
    content: 'Ideal für Einsteiger. Endet automatisch nach 3 Monaten.'
  },
  {
    label: '2. Reguläre Mitgliedschaft',
    icon: 'i-heroicons-users',
    slot: 'regular',
    value: 'regular',
    content: 'Für aktive Spieler und Familien. Mit 50% Rabatt im ersten Jahr.'
  },
  {
    label: '3. Weitere Optionen (Jugend & Passiv)',
    icon: 'i-heroicons-academic-cap',
    slot: 'others',
    value: 'others',
    content: 'Tarife für Studenten, Azubis, Kinder und passive Förderer.'
  }
]
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-950 pb-24 sm:pb-0">

    <Hero :slides="heroSlides" height="medium" fallback-class="bg-brand-dark-900" />

    <div class="bg-white dark:bg-gray-900 py-16 border-b border-gray-100 dark:border-gray-800">
      <UContainer>
        <div class="text-center mb-12 max-w-3xl mx-auto">
          <h2 class="text-3xl font-heading font-bold text-brand-dark-900 dark:text-white mb-4">
            Mehr als nur ein Tennisclub
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-lg">
            Beim TC Hardt triffst du Freunde. Wir legen Wert auf ein familiäres Miteinander,
            sportlichen Ehrgeiz und gesellige Abende auf unserer Terrasse.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(benefit, index) in benefits" :key="index" class="text-center p-4">
             <div class="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-110" :class="benefit.bg">
              <UIcon :name="benefit.icon" class="w-7 h-7" :class="benefit.color" />
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ benefit.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>
      </UContainer>
    </div>

    <div id="tarife" class="py-20 scroll-mt-16 bg-gray-50 dark:bg-gray-950">
      <UContainer class="max-w-4xl">

        <div class="text-center mb-10">
          <h2 class="text-3xl font-heading font-bold text-brand-dark-900 dark:text-white">
            Wähle deinen Tarif
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mt-2">
            Klicke auf die Bereiche, um die Optionen zu sehen.
          </p>
        </div>

        <UAccordion
          type="multiple"
          :items="accordionItems"
          :default-value="['trial']"
          :ui="{
            wrapper: 'space-y-4',
            item: {
              base: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden mb-4',
              padding: 'p-0'
            },
            trigger: 'px-6 py-5 text-lg font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
            content: 'px-6 pb-8 pt-2 text-gray-500 dark:text-gray-400',
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
          }"
        >

          <template #trial>
            <div class="mt-4">
              <div class="mb-6 flex items-center gap-2 text-sm text-highlight-600 bg-highlight-50 dark:bg-highlight-900/10 p-3 rounded-lg border border-highlight-200">
                <UIcon name="i-heroicons-information-circle" class="w-5 h-5 shrink-0" />
                <span>Das Schnupperangebot endet automatisch nach 3 Monaten. Keine Kündigung nötig.</span>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <div v-for="(plan, i) in trialPlans" :key="i" :class="plan.class">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">{{ plan.title }}</h4>
                    <UBadge v-if="plan.badge" :color="plan.badge.color" :variant="plan.badge.variant" size="xs">{{ plan.badge.label }}</UBadge>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px]">{{ plan.description }}</p>

                  <ul class="space-y-2 mb-8 flex-1">
                    <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <UIcon name="i-heroicons-check" class="w-5 h-5 text-green-500 shrink-0" />
                      <span>{{ feature }}</span>
                    </li>
                  </ul>

                  <div class="pt-6 border-t border-gray-100 dark:border-gray-800 mt-auto">
                    <div class="flex items-baseline gap-1 mb-4">
                      <span class="text-2xl font-bold text-brand-dark-900 dark:text-white">{{ plan.price }}</span>
                      <span class="text-xs text-gray-500">{{ plan.billingCycle }}</span>
                    </div>
                    <AppButton v-bind="plan.button" @click="scrollToDownload" />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #regular>
             <div class="mt-4">
               <div class="mb-6 flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-200">
                <UIcon name="i-heroicons-currency-euro" class="w-5 h-5 shrink-0" />
                <span>50% Rabatt im ersten Jahr für alle aktiven Neumitglieder!</span>
              </div>
               <div class="grid md:grid-cols-2 gap-6">
                  <div v-for="(plan, i) in adultPlans" :key="i" :class="plan.class">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="text-lg font-bold text-gray-900 dark:text-white">{{ plan.title }}</h4>
                      <UBadge v-if="plan.badge" :color="plan.badge.color" :variant="plan.badge.variant" size="xs">{{ plan.badge.label }}</UBadge>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px]">{{ plan.description }}</p>

                    <ul class="space-y-2 mb-8 flex-1">
                      <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <UIcon name="i-heroicons-check" class="w-5 h-5 text-green-500 shrink-0" />
                        <span>{{ feature }}</span>
                      </li>
                    </ul>

                    <div class="pt-6 border-t border-gray-100 dark:border-gray-800 mt-auto">
                      <div class="flex items-baseline gap-1 mb-4">
                        <div v-if="plan.discount" class="text-sm text-gray-400 line-through mr-2">{{ plan.price }}</div>
                        <span class="text-2xl font-bold text-brand-dark-900 dark:text-white">{{ plan.discount || plan.price }}</span>
                        <span class="text-xs text-gray-500">{{ plan.billingCycle }}</span>
                      </div>
                      <AppButton v-bind="plan.button" @click="scrollToDownload" />
                    </div>
                  </div>
               </div>
             </div>
          </template>

          <template #others>
            <div class="mt-4">
              <p class="text-sm text-gray-500 mb-6">Tarife für Kinder, Jugendliche, Azubis und passive Förderer.</p>
              <div class="grid md:grid-cols-2 gap-6">
                <div v-for="(plan, i) in otherPlans" :key="i" :class="plan.class">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">{{ plan.title }}</h4>
                    <UBadge v-if="plan.badge" :color="plan.badge.color" :variant="plan.badge.variant" size="xs">{{ plan.badge.label }}</UBadge>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px]">{{ plan.description }}</p>

                  <ul class="space-y-2 mb-8 flex-1">
                    <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <UIcon name="i-heroicons-check" class="w-5 h-5 text-green-500 shrink-0" />
                      <span>{{ feature }}</span>
                    </li>
                  </ul>

                  <div class="pt-6 border-t border-gray-100 dark:border-gray-800 mt-auto">
                    <div class="flex items-baseline gap-1 mb-4">
                      <span class="text-2xl font-bold text-brand-dark-900 dark:text-white">{{ plan.price }}</span>
                      <span class="text-xs text-gray-500">{{ plan.billingCycle }}</span>
                    </div>
                    <AppButton v-bind="plan.button" @click="scrollToDownload" />
                  </div>
                </div>
              </div>
            </div>
          </template>

        </UAccordion>

      </UContainer>
    </div>

    <div id="anmeldung" class="w-full bg-brand-dark-900 dark:bg-gray-950 py-24 border-t border-brand-dark-800 scroll-mt-16 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <UContainer class="max-w-4xl relative z-10">

        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
            So wirst du Mitglied
          </h2>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Dein Weg in den Club – einfach und unkompliziert.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 relative mb-16">
          <div class="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-brand-dark-700 -z-10"></div>

          <div class="flex flex-col items-center text-center group">
            <div class="w-20 h-20 rounded-2xl bg-brand-dark-800 border border-brand-dark-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-highlight-500 transition-all z-10">
              <UIcon name="i-heroicons-arrow-down-tray" class="w-8 h-8 text-highlight-400" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">1. Herunterladen</h3>
            <p class="text-sm text-gray-400">Lade das PDF auf dein Gerät.</p>
          </div>

          <div class="flex flex-col items-center text-center group">
             <div class="w-20 h-20 rounded-2xl bg-brand-dark-800 border border-brand-dark-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-highlight-500 transition-all z-10">
              <UIcon name="i-heroicons-pencil-square" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">2. Ausfüllen</h3>
            <p class="text-sm text-gray-400">Digital oder per Hand.</p>
          </div>

          <div class="flex flex-col items-center text-center group">
             <div class="w-20 h-20 rounded-2xl bg-brand-dark-800 border border-brand-dark-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-highlight-500 transition-all z-10">
              <UIcon name="i-heroicons-paper-airplane" class="w-8 h-8 text-green-400" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">3. Absenden</h3>
            <p class="text-sm text-gray-400">E-Mail oder Post.</p>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <UIcon name="i-heroicons-document-text" class="absolute -right-6 -bottom-6 w-48 h-48 text-gray-100 dark:text-gray-800 rotate-12 pointer-events-none" />

          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-brand-dark-900 dark:text-white mb-4">
              Aufnahmeantrag TC Hardt
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
              Hier findest du das offizielle Anmeldeformular inklusive der Datenschutzhinweise.
            </p>

            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <AppButton
                :to="PDF_PATH"
                target="_blank"
                size="xl"
                icon="i-heroicons-arrow-down-tray"
                class="shadow-xl hover:shadow-2xl transition-all"
                variant="primary"
                label="Antrag herunterladen (PDF)"
              />
            </div>

            <div class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 grid sm:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center justify-center sm:justify-end gap-2">
                <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-brand-dark-500" />
                <span>E-Mail: <a href="mailto:info@tc-hardt.de" class="text-brand-dark-600 dark:text-brand-dark-400 font-bold hover:underline">info@tc-hardt.de</a></span>
              </div>
              <div class="flex items-center justify-center sm:justify-start gap-2">
                 <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-brand-dark-500" />
                <span>Post: <strong>Birkmannsweg 16</strong></span>
              </div>
            </div>
          </div>
        </div>

      </UContainer>
    </div>

    <div class="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-fade-in-up">
      <AppButton
        :to="PDF_PATH"
        target="_blank"
        block
        size="xl"
        variant="primary"
        class="shadow-2xl border-2 border-white dark:border-gray-800"
        icon="i-heroicons-arrow-down-tray"
        label="Antrag jetzt laden"
      />
    </div>

  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out 1s backwards;
}
</style>
