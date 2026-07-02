import { fetchNewPosts } from './api.js'
import state from './state.js'

const UPDATE_INTERVAL = 5000

const pollFeed = (feed) => {
  setTimeout(() => {
    fetchNewPosts(feed)
      .catch(() => {})
      .finally(() => {
        const feedExists = state.feeds.some(f => f.id === feed.id)
        if (feedExists) {
          pollFeed(feed)
        }
        else {
          state.ui.scheduledFeeds.delete(feed.id)
        }
      })
  }, UPDATE_INTERVAL)
}

const scheduleUpdate = (feed) => {
  if (state.ui.scheduledFeeds.has(feed.id)) return
  state.ui.scheduledFeeds.add(feed.id)
  pollFeed(feed)
}

export default scheduleUpdate
