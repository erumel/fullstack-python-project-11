import i18next from './locales/index.js'

export default () => {
  document.querySelector('h1').textContent = i18next.t('title')
  document.querySelector('header p').textContent = i18next.t('tagline')
  document.querySelector('label').textContent = i18next.t('label')
  document.getElementById('rss-input').placeholder = i18next.t('placeholder')
  document.getElementById('rss-submit-btn').textContent = i18next.t('button')
  document.querySelector('small').textContent = i18next.t('example')
  document.querySelectorAll('h4')[0].textContent = i18next.t('posts')
  document.querySelectorAll('h4')[1].textContent = i18next.t('feeds')
}
