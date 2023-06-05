import { Pie } from "react-chartjs-2";
// do not uncomment the following line it breaks the code. Auto imports everything
// https://www.chartjs.org/docs/latest/getting-started/integration.html 
import "chart.js/auto";

function PieChart({ chartData }) {
  return <Pie data={chartData} />;
}

export default PieChart;