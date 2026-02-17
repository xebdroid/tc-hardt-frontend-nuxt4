import type { NavigationMenuItem } from '@nuxt/ui'

// Erweiterung des Typs für unsere Custom-Logik
export interface CustomNavigationMenuItem extends NavigationMenuItem {
  isHome?: boolean
  hidden?: boolean
  noDesktopIcon?: boolean
}

// Button Typen für Nuxt UI v3
type ButtonColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'link' | 'subtle'

export interface NavButton {
  label: string
  to: string
  color?: ButtonColor
  variant?: ButtonVariant
  target?: string
  icon?: string
  hidden?: boolean
  disabled?: boolean
}

interface SocialLink {
  href: string
  icon: string
  label?: string
}

interface FooterLink {
  label: string
  to: string
  target?: string
}

export const useNavigation = () => {
  const { t } = useI18n()
  const localePath = useLocalePath()

  // 1. Hauptmenü
  const headerMenu = computed<CustomNavigationMenuItem[]>(() => [
    {
      label: t('nav.main.home'),
      to: localePath('/'),
      icon: 'i-heroicons-home',
      isHome: true
    },
    {
      label: t('nav.main.club'),
      icon: 'i-heroicons-building-library',
      noDesktopIcon: true,
      children: [
        {
          label: t('nav.sup.jubilee'),
          to: localePath('jubilee'),
          description: t('nav.sup.jubilee_desc'),
          icon: 'i-heroicons-sparkles',
          class: `
            text-accent-500
            hover:text-accent-300
            [&_[data-slot=childLinkDescription]]:text-accent-500
            [&_[data-slot=childLinkDescription]]:group-hover:text-accent-300
            [&_[data-slot=childLinkIcon]]:text-accent-500
            [&_[data-slot=childLinkIcon]]:group-hover:text-accent-300
          `
        },
        {
          label: t('nav.sup.facility'),
          to: localePath('facility'),
          description: t('nav.sup.facility_desc'),
          icon: 'i-heroicons-map'
        },
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
      icon: 'i-heroicons-trophy',
      noDesktopIcon: true,
      children: [
        { label: t('nav.sup.teams'), to: localePath('teams'), description: t('nav.sup.teams_desc'), icon: 'i-heroicons-user-group' },
        { label: t('nav.main.training'), to: localePath('training'), description: t('nav.sup.training_desc'), icon: 'i-heroicons-academic-cap' }
      ]
    },
    {
      label: t('nav.main.contact'),
      to: localePath('contact'),
      icon: 'i-heroicons-envelope',
      noDesktopIcon: true
    }
  ])

  // 2. Buttons
  const navButtons = computed<NavButton[]>(() => {
    const buttons: NavButton[] = [
      {
        label: t('nav.buttons.membership'),
        to: localePath('membership'),
        color: 'primary',
        variant: 'solid'
      },
      {
        label: t('nav.buttons.login'),
        to: localePath('login'),
        color: 'neutral',
        variant: 'ghost',
        hidden: true
      }
    ]
    return buttons.filter(btn => !btn.hidden)
  })

  // 3. Social Media
  const socialLinks = computed<SocialLink[]>(() => [
    { href: 'https://www.instagram.com/tc_hardt_1976', icon: 'i-simple-icons-instagram' },
    { href: 'https://www.facebook.com/TCHardt1976', icon: 'i-simple-icons-facebook' }
  ])

  // 4. Footer
  const footerLinks = computed<FooterLink[]>(() => [
    { label: t('nav.sup.statutes'), to: '/downloads/satzung-tc-hardt_stand_28_04_2025.pdf', target: '_blank' },
    { label: t('nav.sup.imprint'), to: localePath('imprint') },
    { label: t('nav.sup.privacy'), to: localePath('privacy') }
  ])

  return {
    headerMenu,
    navButtons,
    socialLinks,
    footerLinks
  }
}
