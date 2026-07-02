import { fetchNewPosts } from './api.js'
import state from './state.js'

const UPDATE_INTERVAL = 5000

const scheduleUpdate = (feed) => {
  if (state.ui.scheduledFeeds.has(feed.id)) return
  state.ui.scheduledFeeds.add(feed.id)

  const update = () => {
    setTimeout(() => {
      fetchNewPosts(feed)
        .catch(() => {})
        .finally(() => {
          const feedExist = state.feeds.some(f => f.id === feed.id)
          if (feedExist) {
            update()
          }
          else {
            state.ui.scheduledFeeds.delete(feed.id)
          }
        })
    }, UPDATE_INTERVAL)
  }

  update()
}

export default scheduleUpdate
