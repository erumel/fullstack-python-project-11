import './styles/main.css'
import './view.js'
import state from './state.js'
import { validateUrl } from './validate.js'
import initTexts from './initTexts.js'
import { fetchRSS } from './api.js'
import scheduleUpdate from './updater.js'

initTexts()

const form = document.getElementById('rss-form')
const input = document.getElementById('rss-input')

state.feeds.forEach(feed => scheduleUpdate(feed))

form.addEventListener('submit', (e) => {
  e.preventDefault()
  state.form.isSubmitting = true

  const url = input.value
  const existingUrls = state.feeds.map(feed => feed.url)

  validateUrl(url, existingUrls)
    .then(() => fetchRSS(url))
    .then((feedId) => {
      state.form.error = null
      state.form.status = 'success'
      form.reset()
      const feed = state.feeds.find(f => f.id === feedId)
      if (feed) scheduleUpdate(feed)
    })
    .catch((err) => {
      if (err.message === 'invalidRss') {
        state.form.error = 'invalidRss'
      }
      else if (err.isAxiosError) {
        state.form.error = 'network'
      }
      else {
        state.form.error = err.message
      }
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
