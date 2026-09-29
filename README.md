# Xeliport Operations OS — Product Prototype

A clickable product prototype built for the Xeliport Technical Product Manager take-home.

## Product thesis

The redesign applies **Tesler's Law** by moving operational reconciliation into the product. Instead of making a brand operator manually connect compliance, shipments, inventory, marketplaces and money, the interface surfaces:

**what changed → why it matters → who owns it → when it matters → what to do next**

All figures and records in this prototype are illustrative demo data.

## What works

- **Overview** — action-first command centre with prioritized exceptions
- **Markets** — corridor-level operating views for UAE and UK
- **UAE detail** — live operations, unit economics, compliance, logistics and settlement state
- **UK detail** — dependency-aware 90-day launch timeline
- **Shipments** — logistics table with downstream business impact
- **Inventory** — predictive runway and stock-out risk
- **Financials** — settlements plus explainable landed-cost drilldown
- **Documents** — compliance files mapped to the workflows they unlock
- **Exception centre** — notifications prioritized by impact + urgency
- **Drawers** — shipment reasoning, inventory recommendations, document dependencies and landed-cost explanation

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints in the terminal, normally `http://localhost:5173`.

## Build

```bash
npm run build
```

Vite outputs the production build to `dist/`.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project**.
3. Import the repository.
4. Framework preset should be **Vite**.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.

## Suggested reviewer flow

1. Open **Overview** and inspect the three prioritized actions.
2. Open the customs exception to see the impact + recommended action model.
3. Open **Markets → UAE** and click **Why did this change?** on landed cost.
4. Open **Markets → UK** and inspect the 90-day launch dependency timeline.
5. Open **Shipments**, **Inventory**, **Financials**, and **Documents** to see how the same decision-oriented model carries across the product.

## Notes

This is intentionally a front-end product prototype. It uses hard-coded illustrative data so the assignment focuses on information architecture, interaction design, prioritization logic and product reasoning rather than backend implementation.
