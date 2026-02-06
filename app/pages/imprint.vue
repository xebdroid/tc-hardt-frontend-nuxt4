<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import AppButton from '~/components/base/AppButton.vue'

useHead({
  title: 'Impressum | TC Hardt',
  meta: [
    { name: 'description', content: 'Impressum des Tennisclub Hardt 1976 e.V. – Angaben gemäß § 5 TMG.' }
  ]
})
</script>

<template>
  <div>
    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <div class="text-center">
          <h1 class="text-3xl sm:text-5xl font-bold text-white mb-4 font-heading">
            Impressum
          </h1>
          <p class="text-xl text-gray-300">
            Angaben gemäß § 5 TMG
          </p>
        </div>
      </template>
    </Hero>

    <UContainer class="py-16">

      <div class="space-y-12">

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Angaben zum Verein
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <div>
              <strong class="block text-brand-dark-900 dark:text-white mb-1">Tennisclub Hardt 1976 e.V.</strong>
              <address class="not-italic">
                Birkmannsweg 16<br>
                41169 Mönchengladbach
              </address>
              <div class="mt-2 text-sm text-gray-500">
                <span class="uppercase tracking-wide text-xs font-bold">Postanschrift:</span><br>
                Postfach 601272, 41162 Mönchengladbach
              </div>
            </div>

            <div>
              <strong class="block text-brand-dark-900 dark:text-white mb-2">Vertreten durch den geschäftsführenden Vorstand:</strong>
              <ul class="space-y-1">
                <li>Kaspar Fuchs</li>
                <li>Boris Rütten</li>
                <li>Stefanie Henckel-Wollny</li>
                <li>Witold Bialy</li>
                <li>Manfred Schröer</li>
              </ul>
            </div>

            <div>
              <strong class="block text-brand-dark-900 dark:text-white mb-1">Registereintrag:</strong>
              <p>Eintragung im Vereinsregister.</p>
              <p>Registergericht: Amtsgericht Mönchengladbach</p>
              <p>Registernummer: VR 941 (eingetragen am 26. Mai 1976)</p>
            </div>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white">Kontakt</h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <div>
              <strong class="block text-brand-dark-900 dark:text-white mb-1">E-Mail:</strong>
              <a href="mailto:info@tc-hardt.de" class="text-accent-600 dark:text-accent-400 hover:underline font-medium">
                info@tc-hardt.de
              </a>
            </div>
            <div>
              <strong class="block text-brand-dark-900 dark:text-white mb-1">Webmaster:</strong>
              <p>Kaspar Fuchs</p>
            </div>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h3 class="text-lg font-bold text-brand-dark-900 dark:text-white">Haftung für Inhalte</h3>
          </div>
          <div class="md:col-span-8 lg:col-span-9 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h3 class="text-lg font-bold text-brand-dark-900 dark:text-white">Haftung für Links</h3>
          </div>
          <div class="md:col-span-8 lg:col-span-9 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p>
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h3 class="text-lg font-bold text-brand-dark-900 dark:text-white">Urheberrecht</h3>
          </div>
          <div class="md:col-span-8 lg:col-span-9 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12 items-center">
          <div class="md:col-span-4 lg:col-span-3">
            <h3 class="text-lg font-bold text-brand-dark-900 dark:text-white">Datenschutz</h3>
          </div>
          <div class="md:col-span-8 lg:col-span-9">
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Details zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in unserer Datenschutzerklärung.
              </p>

              <AppButton
                :to="$localePath('privacy')"
                label="Zur Datenschutzerklärung"
                variant="primary"
                icon="i-heroicons-shield-check"
                class="shrink-0"
              />
            </div>
          </div>
        </div>

      </div>
    </UContainer>
  </div>
</template>
