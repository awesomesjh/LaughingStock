import PieChart from "./PieChart";

function Analysis({stocks}) {

  const data = {
    labels: stocks.map(s => s.symbol),
    datasets: [{
      label: 'Total',
      data: stocks.map(s => s.price*s.quantity),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div>
      <div style={{ width: 700 }}>
        <PieChart chartData={data} />
      </div>
    </div>
  );
}

export default Analysis;