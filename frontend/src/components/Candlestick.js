import ReactECharts from 'echarts-for-react'
import Navbar from './Navbar'
import PlaceholderCandlestick from './PlaceholderCandlestick'
import CandlestickForm from './CandlestickForm'
import background from './background.module.css'
import styles from './Candlestick.module.css'

const Candlestick = ({
  user,
  handleLogout,
  candlestickSymbol,
  candlestickData,
  newCandlestickSymbol,
  newCandlestickStart,
  handleNewCandlestickSymbolChange,
  handleNewCandlestickStartChange,
  fetchCandlestickData,
  loading,
  error
}) => {
  const upColor = '#ec0000'
  const upBorderColor = '#8A0000'
  const downColor = '#00da3c'
  const downBorderColor = '#008F28'
  // Each item: open，close，lowest，highest
  const option = !candlestickData ? null : {
    title: {
      text: candlestickSymbol,
      left: 'center',
      textStyle: {
        color: 'white',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: candlestickData.timestamps,
      boundaryGap: true,
      axisLine: { onZero: false },
      splitLine: { show: false },
      axisLabel: {
        color: 'white',
      },
    },
    yAxis: {
      scale: true,
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
        start: 90,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        top: '90%'
      }
    ],
    series: [
      {
        name: candlestickSymbol,
        type: 'candlestick',
        data: candlestickData.oclh,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor
        }
      }
    ]
  }
  return (
    <div className={background.wallpaper}>
      <Navbar
        user={user}
        handleLogout={handleLogout}
      />
      {!loading && !error && candlestickData
        ? <ReactECharts option={option} style={{ height: '500px' }} />
        : <PlaceholderCandlestick loading={loading} error={error} />
      }
      <div className={styles.form}>
        <CandlestickForm
          newCandlestickSymbol={newCandlestickSymbol}
          newCandlestickStart={newCandlestickStart}
          handleNewCandlestickSymbolChange={handleNewCandlestickSymbolChange}
          handleNewCandlestickStartChange={handleNewCandlestickStartChange}
          fetchCandlestickData={fetchCandlestickData}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default Candlestick