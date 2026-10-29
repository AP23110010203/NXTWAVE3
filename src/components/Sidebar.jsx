import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, GitBranch, Calendar, BarChart3,
  Bot, BookOpen, FlaskConical, FileText, ChevronLeft, ChevronRight, Flame
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/register', icon: Users, label: 'Registration' },
  { path: '/referral', icon: GitBranch, label: 'Referral Engine' },
  { path: '/campaign', icon: Calendar, label: 'Campaign Planner' },
  { path: '/channels', icon: BarChart3, label: 'Channel Strategy' },
  { path: '/copilot', icon: Bot, label: 'AI Copilot' },
  { path: '/thinking', icon: BookOpen, label: 'My Growth Thinking' },
  { path: '/simulation', icon: FlaskConical, label: 'Simulation Controls' },
  { path: '/submission', icon: FileText, label: 'Submission Kit' },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside style={{
      width: collapsed ? '64px' : '240px',
      minHeight: '100vh',
      background: '#0a0c18',
      borderRight: '1px solid #1a1f35',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.2s ease',
      flexShrink: 0,
      position: 'relative',
    }}>
      <div style={{ padding: collapsed ? '20px 12px' : '20px 16px', borderBottom: '1px solid #1a1f35', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Flame size={18} color="#fff" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#e8eaf0', lineHeight: 1.2 }}>NxtWave</div>
            <div style={{ fontSize: 11, color: '#8090b0', fontWeight: 500 }}>GrowthOS · Crimson</div>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <Link key={path} to={path} className={`sidebar-item${active ? ' active' : ''}`} title={collapsed ? label : undefined}>
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid #1a1f35' }}>
          <div style={{ fontSize: 11, color: '#2a3050', lineHeight: 1.5 }}>
            ⚠️ Demo prototype for<br />NxtWave Growth Intern Challenge.<br />Not an official NxtWave product.
          </div>
        </div>
      )}

      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)',
          width: 24, height: 24, borderRadius: '50%',
          background: '#1a1f35', border: '1px solid #252a45',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#8090b0', zIndex: 10,
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
