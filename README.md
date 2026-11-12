# Optivoyage AI

**Automated Travel Inventory Procurement & Risk Decision Support System**  
Built for **TBO.com // VOYAGEHACK 4.0 (Track 1: Automate Inventory Optimization)**  
*Submission on Unstop by Soham Goswami ([@sohamgoswami05](https://github.com/sohamgoswami05))*

---

## 1. Problem Overview

In B2B travel distribution, OTAs and travel platforms face a recurring procurement dilemma during peak seasons:
- **Spot-Buy Vulnerability**: Relying on real-time bedbank and GDS spot rates leads to **18%+ sold-out rates** and steep price surges (+45% to +85%) once demand spikes.
- **Naive Pre-Buy Risk**: Committing bulk capital upfront without demand telemetry causes heavy cancellation liabilities and unsold room dumping if market conditions soften.

**Optivoyage AI** is an algorithmic decision-support workstation built for TBO's procurement desk. Given a fixed input budget, the platform determines:
1. **Which inventory to pre-buy** across high-demand hotel properties and flight blocks.
2. **When to buy**, locking wholesale rates 18 to 35 days before bedbanks reprice.
3. **How to balance capital** across steady corporate trunk routes and high-margin event corridors using Markowitz Modern Portfolio Theory.
4. **Dynamic selling prices and liquidation waterfalls**, protecting TBO from unsold room liability.

---

## 2. Key Modules

### A. Demand Telemetry & External Signal Fusion
Correlates internal search look-to-book ratios with external event triggers (concert residencies, sports events, visa policy expansions, and weather anomalies). Catches surge demand 18 to 35 days ahead of wholesale repricing.

### B. Markowitz Portfolio Risk Optimizer (Travel MPT)
Treats travel inventory like an investment portfolio:
- **Core Low-Volatility Assets (45%)**: Steady corporate hotels and trunk flight blocks with guaranteed cash flows.
- **High-Margin Event Surge Assets (35%)**: High-yield festival and concert blocks (+28% to +35% margins).
- **Spot-API Reserve Buffer (20%)**: Liquid cash for dynamic last-minute bookings.
- **Downside Risk Shield**: Portfolio tail loss bounded under a 95% CVaR constraint.

### C. 4-Stage Liquidation Waterfall & Bundling
Mitigates unsold inventory risk through automated execution stages:
- **Stage 1 (D-60 to D-21)**: Primary B2B distribution (+28.5% margin).
- **Stage 2 (D-20 to D-14)**: Agency flash volume rebate (+4% commission kicker if pickup lags).
- **Stage 3 (D-13 to D-7)**: Cross-corridor dynamic packaging (pairs lagging rooms with guaranteed flight blocks to hide room discounts).
- **Stage 4 (D-7 to D-0)**: Contractual supplier put-option / auto-release back to bedbank with 0% penalty.

### D. Dynamic Selling Price & Elasticity Optimizer
Simulates price elasticity ($\epsilon = -1.6$) across corridors to pinpoint the exact B2B markup that maximizes total gross profit.

### E. Supplier API Health & Latency Radar
Monitors real-time connectivity, NDC direct pipes (18ms–48ms), and cache latency across Kerzner Direct, Las Vegas Sands, Emirates NDC, Air India NDC, and bedbank channels.

---

## 3. Tech Stack

- **Frontend**: React 19, Tailwind CSS, Lucide Icons, Vite
- **Data & Models**: Client-side quantitative solver, Markowitz covariance matrices, Monte Carlo 10,000-path forecast fan
- **Design System**: Light-mode enterprise workstation (Stripe Dashboard / Ramp style)

---

## 4. Quickstart Guide

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sohamgoswami05/Optivoyge-AI.git
   cd Optivoyge-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local workstation:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

---

## 5. Repository Structure

```
Optivoyge-AI/
├── src/
│   ├── components/
│   │   └── workstation/
│   │       ├── EnterpriseHeader.jsx       # Top navigation & operational context
│   │       ├── ExecutiveSummaryBar.jsx    # Budget scrubber & CVaR risk shield
│   │       ├── DemandForecastChart.jsx    # Grid-lined P10/P50/P90 forecast fan
│   │       ├── DemandPortfolioMatrix.jsx  # 5-tab allocation matrix & waterfall
│   │       ├── QuantitativeSolverPane.jsx # MPT split, solver audit, supplier radar
│   │       └── CorridorDetailDrawer.jsx   # Unit economics & cancellation terms
│   ├── data/
│   │   └── procurementData.js             # Corridor seed data, telemetry & rates
│   ├── App.jsx                            # Root application & scenario controller
│   └── index.css                          # Tailwind CSS & tabular typography
├── public/                                # Static icons & assets
├── package.json                           # Dependencies & run scripts
├── vite.config.js                         # Vite build configuration
└── README.md                              # Documentation & submission details
```

---

## 6. Submission Information

- **Hackathon**: TBO.com VOYAGEHACK 4.0
- **Track**: Track 1 — Automate Inventory Optimization
- **Platform**: Unstop
- **Repository**: [https://github.com/sohamgoswami05/Optivoyge-AI](https://github.com/sohamgoswami05/Optivoyge-AI)
- **Author**: Soham Goswami
