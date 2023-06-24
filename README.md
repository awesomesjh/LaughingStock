# Laughing Stock

### Level of Achievement
Gemini

### Scope
A web application that displays one's current stock portfolio coupled with analysis tools and a telegram bot.

### Motivation
Checking my stock portfolio using a trading app can be troublesome due to 2FA. This is annoying if I just want to take a quick glance at my portfolio.

### User Stories
- I am a retail investor, and would like an easy way to check my stock portfolio, so that I dont have to go through the hassle of 2FA and deal with long loading times.
- I am a retail investor, and would like an application with analysis tools, so that I can gain an insight on my portfolio's performance and make informed investments.

### Tech Stack
- Frontend: React

- Backend: Express.js

- Database: PostgreSQL

- Hosting Service: fly.io

## Features

### 1. User Login and Authentication
Users can create an account and log in.

To create an account, the user navigates to the /signup page.
After entering the desired username and password, a POST request containing the username and password is sent to the server. The server encrypts the password and stores the encrypted password in the database.

To log in, the user navigates to the /login page. After entering the username and password, a POST request containing the username and password is sent to the server. The server searches the database and tries to find a username that matches the username sent by the user. If no user is found, an error message is shown to the user. Else, the server encrypts the password sent by the user and checks if the encrypted password matches the password belonging to the username in the database. If the match fails, an error message is shown to the user. Else, the login is successful and a token to verify the user's identity is sent to the user. This token is stored in window.localstorage for future use.

### 2. Stock Dashboard
Basic CRUD functionality for users to modify their stock portfolio.

To use the dashboard, a GET request with the token set as the authorization header is sent to the server. The server uses the token to verify the user's identity and returns the stocks belonging to the user. Once the stock data has been retrieved, a GET request containing the stock symbols is sent to the server. The server then makes an API request containing the symbols to the Alpaca Market Data API, where the prices of the requested symbols are retrieved. These prices are then sent back to the user. The frontend processes the data and displays the stocks in a table format.

The dashboard UI has event handlers that send an appropriate API request to the server (GET, POST, PUT, DELETE), whenever the user tries to perform a CRUD operation. The server has routes to receive these API requests and modifies the database accordingly. The server also ensures that an invalid stock will not be added to the database by sending an API request to the Alpaca Market Data API and checking for errors.

The dashboard also allows sorting of stocks based on alphabetical order, quantity, price and total. The most recently used sorting method will be stored in the database and will be automatically applied if the user restarts the application.

### 3. Pie Chart
View composition of portfolio. Chart.js was used to implement the pie chart.

When the user hovers over the pie chart, the total value of the currently hovered stock will be shown.

### 4. Line Chart
View change in portfolio value over time. React ECharts was used to implement the line chart.

Every weekday, a cron script will automatically save the current stocks in the database to a separate table called paststocks. Data in paststocks that is older than a year will automatically be deleted. When the app loads, a GET request will be sent to the server to retrieve the user's historical stock data from paststocks. Afterwards, historical price data will be obtained through an API call to Alpaca Market Data API. The data is then processed and plotted into a line.

When the user hovers over a point on the line chart, a table showing the user's portfolio on a specific date will be shown.

When the user zooms in and out of chart, the difference in portfolio value between the first and last point within the chart window will be shown. The color of the chart will also change according to the difference in portfolio value, green if there is an increase, red if there is a decrease, and gray if there is no change.

### 5. Candlestick Chart
View change in price of a selected stock. Bar data is obtained from Alpaca Market data API, and plotted into a candlestick chart using React ECharts.

When the user hovers over a bar, the open, close, high and low price will be shown along with the date.

### 6. Latest News
A list of links to relevant news articles. News articles are scraped from Google News using Playwright.

When the user changes his/her stock portfolio, the news articles will be updated according to the user's current stock portfolio the next time the user navigates to the news page.

### 7. Telegram Bot
Provides a convenient way for the user to view their stock portfolio on mobile devices (since we don't have a mobile app).

#### Main Commands:
- /start Start the bot.
- /help View all available commands
- /login Login to your Laughing Stock account
- /getnews Get price changes of your stocks over the past week (only available when logged in)
- /logout Log out of your Laughing Stock accout

A new database table called teleusers was created to implement the login functionality. If the login in successful, a telegram account will be linked to the Laughing Stock account by creating an entry in teleusers with the Telegram ID corresponding to the Laughing Stock user ID. When /getnews is called, the server searches for the user's Telegram ID in teleusers. If found, the user is considered logged in and GET request is made to the server to obtain the stocks with the corresponding Laughing Stock user ID. Else, the user is not logged in and the command fails. To log out, the user's Telegram ID is deleted from teleusers.


## Problems Faced and Solutions
- A problem we faced was trying to ensure that the whole application would work in sync. We often encountered issues where a feature would work on its own but as soon as we tried to switch tabs an error would be thrown. To fix this, we implemented loading states to ensure that the components will not be rendered until the required data has been obtained from the server.
- Another problem we faced was the usage of React's useEffect hook, where it would often trigger excessively and make unecessary API calls, resulting in visual glitches on the frontend. To fix this, we added conditional statements to the callback function in useEffect. We also made use of other hooks such as useRef, useCallback and useMemo, to prevent rerendering from affecting variables in the useEffect dependency array.
- We also ran into many bugs when trying to use external libraries due to poor or unclear documentation. To fix this, we had to spend a lot of time doing trial and error, tweaking various parameters and properties in order to obtain our desired outcome.
- Sometimes the data obtained from external APIs are not in the format we want. To fix this, we had to modify the data structures, which proved to be a challenge.

## Testing
At the moment, testing was done manually through user testing.

We plan to add automated testing for Milestone 3.