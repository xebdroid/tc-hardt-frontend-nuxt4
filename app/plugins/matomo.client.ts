// app/plugins/matomo.client.ts
import { defineNuxtPlugin } from '#app'
import { watch, nextTick } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  const consentStore = useConsentStore()
  const router = useRouter()

  const _paq = (window as any)._paq = (window as any)._paq || [];

  _paq.push(['requireCookieConsent']);

  if (consentStore.isAnalyticsAllowed) {
    _paq.push(['setCookieConsentGiven']);
  }

  _paq.push(['setTrackerUrl', 'https://v0id.de/matomo/matomo.php']);
  _paq.push(['setSiteId', '1']);
  _paq.push(['enableLinkTracking']);

  // Initialer Seitenaufruf
  _paq.push(['trackPageView']);

  ;(function() {
    const u = "https://v0id.de/matomo/";
    const d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.async = true; g.src = u + 'matomo.js';
    if (s && s.parentNode) {
      s.parentNode.insertBefore(g, s);
    } else {
      document.head.appendChild(g);
    }
  })();

// Optimiertes SPA-Tracking
  router.afterEach((to, from) => {
    if (to.path === from.path && to.hash !== from.hash) return;

    nextTick(() => {
      setTimeout(() => {
        _paq.push(['setCustomUrl', window.location.origin + to.fullPath]);
        _paq.push(['setDocumentTitle', document.title]);
        _paq.push(['trackPageView']);

        // NEU: Matomo anweisen, die neu geladene Seite nach PDF-Links abzusuchen!
        _paq.push(['enableLinkTracking']);

      }, 100)
    })
  })

  watch(
    () => consentStore.isAnalyticsAllowed,
    (isAllowed: boolean) => {
      if (isAllowed) {
        _paq.push(['setCookieConsentGiven']);
      } else {
        _paq.push(['forgetCookieConsentGiven']);
      }
    }
  )
})
