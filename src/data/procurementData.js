// TBO.com - Quantitative Inventory Pre-Buy & Budget Optimizer Seed Data

export const BASE_CURRENCY = 'INR';

export const FORMAT_INR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  const num = Math.round(val);
  return '₹' + num.toLocaleString('en-IN');
};

export const FORMAT_INR_COMPACT = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  if (val >= 10000000) {
    return '₹' + (val / 10000000).toFixed(2) + ' Cr';
  }
  if (val >= 100000) {
    return '₹' + (val / 100000).toFixed(2) + ' L';
  }
  return FORMAT_INR(val);
};

export const INITIAL_SKUS = [
  {
    id: 'TBOH-DXB-98231',
    corridor: 'DXB — Atlantis The Palm',
    propertyName: 'Atlantis The Palm, Palm Jumeirah',
    destination: 'Dubai (DXB)',
    type: 'Hotel',
    category: 'High-Margin Event Surge',
    triggerSignal: 'Dubai Shopping Fest (+310% L2B)',
    l2bRatio: '194:1',
    l2bBaseline: '88:1',
    optimalBuyWindow: '42 Days Prior',
    recPreBuyQty: 320,
    unitMetric: 'Room-Nights',
    unitCost: 31500,
    unitSpot: 48500,
    sellingMarkupPct: 28.5,
    budgetWeight: 0.175,
    cvarRisk: 5.4,
    historicalSoldOutRate: 94.2,
    cancellationDeadline: '14 Days Prior (Full Refund)',
    supplier: 'Kerzner B2B Direct',
    locked: false,
    status: 'Recommended Pre-Buy'
  },
  {
    id: 'TBOH-SIN-44102',
    corridor: 'SIN — Marina Bay Sands',
    propertyName: 'Marina Bay Sands Premier Suites',
    destination: 'Singapore (SIN)',
    type: 'Hotel',
    category: 'Core Low-Volatility',
    triggerSignal: 'Global FinTech Summit (+165% L2B)',
    l2bRatio: '162:1',
    l2bBaseline: '74:1',
    optimalBuyWindow: '35 Days Prior',
    recPreBuyQty: 240,
    unitMetric: 'Room-Nights',
    unitCost: 38200,
    unitSpot: 56000,
    sellingMarkupPct: 24.2,
    budgetWeight: 0.155,
    cvarRisk: 3.2,
    historicalSoldOutRate: 91.8,
    cancellationDeadline: '21 Days Prior (Full Refund)',
    supplier: 'Las Vegas Sands Wholesaler',
    locked: false,
    status: 'Recommended Pre-Buy'
  },
  {
    id: 'TBOF-DEL-1109',
    corridor: 'DEL-DXB — Emirates Flight Block',
    propertyName: 'EK501 / EK502 Business & Economy Block',
    destination: 'Dubai (DXB)',
    type: 'Flight Block',
    category: 'Core Low-Volatility',
    triggerSignal: 'Diwali Trunk Traffic Ex-Delhi (+240% L2B)',
    l2bRatio: '240:1',
    l2bBaseline: '92:1',
    optimalBuyWindow: '45 Days Prior',
    recPreBuyQty: 400,
    unitMetric: 'Seats',
    unitCost: 24800,
    unitSpot: 37500,
    sellingMarkupPct: 26.8,
    budgetWeight: 0.165,
    cvarRisk: 2.1,
    historicalSoldOutRate: 98.4,
    cancellationDeadline: '7 Days Prior (Name Swap Free)',
    supplier: 'Emirates Direct NDC',
    locked: false,
    status: 'Recommended Pre-Buy'
  },
  {
    id: 'TBOH-BKK-77319',
    corridor: 'BKK — Grande Centre Point',
    propertyName: 'Grande Centre Point Terminal 21',
    destination: 'Bangkok (BKK)',
    type: 'Hotel',
    category: 'High-Margin Event Surge',
    triggerSignal: 'Visa-Free Exemption Policy Surge (+180% L2B)',
    l2bRatio: '178:1',
    l2bBaseline: '80:1',
    optimalBuyWindow: '28 Days Prior',
    recPreBuyQty: 380,
    unitMetric: 'Room-Nights',
    unitCost: 11400,
    unitSpot: 18200,
    sellingMarkupPct: 31.0,
    budgetWeight: 0.095,
    cvarRisk: 6.8,
    historicalSoldOutRate: 88.5,
    cancellationDeadline: '14 Days Prior (Full Refund)',
    supplier: 'Centre Point Hospitality',
    locked: false,
    status: 'Recommended Pre-Buy'
  },
  {
    id: 'TBOH-GOI-33910',
    corridor: 'GOI — Taj Exotica Benaulim',
    propertyName: 'Taj Exotica Resort & Spa Goa',
    destination: 'Goa (GOI)',
    type: 'Hotel',
    category: 'High-Margin Event Surge',
    triggerSignal: 'Sunburn Festival & Year-End Peak (+280% L2B)',
    l2bRatio: '280:1',
    l2bBaseline: '110:1',
    optimalBuyWindow: '50 Days Prior',
    recPreBuyQty: 180,
    unitMetric: 'Room-Nights',
    unitCost: 26500,
    unitSpot: 42000,
    sellingMarkupPct: 33.5,
    budgetWeight: 0.110,
    cvarRisk: 7.4,
    historicalSoldOutRate: 96.5,
    cancellationDeadline: '14 Days Prior (Full Refund)',
    supplier: 'IHCL Corporate Gateway',
    locked: false,
    status: 'Recommended Pre-Buy'
  },
  {
    id: 'TBOH-LHR-88319',
    corridor: 'LHR — The Langham Regent St',
    propertyName: 'The Langham London Executive Club',
    destination: 'London (LHR)',
    type: 'Hotel',
    category: 'High-Margin Event Surge',
    triggerSignal: 'Wembley Stadium Concert Residency (+210% L2B)',
    l2bRatio: '188:1',
    l2bBaseline: '85:1',
    optimalBuyWindow: '35 Days Prior',
    recPreBuyQty: 140,
    unitMetric: 'Room-Nights',
    unitCost: 46000,
    unitSpot: 71000,
    sellingMarkupPct: 29.2,
    budgetWeight: 0.105,
    cvarRisk: 8.1,
    historicalSoldOutRate: 89.2,
    cancellationDeadline: '21 Days Prior (Full Refund)',
    supplier: 'Langham Hospitality Group',
    locked: false,
    status: 'Recommended Pre-Buy'
  },
  {
    id: 'TBOF-BOM-2204',
    corridor: 'BOM-LHR — Air India Flight Block',
    propertyName: 'AI129 / AI130 Direct Trunk Seats',
    destination: 'London (LHR)',
    type: 'Flight Block',
    category: 'Core Low-Volatility',
    triggerSignal: 'Corporate Business Influx (+165% L2B)',
    l2bRatio: '165:1',
    l2bBaseline: '78:1',
    optimalBuyWindow: '40 Days Prior',
    recPreBuyQty: 250,
    unitMetric: 'Seats',
    unitCost: 41000,
    unitSpot: 59000,
    sellingMarkupPct: 23.4,
    budgetWeight: 0.120,
    cvarRisk: 3.8,
    historicalSoldOutRate: 92.0,
    cancellationDeadline: '10 Days Prior (Free Date Move)',
    supplier: 'Air India B2B NDC',
    locked: false,
    status: 'Recommended Pre-Buy'
  },
  {
    id: 'TBOH-TYO-77104',
    corridor: 'TYO — Keio Plaza Shinjuku',
    propertyName: 'Keio Plaza Hotel Tokyo Premier',
    destination: 'Tokyo (TYO)',
    type: 'Hotel',
    category: 'High-Margin Event Surge',
    triggerSignal: 'Early Sakura Peak Bloom Forecast (+195% L2B)',
    l2bRatio: '215:1',
    l2bBaseline: '95:1',
    optimalBuyWindow: '45 Days Prior',
    recPreBuyQty: 260,
    unitMetric: 'Room-Nights',
    unitCost: 21500,
    unitSpot: 35000,
    sellingMarkupPct: 32.4,
    budgetWeight: 0.075,
    cvarRisk: 6.2,
    historicalSoldOutRate: 95.8,
    cancellationDeadline: '14 Days Prior (Full Refund)',
    supplier: 'JTB Global Connect',
    locked: false,
    status: 'Recommended Pre-Buy'
  }
];

