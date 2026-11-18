<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'
</script>

<template>
  <div class="memorial-plaque">
    <div class="outer-frame">
      <div class="inner-frame">
        <div class="top-row">
          <div class="logo-box">
            <img
              src="/tc-hardt-logo-desktop.svg"
              alt="TC Hardt 1976 e.V."
              class="logo-img"
            >
          </div>

          <div class="center-header">
            <h3 class="plaque-title">
              In Gedenken
            </h3>
            <p class="plaque-club">
              Tennisclub Hardt
            </p>

            <div class="heart-divider">
              <span class="divider-line is-left" />
              <BaseIcon name="i-heroicons-heart-solid" class="heart-icon" />
              <span class="divider-line is-right" />
            </div>
          </div>

          <div class="right-spacer" />
        </div>

        <div class="poem-area">
          <div class="poem-text">
            <p>Was bleibt, ist die Erinnerung</p>
            <p>an gemeinsame Zeiten,</p>
            <p>an Lachen, Freundschaft</p>
            <p>und die Liebe zum Tennis.</p>
            <p class="poem-closing">
              Du bleibst in unseren Herzen.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.memorial-plaque {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.outer-frame {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  background-color: var(--color-pure-white);
  border: 1px solid rgb(155 213 239 / 0.7);
  box-shadow: var(--shadow-xl);
  padding: 0.625rem;
  transition: all 300ms ease;

  @include up("sm") {
    padding: 0.875rem;
  }

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.inner-frame {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--radius-lg);
  border: 1px solid rgb(155 213 239 / 0.8);
  padding: var(--space-5);
  background-color: rgb(255 255 255 / 0.5);

  @include up("sm") {
    padding: 1.75rem;
  }

  @include up("md") {
    padding: var(--space-8);
  }

  @include dark {
    background-color: rgb(30 41 59 / 0.5);
    border-color: rgb(51 65 85 / 0.8);
  }
}

.top-row {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: var(--space-2);

  @include up("sm") {
    gap: var(--space-4);
  }
}

.logo-box {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-img {
  height: 100%;
  width: auto;
  max-height: 75px;
  object-fit: contain;
  box-shadow: var(--shadow-sm);

  @include up("sm") {
    max-height: 90px;
  }

  @include up("md") {
    max-height: 100px;
  }
}

.center-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding-block: 0.125rem;
}

.plaque-title {
  margin: 0;
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #1C3063;
  letter-spacing: 0.025em;
  line-height: 1;

  @include up("sm") {
    font-size: 1.875rem;
  }

  @include up("md") {
    font-size: 2.25rem;
  }

  @include dark {
    color: var(--color-white);
  }
}

.plaque-club {
  margin: 0.25rem 0;
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 1rem;
  font-weight: 400;
  color: #2C4D7C;

  @include up("sm") {
    font-size: 1.125rem;
    margin-block: 0.375rem;
  }

  @include up("md") {
    font-size: 1.25rem;
  }

  @include dark {
    color: var(--color-brand-light-300);
  }
}

.heart-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  max-width: 180px;

  @include up("sm") {
    gap: var(--space-3);
  }
}

.divider-line {
  height: 1px;
  flex: 1;

  &.is-left {
    background-image: linear-gradient(to right, transparent, #7AC7EA);
  }

  &.is-right {
    background-image: linear-gradient(to left, transparent, #7AC7EA);
  }
}

.heart-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: #7AC7EA;
  flex-shrink: 0;

  @include up("sm") {
    width: 1rem;
    height: 1rem;
  }
}

.right-spacer {
  width: 58px;
  flex-shrink: 0;
  visibility: hidden;

  @include up("sm") {
    width: 70px;
  }

  @include up("md") {
    width: 78px;
  }
}

.poem-area {
  position: relative;
  z-index: 10;
  margin-top: var(--space-6);
  margin-bottom: var(--space-2);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @include up("sm") {
    margin-top: var(--space-8);
  }
}

.poem-text {
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: italic;
  color: var(--color-gray-800);
  font-size: 1rem;
  line-height: 1.625;
  max-width: 36rem;
  margin-inline: auto;

  @include up("sm") {
    font-size: 1.125rem;
    line-height: 2;
  }

  @include up("md") {
    font-size: 1.25rem;
  }

  @include up("lg") {
    font-size: 22px;
  }

  @include dark {
    color: var(--color-gray-200);
  }

  p {
    margin: 0;
    letter-spacing: 0.025em;
  }
}

.poem-closing {
  margin-top: var(--space-4) !important;
  font-weight: 600;
  font-style: normal;
  color: #1C3063;
  font-size: 1.125rem;

  @include up("sm") {
    margin-top: var(--space-5) !important;
    font-size: 1.25rem;
  }

  @include up("md") {
    font-size: 1.5rem;
  }

  @include dark {
    color: var(--color-brand-light-300);
  }
}
</style>
