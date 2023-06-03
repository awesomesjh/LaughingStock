import axios from 'axios'
const baseUrl = '/api/trades'

const getLatestTrades = async symbols => {
  const response = await axios.post(baseUrl, symbols)
  return response.data
}

const tradeService = { getLatestTrades }

export default tradeService