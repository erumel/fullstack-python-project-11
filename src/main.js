import './style.css'
import { validate } from './validate.js'
import { setFormUrl, setFormValidation } from './view.js'
import state from './state.js'

const form = document.querySelector('form')
const input = form.querySelector('#url-input')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const url = input.value.trim()
  setFormUrl(url)

  validate(url, state.urls).then((result) => {
    setFormValidation(result)
  })
})
