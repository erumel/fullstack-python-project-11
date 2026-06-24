import { subscribe } from 'valtio/vanilla'
import state from './state.js'

const form = document.querySelector('form')
const input = form.querySelector('#url-input')
const statusContainer = document.querySelector('.status-info')

const render = () => {
  if (state.form.valid === false) {
    input.classList.add('is-invalid')
    statusContainer.classList.remove('text-success')
    statusContainer.classList.add('text-danger')
    statusContainer.textContent = state.form.error
  }
  else if (state.form.valid === true) {
    input.classList.remove('is-invalid')
    statusContainer.classList.remove('text-danger')
    statusContainer.classList.add('text-success')
    statusContainer.textContent = state.form.success
    input.value = ''
    input.focus()
    state.form.url = ''
    state.form.valid = null
    state.form.error = null
  }
}

subscribe(state, render)

export const setFormUrl = (value) => {
  state.form.url = value
}

export const setFormValidation = (result) => {
  state.form.valid = result.valid
  state.form.error = result.errors?.[0] || null
  if (result.valid) {
    state.urls.push(state.form.url)
  }
}

export const getFormUrl = () => state.form.url
