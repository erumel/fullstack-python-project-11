import { proxy } from 'valtio/vanilla'

const state = proxy({
  form: {
    error: null, // null | 'empty' | 'invalid' | 'duplicate' | 'network'
    status: null, // null | 'success'
    isSubmitting: false,
  },
  feeds: [],
  posts: [],
})

export const addFeed = (url, title, description) => {
  const feed = { id: crypto.randomUUID(), url, title, description }
  state.feeds.push(feed)
  return feed.id
}

export const addPosts = (feedId, items) => {
  items.forEach((item) => {
    state.posts.push({
      id: crypto.randomUUID(),
      feedId,
      title: item.title,
      link: item.link,
    })
  })
}

export default state
