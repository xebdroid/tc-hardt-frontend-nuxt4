<script setup lang="ts">
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import BaseFormField from '~/components/base/FormField.vue'
import BaseInput from '~/components/base/Input.vue'
import BaseInputNumber from '~/components/base/InputNumber.vue'
import BaseSelect from '~/components/base/Select.vue'
import BaseRadioGroup from '~/components/base/RadioGroup.vue'
import BaseTextarea from '~/components/base/Textarea.vue'
import BaseIcon from '~/components/base/Icon.vue'
import { useToast } from '~/composables/useToast'

interface JubileeFormState {
  name: string
  ticketCount: number
  ticketType: string | undefined
  paymentMethod: string | undefined
  message: string
  website: string
}

const state = reactive<JubileeFormState>({
  name: '',
  ticketCount: 1,
  ticketType: undefined,
  paymentMethod: undefined,
  message: '',
  website: ''
})

const errors = reactive<Partial<Record<keyof JubileeFormState, string>>>({})
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

function validate(): boolean {
  errors.name = undefined
  errors.ticketCount = undefined
  errors.ticketType = undefined
  errors.paymentMethod = undefined

  if (state.name.trim().length < 2) {
    errors.name = 'Bitte gib deinen Namen ein'
  }

  if (!state.ticketCount || state.ticketCount < 1) {
    errors.ticketCount = 'Mindestens 1 Ticket erforderlich'
  } else if (state.ticketCount > 10) {
    errors.ticketCount = 'Maximal 10 Tickets pro Bestellung erlaubt'
  }

  if (!state.ticketType) {
    errors.ticketType = 'Bitte wähle Deine Ticketart aus'
  }

  if (!state.paymentMethod) {
    errors.paymentMethod = 'Bitte wähle eine Zahlungsart aus'
  }

  return !errors.name && !errors.ticketCount && !errors.ticketType && !errors.paymentMethod
}

async function onSubmit() {
  if (!validate()) return

  isLoading.value = true

  try {
    const endpoint = '/send-mail.php'

    const payload = {
      name: state.name.trim(),
      ticketCount: state.ticketCount,
      ticketType: state.ticketType,
      paymentMethod: state.paymentMethod,
      message: state.message,
      website: state.website,
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
  errors.name = undefined
  errors.ticketCount = undefined
  errors.ticketType = undefined
  errors.paymentMethod = undefined
  isSent.value = false
}
</script>

<template>
  <div id="anniversary-form-container" class="anniversary-form">
    <div class="form-card">
      <div v-if="!isSent">
        <Headline
          title="Tickets für die Jubiläumsfeier"
          description="Bestelle hier schnell und einfach die Tickets für unsere große Jubiläumsfeier."
          tag="h3"
          size="h3"
          margin-bottom="md"
        />

        <form
          class="form-stack"
          novalidate
          @submit.prevent="onSubmit"
        >
          <BaseFormField
            label="Dein Name"
            name="name"
            :error="errors.name"
            required
          >
            <BaseInput
              v-model="state.name"
              placeholder="Max Mustermann"
              icon="i-heroicons-user"
              size="lg"
            />
          </BaseFormField>

          <div class="two-cols">
            <BaseFormField
              label="Anzahl der Tickets"
              name="ticketCount"
              :error="errors.ticketCount"
              required
            >
              <BaseInputNumber
                v-model="state.ticketCount"
                :min="1"
                :max="10"
                size="lg"
              />
            </BaseFormField>

            <BaseFormField
              label="Ticketart"
              name="ticketType"
              :error="errors.ticketType"
              required
            >
              <BaseSelect
                v-model="state.ticketType"
                :items="ticketTypeOptions"
                placeholder="Bitte wählen..."
                size="lg"
              />
            </BaseFormField>
          </div>

          <BaseFormField
            label="Zahlungsart"
            name="paymentMethod"
            :error="errors.paymentMethod"
            required
          >
            <BaseRadioGroup
              v-model="state.paymentMethod"
              :items="paymentMethodOptions"
            />
          </BaseFormField>

          <BaseFormField
            label="Persönliche Nachricht (optional)"
            name="message"
          >
            <BaseTextarea
              v-model="state.message"
              placeholder="Möchtest du uns noch etwas mitteilen?"
              :rows="4"
              size="lg"
            />
          </BaseFormField>

          <!-- Honeypot -->
          <input
            v-model="state.website"
            type="text"
            name="website"
            class="honeypot"
            tabindex="-1"
            autocomplete="off"
          >

          <div class="submit-row">
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
        </form>
      </div>

      <div v-else class="success-box">
        <div class="success-badge">
          <BaseIcon name="i-heroicons-check" class="success-icon" />
        </div>
        <h3 class="success-title">Vielen Dank für deine Bestellung!</h3>
        <p class="success-desc">
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

<style lang="scss" scoped>
.anniversary-form {
  margin-inline: auto;
  width: 100%;
  max-width: 48rem;
}

.form-card {
  background-color: var(--color-pure-white);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-gray-100);

  @include up("sm") {
    padding: var(--space-12);
  }

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.form-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.two-cols {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);

  @include up("md") {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.honeypot {
  display: none;
}

.submit-row {
  padding-top: var(--space-2);
}

.success-box {
  padding-block: var(--space-16);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.success-badge {
  width: 6rem;
  height: 6rem;
  background-color: var(--color-success-100);
  color: var(--color-success-600);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow-sm);
}

.success-icon {
  width: 3rem;
  height: 3rem;
}

.success-title {
  margin: 0 0 var(--space-4);
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);

  @include dark {
    color: var(--color-white);
  }
}

.success-desc {
  margin: 0 auto var(--space-10);
  font-size: 1.125rem;
  color: var(--color-gray-600);
  max-width: 32rem;
  line-height: 1.625;

  @include dark {
    color: var(--color-gray-300);
  }
}
</style>
