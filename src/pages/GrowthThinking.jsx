import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateId } from '../store/dataStore';
import { BookOpen, Plus, Edit3, Save, X, Trash2, AlertCircle } from 'lucide-react';

export default function GrowthThinking() {
  const { data, updateThinkingEntry, addThinkingEntry, deleteThinkingEntry, updateReflections } = useApp();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [addingNew, setAddingNew] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', initialIdea: '', aiSuggestion: '', myDecision: '' });
  const [editReflections, setEditReflections] = useState(false);
  const [reflForm, setReflForm] = useState({});

  const startEditReflections = () => {
    setReflForm({ ...data.reflections });
    setEditReflections(true);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title">My Growth Thinking</h1>
        <p className="section-subtitle">An honest decision log — documenting what I tried, what AI suggested, and what I actually did</p>
      </div>

      <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#a0a0a0' }}>
        <AlertCircle size={14} color="#f59e0b" style={{ display: 'inline', marginRight: 6 }} />
        <strong style={{ color: '#f59e0b' }}>Transparency note:</strong> These are editable draft examples, not a log of actual past AI conversations. They demonstrate a growth intern's thinking process for the NxtWave challenge.
      </div>

      {/* Thinking Entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {data.thinkingLog.map((entry, i) => {
          const isEditing = editingId === entry.id;

          return (
            <div key={entry.id} className="card-dark" style={{ padding: 24 }}>
              {isEditing ? (
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>Decision Title</label>
                    <input className="input-dark" value={editForm.title || ''} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g., Budget Allocation Strategy" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>💡 My Initial Idea</label>
                      <textarea className="input-dark" rows={4} value={editForm.initialIdea || ''} onChange={e => setEditForm(f => ({ ...f, initialIdea: e.target.value }))} style={{ resize: 'vertical' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>🤖 What AI Suggested</label>
                      <textarea className="input-dark" rows={4} value={editForm.aiSuggestion || ''} onChange={e => setEditForm(f => ({ ...f, aiSuggestion: e.target.value }))} style={{ resize: 'vertical' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>✅ My Decision & Why</label>
                      <textarea className="input-dark" rows={4} value={editForm.myDecision || ''} onChange={e => setEditForm(f => ({ ...f, myDecision: e.target.value }))} style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-primary" onClick={() => { updateThinkingEntry(entry.id, editForm); setEditingId(null); }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Save size={14} /> Save
                    </button>
                    <button className="btn-secondary" onClick={() => setEditingId(null)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <span className="badge-gold" style={{ marginRight: 8 }}>Decision {i + 1}</span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#e8e8e8' }}>{entry.title}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-secondary" onClick={() => { setEditingId(entry.id); setEditForm({ ...entry }); }} style={{ padding: '4px 8px' }}><Edit3 size={13} /></button>
                      <button className="btn-danger" onClick={() => deleteThinkingEntry(entry.id)} style={{ padding: '4px 8px' }}><Trash2 size={13} /></button>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    {[
                      { label: '💡 My Initial Idea', value: entry.initialIdea, color: '#60a5fa' },
                      { label: '🤖 What AI Suggested', value: entry.aiSuggestion, color: '#a78bfa' },
                      { label: '✅ My Decision & Why', value: entry.myDecision, color: '#22c55e' },
                    ].map(col => (
                      <div key={col.label} style={{ background: '#0a0a0a', border: `1px solid ${col.color}22`, borderRadius: 8, padding: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: col.color, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col.label}</div>
                        <div style={{ fontSize: 13, color: '#c8c8c8', lineHeight: 1.6 }}>{col.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Entry */}
      {addingNew ? (
        <div className="card-dark" style={{ padding: 24, marginBottom: 32, border: '1px solid rgba(245,158,11,0.3)' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 16 }}>New Decision Log Entry</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>Title</label>
            <input className="input-dark" value={newEntry.title} onChange={e => setNewEntry(f => ({ ...f, title: e.target.value }))} placeholder="What decision are you documenting?" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[
              { field: 'initialIdea', label: '💡 My Initial Idea' },
              { field: 'aiSuggestion', label: '🤖 What AI Suggested' },
              { field: 'myDecision', label: '✅ My Decision & Why' },
            ].map(col => (
              <div key={col.field}>
                <label style={{ fontSize: 12, color: '#707070', display: 'block', marginBottom: 4 }}>{col.label}</label>
                <textarea className="input-dark" rows={4} value={newEntry[col.field]} onChange={e => setNewEntry(f => ({ ...f, [col.field]: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-primary" onClick={() => {
              if (newEntry.title && newEntry.myDecision) {
                addThinkingEntry({ ...newEntry, id: generateId(), createdAt: Date.now() });
                setNewEntry({ title: '', initialIdea: '', aiSuggestion: '', myDecision: '' });
                setAddingNew(false);
              }
            }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Save size={14} /> Save Entry
            </button>
            <button className="btn-secondary" onClick={() => setAddingNew(false)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <button className="btn-secondary" onClick={() => setAddingNew(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <Plus size={16} /> Add New Thinking Entry
        </button>
      )}

      {/* Reflections */}
      <div className="card-dark" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#e8e8e8' }}>Reflection Section</div>
            <div style={{ fontSize: 13, color: '#707070', marginTop: 2 }}>Honest retrospective on the project</div>
          </div>
          {!editReflections && (
            <button className="btn-secondary" onClick={startEditReflections} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Edit3 size={14} /> Edit
            </button>
          )}
        </div>

        {editReflections ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { field: 'whatChanged', label: 'What changed between your first idea and final solution?' },
              { field: 'improvements', label: 'What would you improve with another 24 hours?' },
              { field: 'rejectedAISuggestions', label: 'What did AI suggest that you deliberately rejected?' },
            ].map(r => (
              <div key={r.field}>
                <label style={{ fontSize: 13, color: '#a0a0a0', fontWeight: 500, display: 'block', marginBottom: 6 }}>{r.label}</label>
                <textarea className="input-dark" rows={3} value={reflForm[r.field] || ''} onChange={e => setReflForm(f => ({ ...f, [r.field]: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-primary" onClick={() => { updateReflections(reflForm); setEditReflections(false); }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Save size={14} /> Save Reflections
              </button>
              <button className="btn-secondary" onClick={() => setEditReflections(false)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <X size={14} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: '🔄 What changed between your first idea and final solution?', value: data.reflections.whatChanged },
              { label: '🚀 What would you improve with another 24 hours?', value: data.reflections.improvements },
              { label: '🚫 What did AI suggest that you deliberately rejected?', value: data.reflections.rejectedAISuggestions },
            ].map(r => (
              <div key={r.label} style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', marginBottom: 8 }}>{r.label}</div>
                <div style={{ fontSize: 14, color: '#c8c8c8', lineHeight: 1.7 }}>{r.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
