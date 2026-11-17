<script setup lang="ts">
import InverseCorner from '~/components/layout/InverseCorner.vue'
import LanguageSwitcher from '~/components/base/LanguageSwitcher.vue'
import ColorModeButton from '~/components/base/ColorModeButton.vue'
import HeaderLogo from '~/components/layout/header/Logo.vue'
import HeaderHamburger from '~/components/layout/header/Hamburger.vue'
import HeaderDesktopNav from '~/components/layout/header/DesktopNav.vue'
import Button from '~/components/base/Button.vue'
import HeaderMobileMenu from '~/components/layout/header/MobileMenu.vue'
import { useUIStore } from '~/stores/ui'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const showColorModeButton = ref(false)
const showLanguageSwitch = ref(false)

const { headerMenu, navButtons, socialLinks } = useNavigation()
const route = useRoute()
const uiStore = useUIStore()

const isMobileMenuOpen = computed(() => uiStore.isMobileMenuOpen)
const closeMenu = () => { uiStore.closeMobileMenu() }
const toggleMenu = () => { uiStore.toggleMobileMenu() }

watch(() => route.fullPath, closeMenu)

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const handleResize = () => {
  if (window.innerWidth >= 1024 && isMobileMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-header">
    <div class="header-shell">
      <InverseCorner class="corner is-outer-left" :angle="0" />
      <InverseCorner class="corner is-outer-right" :angle="-90" />
      <InverseCorner class="corner is-logo-left" :angle="0" />
      <InverseCorner class="corner is-logo-right" :angle="-90" />

      <div class="header-card">
        <div class="header-bar">
          <div class="left-col">
            <HeaderDesktopNav :items="headerMenu" />
          </div>

          <HeaderLogo class="logo-col" @click="closeMenu" />

          <div class="right-col">
            <div class="social-group">
              <template v-for="(social, index) in socialLinks" :key="index">
                <Button
                  v-if="social.icon"
                  :to="social.href"
                  target="_blank"
                  variant="ghost"
                  size="xl"
                  :icon="social.icon"
                />
              </template>

              <ColorModeButton
                v-if="showColorModeButton"
                size="xl"
                variant="ghost"
              />

              <LanguageSwitcher
                v-if="showLanguageSwitch"
                size="xl"
                variant="ghost"
              />
            </div>

            <div class="cta-group">
              <Button
                v-for="(btn, index) in navButtons"
                :key="index"
                :to="btn.to"
                :label="btn.label"
                :target="btn.target"
                :variant="(btn.variant as any) || 'outline'"
                size="md"
              />
            </div>

            <HeaderHamburger :is-open="isMobileMenuOpen" @toggle="toggleMenu" />
          </div>
        </div>

        <HeaderMobileMenu
          :is-open="isMobileMenuOpen"
          :header-menu="headerMenu"
          :nav-buttons="navButtons"
          :social-links="socialLinks"
          :show-appearance-mode-button="showColorModeButton"
          :show-language-switch="showLanguageSwitch"
          @close="closeMenu"
        />
      </div>
    </div>

    <Transition name="backdrop-fade">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-backdrop"
        @click="closeMenu"
      />
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  pointer-events: none;
  width: 100%;

  @include up("lg") {
    top: 1rem;
  }
}

.header-shell {
  position: relative;
  margin-inline: auto;
  display: flex;
  justify-content: center;

  @include up("lg") {
    max-width: 56rem;
  }

  @include up("xl") {
    max-width: 64rem;
  }

  @include up("2xl") {
    max-width: 72rem;
  }

  &::before {
    content: "";
    display: none;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 97px;
    height: 113px;
    border-radius: 10px;
    background-color: var(--color-white);
    box-shadow: 0 25px 15px -10px rgba(0, 0, 0, 0.15);

    @include up("lg") {
      display: block;
    }
  }

  @include dark {
    &::before {
      background-color: var(--color-gray-900);
    }
  }
}

.corner {
  display: none;
  position: absolute;
  width: 26px;
  height: 26px;

  @include up("lg") {
    display: block;
  }

  &.is-outer-left {
    top: 0;
    left: -26px;
  }

  &.is-outer-right {
    top: 0;
    right: -26px;
  }

  &.is-logo-left {
    top: 72px;
    right: 50%;
    margin-right: 48px;
  }

  &.is-logo-right {
    top: 72px;
    left: 50%;
    margin-left: 48px;
  }
}

.header-card {
  pointer-events: auto;
  width: 100%;
  background-color: var(--color-white);
  border-bottom-left-radius: var(--radius-2xl);
  border-bottom-right-radius: var(--radius-2xl);
  padding-inline: var(--space-6);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
  transition: all 300ms ease-in-out;

  @include up("lg") {
    padding-inline: var(--space-8);
  }

  @include dark {
    background-color: var(--color-gray-900);
  }
}

.header-bar {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-shrink: 0;
  position: relative;
  padding-block: var(--space-2);

  @include up("lg") {
    padding-block: var(--space-3);
  }
}

.left-col {
  display: none;
  flex: 1;
  align-items: center;
  align-self: center;
  min-width: 0;

  @include up("lg") {
    display: flex;
    padding-right: var(--space-20);
  }
}

.logo-col {
  flex-shrink: 0;
  margin-inline: auto;
}

.right-col {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-3);
  align-self: center;

  @include up("lg") {
    padding-left: var(--space-20);
  }
}

.social-group {
  display: none;
  align-items: center;
  gap: var(--space-2);
  border-right: 1px solid var(--color-gray-200);
  padding-right: var(--space-4);
  margin-right: var(--space-2);

  @include up("lg") {
    display: flex;
  }

  @include dark {
    border-right-color: var(--color-gray-700);
  }
}

.cta-group {
  display: none;
  align-items: center;
  gap: var(--space-2);

  @include up("sm") {
    display: flex;
  }
}

.mobile-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgb(15 23 48 / 0.8);
  backdrop-filter: blur(4px);
  z-index: -1;
  pointer-events: auto;

  @include up("lg") {
    display: none;
  }

  @include dark {
    background-color: rgb(0 0 0 / 0.8);
  }
}

.backdrop-fade-enter-active {
  transition: opacity 300ms ease-out;
}
.backdrop-fade-leave-active {
  transition: opacity 200ms ease-in;
}
.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}
</style>
