<script setup lang="ts">
import db from '~/assets/data/db.json'

useHead({ title: 'Vorstand | TC Hardt' })
</script>

<template>
  <div class="bg-gray-50 min-h-screen pb-24">

    <UPageHero
      title="Der Vorstand"
      description="Deine Ansprechpartner für alle Belange rund um den TC Hardt."
      align="center"
      class="bg-white pb-12"
    />

    <UContainer class="mt-12">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        <UCard
          v-for="(member, index) in db.board"
          :key="index"
          class="text-center group hover:-translate-y-1 transition-transform duration-300"
        >
          <div class="mx-auto w-32 h-32 rounded-full bg-tennis-100 flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:border-tennis-200">
            <UIcon name="i-heroicons-user" class="w-16 h-16 text-tennis-400" />
          </div>

          <h3 class="text-xl font-bold text-tennis-900">{{ member.name }}</h3>
          <UBadge
            variant="subtle"
            color="primary"
            class="mt-2 mb-4"
          >{{ member.role }}</UBadge>

          <div class="text-sm text-gray-500 mb-6 min-h-[40px]">
            <span class="font-semibold block text-gray-700 mb-1">Zuständig für:</span>
            {{ member.area }}
          </div>

          <template #footer>
            <UButton
              :to="`mailto:${member.email}`"
              color="white"
              variant="solid"
              icon="i-heroicons-envelope"
              class="w-full justify-center group-hover:bg-tennis-50 group-hover:text-tennis-600"
            >
              E-Mail schreiben
            </UButton>
          </template>
        </UCard>

      </div>

      <div class="mt-16 text-center text-gray-500 italic">
        Erweiterter Vorstand: Folgt...
      </div>
    </UContainer>
  </div>
</template>
