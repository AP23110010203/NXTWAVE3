import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateMetrics } from '../store/dataStore';
import { AlertCircle, Edit3, Save, X, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#f59e0b', '#60a5fa', '#22c55e', '#a78bfa', '#f87171'];

export default function ChannelStrategy() {
  const { data, updateChannel, updateBudgetAllocation } = useApp();
  const metrics = calculateMetrics(data);
  const [editingChannel, setEditingChannel] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editingBudget, setEditingBudget] = useState(null);
  const [budgetForm, setBudgetForm] = useState({});

  const totalExpected = data.channels.reduce((s, c) => s + c.expectedReg, 0);
  const totalSpent = data.budget.allocations.reduce((s, a) => s + a.spent, 0);
  const totalAllocated = data.budget.allocations.reduce((s, a) => s + a.allocated, 0);
  const targetGap = totalExpected - 500;
  const budgetExceeded = totalAllocated > 2000;

  const chartData = data.channels.map((c, i) => ({
    name: c.name.split(' ').slice(0, 2).join(' '),
    expected: c.expectedReg,
    actual: c.actualReg,
    color: COLORS[i],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div style={{ background: '#141414', border: '1px solid #303030', borderRadius: 8, padding: '10px 14px' }}>
          {payload.map(p => (
            <div key={p.name} style={{ color: p.fill || p.color, fontSize: 13 }}>{p.name}: {p.value}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title">Channel Strategy & Budget</h1>
        <p className="section-subtitle">₹2,000 budget plan and channel performance — all figures are planning estimates</p>
      </div>

      {/* Warnings */}
      {targetGap !== 0 && (
        <div style={{ background: `rgba(${targetGap > 0 ? '34,197,94' : '239,68,68'},0.08)`, border: `1px solid rgba(${targetGap > 0 ? '34,197,94' : '239,68,68'},0.3)`, borderRadius: 8, padding: '10px 16px', marginBottom: 12, fontSize: 13, color: targetGap > 0 ? '#22c55e' : '#ef4444' }}>
          {targetGap > 0 ? `✓ Channel targets total ${totalExpected} — exceeds 500 target by ${targetGap} (buffer is okay).` : `⚠️ Channel targets total only ${totalExpected} — ${Math.abs(targetGap)} short of 500 target. Adjust channel expected registrations.`}
        </div>
      )}
      {budgetExceeded && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 16px', marginBottom: 12, fontSize: 13, color: '#ef4444' }}>
          ⚠️ Total allocated budget (₹{totalAllocated}) exceeds ₹2,000 limit! Please adjust allocations.
        </div>
      )}

      {/* Budget Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ fontSize: 12, color: '#707070', marginBottom: 6 }}>Total Budget</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b' }}>₹2,000</div>
        </div>
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ fontSize: 12, color: '#707070', marginBottom: 6 }}>Allocated</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: budgetExceeded ? '#ef4444' : '#e8e8e8' }}>₹{totalAllocated}</div>
          <div className="progress-bar-bg" style={{ marginTop: 8 }}>
            <div className="progress-bar-fill" style={{ width: `${Math.min(100, (totalAllocated / 2000) * 100)}%`, background: budgetExceeded ? '#ef4444' : undefined }} />
          </div>
        </div>
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ fontSize: 12, color: '#707070', marginBottom: 6 }}>Spent (Demo)</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#22c55e' }}>₹{totalSpent}</div>
        </div>
        <div className="card-dark" style={{ padding: 20 }}>
          <div style={{ fontSize: 12, color: '#707070', marginBottom: 6 }}>Remaining</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#60a5fa' }}>₹{2000 - totalSpent}</div>
        </div>
      </div>

      {/* Channel Chart */}
      <div className="card-dark" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 4 }}>Expected vs Actual Registrations by Channel</div>
        <div style={{ fontSize: 12, color: '#707070', marginBottom: 16 }}>⚠️ Expected = planning estimate; Actual = demo simulation data only</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
            <XAxis dataKey="name" stroke="#505050" tick={{ fontSize: 10 }} />
            <YAxis stroke="#505050" tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="expected" name="Expected (Plan)" fill="#1e1e1e" radius={[3, 3, 0, 0]}>
              {chartData.map((d, i) => <Cell key={i} fill={`${d.color}40`} stroke={d.color} strokeWidth={1} />)}
            </Bar>
            <Bar dataKey="actual" name="Actual (Demo)" radius={[3, 3, 0, 0]}>
              {chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Channel Performance Table */}
      <div className="card-dark" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 16 }}>Channel Performance Table</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} className="table-dark">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Est. Reach</th>
                <th>Expected Reg</th>
                <th>Actual Reg</th>
                <th>Conv. Rate</th>
                <th>Spend</th>
                <th>Cost/Reg</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.channels.map((ch, i) => {
                const isEditing = editingChannel === ch.id;
                const convRate = ch.estimatedReach > 0 ? ((ch.actualReg / ch.estimatedReach) * 100).toFixed(1) : '0.0';
                const costPerReg = ch.spend > 0 && ch.actualReg > 0 ? `₹${(ch.spend / ch.actualReg).toFixed(0)}` : ch.spend > 0 ? '—' : '₹0';

                if (isEditing) {
                  return (
                    <tr key={ch.id} style={{ background: 'rgba(245,158,11,0.05)' }}>
                      <td>{ch.name}</td>
                      <td><input className="input-dark" type="number" value={editForm.estimatedReach || ''} onChange={e => setEditForm(f => ({ ...f, estimatedReach: parseInt(e.target.value) || 0 }))} style={{ width: 80 }} /></td>
                      <td><input className="input-dark" type="number" value={editForm.expectedReg || ''} onChange={e => setEditForm(f => ({ ...f, expectedReg: parseInt(e.target.value) || 0 }))} style={{ width: 80 }} /></td>
                      <td><input className="input-dark" type="number" value={editForm.actualReg || ''} onChange={e => setEditForm(f => ({ ...f, actualReg: parseInt(e.target.value) || 0 }))} style={{ width: 80 }} /></td>
                      <td style={{ color: '#707070' }}>—</td>
                      <td><input className="input-dark" type="number" value={editForm.spend || ''} onChange={e => setEditForm(f => ({ ...f, spend: parseInt(e.target.value) || 0 }))} style={{ width: 80 }} /></td>
                      <td style={{ color: '#707070' }}>—</td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn-primary" onClick={() => { updateChannel(ch.id, editForm); setEditingChannel(null); }} style={{ padding: '4px 8px' }}><Save size={12} /></button>
                          <button className="btn-secondary" onClick={() => setEditingChannel(null)} style={{ padding: '4px 8px' }}><X size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={ch.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i], flexShrink: 0 }} />
                        <span>{ch.name}</span>
                      </div>
                    </td>
                    <td>{ch.estimatedReach.toLocaleString()}</td>
                    <td style={{ color: '#a0a0a0' }}>{ch.expectedReg} <span style={{ fontSize: 10, color: '#505050' }}>(est.)</span></td>
                    <td style={{ color: '#22c55e', fontWeight: 600 }}>{ch.actualReg} <span style={{ fontSize: 10, color: '#505050' }}>(demo)</span></td>
                    <td>{convRate}%</td>
                    <td>₹{ch.spend}</td>
                    <td>{costPerReg}</td>
                    <td>
                      <button className="btn-secondary" onClick={() => { setEditingChannel(ch.id); setEditForm({ ...ch }); }} style={{ padding: '4px 8px' }}>
                        <Edit3 size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Allocation */}
      <div className="card-dark" style={{ padding: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 4 }}>₹2,000 Budget Breakdown</div>
        <div style={{ fontSize: 12, color: '#707070', marginBottom: 16 }}>
          Allocated = planned spend. Spent = demo tracking only. Note: ₹0 channels use permission-based outreach — no advertising spend needed.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.budget.allocations.map(alloc => {
            const isEditing = editingBudget === alloc.id;
            const pct = (alloc.allocated / 2000) * 100;
            return (
              <div key={alloc.id} style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, padding: 14 }}>
                {isEditing ? (
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, color: '#e8e8e8', flex: 1 }}>{alloc.label}</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <label style={{ fontSize: 12, color: '#707070' }}>Allocated ₹</label>
                      <input className="input-dark" type="number" value={budgetForm.allocated || ''} onChange={e => setBudgetForm(f => ({ ...f, allocated: parseInt(e.target.value) || 0 }))} style={{ width: 100 }} />
                      <label style={{ fontSize: 12, color: '#707070' }}>Spent ₹</label>
                      <input className="input-dark" type="number" value={budgetForm.spent || ''} onChange={e => setBudgetForm(f => ({ ...f, spent: parseInt(e.target.value) || 0 }))} style={{ width: 100 }} />
                      <button className="btn-primary" onClick={() => { updateBudgetAllocation(alloc.id, budgetForm); setEditingBudget(null); }} style={{ padding: '6px 10px' }}><Save size={13} /></button>
                      <button className="btn-secondary" onClick={() => setEditingBudget(null)} style={{ padding: '6px 10px' }}><X size={13} /></button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 13, color: '#e8e8e8', fontWeight: 500 }}>{alloc.label}</span>
                        <span style={{ fontSize: 13, color: '#f59e0b', fontWeight: 700 }}>₹{alloc.allocated}</span>
                      </div>
                      <div className="progress-bar-bg" style={{ height: 4 }}>
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <div style={{ fontSize: 11, color: '#505050', marginTop: 4 }}>{alloc.note} · Spent: ₹{alloc.spent}</div>
                    </div>
                    <button className="btn-secondary" onClick={() => { setEditingBudget(alloc.id); setBudgetForm({ allocated: alloc.allocated, spent: alloc.spent }); }} style={{ padding: '4px 8px', flexShrink: 0 }}>
                      <Edit3 size={12} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, padding: 12, background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, fontSize: 12, color: '#707070' }}>
          <AlertCircle size={13} color="#f59e0b" style={{ display: 'inline', marginRight: 4 }} />
          <strong style={{ color: '#f59e0b' }}>Note:</strong> The same student may see multiple channels. Reach estimates are rough and need validation. Channel conversion assumptions are based on planning logic, not actual A/B test data. Paid spend should only happen after message-market fit is confirmed.
        </div>
      </div>
    </div>
  );
}
