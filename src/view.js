import { subscribe } from 'valtio/vanilla'
import state from './state.js'
import i18next from './locales/index.js'

const input = document.getElementById('rss-input')
const status = document.getElementById('status')
const button = document.getElementById('rss-submit-btn')

subscribe(state.form, () => {
  const { error, status: formStatus, isSubmitting } = state.form

  if (error) {
    input.classList.add('is-invalid')
    input.classList.remove('is-valid')
    status.textContent = i18next.t(`errors.${error}`)
    status.classList.add('text-danger')
    status.classList.remove('text-success')
  }
  else if (formStatus === 'success') {
    input.classList.remove('is-invalid')
    input.classList.add('is-valid')
    status.textContent = i18next.t('success')
    status.classList.add('text-success')
    status.classList.remove('text-danger')
  }
  else {
    input.classList.remove('is-invalid', 'is-valid')
    status.textContent = ''
    status.classList.remove('text-danger', 'text-success')
  }

  button.disabled = isSubmitting
})
