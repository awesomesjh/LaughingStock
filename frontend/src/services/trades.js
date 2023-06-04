import axios from 'axios'
const baseUrl = '/api/trades'

const getLatestTrade = async symbol => {
  const response = await axios.get(`${ baseUrl }/getLatestTrade/${symbol}`)
  return response.data
}

const getLatestTrades = async symbols => {
  const response = await axios.get(`${ baseUrl }/getLatestTrades/${symbols.join(',')}`)
  return response.data
}

const tradeService = { getLatestTrade, getLatestTrades }

export default tradeService