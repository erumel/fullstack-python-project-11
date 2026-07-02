import i18next from './locales/index.js'

export default function initTexts() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = i18next.t(el.dataset.i18n)
  })
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = i18next.t(el.dataset.i18nPlaceholder)
  })
}
