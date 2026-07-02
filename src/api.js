import axios from 'axios'
import { addFeed, addPosts } from './state.js'

const PROXY_URL = 'https://allorigins.hexlet.app/get?disableCache=true&url='

const parseRSS = (xmlString) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlString, 'application/xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error('invalidRss')
  }

  const channel = doc.querySelector('channel')
  const title = channel.querySelector('title').textContent
  const description = channel.querySelector('description').textContent

  const items = [...channel.querySelectorAll('item')].map(item => ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
  }))

  return { title, description, items }
}

export const fetchRSS = (url) => {
  return axios.get(`${PROXY_URL}${encodeURIComponent(url)}`)
    .then(response => parseRSS(response.data.contents))
    .then(({ title, description, items }) => {
      const feedId = addFeed(url, title, description)
      addPosts(feedId, items)
    })
}
