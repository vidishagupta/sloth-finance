import React from 'react';
import { ShieldCheck, FileText, RefreshCw, Sparkles, Award } from 'lucide-react';

export default function Navbar({ onOpenOpenAIModal, onOpenDevModal, onReset, hasData }) {
  return (
    <header className="navbar-container">
      <div className="container navbar-content">
        {/* Brand */}
        <div className="navbar-brand" onClick={onReset} style={{ cursor: 'pointer' }}>
          <div className="brand-logo-badge">
            <span style={{ fontSize: '1.6rem' }}>🦥</span>
          </div>
          <div>
            <div className="brand-title">
              Sloth<span style={{ color: 'var(--color-gold)' }}>Finance</span>
            </div>
            <div className="brand-tagline">
              Autonomous AI Financial Tamer
            </div>
          </div>
        </div>

        {/* AI Engine Status Pill */}
        <div className="theme-pill">
          <span className="theme-dot"></span>
          <span>Dual Engine: <strong>TabPFN-3.5</strong> + <strong>Gemma 2</strong></span>
        </div>

        {/* Action Buttons */}
        <div className="navbar-actions">
          <button 
            className="nav-btn"
            onClick={onOpenOpenAIModal}
            title="Inspect 100% On-Device Financial Privacy Architecture"
          >
            <ShieldCheck size={16} color="var(--color-green)" />
            <span>Privacy & Architecture</span>
          </button>

          {hasData && (
            <button 
              className="nav-btn nav-btn-reset" 
              onClick={onReset}
              title="Reset analysis and load new statement"
            >
              <RefreshCw size={15} />
              <span>New Audit</span>
            </button>
          )}

          <a 
            href="https://github.com/vidishagupta/sloth-finance" 
            target="_blank" 
            rel="noreferrer" 
            className="nav-icon-link"
            title="View Open Source Code on GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .navbar-container {
          background: rgba(10, 19, 17, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.9rem;
          padding-bottom: 0.9rem;
          gap: 1rem;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .brand-logo-badge {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 2px 2px 0 #000;
        }
        .brand-title {
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-main);
          line-height: 1.1;
        }
        .brand-tagline {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .theme-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(61, 95, 88, 0.3);
          border: 1px solid rgba(139, 178, 222, 0.2);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .theme-dot {
          width: 8px;
          height: 8px;
          background: var(--color-gold);
          border-radius: 50%;
          animation: pulse-gold 2s infinite;
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          color: var(--text-main);
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .nav-btn:hover {
          background: var(--color-sage);
          border-color: var(--color-gold);
        }
        .nav-btn-gold {
          background: rgba(245, 183, 38, 0.12);
          border-color: rgba(245, 183, 38, 0.4);
          color: var(--color-gold);
        }
        .nav-btn-gold:hover {
          background: var(--color-gold);
          color: var(--text-dark);
        }
        .nav-btn-reset {
          background: rgba(233, 123, 119, 0.1);
          border-color: rgba(233, 123, 119, 0.3);
          color: var(--color-coral);
        }
        .nav-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          padding: 0.45rem;
          border-radius: var(--radius-md);
          transition: color 0.15s ease;
        }
        .nav-icon-link:hover {
          color: var(--color-gold);
        }
        @media (max-width: 860px) {
          .theme-pill { display: none; }
          .brand-tagline { display: none; }
        }
      `}</style>
    </header>
  );
}
