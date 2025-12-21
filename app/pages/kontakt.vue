<script setup lang="ts">
useHead({ title: 'Kontakt | TC Hardt' })

const state = reactive({
  name: '',
  email: '',
  message: ''
})

const onSubmit = () => {
  // Hier würde später die Logik zum Senden hinkommen
  alert('Danke für deine Nachricht! (Dies ist eine Demo)')
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <UPageHero
      title="Kontakt"
      description="Wir freuen uns auf deine Nachricht!"
      align="center"
      class="bg-white"
    />

    <UContainer class="py-16">
      <div class="grid md:grid-cols-2 gap-12">

        <div class="space-y-8">
          <div>
            <h2 class="text-2xl font-bold text-tennis-900 mb-4">Hier findest du uns</h2>
            <p class="text-gray-600 mb-4">
              TC Hardt e.V.<br>
              Birkmannsweg 16<br>
              41169 Mönchengladbach
            </p>
            <p class="text-gray-600 flex items-center gap-2">
              <UIcon name="i-heroicons-envelope" />
              <a href="mailto:info@tc-hardt.de" class="hover:text-tennis-600">info@tc-hardt.de</a>
            </p>
          </div>

          <div class="bg-gray-200 rounded-xl h-64 w-full flex items-center justify-center text-gray-500 shadow-inner">
            <div class="text-center">
              <UIcon name="i-heroicons-map" class="w-8 h-8 mx-auto mb-2" />
              <span>Karte / Google Maps Platzhalter</span>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 class="text-2xl font-bold text-tennis-900 mb-6">Schreib uns</h2>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <UFormGroup label="Dein Name" required>
              <UInput v-model="state.name" placeholder="Max Mustermann" icon="i-heroicons-user" />
            </UFormGroup>

            <UFormGroup label="Deine E-Mail" required>
              <UInput v-model="state.email" type="email" placeholder="max@beispiel.de" icon="i-heroicons-envelope" />
            </UFormGroup>

            <UFormGroup label="Nachricht" required>
              <UTextarea v-model="state.message" placeholder="Wie können wir dir helfen?" :rows="4" />
            </UFormGroup>

            <UButton type="submit" block size="lg" color="primary">
              Nachricht senden
            </UButton>
          </form>
        </div>

      </div>
    </UContainer>
  </div>
</template>
