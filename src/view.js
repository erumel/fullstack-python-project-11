import { subscribe } from 'valtio/vanilla'
import { Modal } from 'bootstrap'
import state from './state.js'
import i18next from './locales/index.js'

const input = document.getElementById('rss-input')
const status = document.getElementById('status')
const button = document.getElementById('rss-submit-btn')
const feedsContainer = document.getElementById('feeds-container')
const postsContainer = document.getElementById('posts-container')
const modal = document.getElementById('post-modal')
const modalTitle = document.getElementById('modal-title')
const modalDescription = document.getElementById('modal-description')
const modalLink = document.getElementById('modal-link')

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
  const list = document.createElement('ul')
  list.className = 'list-unstyled mb-0'

  state.posts.forEach((post) => {
    const isRead = state.ui.readPosts.has(post.id)
    const item = document.createElement('li')
    item.className = 'd-flex justify-content-between align-items-start mb-1'

    item.innerHTML = `
      <a href="${post.link}" 
         target="_blank" 
         rel="noopener noreferrer"
         class="${isRead ? 'fw-normal' : 'fw-bold'}">
        ${post.title}
      </a>
      <button class="btn btn-outline-primary btn-sm ms-3 flex-shrink-0" 
              data-post-id="${post.id}"
              data-action="preview">
        ${i18next.t('actions.view')}
      </button>
    `
    list.appendChild(item)
  })

  postsContainer.appendChild(list)
}

const renderModal = () => {
  const postId = state.ui.modalPostId
  if (postId === null) return

  const post = state.posts.find(p => p.id === postId)
  if (!post) return

  modalTitle.textContent = post.title
  modalDescription.innerHTML = post.description || ''
  modalDescription.querySelectorAll('img').forEach((img) => {
    img.classList.add('img-fluid', 'd-block', 'mx-auto', 'mb-2')
  })
  modalDescription.style.textAlign = 'justify'
  modalLink.href = post.link

  const bsModal = new Modal(modal)
  bsModal.show()
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
subscribe(state.ui, () => {
  renderPosts()
  if (state.ui.modalPostId !== null) renderModal()
})

postsContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="preview"]')
  if (!btn) return

  const postId = btn.dataset.postId
  state.ui.readPosts.add(postId)
  state.ui.modalPostId = postId
})

modal.addEventListener('hidden.bs.modal', () => {
  state.ui.modalPostId = null
})
