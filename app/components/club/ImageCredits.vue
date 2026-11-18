<script setup lang="ts">
interface ImageCredit {
  location: string
  src: string
  author?: { name: string, url: string }
  source?: { name: string, url: string }
  credit?: string
}

const imageCredits: ImageCredit[] = [
  {
    location: 'Startseite, Hero, Training',
    src: '/img/home/alexander-lunyov-wBLW_19byJY-unsplash.jpg',
    author: { name: 'Alexander Lunyov', url: 'https://unsplash.com/de/@sunify' },
    source: {
      name: 'Unsplash',
      url: 'https://unsplash.com/de/fotos/tennisspieler-auf-einem-sandplatz-mit-langem-schatten-wBLW_19byJY',
    },
  },
  {
    location: 'Startseite, Hero, Jubiläum (Beispiel)',
    src: '/img/home/hansmarkutt-tennis-5782695.jpg',
    author: { name: 'hansmarkutt', url: 'https://pixabay.com/users/hansmarkutt-6479460/' },
    source: { name: 'Pixabay', url: 'https://pixabay.com/photos/tennis-5782695/' },
  },
  {
    location: 'Events, Stadtmeisterschaften',
    src: '/img/events/naveen-ketterer-ExLozCZ1RUs-unsplash.jpg',
    author: { name: 'Naveen Ketterer', url: 'https://unsplash.com/de/@naveenketterer' },
    source: {
      name: 'Unsplash',
      url: 'https://unsplash.com/de/fotos/tennisspieler-mit-einer-anzeigetafel-mit-0-0-4-ExLozCZ1RUs',
    },
  },
  {
    location: 'Events, 1. Ressortsitzung Sport',
    src: '/img/events/dylan-gillis-KdeqA3aTnBY-unsplash.jpg',
    author: { name: 'Dylan Gillis', url: 'https://unsplash.com/de/@mainermedia' },
    source: {
      name: 'Unsplash',
      url: 'https://unsplash.com/de/fotos/menschen-die-tagsuber-auf-einem-stuhl-vor-dem-tisch-sitzen-und-stifte-halten-KdeqA3aTnBY',
    },
  },
  {
    location: 'Anlage, Familien-Ecke',
    src: '/img/facility/maedchen-auf-schaukel.jpg',
    author: { name: 'Nick Monica', url: 'https://unsplash.com/de/@nickmonica' },
    source: {
      name: 'Unsplash',
      url: 'https://unsplash.com/de/fotos/madchen-in-blauem-kapuzenpullover-sitzt-tagsuber-unter-bewolktem-himmel-auf-schaukel-FSQhX5lrkIg',
    },
  },
  {
    location: 'Mitgliedschaft',
    src: '/img/membership/tennis-platz-bank.jpg',
    author: { name: 'Jean Luc Catarin', url: 'https://unsplash.com/de/@luckybel' },
    source: {
      name: 'Unsplash',
      url: 'https://unsplash.com/de/fotos/eine-weisse-bank-die-auf-einem-feldweg-sitzt-a8iiRTy70_M',
    },
  },
  {
    location: 'Training',
    src: '/img/training/mann-haelt-tennisschlaeger-mit-ball.jpg',
    author: { name: 'Gonzalo Facello', url: 'https://unsplash.com/de/@gonchifacello' },
    source: {
      name: 'Unsplash',
      url: 'https://unsplash.com/de/fotos/eine-person-die-einen-tennisschlager-auf-einem-tennisplatz-halt-RjCo6j0BkU8',
    },
  },
  { location: 'Training', src: '/img/training/tennisschule-rot-weiss.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Training', src: '/img/training/trainer-nicole-gafert.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Training', src: '/img/training/trainer-marc-wigge.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Sponsoring', src: '/img/sponsoring/sponsoring-freundetafel.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Sponsoring', src: '/img/sponsoring/sponsoring-bandenwerbung.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Sponsoring', src: '/img/sponsoring/sponsoring-website.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Sponsoring', src: '/img/sponsoring/sponsoring-freundetafel_4x3.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Sponsoring', src: '/img/boris_ruetten.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Startseite', src: '/img/home/anlage-von-oben-large-preview.png', credit: 'TC Hardt e.V.' },
  { location: 'Startseite', src: '/img/home/clubhaus-von-oben.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Startseite', src: '/img/home/unsere-werte.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Anlage', src: '/img/facility/tc-hardt-facility-01.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Anlage', src: '/img/facility/clubhaus-sonnenterrasse.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Anlage', src: '/img/facility/buegeln.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Anlage', src: '/img/facility/beachvolleyball.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Über Uns', src: '/img/about/tc-hardt-anlage.jpg', credit: 'TC Hardt e.V.' },
  {
    location: 'Sponsoren',
    src: '/img/sponsors/logo_fsd_fruhen_schulze_dupuis.jpg',
    credit: 'FSD Fruhen Schulze Dupuis GmbH',
  },
  {
    location: 'Sponsoren',
    src: '/img/sponsors/logo_ansgar_mertens_immobilien.png',
    credit: 'Ansgar Mertens Immobilien',
  },
  { location: 'Sponsoren', src: '/img/sponsors/logo_consys.png', credit: 'Consys Group' },
  { location: 'Sponsoren', src: '/img/sponsors/logo_moll_bedachungen.png', credit: 'Moll Bedachungen' },
  { location: 'Sponsoren', src: '/img/sponsors/logo_kroker.png', credit: 'Kroker Werbeprofi' },
  { location: 'Sponsoren', src: '/img/sponsors/logo_fuchsbau.jpg', credit: 'Gaststätte Fuchsbau 54' },
  { location: 'Sponsoren', src: '/img/sponsors/logo_volksbank_immobilien.jpg', credit: 'VOBA Immobilien eG' },
  {
    location: 'Sponsoren',
    src: '/img/sponsors/logo_gs_metallbau_goelden_seewal.png',
    credit: 'G+S Metallbau Gölden u. Seewald',
  },
  { location: 'Sponsoren', src: '/img/sponsors/logo_tieves_schreinerei.png', credit: 'Tieves Schreinerei' },
  { location: 'Sponsoren', src: '/img/sponsors/logo_heister.jpg', credit: 'Sport Heister' },
  { location: 'News', src: '/img/news/2026-deutschland-cup.jpg', credit: 'TC Hardt e.V.' },
  { location: 'News', src: '/img/news/50-jahre-wappen.jpg', credit: 'TC Hardt e.V.' },
  { location: 'News', src: '/img/news/winter-medenspiele.jpg', credit: 'TC Hardt e.V.' },
  { location: 'News', src: '/img/news/2026-rosenmontag.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-kaspar-fuchs.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-boris-ruetten.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-witold-bialy.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-manfred-schroeer.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-stefanie-henckel-wollny.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-torsten-schuermann.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-neil-warden.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-lukas-schroeer.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-michael-kery.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-niclas-klumpen.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Vorstand', src: '/img/board/vorstand-michael-grefrath.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Events', src: '/img/events/2026-rosenmontag.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Events', src: '/img/events/clubhaus-sonnenterrasse-klein.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Events', src: '/img/events/fruehjahrsputz.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Events', src: '/img/events/tag-der-offenen-tuer-2026.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Events', src: '/img/events/50-jahre-emblem.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Events', src: '/img/events/sangria-open.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Events', src: '/img/events/finale.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Events', src: '/img/events/gluehwein-open.jpg', credit: 'TC Hardt e.V.' },
]
</script>

