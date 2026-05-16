import { useState } from 'react';
import { RadarComparison } from './components/RadarComparison';
import { ParetoChart } from './components/ParetoChart';
import { DecisionMatrix } from './components/DecisionMatrix';
import { TradeoffPanel } from './components/TradeoffPanel';
import { DesignDetail } from './components/DesignDetail';
import { StakeholderView } from './components/StakeholderView';
import { ProductShowcase } from './components/ProductShowcase';
import { Activity, BarChart2, GitBranch, Grid, Layers, Users } from 'lucide-react';
import type { CircularStrategy } from './types';
import './index.css';

type Tab = 'overview' | 'pareto' | 'matrix' | 'tradeoff' | 'design' | 'collaborate';

const TABS = [
  { id: 'overview' as Tab, label: 'Overview', icon: Activity },
  { id: 'pareto' as Tab, label: 'Pareto Analysis', icon: GitBranch },
  { id: 'matrix' as Tab, label: 'Decision Matrix', icon: Grid },
  { id: 'tradeoff' as Tab, label: 'Trade-off Ranking', icon: BarChart2 },
  { id: 'design' as Tab, label: 'Design Explorer', icon: Layers },
  { id: 'collaborate' as Tab, label: 'Stakeholder View', icon: Users },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [radarStrategies, setRadarStrategies] = useState<CircularStrategy[]>(['reuse', 'repair', 'remanufacture']);

  const toggleStrategy = (s: CircularStrategy) => {
    setRadarStrategies((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#10b981" strokeWidth="2" />
              <path d="M7 14C7 14 10 8 14 8C18 8 21 14 21 14C21 14 18 20 14 20C10 20 7 14 7 14Z" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.5" />
              <circle cx="14" cy="14" r="3" fill="#10b981" />
              <path d="M14 5V8M14 20V23M5 14H8M20 14H23" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="header-title">STRIDE — Circular Design Decision Support</h1>
            <p className="header-subtitle">Multi-Criteria Evaluation Platform for High-Tech Manufacturing</p>
          </div>
        </div>
        <div className="header-meta">
          <div className="meta-badge">
            <span className="meta-dot" />
            Live Demo
          </div>
          <div className="meta-badge secondary">
            TU/e · STRIDE Project
          </div>
        </div>
      </header>

      <nav className="tab-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={15} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === 'overview' && (
          <div className="tab-panel">
            <div className="overview-intro">
              <div className="intro-card">
                <h2>STRIDE — Circular Design Decision Support Environment</h2>
                <p>
                  Interactive multi-criteria decision support platform for circular product design, developed as part of
                  the <strong>STRIDE project</strong> at TU/e in collaboration with industry leaders.
                  This demo evaluates <strong>5 circular design alternatives</strong> across <strong>6 evaluation criteria</strong>
                  to support engineering and supply chain stakeholders in selecting the optimal circular design strategy.
                </p>
                <div className="intro-stats">
                  <div className="stat-item">
                    <span className="stat-number">5</span>
                    <span className="stat-label">Design Alternatives</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">6</span>
                    <span className="stat-label">Evaluation Criteria</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">4</span>
                    <span className="stat-label">Stakeholder Profiles</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">5</span>
                    <span className="stat-label">Industry Partners</span>
                  </div>
                </div>
              </div>
            </div>

            <ProductShowcase />

            <div className="overview-grid">
              <RadarComparison
                selectedStrategies={radarStrategies}
                onToggle={toggleStrategy}
                height={360}
              />
              <ParetoChart height={360} />
            </div>
            <div className="overview-bottom">
              <TradeoffPanel height={380} />
            </div>
          </div>
        )}

        {activeTab === 'pareto' && (
          <div className="tab-panel">
            <div className="panel-intro">
              <h2>Pareto Frontier Analysis</h2>
              <p>Identify non-dominated design alternatives that represent optimal trade-offs between selected criteria. Orange-highlighted points lie on the Pareto frontier.</p>
            </div>
            <ParetoChart height={520} />
            <div className="panel-cards">
              <TradeoffPanel height={420} />
              <div className="viz-card">
                <div className="viz-card-header">
                  <div>
                    <h3 className="viz-card-title">Key Findings</h3>
                    <p className="viz-card-subtitle">Pareto-optimal strategies at a glance</p>
                  </div>
                </div>
                <div className="stakeholder-comments">
                  <div className="comment-item">
                    <div className="comment-header">
                      <span style={{ color: '#f59e0b', fontSize: 20 }}>★</span>
                      <span className="comment-author">Pareto Optimal: Remanufacturing</span>
                    </div>
                    <p className="comment-text">Dominates across environmental and circularity dimensions simultaneously — the strongest overall performer.</p>
                  </div>
                  <div className="comment-item">
                    <div className="comment-header">
                      <span style={{ color: '#f59e0b', fontSize: 20 }}>★</span>
                      <span className="comment-author">Pareto Optimal: Repair</span>
                    </div>
                    <p className="comment-text">Best energy efficiency and lowest supply chain risk — ideal for low-complexity, high-supply-chain-dependency scenarios.</p>
                  </div>
                  <div className="comment-item">
                    <div className="comment-header">
                      <span style={{ color: '#64748b', fontSize: 20 }}>☆</span>
                      <span className="comment-author">Dominated: Baseline (Linear)</span>
                    </div>
                    <p className="comment-text">Outperformed by repair and remanufacturing across most criteria — least preferred strategy.</p>
                  </div>
                  <div className="comment-item">
                    <div className="comment-header">
                      <span style={{ color: '#64748b', fontSize: 20 }}>☆</span>
                      <span className="comment-author">Dominated: Reuse</span>
                    </div>
                    <p className="comment-text">Good cost performance but outperformed on environmental and circularity by remanufacturing.</p>
                  </div>
                  <div className="comment-item">
                    <div className="comment-header">
                      <span style={{ color: '#64748b', fontSize: 20 }}>☆</span>
                      <span className="comment-author">Dominated: Recycling</span>
                    </div>
                    <p className="comment-text">Highest circularity score but poor cost performance and technical feasibility — trade-off penalty.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="tab-panel">
            <div className="panel-intro">
              <h2>Decision Matrix Heatmap</h2>
              <p>Compare how each design alternative scores on every evaluation criterion. Use the criterion tabs to focus on specific dimensions of interest.</p>
            </div>
            <DecisionMatrix height={480} />
            <div className="panel-cards">
              <DesignDetail height={460} />
              <div className="viz-card">
                <div className="viz-card-header">
                  <div>
                    <h3 className="viz-card-title">Score Interpretation Guide</h3>
                    <p className="viz-card-subtitle">What each criterion measures</p>
                  </div>
                </div>
                <div className="stakeholder-comments">
                  <div className="comment-item">
                    <span className="comment-author">Cost Performance</span>
                    <p className="comment-text">Total cost of ownership including material, manufacturing, and end-of-life costs. Lower is better for cost-driven decisions.</p>
                  </div>
                  <div className="comment-item">
                    <span className="comment-author">Environmental Impact</span>
                    <p className="comment-text">LCA-based CO₂ footprint, waste generation, and resource depletion. Lower score = better environmental outcome.</p>
                  </div>
                  <div className="comment-item">
                    <span className="comment-author">Energy Efficiency</span>
                    <p className="comment-text">Operational energy consumption across the product lifecycle. Lower energy demand indicates higher efficiency.</p>
                  </div>
                  <div className="comment-item">
                    <span className="comment-author">Circularity Score</span>
                    <p className="comment-text">Material recovery rate, reuse potential, and design-for-disassembly compliance. Higher is better.</p>
                  </div>
                  <div className="comment-item">
                    <span className="comment-author">Supply Chain Risk</span>
                    <p className="comment-text">Supplier dependency, lead time variability, and geopolitical exposure. Lower is more resilient.</p>
                  </div>
                  <div className="comment-item">
                    <span className="comment-author">Technical Feasibility</span>
                    <p className="comment-text">Design maturity, manufacturing complexity, and technology readiness level (TRL). Higher is more viable.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tradeoff' && (
          <div className="tab-panel">
            <div className="panel-intro">
              <h2>Trade-off Analysis &amp; Weighted Ranking</h2>
              <p>Apply different stakeholder weighting schemes to see how priorities shift the ranking of circular design alternatives. Adjust the stakeholder profile to see how different perspectives reshape the optimal choice.</p>
            </div>
            <TradeoffPanel height={480} />
            <div className="panel-cards">
              <ParetoChart height={420} />
              <div className="viz-card">
                <div className="viz-card-header">
                  <div>
                    <h3 className="viz-card-title">Stakeholder Weight Profiles</h3>
                    <p className="viz-card-subtitle">Priority emphasis by role</p>
                  </div>
                </div>
                <div className="stk-weights" style={{ marginBottom: 12 }}>
                  <div className="stk-weights-title">Engineering Perspective</div>
                  <div className="stk-weight-grid">
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>15%</div><div className="stk-weight-label">Cost</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>10%</div><div className="stk-weight-label">Environmental</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>20%</div><div className="stk-weight-label">Energy</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>15%</div><div className="stk-weight-label">Circularity</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>15%</div><div className="stk-weight-label">Supply Chain</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>25%</div><div className="stk-weight-label">Feasibility</div></div>
                  </div>
                </div>
                <div className="stk-weights" style={{ marginBottom: 12 }}>
                  <div className="stk-weights-title">Supply Chain Perspective</div>
                  <div className="stk-weight-grid">
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>10%</div><div className="stk-weight-label">Cost</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>10%</div><div className="stk-weight-label">Environmental</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>15%</div><div className="stk-weight-label">Energy</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>15%</div><div className="stk-weight-label">Circularity</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>35%</div><div className="stk-weight-label">Supply Chain</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>15%</div><div className="stk-weight-label">Feasibility</div></div>
                  </div>
                </div>
                <div className="stk-weights" style={{ marginBottom: 12 }}>
                  <div className="stk-weights-title">Sustainability Perspective</div>
                  <div className="stk-weight-grid">
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>10%</div><div className="stk-weight-label">Cost</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>30%</div><div className="stk-weight-label">Environmental</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>15%</div><div className="stk-weight-label">Energy</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>30%</div><div className="stk-weight-label">Circularity</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>10%</div><div className="stk-weight-label">Supply Chain</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>5%</div><div className="stk-weight-label">Feasibility</div></div>
                  </div>
                </div>
                <div className="stk-weights">
                  <div className="stk-weights-title">Management Perspective</div>
                  <div className="stk-weight-grid">
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>25%</div><div className="stk-weight-label">Cost</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>15%</div><div className="stk-weight-label">Environmental</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>10%</div><div className="stk-weight-label">Energy</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>15%</div><div className="stk-weight-label">Circularity</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>15%</div><div className="stk-weight-label">Supply Chain</div></div>
                    <div className="stk-weight-item"><div className="stk-weight-value" style={{ color: '#94a3b8' }}>20%</div><div className="stk-weight-label">Feasibility</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="tab-panel">
            <div className="panel-intro">
              <h2>Design Alternatives Explorer</h2>
              <p>Drill into individual design alternatives to see detailed component-level changes, design rationale, and stakeholder feedback for each circular strategy.</p>
            </div>
            <DesignDetail height={560} />
          </div>
        )}

        {activeTab === 'collaborate' && (
          <div className="tab-panel">
            <div className="panel-intro">
              <h2>Stakeholder Collaboration Environment</h2>
              <p>Adopt different stakeholder perspectives to see how engineering, supply chain, management, and sustainability priorities lead to different optimal designs.</p>
            </div>
            <StakeholderView height={480} />
            <div className="panel-cards">
              <TradeoffPanel height={420} />
              <RadarComparison
                selectedStrategies={['baseline', 'reuse', 'repair', 'remanufacture', 'recycling']}
                onToggle={toggleStrategy}
                height={420}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>STRIDE — Strategic Design for Circular High-Tech Manufacturing &nbsp;|&nbsp; TU/e Industrial Engineering &amp; Innovation Sciences</p>
        <p>Contact: <a href="mailto:z.atan@tue.nl">z.atan@tue.nl</a> &nbsp;|&nbsp; PhD Position Reference: 2026/213</p>
      </footer>
    </div>
  );
}
