import React from 'react';
import { useApp } from '../context/AppContext';
import { calculateMetrics } from '../store/dataStore';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Target, TrendingUp, Users, DollarSign, GitBranch,
  Clock, Activity, Trophy, RefreshCw, Play, AlertCircle
} from 'lucide-react';

function MetricCard({ title, value, sub, icon: Icon, accent = '#f59e0b', trend }) {
  return (
    <div className="card-dark card-hover animate-fade-in" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: '#707070', fontWeight: 500 }}>{title}</div>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={accent} />
        </div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#e8e8e8', marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#505050' }}>{sub}</div>}
      {trend && (
        <div style={{ fontSize: 12, color: trend > 0 ? '#22c55e' : '#ef4444', marginTop: 4 }}>
          {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}% vs yesterday
        </div>
      )}
    </div>
  );
}

const CHANNEL_COLORS = ['#f59e0b', '#60a5fa', '#22c55e', '#a78bfa', '#f87171'];

export default function Dashboard() {
  const { data, simulateRegistrations, resetDemo } = useApp();
  const metrics = calculateMetrics(data);

  const pieData = Object.entries(metrics.channelCounts).map(([name, value]) => ({ name, value }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div style={{ background: '#141414', border: '1px solid #303030', borderRadius: 8, padding: '10px 14px' }}>
          <div style={{ color: '#e8e8e8', fontSize: 13 }}>{payload[0].payload.label || payload[0].payload.name}</div>
          <div style={{ color: '#f59e0b', fontWeight: 700 }}>{payload[0].value}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="section-title">Growth Dashboard</h1>
          <p className="section-subtitle">Live campaign metrics — all data is simulated for demo purposes</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={resetDemo} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RefreshCw size={14} /> Reset Demo
          </button>
          <button className="btn-primary" onClick={() => simulateRegistrations(10)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Play size={14} /> Run Simulation (+10)
          </button>
        </div>
      </div>

      {/* Demo Banner */}
      <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 8, padding: '10px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        <AlertCircle size={16} color="#f59e0b" />
        <span style={{ fontSize: 13, color: '#a0a0a0' }}>
          <strong style={{ color: '#f59e0b' }}>SIMULATION MODE:</strong> All metrics reflect demo data only. No real students are registered. Campaign outcomes are not guaranteed.
        </span>
      </div>

      {/* Progress to target */}
      <div className="card-dark" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8' }}>Campaign Progress</div>
            <div style={{ fontSize: 13, color: '#707070' }}>Target: 500 registrations in 7 days</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="text-gradient-gold" style={{ fontSize: 32, fontWeight: 800 }}>{metrics.totalReg}</div>
            <div style={{ fontSize: 13, color: '#707070' }}>of 500 registered</div>
          </div>
        </div>
        <div className="progress-bar-bg" style={{ height: 12 }}>
          <div className="progress-bar-fill" style={{ width: `${metrics.progressPct}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: '#707070' }}>{metrics.progressPct}% complete</span>
          <span style={{ fontSize: 12, color: '#707070' }}>{500 - metrics.totalReg} remaining</span>
        </div>

        {/* Health indicator */}
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Activity size={16} color={metrics.healthColor === 'green' ? '#22c55e' : metrics.healthColor === 'gold' ? '#f59e0b' : '#ef4444'} />
          <span style={{ fontSize: 13, color: '#707070' }}>Campaign Health:</span>
          <span className={`badge-${metrics.healthColor === 'gold' ? 'gold' : metrics.healthColor === 'green' ? 'green' : 'red'}`}>
            {metrics.healthLabel} ({metrics.healthScore}/100)
          </span>
          <span style={{ fontSize: 12, color: '#505050' }}>·</span>
          <span style={{ fontSize: 12, color: '#707070' }}>{metrics.daysRemaining} days remaining</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <MetricCard title="Total Registrations" value={metrics.totalReg} sub="Demo simulated" icon={Users} accent="#f59e0b" />
        <MetricCard title="Referral Registrations" value={metrics.referralReg} sub={`${metrics.referralRate}% of total`} icon={GitBranch} accent="#60a5fa" />
        <MetricCard title="Days Remaining" value={metrics.daysRemaining} sub={`Day ${metrics.daysElapsed} of 7`} icon={Clock} accent="#a78bfa" />
        <MetricCard title="Budget Remaining" value={`₹${metrics.budgetRemaining}`} sub={`₹${metrics.totalSpent} of ₹2,000 used`} icon={DollarSign} accent="#22c55e" />
        <MetricCard title="Cost Per Registration" value={metrics.totalSpent > 0 ? `₹${metrics.costPerReg.toFixed(0)}` : '₹0'} sub="Based on spend so far" icon={TrendingUp} accent="#f87171" />
        <MetricCard title="Est. Conversion Rate" value={`${metrics.conversionRate}%`} sub="Visits to registration (estimate)" icon={Target} accent="#f59e0b" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Daily Trend */}
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 16 }}>Daily Registration Trend</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={metrics.dailyTrend}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
              <XAxis dataKey="label" stroke="#505050" tick={{ fontSize: 11 }} />
              <YAxis stroke="#505050" tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="cumulative" stroke="#f59e0b" fill="url(#goldGrad)" strokeWidth={2} name="Cumulative" />
              <Area type="monotone" dataKey="count" stroke="#60a5fa" fill="transparent" strokeWidth={1.5} strokeDasharray="4 2" name="Daily" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Pie */}
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 16 }}>Channel Breakdown</div>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                    {pieData.map((_, i) => <Cell key={i} fill={CHANNEL_COLORS[i % CHANNEL_COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                {pieData.slice(0, 4).map((d, i) => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#a0a0a0' }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: CHANNEL_COLORS[i % CHANNEL_COLORS.length], flexShrink: 0 }} />
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
                    <span style={{ color: '#e8e8e8', fontWeight: 600 }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', color: '#505050', padding: '40px 0', fontSize: 13 }}>No registrations yet. Run simulation to add data.</div>
          )}
        </div>
      </div>

      {/* Referral Leaderboard */}
      <div className="card-dark" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Trophy size={18} color="#f59e0b" />
          <span style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8' }}>Top Referral Codes</span>
        </div>
        {metrics.leaderboard.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className="table-dark">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Code</th>
                  <th>Referrer</th>
                  <th>Referrals</th>
                </tr>
              </thead>
              <tbody>
                {metrics.leaderboard.map((entry, i) => (
                  <tr key={entry.code}>
                    <td>
                      <span className={i === 0 ? 'badge-gold' : i === 1 ? 'badge-blue' : 'badge-green'}>#{i + 1}</span>
                    </td>
                    <td style={{ fontFamily: 'monospace', color: '#f59e0b' }}>{entry.code}</td>
                    <td>{entry.ownerName}</td>
                    <td style={{ fontWeight: 700, color: '#e8e8e8' }}>{entry.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#505050', padding: '30px 0', fontSize: 13 }}>No referral data yet. Register students with referral codes to see the leaderboard.</div>
        )}
      </div>
    </div>
  );
}
