import axios from 'axios'
const baseUrl = '/api/bars'

const getBars = async (symbol, start) => {
  const response = await axios.get(`${ baseUrl }/${symbol}/${start}`)
  return response.data
}

const barService = { getBars }

export default barService