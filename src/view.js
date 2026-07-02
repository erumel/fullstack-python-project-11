import { subscribe } from 'valtio/vanilla'
import state from './state.js'
import i18next from './locales/index.js'

const input = document.getElementById('rss-input')
const status = document.getElementById('status')
const button = document.getElementById('rss-submit-btn')
const feedsContainer = document.getElementById('feeds-container')
const postsContainer = document.getElementById('posts-container')

const renderFeeds = () => {
  feedsContainer.innerHTML = ''
  state.feeds.forEach((feed) => {
    const card = document.createElement('div')
    card.className = 'card mb-2 border-0'
    card.innerHTML = `
      <div class="card-body px-0">
        <h5 class="card-title">${feed.title}</h5>
        <p class="card-text">${feed.description}</p>
      </div>
    `
    feedsContainer.appendChild(card)
  })
}

const renderPosts = () => {
  postsContainer.innerHTML = ''
  state.posts.forEach((post) => {
    const item = document.createElement('div')
    item.className = 'd-flex justify-content-between align-items-start mb-1'

    item.innerHTML = `
      <a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a>
      <button class="btn btn-outline-primary btn-sm ms-3 flex-shrink-0" data-post-id="${post.id}">${i18next.t('actions.view')}</button>
    `
    postsContainer.appendChild(item)
  })
}

subscribe(state.form, () => {
  const { error, status: formStatus, isSubmitting } = state.form

  if (error) {
    input.classList.add('is-invalid')
    input.classList.remove('is-valid')
    status.textContent = i18next.t(`errors.${error}`)
    status.classList.add('text-danger')
    status.classList.remove('text-success')
  }
  else if (formStatus === 'success') {
    input.classList.remove('is-invalid')
    input.classList.add('is-valid')
    status.textContent = i18next.t('status.success')
    status.classList.add('text-success')
    status.classList.remove('text-danger')
  }
  else {
    input.classList.remove('is-invalid', 'is-valid')
    status.textContent = ''
    status.classList.remove('text-danger', 'text-success')
  }

  button.disabled = isSubmitting
})

subscribe(state.feeds, renderFeeds)

subscribe(state.posts, renderPosts)
