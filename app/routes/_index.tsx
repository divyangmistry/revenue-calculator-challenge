import type { MetaFunction } from "@remix-run/node";
// import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from "react";
import RangeSlider from "../components/input-range-slider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const meta: MetaFunction = () => {
  return [
    { title: "Revenue Generation Calculator" },
    // { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [referredCustomers, setReferredCustomers] = useState<number>(1);
  const [newProjects, setNewProjects] = useState<number>(10);
  const [existingProjects, setExistingProjects] = useState<number>(300);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(3075);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    calculateApi();
  }, [referredCustomers, newProjects, existingProjects]);

  const calculateApi = () => {
    console.log("Into the calculations.");
  };

  return (
    <body className="bg-white text-gray-800 font-sans max-w-full h-full m-20 flex-row justify-items-center">

      <h1 className="text-4xl font-bold text-center mb-8">Calculate Your Recurring Passive Income</h1>
      <div className="p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-3/6">

            <div className="text-lg mb-4">
              Add in your expected referrals to see how much you could earn as a <strong>Sunvoy Affiliate</strong> in just 1 year
            </div>

            <div className="mb-4">
              <label className="mb-2 justify-between items-center flex">
                <p className="text-gray-600 font-semibold">Referred Customers per month</p>
                <p className="text-gray-600 font-bold">{referredCustomers}</p>
              </label>
              <RangeSlider
                id="referredCustomers"
                min={0}
                max={10}
                initialValue={referredCustomers}
                onChange={(e) => setReferredCustomers(e)}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 justify-between items-center flex">
                <p className="text-gray-600 font-semibold">Avg. new projects per month</p>
                <p className="text-gray-600 font-bold">{newProjects}</p>
              </label>
              <RangeSlider
                id="newProjects"
                min={5}
                max={50}
                initialValue={newProjects}
                onChange={(e) => setNewProjects(e)}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 justify-between items-center flex">
                <p className="text-gray-600 font-semibold">Avg. existing projects</p>
                <p className="text-gray-600 font-bold">{existingProjects}</p>
              </label>
              <RangeSlider
                id="existingProjects"
                min={1}
                max={10000}
                initialValue={existingProjects}
                onChange={(e) => setExistingProjects(e)}
              />
            </div>

            <div className="text-center mt-8">
              <p className="text-2xl">Your <strong>monthly income</strong> after 1 year:</p>
              <p className="text-7xl font-extrabold text-gray-800 mt-2">${monthlyIncome.toLocaleString()}</p>
            </div>
          </div>

          <div>
            <Bar
              data={{
                labels: ['Aug 2024', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan 2025', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                  {
                    label: 'Income',
                    data: chartData,
                    backgroundColor: '#b0cc53',
                    borderRadius: 10,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <p className="text-gray-500 text-center">Calculate are based on the number of customers you refer each month and their evg. project volume.</p>
      <p className="text-gray-500 text-center mb-8">Factor in our churn rate and this brings you to your estimated total passive future income.</p>

    </body>
  );
}
