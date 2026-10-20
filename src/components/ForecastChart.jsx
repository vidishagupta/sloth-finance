import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function ForecastChart({ monthlyBleed = 150 }) {
  const [activePoint, setActivePoint] = useState(null);

  // Projection milestones
  const points = [
    { label: "Today", month: 0, bleed: 0, saved: 0 },
    { label: "3 Months", month: 3, bleed: monthlyBleed * 3, saved: monthlyBleed * 3 },
    { label: "6 Months", month: 6, bleed: monthlyBleed * 6, saved: monthlyBleed * 6 },
    { label: "1 Year", month: 12, bleed: monthlyBleed * 12, saved: monthlyBleed * 12 },
    { label: "2 Years", month: 24, bleed: monthlyBleed * 24, saved: monthlyBleed * 24 },
    { label: "3 Years", month: 36, bleed: monthlyBleed * 36, saved: monthlyBleed * 36 }
  ];

  const maxVal = monthlyBleed * 36;
  const svgWidth = 720;
  const svgHeight = 260;
  const paddingX = 60;
  const paddingY = 40;

  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  // Calculate SVG coordinates
  const coords = points.map((p, i) => {
    const x = paddingX + (i / (points.length - 1)) * chartW;
    const y = svgHeight - paddingY - (p.bleed / (maxVal || 1)) * chartH;
    return { ...p, x, y };
  });

  // Path for Do-Nothing line (climbing cash bleed)
  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');

  // Area path for shaded savings
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${svgHeight - paddingY} L ${coords[0].x} ${svgHeight - paddingY} Z`;

  return (
    <div className="forecast-card glass-panel">
      <div className="forecast-header">
        <div>
          <div className="forecast-tag">
            <Sparkles size={14} color="var(--color-gold)" />
            <span>TabPFN Predictive Trajectory</span>
          </div>
          <h3 className="forecast-title">3-Year Cumulative Cash Bleed Forecast</h3>
          <p className="forecast-subtitle">
            See the compounding cost of human financial inertia vs. clicking 1-click cancel today.
          </p>
        </div>

        <div className="forecast-stat-badge">
          <div className="badge-subtitle">Projected 3-Year Waste</div>
          <div className="badge-amount">${(monthlyBleed * 36).toFixed(0)}</div>
        </div>
      </div>

      <div className="chart-container">
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          className="svg-chart"
          onMouseLeave={() => setActivePoint(null)}
        >
          <defs>
            <linearGradient id="savingsShade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e97b77" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e97b77" stopOpacity="0.02" />
            </linearGradient>

            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f5b726" />
              <stop offset="100%" stopColor="#e97b77" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = svgHeight - paddingY - ratio * chartH;
            return (
              <g key={idx} opacity="0.3">
                <line x1={paddingX} y1={y} x2={svgWidth - paddingX} y2={y} stroke="var(--border-subtle)" strokeDasharray="3 3" />
                <text x={paddingX - 10} y={y + 4} fill="var(--text-muted)" fontSize="11" textAnchor="end" fontFamily="monospace">
                  ${Math.round(ratio * maxVal)}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill="url(#savingsShade)" />

          {/* Do Nothing Line */}
          <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="3.5" strokeLinecap="round" />

          {/* Sloth Optimized Flatline (Baseline at $0) */}
          <line
            x1={paddingX}
            y1={svgHeight - paddingY}
            x2={svgWidth - paddingX}
            y2={svgHeight - paddingY}
            stroke="var(--color-green)"
            strokeWidth="3"
            strokeDasharray="4 4"
          />

          {/* Interactive Data Points */}
          {coords.map((c, i) => (
            <g 
              key={i} 
              onMouseEnter={() => setActivePoint(c)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={c.x} cy={c.y} r={activePoint?.month === c.month ? "7" : "5"} fill="#f5b726" stroke="#10201d" strokeWidth="2.5" />
              <text x={c.x} y={svgHeight - paddingY + 20} fill="var(--text-secondary)" fontSize="12" textAnchor="middle" fontWeight="600">
                {c.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {activePoint && (
          <div 
            className="chart-tooltip"
            style={{
              left: `${(activePoint.x / svgWidth) * 100}%`,
              top: `${(activePoint.y / svgHeight) * 100}%`
            }}
          >
            <div className="tooltip-title">{activePoint.label} Milestone</div>
            <div className="tooltip-bleed">Bleed: -${activePoint.bleed.toFixed(0)}</div>
            <div className="tooltip-saved">Sloth Saved: +${activePoint.saved.toFixed(0)}</div>
          </div>
        )}
      </div>

      {/* Chart Legend */}
      <div className="chart-legend-row">
        <div className="legend-item">
          <span className="legend-dot coral"></span>
          <span>Status Quo: Doing Nothing (Inertia Bleed)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot green"></span>
          <span>SlothFinance: Nuked Zombie Fees ($0 Waste)</span>
        </div>
      </div>

      <style>{`
        .forecast-card {
          padding: 2rem;
          margin-bottom: 2.5rem;
        }
        .forecast-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .forecast-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-gold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }
        .forecast-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }
        .forecast-subtitle {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .forecast-stat-badge {
          background: rgba(233, 123, 119, 0.12);
          border: 1px solid rgba(233, 123, 119, 0.35);
          border-radius: var(--radius-md);
          padding: 0.75rem 1.25rem;
          text-align: right;
        }
        .badge-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }
        .badge-amount {
          font-size: 1.75rem;
          font-weight: 900;
          font-family: var(--font-mono);
          color: var(--color-coral);
          line-height: 1.1;
        }
        .chart-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .svg-chart {
          width: 100%;
          height: auto;
          display: block;
        }
        .chart-tooltip {
          position: absolute;
          transform: translate(-50%, -120%);
          background: rgba(16, 32, 29, 0.95);
          border: 1px solid var(--color-gold);
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
          padding: 0.6rem 0.9rem;
          border-radius: var(--radius-sm);
          pointer-events: none;
          z-index: 10;
          white-space: nowrap;
        }
        .tooltip-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.2rem;
        }
        .tooltip-bleed {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--color-coral);
          font-family: var(--font-mono);
        }
        .tooltip-saved {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--color-green);
          font-family: var(--font-mono);
        }
        .chart-legend-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .legend-dot.coral { background: var(--color-coral); }
        .legend-dot.green { background: var(--color-green); }
      `}</style>
    </div>
  );
}
