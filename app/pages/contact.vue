<script setup lang="ts">
import PageHero from '~/components/sections/PageHero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import BaseGrid from '~/components/base/Grid.vue'
import PrivacyGate from '~/components/sections/PrivacyGate.vue'
import ContactInfoCard from '~/components/club/ContactInfoCard.vue'
import ContactForm from '~/components/forms/ContactForm.vue'

useSeoMeta({
  title: 'Kontakt',
  ogTitle: 'Kontakt',
  description: 'Kontaktieren Sie den TC Hardt 1976 e.V. – Wir freuen uns auf Ihre Nachricht.',
  ogDescription: 'Kontaktieren Sie den TC Hardt 1976 e.V. – Wir freuen uns auf Ihre Nachricht.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="contact-page">
    <PageHero
      title="Kontakt"
      description="Fragen? Anregungen? Wir sind für Dich da."
    />

    <div class="u-container page-body">
      <BaseGrid :cols="3">
        <ContactInfoCard icon="i-heroicons-map-pin" title="Clubanlage">
          <address>
            TC Hardt 1976 e.V.<br>
            Birkmannsweg 16<br>
            41169 Mönchengladbach
          </address>
        </ContactInfoCard>

        <ContactInfoCard icon="i-heroicons-inbox-arrow-down" title="Postanschrift">
          <address>
            Postfach 601272<br>
            41162 Mönchengladbach
          </address>
        </ContactInfoCard>

        <ContactInfoCard icon="i-heroicons-envelope" title="E-Mail">
          <p>
            Schreib uns jederzeit eine E-Mail.
          </p>
          <a href="mailto:info@tc-hardt.de">
            info@tc-hardt.de
          </a>
        </ContactInfoCard>
      </BaseGrid>

      <ContactForm />

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
.page-body {
  padding-block: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
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
