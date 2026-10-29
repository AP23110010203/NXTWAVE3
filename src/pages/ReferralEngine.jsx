import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateMetrics, resolveReferral } from '../store/dataStore';
import { GitBranch, Copy, MessageCircle, Mail, CheckCircle, Trophy, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DEMO_URL = 'https://demo.nxtwave-growthOS.local/register';

export default function ReferralEngine() {
  const { data } = useApp();
  const metrics = calculateMetrics(data);
  const [testCode, setTestCode] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [copied, setCopied] = useState({});

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 2000);
  };

  const handleTestReferral = () => {
    if (!testCode.trim()) return;
    const result = resolveReferral(data.students, testCode.trim(), testEmail.trim() || 'test@nobody.com');
    setTestResult(result);
  };

  const getShareMessage = (code) =>
    `I'm joining a free online workshop: "Build Your First AI Project in 60 Minutes"!\n\nIf you're a final-year engineering student interested in AI, join me!\n\nRegister here: ${DEMO_URL}\nUse my referral code: ${code}\n\n[DEMO SIMULATION — No actual workshop URL is active]`;

  const referralData = metrics.leaderboard.map(e => ({ name: e.ownerName.split(' ')[0], referrals: e.count, code: e.code }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div style={{ background: '#141414', border: '1px solid #303030', borderRadius: 8, padding: '10px 14px' }}>
          <div style={{ color: '#60a5fa', fontWeight: 700 }}>{payload[0].value} referrals</div>
          <div style={{ color: '#707070', fontSize: 12 }}>{payload[0].payload.code}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title">Referral Growth Engine</h1>
        <p className="section-subtitle">Track, test, and analyze the referral system — all simulated, no real messages sent</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: '#707070', marginBottom: 8 }}>Total Referred</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#60a5fa' }}>{metrics.referralReg}</div>
          <div style={{ fontSize: 12, color: '#505050' }}>registrations via referral</div>
        </div>
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: '#707070', marginBottom: 8 }}>Referral Rate</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#f59e0b' }}>{metrics.referralRate}%</div>
          <div style={{ fontSize: 12, color: '#505050' }}>of total {metrics.totalReg} registrations</div>
        </div>
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: '#707070', marginBottom: 8 }}>Active Referrers</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#22c55e' }}>{metrics.leaderboard.length}</div>
          <div style={{ fontSize: 12, color: '#505050' }}>unique referral codes used</div>
        </div>
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: '#707070', marginBottom: 8 }}>Est. Target Contribution</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#a78bfa' }}>{((metrics.referralReg / 500) * 100).toFixed(0)}%</div>
          <div style={{ fontSize: 12, color: '#505050' }}>of 500-reg target from referrals</div>
        </div>
      </div>

      {/* Referral Bar Chart */}
      {referralData.length > 0 && (
        <div className="card-dark" style={{ padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 16 }}>Registrations Per Referrer</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={referralData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
              <XAxis dataKey="name" stroke="#505050" tick={{ fontSize: 11 }} />
              <YAxis stroke="#505050" tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="referrals" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Referral Code Tester */}
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <GitBranch size={18} color="#f59e0b" />
            <span style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8' }}>Test a Referral Code</span>
          </div>
          <p style={{ fontSize: 13, color: '#707070', marginBottom: 16 }}>Enter a referral code to validate it without registering.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 6 }}>Referral Code</label>
              <input
                className="input-dark"
                placeholder="e.g. ARJ1A2"
                value={testCode}
                onChange={e => { setTestCode(e.target.value.toUpperCase()); setTestResult(null); }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 6 }}>Your Email (to test self-referral prevention)</label>
              <input
                className="input-dark"
                placeholder="your@email.com (optional)"
                value={testEmail}
                onChange={e => { setTestEmail(e.target.value); setTestResult(null); }}
              />
            </div>
            <button className="btn-primary" onClick={handleTestReferral}>Test Code</button>
          </div>

          {testResult && (
            <div style={{
              marginTop: 16, padding: 12, borderRadius: 8,
              background: testResult.valid ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              border: `1px solid ${testResult.valid ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: testResult.valid ? '#22c55e' : '#ef4444' }}>
                {testResult.valid ? '✓ Valid Code' : '✗ Invalid Code'}
              </div>
              <div style={{ fontSize: 12, color: '#a0a0a0', marginTop: 4 }}>{testResult.reason}</div>
              {testResult.valid && testResult.referrer && (
                <div style={{ fontSize: 12, color: '#707070', marginTop: 4 }}>
                  Referrer: {testResult.referrer.name} ({testResult.referrer.college})
                </div>
              )}
            </div>
          )}
        </div>

        {/* Share Templates */}
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <MessageCircle size={18} color="#60a5fa" />
            <span style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8' }}>Referral Share Templates</span>
          </div>

          <div style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#707070', marginBottom: 8 }}>WhatsApp / General Template</div>
            <div style={{ fontSize: 12, color: '#a0a0a0', lineHeight: 1.6 }}>
              🚀 I'm joining a free AI workshop! "Build Your First AI Project in 60 Minutes"<br /><br />
              Final-year engineering students — this is for you!<br />
              Register free: {DEMO_URL}<br />
              Use code: <strong style={{ color: '#f59e0b' }}>[YOUR_CODE]</strong>
            </div>
          </div>

          <div style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#707070', marginBottom: 8 }}>College Community Template</div>
            <div style={{ fontSize: 12, color: '#a0a0a0', lineHeight: 1.6 }}>
              Hey everyone! There's a free online workshop for us — "Build Your First AI Project in 60 Minutes." No prior experience needed. I'm attending and wanted to share. Register: {DEMO_URL} (Use code: <strong style={{ color: '#f59e0b' }}>[YOUR_CODE]</strong>)
            </div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: 8, padding: 10, fontSize: 11, color: '#707070' }}>
            <AlertCircle size={12} color="#f59e0b" style={{ display: 'inline', marginRight: 4 }} />
            These are templates only. No messages are sent automatically. Always get permission before posting in community groups. Avoid spam.
          </div>
        </div>
      </div>

      {/* All Registrations with Referral Info */}
      <div className="card-dark" style={{ padding: 20, marginTop: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 16 }}>All Demo Registrations</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} className="table-dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>College</th>
                <th>Referral Code</th>
                <th>Used Code</th>
                <th>Channel</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.students.slice(0, 20).map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td style={{ color: '#707070' }}>{s.college}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <code style={{ color: '#f59e0b', fontSize: 12 }}>{s.referralCode}</code>
                      <button
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#505050', padding: 0 }}
                        onClick={() => copyToClipboard(s.referralCode, s.id)}
                      >
                        {copied[s.id] ? <CheckCircle size={12} color="#22c55e" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </td>
                  <td>
                    {s.usedReferral
                      ? <span style={{ color: '#22c55e', fontSize: 12 }}>{s.usedReferral}</span>
                      : <span style={{ color: '#505050', fontSize: 12 }}>—</span>}
                  </td>
                  <td><span className="badge-blue" style={{ fontSize: 11 }}>{s.channel}</span></td>
                  <td>
                    <span className={s.simulated ? 'badge-gold' : 'badge-green'} style={{ fontSize: 11 }}>
                      {s.simulated ? 'Simulated' : 'Demo Reg'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.students.length > 20 && (
            <div style={{ textAlign: 'center', color: '#505050', padding: '12px', fontSize: 13 }}>
              Showing 20 of {data.students.length} registrations
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
