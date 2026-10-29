import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateMetrics } from '../store/dataStore';
import { Calendar, CheckCircle, Clock, AlertCircle, Edit3, Save, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const STATUS_STYLES = {
  completed: { label: 'Completed', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)' },
  'in-progress': { label: 'In Progress', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  pending: { label: 'Pending', color: '#707070', bg: 'rgba(112,112,112,0.1)', border: 'rgba(112,112,112,0.3)' },
};

export default function CampaignPlanner() {
  const { data, updateCampaignDay } = useApp();
  const metrics = calculateMetrics(data);
  const [editingDay, setEditingDay] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (dayIndex) => {
    setEditingDay(dayIndex);
    setEditForm({ ...data.campaignDays[dayIndex] });
  };

  const saveEdit = () => {
    if (editingDay !== null) {
      updateCampaignDay(editingDay, editForm);
      setEditingDay(null);
    }
  };

  // Forecast data
  const forecastData = data.campaignDays.map((d, i) => ({
    day: `Day ${d.day}`,
    target: d.targetReg,
    actual: i < metrics.daysElapsed ? d.actualReg : undefined,
    cumTarget: d.targetReg,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div style={{ background: '#141414', border: '1px solid #303030', borderRadius: 8, padding: '10px 14px' }}>
          {payload.map(p => (
            <div key={p.name} style={{ color: p.color, fontSize: 13 }}>{p.name}: {p.value}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title">7-Day Campaign Planner</h1>
        <p className="section-subtitle">Plan, track, and edit the 7-day campaign strategy</p>
      </div>

      {/* Forecast Chart */}
      <div className="card-dark" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8' }}>Registration Forecast vs Target</div>
          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: '#f59e0b' }}>
            ⚠️ Forecast only — not guaranteed results
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={forecastData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
            <XAxis dataKey="day" stroke="#505050" tick={{ fontSize: 11 }} />
            <YAxis stroke="#505050" tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={500} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Target: 500', fill: '#ef4444', fontSize: 11 }} />
            <Line type="monotone" dataKey="cumTarget" name="Cumulative Target" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Plan */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.campaignDays.map((day, i) => {
          const st = STATUS_STYLES[day.status] || STATUS_STYLES.pending;
          const isEditing = editingDay === i;

          return (
            <div
              key={day.day}
              className="card-dark card-hover"
              style={{ padding: 20, borderLeft: `4px solid ${st.color}` }}
            >
              {isEditing ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#e8e8e8' }}>Editing Day {day.day}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-primary" onClick={saveEdit} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px' }}>
                        <Save size={14} /> Save
                      </button>
                      <button className="btn-secondary" onClick={() => setEditingDay(null)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px' }}>
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>Goal</label>
                      <input className="input-dark" value={editForm.goal || ''} onChange={e => setEditForm(f => ({ ...f, goal: e.target.value }))} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>Target Registrations (cumulative)</label>
                      <input className="input-dark" type="number" value={editForm.targetReg || ''} onChange={e => setEditForm(f => ({ ...f, targetReg: parseInt(e.target.value) || 0 }))} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>Channel</label>
                      <input className="input-dark" value={editForm.channel || ''} onChange={e => setEditForm(f => ({ ...f, channel: e.target.value }))} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>Owner</label>
                      <input className="input-dark" value={editForm.owner || ''} onChange={e => setEditForm(f => ({ ...f, owner: e.target.value }))} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>Status</label>
                      <select className="input-dark" value={editForm.status || 'pending'} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>Actual Registrations (demo)</label>
                      <input className="input-dark" type="number" value={editForm.actualReg || ''} onChange={e => setEditForm(f => ({ ...f, actualReg: parseInt(e.target.value) || 0 }))} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>Activities</label>
                      <textarea className="input-dark" rows={3} value={editForm.activities || ''} onChange={e => setEditForm(f => ({ ...f, activities: e.target.value }))} style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ display: 'flex', align: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: st.bg, border: `1px solid ${st.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: st.color, flexShrink: 0 }}>
                        {day.day}
                      </div>
                      <div style={{ marginLeft: 12 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#e8e8e8' }}>Day {day.day}: {day.goal}</div>
                        <div style={{ fontSize: 12, color: '#707070', marginTop: 2 }}>{day.date}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, color: st.color, background: st.bg, border: `1px solid ${st.border}`, padding: '3px 10px', borderRadius: 999, fontWeight: 600 }}>
                        {st.label}
                      </span>
                      <button className="btn-secondary" onClick={() => startEdit(i)} style={{ padding: '4px 8px' }}>
                        <Edit3 size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ marginLeft: 48 }}>
                    <div style={{ fontSize: 13, color: '#a0a0a0', marginBottom: 12, lineHeight: 1.6 }}>{day.activities}</div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 12, color: '#707070' }}>📣 <strong style={{ color: '#a0a0a0' }}>Channel:</strong> {day.channel}</div>
                      <div style={{ fontSize: 12, color: '#707070' }}>👤 <strong style={{ color: '#a0a0a0' }}>Owner:</strong> {day.owner}</div>
                      <div style={{ fontSize: 12, color: '#707070' }}>🎯 <strong style={{ color: '#a0a0a0' }}>Target:</strong> {day.targetReg} cumulative registrations</div>
                      <div style={{ fontSize: 12, color: '#22c55e' }}>✓ <strong>Actual (demo):</strong> {day.actualReg} registrations</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, padding: 14, fontSize: 12, color: '#707070' }}>
        <AlertCircle size={14} color="#f59e0b" style={{ display: 'inline', marginRight: 6 }} />
        <strong style={{ color: '#f59e0b' }}>Disclaimer:</strong> The registration targets in this planner are planning assumptions only. Actual results depend on messaging quality, community receptivity, and execution. The forecast is not a guarantee.
      </div>
    </div>
  );
}
