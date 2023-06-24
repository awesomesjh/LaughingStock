import axios from 'axios'
const baseUrl = '/api/stocks'

let token = null

let config = {
  headers: { Authorization: token },
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config.headers.Authorization = token
}

const clearToken = () => {
  token = null
  config.headers.Authorization = token
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

const getPastStocks = async () => {
  const response = await axios.get('/api/paststocks', config)
  return response.data
}

const stockService = { getAll, create, update, remove, setToken, clearToken, getPastStocks }

export default stockService