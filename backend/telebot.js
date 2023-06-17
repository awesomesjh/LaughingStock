const moment = require('moment');
const axios = require('axios')
const loginURL = "http://localhost:3001/api/login"
const stockURL = "http://localhost:3001/api/stocks"
const alpacaURL = "https://data.alpaca.markets/v1"
const telegramBot = require('node-telegram-bot-api')

// get environment variables
require('dotenv').config()
const TOKEN = process.env.TELE_API
const APCA_API_KEY_ID = process.env.API_KEY
const APCA_API_SECRET_KEY = process.env.API_SECRET

const Alpaca = require("@alpacahq/alpaca-trade-api")
const alpaca = new Alpaca({
  keyId: APCA_API_KEY_ID,
  secretKey: APCA_API_SECRET_KEY 
})

// will be null when the user is not logged in
var DATA = null

const bot = new telegramBot(TOKEN, { polling: true })

// list of commands
bot.onText(/\/start/, (msg) => {
  // Handle the /start command
  const chat_id = msg.chat.id
  bot.sendMessage(chat_id, 'Hello there! I\'m a bot. What\'s up? Please refer to /help to see the list of available commands')
  console.log('Received /start command');
});

bot.onText(/\/help/, (msg) => {
  // Handle the /help command
  const chat_id = msg.chat.id
  bot.sendMessage(chat_id, "/start - Starts the bot\n/help - Provides the list of available commands\n/login - Logins to your laughing stocks account\n/getnews - Gets stock news")
  console.log('Received /help command');
});

bot.onText(/\/login/, (msg) => {
  // Handle the /login command
  console.log('Received /login command');
  const chat_id = msg.chat.id
  if (DATA === null) {
    bot.sendMessage(chat_id, 'Key in your username and password with a space between them. E.g "Example 12345')
    
    bot.once('message', (nextMsg) => {
      // Retrieve the user input from the next message
      const userInput = nextMsg.text.trim();

      // Validate the user input format
      if (!validateInput(userInput)) {
        const errorMessage = 'Incorrect login credentials were keyed in. Please /login again';
        bot.sendMessage(chat_id, errorMessage);
        return;
      }
      const credentials_array = userInput.split(" ");
      const username = credentials_array[0]
      const password = credentials_array[1]
      handleLogin(username, password, chat_id)
    })
  }
  else {
    bot.sendMessage(chat_id, 'You have already logged in')
  }
});

bot.onText(/\/getnews/, (msg) => {
  // Handle the /getnews command
  console.log('Received /getnews command');
  const chat_id = msg.chat.id
  if (DATA === null) {
    bot.sendMessage(chat_id, 'Please login first at /login')
  }
  else {
    getSymbolChange(chat_id)
  }
});

bot.on('message', (msg) => {
  // Handle incoming messages
  // console.log(msg);
});

// Validate the user input format for login
function validateInput(input) {
  const words = input.split(' ');
  return words.length === 2;
}

// checks with backend login credentials
const handleLogin = async (username, password, chat_id) => {
  credentials = { username, password }
  try {
    const login_response = await axios.post(loginURL, credentials)
    const user = login_response.data
    const token = `Bearer ${user.token}`
    let config = {
      headers: { Authorization: token },
    }
    fetchStocks(config, chat_id, username)
  }
  catch (error) {
    const errorMessage = 'Incorrect login credentials were keyed in. Please /login again';
    bot.sendMessage(chat_id, errorMessage);
  }
}

const fetchStocks = async (config, chat_id, username) => {
  try {
    const data_response = await axios.get(stockURL, config)
    const data = data_response.data
    data.pop()
    DATA = data
    const message = `Welcome ${username}`
    bot.sendMessage(chat_id, message)
  }
  catch (error) {
    const errorMessage = 'Incorrect login credentials were keyed in. Please /login again';
    bot.sendMessage(chat_id, errorMessage);
  }
}

async function getSymbolChange(chat_id){
  for (let i = 0; i < DATA.length; i += 1) {
    const symbol = DATA[i].symbol

    let bars = alpaca.getBarsV2(
      symbol,
      {
        start: moment().subtract(7, "days").format(),
        end: moment().subtract(20, "minutes").format(),
        timeframe: "1Day",
      },
      alpaca.configuration
    );
    const barset = [];
    
    for await (let b of bars) {
      barset.push(b);
    }
    
    const week_open = barset[0].OpenPrice;
    const week_close = barset.slice(-1)[0].ClosePrice;
    const percent_change = ((week_close - week_open) / week_open) * 100;
    bot.sendMessage(chat_id, `${symbol} moved ${percent_change.toFixed(3)}% over the last 7 days`);
  }
}