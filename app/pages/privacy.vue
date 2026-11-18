<script setup lang="ts">
import PageHero from '~/components/base/PageHero.vue'
import LegalSection from '~/components/content/LegalSection.vue'
import AppButton from '~/components/base/Button.vue'

useSeoMeta({
  title: 'Datenschutzerklärung',
  ogTitle: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung des Tennisclub Hardt e.V. – Informationen zur Erhebung und Verarbeitung Ihrer personenbezogenen Daten.',
  ogDescription: 'Datenschutzerklärung des Tennisclub Hardt e.V. – Informationen zur Erhebung und Verarbeitung Ihrer personenbezogenen Daten.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div class="privacy-page">
    <PageHero
      title="Datenschutzerklärung"
      description="des Tennisclub Hardt e.V."
      badge="Stand: März 2026"
    />

    <div class="u-container legal-body">
      <div class="legal-sections">
        <LegalSection title="Information & Verantwortlicher" divider>
          <p>
            Im Folgenden informieren wir über die Erhebung personenbezogener Daten bei Nutzung unserer Website oder falls Sie Kontakt per E-Mail, über das Kontaktformular auf unserer Webseite oder per Post zu uns aufnehmen. Personenbezogene Daten sind alle Daten, die auf Sie persönlich beziehbar sind, z. B. Name, Adresse, E-Mail-Adressen, Nutzerverhalten.
          </p>
          <p>
            Verantwortlicher gem. Art. 4 Abs. 7 EU-Datenschutz-Grundverordnung (DS-GVO) ist:
          </p>
          <address class="info-box">
            <strong>Tennisclub Hardt e.V.</strong><br>
            Vertreten durch den Vorstand<br>
            Birkmannsweg 16<br>
            41169 Mönchengladbach<br><br>
            E-Mail: <a href="mailto:info@tc-hardt.de">info@tc-hardt.de</a>
          </address>
        </LegalSection>

        <LegalSection title="Kontaktaufnahme" divider>
          <p>
            Bei einer Kontaktaufnahme mit uns per E-Mail oder per Post werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse oder Postadresse, Ihr Name und ggf. Ihre Telefonnummer) von uns gespeichert, um Ihre Fragen zu beantworten (Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO).
          </p>
          <p>
            Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen.
          </p>
          <p>
            Falls wir für einzelne Funktionen unseres Angebots auf beauftragte Dienstleister zurückgreifen oder Ihre Daten für werbliche Zwecke nutzen möchten, werden wir Sie untenstehend im Detail über die jeweiligen Vorgänge informieren. Dabei nennen wir auch die festgelegten Kriterien der Speicherdauer.
          </p>
        </LegalSection>

        <LegalSection title="Ihre Rechte" divider>
          <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
          <ul class="bullet-list is-accent">
            <li>Recht auf Auskunft</li>
            <li>Recht auf Berichtigung oder Löschung</li>
            <li>Recht auf Einschränkung der Verarbeitung</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung</li>
            <li>Recht auf Datenübertragbarkeit</li>
          </ul>
          <p class="warning-callout">
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
          </p>
        </LegalSection>

        <LegalSection title="Erhebung bei Besuch" divider>
          <p>
            Bei der bloß informatorischen Nutzung der Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur die personenbezogenen Daten, die Ihr Browser an unseren Server übermittelt. Wenn Sie unsere Website betrachten möchten, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen unsere Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten (Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO):
          </p>
          <ul class="bullet-grid">
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
        </LegalSection>

        <LegalSection title="Einsatz von Cookies" divider>
          <p>
            Zusätzlich zu den zuvor genannten Daten werden bei Ihrer Nutzung unserer Website Cookies auf Ihrem Rechner gespeichert. Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrer Festplatte dem von Ihnen verwendeten Browser zugeordnet gespeichert werden und durch welche der Stelle, die den Cookie setzt (hier durch uns), bestimmte Informationen zufließen. Cookies können keine Programme ausführen oder Viren auf Ihren Computer übertragen. Sie dienen dazu, das Internetangebot insgesamt nutzerfreundlicher und effektiver zu machen.
          </p>

          <div class="sub-stack">
            <p><strong>a)</strong> Diese Website nutzt folgende Arten von Cookies, deren Umfang und Funktionsweise im Folgenden erläutert werden:</p>
            <ul class="bullet-list is-indented">
              <li>Transiente Cookies (dazu b)</li>
              <li>Persistente Cookies (dazu c)</li>
            </ul>

            <p><strong>b) Transiente Cookies</strong> werden automatisiert gelöscht, wenn Sie den Browser schließen. Dazu zählen insbesondere die Session-Cookies. Diese speichern eine sogenannte Session-ID, mit welcher sich verschiedene Anfragen Ihres Browsers der gemeinsamen Sitzung zuordnen lassen. Dadurch kann Ihr Rechner wiedererkannt werden, wenn Sie auf unsere Website zurückkehren. Die Session-Cookies werden gelöscht, wenn Sie sich ausloggen oder den Browser schließen.</p>

            <p><strong>c) Persistente Cookies</strong> werden automatisiert nach einer vorgegebenen Dauer gelöscht, die sich je nach Cookie unterscheiden kann. Sie können die Cookies in den Sicherheitseinstellungen Ihres Browsers jederzeit löschen.</p>

            <p><strong>d)</strong> Sie können Ihre Browser-Einstellung entsprechend Ihren Wünschen konfigurieren und z. B. die Annahme von Third-Party-Cookies oder allen Cookies ablehnen. Wir weisen Sie darauf hin, dass Sie eventuell nicht alle Funktionen dieser Website nutzen können.</p>

            <p><strong>e)</strong> Wir setzen Cookies ein, um Sie für Folgebesuche identifizieren zu können, falls Sie über einen Account bei uns verfügen. Andernfalls müssten Sie sich für jeden Besuch erneut einloggen.</p>

            <p><strong>f)</strong> Weiterhin nutzen wir HTML5 storage objects, die auf Ihrem Endgerät abgelegt werden. Diese Objekte speichern die erforderlichen Daten unabhängig von Ihrem verwendeten Browser und haben kein automatisches Ablaufdatum. Die Nutzung von HTML5 storage objects können Sie verhindern, indem Sie in Ihrem Browser den privaten Modus einsetzen. Zudem empfehlen wir, regelmäßig Ihre Cookies und den Browser-Verlauf manuell zu löschen.</p>
          </div>
        </LegalSection>

        <LegalSection title="Weitere Funktionen" divider>
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
        </LegalSection>

        <LegalSection title="Widerspruch & Widerruf" divider>
          <p>
            Falls Sie eine Einwilligung zur Verarbeitung Ihrer Daten erteilt haben, können Sie diese jederzeit widerrufen. Ein solcher Widerruf beeinflusst die Zulässigkeit der Verarbeitung Ihrer personenbezogenen Daten, nachdem Sie ihn gegenüber uns ausgesprochen haben.
          </p>
          <p>
            Soweit wir die Verarbeitung Ihrer personenbezogenen Daten auf die Interessenabwägung stützen, können Sie Widerspruch gegen die Verarbeitung einlegen. Dies ist der Fall, wenn die Verarbeitung insbesondere nicht zur Erfüllung eines Vertrags mit Ihnen erforderlich ist, was von uns jeweils bei der nachfolgenden Beschreibung der Funktionen dargestellt wird. Bei Ausübung eines solchen Widerspruchs bitten wir um Darlegung der Gründe, weshalb wir Ihre personenbezogenen Daten nicht wie von uns durchgeführt verarbeiten sollten. Im Falle Ihres begründeten Widerspruchs prüfen wir die Sachlage und werden entweder die Datenverarbeitung einstellen bzw. anpassen oder Ihnen unsere zwingenden schutzwürdigen Gründe aufzeigen, aufgrund derer wir die Verarbeitung fortführen.
          </p>

          <div class="info-box is-plain">
            <p class="bold-text">
              Selbstverständlich können Sie der Verarbeitung Ihrer personenbezogenen Daten für Zwecke der Werbung und Datenanalyse jederzeit widersprechen. Über Ihren Werbewiderspruch können Sie uns unter folgenden Kontaktdaten informieren:
            </p>
            <div class="sub-stack-sm">
              <p><strong>Per Post:</strong><br>Tennisclub Hardt e.V.<br>Birkmannsweg 16<br>41169 Mönchengladbach</p>
              <p><strong>Per E-Mail:</strong><br><a href="mailto:info@tc-hardt.de">info@tc-hardt.de</a></p>
            </div>
          </div>
        </LegalSection>

        <LegalSection title="Links & Social Media" divider>
          <p><strong>Einsatz von Verlinkungen zu Webseiten anderer Anbieter und Social-Media-Diensten:</strong></p>
          <p>
            Unsere Webseite enthält Verlinkungen zu anderen Anbietern sowie folgenden Social-Media Webseiten: Facebook und Instagram. Wenn Sie unsere Seite besuchen, werden grundsätzlich keine personenbezogenen Daten an die Betreiber übermittelt. Die Verlinkung zu der Social-Media-Webseite erkennen Sie an der Markierung oder das Logo. Wir eröffnen Ihnen die Möglichkeit, über diese Verlinkung direkt auf die entsprechende Social-Media-Webseite zu gelangen. Wir empfehlen Ihnen, sich nach Nutzung eines sozialen Netzwerks regelmäßig auszuloggen, insbesondere jedoch vor Aktivierung der Verlinkung, da Sie so eine Zuordnung zu Ihrem Profil bei der Social-Media-Website vermeiden können.
          </p>
          <p>
            Sollten Sie eine der verlinkten Webseiten besuchen, haben wir weder Einfluss auf die erhobenen Daten und Datenverarbeitungsvorgänge, noch sind uns der volle Umfang der Datenerhebung, die Zwecke der Verarbeitung, die Speicherfristen bekannt. Auch zur Löschung der erhobenen Daten durch den Social-Media-Anbieter liegen uns keine Informationen vor.
          </p>
          <p>
            Weitere Informationen zu Zweck und Umfang der Datenerhebung und ihrer Verarbeitung durch den Social-Media-Anbieter erhalten Sie in den im Folgenden mitgeteilten Datenschutzerklärungen dieser Anbieter. Dort erhalten Sie auch weitere Informationen zu Ihren diesbezüglichen Rechten und Einstellungsmöglichkeiten zum Schutze Ihrer Privatsphäre.
          </p>

          <p class="bold-text">Adressen der jeweiligen Anbieter und URL mit deren Datenschutzhinweisen:</p>
          <ul class="provider-list">
            <li>
              <strong>a) Meta Platforms Ireland Limited</strong> (Facebook, Instagram), 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland; <a
                href="https://www.facebook.com/about/privacy"
                target="_blank"
              >https://www.facebook.com/about/privacy</a> sowie <a
                href="https://help.instagram.com/519522125107875"
                target="_blank"
              >https://help.instagram.com/519522125107875</a>. Meta hat sich dem EU-US Data Privacy Framework unterworfen.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Analyse-Tools" divider>
          <p><strong>Einsatz von Matomo:</strong></p>
          <p>
            Diese Website nutzt den Webanalysedienst Matomo, um die Nutzung unserer Website analysieren und regelmäßig verbessern zu können. Über die gewonnenen Statistiken können wir unser Angebot verbessern und für Sie als Nutzer interessanter ausgestalten.
          </p>
          <p>
            Für diese Auswertung werden Cookies auf Ihrem Computer gespeichert. Die so erhobenen Informationen speichern wir ausschließlich auf unserem Server. Sie können die Auswertung einstellen, indem Sie vorhandene Cookies löschen und die Speicherung von Cookies verhindern. Wenn Sie die Speicherung von Cookies verhindern, weisen wir darauf hin, dass Sie gegebenenfalls diese Website nicht vollumfänglich nutzen können.
          </p>
          <p>
            Diese Website verwendet Matomo mit der Erweiterung „AnonymizeIP“. Dadurch werden IP-Adressen gekürzt weiterverarbeitet, eine direkte Personenbeziehbarkeit kann damit ausgeschlossen werden. Die mittels Matomo von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen von uns erhobenen Daten zusammengeführt.
          </p>
          <p>
            Die Nutzung von Matomo erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 S. 1 lit. a DS-GVO, die wir über unser Cookie-Banner abfragen. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die Cookie-Einstellungen auf unserer Website anpassen.
          </p>
          <p>
            Das Programm Matomo ist ein Open-Source-Projekt. Informationen des Drittanbieters zum Datenschutz erhalten Sie unter <a
              href="https://matomo.org/privacy-policy/"
              target="_blank"
            >https://matomo.org/privacy-policy/</a>.
          </p>
        </LegalSection>

        <LegalSection title="Google Maps">
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
              to="https://policies.google.com/privacy"
              target="_blank"
              label="Google Datenschutz"
              size="xs"
              variant="outline"
              icon="i-heroicons-arrow-top-right-on-square"
              class="inline-btn"
            />
          </p>
          <p>
            Google verarbeitet Ihre personenbezogenen Daten auch in den USA und hat sich dem EU-US Data Privacy Framework unterworfen. Rechtsgrundlage für die Nutzung von Google Maps ist Art. 6 Abs. 1 S. 1 lit. a DS-GVO (Einwilligung).
          </p>
        </LegalSection>
      </div>

      <div class="legal-footer">
        Stand: März 2026
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

