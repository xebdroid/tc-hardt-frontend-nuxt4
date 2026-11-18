<script setup lang="ts">
import db from '~/assets/data/db.json'
import PageHero from '~/components/base/PageHero.vue'
import Headline from '~/components/base/Headline.vue'
import Section from '~/components/base/Section.vue'
import BaseGrid from '~/components/base/Grid.vue'
import BoardMemberRow from '~/components/board/BoardMemberRow.vue'
import ExtendedBoardCard from '~/components/board/ExtendedBoardCard.vue'

useSeoMeta({
  title: 'Vorstand',
  ogTitle: 'Vorstand',
  description: 'Lerne den Vorstand des TC Hardt kennen. Hier findest du deine Ansprechpartner für alle Belange rund um unseren Tennisverein.',
  ogDescription: 'Lerne den Vorstand des TC Hardt kennen. Hier findest du deine Ansprechpartner für alle Belange rund um unseren Tennisverein.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="board-page">
    <PageHero
      title="Der Vorstand"
      description="Deine Ansprechpartner für alle Belange rund um den TC Hardt."
    />

    <div>
      <Section
        v-for="(member, index) in db.board"
        :key="index"
        :variant="index % 2 === 0 ? 'default' : 'secondary-light'"
        :rounded="index !== 0 ? 'top' : false"
        :overlap-top="index !== 0"
        padding-bottom="xl"
        outer-container
      >
        <BoardMemberRow
          :member="member"
          :reverse="index % 2 !== 0"
        />
      </Section>
    </div>

    <Section
      variant="secondary-light"
      outer-container
      rounded
      overlap-top
      margin-bottom="xl"
    >
      <Headline
        title="Erweiterter Vorstand"
        alignment="center"
        tagline="Zusätzliche Unterstützung für den Verein"
      />
      <BaseGrid :cols="3" margin-top="lg" padded>
        <ExtendedBoardCard
          v-for="member in db.extendedBoard"
          :key="member.name"
          :member="member"
        />
      </BaseGrid>
    </Section>
  </div>
</template>
