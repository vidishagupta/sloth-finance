import React, { useState } from 'react';
import Papa from 'papaparse';
import { UploadCloud, FileSpreadsheet, Sparkles, Shield, AlertCircle, ArrowRight } from 'lucide-react';
import SlothMascot from './SlothMascot';
import { SAMPLE_DATASETS } from '../utils/sampleData';

export default function UploadSection({ onAnalyze, isLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setErrorMessage('');
    if (!file.name.endsWith('.csv')) {
      setErrorMessage('Please upload a valid .CSV file containing bank or card transactions.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          setErrorMessage('The uploaded CSV file is empty or missing headers.');
          return;
        }
        onAnalyze(results.data, file.name);
      },
      error: (error) => {
        setErrorMessage(`Failed to parse CSV: ${error.message}`);
      }
    });
  };

  const loadSample = (sampleKey) => {
    const sample = SAMPLE_DATASETS[sampleKey];
    if (sample) {
      onAnalyze(sample.transactions, sample.name);
    }
  };

  return (
    <section className="upload-hero-section">
      <div className="container">
        {/* Hero Header with Mascot */}
        <div className="hero-intro">
          <div className="mascot-wrapper">
            <SlothMascot state={isLoading ? "thinking" : "sleeping"} size={110} />
          </div>
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span className="eyebrow-chip">Open-Source AI Foundation</span>
              <span>Prior Labs TabPFN-3.5 & Google Gemma 2</span>
            </div>
            <h1 className="hero-title">
              Too lazy to audit bank statements? <br />
              <span className="title-gradient">Let an open-source sloth do it.</span>
            </h1>
            <p className="hero-subtitle">
              SlothFinance catches stealth price increases, detects forgotten zombie subscriptions,
              and writes 1-click legal cancellation letters while you stay comfortable on the couch.
            </p>
          </div>
        </div>

        {/* Dropzone & 1-Click Samples Grid */}
        <div className="upload-grid">
          {/* Main Dropzone */}
          <div
            className={`dropzone-card glass-panel ${dragActive ? 'dropzone-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="csv-file-input"
              accept=".csv"
              onChange={handleChange}
              style={{ display: 'none' }}
              disabled={isLoading}
            />

            <div className="dropzone-inner">
              <div className="dropzone-icon-circle">
                <UploadCloud size={36} color="var(--color-gold)" />
              </div>

              <h3 className="dropzone-title">
                Drop your bank or card statement CSV
              </h3>
              <p className="dropzone-desc">
                Supports Chase, Bank of America, Amex, Apple Card, Wells Fargo, Revolut, or generic CSVs
              </p>

              <label htmlFor="csv-file-input" className="btn-primary dropzone-btn">
                <FileSpreadsheet size={18} />
                <span>{isLoading ? 'TabPFN is Analyzing...' : 'Browse CSV Statement'}</span>
              </label>

              {errorMessage && (
                <div className="error-alert">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="privacy-pill">
                <Shield size={14} color="var(--color-green)" />
                <span>100% Private Open-Source AI. Zero data leaves your machine.</span>
              </div>
            </div>
          </div>

          {/* 1-Click Samples Card */}
          <div className="samples-card glass-panel">
            <div className="samples-header">
              <div className="samples-tag">
                <Sparkles size={14} color="var(--color-gold)" />
                <span>Instant 1-Click Demos</span>
              </div>
              <h3 className="samples-title">Don't have a CSV handy?</h3>
              <p className="samples-subtitle">
                Test with real-world scenarios designed to showcase TabPFN zero-shot anomaly detection & Gemma agent:
              </p>
            </div>

            <div className="sample-buttons-list">
              <button 
                className="sample-item-btn" 
                onClick={() => loadSample('forgetful_dev')}
                disabled={isLoading}
              >
                <div className="sample-icon">👨‍💻</div>
                <div className="sample-details">
                  <div className="sample-name">The Forgetful Developer</div>
                  <div className="sample-desc">AWS leaks, 3 Copilots, Netflix rate hike (+16%), and unused gym</div>
                </div>
                <ArrowRight size={16} className="sample-arrow" />
              </button>

              <button 
                className="sample-item-btn" 
                onClick={() => loadSample('college_chaos')}
                disabled={isLoading}
              >
                <div className="sample-icon">🎓</div>
                <div className="sample-details">
                  <div className="sample-name">College Student Chaos</div>
                  <div className="sample-desc">Expired free trials (Chegg, Duolingo, Tinder Gold, DashPass)</div>
                </div>
                <ArrowRight size={16} className="sample-arrow" />
              </button>

              <button 
                className="sample-item-btn" 
                onClick={() => loadSample('saas_dump')}
                disabled={isLoading}
              >
                <div className="sample-icon">🏢</div>
                <div className="sample-details">
                  <div className="sample-name">Zombie SaaS Overload</div>
                  <div className="sample-desc">Redundant Notion, Figma, Loom creep, and ghost DigitalOcean droplets</div>
                </div>
                <ArrowRight size={16} className="sample-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .upload-hero-section {
          padding: 3rem 0 2rem;
        }
        .hero-intro {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        .mascot-wrapper {
          flex-shrink: 0;
        }
        .hero-text {
          flex: 1;
        }
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-bottom: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
        }
        .eyebrow-chip {
          background: rgba(245, 183, 38, 0.15);
          color: var(--color-gold);
          padding: 0.15rem 0.6rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(245, 183, 38, 0.3);
        }
        .hero-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: -0.03em;
          margin-bottom: 0.85rem;
          color: var(--text-main);
        }
        .title-gradient {
          background: linear-gradient(90deg, #f5b726 0%, #fabf3e 50%, #8bb2de 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 640px;
          line-height: 1.55;
        }
        .upload-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 1.75rem;
        }
        .dropzone-card {
          padding: 2.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 2px dashed rgba(139, 178, 222, 0.25);
          transition: all 0.2s ease;
        }
        .dropzone-active {
          border-color: var(--color-gold);
          background: rgba(245, 183, 38, 0.05);
          transform: scale(1.01);
        }
        .dropzone-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 440px;
        }
        .dropzone-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(61, 95, 88, 0.4);
          border: 2px solid var(--border-card);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .dropzone-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }
        .dropzone-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .dropzone-btn {
          cursor: pointer;
        }
        .error-alert {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(233, 123, 119, 0.15);
          border: 1px solid var(--color-coral);
          color: var(--color-coral);
          padding: 0.5rem 0.9rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }
        .privacy-pill {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          background: rgba(16, 32, 29, 0.7);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(52, 211, 153, 0.2);
        }
        .samples-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .samples-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-gold);
          margin-bottom: 0.5rem;
        }
        .samples-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.4rem;
        }
        .samples-subtitle {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }
        .sample-buttons-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .sample-item-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1.1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          text-align: left;
          color: var(--text-main);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .sample-item-btn:hover {
          background: var(--color-sage);
          border-color: var(--color-gold);
          transform: translateX(4px);
        }
        .sample-icon {
          font-size: 1.6rem;
          flex-shrink: 0;
        }
        .sample-details {
          flex: 1;
          min-width: 0;
        }
        .sample-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.2rem;
        }
        .sample-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sample-arrow {
          color: var(--text-muted);
          transition: transform 0.15s ease, color 0.15s ease;
        }
        .sample-item-btn:hover .sample-arrow {
          transform: translateX(3px);
          color: var(--color-gold);
        }
        @media (max-width: 960px) {
          .upload-grid { grid-template-columns: 1fr; }
          .hero-intro { flex-direction: column; text-align: center; }
          .hero-eyebrow { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
