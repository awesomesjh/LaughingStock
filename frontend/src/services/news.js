import axios from 'axios'
const baseUrl = '/api/news'

const getNews = async symbols => {
  const response = await axios.get(`${ baseUrl }/${symbols.join(',')}`)
  return response.data
}

const newsService = { getNews }

export default newsService