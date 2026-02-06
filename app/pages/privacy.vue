<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import AppButton from '~/components/base/Button.vue'

useHead({
  title: 'Datenschutzerklärung | TC Hardt',
  meta: [
    { name: 'description', content: 'Datenschutzerklärung des Tennisclub Hardt e.V. – Stand: Mai 2021' }
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
            Datenschutzerklärung
          </h1>
          <p class="text-xl text-gray-300">
            des Tennisclub Hardt e.V.
          </p>
          <div class="mt-4 inline-block px-3 py-1 rounded-full bg-white/10 text-sm text-gray-200 backdrop-blur-sm border border-white/10">
            Stand: Mai 2021
          </div>
        </div>
      </template>
    </Hero>

    <UContainer class="py-16">

      <div class="space-y-12">

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Information & Verantwortlicher
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p>
              Im Folgenden informieren wir über die Erhebung personenbezogener Daten bei Nutzung unserer Website oder falls Sie Kontakt per E-Mail, über das Kontaktformular auf unserer Webseite oder per Post zu uns aufnehmen. Personenbezogene Daten sind alle Daten, die auf Sie persönlich beziehbar sind, z. B. Name, Adresse, E-Mail-Adressen, Nutzerverhalten.
            </p>
            <p>
              Verantwortlicher gem. Art. 4 Abs. 7 EU-Datenschutz-Grundverordnung (DS-GVO) ist:
            </p>
            <address class="not-italic font-medium text-brand-dark-900 dark:text-white block bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <strong>Tennisclub Hardt e.V.</strong><br>
              Vertreten durch den Vorstand<br>
              Birkmannsweg 16<br>
              41169 Mönchengladbach<br><br>
              E-Mail: <a href="mailto:info@tc-hardt.de" class="text-accent-600 dark:text-accent-400 hover:underline">info@tc-hardt.de</a>
            </address>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Kontaktaufnahme
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p>
              Bei einer Kontaktaufnahme mit uns per E-Mail oder per Post werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse oder Postadresse, Ihr Name und ggf. Ihre Telefonnummer) von uns gespeichert, um Ihre Fragen zu beantworten (Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO).
            </p>
            <p>
              Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen.
            </p>
            <p>
              Falls wir für einzelne Funktionen unseres Angebots auf beauftragte Dienstleister zurückgreifen oder Ihre Daten für werbliche Zwecke nutzen möchten, werden wir Sie untenstehend im Detail über die jeweiligen Vorgänge informieren. Dabei nennen wir auch die festgelegten Kriterien der Speicherdauer.
            </p>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Ihre Rechte
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
            <ul class="list-disc list-inside space-y-1 ml-2 marker:text-accent-500">
              <li>Recht auf Auskunft</li>
              <li>Recht auf Berichtigung oder Löschung</li>
              <li>Recht auf Einschränkung der Verarbeitung</li>
              <li>Recht auf Widerspruch gegen die Verarbeitung</li>
              <li>Recht auf Datenübertragbarkeit</li>
            </ul>
            <p class="text-sm mt-4 bg-yellow-50 dark:bg-yellow-900/10 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
              Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
            </p>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Erhebung bei Besuch
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p>
              Bei der bloß informatorischen Nutzung der Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur die personenbezogenen Daten, die Ihr Browser an unseren Server übermittelt. Wenn Sie unsere Website betrachten möchten, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen unsere Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten (Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO):
            </p>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm list-inside list-disc marker:text-gray-400">
              <li>IP-Adresse</li>
              <li>Datum und Uhrzeit der Anfrage</li>
              <li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
              <li>Inhalt der Anforderung (konkrete Seite)</li>
              <li>Zugriffsstatus/HTTP-Statuscode</li>
              <li>Jeweils übertragene Datenmenge</li>
              <li>Website, von der die Anforderung kommt</li>
              <li>Browser</li>
              <li>Betriebssystem und dessen Oberfläche</li>
              <li>Sprache und Version der Browsersoftware</li>
            </ul>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Einsatz von Cookies
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p>
              Zusätzlich zu den zuvor genannten Daten werden bei Ihrer Nutzung unserer Website Cookies auf Ihrem Rechner gespeichert. Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrer Festplatte dem von Ihnen verwendeten Browser zugeordnet gespeichert werden und durch welche der Stelle, die den Cookie setzt (hier durch uns), bestimmte Informationen zufließen. Cookies können keine Programme ausführen oder Viren auf Ihren Computer übertragen. Sie dienen dazu, das Internetangebot insgesamt nutzerfreundlicher und effektiver zu machen.
            </p>

            <div class="space-y-4 mt-4">
              <p><strong>a)</strong> Diese Website nutzt folgende Arten von Cookies, deren Umfang und Funktionsweise im Folgenden erläutert werden:</p>
              <ul class="list-disc list-inside ml-4">
                <li>Transiente Cookies (dazu b)</li>
                <li>Persistente Cookies (dazu c)</li>
              </ul>

              <p><strong>b) Transiente Cookies</strong> werden automatisiert gelöscht, wenn Sie den Browser schließen. Dazu zählen insbesondere die Session-Cookies. Diese speichern eine sogenannte Session-ID, mit welcher sich verschiedene Anfragen Ihres Browsers der gemeinsamen Sitzung zuordnen lassen. Dadurch kann Ihr Rechner wiedererkannt werden, wenn Sie auf unsere Website zurückkehren. Die Session-Cookies werden gelöscht, wenn Sie sich ausloggen oder den Browser schließen.</p>

              <p><strong>c) Persistente Cookies</strong> werden automatisiert nach einer vorgegebenen Dauer gelöscht, die sich je nach Cookie unterscheiden kann. Sie können die Cookies in den Sicherheitseinstellungen Ihres Browsers jederzeit löschen.</p>

              <p><strong>d)</strong> Sie können Ihre Browser-Einstellung entsprechend Ihren Wünschen konfigurieren und z. B. die Annahme von Third-Party-Cookies oder allen Cookies ablehnen. Wir weisen Sie darauf hin, dass Sie eventuell nicht alle Funktionen dieser Website nutzen können.</p>

              <p><strong>e)</strong> Wir setzen Cookies ein, um Sie für Folgebesuche identifizieren zu können, falls Sie über einen Account bei uns verfügen. Andernfalls müssten Sie sich für jeden Besuch erneut einloggen.</p>

              <p><strong>f)</strong> Weiterhin nutzen wir HTML5 storage objects, die auf Ihrem Endgerät abgelegt werden. Diese Objekte speichern die erforderlichen Daten unabhängig von Ihrem verwendeten Browser und haben kein automatisches Ablaufdatum. Die Nutzung von HTML5 storage objects können Sie verhindern, indem Sie in Ihrem Browser den privaten Modus einsetzen. Zudem empfehlen wir, regelmäßig Ihre Cookies und den Browser-Verlauf manuell zu löschen.</p>
            </div>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Weitere Funktionen
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p>
              Neben der rein informatorischen Nutzung unserer Website bieten wir verschiedene Leistungen an, die Sie bei Interesse nutzen können. Dazu müssen Sie in der Regel weitere personenbezogene Daten angeben, die wir zur Erbringung der jeweiligen Leistung nutzen und für die die zuvor genannten Grundsätze zur Datenverarbeitung gelten.
            </p>
            <p>
              Teilweise bedienen wir uns zur Verarbeitung Ihrer Daten externer Dienstleister. Diese wurden von uns sorgfältig ausgewählt und beauftragt, sind an unsere Weisungen gebunden und werden regelmäßig kontrolliert.
            </p>
            <p>
              Weiterhin können wir Ihre personenbezogenen Daten an Dritte weitergeben, wenn Aktionsteilnahmen, Gewinnspiele, Vertragsabschlüsse oder ähnliche Leistungen von uns gemeinsam mit Partnern angeboten werden. Nähere Informationen hierzu erhalten Sie bei Angabe Ihrer personenbezogenen Daten oder untenstehend in der Beschreibung des Angebotes.
            </p>
            <p>
              Soweit unsere Dienstleister oder Partner ihren Sitz in einem Staat außerhalb des Europäischen Wirtschaftsraumen (EWR) haben, informieren wir Sie über die Folgen dieses Umstands in der Beschreibung des Angebotes.
            </p>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Widerspruch & Widerruf
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p>
              Falls Sie eine Einwilligung zur Verarbeitung Ihrer Daten erteilt haben, können Sie diese jederzeit widerrufen. Ein solcher Widerruf beeinflusst die Zulässigkeit der Verarbeitung Ihrer personenbezogenen Daten, nachdem Sie ihn gegenüber uns ausgesprochen haben.
            </p>
            <p>
              Soweit wir die Verarbeitung Ihrer personenbezogenen Daten auf die Interessenabwägung stützen, können Sie Widerspruch gegen die Verarbeitung einlegen. Dies ist der Fall, wenn die Verarbeitung insbesondere nicht zur Erfüllung eines Vertrags mit Ihnen erforderlich ist, was von uns jeweils bei der nachfolgenden Beschreibung der Funktionen dargestellt wird. Bei Ausübung eines solchen Widerspruchs bitten wir um Darlegung der Gründe, weshalb wir Ihre personenbezogenen Daten nicht wie von uns durchgeführt verarbeiten sollten. Im Falle Ihres begründeten Widerspruchs prüfen wir die Sachlage und werden entweder die Datenverarbeitung einstellen bzw. anpassen oder Ihnen unsere zwingenden schutzwürdigen Gründe aufzeigen, aufgrund derer wir die Verarbeitung fortführen.
            </p>

            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 mt-4">
              <p class="font-bold">
                Selbstverständlich können Sie der Verarbeitung Ihrer personenbezogenen Daten für Zwecke der Werbung und Datenanalyse jederzeit widersprechen. Über Ihren Werbewiderspruch können Sie uns unter folgenden Kontaktdaten informieren:
              </p>
              <div class="mt-4">
                <p><strong>Per Post:</strong><br>Tennisclub Hardt e.V.<br>Birkmannsweg 16<br>41169 Mönchengladbach</p>
                <p class="mt-2"><strong>Per E-Mail:</strong><br><a href="mailto:info@tc-hardt.de" class="text-accent-600 dark:text-accent-400 hover:underline">info@tc-hardt.de</a></p>
              </div>
            </div>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Links & Social Media
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p><strong>Einsatz von Verlinkungen zu Webseiten anderer Anbieter und Social-Media-Diensten:</strong></p>
            <p>
              Unsere Webseite enthält Verlinkungen zu anderen Anbietern sowie folgender Social-MediaWebseiten: Facebook und Twitter. Wenn Sie unsere Seite besuchen, werden grundsätzlich keine personenbezogenen Daten an die Betreiber. Die Verlinkung zu der Social-MediaWebseite erkennen Sie an der Markierung oder das Logo. Wir eröffnen Ihnen die Möglichkeit, über diese Verlinkung direkt auf die entsprechende Social-Media-Webseite zu gelangen. Wir empfehlen Ihnen, sich nach Nutzung eines sozialen Netzwerks regelmäßig auszuloggen, insbesondere jedoch vor Aktivierung der Verlinkung, da Sie so eine Zuordnung zu Ihrem Profil bei der Social-Media-Website vermeiden können.
            </p>
            <p>
              Sollten Sie eine der verlinkten Webseiten besuchen, haben wir weder Einfluss auf die erhobenen Daten und Datenverarbeitungsvorgänge, noch sind uns der volle Umfang der Datenerhebung, die Zwecke der Verarbeitung, die Speicherfristen bekannt. Auch zur Löschung der erhobenen Daten durch den Social-Media-Anbieter liegen uns keine Informationen vor.
            </p>
            <p>
              Weitere Informationen zu Zweck und Umfang der Datenerhebung und ihrer Verarbeitung durch den Social-Media-Anbieter erhalten Sie in den im Folgenden mitgeteilten Datenschutzerklärungen dieser Anbieter. Dort erhalten Sie auch weitere Informationen zu Ihren diesbezüglichen Rechten und Einstellungsmöglichkeiten zum Schutze Ihrer Privatsphäre.
            </p>

            <p class="font-bold mt-4">Adressen der jeweiligen Plug-in-Anbieter und URL mit deren Datenschutzhinweisen:</p>
            <ul class="space-y-2 text-sm break-all">
              <li>
                <strong>a) Facebook Inc.</strong>, 1601 S California Ave, Palo Alto, California 94304, USA; <a
                  href="http://www.facebook.com/policy.php"
                  target="_blank"
                  class="text-accent-600 dark:text-accent-400 hover:underline"
                >http://www.facebook.com/policy.php</a>; weitere Informationen zur Datenerhebung: <a
                  href="http://www.facebook.com/help/186325668085084"
                  target="_blank"
                  class="text-accent-600 dark:text-accent-400 hover:underline"
                >http://www.facebook.com/help/186325668085084</a>, <a
                  href="http://www.facebook.com/about/privacy/your-info-on-other#applications"
                  target="_blank"
                  class="text-accent-600 dark:text-accent-400 hover:underline"
                >http://www.facebook.com/about/privacy/your-info-on-other#applications</a> sowie <a
                  href="http://www.facebook.com/about/privacy/your-info#everyoneinfo"
                  target="_blank"
                  class="text-accent-600 dark:text-accent-400 hover:underline"
                >http://www.facebook.com/about/privacy/your-info#everyoneinfo</a>. Facebook hat sich dem EU-US-Privacy-Shield unterworfen, <a
                  href="https://www.privacyshield.gov/EU-USFramework"
                  target="_blank"
                  class="text-accent-600 dark:text-accent-400 hover:underline"
                >https://www.privacyshield.gov/EU-USFramework</a>.
              </li>
              <li>
                <strong>b) Twitter, Inc.</strong>, 1355 Market St, Suite 900, San Francisco, California 94103, USA; <a
                  href="https://twitter.com/privacy"
                  target="_blank"
                  class="text-accent-600 dark:text-accent-400 hover:underline"
                >https://twitter.com/privacy</a>. Twitter hat sich dem EU-US-Privacy-Shield unterworfen, <a
                  href="https://www.privacyshield.gov/EU-US-Framework"
                  target="_blank"
                  class="text-accent-600 dark:text-accent-400 hover:underline"
                >https://www.privacyshield.gov/EU-US-Framework</a>.
              </li>
            </ul>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Google Analytics
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p><strong>Einsatz von Google Analytics:</strong></p>
            <p>
              Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der IP-Anonymisierung auf dieser Website, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Website-Aktivitäten zusammenzustellen und um weitere mit der Website-Nutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Website-Betreiber zu erbringen.
            </p>
            <p>
              Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt.
            </p>
            <p>
              Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plug-in herunterladen und installieren:

              <AppButton
                to="http://tools.google.com/dlpage/gaoptout?hl=de"
                target="_blank"
                label="Browser-Add-on"
                size="xs"
                variant="outline"
                icon="i-heroicons-arrow-top-right-on-square"
                class="inline-flex ml-2"
              />
            </p>
            <p>
              Diese Website verwendet Google Analytics mit der Erweiterung „_anonymizeIp()“. Dadurch werden IP-Adressen gekürzt weiterverarbeitet, eine Personenbeziehbarkeit kann damit ausgeschlossen werden. Soweit den über Sie erhobenen Daten ein Personenbezug zukommt, wird dieser also sofort ausgeschlossen und die personenbezogenen Daten damit umgehend gelöscht.
            </p>
            <p>
              Wir nutzen Google Analytics, um die Nutzung unserer Website analysieren und regelmäßig verbessern zu können. Über die gewonnenen Statistiken können wir unser Angebot verbessern und für Sie als Nutzer interessanter ausgestalten. Für die Ausnahmefälle, in denen personenbezogene Daten in die USA übertragen werden, hat sich Google dem EU-US Privacy Shield unterworfen, <a
                href="https://www.privacyshield.gov/EU-US-Framework"
                target="_blank"
                class="text-accent-600 dark:text-accent-400 hover:underline"
              >https://www.privacyshield.gov/EU-US-Framework</a>. Rechtsgrundlage für die Nutzung von Google Analytics ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO.
            </p>
            <p class="text-sm">
              Informationen des Drittanbieters: Google Dublin, Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Ireland, Fax: +353 (1) 436 1001. Nutzerbedingungen: <a
                href="http://www.google.com/analytics/terms/de.html"
                target="_blank"
                class="text-accent-600 dark:text-accent-400 hover:underline"
              >http://www.google.com/analytics/terms/de.html</a>, Übersicht zum Datenschutz: <a
                href="http://www.google.com/intl/de/analytics/learn/privacy.html"
                target="_blank"
                class="text-accent-600 dark:text-accent-400 hover:underline"
              >http://www.google.com/intl/de/analytics/learn/privacy.html</a>, sowie die Datenschutzerklärung: <a
                href="http://www.google.de/intl/de/policies/privacy"
                target="_blank"
                class="text-accent-600 dark:text-accent-400 hover:underline"
              >http://www.google.de/intl/de/policies/privacy</a>.
            </p>
            <p>
              Diese Website verwendet Google Analytics zudem für eine geräteübergreifende Analyse von Besucherströmen, die über eine User-ID durchgeführt wird. Sie können in Ihrem Kundenkonto unter „Meine Daten“, „persönliche Daten“ die geräteübergreifende Analyse Ihrer Nutzung deaktivieren.
            </p>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-12">
          <div class="md:col-span-4 lg:col-span-3">
            <h2 class="text-xl font-bold text-brand-dark-900 dark:text-white sticky top-24">
              Google Maps
            </h2>
          </div>

          <div class="md:col-span-8 lg:col-span-9 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left">
            <p><strong>Einbindung von Google Maps:</strong></p>
            <p>
              Auf dieser Webseite nutzen wir das Angebot von Google Maps. Dadurch können wir Ihnen interaktive Karten direkt in der Website anzeigen und ermöglichen Ihnen die komfortable Nutzung der Karten-Funktion.
            </p>
            <p>
              Durch den Besuch auf der Website erhält Google die Information, dass Sie die entsprechende Unterseite unserer Website aufgerufen haben. Zudem werden die oben in dieser Erklärung genannten Daten übermittelt. Dies erfolgt unabhängig davon, ob Google ein Nutzerkonto bereitstellt, über das Sie eingeloggt sind, oder ob kein Nutzerkonto besteht. Wenn Sie bei Google eingeloggt sind, werden Ihre Daten direkt Ihrem Konto zugeordnet. Wenn Sie die Zuordnung mit Ihrem Profil bei Google nicht wünschen, müssen Sie sich vor Aktivierung des Buttons ausloggen. Google speichert Ihre Daten als Nutzungsprofile und nutzt sie für Zwecke der Werbung, Marktforschung und/oder bedarfsgerechten Gestaltung seiner Website. Eine solche Auswertung erfolgt insbesondere (selbst für nicht eingeloggte Nutzer) zur Erbringung von bedarfsgerechter Werbung und um andere Nutzer des sozialen Netzwerks über Ihre Aktivitäten auf unserer Website zu informieren. Ihnen steht ein Widerspruchsrecht zu gegen die Bildung dieser Nutzerprofile, wobei Sie sich zur Ausübung dessen an Google richten müssen.
            </p>
            <p>
              Weitere Informationen zu Zweck und Umfang der Datenerhebung und ihrer Verarbeitung durch den Plug-in-Anbieter erhalten Sie in den Datenschutzerklärungen des Anbieters. Dort erhalten Sie auch weitere Informationen zu Ihren diesbezüglichen Rechten und Einstellungsmöglichkeiten zum Schutze Ihrer Privatsphäre:
              <AppButton
                to="http://www.google.de/intl/de/policies/privacy"
                target="_blank"
                label="Google Datenschutz"
                size="xs"
                variant="outline"
                icon="i-heroicons-arrow-top-right-on-square"
                class="inline-flex ml-2"
              />
            </p>
            <p>
              Google verarbeitet Ihre personenbezogenen Daten auch in den USA und hat sich dem EU-US Privacy Shield unterworfen, <a
                href="https://www.privacyshield.gov/EU-US-Framework"
                target="_blank"
                class="text-accent-600 dark:text-accent-400 hover:underline"
              >https://www.privacyshield.gov/EU-US-Framework</a>.
            </p>
          </div>
        </div>

      </div>

      <div class="mt-16 text-center text-xs text-gray-400">
        Stand: Mai 2021
      </div>

    </UContainer>
  </div>
</template>
