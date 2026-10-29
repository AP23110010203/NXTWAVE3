import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateMetrics, createSimulatedStudent } from '../store/dataStore';
import { FlaskConical, Play, RefreshCw, Users, Zap, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function SimulationControls() {
  const { data, resetDemo, addStudent, simulateRegistrations } = useApp();
  const metrics = calculateMetrics(data);
  const [lastAction, setLastAction] = useState(null);
  const [testLog, setTestLog] = useState([]);

  const log = (msg, type = 'info') => {
    const entry = { msg, type, time: new Date().toLocaleTimeString() };
    setTestLog(prev => [entry, ...prev].slice(0, 20));
  };

  const sim = (count, label) => {
    simulateRegistrations(count);
    setLastAction(label);
    log(`✓ Added ${count} simulated registration${count > 1 ? 's' : ''}`, 'success');
  };

  const runDaySimulation = () => {
    const CHANNELS = ['College Club', 'WhatsApp Community', 'Student Ambassador', 'Email Outreach'];
    let added = 0;
    const count = Math.floor(Math.random() * 20) + 10;
    simulateRegistrations(count);
    added = count;
    log(`✓ Day simulation: Added ${added} registrations across multiple channels`, 'success');
    setLastAction('Day Simulation');
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title">Simulation Controls</h1>
        <p className="section-subtitle">Add demo registrations and test system features — all data stays in your browser</p>
      </div>

      {/* Warning */}
      <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 10, padding: '16px 20px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <AlertTriangle size={18} color="#f59e0b" />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>SIMULATION MODE — DEMO ONLY</span>
        </div>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#a0a0a0', lineHeight: 2 }}>
          <li>All generated data uses fictional demo records</li>
          <li>No real students are registered or contacted</li>
          <li>No emails or messages are sent</li>
          <li>All simulated registrations are clearly marked</li>
          <li>Data is stored only in your browser's LocalStorage</li>
        </ul>
      </div>

      {/* Current Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <div className="card-dark" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: '#707070', marginBottom: 4 }}>Total Registrations</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#f59e0b' }}>{metrics.totalReg}</div>
        </div>
        <div className="card-dark" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: '#707070', marginBottom: 4 }}>Simulated</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#a78bfa' }}>{data.students.filter(s => s.simulated).length}</div>
        </div>
        <div className="card-dark" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: '#707070', marginBottom: 4 }}>Demo Registered</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#22c55e' }}>{data.students.filter(s => !s.simulated).length}</div>
        </div>
        <div className="card-dark" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: '#707070', marginBottom: 4 }}>Progress</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#60a5fa' }}>{metrics.progressPct}%</div>
        </div>
      </div>

      {/* Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          {
            icon: Users, label: '+1 Registration', desc: 'Add a single simulated student',
            action: () => sim(1, '+1 Registration'), color: '#60a5fa',
          },
          {
            icon: Zap, label: '+10 Registrations', desc: 'Simulate a small batch',
            action: () => sim(10, '+10 Registrations'), color: '#f59e0b',
          },
          {
            icon: Activity, label: '+50 Registrations', desc: 'Simulate a campaign burst',
            action: () => sim(50, '+50 Registrations'), color: '#a78bfa',
          },
          {
            icon: Play, label: 'Simulate a Day', desc: 'Add 10–30 registrations across channels',
            action: runDaySimulation, color: '#22c55e',
          },
        ].map(btn => (
          <button
            key={btn.label}
            className="card-dark card-hover"
            onClick={btn.action}
            style={{ padding: 20, cursor: 'pointer', background: 'none', border: '1px solid #1e1e1e', borderRadius: 12, textAlign: 'left', transition: 'all 0.2s ease' }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${btn.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <btn.icon size={20} color={btn.color} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e8e8e8', marginBottom: 4 }}>{btn.label}</div>
            <div style={{ fontSize: 12, color: '#707070' }}>{btn.desc}</div>
          </button>
        ))}
      </div>

      {/* Reset */}
      <div className="card-dark" style={{ padding: 20, marginBottom: 24, border: '1px solid rgba(239,68,68,0.15)' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 8 }}>Reset Demo Data</div>
        <div style={{ fontSize: 13, color: '#707070', marginBottom: 16 }}>Restores all data to the original sample state. This will erase any changes you've made, including manual registrations, campaign edits, and thinking log entries.</div>
        <button className="btn-danger" onClick={() => { resetDemo(); log('✓ Demo data reset to original sample state', 'success'); setLastAction('Reset'); }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <RefreshCw size={14} /> Reset All Demo Data
        </button>
      </div>

      {/* Activity Log */}
      <div className="card-dark" style={{ padding: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 16 }}>
          <FlaskConical size={16} color="#f59e0b" style={{ display: 'inline', marginRight: 8 }} />
          Simulation Activity Log
        </div>
        {testLog.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#505050', padding: '24px 0', fontSize: 13 }}>
            No simulation actions yet. Use the controls above to add data.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {testLog.map((entry, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 12px', borderRadius: 6, background: entry.type === 'success' ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)' }}>
                <span style={{ fontSize: 11, color: '#505050', whiteSpace: 'nowrap' }}>{entry.time}</span>
                <span style={{ fontSize: 13, color: entry.type === 'success' ? '#22c55e' : '#ef4444' }}>{entry.msg}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
