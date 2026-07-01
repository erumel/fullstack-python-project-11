import './style.css'
import init from './view.js'
import { validateURL } from './validation/validators.js'
import { state, status } from './state.js'

init()

const form = document.querySelector('form')
const input = document.getElementById('rss-input')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  state.form.isSubmitting = true

  validateURL(state.form.url).then(() => {
    state.form.isValid.value = true
    state.urls.push(state.form.url)
    state.form.url = null
  })
    .catch((error) => {
      status.error = error.message
      state.form.isValid.value = false
    })
})

input.addEventListener('input', (e) => {
  e.target.value = e.target.value.trim()
  state.form.url = e.target.value
  if (state.form.isValid.value === false) {
    status.error = null
    state.form.isValid.value = null
  }
})

input.addEventListener('blur', (e) => {
  if (state.form.isSubmitting) {
    state.form.isSubmitting = false
    return
  }
  if (e.target.value === '') {
    status.error = null
    state.form.isValid.value = null
  }
})
