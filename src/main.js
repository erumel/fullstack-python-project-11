import './style.css'
import init from './view.js'
import { validate } from './validation/validator.js'
import { state, status } from './state.js'

init()

const form = document.querySelector('form')
const input = document.querySelector('#rss-input')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  validate().then(() => {
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
    state.error = null
    state.form.isValid.value = null
  }
})
