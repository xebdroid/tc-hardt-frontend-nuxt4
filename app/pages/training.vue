<script setup lang="ts">
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

    <div class="relative bg-tennis-900 py-24 text-center text-white overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <UContainer class="relative z-10">
        <UBadge variant="outline" color="white" class="mb-4">Kooperation</UBadge>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-6">Training beim TC Hardt</h1>
        <p class="text-xl text-tennis-100 max-w-2xl mx-auto">
          Ob Einsteiger, Hobbyspieler oder Profi – dank der <strong class="text-white">Tennisschule Rot-Weiß</strong>
          findet jeder das passende Training.
        </p>
      </UContainer>
    </div>

    <UPageSection
      title="Unser Trainingsangebot"
      description="Gezielte Förderung, Technikschulung und vor allem Spaß am Spiel."
      :features="trainingTypes.map(t => ({ title: t.title, description: t.desc, icon: t.icon }))"
      class="bg-gray-50"
    />

    <section class="py-20 bg-white">
      <UContainer>
        <div class="flex flex-col md:flex-row items-center gap-12">

          <div class="flex-1 space-y-6">
            <h2 class="text-3xl font-bold text-tennis-900">
              Unser Partner: <span class="text-red-600">Tennisschule Rot-Weiß</span>
            </h2>
            <p class="text-gray-600 text-lg">
              Wir setzen auf die Erfahrung und Kompetenz der Tennisschule Rot-Weiß.
              Mit modernen Methoden und viel persönlicher Betreuung sorgen die Trainer für sichtbare Fortschritte.
            </p>
            <ul class="space-y-3">
              <li class="flex items-center gap-3">
                <UIcon name="i-heroicons-check-circle" class="text-tennis-500 w-6 h-6" />
                <span>Individuell & Modern</span>
              </li>
              <li class="flex items-center gap-3">
                <UIcon name="i-heroicons-check-circle" class="text-tennis-500 w-6 h-6" />
                <span>Flexibler, persönlicher Kontakt</span>
              </li>
              <li class="flex items-center gap-3">
                <UIcon name="i-heroicons-check-circle" class="text-tennis-500 w-6 h-6" />
                <span>Schul-AGs & Feriencamps</span>
              </li>
            </ul>

            <div class="pt-4">
              <UButton
                to="https://tennisschule-rotweiss.de/"
                target="_blank"
                size="lg"
                color="primary"
                variant="soft"
                trailing-icon="i-heroicons-arrow-top-right-on-square"
              >
                Zur Website der Tennisschule
              </UButton>
            </div>
          </div>

          <div class="flex-1 flex justify-center">
            <div class="bg-gray-100 rounded-2xl p-8 w-full max-w-sm text-center border border-gray-200 shadow-inner">
               <span class="text-gray-400 font-bold text-xl block mb-4">Logo Platzhalter</span>
               <div class="text-4xl font-black text-red-600 uppercase tracking-tighter">Rot-Weiß</div>
               <div class="text-sm text-gray-500 mt-2">Tennisschule</div>
            </div>
          </div>

        </div>
      </UContainer>
    </section>

    <section class="py-16 bg-tennis-50 border-t border-tennis-100">
      <UContainer>
        <div class="grid md:grid-cols-2 gap-8">

          <UCard>
            <template #header>
              <h3 class="text-xl font-bold text-tennis-900 flex items-center gap-2">
                <UIcon name="i-heroicons-academic-cap" class="w-6 h-6" />
                Tennis-Schul-AG
              </h3>
            </template>
            <p class="text-gray-600 mb-4">
              Früh übt sich! In Kooperation mit örtlichen Schulen bringen wir den Tennissport in den Schulalltag.
              Ideal für Grundschulkinder, um spielerisch Koordination und Teamgeist zu lernen.
            </p>
            <UBadge color="gray" variant="soft">Anmeldung über die Schule</UBadge>
          </UCard>

          <UCard>
             <template #header>
              <h3 class="text-xl font-bold text-tennis-900 flex items-center gap-2">
                <UIcon name="i-heroicons-sun" class="w-6 h-6 text-orange-500" />
                Sommerferien-Camp
              </h3>
            </template>
            <p class="text-gray-600 mb-4">
              Eine Woche voller Action, Training und Spaß! Jedes Jahr in den Sommerferien veranstaltet
              die Tennisschule abwechslungsreiche Camps auf unserer Anlage. Inklusive Mittagessen!
            </p>
            <UButton
              to="https://tennisschule-rotweiss.de/"
              target="_blank"
              variant="link"
              class="p-0"
            >
              Infos & Anmeldung →
            </UButton>
          </UCard>

        </div>
      </UContainer>
    </section>

  </div>
</template>
