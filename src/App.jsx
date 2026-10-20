import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import SlothScorecard from './components/SlothScorecard';
import SubscriptionTable from './components/SubscriptionTable';
import ForecastChart from './components/ForecastChart';
import LetterModal from './components/LetterModal';
import OpenInnovationModal from './components/OpenInnovationModal';
import { analyzeStatement, runClientNativeAnalysis } from './utils/aiEngine';
import { SAMPLE_DATASETS } from './utils/sampleData';

export default function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [sourceName, setSourceName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [cancelledIds, setCancelledIds] = useState(new Set());
  
  // Modals
  const [showOpenAIModal, setShowOpenAIModal] = useState(false);

  // Support URL parameters for high-definition demo scenes
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scene = params.get('scene');
    if (!scene || scene === '1') return;

    const sample = SAMPLE_DATASETS.forgetful_dev;
    const result = runClientNativeAnalysis(sample.transactions);
    setAnalysisData(result);
    setSourceName(sample.name);

    if (scene === '3') {
      setTimeout(() => {
        const el = document.getElementById('subscriptions-table-section');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, 200);
    } else if (scene === '4') {
      const sub = result.analysis.subscriptions.find(s => s.has_price_creep) || result.analysis.subscriptions[0];
      setSelectedSubscription(sub);
    } else if (scene === '5') {
      setTimeout(() => {
        const el = document.getElementById('forecast-chart-section');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, 200);
    } else if (scene === '6') {
      setShowOpenAIModal(true);
    }
  }, []);

  const handleAnalyze = async (transactions, name) => {
    setIsLoading(true);
    setSourceName(name);
    try {
      // Simulate natural sloth calculation pause for delightful micro-animation
      await new Promise(r => setTimeout(r, 650));
      const result = await analyzeStatement(transactions);
      setAnalysisData(result);
      setCancelledIds(new Set());
    } catch (err) {
      alert("Error analyzing statement: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setSourceName('');
    setSelectedSubscription(null);
    setCancelledIds(new Set());
  };

  const handleToggleCancel = (id) => {
    setCancelledIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="app-root">
      {/* Navbar */}
      <Navbar
        onOpenOpenAIModal={() => setShowOpenAIModal(true)}
        onReset={handleReset}
        hasData={!!analysisData}
      />

      <main className="main-content">
        {!analysisData ? (
          <UploadSection 
            onAnalyze={handleAnalyze} 
            isLoading={isLoading} 
          />
        ) : (
          <div className="container dashboard-container">
            {/* Scorecard with Sloth Meter & Gemma 2 Roast */}
            <SlothScorecard 
              analysis={analysisData.analysis} 
              audit={analysisData.audit}
              sourceName={sourceName}
            />

            {/* Predictive TabPFN Chart */}
            <ForecastChart 
              monthlyBleed={analysisData.analysis.total_monthly_bleed} 
            />

            {/* Detected Subscriptions Table with 1-Click Cancel Letters */}
            <SubscriptionTable 
              subscriptions={analysisData.analysis.subscriptions}
              onOpenLetter={(sub) => setSelectedSubscription(sub)}
              onToggleCancel={handleToggleCancel}
              cancelledIds={cancelledIds}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer-container">
        <div className="container footer-content">
          <div className="footer-left">
            <div className="footer-brand">
              <span>🦥</span>
              <span>SlothFinance</span>
            </div>
            <p className="footer-desc">
              Rewarding human laziness with open-source financial vigilance.
              Built for DEV Hacktoberfest Week 3 Challenge: <em>Slow and Steady</em>.
            </p>
          </div>

          <div className="footer-partners">
            <div className="partner-title">Powered By Open-Source AI:</div>
            <div className="partner-badges">
              <span className="partner-badge">Prior Labs TabPFN-3.5</span>
              <span className="partner-badge">Google Gemma 2</span>
              <span className="partner-badge">Render</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedSubscription && (
        <LetterModal
          subscription={selectedSubscription}
          onClose={() => setSelectedSubscription(null)}
          onMarkCancelled={handleToggleCancel}
          isCancelled={cancelledIds.has(selectedSubscription.id)}
        />
      )}

      {showOpenAIModal && (
        <OpenInnovationModal
          onClose={() => setShowOpenAIModal(false)}
        />
      )}

      <style>{`
        .app-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .main-content {
          flex: 1;
          padding-bottom: 3rem;
        }
        .dashboard-container {
          padding-top: 2rem;
        }
        .footer-container {
          background: rgba(10, 19, 17, 0.95);
          border-top: 1px solid var(--border-subtle);
          padding: 2.5rem 0;
          color: var(--text-secondary);
        }
        .footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--text-main);
          margin-bottom: 0.35rem;
        }
        .footer-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          max-width: 480px;
        }
        .partner-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }
        .partner-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .partner-badge {
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-gold);
        }
      `}</style>
    </div>
  );
}
