import { useState, useRef, useMemo, useCallback } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import Navbar from './Navbar'
import LoadingCaption from './LoadingCaption'
import PastStockTable from './PastStockTable'
import Arrow from './Arrow'
import Rect from './Rect'
import sortPastStocks from '../util/sortPastStocks'
import styles from './Line.module.css'
// import background from './background.module.css'

const Line = ({
  user,
  handleLogout,
  timestamps,
  stocks,
  trades,
  lineStart,
  lineEnd,
  setLineStart,
  setLineEnd,
  lineStartValue,
  lineEndValue,
  setLineStartValue,
  setLineEndValue,
  sortBy
}) => {
  const RED = 'rgb(255, 0, 0)'
  const GREEN = 'rgb(0, 160, 0)'
  const GRAY = 'rgb(128, 128, 128)'

  const [color, setColor] = useState(null)
  const [change, setChange] = useState(null)
  const [pastStocks, setPastStocks] = useState(null)
  const [captionTimestamp, setCaptionTimestamp] = useState(null)

  const chartRef = useRef()

  const checkLoading = () => {
    for (const stock of stocks) {
      if (!trades[stock.symbol]) {
        return true
      }
    }
    return false
  }

  const loading = checkLoading()

  let option = null
  let yAxisData = []

  const handleColor = (start, end) => {
    const diff = end - start
    if (diff < 0) {
      setColor(RED)
    } else if (diff > 0) {
      setColor(GREEN)
    } else {
      setColor(GRAY)
    }
  }

  const handleChange = useCallback((start, end) => {
    const diff = end - start
    const absDiff = Math.abs(diff)
    let percentage = (absDiff/start*100)
    if (isNaN(percentage)) {
      percentage = '0.00'
    } else if (!isFinite(percentage)) {
      percentage = undefined
    } else if (percentage >= 1) {
      percentage = percentage.toFixed(2)
    } else {
      percentage = percentage.toPrecision(2)
    }
    const initialChange = `${diff.toFixed(2)} (${percentage})%`
    setChange(initialChange)
  }, [])

  if (timestamps && timestamps !== 'not enough data' && !loading) {
    for (const timestamp of Object.values(timestamps)) {
      let total = 0
      for (const stock of Object.values(timestamp)) {
        total += stock.total
      }
      yAxisData.push(total)
    }
    yAxisData.push(stocks.reduce((total, stock) => (total + stock.quantity * trades[stock.symbol].Price), 0))
    yAxisData = yAxisData.map(value => value.toFixed(2))

    let dates = Object.keys(timestamps)
    const currentDate = new Date().toLocaleDateString('en-CA', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    dates = dates.concat(currentDate)

    if (lineStartValue !== null && lineEndValue !== null) {
      if (!color) {
        handleColor(yAxisData[lineStartValue], yAxisData[lineEndValue])
      }
      if (!change) {
        handleChange(yAxisData[lineStartValue], yAxisData[lineEndValue])
      } 
    } else {
      if (!color) {
        handleColor(yAxisData[0], yAxisData.at(-1))
      }
      if (!change) {
        handleChange(yAxisData[0], yAxisData.at(-1))
      }
    }

    const handleTooltip = (params) => {
      const xAxisValue = params[0].axisValue
      const marker = params[0].marker
      const seriesName = params[0].seriesName
      const yAxisValue = params[0].data
      
      const pastStocksData = []
      if (xAxisValue in timestamps) {
        const timestamp = timestamps[xAxisValue]
        for (const symbol in timestamp) {
          pastStocksData.push({ ...timestamp[symbol], symbol })
        }
      } else {
        for (const stock of stocks) {
          pastStocksData.push({
            symbol: stock.symbol,
            quantity: stock.quantity,
            price: trades[stock.symbol].Price,
            total: trades[stock.symbol].Price * stock.quantity
          })
        }
      }
      setPastStocks(pastStocksData)
      setCaptionTimestamp(xAxisValue)

      const tooltipContent = `${xAxisValue}<br/>${marker} ${seriesName}&nbsp&nbsp&nbsp&nbsp<b>${yAxisValue}</b>`
      return tooltipContent
    }

    option = {
      tooltip: {
        trigger: 'axis',
        position: pt => [pt[0], '10%'],
        formatter: handleTooltip
      },
      title: {
        left: 'center',
        text: 'Total Portfolio Value',
        textStyle: {
          color: 'white',
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLabel: {
          color: 'white',
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitArea: {
          show: true
        },
        axisLabel: {
          color: 'white',
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: lineStart,
          end: lineEnd
        },
        {
          show: true,
          type: 'slider',
          top: '92%'
        }
      ],
      series: [
        {
          name: 'Total Portfolio Value',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: color
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: color
              },
              {
                offset: 1,
                color: 'rgb(255, 255, 255)'
              }
            ])
          },
          data: yAxisData
        }
      ]
    }
  }

  const handleEvents = useMemo(() => {
    return {
      'hideTip': () => setPastStocks(null),
      'dataZoom': params => {
        let startPercent = null
        let endPercent = null
        if (params.batch) {
          startPercent = params.batch[0].start
          endPercent = params.batch[0].end
        } else {
          startPercent = params.start
          endPercent = params.end
        }
        const chart = chartRef.current.getEchartsInstance()
        setLineStart(startPercent)
        setLineEnd(endPercent)
        const option = chart.getOption()
        const data = option.series[0].data
        const start = option.dataZoom[0].startValue
        const end = option.dataZoom[0].endValue
        setLineStartValue(start)
        setLineEndValue(end)
        handleColor(data[start], data[end])
        handleChange(data[start], data[end])
      }
    }
  }, [setLineStart, setLineEnd, handleChange, setLineStartValue, setLineEndValue])

  return (
    <div className={styles.wallpaper}>
      <Navbar
        user={user}
        handleLogout={handleLogout}
      />
      {!timestamps || loading
        ? <div className={styles.container}>
            <LoadingCaption />
          </div>
        : timestamps === 'not enough data'
        ? <div className={styles.container}>
            Account must be at least 5 working days old to begin using line graph.
          </div>
        : <>
            <ReactECharts
              ref={chartRef}
              option={option}
              style={{ height: '500px', marginBottom: '20px',}}
              onEvents={handleEvents}
            />
            <div className={styles.pContainer}>
              <p className={color === RED ? styles.red : color === GREEN ? styles.green : styles.gray}>
                <span className={styles.span}>
                  <b>{change} </b>
                </span>
                {color === GRAY
                  ? <Rect />
                  : <Arrow color={color} RED={RED} />
                }
              </p>
            </div>
          </>
      }
      {pastStocks
        ? <PastStockTable 
            pastStocks={sortPastStocks([...pastStocks], sortBy)}
            captionTimestamp={captionTimestamp}
          />
        : null
      }
    </div>
  )
}

export default Line