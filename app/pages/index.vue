<script setup lang="ts">
import db from '~/assets/data/db.json'

// News laden (bleibt wie gehabt)
const newsItems = db.news.map(item => ({
  icon: 'i-heroicons-newspaper',
  title: item.title,
  description: item.excerpt + ` (${item.date})`
}))

// 1. UNSERE WERTE ("Darauf legen wir Wert")
const values = [
  {
    icon: 'i-heroicons-home',
    title: 'Gastfreundschaft',
    description: 'Wir heißen alle Mitglieder und Gäste herzlich willkommen und schaffen eine einladende Atmosphäre.'
  },
  {
    icon: 'i-heroicons-user-group',
    title: 'Teamgeist',
    description: 'Wir fördern den Zusammenhalt und die Zusammenarbeit innerhalb des Teams.'
  },
  {
    icon: 'i-heroicons-scale',
    title: 'Fairness',
    description: 'Wir legen großen Wert auf Fairplay und respektvollen Umgang im Training und Wettkampf.'
  },
  {
    icon: 'i-heroicons-face-smile',
    title: 'Spaß am Spiel',
    description: 'Der Spaß am Sport steht im Vordergrund. Wir genießen jede Einheit mit Begeisterung.'
  }
]

// 2. DAS ZEICHNET UNS AUS ("USPs")
const features = [
  {
    icon: 'i-heroicons-currency-euro',
    title: 'Attraktive Beiträge',
    description: 'Faire Preise mit Vergünstigungen für Familien, Azubis, Studierende und Senioren.'
  },
  {
    icon: 'i-heroicons-map-pin',
    title: 'Top Infrastruktur',
    description: '6 neue Tennisplätze direkt am Hardter Wald und ein gemütliches Clubhaus in Eigenregie.'
  },
  {
    icon: 'i-heroicons-heart',
    title: 'Familiäres Umfeld',
    description: 'Persönlicher Umgang und gemeinsame Veranstaltungen stärken unsere Gemeinschaft.'
  }
]
</script>

