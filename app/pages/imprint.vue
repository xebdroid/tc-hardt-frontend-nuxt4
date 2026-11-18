<script setup lang="ts">
import PageHero from '~/components/base/PageHero.vue'
import LegalSection from '~/components/content/LegalSection.vue'
import AppButton from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'
import ImageCredits from '~/components/content/ImageCredits.vue'

useSeoMeta({
  title: 'Impressum',
  ogTitle: 'Impressum',
  description: 'Impressum des Tennisclub Hardt 1976 e.V. – Angaben gemäß § 5 TMG.',
  ogDescription: 'Impressum des Tennisclub Hardt 1976 e.V. – Angaben gemäß § 5 TMG.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div class="imprint-page">
    <PageHero
      title="Impressum"
      description="Angaben gemäß § 5 TMG"
    />

    <div class="u-container legal-body">
      <div class="legal-sections">
        <LegalSection title="Angaben zum Verein" spacing="lg" divider>
          <div>
            <strong class="block-label">Clubanlage</strong>
            <address class="plain-address">
              Tennisclub Hardt 1976 e.V.<br>
              Birkmannsweg 16<br>
              41169 Mönchengladbach
            </address>
          </div>
          <div class="mt-block">
            <strong class="block-label">Postanschrift</strong>
            <address class="plain-address">
              Postfach 601272<br>
              41162 Mönchengladbach
            </address>
          </div>

          <div>
            <strong class="block-label is-mb-2">Vertreten durch den geschäftsführenden Vorstand:</strong>
            <ul class="plain-list">
              <li>Kaspar Fuchs</li>
              <li>Boris Rütten</li>
              <li>Stefanie Henckel-Wollny</li>
              <li>Witold Bialy</li>
              <li>Manfred Schröer</li>
            </ul>
          </div>

          <div>
            <strong class="block-label">Registereintrag:</strong>
            <p>Eintragung im Vereinsregister.</p>
            <p>Registergericht: Amtsgericht Mönchengladbach</p>
            <p>Registernummer: VR 941 (eingetragen am 26. Mai 1976)</p>
          </div>
        </LegalSection>

        <LegalSection title="Kontakt" divider>
          <div>
            <strong class="block-label">E-Mail:</strong>
            <a href="mailto:info@tc-hardt.de" class="font-medium">
              info@tc-hardt.de
            </a>
          </div>
          <div>
            <strong class="block-label">Webmaster:</strong>
            <p>Kaspar Fuchs</p>
          </div>
        </LegalSection>

        <LegalSection title="Haftung für Inhalte" tag="h3" size="h5" compact>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </LegalSection>

        <LegalSection title="Haftung für Links" tag="h3" size="h5" compact>
          <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </LegalSection>

        <LegalSection title="Urheberrecht" tag="h3" size="h5" compact divider>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </LegalSection>

        <LegalSection title="Bildnachweise" tag="h3" size="h5" compact divider>
          <ClientOnly>
            <details class="credits-details">
              <summary class="credits-summary">
                <span>Vollständige Liste anzeigen</span>
                <BaseIcon name="i-heroicons-chevron-down" class="credits-chevron" />
              </summary>
              <ImageCredits />
            </details>
          </ClientOnly>
        </LegalSection>

        <LegalSection title="Datenschutz" tag="h3" size="h5" centered>
          <div class="privacy-callout">
            <p class="callout-text">
              Details zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in unserer Datenschutzerklärung.
            </p>

            <AppButton
              :to="$localePath('privacy')"
              label="Zur Datenschutzerklärung"
              variant="primary"
              icon="i-heroicons-shield-check"
              class="callout-btn"
            />
          </div>
        </LegalSection>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.legal-body {
  padding-block: var(--space-16);
}

.legal-sections {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.block-label {
  display: block;
  color: var(--color-brand-dark-900);
  margin-bottom: var(--space-1);

  &.is-mb-2 {
    margin-bottom: var(--space-2);
  }

  @include dark {
    color: var(--color-white);
  }
}

.plain-address {
  font-style: normal;
}

.mt-block {
  margin-top: var(--space-4);
}

.plain-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.font-medium {
  font-weight: 500;
}

.credits-details {
  &[open] {
    .credits-summary {
      margin-bottom: var(--space-4);
    }

    .credits-chevron {
      transform: rotate(180deg);
    }
  }
}

.credits-summary {
  font-weight: 600;
  cursor: pointer;
  color: var(--color-brand-dark-900);
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  @include dark {
    color: var(--color-white);
  }
}

.credits-chevron {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform var(--transition-fast);
}

.privacy-callout {
  background-color: var(--color-gray-50);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-100);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);

  @include up('sm') {
    flex-direction: row;
    align-items: center;
  }

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.callout-text {
  margin: 0;
  color: var(--color-gray-600);
  font-size: 0.875rem;
  line-height: 1.25rem;

  @include dark {
    color: var(--color-gray-300);
  }
}

.callout-btn {
  flex-shrink: 0;
}
</style>
