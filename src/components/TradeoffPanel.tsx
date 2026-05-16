import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { mockAlternatives, weightPresets, calculateWeightedScore } from '../data';
import { STRATEGY_COLORS, type CircularStrategy } from '../types';
import { TrendingUp } from 'lucide-react';

interface TradeoffPanelProps {
  height?: number;
}

export function TradeoffPanel({ height = 420 }: TradeoffPanelProps) {
  const [activePreset, setActivePreset] = useState('preset-balanced');
  const preset = weightPresets.find((p) => p.id === activePreset)!;

  const ranked = [...mockAlternatives]
    .map((alt) => ({
      ...alt,
      weightedScore: calculateWeightedScore(alt, preset.weights),
    }))
    .sort((a, b) => b.weightedScore - a.weightedScore);

  const topAlt = ranked[0];

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof ranked[number] }> }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{d.name}</p>
        <p>Weighted Score: <strong>{d.weightedScore.toFixed(1)}</strong></p>
        <p>Rank: <strong>#{ranked.findIndex((r) => r.id === d.id) + 1}</strong></p>
      </div>
    );
  };

  return (
    <div className="viz-card">
      <div className="viz-card-header">
        <div>
          <h3 className="viz-card-title">Trade-off Analysis &amp; Ranking</h3>
          <p className="viz-card-subtitle">Weighted multi-criteria evaluation — select a stakeholder perspective</p>
        </div>
        <div className="rank-badge">
          <TrendingUp size={14} />
          <span>#1 Ranked</span>
        </div>
      </div>

      <div className="preset-selector">
        {weightPresets.map((p) => (
          <button
            key={p.id}
            className={`preset-btn ${activePreset === p.id ? 'active' : ''}`}
            style={{ '--preset-color': p.color } as React.CSSProperties}
            onClick={() => setActivePreset(p.id)}
          >
            <span className="preset-dot" style={{ background: p.color }} />
            <span className="preset-name">{p.name}</span>
          </button>
        ))}
      </div>

      <div className="weight-bars">
        <p className="weight-bars-title">Active Weights — {preset.name}</p>
        {Object.entries(preset.weights).map(([key, value]) => (
          <div key={key} className="weight-row">
            <span className="weight-label">{key === 'supplyChainRisk' ? 'Supply Chain' : key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <div className="weight-bar-track">
              <div
                className="weight-bar-fill"
                style={{
                  width: `${value * 100}%`,
                  background: preset.color,
                }}
              />
            </div>
            <span className="weight-value">{(value * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>

      <div style={{ height: Math.max(height - 220, 160) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ranked}
            layout="vertical"
            margin={{ top: 5, right: 40, bottom: 5, left: 100 }}
            barSize={28}
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
            <ReferenceLine x={50} stroke="#475569" strokeDasharray="3 3" label={{ value: 'Midpoint', fill: '#64748b', fontSize: 10, position: 'top' }} />
            <Bar dataKey="weightedScore" name="Weighted Score" radius={[0, 4, 4, 0]}>
              {ranked.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={STRATEGY_COLORS[entry.strategy as CircularStrategy]}
                  fillOpacity={entry.id === topAlt.id ? 1 : 0.75}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
