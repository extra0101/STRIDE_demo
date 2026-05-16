import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { mockAlternatives, calculateWeightedScore } from '../data';
import { STRATEGY_COLORS, type CircularStrategy } from '../types';
import type { CriteriaScores } from '../types';

const STAKEHOLDER_PROFILES = [
  { id: 'stk-engineer', name: 'Elena Kowalski', role: 'Engineer', color: '#3b82f6', avatar: 'EK',
    priorityWeights: { cost: 0.20, environmental: 0.10, energy: 0.15, circularity: 0.15, supplyChainRisk: 0.10 } },
  { id: 'stk-supply', name: 'Tom van Berg', role: 'Supply Chain', color: '#8b5cf6', avatar: 'TV',
    priorityWeights: { cost: 0.15, environmental: 0.05, energy: 0.05, circularity: 0.10, supplyChainRisk: 0.45 } },
  { id: 'stk-mgmt', name: 'Alex Chen', role: 'Management', color: '#f59e0b', avatar: 'AC',
    priorityWeights: { cost: 0.30, environmental: 0.10, energy: 0.10, circularity: 0.05, supplyChainRisk: 0.30 } },
  { id: 'stk-sustain', name: 'Maria Santos', role: 'Sustainability', color: '#10b981', avatar: 'MS',
    priorityWeights: { cost: 0.05, environmental: 0.35, energy: 0.30, circularity: 0.25, supplyChainRisk: 0.05 } },
];

interface StakeholderViewProps {
  height?: number;
}

export function StakeholderView({ height = 380 }: StakeholderViewProps) {
  const [activeStakeholder, setActiveStakeholder] = useState('stk-engineer');
  const stakeholder = STAKEHOLDER_PROFILES.find((s) => s.id === activeStakeholder)!;

  const ranked = [...mockAlternatives]
    .map((alt) => ({
      ...alt,
      score: calculateWeightedScore(alt, stakeholder.priorityWeights as Omit<CriteriaScores, 'technicalFeasibility'>),
    }))
    .sort((a, b) => b.score - a.score);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof ranked[number] }> }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    const rank = ranked.findIndex((r) => r.id === d.id) + 1;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{d.name}</p>
        <p>Weighted Score: <strong>{d.score.toFixed(1)}</strong></p>
        <p>Rank: <strong>#{rank}</strong></p>
      </div>
    );
  };

  return (
    <div className="viz-card">
      <div className="viz-card-header">
        <div>
          <h3 className="viz-card-title">Stakeholder Collaboration View</h3>
          <p className="viz-card-subtitle">Adopt a stakeholder perspective to see personalized rankings and trade-off priorities</p>
        </div>
      </div>
      <div className="stakeholder-tabs">
        {STAKEHOLDER_PROFILES.map((s) => (
          <button
            key={s.id}
            className={`stakeholder-tab ${activeStakeholder === s.id ? 'active' : ''}`}
            style={{ '--stk-color': s.color } as React.CSSProperties}
            onClick={() => setActiveStakeholder(s.id)}
          >
            <div className="stk-avatar" style={{ background: s.color }}>{s.avatar}</div>
            <div className="stk-info">
              <span className="stk-name">{s.name}</span>
              <span className="stk-role">{s.role}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="stk-weights">
        <p className="stk-weights-title">Priority weights for {stakeholder.name}:</p>
        <div className="stk-weight-grid">
          {Object.entries(stakeholder.priorityWeights).map(([key, val]) => (
            <div key={key} className="stk-weight-item">
              <span className="stk-weight-label">{key === 'supplyChainRisk' ? 'Supply Chain' : key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span className="stk-weight-value" style={{ color: stakeholder.color }}>{(val * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: Math.max(height - 200, 150) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ranked}
            layout="vertical"
            margin={{ top: 5, right: 50, bottom: 5, left: 110 }}
            barSize={32}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="strategy"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.1)' }} />
            <ReferenceLine x={50} stroke="#475569" strokeDasharray="3 3" />
            <Bar dataKey="score" name="Stakeholder Score" radius={[0, 4, 4, 0]}>
              {ranked.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={STRATEGY_COLORS[entry.strategy as CircularStrategy]}
                  fillOpacity={entry.id === ranked[0].id ? 1 : 0.6}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
