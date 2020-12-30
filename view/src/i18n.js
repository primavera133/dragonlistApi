import { i18n } from '@lingui/core'
import { en, sv } from 'make-plural/plurals'
import { detect, fromUrl, fromStorage, fromNavigator } from '@lingui/detect-locale'

export const locales = {
  en: 'English',
  sv: 'Svenska',
}
export const defaultLocale = 'sv'

i18n.loadLocaleData({
  en: { plurals: en },
  sv: { plurals: sv },
})

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale) {
  const { messages } = await import(`./locales/${locale}/messages`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

export function detectLanguage() {
  const DEFAULT_FALLBACK = () => 'en'
  return detect(fromStorage('lang'), DEFAULT_FALLBACK)
}
