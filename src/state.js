import { proxy } from 'valtio/vanilla'
import i18nInstance from './locales/index.js'

const bundle = i18nInstance.getResourceBundle(i18nInstance.language, 'translation')

export const state = proxy({
  form: {
    url: null,
    isSubmitting: false,
    isValid: {
      value: null,
    },
  },
  urls: [],
})
export const status = proxy({
  success: bundle.status.success,
  error: null,
})
