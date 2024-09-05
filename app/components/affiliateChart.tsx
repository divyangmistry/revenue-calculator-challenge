import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register required components for Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const AffiliateChart: React.FC<AffiliateChartProps> = ({
  referredCustomers,
  newProjects,
  existingProjects,
}) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [referredCustomers, newProjects, existingProjects]);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `/api/calculate?referredCustomers=${referredCustomers}&newProjects=${newProjects}&existingProjects=${existingProjects}`
    );
    const data = await response.json();
    setChartData(formatChartData(data.monthlyRevenues));
    setLoading(false);
  };

  const formatChartData = (data: ChartData[]) => {
    return {
      labels: data.map(d => d.month),
      datasets: [
        {
          data: data.map(d => d.revenue),
          backgroundColor: data.map((d, i) => i != (data.length - 1) ? '#a9b3bc' : '#afcc54')
        },
      ],
    };
  };

  return (
    <div className='mt-5'>
      {loading ? (
        <i className="fa-solid fa-circle-notch"></i>
      ) : (
        <Bar
          className='mt-5'
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            layout: { padding: 20 },
            plugins: {
              legend: { display: false },
              datalabels: {
                display: true,
                align: 'top',
                anchor: 'end',
                color: '#5b5d62',
                opacity: 1,
                formatter: function (value, context) {
                  return `$ ${value.toLocaleString()}`;
                }
              },
            },
            scales: {
              x: {
                offset: true,
                grid: {
                  display: false // Display grid lines for the y-axis
                },
              },
              y: {
                display: false
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default AffiliateChart;
