import { proxy } from 'valtio/vanilla'

export default proxy({
  form: {
    error: null, // null | 'empty' | 'invalid' | 'duplicate' | 'network'
    status: null, // null | 'success'
    isSubmitting: false,
  },
  feeds: [],
})
