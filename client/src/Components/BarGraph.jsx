import { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BarGraph = ({ dataUpdated }) => {
  const [chartData, setChartData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/results');
      const responseData = await response.json();
      console.log(responseData)

      let choice1Count = 0;
      let choice2Count = 0;

      responseData.data.forEach(item => {
        if (item.voting_choice) {
          choice2Count = item.count;
        } else {
          choice1Count = item.count;
        }
      });

      setChartData({
        labels: ['No', 'Yes'],
        datasets: [
          {
            label: 'Number of Votes',
            data: [choice1Count, choice2Count],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataUpdated]);

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'black',
          font: {
            size: 14,
          },
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets[0].data.map((data, index) => ({
              text: chart.data.labels[index],
              fillStyle: datasets[0].backgroundColor[index],
              strokeStyle: datasets[0].borderColor[index],
              lineWidth: datasets[0].borderWidth,
            }));
          }
        }
      }
    },
  };

  return (
    <div className='bar-graph' style={{ width: '68%', height: '450px', margin: 'auto' }}>
      <div className='result'>
        <h2>Bar graph: Count of Yes and No</h2>
      </div>
      {chartData.labels ? <Bar data={chartData} options={options} /> : 'Loading...'}
    </div>
  );
};

export default BarGraph;
