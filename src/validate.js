import * as yup from 'yup'

export const validateUrl = (url, existingUrls) => {
  const schema = yup.string()
    .required('empty')
    .url('invalid')
    .notOneOf(existingUrls, 'duplicate')

  return schema.validate(url)
}
