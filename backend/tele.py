# pip install python-telegram-bot
import requests
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from telegram import Update
from typing import Final
import os
from dotenv import find_dotenv, load_dotenv
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)
LOGGING_IN = False
# TELE_API contains the token
TELE_API = os.getenv("TELE_API")
TOKEN: Final = TELE_API
BOT_USERNAME: Final = '@laughing_stock_bot'
URL = "http://localhost:3001/api/login"

print('Starting up bot...')

# Lets us use the /start command

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('Hello there! I\'m a bot. What\'s up? Please refer to /help to see the list of available commands')


# Lets us use the /help command
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # await update.message.reply_text('Try typing anything and I will do my best to respond!')
    await update.message.reply_text(
        "/start - Starts the bot\n/help - Provides the list of available commands\n/login - Logins to your laughing stocks account\n/getnews - Gets stock news"
    )


async def login_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    global LOGGING_IN
    LOGGING_IN = True
    await update.message.reply_text('Key in your username and password with a space between them. E.g "Example 12345')


def handle_response(text: str) -> str:
    # response logic (honestly just here for fun)
    processed: str = text.lower()

    if 'hello' in processed:
        return 'Hey there!'

    if 'how are you' in processed:
        return 'I\'m good!'

    if 'banana' in processed:
        return 'I\'m a banana!'

    return 'I don\'t understand'


def handle_login(text: str) -> str:
    # Login response logic
    global LOGGING_IN
    try:
        processed = text.split()
        username = processed[0]
        password = processed[1]
        credentials = {
            "username": username,
            "password": password
        }
        response = requests.post(URL, json=credentials)
        print(type(response))
        # if the request was successful
        if response.status_code == 200:
            # token = None
            # config = {
            #     "headers": {'Authorization': token},
            # }
            # user = requests.get(URL, params=config)
            # print(user)
            return 'Welcome User'
        LOGGING_IN = False
        return 'Incorrect login credentials were keyed in. Please /login again'

    except:
        LOGGING_IN = False
        return 'Incorrect login credentials were keyed in. Please /login again'

    # Check Login credentials
    # needs logic where if login fails LOGGING_IN becomes false


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Get basic info of the incoming message
    message_type: str = update.message.chat.type
    text: str = update.message.text

    # Print a log for debugging
    print(f'User ({update.message.chat.id}) in {message_type}: "{text}"')

    if BOT_USERNAME in text:
        new_text: str = text.replace(BOT_USERNAME, '').strip()
        response: str = handle_response(new_text)

    elif LOGGING_IN:
        new_text: str = handle_login(text)
        response: str = new_text

    else:
        return

    # Reply normal if the message is in private for debugging
    print('Bot:', response)
    await update.message.reply_text(response)


# Log errors
async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f'Update {update} caused error {context.error}')


# Run the program
if __name__ == '__main__':
    app = Application.builder().token(TOKEN).build()

    # Commands
    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('help', help_command))
    app.add_handler(CommandHandler('login', login_command))

    # Messages
    app.add_handler(MessageHandler(filters.TEXT, handle_message))

    # Log all errors
    app.add_error_handler(error)

    print('Polling...')
    # Run the bot
    app.run_polling(poll_interval=3)