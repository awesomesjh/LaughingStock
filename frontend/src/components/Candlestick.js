import ReactECharts from 'echarts-for-react'
import Navbar from './Navbar'
import PlaceholderCandlestick from './PlaceholderCandlestick'
import CandlestickForm from './CandlestickForm'
import Container from 'react-bootstrap/Container'

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
        color: 'white'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      data: candlestickData.timestamps,
      boundaryGap: true,
      axisLine: { onZero: false },
      splitLine: { show: false },
      axisLabel: {
        color: 'white'
      }
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(0, 45, 79, 0.3)', 'rgba(0, 95, 129, 0.3)']
        }
      },
      axisLabel: {
        color: 'white'
      }
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
        top: '92%',
        textStyle: {
          color: 'white'
        }
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
    <div>
      <Navbar
        user={user}
        handleLogout={handleLogout}
      />
      <Container>
        {!loading && !error && candlestickData
          ? <ReactECharts option={option} style={{ height: '500px', marginBottom: '20px', marginTop: '30px' }} />
          : <PlaceholderCandlestick loading={loading} error={error} />
        }
        <CandlestickForm
          newCandlestickSymbol={newCandlestickSymbol}
          newCandlestickStart={newCandlestickStart}
          handleNewCandlestickSymbolChange={handleNewCandlestickSymbolChange}
          handleNewCandlestickStartChange={handleNewCandlestickStartChange}
          fetchCandlestickData={fetchCandlestickData}
          loading={loading}
        />
      </Container>
    </div>
  )
}

export default Candlestick