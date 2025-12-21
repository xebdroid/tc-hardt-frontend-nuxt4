<script setup lang="ts">
useHead({
  title: 'Sponsoring | TC Hardt',
  meta: [{ name: 'description', content: 'Werden Sie Partner des TC Hardt. Gemeinsam mehr bewegen für Sport und Jugend.' }]
})
</script>

<template>
  <div>
    <UPageHero
      title="Sponsoring"
      description="Gemeinsam mehr bewegen – Werden Sie Partner des TC Hardt."
      align="center"
      class="bg-gray-50 py-16"
    />

    <UContainer class="py-16 space-y-16">

      <div class="max-w-3xl mx-auto text-center space-y-6">
        <p class="text-lg text-gray-600">
          Unsere Sponsoren sind ein wichtiger Teil der TC-Hardt-Familie. Sie unterstützen nicht nur den Tennissport,
          sondern auch die Jugendarbeit, das Vereinsleben und die Entwicklung unserer Anlage.
        </p>
        <p class="font-bold text-tennis-900 text-xl">Dafür sagen wir herzlich Danke!</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <UCard>
          <template #header>
            <h3 class="font-bold text-lg flex items-center gap-2">
              <UIcon name="i-heroicons-eye" class="text-tennis-500" /> Lokale Sichtbarkeit
            </h3>
          </template>
          <p class="text-gray-600">Präsenz auf unserer Anlage, Website & bei Veranstaltungen.</p>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-bold text-lg flex items-center gap-2">
              <UIcon name="i-heroicons-hand-thumb-up" class="text-tennis-500" /> Positives Image
            </h3>
          </template>
          <p class="text-gray-600">Unterstützung von Sport, Gemeinschaft und Nachwuchs.</p>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-bold text-lg flex items-center gap-2">
              <UIcon name="i-heroicons-users" class="text-tennis-500" /> Partnerschaft
            </h3>
          </template>
          <p class="text-gray-600">Wir setzen auf echten Austausch und gemeinsame Werte.</p>
        </UCard>
      </div>

      <div class="bg-tennis-900 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div class="flex-1">
          <h2 class="text-3xl font-bold mb-4">Sie möchten Sponsor werden?</h2>
          <p class="text-tennis-200 mb-6 text-lg">
            Ob Bandenwerbung, Trikot-Branding oder Event-Sponsoring – wir finden gemeinsam ein passendes Paket!
            Melden Sie sich gerne bei uns.
          </p>
          <div class="flex flex-col gap-2">
            <span class="font-bold text-xl">Boris Rütten</span>
            <span class="text-tennis-300">Stv. Vorsitzender & Sponsoring</span>
            <UButton
              to="mailto:boris.ruetten@tc-hardt.de"
              color="white"
              variant="solid"
              icon="i-heroicons-envelope"
              class="mt-4 w-fit text-tennis-900 font-bold"
            >
              boris.ruetten@tc-hardt.de
            </UButton>
          </div>
        </div>
        <UIcon name="i-heroicons-megaphone" class="w-32 h-32 text-tennis-800 hidden md:block" />
      </div>

    </UContainer>
  </div>
</template>
