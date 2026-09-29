import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Boxes,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Globe2,
  LayoutDashboard,
  PackageCheck,
  Plane,
  ReceiptText,
  Ship,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Warehouse,
  Search,
  Upload,
  Download,
  ShieldCheck,
  Truck,
  CalendarDays,
  CircleAlert,
  FileText,
  WalletCards,
  ArrowUpRight,
  Layers3,
  RefreshCw,
  X,
} from 'lucide-react';
import './styles.css';

const markets = {
  UAE: {
    name: 'United Arab Emirates',
    code: 'UAE',
    flag: '🇦🇪',
    state: 'Live',
    stateTone: 'green',
    day: 90,
    target: 'Live since 15 Jun',
    revenue: 'AED 27.4K',
    orders: '184',
    inventory: '34 days',
    shipment: '2 in transit',
    compliance: 'Complete',
    nextAction: 'Approve replenishment by 12 Oct',
    accent: 'Operating normally',
  },
  UK: {
    name: 'United Kingdom',
    code: 'UK',
    flag: '🇬🇧',
    state: 'Onboarding',
    stateTone: 'amber',
    day: 39,
    target: 'Target go-live · 19 Nov',
    revenue: '—',
    orders: '—',
    inventory: 'Not stocked',
    shipment: 'Planning',
    compliance: '4 of 6',
    nextAction: 'Upload corrected packaging artwork',
    accent: 'On track',
  },
};

const alerts = [
  {
    id: 1,
    severity: 'high',
    market: 'UAE',
    icon: AlertTriangle,
    title: 'Shipment XE-214 is blocked at customs',
    summary: 'Ingredient declaration needs correction before clearance.',
    impact: 'Amazon UAE replenishment may move by 2 days.',
    owner: 'Brand team',
    due: 'Today · 6:00 PM',
    action: 'Upload corrected declaration',
    system: 'Xeliport matched the customs hold against the replenishment ETA and current inventory runway.',
  },
  {
    id: 2,
    severity: 'medium',
    market: 'UAE',
    icon: Boxes,
    title: 'Inventory may fall below the safety buffer',
    summary: 'Projected stock reaches 12 days before the next shipment lands.',
    impact: 'Possible 5-day stock-out if demand stays at the 14-day average.',
    owner: 'Xeliport + brand',
    due: 'Decide by 12 Oct',
    action: 'Review replenishment options',
    system: 'Xeliport combined marketplace velocity, warehouse stock and shipment ETA to predict the gap.',
  },
  {
    id: 3,
    severity: 'low',
    market: 'UK',
    icon: FileCheck2,
    title: 'Packaging artwork is holding the UK launch plan',
    summary: 'One compliance dependency is waiting on an updated label file.',
    impact: 'If completed this week, the 19 Nov launch target remains unchanged.',
    owner: 'Brand team',
    due: '03 Oct',
    action: 'Upload artwork',
    system: 'The launch plan automatically recalculates downstream milestone dates when a dependency slips.',
  },
];

const timeline = [
  { phase: '01', title: 'Brand onboarding', status: 'done', detail: 'Catalog, target market and commercial inputs captured.', date: '21 Aug' },
  { phase: '02', title: 'Compliance & registrations', status: 'active', detail: '4 of 6 requirements complete. Packaging artwork is the current dependency.', date: 'Now' },
  { phase: '03', title: 'Shipping & customs setup', status: 'upcoming', detail: 'HS classification, freight plan and importer workflow prepared.', date: '08 Oct' },
  { phase: '04', title: 'Warehouse & inventory', status: 'upcoming', detail: 'UK 3PL intake, inventory sync and returns workflow.', date: '19 Oct' },
  { phase: '05', title: 'Marketplace launch', status: 'upcoming', detail: 'Listings, pricing, inventory allocation and launch checks.', date: '05 Nov' },
  { phase: '06', title: 'First revenue', status: 'upcoming', detail: 'Orders fulfilled locally; settlement and repatriation visible in dashboard.', date: '19 Nov' },
];

const nav = [
  ['Overview', LayoutDashboard],
  ['Markets', Globe2],
  ['Shipments', Ship],
  ['Inventory', Boxes],
  ['Financials', CircleDollarSign],
  ['Documents', FileCheck2],
];

