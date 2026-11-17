<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'
import Section from '~/components/base/Section.vue'

const { footerLinks, socialLinks } = useNavigation()
const route = useRoute()

const currentYear = new Date().getFullYear()
const showCta = computed(() => !route.meta.hideFooterCta)
</script>

<template>
  <footer class="site-footer">
    <div v-if="showCta" class="u-container">
      <Section
        variant="secondary"
        padding-top="sm"
        padding-bottom="sm"
        class="cta-banner"
        rounded
      >
        <div class="heart-badge">
          <BaseIcon name="i-heroicons-heart" class="heart-icon" />
        </div>

        <h2 class="cta-title">
          {{ $t('home.cta_bottom.title') }}
        </h2>

        <p class="cta-desc">
          {{ $t('home.cta_bottom.description') }}
        </p>

        <Button
          :to="$localePath('membership')"
          size="xl"
          variant="brand-dark"
          cta
          class="cta-btn"
        >
          {{ $t('nav.buttons.membership') }}
        </Button>
      </Section>
    </div>

    <div
      class="footer-body"
      :class="showCta ? 'has-cta' : 'no-cta'"
    >
      <div class="footer-container">
        <div class="top-row">
          <div class="brand">
            <img
              src="/tc-hardt-logo.svg"
              alt="TC Hardt"
              class="brand-logo"
            >
            <div class="brand-text">
              <span class="brand-name">
                {{ $t('footer.logo.name') }}
              </span>
              <span class="brand-suffix">
                {{ $t('footer.logo.suffix') }}
              </span>
            </div>
          </div>

          <nav class="footer-nav">
            <NuxtLink
              v-for="(link, index) in footerLinks"
              :key="index"
              :to="link.to"
              :target="link.target || '_self'"
              :external="link.target === '_blank' || link.to.endsWith('.pdf')"
              class="footer-link"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <div class="divider" />

        <div class="bottom-row">
          <span class="copyright">
            {{ $t('footer.copyright', { year: currentYear }) }}
          </span>

          <div class="social-links">
            <Button
              v-for="(social, index) in socialLinks"
              :key="index"
              :to="social.href"
              target="_blank"
              variant="ghost-white"
              :icon="social.icon"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  margin-top: auto;
  width: 100%;
  isolation: isolate;
}

.cta-banner {
  text-align: center;
  z-index: 10;
  position: relative;
  margin-bottom: -4.5rem;

  @include up("lg") {
    margin-bottom: -9rem;
  }
}

.heart-badge {
  display: inline-flex;
  padding: var(--space-4);
  border-radius: var(--radius-full);
  background-color: var(--color-white);
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow-sm);
}

.heart-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--color-highlight-600);
}

.cta-title {
  margin: 0 0 var(--space-6);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: var(--color-brand-dark-900);

  @include up("sm") {
    font-size: 3rem;
    line-height: 1;
  }
}

.cta-desc {
  margin: 0 auto var(--space-10);
  max-width: 42rem;
  font-size: 1.125rem;
  line-height: 1.625;
  color: var(--color-brand-dark-600);
}

.cta-btn {
  box-shadow: var(--shadow-lg);
}

.footer-body {
  background-color: var(--color-brand-dark-900);
  color: var(--color-white);
  padding-bottom: var(--space-12);
  border-top-left-radius: var(--radius-2xl);
  border-top-right-radius: var(--radius-2xl);
  position: relative;
  z-index: 0;
  margin-top: 0;

  &.has-cta {
    padding-top: 8rem;

    @include up("lg") {
      padding-top: 13rem;
    }
  }

  &.no-cta {
    padding-top: 3rem;

    @include up("lg") {
      padding-top: 4rem;
    }
  }
}

.footer-container {
  margin-inline: auto;
  padding-inline: var(--space-6);

  @include up("lg") {
    padding-inline: 0;
    max-width: 56rem;
  }

  @include up("xl") {
    max-width: 64rem;
  }

  @include up("2xl") {
    max-width: 72rem;
  }
}

.top-row {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-10);
  margin-bottom: var(--space-12);

  @include up("lg") {
    flex-direction: row;
    align-items: flex-end;
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.brand-logo {
  height: 4rem;
  width: auto;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 0.25rem;
}

.brand-name {
  font-family: var(--font-euro-extended);
  font-weight: 700;
  font-size: 1.875rem;
  color: var(--color-brand-dark-200);

  @include up("lg") {
    font-size: 1.5rem;
  }
}

.brand-suffix {
  font-family: var(--font-euro-bold);
  font-size: 1rem;
  color: var(--color-brand-dark-200);

  @include up("lg") {
    font-size: 0.75rem;
  }
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: var(--space-8);
  row-gap: var(--space-4);

  @include up("lg") {
    justify-content: flex-end;
  }
}

.footer-link {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-gray-300);
  text-decoration: none;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-white);
  }
}

.divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-brand-dark-700);
  margin-bottom: var(--space-8);
}

.bottom-row {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-6);

  @include up("md") {
    flex-direction: row;
  }
}

.copyright {
  font-size: 0.875rem;
  color: var(--color-gray-400);
}

.social-links {
  display: flex;
  align-items: center;
  gap: var(--space-6);

  @include up("md") {
    gap: var(--space-3);
  }
}
</style>
