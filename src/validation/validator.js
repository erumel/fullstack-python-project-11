import { createSchema } from './schema.js'
import { state } from '../state.js'

export function validate() {
  const schema = createSchema()

  return schema.validate(state.form.url, {
    abortEarly: true,
    context: { existingUrls: state.urls },
  })
}
