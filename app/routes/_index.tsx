import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from 'react';
import AffiliateChart from '~/components/affiliateChart';
import RangeSlider from '~/components/inputRangeSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
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
  
  useEffect(() => {
    calculateApi();
  }, [referredCustomers, newProjects, existingProjects]);

  const calculateApi = async () => {
    const response = await fetch(
      `/api/calculate?referredCustomers=${referredCustomers}&newProjects=${newProjects}&existingProjects=${existingProjects}`
    );
    const data = await response.json();
    setMonthlyIncome(data.lastMonthRevenue.toLocaleString());
  };

  return (
    <div className="bg-white text-gray-800 font-sans max-w-full h-full m-20 flex-row justify-items-center">

      <h1 className="text-4xl font-bold text-center mb-8">Calculate Your Recurring Passive Income</h1>
      <div className="p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:p-20 p-15">
          <div className='md:w-4/6 lg:w-3/5 xl:w-4/6'>

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
                <div className='group relative inline-block duration-300'>
                  <p className="text-gray-600 font-semibold">Avg. new projects per month <FontAwesomeIcon className='ml-1' icon={faCircleInfo} />
                    <span
                      className="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-80 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
                      This is the number of new projects each of your referred customer installs on
                      average per month</span>
                  </p>
                </div>
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
                <div className='group relative inline-block duration-300'>
                  <p className="text-gray-600 font-semibold">Avg. existing projects <FontAwesomeIcon className='ml-1' icon={faCircleInfo} />
                    <span
                      className="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-80 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
                      This is the number of existing projects each of your referred customer already has
                      on average</span>
                  </p>
                </div>
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
              <p className="lg:text-7xl font-extrabold text-gray-800 mt-2 text-5xl">${monthlyIncome.toLocaleString()}</p>
            </div>
          </div>

          <div>
            <AffiliateChart
              referredCustomers={referredCustomers}
              newProjects={newProjects}
              existingProjects={existingProjects}
            />
          </div>
        </div>
      </div>

      <p className="text-gray-500 text-center">Calculate are based on the number of customers you refer each month and their evg. project volume.</p>
      <p className="text-gray-500 text-center mb-8">Factor in our churn rate and this brings you to your estimated total passive future income.</p>

    </div>

  );
}
