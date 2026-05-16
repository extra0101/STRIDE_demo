import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { mockAlternatives } from '../data';
import { STRATEGY_COLORS, CRITERIA_LABELS, type CircularStrategy } from '../types';

const CRITERIA_KEYS = ['cost', 'environmental', 'energy', 'circularity', 'supplyChainRisk', 'technicalFeasibility'] as const;

const CRITERIA_GROUPS: Record<string, string> = {
  cost: 'Financial',
  environmental: 'Environmental',
  energy: 'Environmental',
  circularity: 'Circularity',
  supplyChainRisk: 'Risk',
  technicalFeasibility: 'Feasibility',
};

const GROUP_COLORS: Record<string, string> = {
  Financial: '#f59e0b',
  Environmental: '#10b981',
  Circularity: '#8b5cf6',
  Risk: '#ef4444',
  Feasibility: '#3b82f6',
};

interface DecisionMatrixProps {
  height?: number;
}

interface StrategyData {
  strategy: string;
  label: string;
  color: string;
  cost: number;
  environmental: number;
  energy: number;
  circularity: number;
  supplyChainRisk: number;
  technicalFeasibility: number;
}

export function DecisionMatrix({ height = 400 }: DecisionMatrixProps) {
  const [activeView, setActiveView] = useState<'grouped' | 'radar' | 'compare'>('grouped');

  const strategyData: StrategyData[] = mockAlternatives.map((alt) => ({
    strategy: alt.strategy,
    label: alt.strategy.charAt(0).toUpperCase() + alt.strategy.slice(1),
    color: STRATEGY_COLORS[alt.strategy as CircularStrategy],
    cost: alt.scores.cost,
    environmental: alt.scores.environmental,
    energy: alt.scores.energy,
    circularity: alt.scores.circularity,
    supplyChainRisk: alt.scores.supplyChainRisk,
    technicalFeasibility: alt.scores.technicalFeasibility,
  }));

  const criteriaData = CRITERIA_KEYS.map((key) => ({
    criterion: CRITERIA_LABELS[key],
    key,
    group: CRITERIA_GROUPS[key],
    ...Object.fromEntries(strategyData.map((s) => [s.strategy, s[key as keyof StrategyData] as number])),
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof criteriaData[number] }> }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{d.criterion}</p>
        <p style={{ color: GROUP_COLORS[d.group], fontSize: 11, marginBottom: 6 }}>{d.group} Dimension</p>
        {strategyData.map((s) => (
          <p key={s.strategy} style={{ color: s.color }}>
            {s.label}: <strong>{d[s.strategy as keyof typeof d]}%</strong>
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="viz-card">
      <div className="viz-card-header">
        <div>
          <h3 className="viz-card-title">Decision Matrix — Full Comparison</h3>
          <p className="viz-card-subtitle">Compare all strategies across all 6 evaluation criteria simultaneously</p>
        </div>
      </div>
      <div className="criteria-tabs">
        <button className={`criteria-tab ${activeView === 'grouped' ? 'active' : ''}`} onClick={() => setActiveView('grouped')}>
          By Criterion
        </button>
        <button className={`criteria-tab ${activeView === 'compare' ? 'active' : ''}`} onClick={() => setActiveView('compare')}>
          By Strategy
        </button>
      </div>

      {activeView === 'grouped' && (
        <>
          <div style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={criteriaData}
                layout="vertical"
                margin={{ top: 5, right: 20, bottom: 5, left: 145 }}
                barSize={14}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  type="category"
                  dataKey="criterion"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={140}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.06)' }} />
                {mockAlternatives.map((alt) => (
                  <Bar
                    key={alt.id}
                    dataKey={alt.strategy}
                    name={alt.strategy.charAt(0).toUpperCase() + alt.strategy.slice(1)}
                    fill={STRATEGY_COLORS[alt.strategy]}
                    fillOpacity={0.8}
                    radius={[0, 3, 3, 0]}
                  />
                ))}
                <Legend
                  wrapperStyle={{ fontSize: 11, color: '#94a3b8', paddingTop: 8 }}
                  iconType="circle"
                  iconSize={8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="group-legend">
            {Object.entries(GROUP_COLORS).map(([group, color]) => (
              <div key={group} className="group-legend-item">
                <span className="group-dot" style={{ background: color }} />
                <span>{group}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {activeView === 'compare' && (
        <>
          <div style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={strategyData}
                layout="vertical"
                margin={{ top: 5, right: 20, bottom: 5, left: 110 }}
                barSize={18}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  label={{ value: 'Score (0–100)', position: 'insideBottom', offset: -2, fill: '#64748b', fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ fill: 'rgba(148,163,184,0.06)' }} content={<CustomTooltip2 />} />
                <Bar
                  dataKey="environmental"
                  name="Environmental"
                  stackId="env"
                  fill="#10b981"
                  fillOpacity={0.7}
                  radius={0}
                />
                <Bar
                  dataKey="energy"
                  name="Energy"
                  stackId="env"
                  fill="#059669"
                  fillOpacity={0.7}
                  radius={0}
                />
                <Bar
                  dataKey="circularity"
                  name="Circularity"
                  stackId="circ"
                  fill="#8b5cf6"
                  fillOpacity={0.7}
                  radius={0}
                />
                <Bar
                  dataKey="technicalFeasibility"
                  name="Feasibility"
                  stackId="other"
                  fill="#3b82f6"
                  fillOpacity={0.7}
                  radius={0}
                />
                <Bar
                  dataKey="cost"
                  name="Cost Perf."
                  stackId="other"
                  fill="#f59e0b"
                  fillOpacity={0.6}
                  radius={0}
                />
                <Bar
                  dataKey="supplyChainRisk"
                  name="Supply Risk"
                  stackId="other"
                  fill="#ef4444"
                  fillOpacity={0.5}
                  radius={[0, 3, 3, 0]}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: '#94a3b8', paddingTop: 8 }}
                  iconType="square"
                  iconSize={8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="heatmap-legend">
            <span className="legend-item" style={{ color: '#10b981' }}>Environmental</span>
            <span className="legend-item" style={{ color: '#059669' }}>Energy</span>
            <span className="legend-item" style={{ color: '#8b5cf6' }}>Circularity</span>
            <span className="legend-item" style={{ color: '#3b82f6' }}>Feasibility</span>
            <span className="legend-item" style={{ color: '#f59e0b' }}>Cost Perf.</span>
            <span className="legend-item" style={{ color: '#ef4444' }}>Supply Risk</span>
          </div>
        </>
      )}
    </div>
  );
}

const CustomTooltip2 = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: StrategyData }> }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="custom-tooltip">
      <p className="tooltip-title" style={{ color: d.color }}>{d.label}</p>
      <p>Environmental: <strong>{d.environmental}</strong></p>
      <p>Energy: <strong>{d.energy}</strong></p>
      <p>Circularity: <strong>{d.circularity}</strong></p>
      <p>Tech Feasibility: <strong>{d.technicalFeasibility}</strong></p>
      <p>Cost Perf.: <strong>{d.cost}</strong></p>
      <p>Supply Risk: <strong>{d.supplyChainRisk}</strong></p>
    </div>
  );
};
