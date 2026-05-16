import { useState } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Customized
} from 'recharts';
import { mockAlternatives } from '../data';
import { STRATEGY_COLORS, STRATEGY_LABELS, type CircularStrategy } from '../types';

type AxisKey = 'environmental' | 'cost' | 'energy' | 'circularity' | 'supplyChainRisk' | 'technicalFeasibility';

const AXIS_LABELS: Record<AxisKey, string> = {
  environmental: 'Environmental Score',
  cost: 'Cost Performance',
  energy: 'Energy Efficiency',
  circularity: 'Circularity Score',
  supplyChainRisk: 'Supply Chain Risk',
  technicalFeasibility: 'Technical Feasibility',
};

const AXIS_HINTS: Record<AxisKey, string> = {
  environmental: 'Lower is better: CO₂ footprint, waste, LCA impact',
  cost: 'Lower is better: TCO, material, manufacturing cost',
  energy: 'Lower is better: operational energy consumption',
  circularity: 'Higher is better: material recovery, reuse rate',
  supplyChainRisk: 'Lower is better: supplier dependency, lead time',
  technicalFeasibility: 'Higher is better: design maturity, risk level',
};

interface ParetoChartProps {
  height?: number;
}

interface ScatterData {
  id: string;
  name: string;
  strategy: CircularStrategy;
  x: number;
  y: number;
  z: number;
  isPareto: boolean;
}

