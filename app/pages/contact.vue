<script setup lang="ts">
import PageHero from '~/components/base/PageHero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import BaseGrid from '~/components/base/Grid.vue'
import PrivacyGate from '~/components/base/PrivacyGate.vue'
import BaseIcon from '~/components/base/Icon.vue'
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
