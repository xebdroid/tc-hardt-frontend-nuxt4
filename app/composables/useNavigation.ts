import type { NavigationMenuItem } from '@nuxt/ui'

// ... deine Typen (ButtonColor, NavButton etc.) bleiben gleich ...
type ButtonColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'gray' | 'white' | 'black' | 'transparent' | 'neutral'
type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'link' | 'subtle'

interface NavButton {
  label: string
  to: string
  color?: ButtonColor
  variant?: ButtonVariant
  target?: string
  icon?: string
  disabled?: boolean
}

interface I18nRawItem {
  label: string
  disabled?: boolean
  [key: string]: unknown
}

interface SocialLink {
  href: string
  icon: string
  label?: string
}

interface FooterLink {
  label: string
  to: string
}

export const useNavigation = () => {
  const { t, tm, rt } = useI18n()
  const localePath = useLocalePath()

  // 1. Hauptmenü
  const headerMenu = computed<NavigationMenuItem[]>(() => [
     // ... dein existierender Code ...
    {
      label: t('nav.main.club'),
      // icon: 'i-heroicons-building-library',
      children: [
        {
          label: t('nav.sup.about'),
          to: localePath('about'),
          description: t('nav.sup.about_desc'),
          icon: 'i-heroicons-information-circle'
        },
        {
          label: t('nav.sup.board'),
          to: localePath('board'),
          description: t('nav.sup.board_desc'),
          icon: 'i-heroicons-users'
        },
        {
          label: t('nav.sup.sponsoring'),
          to: localePath('sponsoring'),
          description: t('nav.sup.sponsoring_desc'),
          icon: 'i-heroicons-currency-euro'
        }
      ]
    },
    {
      label: t('nav.main.sport'),
      // icon: 'i-heroicons-trophy',
      children: [
        {
          label: t('nav.sup.teams'),
          to: localePath('teams'),
          description: t('nav.sup.teams_desc'),
          icon: 'i-heroicons-user-group'
        },
        {
          label: t('nav.main.training'),
          to: localePath('training'),
          description: t('nav.sup.training_desc'),
          icon: 'i-heroicons-academic-cap'
        }
      ]
    },
    {
      label: t('nav.main.contact'),
      // icon: 'i-heroicons-envelope',
      to: localePath('contact')
    }
  ])

const navButtons = computed<NavButton[]>(() => {
    const data = tm('nav.buttons') as unknown
    if (!Array.isArray(data)) return []

    return data
      .map((item) => {
        return {
          label: rt(item.label),
          to: item.to ? rt(item.to) : undefined,
          color: item.color,
          variant: item.variant,
          target: item.target ? rt(item.target) : undefined,
          disabled: item.disabled === true
        } as NavButton
      })
      .filter(btn => !btn.disabled)
  })

const socialLinks = computed<SocialLink[]>(() => {
    const data = tm('nav.topbar.socialmedia') as unknown

    if (!Array.isArray(data)) return []

    return data.map((item) => {
      return {
        label: item.label ? rt(item.label) : undefined,
        href: rt(item.href),
        icon: rt(item.icon)
      } as SocialLink
    })
  })

  const addressInfo = computed(() => ({
    label: t('nav.topbar.address.label'),
    href: t('nav.topbar.address.href')
  }))

  const contactInfo = computed(() => ({
    email: t('nav.topbar.email'),
    mailto: `mailto:${t('nav.topbar.email')}`
  }))

  // NEU: Footer Links zentral definiert
  const footerLinks = computed<FooterLink[]>(() => [
    {
      label: t('nav.sup.imprint'), // Nutzt "Impressum" aus deiner JSON
      to: localePath('imprint')    // Leitet auf /impressum (oder localized)
    },
    {
      label: t('nav.sup.privacy'), // Nutzt "Datenschutz" aus deiner JSON
      to: localePath('privacy')
    }
  ])

  return {
    headerMenu,
    navButtons,
    socialLinks,
    addressInfo,
    contactInfo,
    footerLinks
  }
}