// Demand forecast time-series points for the chart
export const DEMAND_FORECAST_SERIES = [
  { day: '60 Days Out', historical: 110, liveVelocity: 115, p10: 95, p50: 118, p90: 135 },
  { day: '50 Days Out', historical: 125, liveVelocity: 138, p10: 110, p50: 140, p90: 170 },
  { day: '42 Days Out', historical: 145, liveVelocity: 198, p10: 140, p50: 210, p90: 275 }, // Optimal Pre-Buy Cutoff
  { day: '35 Days Out', historical: 170, liveVelocity: 260, p10: 175, p50: 280, p90: 360 },
  { day: '28 Days Out', historical: 205, liveVelocity: 310, p10: 210, p50: 345, p90: 440 },
  { day: '21 Days Out', historical: 240, liveVelocity: 385, p10: 250, p50: 420, p90: 530 },
  { day: '14 Days Out', historical: 290, liveVelocity: 470, p10: 295, p50: 510, p90: 640 }, // Supplier Repricing Peak
  { day: '7 Days Out',  historical: 350, liveVelocity: 540, p10: 340, p50: 590, p90: 710 },
  { day: 'Travel Date', historical: 410, liveVelocity: 610, p10: 380, p50: 650, p90: 780 },
];

export const MOCK_SOLVER_AUDIT_LOGS = [
  {
    timestamp: '14:02:11',
    status: 'Optimal Solution Found',
    message: 'Mixed-Integer Optimizer converged in 42ms. Maximized expected profit under CVaR 95% tail-risk constraint. Filtered 140 volatile SKUs.'
  },
  {
    timestamp: '14:02:10',
    status: 'Risk Shield Evaluated',
    message: 'CVaR 95% boundary verified across 10,000 synthetic Monte Carlo booking trajectories. Downside exposure strictly capped at 5.8%.'
  },
  {
    timestamp: '14:02:09',
    status: 'Signal Fusion Correlated',
    message: 'Matched 42,810 live agency search queries with concert and festival calendars in Dubai, London, and Goa.'
  },
  {
    timestamp: '14:02:08',
    status: 'Supplier Capacity Verified',
    message: 'Wholesale contract allotments locked with Kerzner (320 units), Las Vegas Sands (240 units), and Emirates Direct (400 seats).'
  }
];
