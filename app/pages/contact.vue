<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import Hero from '~/components/section/Hero.vue'
import AppButton from '~/components/base/AppButton.vue'

useHead({
  title: 'Kontakt | TC Hardt',
  meta: [{ name: 'description', content: 'Kontaktieren Sie den TC Hardt 1976 e.V. – Wir freuen uns auf Ihre Nachricht.' }]
})

// --- 1. Validierungs-Schema (Zod) ---
const schema = z.object({
  name: z.string().min(2, 'Bitte gib deinen Namen ein (mind. 2 Zeichen)'),
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein'),
  message: z.string().min(10, 'Deine Nachricht ist etwas kurz (mind. 10 Zeichen)'),
  // Bot Protection: Matheaufgabe
  challenge: z.number().refine(val => val === 7, { message: 'Das Ergebnis ist leider falsch' }),
  // Honeypot: Muss leer sein
  website: z.string().optional()
})

type Schema = z.output<typeof schema>

// --- 2. State ---
const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  message: undefined,
  challenge: undefined,
  website: undefined
})

const isLoading = ref(false)
const toast = useToast()

// --- 3. Submit Handler ---
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  try {
    // ---------------------------------------------------------
    // KONFIGURATION DES ENDPOINTS
    // ---------------------------------------------------------

    // 1. FÜR LIVE-SERVER (Produktion):
    const endpoint = '/send-mail.php'

    // 2. FÜR LOKALES TESTEN (Kommentar entfernen!):
    // Wenn du lokal testest, läuft Nuxt auf Port 3000, PHP aber auf 8000.
    // endpoint = 'http://localhost:8000/send-mail.php'

    // ---------------------------------------------------------

    const response: any = await $fetch(endpoint, {
      method: 'POST',
      body: event.data
    })

    // Prüfen, ob das PHP Skript "success: false" zurückgemeldet hat
    if (response.success === false) {
      throw new Error(response.message || 'Ein unbekannter Fehler ist aufgetreten.')
    }

    toast.add({
      title: 'Nachricht gesendet!',
      description: 'Wir melden uns schnellstmöglich bei dir.',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })

    // Formular zurücksetzen
    Object.assign(state, {
      name: undefined,
      email: undefined,
      message: undefined,
      challenge: undefined,
      website: undefined
    })

  } catch (error: any) {
    // Fehlerbehandlung
    const errorMsg = error.message || error.data?.message || 'Bitte versuche es später erneut.'

    toast.add({
      title: 'Fehler beim Senden',
      description: errorMsg,
      color: 'error',
      icon: 'i-heroicons-exclamation-circle'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">

    <Hero
      height="large"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <div class="text-center">
          <h1 class="text-4xl sm:text-6xl font-heading font-bold text-white mb-6">
            Kontakt
          </h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Wir freuen uns auf deine Nachricht!
          </p>
        </div>
      </template>
    </Hero>

    <UContainer class="py-16">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-24">

        <div class="space-y-8 order-2 lg:order-1">
          <div>
            <h2 class="text-2xl font-bold text-brand-dark-900 dark:text-white mb-4">Hier findest du uns</h2>
            <address class="text-gray-600 dark:text-gray-300 mb-6 not-italic leading-relaxed">
              <strong>TC Hardt 1976 e.V.</strong><br>
              Birkmannsweg 16<br>
              41169 Mönchengladbach
            </address>

            <div class="space-y-3">
              <a href="mailto:info@tc-hardt.de" class="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-accent-500 transition-colors group">
                <div class="w-10 h-10 rounded-full bg-brand-dark-100 dark:bg-brand-dark-800 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-brand-dark-900 transition-colors">
                  <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                </div>
                <span class="font-medium">info@tc-hardt.de</span>
              </a>
            </div>
          </div>

          <div class="rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 h-[400px] w-full bg-gray-200 relative group">
            <iframe
              width="100%"
              height="100%"
              style="border:0"
              loading="lazy"
              allowfullscreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2524.32623456789!2d6.3685!3d51.1856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8bd30c0000001%3A0x0000000000000000!2sTC%20Hardt%201976%20e.V.!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
              title="Google Maps Standort TC Hardt"
            />
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 order-1 lg:order-2">
          <h2 class="text-2xl font-bold text-brand-dark-900 dark:text-white mb-2">Schreib uns</h2>
          <p class="text-gray-500 dark:text-gray-400 mb-8 text-sm">
            Fülle das Formular aus und wir melden uns zeitnah bei dir.
          </p>

          <UForm
            :schema="schema"
            :state="state"
            class="space-y-6"
            @submit="onSubmit"
          >
            <UFormField
              label="Dein Name"
              name="name"
              required
            >
              <UInput
                v-model="state.name"
                placeholder="Max Mustermann"
                icon="i-heroicons-user"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Deine E-Mail"
              name="email"
              required
            >
              <UInput
                v-model="state.email"
                type="email"
                placeholder="max@beispiel.de"
                icon="i-heroicons-envelope"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Nachricht"
              name="message"
              required
            >
              <UTextarea
                v-model="state.message"
                placeholder="Wie können wir dir helfen?"
                :rows="5"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
              <UFormField
                label="Sicherheitsfrage: Was ist 3 + 4?"
                name="challenge"
                required
              >
                <UInput
                  v-model.number="state.challenge"
                  type="number"
                  placeholder="Ergebnis"
                  icon="i-heroicons-shield-check"
                  size="md"
                  class="w-32"
                />
              </UFormField>
            </div>

            <div class="hidden">
              <UInput
                v-model="state.website"
                name="website"
                tabindex="-1"
                autocomplete="off"
              />
            </div>

            <AppButton
              type="submit"
              block
              size="xl"
              variant="primary"
              :loading="isLoading"
              label="Nachricht senden"
              icon="i-heroicons-paper-airplane"
            />
          </UForm>
        </div>

      </div>
    </UContainer>
  </div>
</template>
