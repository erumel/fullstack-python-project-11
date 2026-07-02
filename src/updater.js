import { fetchNewPosts } from './api.js'
import state from './state.js'

const UPDATE_INTERVAL = 5000
const scheduledFeeds = new Set()

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
          scheduledFeeds.delete(feed.id)
        }
      })
  }, UPDATE_INTERVAL)
}

const scheduleUpdate = (feed) => {
  if (scheduledFeeds.has(feed.id)) return
  scheduledFeeds.add(feed.id)
  pollFeed(feed)
}

export default scheduleUpdate
