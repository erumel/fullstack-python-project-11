import { proxy } from 'valtio/vanilla'

const state = proxy({
  urls: [],
  form: {
    url: '',
    error: null,
    valid: null,
    success: 'RSS успешно загружен',
  },
})

export default state
