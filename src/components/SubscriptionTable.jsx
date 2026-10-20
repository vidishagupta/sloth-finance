import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, CheckCircle, Mail, Sparkles, Search, Ban } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SubscriptionTable({ subscriptions = [], onOpenLetter, onToggleCancel, cancelledIds = new Set() }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'zombies' | 'creeps'
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = subscriptions.filter(sub => {
    if (filterType === 'zombies' && !sub.is_zombie) return false;
    if (filterType === 'creeps' && !sub.is_creep) return false;
    if (searchQuery) {
      return sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             sub.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handleNukeClick = (sub, e) => {
    e.stopPropagation();
    onToggleCancel(sub.id);
    if (!cancelledIds.has(sub.id)) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="table-card glass-panel">
      <div className="table-header-row">
        <div>
          <h3 className="table-title">Detected Recurring Subscriptions</h3>
          <p className="table-subtitle">
            Classified by Prior Labs TabPFN-3.5 foundation model. Click any service to generate an instant cancellation letter.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="table-controls">
          <div className="search-input-wrapper">
            <Search size={15} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <button 
              className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All ({subscriptions.length})
            </button>
            <button 
              className={`filter-btn ${filterType === 'zombies' ? 'active' : ''}`}
              onClick={() => setFilterType('zombies')}
            >
              🧟 Zombies ({subscriptions.filter(s => s.is_zombie).length})
            </button>
            <button 
              className={`filter-btn ${filterType === 'creeps' ? 'active' : ''}`}
              onClick={() => setFilterType('creeps')}
            >
              📈 Price Creeps ({subscriptions.filter(s => s.is_creep).length})
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-table-state">
          <CheckCircle size={36} color="var(--color-green)" />
          <p>No matching subscriptions found for this filter.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Subscription / Merchant</th>
                <th>Monthly Rate</th>
                <th>Status & Anomalies</th>
                <th>TabPFN Confidence</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(sub => {
                const isCancelled = cancelledIds.has(sub.id);

                return (
                  <tr key={sub.id} className={isCancelled ? 'row-cancelled' : ''}>
                    {/* Merchant Info */}
                    <td>
                      <div className="merchant-cell">
                        <div className="merchant-avatar">
                          {sub.name.charAt(0)}
                        </div>
                        <div>
                          <div className="merchant-name-row">
                            <span className="merchant-name">{sub.name}</span>
                            {isCancelled && <span className="badge badge-green">Cancelled 🎉</span>}
                          </div>
                          <div className="merchant-meta">
                            <span>{sub.category}</span>
                            <span>•</span>
                            <span>{sub.frequency}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Pricing */}
                    <td>
                      <div className="price-cell">
                        <span className="monthly-price">${sub.monthly_cost.toFixed(2)}/mo</span>
                        <span className="yearly-price">${(sub.monthly_cost * 12).toFixed(2)}/yr</span>
                      </div>
                    </td>

                    {/* Badges / Creep */}
                    <td>
                      <div className="badge-cell">
                        {sub.is_creep && (
                          <span className="badge badge-coral" title={`Price increased from $${sub.initial_amount} to $${sub.last_amount}`}>
                            <TrendingUp size={12} />
                            <span>Stealth Creep +{sub.creep_pct}%</span>
                          </span>
                        )}
                        {sub.is_zombie && !sub.is_creep && (
                          <span className="badge badge-gold">
                            <AlertTriangle size={12} />
                            <span>Zombie Subscription</span>
                          </span>
                        )}
                        {!sub.is_zombie && !sub.is_creep && (
                          <span className="badge badge-blue">
                            <span>Standard Recurring</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* TabPFN Confidence */}
                    <td>
                      <div className="confidence-cell">
                        <div className="confidence-pill">
                          <Sparkles size={12} color="var(--color-gold)" />
                          <span>{Math.round(sub.confidence * 100)}% TabPFN</span>
                        </div>
                        <div className="confidence-bar-bg">
                          <div 
                            className="confidence-bar-fill" 
                            style={{ width: `${sub.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="actions-cell">
                        <button
                          className="btn-letter-action"
                          onClick={() => onOpenLetter(sub)}
                          title="Generate Gemma 2 1-Click Cancellation / Dispute Letter"
                        >
                          <Mail size={15} />
                          <span>1-Click Cancel Letter</span>
                        </button>

                        <button
                          className={`btn-nuke-toggle ${isCancelled ? 'is-cancelled' : ''}`}
                          onClick={(e) => handleNukeClick(sub, e)}
                          title={isCancelled ? "Restore subscription" : "Mark as cancelled"}
                        >
                          {isCancelled ? <CheckCircle size={16} /> : <Ban size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .table-card {
          padding: 2rem;
          margin-bottom: 2.5rem;
        }
        .table-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .table-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.35rem;
        }
        .table-subtitle {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .table-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .search-input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
        }
        .search-input {
          background: transparent;
          border: none;
          color: var(--text-main);
          font-size: 0.85rem;
          outline: none;
          width: 140px;
        }
        .search-input::placeholder {
          color: var(--text-muted);
        }
        .filter-group {
          display: flex;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          padding: 0.2rem;
          border-radius: var(--radius-md);
          gap: 0.2rem;
        }
        .filter-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .filter-btn:hover {
          color: var(--text-main);
        }
        .filter-btn.active {
          background: var(--color-sage);
          color: var(--text-main);
        }
        .table-responsive-wrapper {
          overflow-x: auto;
        }
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .custom-table th {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .custom-table td {
          padding: 1.1rem 1rem;
          border-bottom: 1px solid rgba(247, 247, 242, 0.04);
          vertical-align: middle;
        }
        .custom-table tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }
        .row-cancelled {
          opacity: 0.55;
        }
        .merchant-cell {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .merchant-avatar {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: rgba(61, 95, 88, 0.4);
          border: 1px solid var(--border-card);
          color: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .merchant-name-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .merchant-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-main);
        }
        .merchant-meta {
          font-size: 0.78rem;
          color: var(--text-muted);
          display: flex;
          gap: 0.35rem;
        }
        .price-cell {
          display: flex;
          flex-direction: column;
        }
        .monthly-price {
          font-weight: 800;
          font-family: var(--font-mono);
          color: var(--text-main);
          font-size: 1rem;
        }
        .yearly-price {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .confidence-cell {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          max-width: 130px;
        }
        .confidence-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .confidence-bar-bg {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .confidence-bar-fill {
          height: 100%;
          background: var(--color-gold);
          border-radius: var(--radius-full);
        }
        .actions-cell {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        .btn-letter-action {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(245, 183, 38, 0.12);
          border: 1px solid rgba(245, 183, 38, 0.4);
          color: var(--color-gold);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.5rem 0.9rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-letter-action:hover {
          background: var(--color-gold);
          color: var(--text-dark);
          transform: translateY(-1px);
        }
        .btn-nuke-toggle {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-card);
          background: var(--bg-surface);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-nuke-toggle:hover {
          color: var(--color-coral);
          border-color: var(--color-coral);
        }
        .btn-nuke-toggle.is-cancelled {
          background: rgba(52, 211, 153, 0.15);
          color: var(--color-green);
          border-color: var(--color-green);
        }
        .empty-table-state {
          padding: 3rem 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
