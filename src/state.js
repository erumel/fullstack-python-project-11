import { proxy } from 'valtio/vanilla'

const generateId = () => Math.random().toString(36).substring(2, 10) + Date.now().toString(36)

const state = proxy({
  form: {
    error: null, // null | 'empty' | 'invalid' | 'duplicate' | 'network'
    status: null, // null | 'success'
    isSubmitting: false,
  },
  feeds: [],
  posts: [],
  ui: {
    readPosts: new Set(),
    modalPostId: null,
    scheduledFeeds: new Set(),
  },
})

export const addFeed = (url, title, description) => {
  const feed = { id: generateId(), url, title, description }
  state.feeds.push(feed)
  return feed.id
}

export const addPosts = (feedId, items) => {
  items.forEach((item) => {
    state.posts.push({
      id: generateId(),
      feedId,
      title: item.title,
      link: item.link,
      description: item.description || '',
    })
  })
}

export default state
