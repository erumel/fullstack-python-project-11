import './styles/main.css'
import './view.js'
import state from './state.js'
import { validateUrl } from './validate.js'
import initTexts from './initTexts.js'

initTexts()

const form = document.getElementById('rss-form')
const input = document.getElementById('rss-input')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  state.form.isSubmitting = true

  const url = input.value
  const existingUrls = state.feeds.map(feed => feed.url)

  validateUrl(url, existingUrls)
    .then(() => {
      state.form.error = null
      state.form.status = 'success'
      state.feeds.push({ url: url })
      form.reset()
    })
    .catch((err) => {
      state.form.error = err.message
      state.form.status = null
    })
    .finally(() => {
      input.focus()
      state.form.isSubmitting = false
    })
})

input.addEventListener('input', () => {
  input.value = input.value.replace(/\s/g, '')
  if (state.form.error || state.form.status) {
    state.form.error = null
    state.form.status = null
  }
})

input.addEventListener('blur', (e) => {
  if (input.value === '' && e.relatedTarget?.closest('#rss-form')) {
    return
  }
  if (input.value === '') {
    state.form.error = null
  }
})
