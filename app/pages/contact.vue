<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Button from '~/components/base/Button.vue'
import Headline from '~/components/base/Headline.vue'
import PrivacyGate from '~/components/base/PrivacyGate.vue'

useSeoMeta({
  title: 'Kontakt',
  ogTitle: 'Kontakt',
  description: 'Kontaktieren Sie den TC Hardt 1976 e.V. – Wir freuen uns auf Ihre Nachricht.',
  ogDescription: 'Kontaktieren Sie den TC Hardt 1976 e.V. – Wir freuen uns auf Ihre Nachricht.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})

// --- 1. Validierungs-Schema (Zod) ---
const schema = z.object({
  name: z.string().min(2, 'Bitte gib Deinen Namen ein (mind. 2 Zeichen)'),
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein'),
  message: z.string().min(10, 'Deine Nachricht ist etwas kurz (mind. 10 Zeichen)'),
  // Honeypot: Muss leer sein
  website: z.string().optional()
})

type Schema = z.output<typeof schema>

// --- 2. State ---
// Wir nutzen hier undefined für die Initialisierung, da Nuxt UI / Zod dies beim Server-Rendering besser handhabt
const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  message: undefined,
  website: undefined
})

const isLoading = ref(false)
const isSent = ref(false)
const toast = useToast()

// --- 3. Submit Handler ---
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  try {
    const endpoint = '/send-mail.php'
    // const endpoint = 'http://localhost:8000/send-mail.php' // Lokal aktivieren

    const response: any = await $fetch(endpoint, {
      method: 'POST',
      body: event.data
    })

    if (response.success === false) {
      throw new Error(response.message || 'Ein unbekannter Fehler ist aufgetreten.')
    }

    isSent.value = true

    // --- Tracking des erfolgreichen Formularversands ---
    if (import.meta.client && (window as any)._paq) {
      (window as any)._paq.push(['trackEvent', 'Formulare', 'Erfolgreich gesendet', 'Kontaktformular'])
    }

    // Scroll zum Anfang des Formular-Containers
    const formContainer = document.getElementById('contact-form-container')
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

  } catch (error: any) {
    const errorMsg = error.message || error.data?.message || 'Bitte versuche es später erneut.'
    toast.add({ title: 'Fehler', description: errorMsg, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  state.name = ''
  state.email = ''
  state.message = ''
  state.website = ''
  isSent.value = false
}
</script>

<template>
  <div>

    <Hero
      height="small"
    >
      <template #content>
        <div class="text-center">
          <h1 class="text-4xl sm:text-6xl font-heading font-bold text-white mb-6">
            Kontakt
          </h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Fragen? Anregungen? Wir sind für Dich da.
          </p>
        </div>
      </template>
    </Hero>

    <UContainer class="py-16 space-y-16">

      <div class="grid md:grid-cols-3 gap-8 mx-auto w-full">

        <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div class="w-12 h-12 rounded-full bg-brand-dark-100 dark:bg-brand-dark-800 flex items-center justify-center text-brand-dark-900 dark:text-white mb-4">
            <UIcon name="i-heroicons-map-pin" class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-brand-dark-900 dark:text-white mb-2">Clubanlage</h3>
          <address class="text-gray-600 dark:text-gray-300 not-italic">
            TC Hardt 1976 e.V.<br>
            Birkmannsweg 16<br>
            41169 Mönchengladbach
          </address>
        </div>

        <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div class="w-12 h-12 rounded-full bg-brand-dark-100 dark:bg-brand-dark-800 flex items-center justify-center text-brand-dark-900 dark:text-white mb-4">
            <UIcon name="i-heroicons-inbox-arrow-down" class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-brand-dark-900 dark:text-white mb-2">Postanschrift</h3>
          <address class="text-gray-600 dark:text-gray-300 not-italic">
            Postfach 601272<br>
            41162 Mönchengladbach
          </address>
        </div>

        <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div class="w-12 h-12 rounded-full bg-brand-dark-100 dark:bg-brand-dark-800 flex items-center justify-center text-brand-dark-900 dark:text-white mb-4">
            <UIcon name="i-heroicons-envelope" class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-brand-dark-900 dark:text-white mb-2">E-Mail</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Schreib uns jederzeit eine E-Mail.
          </p>
          <a href="mailto:info@tc-hardt.de" class="text-accent-600 dark:text-accent-400 font-bold hover:underline">
            info@tc-hardt.de
          </a>
        </div>

      </div>

      <div id="contact-form-container" class="mx-auto w-full">
        <div class="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">

          <div v-if="!isSent">
            <Headline
              title="Schreib uns eine Nachricht"
              description="Fülle das Formular aus und wir melden uns zeitnah bei Dir."
              tag="h2"
              size="h2"
              margin-bottom="md"
            />

            <UForm
              :schema="schema"
              :state="state"
              class="space-y-8"
              @submit="onSubmit"
            >
              <div class="grid md:grid-cols-2 gap-8">
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
              </div>

              <UFormField
                label="Nachricht"
                name="message"
                required
              >
                <UTextarea
                  v-model="state.message"
                  placeholder="Wie können wir Dir helfen?"
                  :rows="6"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <!-- Honeypot: Verstecktes Feld für Bots -->
              <input
                v-model="state.website"
                type="text"
                name="website"
                class="hidden"
                tabindex="-1"
                autocomplete="off"
              >

              <div class="pt-2">
                <Button
                  type="submit"
                  block
                  size="xl"
                  variant="primary"
                  :loading="isLoading"
                  label="Nachricht absenden"
                  icon="i-heroicons-paper-airplane"
                />
              </div>
            </UForm>
          </div>

          <div v-else class="py-16 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <div class="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <UIcon name="i-heroicons-check" class="w-12 h-12" />
            </div>
            <h3 class="text-4xl font-bold text-brand-dark-900 dark:text-white mb-4">Vielen Dank!</h3>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg mx-auto leading-relaxed">
              Deine Nachricht wurde erfolgreich an uns übermittelt. <br>Wir werden uns in Kürze bei Dir melden.
            </p>
            <Button
              variant="outline"
              label="Eine weitere Nachricht schreiben"
              size="lg"
              @click="resetForm"
            />
          </div>

        </div>
      </div>

      <Section id="map">
        <Headline
          title="Standort & Anfahrt"
          tag="h2"
          size="h2"
          alignment="center"
        />

        <div class="rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 h-[500px] w-full bg-gray-200 relative">

          <PrivacyGate
            id="google-maps"
            title="Google Maps laden"
            description="Wir nutzen Google Maps, um Ihnen den Weg zu zeigen. Dabei werden Daten (z.B. IP-Adresse) an Google übertragen."
            icon="i-heroicons-map"
          >
            <iframe
              width="100%"
              height="100%"
              style="border:0"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=TC+Hardt+1976+e.V.,+Birkmannsweg+16,+41169+Mönchengladbach&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="Google Maps Standort TC Hardt"
            />
          </PrivacyGate>

        </div>

        <div class="mt-4 text-center">
          <a
            href="https://maps.app.goo.gl/wt8zcsPJbvQfiyTM9"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-500 hover:text-accent-600 underline"
          >
            Route in Google Maps App öffnen
          </a>
        </div>

      </Section>

    </UContainer>
  </div>
</template>
