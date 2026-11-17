<script setup>
import { onMounted, reactive } from 'vue'
import BaseIcon from '~/components/base/Icon.vue'

const palettes = [
  { key: 'brand-dark', label: 'Brand Dark (Navy)', base: '800' },
  { key: 'brand-light', label: 'Brand Light (Sky)', base: '400' },
  { key: 'highlight', label: 'Highlight (Lime)', base: '400' },
  { key: 'accent', label: 'Accent (Orange)', base: '500' }
]

const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

const resolvedColors = reactive({})

const rgbToHex = (rgbStr) => {
  if (!rgbStr) return null
  if (rgbStr.startsWith('#')) return rgbStr

  const rgb = rgbStr.match(/\d+/g)
  if (!rgb) return null

  return '#' +
    ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2)
}

onMounted(() => {
  const styles = getComputedStyle(document.documentElement)

  palettes.forEach(palette => {
    steps.forEach(step => {
      const varName = `--color-${palette.key}-${step}`
      const value = styles.getPropertyValue(varName).trim()
      resolvedColors[`${palette.key}-${step}`] = rgbToHex(value) || value
    })
  })
})

function getContrastColor(hex) {
  if (!hex || !hex.startsWith('#')) return 'black'

  const r = parseInt(hex.substr(1, 2), 16)
  const g = parseInt(hex.substr(3, 2), 16)
  const b = parseInt(hex.substr(5, 2), 16)

  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? 'black' : 'white'
}
</script>

<template>
  <div class="dev-colors-page">
    <div class="header-box">
      <h1 class="page-title">TC Hardt Design System</h1>
      <p class="page-desc">
        Live-Werte aus den CSS Custom Properties (<code>_tokens.scss</code>). Änderungen dort werden hier automatisch reflektiert.
      </p>
    </div>

    <div class="palettes-grid">
      <div
        v-for="palette in palettes"
        :key="palette.key"
        class="palette-col"
      >
        <div class="palette-header">
          <div
            class="palette-swatch"
            :style="{ backgroundColor: `var(--color-${palette.key}-${palette.base})` }"
          />
          <div>
            <h2 class="palette-title">{{ palette.label }}</h2>
            <p class="palette-var">Variable: --color-{{ palette.key }}-*</p>
          </div>
        </div>

        <div class="steps-stack">
          <div
            v-for="step in steps"
            :key="step"
            class="step-row"
            :style="{
              backgroundColor: `var(--color-${palette.key}-${step})`,
              color: getContrastColor(resolvedColors[`${palette.key}-${step}`])
            }"
          >
            <span class="step-label">{{ step }}</span>
            <span class="step-hex">{{ resolvedColors[`${palette.key}-${step}`] || 'loading...' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="preview-container">
      <h2 class="section-title">UI Komponenten Check</h2>

      <div class="preview-grid">
        <div class="preview-card is-light">
          <div class="card-header">
            <BaseIcon name="i-heroicons-sun" class="card-icon is-light" />
            <h3 class="card-title is-light">Light Mode Context</h3>
          </div>
          <div class="card-body">
            <div class="btn-row">
              <button class="demo-btn is-primary-light">
                Primary (Navy)
              </button>
              <button class="demo-btn is-accent">
                Action (Orange)
              </button>
            </div>
            <div class="badge-row">
              <span class="demo-badge is-highlight">Neu</span>
              <span class="demo-badge is-info">Info</span>
            </div>
          </div>
        </div>

        <div class="preview-card is-dark">
          <div class="card-header">
            <BaseIcon name="i-heroicons-moon" class="card-icon is-dark" />
            <h3 class="card-title is-dark">Dark Mode Context</h3>
          </div>
          <div class="card-body">
            <div class="btn-row">
              <button class="demo-btn is-primary-dark">
                Primary (Light Navy)
              </button>
              <button class="demo-btn is-accent">
                Action (Orange)
              </button>
            </div>
            <div class="badge-row">
              <span class="demo-badge is-live">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dev-colors-page {
  min-height: 100vh;
  background-color: var(--color-gray-50);
  padding: var(--space-8);
  font-family: var(--font-sans);

  @include dark {
    background-color: var(--color-gray-950);
  }
}

.header-box {
  max-width: 80rem;
  margin: 0 auto var(--space-12);
}

.page-title {
  margin: 0 0 var(--space-2);
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: var(--color-gray-900);

  @include dark {
    color: var(--color-white);
  }
}

.page-desc {
  margin: 0;
  color: var(--color-gray-500);
}

.palettes-grid {
  max-width: 80rem;
  margin: 0 auto var(--space-16);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);

  @include up('md') {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include up('xl') {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.palette-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.palette-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.palette-swatch {
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgb(17 24 39 / 0.1);
}

.palette-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-gray-900);

  @include dark {
    color: var(--color-white);
  }
}

.palette-var {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-gray-500);
}

.steps-stack {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);

  @include dark {
    border-color: var(--color-gray-800);
  }
}

.step-row {
  height: 2.5rem;
  padding-inline: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  transition: all var(--transition-fast);
  transform-origin: left;

  &:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-md);
    z-index: 10;
  }
}

.step-label {
  font-weight: 700;
}

.step-hex {
  opacity: 0.8;
  text-transform: uppercase;
}

.preview-container {
  max-width: 80rem;
  margin-inline: auto;
}

.section-title {
  margin: 0 0 var(--space-8);
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);

  @include dark {
    color: var(--color-white);
  }
}

.preview-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);

  @include up('md') {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.preview-card {
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);

  &.is-light {
    background-color: var(--color-pure-white);
    border: 1px solid var(--color-gray-100);
  }

  &.is-dark {
    background-color: var(--color-brand-dark-950);
    border: 1px solid var(--color-brand-dark-900);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.card-icon {
  width: 1.5rem;
  height: 1.5rem;

  &.is-light {
    color: var(--color-brand-dark-500);
  }

  &.is-dark {
    color: var(--color-brand-light-400);
  }
}

.card-title {
  margin: 0;
  font-weight: 700;
  font-size: 1.125rem;

  &.is-light {
    color: var(--color-gray-900);
  }

  &.is-dark {
    color: var(--color-pure-white);
  }
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
}

.demo-btn {
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-md);
  font-weight: 700;
  color: var(--color-pure-white);
  border: none;
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &.is-primary-light {
    background-color: var(--color-brand-dark-800);
    box-shadow: var(--shadow-lg);

    &:hover {
      background-color: var(--color-brand-dark-900);
    }
  }

  &.is-primary-dark {
    background-color: var(--color-brand-dark-600);
    border: 1px solid var(--color-brand-dark-500);

    &:hover {
      background-color: var(--color-brand-dark-500);
    }
  }

  &.is-accent {
    background-color: var(--color-accent-500);
    box-shadow: var(--shadow-lg);

    &:hover {
      background-color: var(--color-accent-600);
    }
  }
}

.badge-row {
  display: flex;
  gap: var(--space-3);
}

.demo-badge {
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;

  &.is-highlight {
    background-color: var(--color-highlight-100);
    color: var(--color-highlight-800);
    border: 1px solid var(--color-highlight-200);
  }

  &.is-info {
    background-color: var(--color-brand-dark-50);
    color: var(--color-brand-dark-700);
    border: 1px solid var(--color-brand-dark-100);
  }

  &.is-live {
    background-color: rgb(56 80 10 / 0.3);
    color: var(--color-highlight-300);
    border: 1px solid var(--color-highlight-800);
  }
}
</style>
