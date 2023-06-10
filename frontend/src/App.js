import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import Main from './components/Main'
import Signup from './components/Signup'
import Login from './components/Login'
import PieChart from './components/PieChart'
import Candlestick from './components/Candlestick'
import NotFound from './components/NotFound'
import loginService from './services/login'
import stockService from './services/stocks'
import tradeService from './services/trades'
import barService from './services/bars'
import userService from './services/users'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const [newSymbol, setNewSymbol] = useState('')
  const [newQuantity, setNewQuantity] = useState('')
  const [stocks, setStocks] = useState(null)
  const [sortBy, setSortBy] = useState(null)
  const [trades, setTrades] = useState({})

  const [candlestickSymbol, setCandlestickSymbol] = useState(null)
  const [candlestickData, setCandlestickData] = useState(null)
  const [newCandlestickSymbol, setNewCandlestickSymbol] = useState('')
  const [newCandlestickStart, setNewCandlestickStart] = useState('1')
  const [loadingCandlestick, setLoadingCandlestick] = useState(false)
  const [candlestickError, setCandlestickError] = useState(false)

  const navigate = useNavigate()

  const location = useLocation()

  const handleLogout = () => {
    stockService.clearToken()
    window.localStorage.removeItem('loggedLaughingStockUser')
    setUser(null)
  }

  const handleTimeout = useCallback(() => {
    handleLogout()
    navigate('/login')
    setMessage('Session timed out. Please log in again.')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    // Omit navigate from dependency array to prevent useEffect from running on navigate
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchStocks = useCallback(async () => {
    try {
      const response = await stockService.getAll()
      const initialStocks = response.slice(0, -1)
      const initialSortBy = response.pop()
      setStocks(initialStocks)
      setSortBy(initialSortBy)
      const initialSymbols = initialStocks.map(s => s.symbol)
      if (initialStocks.length) {
        const latestTrades = await tradeService.getLatestTrades(initialSymbols)
        setTrades(latestTrades)
      }
    } catch (error) {
      if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
  }, [handleTimeout])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedLaughingStockUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      stockService.setToken(user.token)
      fetchStocks()
    }
  }, [fetchStocks])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      stockService.setToken(user.token)
      window.localStorage.setItem(
        'loggedLaughingStockUser', JSON.stringify(user)
      )
      setUser(user)
      setMessage(null)
      fetchStocks()
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (error) {
      setMessage('Invalid username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const checkLoggedIn = () => {
    if (window.localStorage.getItem('loggedLaughingStockUser')) {
      return true
    }
    return false
  }

  const loggedIn = checkLoggedIn()

  // (most) Functions moved from Dashboard.js are below this line

  const handleNewSymbolChange = (event) => {
    setNewSymbol(event.target.value)
  }

  const handleNewQuantityChange = (event) => {
    setNewQuantity(event.target.value)
  }

  const addStock = async (event) => {
    event.preventDefault()
    try {
      if (newSymbol === '' || newQuantity === '') {
        throw new Error('empty field')
      }
      const newSymbolUpper = newSymbol.toUpperCase()
      const stock = stocks.find(s => s.symbol === newSymbolUpper)
      if (stock) {
        const newObject = {
          ...stock,
          quantity: stock.quantity + parseInt(newQuantity)
        }
        const updatedStock = await stockService.update(stock.id, newObject)
        setStocks(stocks.map(s => s.id !== stock.id ? s : updatedStock))
      } else {
        const newObject = {
          symbol: newSymbolUpper,
          quantity: newQuantity
        }
        const newStock = await stockService.create(newObject)
        const newStocks = stocks.concat(newStock)
        setStocks(newStocks)
        const newSymbols = newStocks.map(s => s.symbol)
        const latestTrades = await tradeService.getLatestTrades(newSymbols)
        if (!latestTrades[newSymbolUpper]) {
          await stockService.remove(newStock.id)
          const filteredStocks = newStocks.filter(stock => stock.id !== newStock.id)
          setStocks(filteredStocks)
          throw new Error('invalid symbol')
        }
        setTrades(latestTrades)
      }
      setNewSymbol('')
      setNewQuantity('')
      setMessage('Stock successfully added')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      if (error.message === 'empty field') {
        setMessage('Data not saved. Symbol and quantity cannot be empty')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else if (error.message === 'invalid symbol') {
        setMessage('Stock not found')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deleteStock = async (id) => {
    try {
      await stockService.remove(id)
      const filteredStocks = stocks.filter(stock => stock.id !== id)
      setStocks(filteredStocks)
      const stock = stocks.find(s => s.id === id)
      const filteredTrades = { ...trades }
      delete filteredTrades[stock.symbol]
      setTrades(filteredTrades)
      setMessage('Stock successfully deleted')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
  }

  const handleQuantityChange = (event, id) => {
    const stock = stocks.find(s => s.id === id)
    const changedStock = { ...stock, quantity: event.target.value === '' ? '' : Number(event.target.value) }
    setStocks(stocks.map(s => s.id !== id ? s : changedStock))
  }

  const updateQuantity = async (id) => {
    const stock = stocks.find(s => s.id === id)
    try {
      if (stock.quantity === '') {
        throw new Error('empty field')
      }
      if (stock.quantity === 0) {
        await stockService.remove(id)
        const filteredStocks = stocks.filter(stock => stock.id !== id)
        setStocks(filteredStocks)
        setMessage('Stock successfully deleted')
      } else {
        const updatedStock = await stockService.update(id, stock)
        setStocks(stocks.map(s => s.id !== id ? s : updatedStock))
        setMessage('Quantity has been successfully updated')
      }
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      if (error.message === 'empty field') {
        setMessage('Data not saved. Quantity cannot be empty')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
  }

  const sortStocksAndUpdate = async (sb) => {
    setSortBy(sb)
    const newObject = {
      sortBy: sb
    }
    await userService.update(user.id, newObject)
  }

  const handleNewCandlestickSymbolChange = (event) => {
    setNewCandlestickSymbol(event.target.value)
  }

  const handleNewCandlestickStartChange = (event) => {
    setNewCandlestickStart(event.target.value)
  }

  const fetchCandlestickData = async (event) => {
    event.preventDefault()
    try {
      setLoadingCandlestick(true)
      setCandlestickError(false)
      const newCandlestickSymbolUpper = newCandlestickSymbol.toUpperCase()
      const bars = await barService.getBars(newCandlestickSymbolUpper, newCandlestickStart)
      if (!bars.length) {
        throw new Error('invalid symbol')
      }
      const timestamps = []
      const oclh = []
      for (const bar of bars) {
        timestamps.push(bar.Timestamp.slice(0, 10))
        oclh.push([bar.OpenPrice, bar.ClosePrice, bar.LowPrice, bar.HighPrice])
      }
      setCandlestickSymbol(newCandlestickSymbolUpper)
      setCandlestickData({ timestamps, oclh })
    } catch (error) {
      if (error.message === 'invalid symbol') {
        setCandlestickError(true)
        setCandlestickSymbol(null)
        setCandlestickData(null)
      }
    }
    setLoadingCandlestick(false)
  }

  // Remove candlestick error on navigate
  useEffect(() => {
    if (location.pathname !== '/candlestick' && candlestickError) {
      setCandlestickError(false)
      setNewCandlestickStart('1')
      setNewCandlestickSymbol('')
    }
  }, [navigate, location.pathname, candlestickError])

  // Remove ghosting effect on refresh
  if (loggedIn && !stocks) {
    return null
  }

  return (
    <Container>
      <Routes>
        <Route
          path='/'
          element={
            <Main
              user={user}
              handleLogout={handleLogout}
              stocks={stocks}
              sortBy={sortBy}
              trades={trades}
              newSymbol={newSymbol}
              newQuantity={newQuantity}
              handleNewSymbolChange={handleNewSymbolChange}
              handleNewQuantityChange={handleNewQuantityChange}
              handleQuantityChange={handleQuantityChange}
              addStock={addStock}
              deleteStock={deleteStock}
              updateQuantity={updateQuantity}
              sortStocksAndUpdate={sortStocksAndUpdate}
              message={message}
            />
          }
        />
        <Route
          path='/login'
          element={!loggedIn
            ? <Login
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
              message={message}
            />
            : <Navigate replace to='/' />
          }
        />
        <Route path='/signup' element={!loggedIn ? <Signup /> : <Navigate replace to='/' />} />
        <Route
          path='/piechart'
          element={loggedIn
            ? <PieChart
              user={user}
              stocks={stocks}
              trades={trades}
              handleLogout={handleLogout}
            />
            : <Navigate replace to='/login' />
          }
        />
        <Route
          path='/candlestick'
          element={loggedIn
            ? <Candlestick 
              user={user}
              handleLogout={handleLogout}
              candlestickSymbol={candlestickSymbol}
              candlestickData={candlestickData}
              newCandlestickSymbol={newCandlestickSymbol}
              newCandlestickStart={newCandlestickStart}
              handleNewCandlestickSymbolChange={handleNewCandlestickSymbolChange}
              handleNewCandlestickStartChange={handleNewCandlestickStartChange}
              fetchCandlestickData={fetchCandlestickData}
              loading={loadingCandlestick}
              error={candlestickError}
            />
            : <Navigate replace to='/login' />
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Container>
  )
}

export default App