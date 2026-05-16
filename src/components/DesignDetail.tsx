import { useState } from 'react';
import { mockAlternatives } from '../data';
import { STRATEGY_COLORS, STRATEGY_LABELS, type DesignAlternative } from '../types';
import { Star, Wrench, Users } from 'lucide-react';

const ROLE_ICONS: Record<string, string> = {
  engineer: 'EK',
  supply_chain: 'TV',
  management: 'AC',
  sustainability: 'MS',
  sustainability_expert: 'MM',
};

const ROLE_COLORS: Record<string, string> = {
  engineer: '#3b82f6',
  supply_chain: '#8b5cf6',
  management: '#f59e0b',
  sustainability: '#10b981',
  sustainability_expert: '#10b981',
};

interface DesignDetailProps {
  height?: number;
}

export function DesignDetail({ height = 450 }: DesignDetailProps) {
  const [selectedAlt, setSelectedAlt] = useState<DesignAlternative>(mockAlternatives[1]);

  return (
    <div className="viz-card">
      <div className="viz-card-header">
        <div>
          <h3 className="viz-card-title">Design Alternatives Explorer</h3>
          <p className="viz-card-subtitle">Inspect detailed scores, component changes, and stakeholder feedback</p>
        </div>
      </div>
      <div className="design-detail-layout">
        <div className="alt-selector">
          {mockAlternatives.map((alt) => (
            <button
              key={alt.id}
              className={`alt-selector-btn ${selectedAlt.id === alt.id ? 'active' : ''}`}
              style={{ '--alt-color': STRATEGY_COLORS[alt.strategy] } as React.CSSProperties}
              onClick={() => setSelectedAlt(alt)}
            >
              <span className="alt-dot" style={{ background: STRATEGY_COLORS[alt.strategy] }} />
              <span className="alt-selector-name">{alt.strategy.charAt(0).toUpperCase() + alt.strategy.slice(1)}</span>
            </button>
          ))}
        </div>

        <div className="alt-content" style={{ height }}>
          <div className="alt-header">
            <div>
              <h4 className="alt-title">{selectedAlt.name}</h4>
              <span className="alt-strategy-badge" style={{ background: STRATEGY_COLORS[selectedAlt.strategy] }}>
                {STRATEGY_LABELS[selectedAlt.strategy]}
              </span>
            </div>
            <p className="alt-description">{selectedAlt.description}</p>
          </div>

          <div className="scores-grid">
            {Object.entries(selectedAlt.scores).map(([key, value]) => (
              <div key={key} className="score-item">
                <span className="score-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                <div className="score-bar-track">
                  <div
                    className="score-bar-fill"
                    style={{
                      width: `${value}%`,
                      background: value >= 75 ? '#10b981' : value >= 50 ? '#3b82f6' : value >= 25 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                </div>
                <span className="score-value">{value}</span>
              </div>
            ))}
          </div>

          {selectedAlt.componentChanges.length > 0 && (
            <div className="component-changes">
              <h5 className="section-title">
                <Wrench size={13} />
                Design Modifications ({selectedAlt.componentChanges.length})
              </h5>
              {selectedAlt.componentChanges.map((change) => (
                <div key={change.componentId} className="change-item">
                  <span className="change-name">{change.componentName}</span>
                  <span className="change-type-badge">{change.changeType}</span>
                  <p className="change-detail">
                    <span className="change-old">Before: {change.originalDesign}</span>
                    <span className="change-new">After: {change.newDesign}</span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {selectedAlt.stakeholderComments.length > 0 && (
            <div className="stakeholder-comments">
              <h5 className="section-title">
                <Users size={13} />
                Stakeholder Feedback
              </h5>
              {selectedAlt.stakeholderComments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <div
                      className="comment-avatar"
                      style={{ background: ROLE_COLORS[comment.role] }}
                    >
                      {ROLE_ICONS[comment.role]}
                    </div>
                    <div>
                      <span className="comment-author">{comment.stakeholder}</span>
                      <span className="comment-role">{comment.role.replace('_', ' ')}</span>
                    </div>
                    <div className="comment-stars">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          fill={s <= comment.rating ? '#f59e0b' : 'transparent'}
                          color={s <= comment.rating ? '#f59e0b' : '#475569'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="comment-text">{comment.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
