<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'

// --- Validierungs-Schema (Zod) ---
const schema = z.object({
  name: z.string().min(2, 'Bitte gib deinen Namen ein'),

  ticketCount: z.number({
    required_error: 'Bitte gib die Anzahl ein',
    invalid_type_error: 'Bitte gib eine gültige Zahl ein'
  }).min(1, 'Mindestens 1 Ticket erforderlich').max(10, 'Maximal 10 Tickets pro Bestellung erlaubt'),

  ticketType: z.any().refine(val => !!val, {
    message: 'Bitte wähle Deine Ticketart aus'
  }),

  paymentMethod: z.any().refine(val => !!val, {
    message: 'Bitte wähle eine Zahlungsart aus'
  }),

  message: z.string().optional(),
  // Honeypot: Muss leer sein
  website: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '', // Initial empty string forces Zod to use the .min() validation message
  ticketCount: 1,
  ticketType: undefined,
  paymentMethod: undefined,
  message: '',
  website: ''
})

const isLoading = ref(false)
const isSent = ref(false)
const toast = useToast()

const ticketTypeOptions = [
  { value: 'normal', label: 'Normalzahler (38€)' },
  { value: 'student', label: 'Student / Schüler (29€)' }
]

const paymentMethodOptions = [
  { value: 'invoice', label: 'Auf TC Hardt Rechnung setzen' },
  { value: 'cash', label: 'Barbezahlung' }
]

// --- Submit Handler ---
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  try {
    // --- LOKALES TESTEN DES PHP-SKRIPTS ---
    // 1. Öffne ein neues Terminal im Ordner: tc-hardt-frontend-nuxt4/public
    // 2. Führe folgenden Befehl aus: php -S localhost:8000
    // 3. Kommentiere den Live-Endpoint aus und den lokalen ein:
    const endpoint = '/send-mail.php' // Live-Endpoint
    // const endpoint = 'http://localhost:8000/send-mail.php' // Lokaler Endpoint

    // Da ticketType und paymentMethod Objekte sein können (durch USelect/URadioGroup),
    // mappen wir sie vor dem Senden auf den reinen String-Wert, falls nötig.
    const finalData = { ...event.data }
    if (finalData.ticketType && typeof finalData.ticketType === 'object') {
      finalData.ticketType = (finalData.ticketType as any).value || finalData.ticketType
    }
    if (finalData.paymentMethod && typeof finalData.paymentMethod === 'object') {
      finalData.paymentMethod = (finalData.paymentMethod as any).value || finalData.paymentMethod
    }

    const payload = {
      ...finalData,
      formType: 'jubilaeum',
      to: 'jubilaeum@tc-hardt.de',
      subject: 'Neue Anmeldung zum Jubiläum'
    }

    const response: any = await $fetch(endpoint, {
      method: 'POST',
      body: payload
    })

    if (response.success === false) {
      throw new Error(response.message || 'Ein unbekannter Fehler ist aufgetreten.')
    }

    isSent.value = true

    if (import.meta.client && (window as any)._paq) {
      (window as any)._paq.push(['trackEvent', 'Formulare', 'Erfolgreich gesendet', 'Jubilaeum'])
    }

    const formContainer = document.getElementById('anniversary-form-container')
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
  state.ticketCount = 1
  state.ticketType = undefined
  state.paymentMethod = undefined
  state.message = ''
  state.website = ''
  isSent.value = false
}
</script>

<template>
  <div id="anniversary-form-container" class="mx-auto w-full max-w-3xl">
    <div class="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">

      <div v-if="!isSent">
        <Headline
          title="Tickets für die Jubiläumsfeier"
          description="Bestelle hier schnell und einfach die Tickets für unsere große Jubiläumsfeier."
          tag="h3"
          size="h3"
          margin-bottom="md"
        />

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-8"
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

          <div class="grid md:grid-cols-2 gap-8">
            <UFormField
              label="Anzahl der Tickets"
              name="ticketCount"
              required
            >
              <UInputNumber
                v-model="state.ticketCount"
                :min="1"
                :max="10"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Ticketart"
              name="ticketType"
              required
            >
              <USelect
                v-model="state.ticketType"
                :items="ticketTypeOptions"
                placeholder="Bitte wählen..."
                size="lg"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField
            label="Zahlungsart"
            name="paymentMethod"
            required
          >
            <URadioGroup
              v-model="state.paymentMethod"
              :items="paymentMethodOptions"
            />
          </UFormField>

          <UFormField
            label="Persönliche Nachricht (optional)"
            name="message"
          >
            <UTextarea
              v-model="state.message"
              placeholder="Möchtest du uns noch etwas mitteilen?"
              :rows="4"
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
              label="Jetzt bestellen"
              icon="i-heroicons-ticket"
            />
          </div>
        </UForm>
      </div>

      <div v-else class="py-16 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
        <div class="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <UIcon name="i-heroicons-check" class="w-12 h-12" />
        </div>
        <h3 class="text-3xl font-bold text-brand-dark-900 dark:text-white mb-4">Vielen Dank für deine Bestellung!</h3>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-lg mx-auto leading-relaxed">
          Wir haben deine Ticket-Bestellung erhalten und freuen uns darauf, mit dir zu feiern. Weitere Infos folgen in Kürze.
        </p>
        <Button
          variant="outline"
          label="Weitere Tickets buchen"
          size="lg"
          @click="resetForm"
        />
      </div>

    </div>
  </div>
</template>