.info-box {
  font-style: normal;
  font-weight: 500;
  color: var(--color-brand-dark-900);
  display: block;
  background-color: var(--color-gray-50);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-100);

  &.is-plain {
    font-weight: 400;
    color: inherit;
    margin-top: var(--space-4);
  }

  @include dark {
    color: var(--color-white);
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.bullet-list {
  list-style: disc inside;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);

  &.is-accent {
    margin-left: var(--space-2);

    li::marker {
      color: var(--color-accent-500);
    }
  }

  &.is-indented {
    margin-left: var(--space-4);
  }
}

.bullet-grid {
  list-style: disc inside;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2);
  font-size: 0.875rem;
  line-height: 1.25rem;

  @include up('sm') {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  li::marker {
    color: var(--color-gray-400);
  }
}

.warning-callout {
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: var(--space-4);
  background-color: #fefce8;
  color: #854d0e;
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid #fef9c3;

  @include dark {
    background-color: rgb(113 63 18 / 0.1);
    color: #fef08a;
    border-color: rgb(113 63 18 / 0.2);
  }
}

.sub-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.sub-stack-sm {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.bold-text {
  font-weight: 700;
}

.provider-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  font-size: 0.875rem;
  line-height: 1.25rem;
  word-break: break-all;
}

.inline-btn {
  display: inline-flex;
  margin-left: var(--space-2);
}

.legal-footer {
  margin-top: var(--space-16);
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--color-gray-400);
}
</style>
