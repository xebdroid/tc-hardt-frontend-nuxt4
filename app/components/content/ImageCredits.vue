<script setup lang="ts">
interface ImageCredit {
  location: string;
  src: string;
  author?: { name: string, url: string };
  source?: { name: string, url: string };
  credit?: string;
}

const imageCredits: ImageCredit[] = [
  // Stock Photos
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
    location: 'Mitgliedschaft', src: '/img/membership/tennis-platz-bank.jpg',
    author: { name: 'Jean Luc Catarin', url: 'https://unsplash.com/de/@luckybel' },
    source: {
      name: 'Unsplash',
      url: 'https://unsplash.com/de/fotos/eine-weisse-bank-die-auf-einem-feldweg-sitzt-a8iiRTy70_M',
    },
  },
  {
    location: 'Training', src: '/img/training/mann-haelt-tennisschlaeger-mit-ball.jpg',
    author: { name: 'Gonzalo Facello', url: 'https://unsplash.com/de/@gonchifacello' },
    source: {
      name: 'Unsplash',
      url: 'https://unsplash.com/de/fotos/eine-person-die-einen-tennisschlager-auf-einem-tennisplatz-halt-RjCo6j0BkU8',
    },
  },
  {
    location: 'Jubiläum', src: '/img/jubilee/konfetti.jpg',
    author: { name: 'Jason Leung', url: 'https://unsplash.com/de/@ninjason' },
    source: {
      name: 'Unsplash',
      url: 'https://unsplash.com/de/fotos/selektive-fokusfotografie-von-mehrfarbigem-konfetti-Xaanw0s0pMk',
    },
  },
  {
    location: 'Jubiläum', src: '/img/jubilee/gluehwein.jpg',
    author: { name: 'Svitlana', url: 'https://unsplash.com/de/@kekse_und_ich' },
    source: {
      name: 'Unsplash',
      url: 'https://unsplash.com/de/fotos/ein-holzloffel-mit-zitronen-und-eine-schussel-mit-geschnittenen-zitronen-8ts6P7yv-nE',
    },
  },
  // Internal Images
  { location: 'Training', src: '/img/training/tennisschule-rot-weiss.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Training', src: '/img/training/trainer-nicole-gafert.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Training', src: '/img/training/trainer-marc-wigge.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Sponsoring', src: '/img/sponsoring/sponsoring-freundetafel.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Sponsoring', src: '/img/sponsoring/sponsoring-bandenwerbung.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Sponsoring', src: '/img/sponsoring/sponsoring-website.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Sponsoring', src: '/img/sponsoring/sponsoring-freundetafel_4x3.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Sponsoring', src: '/img/boris_ruetten.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Jubiläum', src: '/img/jubilee/tennis-plaetze-von-oben.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Jubiläum', src: '/img/jubilee/50-jahre-emblem.png', credit: 'TC Hardt e.V.' },
  { location: 'Jubiläum', src: '/img/jubilee/drei-tennis-plaetze-leer.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Jubiläum', src: '/img/jubilee/50-jahre-emblem-gold.png', credit: 'TC Hardt e.V.' },
  { location: 'Startseite', src: '/img/home/anlage-von-oben-large-preview.png', credit: 'TC Hardt e.V.' },
  { location: 'Startseite', src: '/img/home/clubhaus-von-oben.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Startseite', src: '/img/home/unsere-werte.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Anlage', src: '/img/facility/tc-hardt-facility-01.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Anlage', src: '/img/facility/clubhaus-sonnenterrasse.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Anlage', src: '/img/facility/buegeln.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Anlage', src: '/img/facility/beachvolleyball.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Über Uns', src: '/img/about/tc-hardt-anlage.jpg', credit: 'TC Hardt e.V.' },
  { location: 'Jubiläum', src: '/img/jubilee/50-jahre-tc-hardt.jpg', credit: 'TC Hardt e.V.' },
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
];
</script>

<template>
  <div class="w-full">
    <table class="w-full text-sm">
      <thead class="hidden bg-gray-50 dark:bg-brand-dark-900/20 md:table-header-group">
      <tr class="text-left">
        <th class="p-3 font-semibold text-gray-700 dark:text-gray-200 rounded-tl-lg">
          Einsatzort
        </th>
        <th class="p-3 font-semibold text-gray-700 dark:text-gray-200">
          Bild-Quelle
        </th>
        <th class="p-3 font-semibold text-gray-700 dark:text-gray-200 rounded-tr-lg">
          Bildnachweis
        </th>
      </tr>
      </thead>
      <tbody class="space-y-2 md:space-y-0 md:divide-y md:divide-gray-200 dark:md:divide-gray-700">
      <tr
        v-for="(credit, index) in imageCredits"
        :key="index"
        class="block rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800
                 md:table-row md:rounded-none md:shadow-none
                 md:odd:bg-white md:even:bg-gray-50
                 dark:md:odd:bg-gray-800/50 dark:md:even:bg-gray-700/50"
      >
        <td class="flex flex-col p-3 text-gray-800 dark:text-gray-300 md:table-cell md:p-3">
          <span class="font-semibold text-gray-600 dark:text-gray-400 md:hidden">Einsatzort</span>
          <span class="text-left">{{ credit.location }}</span>
        </td>
        <td
          class="flex flex-col p-3 border-t border-gray-100 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 md:table-cell md:p-3 md:border-t-0 break-all">
          <span class="font-semibold text-gray-600 dark:text-gray-400 md:hidden">Bild-Quelle</span>
          <span class="text-left">{{ credit.src }}</span>
        </td>
        <td
          class="flex flex-col p-3 border-t border-gray-100 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 md:table-cell md:p-3">
          <span class="font-semibold text-gray-600 dark:text-gray-400 md:hidden">Bildnachweis</span>
          <span class="text-left">
              <template v-if="credit.author && credit.source">
                Foto von <a :href="credit.author.url" target="_blank" rel="noopener noreferrer"
                            class="text-primary-500 hover:underline">{{ credit.author.name }}</a>
                auf <a :href="credit.source.url" target="_blank" rel="noopener noreferrer"
                       class="text-primary-500 hover:underline">{{ credit.source.name }}</a>
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
