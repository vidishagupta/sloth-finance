import React from 'react';
import { X, ShieldCheck, Lock, Cpu, DollarSign, Award, ExternalLink } from 'lucide-react';

export default function OpenInnovationModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="shield-avatar">
              <ShieldCheck size={24} color="var(--color-green)" />
            </div>
            <div>
              <div className="badge-open">Open-Source AI Manifesto</div>
              <h3 className="modal-title">Why Open Innovation Matters for SlothFinance</h3>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="manifesto-content">
          <p className="manifesto-lede">
            The core prompt of Hacktoberfest Week 3 asks: <em>"Why does open innovation matter for what you built? What did it make possible that a closed API wouldn't?"</em>
          </p>

          <div className="pillar-grid">
            <div className="pillar-card">
              <div className="pillar-icon lock">
                <Lock size={20} />
              </div>
              <h4 className="pillar-title">1. Total Financial Data Privacy</h4>
              <p className="pillar-text">
                Your bank statement is an intimate record of your health, habits, subscriptions, and home life. 
                Sending raw CSV transactions to closed commercial APIs (like OpenAI or Anthropic) introduces unacceptable data leakage and telemetry risks. 
                With <strong>TabPFN</strong> and <strong>Gemma 2</strong>, all inference happens directly on your machine.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon dollar">
                <DollarSign size={20} />
              </div>
              <h4 className="pillar-title">2. Zero Per-Token Tax on Laziness</h4>
              <p className="pillar-text">
                A closed API charges you on every token. Auditing 1,000 messy bank transactions would rack up recurring API bills—ironically adding another zombie charge to your life! 
                <strong>TabPFN-3.5</strong> performs zero-shot tabular time-series classification with zero recurring API costs.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon cpu">
                <Cpu size={20} />
              </div>
              <h4 className="pillar-title">3. True Offline Sovereign AI</h4>
              <p className="pillar-text">
                SlothFinance operates seamlessly with zero internet connection. 
                Whether you are relaxing in airplane mode or in a remote cabin, open-weight models let your agent audit transactions and draft dispute letters with zero cloud dependencies.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon award">
                <Award size={20} />
              </div>
              <h4 className="pillar-title">4. Unrestricted Consumer Protection Clauses</h4>
              <p className="pillar-text">
                Proprietary LLMs frequently refuse to generate aggressive dispute letters citing legal statutes due to blanket liability guardrails. 
                <strong>Gemma 2</strong> open weights permit precise, assertive consumer rights citations (FTC Click-to-Cancel and CA AB 390).
              </p>
            </div>
          </div>

          <div className="tech-stack-showcase">
            <div className="showcase-header">Open Technologies Powering SlothFinance:</div>
            <div className="tech-chips">
              <span className="tech-chip">Prior Labs TabPFN-3.5</span>
              <span className="tech-chip">Google Gemma 2 (2B / 9B)</span>
              <span className="tech-chip">Ollama / Local Inference</span>
              <span className="tech-chip">Render Blueprint Deploy</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>
            Got it, Back to the Sloth Audit
          </button>
        </div>
      </div>

      <style>{`
        .shield-avatar {
          width: 44px;
          height: 44px;
          background: rgba(52, 211, 153, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.3);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge-open {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-green);
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }
        .manifesto-content {
          padding: 1.25rem 0;
        }
        .manifesto-lede {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          background: rgba(245, 183, 38, 0.06);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          border-left: 3px solid var(--color-gold);
        }
        .pillar-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .pillar-card {
          background: var(--bg-darkest);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 1.25rem;
        }
        .pillar-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }
        .pillar-icon.lock { background: rgba(52, 211, 153, 0.15); color: var(--color-green); }
        .pillar-icon.dollar { background: rgba(245, 183, 38, 0.15); color: var(--color-gold); }
        .pillar-icon.cpu { background: rgba(139, 178, 222, 0.15); color: var(--color-blue); }
        .pillar-icon.award { background: rgba(233, 123, 119, 0.15); color: var(--color-coral); }
        .pillar-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.4rem;
        }
        .pillar-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }
        .tech-stack-showcase {
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          margin-bottom: 1rem;
        }
        .showcase-header {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 0.65rem;
        }
        .tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tech-chip {
          background: rgba(61, 95, 88, 0.4);
          border: 1px solid var(--border-card);
          color: var(--color-gold);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
        }
        @media (max-width: 700px) {
          .pillar-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
