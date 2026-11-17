<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Button from '~/components/base/Button.vue'
import Headline from '~/components/base/Headline.vue'
import PrivacyGate from '~/components/base/PrivacyGate.vue'
import BaseFormField from '~/components/base/FormField.vue'
import BaseInput from '~/components/base/Input.vue'
import BaseTextarea from '~/components/base/Textarea.vue'
import BaseIcon from '~/components/base/Icon.vue'
import { useToast } from '~/composables/useToast'

useSeoMeta({
  title: 'Kontakt',
  ogTitle: 'Kontakt',
  description: 'Kontaktieren Sie den TC Hardt 1976 e.V. – Wir freuen uns auf Ihre Nachricht.',
  ogDescription: 'Kontaktieren Sie den TC Hardt 1976 e.V. – Wir freuen uns auf Ihre Nachricht.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})

interface ContactFormState {
  name: string
  email: string
  message: string
  website: string
}

const state = reactive<ContactFormState>({
  name: '',
  email: '',
  message: '',
  website: ''
})

const errors = reactive<Partial<Record<keyof ContactFormState, string>>>({})
const isLoading = ref(false)
const isSent = ref(false)
const toast = useToast()

function validate(): boolean {
  errors.name = undefined
  errors.email = undefined
  errors.message = undefined

  const name = state.name.trim()
  const email = state.email.trim()
  const message = state.message.trim()

  if (name.length < 2) {
    errors.name = 'Bitte gib Deinen Namen ein (mind. 2 Zeichen)'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Bitte gib eine gültige E-Mail-Adresse ein'
  }

  if (message.length < 10) {
    errors.message = 'Deine Nachricht ist etwas kurz (mind. 10 Zeichen)'
  }

  return !errors.name && !errors.email && !errors.message
}

async function onSubmit() {
  if (!validate()) return

  isLoading.value = true

  try {
    const endpoint = '/send-mail.php'

    const response: any = await $fetch(endpoint, {
      method: 'POST',
      body: {
        name: state.name.trim(),
        email: state.email.trim(),
        message: state.message.trim(),
        website: state.website
      }
    })

    if (response.success === false) {
      throw new Error(response.message || 'Ein unbekannter Fehler ist aufgetreten.')
    }

    isSent.value = true

    if (import.meta.client && (window as any)._paq) {
      (window as any)._paq.push(['trackEvent', 'Formulare', 'Erfolgreich gesendet', 'Kontaktformular'])
    }

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
  errors.name = undefined
  errors.email = undefined
  errors.message = undefined
  isSent.value = false
}
</script>

<template>
  <div class="contact-page">
    <Hero height="small">
      <template #content>
        <div class="hero-header">
          <h1 class="hero-title">
            Kontakt
          </h1>
          <p class="hero-subtitle">
            Fragen? Anregungen? Wir sind für Dich da.
          </p>
        </div>
      </template>
    </Hero>

    <div class="u-container page-body">
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon-box">
            <BaseIcon name="i-heroicons-map-pin" class="info-icon" />
          </div>
          <h3 class="info-title">Clubanlage</h3>
          <address class="info-address">
            TC Hardt 1976 e.V.<br>
            Birkmannsweg 16<br>
            41169 Mönchengladbach
          </address>
        </div>

        <div class="info-card">
          <div class="info-icon-box">
            <BaseIcon name="i-heroicons-inbox-arrow-down" class="info-icon" />
          </div>
          <h3 class="info-title">Postanschrift</h3>
          <address class="info-address">
            Postfach 601272<br>
            41162 Mönchengladbach
          </address>
        </div>

        <div class="info-card">
          <div class="info-icon-box">
            <BaseIcon name="i-heroicons-envelope" class="info-icon" />
          </div>
          <h3 class="info-title">E-Mail</h3>
          <p class="info-text">
            Schreib uns jederzeit eine E-Mail.
          </p>
          <a href="mailto:info@tc-hardt.de" class="info-link">
            info@tc-hardt.de
          </a>
        </div>
      </div>

      <div id="contact-form-container" class="form-wrapper">
        <div class="form-card">
          <div v-if="!isSent">
            <Headline
              title="Schreib uns eine Nachricht"
              description="Fülle das Formular aus und wir melden uns zeitnah bei Dir."
              tag="h2"
              size="h2"
              margin-bottom="md"
            />

            <form
              class="contact-form"
              novalidate
              @submit.prevent="onSubmit"
            >
              <div class="form-row">
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

                <BaseFormField
                  label="Deine E-Mail"
                  name="email"
                  :error="errors.email"
                  required
                >
                  <BaseInput
                    v-model="state.email"
                    type="email"
                    placeholder="max@beispiel.de"
                    icon="i-heroicons-envelope"
                    size="lg"
                  />
                </BaseFormField>
              </div>

              <BaseFormField
                label="Nachricht"
                name="message"
                :error="errors.message"
                required
              >
                <BaseTextarea
                  v-model="state.message"
                  placeholder="Wie können wir Dir helfen?"
                  :rows="6"
                  size="lg"
                />
              </BaseFormField>

              <!-- Honeypot: Verstecktes Feld für Bots -->
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
                  label="Nachricht absenden"
                  icon="i-heroicons-paper-airplane"
                />
              </div>
            </form>
          </div>

          <div v-else class="success-box">
            <div class="success-icon-wrap">
              <BaseIcon name="i-heroicons-check" class="success-icon" />
            </div>
            <h3 class="success-title">Vielen Dank!</h3>
            <p class="success-text">
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

        <div class="map-frame">
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

        <div class="map-link-row">
          <a
            href="https://maps.app.goo.gl/wt8zcsPJbvQfiyTM9"
            target="_blank"
            rel="noopener noreferrer"
            class="map-link"
          >
            Route in Google Maps App öffnen
          </a>
        </div>
      </Section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-header {
  text-align: center;
}

.hero-title {
  margin: 0 0 var(--space-6);
  font-family: var(--font-heading);
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  color: var(--color-pure-white);

  @include up('sm') {
    font-size: 3.75rem;
    line-height: 1;
  }
}

.hero-subtitle {
  margin: 0 auto;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: var(--color-gray-300);
  max-width: 42rem;
}

.page-body {
  padding-block: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

.info-grid {
  display: grid;
  gap: var(--space-8);
  margin-inline: auto;
  width: 100%;

  @include up('md') {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.info-card {
  background-color: var(--color-pure-white);
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: box-shadow var(--transition-fast);

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }

  &:hover {
    box-shadow: var(--shadow-md);
  }
}

.info-icon-box {
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background-color: var(--color-brand-dark-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-dark-900);
  margin-bottom: var(--space-4);

  @include dark {
    background-color: var(--color-brand-dark-800);
    color: var(--color-white);
  }
}

.info-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.info-title {
  margin: 0 0 var(--space-2);
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);

  @include dark {
    color: var(--color-white);
  }
}

.info-address {
  font-style: normal;
  color: var(--color-gray-600);

  @include dark {
    color: var(--color-gray-300);
  }
}

.info-text {
  margin: 0 0 var(--space-4);
  color: var(--color-gray-600);

  @include dark {
    color: var(--color-gray-300);
  }
}

.info-link {
  color: var(--color-accent-600);
  font-weight: 700;
  text-decoration: none;

  @include dark {
    color: var(--color-accent-400);
  }

  &:hover {
    text-decoration: underline;
  }
}

.form-wrapper {
  margin-inline: auto;
  width: 100%;
}

.form-card {
  background-color: var(--color-pure-white);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-gray-100);

  @include up('sm') {
    padding: var(--space-12);
  }

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.form-row {
  display: grid;
  gap: var(--space-8);

  @include up('md') {
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

.success-icon-wrap {
  width: 6rem;
  height: 6rem;
  background-color: #dcfce7;
  color: #16a34a;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow-sm);

  @include dark {
    background-color: rgb(20 83 45 / 0.3);
    color: #4ade80;
  }
}

.success-icon {
  width: 3rem;
  height: 3rem;
}

.success-title {
  margin: 0 0 var(--space-4);
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);

  @include dark {
    color: var(--color-white);
  }
}

.success-text {
  margin: 0 auto var(--space-10);
  font-size: 1.25rem;
  line-height: 1.625;
  color: var(--color-gray-600);
  max-width: 32rem;

  @include dark {
    color: var(--color-gray-300);
  }
}

.map-frame {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-200);
  height: 500px;
  width: 100%;
  background-color: var(--color-gray-200);
  position: relative;

  @include dark {
    border-color: var(--color-gray-700);
  }
}

.map-link-row {
  margin-top: var(--space-4);
  text-align: center;
}

.map-link {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-gray-500);
  text-decoration: underline;

  &:hover {
    color: var(--color-accent-600);
  }
}
</style>
