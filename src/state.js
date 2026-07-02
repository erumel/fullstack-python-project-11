import { proxy } from 'valtio/vanilla'
import { nanoid } from 'nanoid'

const state = proxy({
  form: {
    error: null,
    status: null,
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
  const feed = { id: nanoid(), url, title, description }
  state.feeds.push(feed)
  return feed.id
}

export const addPosts = (feedId, items) => {
  items.forEach((item) => {
    state.posts.push({
      id: nanoid(),
      feedId,
      title: item.title,
      link: item.link,
      description: item.description || '',
    })
  })
}

export default state
