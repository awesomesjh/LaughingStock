import { Pie } from 'react-chartjs-2'
// Do not uncomment the following line as it breaks the code. Auto imports everything.
// https://www.chartjs.org/docs/latest/getting-started/integration.html
import 'chart.js/auto'

const PieChart = ({ chartData }) => {
  return <Pie data={chartData} />
}

export default PieChart