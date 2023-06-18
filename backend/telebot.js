const telegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const moment = require('moment')

const { TELEGRAM_BOT_TOKEN } = require('./util/config')
const alpaca = require('./util/alpaca')

const loginURL = '/api/telegram/login'
const stocksURL = '/api/telegram/stocks'
const logoutURL = '/api/telegram/logout'

const proxy = {
  protocol: 'http',
  host: 'localhost',
  port: 3001,
}

const bot = new telegramBot(TELEGRAM_BOT_TOKEN, { polling: true })

// list of commands
bot.onText(/\/start/, (msg) => {
  // Handle the /start command
  const chat_id = msg.chat.id
  bot.sendMessage(chat_id, 'Hello there! I\'m a bot. What\'s up? Please refer to /help to see the list of available commands')
  console.log('Received /start command')
})

bot.onText(/\/help/, (msg) => {
  // Handle the /help command
  const chat_id = msg.chat.id
  bot.sendMessage(chat_id, '/start - Starts the bot\n/help - Provides the list of available commands\n/login - Login to your Laughing Stock account\n/getnews - Get stock news')
  console.log('Received /help command')
})

bot.onText(/\/login/, (msg) => {
  // Handle the /login command
  console.log('Received /login command')
  const chat_id = msg.chat.id
  bot.sendMessage(chat_id, 'Key in your username and password with a space between them. E.g "Example 12345"')
  
  bot.once('message', (nextMsg) => {
    // Retrieve the user input from the next message
    const userInput = nextMsg.text.trim()

    // Validate the user input format
    if (!validateInput(userInput)) {
      const errorMessage = 'Incorrect login credentials. Please /login again'
      bot.sendMessage(chat_id, errorMessage)
      return
    }
    const credentials_array = userInput.split(' ')
    const username = credentials_array[0]
    const password = credentials_array[1]
    const credentials = { username, password, id: nextMsg.from.id }
    handleLogin(credentials, chat_id)
  })
})

// checks with backend login credentials
const handleLogin = async (credentials, chat_id) => {
  try {
    const response = await axios.post(loginURL, credentials, { proxy })
    const user = response.data
    const message = `Welcome ${user.username}`
    bot.sendMessage(chat_id, message)
  } catch (error) {
    const errorMessage = 'Incorrect login credentials. Please /login again'
    bot.sendMessage(chat_id, errorMessage)
  }
}

bot.onText(/\/logout/, (msg) => {
  // Handle the /login command
  console.log('Received /logout command')
  const chat_id = msg.chat.id
  const tele_id = msg.from.id
  handleLogout(chat_id, tele_id)
})

// Validate the user input format for login
const validateInput = (input) => {
  const words = input.split(' ')
  return words.length === 2
}

const handleLogout = async (chat_id, tele_id) => {
  try {
    await axios.delete(`${logoutURL}/${tele_id}`, { proxy })
    const message = 'Logout successful'
    bot.sendMessage(chat_id, message)
  } catch (error) {
    const errorMessage = 'Logout failed'
    bot.sendMessage(chat_id, errorMessage)
  }
}

bot.onText(/\/getnews/, (msg) => {
  // Handle the /getnews command
  console.log('Received /getnews command')
  const chat_id = msg.chat.id
  const tele_id = msg.from.id
  getSymbolChange(chat_id, tele_id)
})

const getSymbolChange = async (chat_id, tele_id) => {
  try{
    const response = await axios.get(`${stocksURL}/${tele_id}`, { proxy })
    const stocks = response.data
    for (let i = 0; i < stocks.length; i += 1) {
      const symbol = stocks[i].symbol
      
      let bars = alpaca.getBarsV2(
        symbol,
        {
          start: moment().subtract(7, 'days').format(),
          end: moment().subtract(20, 'minutes').format(),
          timeframe: '1Day',
        },
        alpaca.configuration
      )
      const barset = []
      
      for await (let b of bars) {
        barset.push(b)
      }
      
      const week_open = barset[0].OpenPrice
      const week_close = barset.slice(-1)[0].ClosePrice
      const percent_change = ((week_close - week_open) / week_open) * 100
      bot.sendMessage(chat_id, `${symbol} moved ${percent_change.toFixed(3)}% over the last 7 days`)
    }
  }
  catch (error) {
    if (error.response.data.error === 'user not logged in') {
      bot.sendMessage(chat_id, 'Please login first at /login')
    } else {
      bot.sendMessage(chat_id, 'Unable to get symbol data changes')
    }
  } 
}

bot.on('message', (msg) => {
  // Handle incoming messages used for debugging
  // console.log(msg)
})