import axios from 'axios'
import state, { addFeed, addPosts } from './state.js'

const PROXY_URL = 'https://allorigins.hexlet.app/get?disableCache=true&url='

const parseRSS = (xmlString) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlString, 'application/xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error('invalidRss')
  }

  const channel = doc.querySelector('channel')
  if (!channel) {
    throw new Error('invalidRss')
  }

  const title = channel.querySelector('title')?.textContent || ''
  const description = channel.querySelector('description')?.textContent || ''

  const items = [...channel.querySelectorAll('item')].map(item => ({
    title: item.querySelector('title')?.textContent || '',
    link: item.querySelector('link')?.textContent || '',
    description: item.querySelector('description')?.textContent || '',
  }))

  return { title, description, items }
}

export const fetchRSS = (url) => {
  return axios.get(`${PROXY_URL}${encodeURIComponent(url)}`)
    .then(response => parseRSS(response.data.contents))
    .then(({ title, description, items }) => {
      const feedId = addFeed(url, title, description)
      addPosts(feedId, items)
      return feedId
    })
}

export const fetchNewPosts = (feed) => {
  return axios.get(`${PROXY_URL}${encodeURIComponent(feed.url)}`)
    .then(response => parseRSS(response.data.contents))
    .then(({ items }) => {
      const existingLinks = new Set(
        state.posts
          .filter(p => p.feedId === feed.id)
          .map(p => p.link),
      )
      const newItems = items.filter(item => !existingLinks.has(item.link))
      if (newItems.length > 0) {
        addPosts(feed.id, newItems)
      }
    })
}
