import * as yup from 'yup'

const schema = yup.string()
  .required('Не должно быть пустым')
  .url('Ссылка должна быть валидным URL')

export const validate = (url, urls) => {
  return schema.validate(url)
    .then(() => {
      if (urls.includes(url)) {
        return { valid: false, errors: ['RSS уже существует'] }
      }
      return { valid: true }
    })
    .catch((err) => {
      return { valid: false, errors: err.errors }
    })
}
