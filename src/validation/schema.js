import * as yup from 'yup'
import i18nInstance from '../locales/index.js'

export function createSchema() {
  const bundle = i18nInstance.getResourceBundle(i18nInstance.language, 'translation')
  const errors = bundle.status.errors

  return yup
    .string()
    .required(errors.required)
    .url(errors.invalidUrl)
    .test('isDuplicate', errors.duplicate, function (url) {
      const { existingUrls } = this.options.context || {}
      if (!existingUrls || !url) return true
      return !existingUrls.includes(url)
    })
}
