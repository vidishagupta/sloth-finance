import React from 'react';
import { Flame, DollarSign, AlertTriangle, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import SlothMascot from './SlothMascot';

export default function SlothScorecard({ analysis, audit, sourceName }) {
  const {
    sloth_score,
    sloth_rating_label,
    total_monthly_bleed,
    yearly_bleed,
    three_year_bleed,
    stealth_creep_loss,
    zombie_count
  } = analysis;

  const scoreColor = sloth_score > 75 ? 'var(--color-coral)' : sloth_score > 50 ? 'var(--color-gold)' : 'var(--color-green)';

  return (
    <div className="scorecard-container glass-panel">
      <div className="scorecard-header">
        <div className="scorecard-source">
          <span className="source-dot"></span>
          <span>Statement Analyzed: <strong>{sourceName || "Bank Transactions"}</strong></span>
        </div>
        <div className="tabpfn-pill">
          <Sparkles size={13} color="var(--color-gold)" />
          <span>TabPFN-3.5 Anomaly Engine</span>
        </div>
      </div>

      <div className="scorecard-main-grid">
        {/* Sloth Meter */}
        <div className="sloth-meter-card">
          <div className="meter-mascot">
            <SlothMascot state={sloth_score > 60 ? "shocked" : "happy"} size={90} />
          </div>
          
          <div className="gauge-wrapper">
            <div className="gauge-val" style={{ color: scoreColor }}>
              {sloth_score}
            </div>
            <div className="gauge-max">/ 100</div>
          </div>

          <div className="gauge-label" style={{ color: scoreColor }}>
            {sloth_rating_label}
          </div>

          <div className="gauge-bar-bg">
            <div 
              className="gauge-bar-fill" 
              style={{ width: `${sloth_score}%`, backgroundColor: scoreColor }}
            />
          </div>
          <p className="gauge-subtext">
            Higher score = more money leaking into unconscious recurring subscriptions.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="stats-quad-grid">
          {/* Monthly Bleed */}
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-icon-wrapper coral">
                <Flame size={18} />
              </span>
              <span className="stat-label">Monthly Bleed</span>
            </div>
            <div className="stat-number coral">
              ${total_monthly_bleed.toFixed(2)}
              <span className="stat-unit">/mo</span>
            </div>
            <div className="stat-hint">Recurring every 30 days</div>
          </div>

          {/* 1-Year Reclaimable */}
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-icon-wrapper gold">
                <DollarSign size={18} />
              </span>
              <span className="stat-label">1-Year Savings</span>
            </div>
            <div className="stat-number gold">
              ${yearly_bleed.toFixed(2)}
              <span className="stat-unit">/yr</span>
            </div>
            <div className="stat-hint">Saved by clicking cancel</div>
          </div>

          {/* Stealth Price Creeps */}
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-icon-wrapper blue">
                <TrendingUp size={18} />
              </span>
              <span className="stat-label">Stealth Creep</span>
            </div>
            <div className="stat-number blue">
              +${stealth_creep_loss.toFixed(2)}
            </div>
            <div className="stat-hint">Silent price hikes caught</div>
          </div>

          {/* Zombie Subscriptions */}
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-icon-wrapper green">
                <AlertTriangle size={18} />
              </span>
              <span className="stat-label">Zombie Services</span>
            </div>
            <div className="stat-number green">
              {zombie_count}
              <span className="stat-unit">fees</span>
            </div>
            <div className="stat-hint">Candidate subscriptions to nuke</div>
          </div>
        </div>
      </div>

      {/* Gemma 2 AI Roast & Audit Box */}
      {audit && audit.roast_text && (
        <div className="gemma-roast-box">
          <div className="roast-box-header">
            <div className="roast-title-row">
              <span className="gemma-chip">Google Gemma 2 Agent</span>
              <h4 className="roast-heading">The Sloth Financial Audit</h4>
            </div>
            <div className="roast-timestamp">
              Generated via Open-Weights LLM
            </div>
          </div>

          <div className="roast-content-text">
            {audit.roast_text.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="roast-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .scorecard-container {
          padding: 2rem;
          margin-bottom: 2.5rem;
          border-color: var(--border-card);
        }
        .scorecard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          margin-bottom: 1.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .scorecard-source {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .source-dot {
          width: 8px;
          height: 8px;
          background: var(--color-green);
          border-radius: 50%;
        }
        .tabpfn-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-gold);
          background: rgba(245, 183, 38, 0.12);
          border: 1px solid rgba(245, 183, 38, 0.3);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .scorecard-main-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 1.75rem;
          margin-bottom: 2rem;
        }
        .sloth-meter-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 1.75rem 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .meter-mascot {
          margin-bottom: 0.5rem;
        }
        .gauge-wrapper {
          display: flex;
          align-items: baseline;
          gap: 0.2rem;
          margin: 0.25rem 0;
        }
        .gauge-val {
          font-size: 3.2rem;
          font-weight: 900;
          font-family: var(--font-mono);
          line-height: 1;
        }
        .gauge-max {
          font-size: 1.1rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .gauge-label {
          font-size: 0.85rem;
          font-weight: 800;
          margin-bottom: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .gauge-bar-bg {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 0.85rem;
        }
        .gauge-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 1s ease-in-out;
        }
        .gauge-subtext {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .stats-quad-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        .stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          border-color: rgba(245, 183, 38, 0.4);
        }
        .stat-card-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.75rem;
        }
        .stat-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-icon-wrapper.coral { background: rgba(233, 123, 119, 0.15); color: var(--color-coral); }
        .stat-icon-wrapper.gold { background: rgba(245, 183, 38, 0.15); color: var(--color-gold); }
        .stat-icon-wrapper.blue { background: rgba(139, 178, 222, 0.15); color: var(--color-blue); }
        .stat-icon-wrapper.green { background: rgba(52, 211, 153, 0.15); color: var(--color-green); }
        .stat-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .stat-number {
          font-size: 1.95rem;
          font-weight: 900;
          font-family: var(--font-mono);
          line-height: 1.1;
          margin-bottom: 0.35rem;
        }
        .stat-number.coral { color: var(--color-coral); }
        .stat-number.gold { color: var(--color-gold); }
        .stat-number.blue { color: var(--color-blue); }
        .stat-number.green { color: var(--color-green); }
        .stat-unit {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-left: 0.25rem;
        }
        .stat-hint {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .gemma-roast-box {
          background: rgba(16, 32, 29, 0.85);
          border: 1px solid rgba(245, 183, 38, 0.35);
          border-radius: var(--radius-md);
          padding: 1.5rem 1.75rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        .roast-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .roast-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .gemma-chip {
          background: var(--color-gold);
          color: var(--text-dark);
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }
        .roast-heading {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-main);
        }
        .roast-timestamp {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .roast-content-text {
          color: var(--text-main);
          font-size: 0.95rem;
          line-height: 1.65;
          white-space: pre-line;
        }
        .roast-paragraph {
          margin-bottom: 0.75rem;
        }
        @media (max-width: 900px) {
          .scorecard-main-grid { grid-template-columns: 1fr; }
          .stats-quad-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
