import { Pie } from 'react-chartjs-2'
// Do not uncomment the following line as it breaks the code. Auto imports everything.
// https://www.chartjs.org/docs/latest/getting-started/integration.html
import 'chart.js/auto'
import Navbar from './Navbar'
import LoadingCaption from './LoadingCaption'
import styles from './PieChart.module.css'

const PieChart = ({ user, handleLogout, stocks, trades }) => {
  const totalPrice = stocks.map((stock) => trades[stock.symbol] ? trades[stock.symbol].Price * stock.quantity : null)

  const data = {
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white' // Change this to the desired color
        }
      },
      title: {
        display: true,
        text: 'Portfolio Breakdown',
        color: 'white',
        font: {
          size: 20
        }
      }
    }
  }

  const checkLoading = () => {
    for (const stock of stocks) {
      if (!trades[stock.symbol]) {
        return true
      }
    }
    return false
  }

  const loading = checkLoading()

  return (
    <div>
      <Navbar
        user={user}
        handleLogout={handleLogout}
      />
      <div className={styles.container}>
        {loading
          ? <LoadingCaption />
          : stocks.length
          ? <div className={styles.size}>
              <Pie data={data} options={options} />
            </div>
          : <p>No stocks found. Add some stocks to view pie chart.</p>}
      </div>
    </div>
  )
}

export default PieChart