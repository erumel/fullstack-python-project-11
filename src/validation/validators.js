import { createSchema } from './schema.js'
import { state } from '../state.js'

const schema = createSchema()

export function validateURL(url) {
  return schema.validate(url, {
    abortEarly: true,
    context: { existingUrls: state.urls },
  })
}