<template>
  <div class="flex flex-col">

    <div class="relative flex items-center min-h-[600px] bg-tennis-900">
      <img
        src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop"
        class="absolute inset-0 w-full h-full object-cover opacity-40"
        alt="Tennisplatz TC Hardt"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-tennis-900 via-tennis-900/20 to-tennis-900/60"></div>

      <UPageHero
        title="Herzlich willkommen beim TC Hardt 1976 e.V.!"
        description="Der Treffpunkt für Klein und Groß, um sportliche Gemeinschaft und Wettkampf zu erleben. Entdecke unsere Angebote und werde Teil der Familie."
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
          title: 'text-white font-extrabold sm:text-5xl lg:text-6xl',
          description: 'text-gray-200 mt-6 text-lg max-w-2xl mx-auto'
        }"
      >
        <template #headline>
           <UBadge variant="subtle" size="md" class="mb-4 rounded-full bg-white/10 text-white ring-1 ring-white/20">Seit 1976</UBadge>
        </template>
      </UPageHero>
    </div>

    <UPageSection
      id="werte"
      title="Darauf legen wir Wert"
      description="Unsere Philosophie für ein gutes Miteinander."
      :features="values"
      class="bg-white"
    />

    <UPageSection
      id="features"
      title="Das zeichnet uns aus"
      description="Warum du dich bei uns wohlfühlen wirst."
      align="left"
      :features="features"
      class="bg-gray-50"
    >
      <template #links>
        <UButton to="/kontakt" color="black" variant="link">Zu den Mitgliedsbeiträgen &rarr;</UButton>
       </template>
    </UPageSection>

    <section class="py-24 bg-white">
      <UContainer>
        <div class="max-w-3xl mx-auto text-center space-y-8">

          <h2 class="text-3xl font-bold text-tennis-900">Tennis & mehr im Hardter Wald</h2>

          <p class="text-lg text-gray-600 leading-relaxed">
            Egal ob du Anfänger, Fortgeschrittener oder erfahrener Spieler bist: Bei uns findest du die perfekte Umgebung auf der schönsten Tennisanlage im Mönchengladbacher Stadtgebiet. Unsere moderne Anlage bietet erstklassige Plätze, professionelle Trainer und ein breites Spektrum an Trainingsmöglichkeiten.
          </p>

          <p class="text-lg text-gray-600 leading-relaxed">
            Neben dem Sport steht bei uns auch das Vereinsleben im Mittelpunkt. Gemeinsame Events, Turniere und gesellige Zusammenkünfte sorgen dafür, dass sich jedes Mitglied wohlfühlt.
          </p>

          <div class="bg-tennis-50 rounded-2xl p-8 border border-tennis-100 my-10">
            <div class="flex items-center justify-center gap-2 mb-4">
              <UIcon name="i-heroicons-sparkles" class="text-tennis-500 w-6 h-6" />
              <h3 class="text-xl font-bold text-tennis-900">Schon gewusst?</h3>
            </div>
            <p class="text-gray-700 font-medium">
              Nicht nur Tennis kann bei uns gespielt werden! Unsere Anlage bietet dir auch ein stadtweites Alleinstellungsmerkmal: <br/>
              <span class="text-tennis-600 font-bold text-lg">Unsere eigene Bügelbahn!</span>
            </p>
            <p class="text-sm text-gray-500 mt-2">Du fragst dich was das sein könnte? Komm vorbei und finde es heraus!</p>
          </div>

        </div>
      </UContainer>
    </section>

    <UPageSection
      title="Aktuelles vom Verein"
      :features="newsItems"
      class="bg-gray-50"
    />

    <UPageCTA
      title="Werde Teil unserer Tennisfamilie"
      description="Schau dich bei uns um, informiere dich über unsere Angebote und komm vorbei. Wir freuen uns darauf, dich persönlich zu begrüßen!"
      :links="[{ label: 'Kontakt aufnehmen', to: '/kontakt', color: 'primary', size: 'lg' }]"
    />

    <section class="py-12 bg-white border-t border-gray-100 overflow-hidden">
      <UContainer>
        <p class="text-center text-gray-400 text-sm font-semibold uppercase tracking-widest mb-8">
          Unsere Partner & Sponsoren
        </p>

        <div class="relative w-full overflow-hidden mask-gradient">
          <div class="flex w-max animate-scroll gap-12 items-center">

            <img src="https://placehold.co/150x80?text=Sponsor+1" class="h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Sponsor" />
            <img src="https://placehold.co/150x80?text=Sponsor+2" class="h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Sponsor" />
            <img src="https://placehold.co/150x80?text=Sponsor+3" class="h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Sponsor" />
            <img src="https://placehold.co/150x80?text=Sponsor+4" class="h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Sponsor" />
            <img src="https://placehold.co/150x80?text=Sponsor+5" class="h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Sponsor" />

            <img src="https://placehold.co/150x80?text=Sponsor+1" class="h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Sponsor" />
            <img src="https://placehold.co/150x80?text=Sponsor+2" class="h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Sponsor" />
            <img src="https://placehold.co/150x80?text=Sponsor+3" class="h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Sponsor" />
            <img src="https://placehold.co/150x80?text=Sponsor+4" class="h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Sponsor" />
            <img src="https://placehold.co/150x80?text=Sponsor+5" class="h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Sponsor" />

          </div>
        </div>

        <div class="text-center mt-8">
           <UButton to="/sponsoring" variant="link" color="gray">Sponsor werden &rarr;</UButton>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<style scoped>
/* Endlos-Animation */
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } /* Bewegt sich um 50% (ein Satz Logos) nach links */
}

.animate-scroll {
  animation: scroll 20s linear infinite; /* 20s für einen Durchlauf */
}

.animate-scroll:hover {
  animation-play-state: paused; /* Anhalten bei Maus-Hover */
}

/* Weiche Kanten links und rechts */
.mask-gradient {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
</style>
