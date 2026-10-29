import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadData, saveData, getDefaultData, resetData as resetStoreData, createSimulatedStudent } from '../store/dataStore';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let d = loadData();
    if (!d || !d.initialized) d = getDefaultData();
    setData(d);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (data) saveData(data);
  }, [data]);

  const updateData = (updater) => {
    setData(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      return next;
    });
  };

  const resetDemo = () => { const fresh = resetStoreData(); setData(fresh); };
  const addStudent = (student) => { updateData(prev => ({ ...prev, students: [...prev.students, student] })); };

  const simulateRegistrations = (count) => {
    updateData(prev => {
      const newStudents = [];
      let existing = [...prev.students];
      for (let i = 0; i < count; i++) {
        const s = createSimulatedStudent(existing);
        newStudents.push(s);
        existing.push(s);
      }
      return { ...prev, students: [...prev.students, ...newStudents] };
    });
  };

  const updateCampaignDay = (dayIndex, updates) => {
    updateData(prev => {
      const days = [...prev.campaignDays];
      days[dayIndex] = { ...days[dayIndex], ...updates };
      return { ...prev, campaignDays: days };
    });
  };

  const updateChannel = (channelId, updates) => {
    updateData(prev => ({ ...prev, channels: prev.channels.map(c => c.id === channelId ? { ...c, ...updates } : c) }));
  };

  const updateBudgetAllocation = (allocationId, updates) => {
    updateData(prev => ({ ...prev, budget: { ...prev.budget, allocations: prev.budget.allocations.map(a => a.id === allocationId ? { ...a, ...updates } : a) } }));
  };

  const updateThinkingEntry = (id, updates) => {
    updateData(prev => ({ ...prev, thinkingLog: prev.thinkingLog.map(e => e.id === id ? { ...e, ...updates } : e) }));
  };

  const addThinkingEntry = (entry) => { updateData(prev => ({ ...prev, thinkingLog: [...prev.thinkingLog, entry] })); };
  const deleteThinkingEntry = (id) => { updateData(prev => ({ ...prev, thinkingLog: prev.thinkingLog.filter(e => e.id !== id) })); };
  const updateReflections = (updates) => { updateData(prev => ({ ...prev, reflections: { ...prev.reflections, ...updates } })); };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#06080f' }}>
      <div style={{ color: '#dc2626', fontSize: '18px', fontWeight: 600 }}>Loading GrowthOS...</div>
    </div>
  );

  return (
    <AppContext.Provider value={{
      data, updateData, resetDemo, addStudent, simulateRegistrations,
      updateCampaignDay, updateChannel, updateBudgetAllocation,
      updateThinkingEntry, addThinkingEntry, deleteThinkingEntry, updateReflections,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
