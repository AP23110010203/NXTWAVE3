import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import ReferralEngine from './pages/ReferralEngine';
import CampaignPlanner from './pages/CampaignPlanner';
import ChannelStrategy from './pages/ChannelStrategy';
import AICopilot from './pages/AICopilot';
import GrowthThinking from './pages/GrowthThinking';
import SimulationControls from './pages/SimulationControls';
import SubmissionKit from './pages/SubmissionKit';

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <div style={{ display: 'flex', minHeight: '100vh', background: '#06080f' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto', overflowX: 'hidden' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/referral" element={<ReferralEngine />} />
              <Route path="/campaign" element={<CampaignPlanner />} />
              <Route path="/channels" element={<ChannelStrategy />} />
              <Route path="/copilot" element={<AICopilot />} />
              <Route path="/thinking" element={<GrowthThinking />} />
              <Route path="/simulation" element={<SimulationControls />} />
              <Route path="/submission" element={<SubmissionKit />} />
            </Routes>
          </main>
        </div>
      </AppProvider>
    </HashRouter>
  );
}
