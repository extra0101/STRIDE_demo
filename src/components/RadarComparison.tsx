import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { mockAlternatives } from '../data';
import { STRATEGY_COLORS, CRITERIA_LABELS, type CircularStrategy } from '../types';

const RADAR_KEYS = ['cost', 'environmental', 'energy', 'circularity', 'supplyChainRisk'] as const;

interface RadarComparisonProps {
  selectedStrategies: CircularStrategy[];
  onToggle: (s: CircularStrategy) => void;
  height?: number;
}

function buildRadarData(strategies: CircularStrategy[]) {
  return RADAR_KEYS.map((key) => {
    const entry: Record<string, string | number> = { criterion: CRITERIA_LABELS[key] };
    for (const strat of strategies) {
      const alt = mockAlternatives.find((a) => a.strategy === strat);
      if (alt) entry[strat] = alt.scores[key];
    }
    return entry;
  });
}

export function RadarComparison({ selectedStrategies, onToggle, height = 380 }: RadarComparisonProps) {
  const data = buildRadarData(selectedStrategies);
  const allStrategies = ['baseline', 'reuse', 'repair', 'remanufacture', 'recycling'] as CircularStrategy[];

  return (
    <div className="viz-card">
      <div className="viz-card-header">
        <div>
          <h3 className="viz-card-title">Multi-Criteria Radar Comparison</h3>
          <p className="viz-card-subtitle">Toggle strategies to compare performance across evaluation dimensions</p>
        </div>
      </div>
      <div className="strategy-toggles">
        {allStrategies.map((s) => (
          <label key={s} className="strategy-toggle" style={{ '--accent': STRATEGY_COLORS[s] } as React.CSSProperties}>
            <input
              type="checkbox"
              checked={selectedStrategies.includes(s)}
              onChange={() => onToggle(s)}
            />
            <span className="toggle-dot" style={{ background: STRATEGY_COLORS[s] }} />
            <span className="toggle-label">{s.charAt(0).toUpperCase() + s.slice(1)}</span>
          </label>
        ))}
      </div>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="criterion" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
            {selectedStrategies.map((s) => (
              <Radar
                key={s}
                name={s.charAt(0).toUpperCase() + s.slice(1)}
                dataKey={s}
                stroke={STRATEGY_COLORS[s]}
                fill={STRATEGY_COLORS[s]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            ))}
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#e2e8f0' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
