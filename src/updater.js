import { fetchNewPosts } from './api.js'
import state from './state.js'

const UPDATE_INTERVAL = 5000
const scheduledFeeds = new Set()

const scheduleUpdate = (feed) => {
  if (scheduledFeeds.has(feed.id)) return
  scheduledFeeds.add(feed.id)

  const update = () => {
    setTimeout(() => {
      fetchNewPosts(feed)
        .catch(() => {})
        .finally(() => {
          if (state.feeds.some(f => f.id === feed.id)) {
            update()
          }
          else {
            scheduledFeeds.delete(feed.id)
          }
        })
    }, UPDATE_INTERVAL)
  }

  update()
}

export default scheduleUpdate
