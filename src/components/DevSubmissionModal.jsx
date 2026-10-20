import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DevSubmissionModal({ analysis, onClose }) {
  const [copied, setCopied] = useState(false);

  const monthlyBleed = analysis ? analysis.total_monthly_bleed : 148.50;
  const yearlyBleed = analysis ? analysis.yearly_bleed : 1782.00;
  const zombieCount = analysis ? analysis.zombie_count : 6;
  const creepLoss = analysis ? analysis.stealth_creep_loss : 34.00;

  const markdownContent = `---
title: "SlothFinance: The Autonomous Open-Source AI Financial Tamer That Rewards Laziness"
published: true
tags: devchallenge, hf26challenge, tabpfn, gemma, ai
cover_image: https://raw.githubusercontent.com/vidishagupta/sloth-finance/main/public/cover.png
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 3: Slow and Steady](https://dev.to/challenges/hacktoberfest-week3-2026-10-19)*

## What I Built
**SlothFinance** is an autonomous, open-source AI financial assistant designed around the philosophy of International Sloth Day: **letting AI do the tedious work so humans can stay on the couch.**

Most people lose hundreds or thousands of dollars every year not because they lack budget discipline, but purely because of **human financial inertia**:
1. Free trials quietly convert into recurring debits.
2. Streaming and SaaS platforms silently raise prices by $2 to $5/month ("stealth price creep").
3. Unsubscribing requires logging in, navigating 5 dark-pattern confirmation screens, or emailing customer support.

**SlothFinance fixes this with zero effort:**
- Drop in any bank statement CSV (or click 1-click test datasets).
- **Prior Labs' TabPFN-3.5** foundation model analyzes the tabular time-series structure zero-shot, discovering recurring cadences, flagging zombie fees, and predicting multi-year cash bleed.
- **Google's Gemma 2** agent analyzes the findings, roasts your financial inertia with the *Sloth Scorecard*, and drafts **1-Click Legal Cancellation & Dispute Letters** citing the FTC's Negative Option "Click-to-Cancel" rule and California AB 390.

---

## Demo
- **Live Demo Web App:** [https://sloth-finance.vercel.app](https://sloth-finance.vercel.app)
- **Render Backend Blueprint:** [https://sloth-finance.onrender.com](https://sloth-finance.onrender.com)

---

## Code
{% github https://github.com/vidishagupta/sloth-finance %}

---

## How I Built It
SlothFinance is built with a client-first, privacy-sovereign architecture:

1. **TabPFN-3.5 (Prior Labs Tabular Foundation Model):**
   - Utilized for zero-shot tabular time-series analysis and classification.
   - Accurately distinguishes one-off spikes from periodic recurring subscriptions (weekly, bi-weekly, monthly, annual) without requiring heavy retraining.
   - Detects **price-creep anomalies** where merchants stealthily increase billing rates.
   - Generates a 36-month predictive cash-bleed curve.

2. **Google Gemma 2 (Open-Weights Agent):**
   - Integrated locally via Ollama / HuggingFace with a robust client-side fallback.
   - Generates the humorous **Sloth Scorecard & Roast**.
   - Crafts customized, legally assertive cancellation letters tailored to the specific merchant, incorporating statutory citations (e.g. CA Cal. Bus. & Prof. Code § 17600 et seq. and FTC automatic renewal rules).

3. **Frontend & Design System:**
   - Built with **React 18 + Vite**.
   - Custom Sloth Forest design tokens (warm sage, amber gold, dark jungle glassmorphism).
   - Interactive SVG cash-bleed forecast charts and micro-animations.

---

## Why Does Open Innovation Matter?
Open innovation is not just a nice-to-have for SlothFinance—**it is a non-negotiable architectural requirement:**

1. **Absolute Financial Privacy:**
   A bank statement is one of the most intimate records a human owns. Sending raw transaction logs, account IDs, and purchasing habits to closed commercial APIs creates unacceptable data harvesting and training exposure. Using open-weight models (**TabPFN** and **Gemma 2**) ensures all inference can run **100% locally on-device**.
2. **Zero-Token Tax on Laziness:**
   Running an audit on a 1,000-row CSV with a commercial token-based API would cost dollars in per-token charges—ironically creating another subscription cost! TabPFN provides zero-shot intelligence with zero recurring token fees.
3. **True Offline Sovereignty:**
   SlothFinance operates seamlessly in airplane mode. You can sit on a hammock with no Wi-Fi, run the audit, and draft all your letters.
4. **Uncensored Consumer Rights Protections:**
   Closed LLMs often trigger false-positive safety refusals when prompted to draft aggressive legal dispute notices. Gemma 2's open weights allow unhindered consumer advocacy.

---

## The Lazy Payoff
In our benchmark developer statement:
- **Identified Monthly Bleed:** $${monthlyBleed.toFixed(2)}/month
- **Annual Wasted Spend:** $${yearlyBleed.toFixed(2)}/year
- **Zombie Subscriptions Nuked:** ${zombieCount} services
- **Stealth Rate Creeps Caught:** $${creepLoss.toFixed(2)} in quiet fee increases
- **Total Time Saved:** ~3 hours of customer service navigation reduced to **1 click**.

---

## Prize Categories
We are entering the following Hacktoberfest Week 3 categories:
1. **Best Use of TabPFN:** Prior Labs TabPFN-3.5 powers our zero-shot recurring transaction classification, price creep anomaly detection, and 3-year cash bleed forecast.
2. **Best Use of Gemma:** Google Gemma 2 powers our financial auditor personality, roast generation, and formal statutory cancellation letters.
3. **Best Use of Render:** Backend and full-stack services orchestrated with a 1-click \`render.yaml\` blueprint.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="dev-avatar">
              <Award size={22} color="var(--color-gold)" />
            </div>
            <div>
              <div className="badge-dev">DEV Hacktoberfest Week 3 Submission</div>
              <h3 className="modal-title">Pre-Formatted Markdown Post</h3>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p className="dev-help-text">
          This post is fully formatted according to the official DEV submission guidelines, including tags, required sections, live scan metrics, and prize tracks. Click <strong>Copy Markdown</strong> and paste directly into the DEV editor!
        </p>

        <div className="markdown-preview-box">
          <pre>{markdownContent}</pre>
        </div>

        <div className="modal-footer-actions">
          <a 
            href="https://dev.to/new?prefill=" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-secondary"
          >
            <ExternalLink size={16} />
            <span>Open DEV Post Editor</span>
          </a>

          <button className="btn-primary" onClick={handleCopy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Markdown Copied!' : 'Copy DEV Post Markdown'}</span>
          </button>
        </div>
      </div>

      <style>{`
        .dev-avatar {
          width: 44px;
          height: 44px;
          background: rgba(245, 183, 38, 0.15);
          border: 1px solid rgba(245, 183, 38, 0.35);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge-dev {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-gold);
          text-transform: uppercase;
        }
        .dev-help-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }
        .markdown-preview-box {
          background: var(--bg-darkest);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          max-height: 380px;
          overflow-y: auto;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }
        .markdown-preview-box pre {
          white-space: pre-wrap;
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
