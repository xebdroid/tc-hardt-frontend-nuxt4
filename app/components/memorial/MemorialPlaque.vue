<script setup lang="ts">
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- Gedenkplakette (authentischer Nachbau des Originalschilds) -->
    <div
      class="relative flex-1 flex flex-col rounded-2xl bg-white dark:bg-gray-800 border border-brand-light-200/70 dark:border-gray-700 shadow-xl p-2.5 sm:p-3.5 transition-all duration-300"
    >
      <!-- Inset-Doppelrahmenlinie -->
      <div
        class="relative flex-1 flex flex-col justify-between rounded-xl border border-brand-light-200/80 dark:border-gray-700/80 p-5 sm:p-7 md:p-8 bg-white/50 dark:bg-gray-800/50"
      >
        <!-- OBERE REIHE: Logo Links bündig von Oberkante "In Gedenken" bis Unterkante Herzlinie -->
        <div class="relative z-10 flex items-stretch justify-between gap-2 sm:gap-4">
          <!-- Logo im Original (Höhe matcht exakt die Textspalte) -->
          <div class="flex items-center shrink-0">
            <img
              src="/tc-hardt-logo-desktop.svg"
              alt="TC Hardt 1976 e.V."
              class="h-full w-auto max-h-[75px] sm:max-h-[90px] md:max-h-[100px] object-contain shadow-sm"
            >
          </div>

          <!-- Mittiger Header: In Gedenken, Tennisclub Hardt & Herzlinie -->
          <div class="flex flex-col justify-between items-center text-center py-0.5">
            <h3
              class="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1C3063] dark:text-white font-medium tracking-wide leading-none"
            >
              In Gedenken
            </h3>
            <p
              class="font-serif text-base sm:text-lg md:text-xl text-[#2C4D7C] dark:text-brand-light-300 font-normal tracking-normal my-1 sm:my-1.5"
            >
              Tennisclub Hardt
            </p>

            <!-- Herz-Trennlinie (bildet den unteren Rand) -->
            <div class="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-[180px]">
              <span class="h-px flex-1 bg-gradient-to-r from-transparent to-[#7AC7EA]" />
              <UIcon
                name="i-heroicons-heart-solid"
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7AC7EA] shrink-0"
              />
              <span class="h-px flex-1 bg-gradient-to-l from-transparent to-[#7AC7EA]" />
            </div>
          </div>

          <!-- Rechter Ausgleich für exakte Zentrierung der Mitte -->
          <div class="w-[58px] sm:w-[70px] md:w-[78px] shrink-0 invisible" />
        </div>

        <!-- UNTERER TEXTBEREICH: Gedenkspruch / Gedicht zentriert -->
        <div class="relative z-10 mt-6 sm:mt-8 mb-2 flex-1 flex flex-col justify-center items-center text-center">
          <div
            class="font-serif italic text-slate-800 dark:text-slate-200 text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed sm:leading-loose max-w-xl mx-auto"
          >
            <p class="tracking-wide">Was bleibt, ist die Erinnerung</p>
            <p class="tracking-wide">an gemeinsame Zeiten,</p>
            <p class="tracking-wide">an Lachen, Freundschaft</p>
            <p class="tracking-wide">und die Liebe zum Tennis.</p>
            <p class="mt-4 sm:mt-5 font-semibold text-[#1C3063] dark:text-brand-light-300 not-italic tracking-wide text-lg sm:text-xl md:text-2xl">
              Du bleibst in unseren Herzen.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
