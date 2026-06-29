import i18next from 'i18next'
import { ru } from './ru.js'

const i18nInstance = i18next.createInstance()

i18nInstance.init({
  lng: 'ru',
  resources: {
    ru,
  },
})

export default i18nInstance
