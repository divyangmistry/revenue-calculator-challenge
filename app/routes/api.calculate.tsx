
import { json, LoaderFunction } from "@remix-run/node";

const NEW_PROJECT_FEE = 95;
const EXISTING_PROJECT_FEE = 0.25;
const REFERRAL_PAYOUT_PERCENTAGE = 0.20;
const CHURN_RATE = 0.02;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const referredCustomers = parseInt(url.searchParams.get("referredCustomers") || "0", 10);
  const newProjects = parseInt(url.searchParams.get("newProjects") || "0", 10);
  const existingProjects = parseInt(url.searchParams.get("existingProjects") || "0", 10);

  if (
    isNaN(referredCustomers) ||
    isNaN(newProjects) ||
    isNaN(existingProjects)
  ) {
    return json({ error: "Invalid input values" }, { status: 400 });
  }

  const results = calculateAffiliateRevenue({
    referredCustomers,
    newProjects,
    existingProjects,
  });

  return json(results);
};

function calculateAffiliateRevenue(params: CalculatorParams) {
  const { referredCustomers, newProjects, existingProjects } = params;

  let totalCustomers = referredCustomers;
  let totalRevenue = 0;
  let lastMonthRevenue = 0;
  let newExistingProjects = existingProjects;
  const monthlyRevenues = [];

  for (let month = 1; month <= 12; month++) {
    if (month > 1) totalCustomers *= 1 - CHURN_RATE;
    totalCustomers += referredCustomers;

    const monthlyRevenue =
      totalCustomers * (newProjects * NEW_PROJECT_FEE + newExistingProjects * EXISTING_PROJECT_FEE);

    const affiliatePayout = monthlyRevenue * REFERRAL_PAYOUT_PERCENTAGE;

    totalRevenue += affiliatePayout;
    newExistingProjects += newProjects;

    if (month == 12) lastMonthRevenue = +affiliatePayout.toFixed();

    monthlyRevenues.push({
      month: getMonthName(month - 1),
      revenue: affiliatePayout.toFixed(),
    });
  }

  return {
    lastMonthRevenue,
    monthlyRevenues,
  };
}

function getMonthName(offset: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + offset);
  return (offset === 0 || date.getMonth().toString() == "0")
    ? date.toLocaleString('default', { month: 'short', year: 'numeric' }).split(' ').join('\n')
    : date.toLocaleString('default', { month: 'short' });
}
