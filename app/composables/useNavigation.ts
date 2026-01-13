import type { NavigationMenuItem } from '@nuxt/ui'

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
  disabled?: boolean // Hatte gefehlt im Interface, aber wurde im Code genutzt
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
    {
      // NEU: Startseite Button
      label: t('nav.main.home', 'Startseite'), // Fallback, falls Key fehlt
      to: localePath('/'),
      icon: 'i-heroicons-home',
      // Wir markieren dies, um es im Header speziell zu behandeln (Desktop: nur Icon)
      isHome: true
    },
    {
      label: t('nav.main.club'),
      children: [
        { label: t('nav.sup.about'), to: localePath('about'), description: t('nav.sup.about_desc'), icon: 'i-heroicons-information-circle' },
        { label: t('nav.sup.board'), to: localePath('board'), description: t('nav.sup.board_desc'), icon: 'i-heroicons-users' },
        { label: t('nav.sup.sponsoring'), to: localePath('sponsoring'), description: t('nav.sup.sponsoring_desc'), icon: 'i-heroicons-currency-euro' }
      ]
    },
    {
      label: t('nav.main.sport'),
      children: [
        { label: t('nav.sup.teams'), to: localePath('teams'), description: t('nav.sup.teams_desc'), icon: 'i-heroicons-user-group' },
        { label: t('nav.main.training'), to: localePath('training'), description: t('nav.sup.training_desc'), icon: 'i-heroicons-academic-cap' }
      ]
    },
    {
      label: t('nav.main.contact'),
      to: localePath('contact')
    }
  ])

  // 2. Buttons
  const navButtons = computed<NavButton[]>(() => {
    // Array definieren
    const buttons: NavButton[] = [
      {
        label: t('nav.buttons.membership'),
        to: 'membership',
        color: 'primary',
        variant: 'solid'
      },
      {
        label: t('nav.buttons.login'),
        to: 'login',
        color: 'neutral',
        variant: 'ghost',
        hidden: true // Soll ausgeblendet werden
      }
    ]

    // FIX: Filtern der hidden Buttons
    return buttons.filter(btn => !btn.hidden)
  })

  // 3. Social Media
  const socialLinks = computed<SocialLink[]>(() => [
    { href: 'https://www.instagram.com/tc_hardt_1976', icon: 'i-simple-icons-instagram' },
    { href: 'https://www.facebook.com/TCHardt1976', icon: 'i-simple-icons-facebook' }
  ])

  // 4. Footer
  const footerLinks = computed<FooterLink[]>(() => [
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
