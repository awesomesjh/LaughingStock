import PieChart from "./PieChart";

function Analysis({stocks, trades}) {

  const totalPrice = stocks.map((stock) => trades[stock.symbol] ? trades[stock.symbol].Price*stock.quantity : null)

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
  };

  return (
    <div>
      <div style={{ width: 500 }}>
        <PieChart chartData={data} />
      </div>
    </div>
  );
}

export default Analysis;