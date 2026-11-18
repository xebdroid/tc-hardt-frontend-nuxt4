<script setup lang="ts">
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

interface Props {
  pdfPath: string
  email?: string
}

withDefaults(defineProps<Props>(), {
  email: 'info@tc-hardt.de'
})
</script>

<template>
  <div class="membership-signup-steps">
    <div class="steps-header">
      <Headline
        title="So wirst du Mitglied"
        description="Dein Weg in den Club – einfach und unkompliziert in 3 Schritten."
        alignment="center"
        margin-bottom="none"
      />
    </div>

    <div class="signup-grid">
      <ol class="steps-list">
        <li class="step-item">
          <div class="step-num">1</div>
          <div class="step-body">
            <h3 class="step-title">Herunterladen</h3>
            <p class="step-desc">Lade den Aufnahmeantrag als PDF herunter.</p>
          </div>
        </li>
        <li class="step-item">
          <div class="step-num">2</div>
          <div class="step-body">
            <h3 class="step-title">Ausfüllen</h3>
            <p class="step-desc">Fülle den Antrag digital oder per Hand aus und unterschreibe ihn.</p>
          </div>
        </li>
        <li class="step-item">
          <div class="step-num">3</div>
          <div class="step-body">
            <h3 class="step-title">Absenden</h3>
            <p class="step-desc">
              Sende den Antrag per E-Mail an
              <a :href="`mailto:${email}`" class="mail-link">{{ email }}</a>
              oder per Post.
            </p>
          </div>
        </li>
      </ol>

      <div class="download-card">
        <BaseIcon name="i-heroicons-document-text" class="bg-doc-icon" />

        <div class="download-content">
          <Headline
            title="Aufnahmeantrag"
            description="Hier findest du das offizielle Formular inklusive der Datenschutzhinweise."
            alignment="center"
            mode="light"
            size="h3"
          />

          <Button
            :to="pdfPath"
            target="_blank"
            size="xl"
            icon="i-heroicons-arrow-down-tray"
            variant="highlight"
            label="Antrag (PDF)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.steps-header {
  margin-bottom: var(--space-12);
}

.signup-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-16);
  align-items: stretch;

  @include up("md") {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.steps-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.step-item {
  display: flex;
  align-items: flex-start;
}

.step-num {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background-color: var(--color-brand-dark-900);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
}

.step-body {
  margin-left: var(--space-6);
}

.step-title {
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
  font-weight: 700;
}

.step-desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-brand-dark-700);

  @include dark {
    color: var(--color-gray-400);
  }
}

.mail-link {
  font-weight: 700;
  color: var(--color-brand-dark-900);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @include dark {
    color: var(--color-white);
  }
}

.download-card {
  background-color: var(--color-brand-dark-900);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @include up("sm") {
    padding: var(--space-12);
  }
}

.bg-doc-icon {
  position: absolute;
  right: -1.5rem;
  bottom: -1.5rem;
  width: 12rem;
  height: 12rem;
  color: rgb(255 255 255 / 0.05);
  transform: rotate(12deg);
  pointer-events: none;
}

.download-content {
  position: relative;
  z-index: 10;
}
</style>
