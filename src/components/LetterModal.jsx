import React, { useState } from 'react';
import { X, Copy, Mail, Download, Check, Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateCancellationLetter } from '../utils/aiEngine';

export default function LetterModal({ subscription, onClose, onMarkCancelled, isCancelled }) {
  if (!subscription) return null;

  const [userName, setUserName] = useState('Alex Mercer');
  const [userEmail, setUserEmail] = useState('alex.mercer@gmail.com');
  const [accountId, setAccountId] = useState('SUB-99482');
  const [copied, setCopied] = useState(false);

  const letterData = generateCancellationLetter(subscription, {
    name: userName,
    email: userEmail,
    accountId
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(letterData.body);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([letterData.body], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${subscription.name.replace(/\s+/g, '_')}_Cancellation_Letter.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-badge-sloth">
              <span>🦥</span>
            </div>
            <div>
              <div className="gemma-engine-tag">
                <Sparkles size={13} color="var(--color-gold)" />
                <span>Google Gemma 2 Legal Agent</span>
              </div>
              <h3 className="modal-service-name">
                1-Click Cancellation: {subscription.name}
              </h3>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Fields to personalize letter */}
        <div className="personalize-bar">
          <div className="field-group">
            <label>Subscriber Name</label>
            <input 
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
            />
          </div>
          <div className="field-group">
            <label>Registered Email</label>
            <input 
              type="email" 
              value={userEmail} 
              onChange={(e) => setUserEmail(e.target.value)} 
            />
          </div>
          <div className="field-group">
            <label>Account / Subscription ID</label>
            <input 
              type="text" 
              value={accountId} 
              onChange={(e) => setAccountId(e.target.value)} 
            />
          </div>
        </div>

        {/* Savings banner */}
        <div className="savings-banner">
          <div className="savings-highlight">
            💰 Sending this letter saves you <strong>${(subscription.monthly_cost * 12).toFixed(2)}/year</strong> with zero ongoing effort.
          </div>
          {subscription.is_creep && (
            <div className="creep-highlight">
              ⚠️ Includes FTC Click-to-Cancel statutory clause demanding refund for +{subscription.creep_pct}% stealth price hike.
            </div>
          )}
        </div>

        {/* Letter Text Preview */}
        <div className="letter-preview-box">
          <div className="letter-subject-line">
            <strong>Subject:</strong> {letterData.subject}
          </div>
          <pre className="letter-body-pre">
            {letterData.body}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="modal-footer-actions">
          <div className="footer-left">
            <button 
              className={`btn-secondary ${isCancelled ? 'btn-active-nuke' : ''}`}
              onClick={() => {
                onMarkCancelled(subscription.id);
                confetti();
              }}
            >
              <CheckCircle2 size={16} />
              <span>{isCancelled ? 'Marked as Cancelled' : 'Mark as Cancelled'}</span>
            </button>
          </div>

          <div className="footer-right">
            <button className="btn-secondary" onClick={handleDownload} title="Download as .txt">
              <Download size={16} />
              <span>Download .txt</span>
            </button>

            <a 
              href={letterData.mailto_url} 
              className="btn-secondary" 
              title="Open email in default client"
            >
              <Mail size={16} />
              <span>Open in Mail</span>
            </a>

            <button className="btn-primary" onClick={handleCopy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Letter'}</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 16, 14, 0.85);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1.5rem;
        }
        .modal-card {
          width: 100%;
          max-width: 780px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-accent);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1.25rem;
        }
        .modal-title-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .modal-badge-sloth {
          width: 44px;
          height: 44px;
          background: rgba(61, 95, 88, 0.4);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }
        .gemma-engine-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-gold);
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }
        .modal-service-name {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-main);
        }
        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.4rem;
          border-radius: var(--radius-sm);
          transition: color 0.15s ease;
        }
        .modal-close-btn:hover {
          color: var(--text-main);
        }
        .personalize-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .field-group label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
        }
        .field-group input {
          background: var(--bg-darkest);
          border: 1px solid var(--border-card);
          padding: 0.45rem 0.75rem;
          border-radius: var(--radius-sm);
          color: var(--text-main);
          font-size: 0.85rem;
          outline: none;
        }
        .field-group input:focus {
          border-color: var(--color-gold);
        }
        .savings-banner {
          background: rgba(245, 183, 38, 0.08);
          border: 1px solid rgba(245, 183, 38, 0.25);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          margin-bottom: 1.25rem;
          font-size: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .savings-highlight {
          color: var(--color-gold);
        }
        .creep-highlight {
          color: var(--color-coral);
          font-size: 0.8rem;
        }
        .letter-preview-box {
          background: var(--bg-darkest);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          max-height: 280px;
          overflow-y: auto;
          margin-bottom: 1.5rem;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }
        .letter-subject-line {
          padding-bottom: 0.65rem;
          margin-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--color-gold);
          font-weight: 600;
        }
        .letter-body-pre {
          white-space: pre-wrap;
          font-family: inherit;
        }
        .modal-footer-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .footer-right {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .btn-active-nuke {
          background: rgba(52, 211, 153, 0.15) !important;
          border-color: var(--color-green) !important;
          color: var(--color-green) !important;
        }
        @media (max-width: 700px) {
          .personalize-bar { grid-template-columns: 1fr; }
          .modal-footer-actions { flex-direction: column; align-items: stretch; }
          .footer-right { justify-content: flex-end; }
        }
      `}</style>
    </div>
  );
}