export function ParetoChart({ height = 400 }: ParetoChartProps) {
  const [xKey, setXKey] = useState<AxisKey>('environmental');
  const [yKey, setYKey] = useState<AxisKey>('circularity');

  const frontier = (() => {
    const f = new Set<string>();
    for (const alt of mockAlternatives) {
      let isDominated = false;
      for (const other of mockAlternatives) {
        if (other.id === alt.id) continue;
        const xBetter = other.scores[xKey] >= alt.scores[xKey] && other.scores[xKey] > alt.scores[xKey];
        const yBetter = other.scores[yKey] >= alt.scores[yKey] && other.scores[yKey] > alt.scores[yKey];
        if (xBetter && yBetter) { isDominated = true; break; }
      }
      if (!isDominated) f.add(alt.id);
    }
    return f;
  })();

  const scatterData: ScatterData[] = mockAlternatives.map((alt) => ({
    id: alt.id,
    name: alt.name.replace('Baseline — ', '').replace('Reuse — ', '').replace('Repair — ', '').replace('Remanufacturing — ', '').replace('Recycling — ', ''),
    strategy: alt.strategy,
    x: alt.scores[xKey],
    y: alt.scores[yKey],
    z: alt.scores.technicalFeasibility,
    isPareto: frontier.has(alt.id),
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ScatterData }> }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{d.name}</p>
        <p style={{ color: STRATEGY_COLORS[d.strategy] }}>{STRATEGY_LABELS[d.strategy]}</p>
        <p>{AXIS_LABELS[xKey]}: <strong>{d.x}</strong></p>
        <p>{AXIS_LABELS[yKey]}: <strong>{d.y}</strong></p>
        <p>Tech Feasibility: <strong>{d.z}%</strong></p>
        <p className="tooltip-badge">{d.isPareto ? 'Pareto Optimal' : 'Dominated'}</p>
      </div>
    );
  };

  const dotRadius = Math.max(8, Math.min(16, height / 22));

  const paretoLabelStyle = {
    fill: '#f59e0b',
    fontSize: Math.max(10, Math.min(13, height / 32)),
    fontWeight: 700,
    fontFamily: 'inherit',
  };

  const ParetoLabels = ({ xScale, yScale }: {
    xScale?: (v: number) => number; yScale?: (v: number) => number;
  }) => {
    if (!xScale || !yScale) return null;
    const labelOffset = dotRadius + 14;
    return (
      <>
        {scatterData.filter((d) => d.isPareto).map((entry) => (
          <g key={`label-svg-${entry.id}`}>
            <text
              x={(xScale(entry.x) ?? 0) + labelOffset}
              y={(yScale(entry.y) ?? 0) - 4}
              {...paretoLabelStyle}
            >
              {entry.name}
            </text>
            <line
              x1={(xScale(entry.x) ?? 0) + dotRadius + 6}
              y1={(yScale(entry.y) ?? 0)}
              x2={(xScale(entry.x) ?? 0) + labelOffset - 2}
              y2={(yScale(entry.y) ?? 0) - 4}
              stroke="#f59e0b"
              strokeWidth={1}
              strokeDasharray="2,2"
              opacity={0.6}
            />
          </g>
        ))}
      </>
    );
  };

  return (
    <div className="viz-card">
      <div className="viz-card-header">
        <div>
          <h3 className="viz-card-title">Pareto Frontier Analysis</h3>
          <p className="viz-card-subtitle">Bubble size = Technical Feasibility</p>
        </div>
      </div>
      <div className="axis-selectors">
        <div className="axis-selector">
          <div className="axis-selector-row">
            <label>X-Axis:</label>
            <select value={xKey} onChange={(e) => setXKey(e.target.value as AxisKey)}>
              {(Object.keys(AXIS_LABELS) as AxisKey[]).map((k) => (
                <option key={k} value={k}>{AXIS_LABELS[k]}</option>
              ))}
            </select>
            <span className="axis-hint">{AXIS_HINTS[xKey]}</span>
          </div>
        </div>
        <div className="axis-selector">
          <div className="axis-selector-row">
            <label>Y-Axis:</label>
            <select value={yKey} onChange={(e) => setYKey(e.target.value as AxisKey)}>
              {(Object.keys(AXIS_LABELS) as AxisKey[]).map((k) => (
                <option key={k} value={k}>{AXIS_LABELS[k]}</option>
              ))}
            </select>
            <span className="axis-hint">{AXIS_HINTS[yKey]}</span>
          </div>
        </div>
      </div>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 30, bottom: 45, left: 15 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              tickLine={{ stroke: '#334155' }}
              axisLine={{ stroke: '#334155' }}
              label={{
                value: AXIS_LABELS[xKey],
                position: 'insideBottom',
                offset: -8,
                fill: '#64748b',
                fontSize: 11,
                fontWeight: 600,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              tickLine={{ stroke: '#334155' }}
              axisLine={{ stroke: '#334155' }}
              label={{
                value: AXIS_LABELS[yKey],
                angle: -90,
                position: 'insideLeft',
                offset: 12,
                fill: '#64748b',
                fontSize: 11,
                fontWeight: 600,
              }}
            />
            <ZAxis type="number" dataKey="z" range={[60, 380]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#334155' }} />

            {/* Outer glow for Pareto points */}
            <Scatter name="ParetoGlow" data={scatterData.filter((d) => d.isPareto)}>
              {scatterData.filter((d) => d.isPareto).map((entry) => (
                <Cell
                  key={`glow-${entry.id}`}
                  fill="#f59e0b"
                  fillOpacity={0.15}
                  strokeWidth={0}
                  r={dotRadius * 2 + 8}
                />
              ))}
            </Scatter>

            {/* Halo layer for non-Pareto points */}
            <Scatter name="Halos" data={scatterData.filter((d) => !d.isPareto)}>
              {scatterData.filter((d) => !d.isPareto).map((entry) => (
                <Cell
                  key={`halo-${entry.id}`}
                  fill={STRATEGY_COLORS[entry.strategy]}
                  fillOpacity={0.2}
                  strokeWidth={0}
                  r={dotRadius + 4}
                />
              ))}
            </Scatter>

            <Scatter name="Design Alternatives" data={scatterData}>
              {scatterData.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={entry.isPareto ? '#f59e0b' : STRATEGY_COLORS[entry.strategy]}
                  fillOpacity={entry.isPareto ? 1 : 0.6}
                  stroke={entry.isPareto ? '#fbbf24' : STRATEGY_COLORS[entry.strategy]}
                  strokeWidth={entry.isPareto ? 3 : 1}
                  r={entry.isPareto ? dotRadius + 6 : dotRadius}
                />
              ))}
            </Scatter>

            <Customized component={<ParetoLabels />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="pareto-legend">
        <div className="pareto-legend-item">
          <span className="pareto-dot" style={{ background: '#f59e0b', boxShadow: '0 0 8px #f59e0b88', width: 12, height: 12 }} />
          <span>Pareto Optimal</span>
        </div>
        {scatterData.map((d) => (
          <div key={d.id} className="pareto-legend-item">
            <span
              className="pareto-dot"
              style={{ background: STRATEGY_COLORS[d.strategy], width: 8, height: 8, opacity: 0.7 }}
            />
            <span>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