<template>
  <div class="image-credits">
    <table class="credits-table">
      <thead class="thead">
        <tr>
          <th class="th is-first">Einsatzort</th>
          <th class="th">Bild-Quelle</th>
          <th class="th is-last">Bildnachweis</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr
          v-for="(credit, index) in imageCredits"
          :key="index"
          class="tr"
        >
          <td class="td is-location">
            <span class="mobile-label">Einsatzort</span>
            <span>{{ credit.location }}</span>
          </td>
          <td class="td is-src">
            <span class="mobile-label">Bild-Quelle</span>
            <span>{{ credit.src }}</span>
          </td>
          <td class="td is-credit">
            <span class="mobile-label">Bildnachweis</span>
            <span>
              <template v-if="credit.author && credit.source">
                Foto von
                <a :href="credit.author.url" target="_blank" rel="noopener noreferrer" class="credit-link">
                  {{ credit.author.name }}
                </a>
                auf
                <a :href="credit.source.url" target="_blank" rel="noopener noreferrer" class="credit-link">
                  {{ credit.source.name }}
                </a>
              </template>
              <template v-else>
                {{ credit.credit }}
              </template>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.image-credits {
  width: 100%;
}

.credits-table {
  width: 100%;
  font-size: 0.875rem;
  border-collapse: collapse;
}

.thead {
  display: none;
  background-color: var(--color-gray-50);
  text-align: left;

  @include up("md") {
    display: table-header-group;
  }

  @include dark {
    background-color: rgb(26 40 82 / 0.2);
  }
}

.th {
  padding: var(--space-3);
  font-weight: 600;
  color: var(--color-gray-700);

  @include dark {
    color: var(--color-gray-200);
  }

  &.is-first {
    border-top-left-radius: var(--radius-md);
  }

  &.is-last {
    border-top-right-radius: var(--radius-md);
  }
}

.tr {
  display: block;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  background-color: var(--color-pure-white);
  margin-bottom: var(--space-2);

  @include dark {
    background-color: var(--color-gray-800);
  }

  @include up("md") {
    display: table-row;
    border-radius: 0;
    box-shadow: none;
    margin-bottom: 0;
    border-top: 1px solid var(--color-gray-200);

    &:nth-child(odd) {
      background-color: var(--color-pure-white);
    }

    &:nth-child(even) {
      background-color: var(--color-gray-50);
    }

    @include dark {
      border-top-color: var(--color-gray-700);

      &:nth-child(odd) {
        background-color: rgb(30 41 59 / 0.5);
      }

      &:nth-child(even) {
        background-color: rgb(51 65 85 / 0.5);
      }
    }
  }
}

.td {
  display: flex;
  flex-direction: column;
  padding: var(--space-3);
  text-align: left;
  color: var(--color-gray-600);

  @include dark {
    color: var(--color-gray-400);
  }

  &.is-location {
    color: var(--color-gray-800);

    @include dark {
      color: var(--color-gray-300);
    }
  }

  &.is-src {
    border-top: 1px solid var(--color-gray-100);
    word-break: break-all;

    @include dark {
      border-top-color: rgb(51 65 85 / 0.5);
    }
  }

  &.is-credit {
    border-top: 1px solid var(--color-gray-100);

    @include dark {
      border-top-color: rgb(51 65 85 / 0.5);
    }
  }

  @include up("md") {
    display: table-cell;
    border-top: 0 !important;
  }
}

.mobile-label {
  font-weight: 600;
  color: var(--color-gray-600);

  @include dark {
    color: var(--color-gray-400);
  }

  @include up("md") {
    display: none;
  }
}

.credit-link {
  color: var(--color-brand-dark-500);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
