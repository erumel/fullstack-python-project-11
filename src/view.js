import i18nInstance from './locales/index.js'
import { kebabCase } from 'lodash'
import { state, status } from './state.js'
import { subscribe } from 'valtio/vanilla'

function initHeader() {
  const header = document.querySelector('header')
  const bundle = i18nInstance.getResourceBundle(i18nInstance.language, 'translation')

  Object.keys(bundle.header).forEach((key) => {
    const el = header.querySelector(`#${kebabCase(key)}`)
    if (!el) return
    const text = i18nInstance.t(`header.${key}`)
    if (el.tagName === 'INPUT') {
      el.placeholder = text
      el.focus()
    }
    else {
      el.textContent = text || ''
    }
  })
}

function updateStatus() {
  const pStatus = document.getElementById('status')
  const input = document.getElementById('rss-input')

  switch (state.form.isValid.value) {
    case true:
      input.classList.remove('is-invalid')
      input.value = ''
      pStatus.textContent = status.success
      pStatus.className = 'mb-2 text-success'
      input.focus()
      break
    case false:
      pStatus.textContent = status.error
      pStatus.className = 'mb-2 text-danger'
      input.classList.add('is-invalid')
      input.focus()
      break
    default:
      input.classList.remove('is-invalid')
      pStatus.textContent = null
      pStatus.className = 'mb-2'
  }
}

subscribe(state.form.isValid, updateStatus)

export default function init() {
  initHeader()
}
