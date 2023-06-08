import PieChart from './PieChart'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';

const TestAnalysis = ( {handleLogout} ) => {
  const location = useLocation();
  const { data } = location.state
  const { user, stocks, trades } = data
  const totalPrice = stocks.map((stock) => trades[stock.symbol] ? trades[stock.symbol].Price * stock.quantity : null)

  const chartData = {
    labels: stocks.map(s => s.symbol),
    datasets: [{
      label: 'Total',
      data: totalPrice,
      backgroundColor: [
        'rgb(244, 122, 31)',
        'rgb(253, 187, 47)',
        'rgb(55, 123, 43)',
        'rgb(122, 193, 66)',
        'rgb(0, 124, 195)',
        'rgb(0, 82, 155)'
      ],
      hoverOffset: 4
    }]
  }

  return (
    <div>
      <Navbar
        user={user}
        handleLogout={handleLogout} 
        stocks={stocks}
        trades={trades}
      />
      <div style={{ width: 500 }}>
        <PieChart chartData={chartData} />
      </div>
    </div>
  )
}

export default TestAnalysis