function App() {
  const [activeNav, setActiveNav] = useState('Overview');
  const [marketView, setMarketView] = useState(null);
  const [drawer, setDrawer] = useState(null);

  const currentMarket = marketView ? markets[marketView] : null;
  const closeAll = () => setDrawer(null);

  const openMarket = (code) => {
    setActiveNav('Markets');
    setMarketView(code);
  };

  const renderPage = () => {
    if (currentMarket) {
      return <MarketDetail market={currentMarket} setMarketView={setMarketView} setDrawer={setDrawer} />;
    }
    if (activeNav === 'Markets') return <MarketsPage setMarketView={openMarket} setDrawer={setDrawer} />;
    if (activeNav === 'Shipments') return <ShipmentsPage setDrawer={setDrawer} />;
    if (activeNav === 'Inventory') return <InventoryPage setDrawer={setDrawer} />;
    if (activeNav === 'Financials') return <FinancialsPage setDrawer={setDrawer} />;
    if (activeNav === 'Documents') return <DocumentsPage setDrawer={setDrawer} />;
    return (
      <Overview
        setDrawer={setDrawer}
        setMarketView={openMarket}
        setActiveNav={setActiveNav}
      />
    );
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark">X</div>
          <div>
            <div className="brand-name">XELIPORT</div>
            <div className="brand-sub">Operations OS</div>
          </div>
        </div>

        <nav className="nav-list">
          {nav.map(([label, Icon]) => (
            <button
              className={`nav-item ${activeNav === label ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(label);
                setMarketView(null);
              }}
              key={label}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="system-card">
            <div className="system-card-icon"><Sparkles size={15} /></div>
            <div>
              <strong>System status</strong>
              <p>All partner integrations healthy</p>
            </div>
            <span className="pulse-dot" />
          </div>
          <div className="profile-row">
            <div className="avatar">MC</div>
            <div className="profile-copy">
              <strong>Maya · Dr. Chef</strong>
              <span>Brand operator</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="mobile-brand">XELIPORT</div>
          <div className="breadcrumb">
            <span>Operations</span>
            <ChevronRight size={14} />
            <strong>{currentMarket ? currentMarket.code : activeNav}</strong>
          </div>
          <div className="top-actions">
            <div className="prototype-badge">Prototype · illustrative data</div>
            <div className="updated">Updated 2 min ago</div>
            <button className="icon-button" onClick={() => setDrawer({ type: 'notifications' })} aria-label="Notifications">
              <Bell size={18} />
              <span className="notification-count">3</span>
            </button>
          </div>
        </header>

        {renderPage()}
      </main>

      {drawer && (
        <Drawer drawer={drawer} onClose={closeAll} setDrawer={setDrawer} setMarketView={openMarket} />
      )}
    </div>
  );
}

function Overview({ setDrawer, setMarketView, setActiveNav }) {
  return (
    <div className="page-wrap">
      <section className="hero-copy">
        <div>
          <div className="eyebrow">TUESDAY · 29 SEPTEMBER</div>
          <h1>Good morning, Maya.</h1>
          <p>
            UAE is operating normally and the UK launch is on track. <strong>3 items need your attention today.</strong>
          </p>
        </div>
        <button className="quiet-button" onClick={() => setDrawer({ type: 'logic' })}>
          <Sparkles size={16} /> How Xeliport prioritised this
        </button>
      </section>

      <section className="attention-section">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">ACTION REQUIRED</div>
            <h2>What needs you</h2>
          </div>
          <span className="auto-pill"><Sparkles size={13} /> prioritised by impact + urgency</span>
        </div>

        <div className="alert-stack">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <button className={`alert-card ${alert.severity}`} key={alert.id} onClick={() => setDrawer({ type: 'alert', alert })}>
                <div className="alert-icon"><Icon size={18} /></div>
                <div className="alert-copy">
                  <div className="alert-meta">
                    <span className={`severity-chip ${alert.severity}`}>{alert.severity}</span>
                    <span>{alert.market}</span>
                    <span>·</span>
                    <span>{alert.due}</span>
                  </div>
                  <h3>{alert.title}</h3>
                  <p>{alert.impact}</p>
                </div>
                <div className="alert-action">
                  <span>{alert.action}</span>
                  <ArrowRight size={17} />
                </div>
              </button>
            );
          })}
        </div>
        <button className="text-button" onClick={() => setDrawer({ type: 'notifications' })}>
          View all exceptions <ChevronRight size={14} />
        </button>
      </section>

      <section className="markets-section">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">MARKET COMMAND CENTRE</div>
            <h2>Your corridors</h2>
          </div>
          <p className="section-explainer">One view across compliance, logistics, inventory, marketplaces and money.</p>
        </div>

        <div className="market-grid">
          {Object.values(markets).map((market) => (
            <MarketCard key={market.code} market={market} onOpen={() => setMarketView(market.code)} />
          ))}
        </div>
      </section>

      <section className="lower-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="section-kicker">NETWORK</div>
              <h3>Shipments in motion</h3>
            </div>
            <button className="text-button" onClick={() => setActiveNav('Shipments')}>View all <ChevronRight size={14} /></button>
          </div>

          {shipmentData.slice(0, 3).map((s) => (
            <ShipmentRow key={s.id} mode={s.mode.toLowerCase()} id={s.id} route={s.route} status={s.status} eta={s.eta} tone={s.tone} />
          ))}
        </div>

        <div className="panel money-panel">
          <div className="panel-header">
            <div>
              <div className="section-kicker">MONEY</div>
              <h3>UAE unit economics</h3>
            </div>
            <span className="status-chip green">Healthy</span>
          </div>
          <div className="big-number-row">
            <div>
              <span>Estimated landed cost</span>
              <strong>AED 28.40</strong>
              <small>per unit</small>
            </div>
            <div className="delta up"><TrendingUp size={14} /> AED 1.20</div>
          </div>
          <div className="mini-metrics">
            <div><span>Avg. selling price</span><strong>AED 54</strong></div>
            <div><span>Contribution margin</span><strong>31.8%</strong></div>
            <div><span>Next settlement</span><strong>02 Oct</strong></div>
          </div>
          <button className="primary-button full" onClick={() => setDrawer({ type: 'cost' })}>
            Explain this cost <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="principle-strip">
        <Sparkles size={18} />
        <div>
          <strong>Tesler's Law in the prototype</strong>
          <p>The system does the reconciliation, dependency tracking and risk calculation. The operator gets the decision, context and next action.</p>
        </div>
      </section>
    </div>
  );
}


const shipmentData = [
  { id:'XE-214', mode:'Sea', route:'Mumbai → Jebel Ali', market:'UAE', status:'Customs hold', eta:'04 Oct', risk:'High', inventory:'18 days', action:'Upload corrected declaration', tone:'red' },
  { id:'XE-219', mode:'Air', route:'Delhi → Dubai', market:'UAE', status:'In transit', eta:'02 Oct', risk:'Low', inventory:'34 days', action:'No action needed', tone:'green' },
  { id:'UK-041', mode:'Sea', route:'Mumbai → Felixstowe', market:'UK', status:'Planning', eta:'24 Oct', risk:'Medium', inventory:'Launch stock', action:'Confirm booking by 06 Oct', tone:'amber' },
  { id:'XE-226', mode:'Air', route:'Mumbai → Dubai', market:'UAE', status:'Booked', eta:'09 Oct', risk:'Low', inventory:'Replenishment', action:'No action needed', tone:'green' },
];

const inventoryData = [
  { sku:'DC-SEA-01', product:'Sea Salt Grinder', market:'UAE', units:'1,240', cover:'34 days', demand:'36/day', incoming:'480 · 04 Oct', state:'Healthy', tone:'green' },
  { sku:'DC-PPR-02', product:'Black Pepper Grinder', market:'UAE', units:'423', cover:'12 days', demand:'35/day', incoming:'600 · 17 Oct', state:'Stock-out risk', tone:'amber' },
  { sku:'DC-GRC-03', product:'Garlic Seasoning', market:'UAE', units:'882', cover:'29 days', demand:'30/day', incoming:'—', state:'Healthy', tone:'green' },
  { sku:'DC-SEA-UK', product:'Sea Salt Grinder', market:'UK', units:'0', cover:'Pre-launch', demand:'—', incoming:'Launch stock · 24 Oct', state:'Planned', tone:'neutral' },
];

const documentData = [
  { name:'Ingredient declaration', market:'UAE', category:'Customs', status:'Action required', expiry:'—', dependency:'Shipment XE-214', tone:'red' },
  { name:'Product registration', market:'UAE', category:'Compliance', status:'Approved', expiry:'21 Sep 2027', dependency:'Marketplace live', tone:'green' },
  { name:'Trade licence copy', market:'UAE', category:'Entity', status:'Approved', expiry:'04 Jun 2027', dependency:'Banking', tone:'green' },
  { name:'UK packaging artwork', market:'UK', category:'Compliance', status:'Needs revision', expiry:'—', dependency:'Blocks launch phase 2', tone:'amber' },
  { name:'VAT registration', market:'UK', category:'Tax', status:'In review', expiry:'—', dependency:'Marketplace setup', tone:'neutral' },
  { name:'Warehouse intake sheet', market:'UK', category:'3PL', status:'Ready later', expiry:'—', dependency:'Unlocks after compliance', tone:'neutral' },
];

function PageIntro({ kicker, title, copy, action }) {
  return (
    <section className="page-intro">
      <div>
        <div className="eyebrow">{kicker}</div>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {action}
    </section>
  );
}

function MarketsPage({ setMarketView, setDrawer }) {
  return (
    <div className="page-wrap compact-page">
      <PageIntro
        kicker="MARKET COMMAND CENTRE"
        title="Operate by corridor, not by tool."
        copy="Each market combines compliance, logistics, inventory, marketplaces and money into one operating view — with the next decision already surfaced."
        action={<button className="quiet-button" onClick={() => setDrawer({type:'logic'})}><Sparkles size={16}/> Why this structure?</button>}
      />
      <section className="metric-grid market-summary-metrics">
        <MetricCard label="Active corridors" value="2" note="UAE live · UK onboarding" icon={Globe2} />
        <MetricCard label="Items needing attention" value="3" note="1 high · 1 medium · 1 low" icon={CircleAlert} />
        <MetricCard label="Live inventory" value="2,545" note="Across UAE warehouses" icon={Boxes} />
        <MetricCard label="Next milestone" value="03 Oct" note="UK artwork correction" icon={CalendarDays} />
      </section>
      <section className="markets-section">
        <div className="section-heading-row">
          <div><div className="section-kicker">YOUR CORRIDORS</div><h2>Market operating views</h2></div>
          <p className="section-explainer">Open a corridor to see its launch state, operational health and dependencies.</p>
        </div>
        <div className="market-grid">
          {Object.values(markets).map((market) => <MarketCard key={market.code} market={market} onOpen={() => setMarketView(market.code)} />)}
        </div>
      </section>
      <section className="panel decision-panel">
        <div className="panel-header"><div><div className="section-kicker">CROSS-MARKET DECISIONS</div><h3>What the system is coordinating</h3></div><span className="auto-pill"><Sparkles size={13}/> automatically stitched</span></div>
        <div className="decision-grid">
          <div><span>UAE</span><strong>Customs hold + stock runway</strong><p>XE-214 is delayed, but current stock prevents an immediate stock-out. Correct today to preserve the replenishment buffer.</p></div>
          <div><span>UK</span><strong>Artwork → compliance → shipping</strong><p>One packaging dependency is gating the next two launch phases. Fix by 03 Oct and the 19 Nov target stays intact.</p></div>
        </div>
      </section>
    </div>
  );
}

function ShipmentsPage({ setDrawer }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const filtered = shipmentData.filter((s) => !q || [s.id, s.route, s.status, s.market].join(' ').toLowerCase().includes(q));
  return (
    <div className="page-wrap compact-page">
      <PageIntro kicker="LOGISTICS" title="Shipments, with impact attached." copy="Instead of forcing operators to interpret ETAs and statuses, Xeliport connects each shipment to inventory runway, launch dates and the action required." />
      <section className="metric-grid">
        <MetricCard label="Open shipments" value="4" note="2 sea · 2 air" icon={Ship} />
        <MetricCard label="At risk" value="1" note="XE-214 · customs" icon={AlertTriangle} />
        <MetricCard label="Arriving next" value="02 Oct" note="XE-219 · Dubai" icon={Plane} />
        <MetricCard label="Inventory protected" value="34 days" note="Despite current delay" icon={ShieldCheck} />
      </section>
      <section className="panel data-panel">
        <div className="panel-header"><div><div className="section-kicker">ACTIVE MOVEMENTS</div><h3>Shipment network</h3></div>
          <label className="filter-chip">
            <Search size={14}/>
            <input type="text" placeholder="Search shipments" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search shipments" />
          </label>
        </div>
        <div className="data-table shipments-table">
          <div className="data-row data-head"><span>Shipment</span><span>Route</span><span>Status</span><span>ETA</span><span>Business impact</span><span></span></div>
          {filtered.map((s) => (
            <button className="data-row clickable-row" key={s.id} onClick={() => setDrawer({type:'shipment', shipment:s})}>
              <span><strong>{s.id}</strong><small>{s.market} · {s.mode}</small></span>
              <span>{s.route}</span>
              <span><i className={`status-chip ${s.tone}`}>{s.status}</i></span>
              <span><strong>{s.eta}</strong></span>
              <span><strong>{s.action}</strong><small>{s.inventory}</small></span>
              <span><ChevronRight size={16}/></span>
            </button>
          ))}
          {filtered.length === 0 && <div className="empty-row">No shipments match “{query}”.</div>}
        </div>
      </section>
      <section className="insight-strip"><Sparkles size={18}/><div><strong>System interpretation</strong><p>A delay is only promoted when it creates a meaningful downstream risk. XE-214 is high priority because customs clearance intersects with replenishment timing.</p></div></section>
    </div>
  );
}

function InventoryPage({ setDrawer }) {
  return (
    <div className="page-wrap compact-page">
      <PageIntro kicker="INVENTORY" title="Know the problem before stock hits zero." copy="The system combines warehouse stock, marketplace velocity and inbound ETAs to turn raw counts into predicted runway and replenishment decisions." />
      <section className="metric-grid">
        <MetricCard label="Units available" value="2,545" note="UAE live stock" icon={Boxes} />
        <MetricCard label="Healthy SKUs" value="2 / 3" note="One below safety buffer" icon={CheckCircle2} />
        <MetricCard label="Lowest runway" value="12 days" note="Black Pepper Grinder" icon={Clock3} />
        <MetricCard label="Potential stock-out" value="5 days" note="Without intervention" icon={TrendingDown} />
      </section>
      <section className="panel data-panel">
        <div className="panel-header"><div><div className="section-kicker">PREDICTIVE RUNWAY</div><h3>Stock by SKU and market</h3></div><span className="auto-pill"><RefreshCw size={13}/> recalculated from sales velocity</span></div>
        <div className="data-table inventory-table">
          <div className="data-row data-head"><span>SKU</span><span>Market</span><span>Available</span><span>Runway</span><span>Incoming</span><span>Status</span><span></span></div>
          {inventoryData.map((i) => (
            <button className="data-row clickable-row" key={i.sku} onClick={() => setDrawer({type:'inventory', inventory:i})}>
              <span><strong>{i.product}</strong><small>{i.sku}</small></span>
              <span>{i.market}</span><span>{i.units}</span><span><strong>{i.cover}</strong><small>{i.demand}</small></span><span>{i.incoming}</span>
              <span><i className={`status-chip ${i.tone}`}>{i.state}</i></span><span><ChevronRight size={16}/></span>
            </button>
          ))}
        </div>
      </section>
      <section className="panel recommendation-panel">
        <div className="recommendation-hero"><div className="recommendation-icon"><Sparkles size={18}/></div><div><div className="section-kicker">RECOMMENDED DECISION</div><h3>Pull forward 240 units of Black Pepper Grinder</h3><p>At the current 14-day sales velocity, stock reaches zero roughly five days before the scheduled shipment. Pulling 240 units forward restores a 7-day safety buffer.</p></div><button className="primary-button" onClick={() => setDrawer({type:'inventory', inventory:inventoryData[1]})}>Review options <ArrowRight size={16}/></button></div>
      </section>
    </div>
  );
}

function FinancialsPage({ setDrawer }) {
  return (
    <div className="page-wrap compact-page">
      <PageIntro kicker="FINANCIALS" title="Money that explains itself." copy="Revenue, settlements, landed cost, duties and FX are reconciled into numbers operators can trace back to their source instead of trusting a black box." />
      <section className="metric-grid">
        <MetricCard label="Net sales · 30d" value="AED 27.4K" note="+18.4% vs prior 30d" icon={TrendingUp} />
        <MetricCard label="Next settlement" value="AED 18,420" note="Expected 02 Oct" icon={WalletCards} />
        <MetricCard label="Landed cost" value="AED 28.40" note="+ AED 1.20 / unit" icon={ReceiptText} />
        <MetricCard label="Contribution margin" value="31.8%" note="After logistics + marketplace" icon={CircleDollarSign} />
      </section>
      <section className="finance-layout">
        <div className="panel">
          <div className="panel-header"><div><div className="section-kicker">SETTLEMENTS</div><h3>Money movement</h3></div><span className="status-chip green">Reconciled</span></div>
          <div className="settlement-row"><div><span>02 Oct</span><strong>Marketplace settlement</strong><small>Amazon.ae · 121 orders</small></div><strong>AED 18,420</strong></div>
          <div className="settlement-row"><div><span>09 Oct</span><strong>Marketplace settlement</strong><small>Noon · projected</small></div><strong>AED 6,880</strong></div>
          <div className="settlement-row"><div><span>12 Oct</span><strong>Freight payment</strong><small>XE-226 · partner invoice</small></div><strong className="negative">− AED 2,140</strong></div>
        </div>
        <div className="panel money-panel">
          <div className="panel-header"><div><div className="section-kicker">EXPLAINABLE LANDED COST</div><h3>UAE · per unit</h3></div><span className="status-chip amber">Changed</span></div>
          <div className="big-number-row"><div><span>Current estimate</span><strong>AED 28.40</strong><small>per unit</small></div><div className="delta up"><TrendingUp size={14}/> AED 1.20</div></div>
          <div className="cost-mini-breakdown"><span>Product <strong>21.60</strong></span><span>Freight <strong>2.80</strong></span><span>Duty <strong>1.70</strong></span><span>3PL + last mile <strong>2.30</strong></span></div>
          <button className="primary-button full" onClick={() => setDrawer({type:'cost'})}>Explain this number <ArrowRight size={16}/></button>
        </div>
      </section>
      <section className="insight-strip"><Sparkles size={18}/><div><strong>Why the cost changed</strong><p>Freight quote +AED 0.70 and FX movement +AED 0.50 explain the full AED 1.20 increase. No unexplained variance remains.</p></div></section>
    </div>
  );
}

function DocumentsPage({ setDrawer }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const filteredDocs = documentData.filter((d) => !q || [d.name, d.market, d.category, d.status].join(' ').toLowerCase().includes(q));
  return (
    <div className="page-wrap compact-page">
      <PageIntro kicker="DOCUMENTS & COMPLIANCE" title="See the dependency, not just the file." copy="Documents are mapped to the workflow they unlock. Missing or expiring files are surfaced only when they affect customs, compliance, marketplace setup or a launch milestone." action={<button className="quiet-button" onClick={() => setDrawer({ type: 'document', document: documentData.find((d) => d.tone === 'red' || d.tone === 'amber') })}><Upload size={16}/> Upload document</button>} />
      <section className="metric-grid">
        <MetricCard label="UAE readiness" value="100%" note="Active compliance clear" icon={ShieldCheck} />
        <MetricCard label="UK readiness" value="67%" note="4 of 6 requirements" icon={FileCheck2} />
        <MetricCard label="Needs action" value="2" note="1 UAE · 1 UK" icon={CircleAlert} />
        <MetricCard label="Expiring in 60d" value="0" note="No renewal risk" icon={CalendarDays} />
      </section>
      <section className="readiness-grid">
        <div className="readiness-card"><div className="readiness-top"><div><span>🇦🇪 UAE</span><strong>Ready to operate</strong></div><b>100%</b></div><div className="readiness-bar"><i style={{width:'100%'}}/></div><p>All current market registrations and operating documents are approved. One customs correction is shipment-specific.</p></div>
        <div className="readiness-card warning"><div className="readiness-top"><div><span>🇬🇧 UK</span><strong>4 of 6 complete</strong></div><b>67%</b></div><div className="readiness-bar"><i style={{width:'67%'}}/></div><p>Packaging artwork is the only brand-input blocker. VAT registration is progressing in parallel.</p></div>
      </section>
      <section className="panel data-panel">
        <div className="panel-header"><div><div className="section-kicker">REQUIREMENTS</div><h3>Documents mapped to outcomes</h3></div>
          <label className="filter-chip">
            <Search size={14}/>
            <input type="text" placeholder="Search documents" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search documents" />
          </label>
        </div>
        <div className="data-table document-table">
          <div className="data-row data-head"><span>Document</span><span>Market</span><span>Category</span><span>Status</span><span>What it unlocks</span><span></span></div>
          {filteredDocs.map((d) => (
            <button className="data-row clickable-row" key={d.name} onClick={() => setDrawer({type:'document', document:d})}>
              <span><strong>{d.name}</strong><small>{d.expiry !== '—' ? `Valid to ${d.expiry}` : 'No expiry date'}</small></span><span>{d.market}</span><span>{d.category}</span><span><i className={`status-chip ${d.tone}`}>{d.status}</i></span><span><strong>{d.dependency}</strong></span><span><ChevronRight size={16}/></span>
            </button>
          ))}
          {filteredDocs.length === 0 && <div className="empty-row">No documents match “{query}”.</div>}
        </div>
      </section>
    </div>
  );
}

function MarketCard({ market, onOpen }) {
  return (
    <button className="market-card" onClick={onOpen}>
      <div className="market-card-top">
        <div className="flag-wrap">{market.flag}</div>
        <div>
          <div className="market-name-row">
            <h3>{market.code}</h3>
            <span className={`status-chip ${market.stateTone}`}>{market.state}</span>
          </div>
          <p>{market.name}</p>
        </div>
        <ChevronRight className="market-chevron" size={20} />
      </div>
      <div className="market-card-status">
        <span className="status-dot green" />
        <strong>{market.accent}</strong>
        <span>{market.target}</span>
      </div>
      <div className="market-stats">
        <div><span>Revenue</span><strong>{market.revenue}</strong></div>
        <div><span>Inventory</span><strong>{market.inventory}</strong></div>
        <div><span>Shipments</span><strong>{market.shipment}</strong></div>
        <div><span>Compliance</span><strong>{market.compliance}</strong></div>
      </div>
      <div className="next-action">
        <span>Next</span>
        <strong>{market.nextAction}</strong>
      </div>
    </button>
  );
}

function ShipmentRow({ mode, id, route, status, eta, tone }) {
  const Icon = mode === 'sea' ? Ship : Plane;
  return (
    <div className="shipment-row">
      <div className="shipment-icon"><Icon size={17} /></div>
      <div className="shipment-id"><strong>{id}</strong><span>{route}</span></div>
      <span className={`status-chip ${tone}`}>{status}</span>
      <div className="shipment-eta"><span>ETA</span><strong>{eta}</strong></div>
    </div>
  );
}

function MarketDetail({ market, setMarketView, setDrawer }) {
  const isUK = market.code === 'UK';
  const journeyPercent = Math.round((market.day / 90) * 100);
  return (
    <div className="page-wrap">
      <button className="back-button" onClick={() => setMarketView(null)}>← All markets</button>

      <section className="market-hero">
        <div className="market-title-row">
          <div className="large-flag">{market.flag}</div>
          <div>
            <div className="market-name-row">
              <h1>{market.name}</h1>
              <span className={`status-chip ${market.stateTone}`}>{market.state}</span>
            </div>
            <p>{isUK ? 'India → UK · Ecommerce infrastructure' : 'India → UAE · Ecommerce infrastructure'}</p>
          </div>
        </div>
        <div className="market-health">
          <span className="status-dot green" />
          <div><strong>{market.accent}</strong><span>{market.target}</span></div>
        </div>
      </section>

      {isUK ? (
        <>
          <section className="launch-card">
            <div className="launch-summary">
              <div>
                <div className="section-kicker">90-DAY LAUNCH</div>
                <h2>Day {market.day} of 90</h2>
                <p>Your UK launch is on track. One item needs the brand team's input this week.</p>
              </div>
              <div className="launch-score">
                <div className="ring"><span>{journeyPercent}%</span></div>
                <small>journey complete</small>
              </div>
            </div>
            <div className="progress-track"><span style={{ width: `${journeyPercent}%` }} /></div>
            <div className="launch-dates">
              <span>Started · 21 Aug</span>
              <strong>Target go-live · 19 Nov</strong>
            </div>
          </section>

          <section className="timeline-panel">
            <div className="panel-header">
              <div>
                <div className="section-kicker">DEPENDENCY-AWARE PLAN</div>
                <h3>Launch journey</h3>
              </div>
              <span className="auto-pill"><Sparkles size={13} /> downstream dates recalculate automatically</span>
            </div>
            <div className="timeline-list">
              {timeline.map((item, idx) => (
                <div className={`timeline-item ${item.status}`} key={item.phase}>
                  <div className="timeline-rail">
                    <div className="timeline-node">
                      {item.status === 'done' ? <Check size={14} /> : item.phase}
                    </div>
                    {idx !== timeline.length - 1 && <div className="timeline-line" />}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-heading">
                      <div><h4>{item.title}</h4><p>{item.detail}</p></div>
                      <span>{item.date}</span>
                    </div>
                    {item.status === 'active' && (
                      <button className="dependency-card" onClick={() => setDrawer({ type: 'ukDependency' })}>
                        <AlertTriangle size={17} />
                        <div>
                          <span>BRAND INPUT NEEDED</span>
                          <strong>Upload corrected packaging artwork</strong>
                          <p>Due 03 Oct · completing this keeps the 19 Nov launch date unchanged.</p>
                        </div>
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="metric-grid">
            <MetricCard label="Net sales · 30d" value="AED 27,430" note="+18.4% vs prior 30d" icon={TrendingUp} />
            <MetricCard label="Inventory runway" value="34 days" note="Reorder by 12 Oct" icon={Boxes} />
            <MetricCard label="Orders · 30d" value="184" note="AED 149 avg. basket" icon={PackageCheck} />
            <MetricCard label="Next settlement" value="AED 18,420" note="Expected 02 Oct" icon={ReceiptText} />
          </section>

          <section className="two-column-market">
            <div className="panel">
              <div className="panel-header">
                <div><div className="section-kicker">OPERATIONS</div><h3>What Xeliport is handling</h3></div>
              </div>
              <LayerRow icon={FileCheck2} title="Compliance" value="Complete" note="All active requirements clear" tone="green" />
              <LayerRow icon={Ship} title="Shipping & customs" value="1 exception" note="XE-214 customs hold" tone="amber" onClick={() => setDrawer({ type: 'alert', alert: alerts[0] })} />
              <LayerRow icon={Warehouse} title="3PL & warehousing" value="Healthy" note="1,240 units available" tone="green" />
              <LayerRow icon={Globe2} title="Marketplace operations" value="Live" note="Amazon.ae + Noon synced" tone="green" />
              <LayerRow icon={CircleDollarSign} title="Banking & forex" value="Healthy" note="Next settlement 02 Oct" tone="green" />
            </div>
            <div className="panel money-panel detail-money">
              <div className="panel-header"><div><div className="section-kicker">UNIT ECONOMICS</div><h3>Landed cost</h3></div></div>
              <div className="big-number-row">
                <div><span>Current estimate</span><strong>AED 28.40</strong><small>per unit</small></div>
                <div className="delta up"><TrendingUp size={14} /> AED 1.20</div>
              </div>
              <p className="muted-copy">The system reconciles product cost, freight, customs, warehousing and FX into one explainable number.</p>
              <button className="primary-button full" onClick={() => setDrawer({ type: 'cost' })}>Why did this change? <ArrowRight size={16} /></button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function MetricCard({ label, value, note, icon: Icon }) {
  return (
    <div className="metric-card">
      <div className="metric-icon"><Icon size={17} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function LayerRow({ icon: Icon, title, value, note, tone, onClick }) {
  const Comp = onClick ? 'button' : 'div';
  return (
    <Comp className={`layer-row ${onClick ? 'clickable' : ''}`} onClick={onClick}>
      <div className="layer-icon"><Icon size={17} /></div>
      <div className="layer-copy"><strong>{title}</strong><span>{note}</span></div>
      <span className={`status-chip ${tone}`}>{value}</span>
      {onClick && <ChevronRight size={16} />}
    </Comp>
  );
}

function Drawer({ drawer, onClose, setDrawer, setMarketView }) {
  const content = useMemo(() => {
    if (drawer.type === 'alert') return <AlertDrawer alert={drawer.alert} onClose={onClose} />;
    if (drawer.type === 'cost') return <CostDrawer onClose={onClose} />;
    if (drawer.type === 'logic') return <LogicDrawer onClose={onClose} />;
    if (drawer.type === 'ukDependency') return <DependencyDrawer onClose={onClose} />;
    if (drawer.type === 'notifications') return <NotificationsDrawer onClose={onClose} setDrawer={setDrawer} />;
    if (drawer.type === 'shipment') return <ShipmentDrawer shipment={drawer.shipment} onClose={onClose} />;
    if (drawer.type === 'inventory') return <InventoryDrawer inventory={drawer.inventory} onClose={onClose} />;
    if (drawer.type === 'document') return <DocumentDrawer document={drawer.document} onClose={onClose} />;
    return null;
  }, [drawer, onClose, setDrawer, setMarketView]);

  return (
    <div className="drawer-layer" onMouseDown={onClose}>
      <div className="drawer" onMouseDown={(e) => e.stopPropagation()}>{content}</div>
    </div>
  );
}

function DrawerTop({ kicker, title, onClose }) {
  return (
    <div className="drawer-top">
      <div><div className="section-kicker">{kicker}</div><h2>{title}</h2></div>
      <button className="icon-button plain" onClick={onClose} aria-label="Close"><X size={19} /></button>
    </div>
  );
}

function AlertDrawer({ alert, onClose }) {
  return (
    <>
      <DrawerTop kicker={`${alert.market} · ${alert.severity.toUpperCase()} PRIORITY`} title={alert.title} onClose={onClose} />
      <div className="drawer-body">
        <div className={`impact-banner ${alert.severity}`}>
          <AlertTriangle size={18} />
          <div><span>Business impact</span><strong>{alert.impact}</strong></div>
        </div>

        <div className="detail-grid">
          <div><span>Owner</span><strong>{alert.owner}</strong></div>
          <div><span>Due</span><strong>{alert.due}</strong></div>
        </div>

        <div className="drawer-section">
          <h4>What happened</h4>
          <p>{alert.summary}</p>
        </div>

        <div className="drawer-section system-explanation">
          <Sparkles size={17} />
          <div><h4>Why Xeliport surfaced this</h4><p>{alert.system}</p></div>
        </div>

        <div className="drawer-section">
          <h4>Recommended next action</h4>
          <div className="recommendation-card">
            <div className="step-number">01</div>
            <div><strong>{alert.action}</strong><p>Xeliport will re-check the affected workflow after completion and update the downstream timeline automatically.</p></div>
          </div>
        </div>
      </div>
      <div className="drawer-footer">
        <button className="secondary-button" onClick={onClose}>Not now</button>
        <button className="primary-button" onClick={onClose}>{alert.action} <ArrowRight size={16} /></button>
      </div>
    </>
  );
}

function CostDrawer({ onClose }) {
  const rows = [
    ['Product cost', 'AED 21.60', '₹499 at 1 AED = ₹23.10'],
    ['Freight allocation', 'AED 2.80', 'Shipment XE-214 · 1 CBM'],
    ['Customs & clearance', 'AED 1.70', 'Current HS classification'],
    ['Warehousing', 'AED 1.10', 'Projected monthly allocation'],
    ['Last-mile reserve', 'AED 1.20', 'Blended marketplace estimate'],
  ];
  return (
    <>
      <DrawerTop kicker="UAE · EXPLAINABLE FINANCIALS" title="AED 28.40 landed cost" onClose={onClose} />
      <div className="drawer-body">
        <div className="cost-change-card">
          <div><span>Change since last estimate</span><strong>+ AED 1.20 / unit</strong></div>
          <TrendingUp size={22} />
        </div>
        <div className="cost-table">
          {rows.map(([label, amount, note]) => (
            <div className="cost-row" key={label}>
              <div><strong>{label}</strong><span>{note}</span></div>
              <strong>{amount}</strong>
            </div>
          ))}
          <div className="cost-row total"><div><strong>Total landed cost</strong><span>Updated 14 min ago</span></div><strong>AED 28.40</strong></div>
        </div>

        <div className="drawer-section">
          <h4>Why did it move?</h4>
          <div className="change-reason"><TrendingUp size={16} /><div><strong>Freight + AED 0.70</strong><span>Updated partner quote for XE-214</span></div></div>
          <div className="change-reason"><TrendingDown size={16} /><div><strong>FX + AED 0.50</strong><span>INR/AED moved since the previous estimate</span></div></div>
        </div>

        <div className="drawer-section source-box">
          <span>CALCULATION SOURCES</span>
          <p>Shipment XE-214 · supplier invoice · customs classification · 3PL rate card · live FX snapshot</p>
        </div>
      </div>
      <div className="drawer-footer">
        <button className="secondary-button" onClick={onClose}>Close</button>
        <button className="primary-button" onClick={onClose}>View source documents <ArrowRight size={16} /></button>
      </div>
    </>
  );
}

function LogicDrawer({ onClose }) {
  return (
    <>
      <DrawerTop kicker="TESLER'S LAW" title="The dashboard does the stitching for you" onClose={onClose} />
      <div className="drawer-body">
        <p className="drawer-intro">The operator shouldn't have to reconcile five operational systems just to know what needs attention.</p>
        <div className="logic-flow">
          {[
            ['01', 'Ingest', 'Shipment status, inventory, compliance, marketplace, settlement and FX signals'],
            ['02', 'Connect', 'Map dependencies across the 90-day launch plan and live operations'],
            ['03', 'Prioritise', 'Rank exceptions by customer impact, urgency and downstream risk'],
            ['04', 'Explain', 'Surface one simple decision with impact, owner, deadline and next action'],
          ].map(([num, title, copy]) => (
            <div className="logic-step" key={num}><span>{num}</span><div><strong>{title}</strong><p>{copy}</p></div></div>
          ))}
        </div>
        <div className="principle-quote">“The user sees the decision. Xeliport absorbs the operational complexity.”</div>
      </div>
    </>
  );
}

function DependencyDrawer({ onClose }) {
  return (
    <>
      <DrawerTop kicker="UK · LAUNCH DEPENDENCY" title="Packaging artwork" onClose={onClose} />
      <div className="drawer-body">
        <div className="impact-banner medium"><Clock3 size={18} /><div><span>Timeline impact</span><strong>Complete by 03 Oct to preserve the 19 Nov go-live target.</strong></div></div>
        <div className="drawer-section"><h4>What Xeliport needs</h4><p>Upload the revised UK packaging artwork with the requested label corrections. The compliance team will re-check it automatically.</p></div>
        <div className="drawer-section"><h4>What happens next</h4><div className="recommendation-card"><div className="step-number">01</div><div><strong>Compliance review</strong><p>Expected within one business day after upload.</p></div></div><div className="recommendation-card"><div className="step-number">02</div><div><strong>Shipping plan unlocks</strong><p>Freight booking and customs setup continue once the label is cleared.</p></div></div></div>
      </div>
      <div className="drawer-footer"><button className="secondary-button" onClick={onClose}>Close</button><button className="primary-button" onClick={onClose}>Upload artwork <ArrowRight size={16} /></button></div>
    </>
  );
}

function NotificationsDrawer({ onClose, setDrawer }) {
  return (
    <>
      <DrawerTop kicker="EXCEPTION CENTRE" title="3 items need attention" onClose={onClose} />
      <div className="drawer-body notifications-list">
        {alerts.map((alert) => (
          <button key={alert.id} className="notification-row" onClick={() => setDrawer({ type: 'alert', alert })}>
            <span className={`status-dot ${alert.severity === 'high' ? 'red' : alert.severity === 'medium' ? 'amber' : 'neutral'}`} />
            <div><span>{alert.market} · {alert.due}</span><strong>{alert.title}</strong><p>{alert.impact}</p></div>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
    </>
  );
}


function ShipmentDrawer({ shipment, onClose }) {
  const risky = shipment.id === 'XE-214';
  return (
    <>
      <DrawerTop kicker={`${shipment.market} · SHIPMENT ${shipment.id}`} title={shipment.route} onClose={onClose} />
      <div className="drawer-body">
        <div className={`impact-banner ${risky ? '' : shipment.tone === 'green' ? 'good' : 'medium'}`}>
          {risky ? <AlertTriangle size={18}/> : <Truck size={18}/>}
          <div><span>{risky ? 'Business impact' : 'Operational interpretation'}</span><strong>{risky ? 'Customs clearance may move replenishment by 2 days, but current stock still prevents an immediate stock-out.' : `${shipment.status}. Current downstream risk is ${shipment.risk.toLowerCase()}.`}</strong></div>
        </div>
        <div className="detail-grid"><div><span>ETA</span><strong>{shipment.eta}</strong></div><div><span>Inventory context</span><strong>{shipment.inventory}</strong></div></div>
        <div className="drawer-section"><h4>What the system connected</h4><p>Carrier status, customs state, warehouse inventory, sales velocity and the next replenishment requirement are evaluated together before deciding whether this shipment needs human attention.</p></div>
        <div className="drawer-section system-explanation"><Sparkles size={17}/><div><h4>Recommended next action</h4><p>{shipment.action}. Once resolved, Xeliport recalculates ETA-linked inventory and launch dependencies automatically.</p></div></div>
        <div className="drawer-section"><h4>Recent events</h4><div className="event-list"><div><span>14:08</span><strong>{shipment.status}</strong><p>Latest partner update received.</p></div><div><span>11:42</span><strong>Data reconciled</strong><p>Inventory runway recalculated against the updated ETA.</p></div><div><span>Yesterday</span><strong>Milestone confirmed</strong><p>Shipment documentation matched to this movement.</p></div></div></div>
      </div>
      <div className="drawer-footer"><button className="secondary-button" onClick={onClose}>Close</button>{shipment.action !== 'No action needed' && <button className="primary-button" onClick={onClose}>{shipment.action} <ArrowRight size={16}/></button>}</div>
    </>
  );
}

function InventoryDrawer({ inventory, onClose }) {
  const risk = inventory.state === 'Stock-out risk';
  return (
    <>
      <DrawerTop kicker={`${inventory.market} · ${inventory.sku}`} title={inventory.product} onClose={onClose} />
      <div className="drawer-body">
        <div className={`impact-banner ${risk ? 'medium' : 'good'}`}><Boxes size={18}/><div><span>{risk ? 'Predicted risk' : 'Inventory state'}</span><strong>{risk ? 'At current velocity, this SKU reaches zero roughly 5 days before the next inbound stock arrives.' : `${inventory.cover} of runway. No intervention is currently required.`}</strong></div></div>
        <div className="detail-grid"><div><span>Available</span><strong>{inventory.units} units</strong></div><div><span>Runway</span><strong>{inventory.cover}</strong></div><div><span>Demand velocity</span><strong>{inventory.demand}</strong></div><div><span>Incoming</span><strong>{inventory.incoming}</strong></div></div>
        {risk && <><div className="drawer-section"><h4>Recommended options</h4><div className="recommendation-card"><div className="step-number">A</div><div><strong>Pull forward 240 units</strong><p>Restores roughly a 7-day safety buffer with the least disruption.</p></div></div><div className="recommendation-card"><div className="step-number">B</div><div><strong>Expedite the existing shipment</strong><p>Higher freight cost, but preserves the original replenishment quantity.</p></div></div></div><div className="drawer-section system-explanation"><Sparkles size={17}/><div><h4>Why this was surfaced</h4><p>Xeliport combines warehouse stock, 14-day demand velocity and inbound ETA. The user sees the predicted gap instead of calculating it manually.</p></div></div></>}
      </div>
      <div className="drawer-footer"><button className="secondary-button" onClick={onClose}>Close</button>{risk && <button className="primary-button" onClick={onClose}>Review replenishment <ArrowRight size={16}/></button>}</div>
    </>
  );
}

function DocumentDrawer({ document, onClose }) {
  const needsAction = document.status === 'Action required' || document.status === 'Needs revision';
  return (
    <>
      <DrawerTop kicker={`${document.market} · ${document.category.toUpperCase()}`} title={document.name} onClose={onClose} />
      <div className="drawer-body">
        <div className={`impact-banner ${needsAction ? 'medium' : 'medium'}`}><FileText size={18}/><div><span>Workflow dependency</span><strong>{document.dependency}</strong></div></div>
        <div className="detail-grid"><div><span>Status</span><strong>{document.status}</strong></div><div><span>Validity</span><strong>{document.expiry === '—' ? 'Not applicable' : document.expiry}</strong></div></div>
        <div className="drawer-section"><h4>Why this document matters</h4><p>Xeliport maps documents to the operation they unlock, so the operator does not need to remember which compliance artifact affects which downstream workflow.</p></div>
        {needsAction ? <div className="drawer-section"><h4>Next action</h4><div className="recommendation-card"><div className="step-number">01</div><div><strong>{document.name.includes('artwork') ? 'Upload corrected artwork' : 'Upload corrected declaration'}</strong><p>After upload, the relevant compliance or customs workflow is re-checked automatically.</p></div></div></div> : <div className="drawer-section system-explanation"><CheckCircle2 size={17}/><div><h4>No action needed</h4><p>This document is current and its dependent workflow is not blocked.</p></div></div>}
      </div>
      <div className="drawer-footer"><button className="secondary-button" onClick={onClose}>Close</button>{needsAction && <button className="primary-button" onClick={onClose}><Upload size={16}/> Upload replacement</button>}</div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
