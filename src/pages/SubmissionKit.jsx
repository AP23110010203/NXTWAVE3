import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateMetrics } from '../store/dataStore';
import { FileText, Copy, CheckCircle, ClipboardList, Video, BookOpen, DollarSign } from 'lucide-react';

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const doCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="btn-secondary" onClick={doCopy} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {copied ? <CheckCircle size={14} color="#22c55e" /> : <Copy size={14} />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

export default function SubmissionKit() {
  const { data } = useApp();
  const metrics = calculateMetrics(data);

  const growthPlan = `NXTWAVE GROWTH INTERN CHALLENGE — GROWTH PLAN SUMMARY
============================================================

OBJECTIVE: 500 registrations for "Build Your First AI Project in 60 Minutes"
CONSTRAINTS: ₹2,000 budget | 7 days | Final-year engineering students in India

STRATEGY SUMMARY (5-Slide / 2-Page Format)
-------------------------------------------

SLIDE 1 — The Goal
Target: 500 final-year engineering students
Workshop: Free online, beginner-friendly, 60-minute AI project workshop
Core hook: "Stop learning only theory. Build something real."

SLIDE 2 — The Audience
- Final-year B.Tech/B.E students, primarily CS/IT/ECE
- Frustrated with theory-only learning
- Looking to build real projects for placements
- Active on WhatsApp, Telegram, college clubs, LinkedIn

SLIDE 3 — The Strategy
Phase 1 (Days 1–2): Validate messaging, publish registration page
Phase 2 (Days 2–4): Permission-based outreach to college clubs, CRs, student communities
Phase 3 (Days 3–5): Ambassador referral program launch
Phase 4 (Days 5–7): Referral reminder, deadline push, paid test (if validated)

SLIDE 4 — Channel Breakdown (500 Target)
- College Clubs & CRs: 150 registrations (₹0 cost)
- Student Communities (WhatsApp/Telegram): 100 registrations (₹0 cost)
- Ambassador Referrals: 150 registrations (₹0 cost)
- Email & Direct Peer Sharing: 50 registrations (₹0 cost)
- Small Paid Promotion Test: 50 registrations (₹1,000 test budget)
Total: 500 registrations

SLIDE 5 — Budget Plan
- ₹0: Permission-based channels (clubs, communities, email, referrals)
- ₹1,000: Paid promotion test (ONLY after message validation)
- ₹500: Creative assets & content
- ₹500: Contingency (if test results justify it)
Total: ₹2,000 maximum

KEY ASSUMPTIONS (Not Guaranteed Outcomes):
- Assumes community admins grant permission to post
- Assumes referral participation rate of 25–35%
- Assumes paid test delivers ~50 registrations at ₹20/registration
- Actual results depend on message quality and execution
`;

  const videoScript = `3-MINUTE VIDEO SCRIPT — NXTWAVE GROWTH INTERN CHALLENGE
=========================================================

[0:00–0:30] INTRODUCTION — The Goal and Constraints
"Hi, I'm [Your Name]. I'm a student, and this is my submission for the NxtWave Growth Intern Challenge.
The task: Get 500 final-year engineering students to register for a free AI workshop in 7 days, with a ₹2,000 budget. Here's my approach."

[0:30–1:10] THE AUDIENCE AND ACQUISITION STRATEGY
"My target audience is final-year engineering students who know AI theory but have never built anything.
My strategy: Start with zero-cost, permission-based channels — college clubs, student communities, and peer referrals. Test messaging first. Only spend money after validating that the message resonates.
I built a referral engine where each registered student gets a unique code. When they share it and a friend registers, it gets attributed. No automatic messages are sent."

[1:10–2:10] LIVE DEMO — REFERRAL ENGINE, ANALYTICS, CAMPAIGN PLANNER
"Let me show you the prototype.
This is the Growth Dashboard — it shows registrations, referral rate, budget remaining, and campaign health in real time.
The Registration Page has full form validation and referral code handling.
The Referral Engine shows the leaderboard, lets me test referral codes, and generates share templates.
The Campaign Planner shows the 7-day strategy with editable tasks and forecasts.
The AI Copilot gives rule-based recommendations based on current demo metrics — it doesn't call any external AI."

[2:10–2:40] TRADE-OFFS AND AI INFLUENCE
"I made some deliberate choices.
AI suggested spending the full budget on paid ads. I rejected this — without message validation, that's wasteful.
AI suggested using generic messages. I rejected this — each channel needs a different value proposition.
I chose to build a referral system over a simple landing page because referrals compound and are measurable."

[2:40–3:00] FUTURE IMPROVEMENTS AND CLOSE
"If I had more time: I'd add backend auth, real-time collaboration, A/B message testing, and a proper analytics pipeline.
This prototype demonstrates the thinking behind the strategy, not just the final numbers. Thank you."
`;

  const checklist = `SUBMISSION CHECKLIST — NXTWAVE GROWTH INTERN CHALLENGE
=========================================================

□ Growth plan with 500-registration breakdown (✓ in Submission Kit)
□ ₹2,000 budget breakdown (✓ in Channel Strategy page)
□ Working demo/prototype (✓ this application)
□ Referral engine demonstrated (✓ Referral Engine page)
□ Analytics dashboard (✓ Growth Dashboard)
□ Campaign planner (✓ Campaign Planner page)
□ AI-assisted thinking log (✓ My Growth Thinking page)
□ 3-minute video script (✓ in Submission Kit)
□ No fake campaign results claimed (✓ all data marked as simulation)
□ No real students contacted (✓ simulation mode only)
□ No external API keys required (✓ local rule-based engine)
□ LocalStorage persistence (✓ data survives page refresh)
□ Responsive design (✓)
□ README with setup instructions (✓)
`;

  const reflectionNotes = `AI LEARNING AND REFLECTION NOTES
==================================

${data.thinkingLog.map((e, i) => `
Decision ${i + 1}: ${e.title}
-----------------------------------------
My Initial Idea: ${e.initialIdea}
AI Suggested: ${e.aiSuggestion}
My Decision: ${e.myDecision}
`).join('\n')}

REFLECTIONS
-----------
What changed between first idea and final solution:
${data.reflections.whatChanged}

What I would improve with 24 more hours:
${data.reflections.improvements}

What AI suggested that I deliberately rejected:
${data.reflections.rejectedAISuggestions}
`;

  const tabs = [
    { id: 'plan', label: 'Growth Plan', icon: BookOpen },
    { id: 'video', label: 'Video Script', icon: Video },
    { id: 'checklist', label: 'Checklist', icon: ClipboardList },
    { id: 'reflections', label: 'Reflections', icon: BookOpen },
  ];
  const [activeTab, setActiveTab] = useState('plan');

  const contents = { plan: growthPlan, video: videoScript, checklist, reflections: reflectionNotes };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title">Submission Kit</h1>
        <p className="section-subtitle">Everything you need to prepare and submit the NxtWave Growth Intern Challenge</p>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Demo Registrations', value: metrics.totalReg, color: '#f59e0b' },
          { label: 'Referral Rate', value: `${metrics.referralRate}%`, color: '#60a5fa' },
          { label: 'Budget Remaining', value: `₹${metrics.budgetRemaining}`, color: '#22c55e' },
          { label: 'Campaign Progress', value: `${metrics.progressPct}%`, color: '#a78bfa' },
        ].map(s => (
          <div key={s.label} className="card-dark" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: '#707070', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid #1e1e1e', paddingBottom: 0 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '10px 16px',
              fontSize: 14, fontWeight: 500,
              color: activeTab === tab.id ? '#f59e0b' : '#707070',
              borderBottom: activeTab === tab.id ? '2px solid #f59e0b' : '2px solid transparent',
              display: 'flex', alignItems: 'center', gap: 6, marginBottom: -1,
            }}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="card-dark" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <CopyButton text={contents[activeTab]} label={`Copy ${tabs.find(t => t.id === activeTab)?.label}`} />
        </div>
        <pre style={{ margin: 0, fontSize: 13, color: '#c8c8c8', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'monospace', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, padding: 20 }}>
          {contents[activeTab]}
        </pre>
      </div>

      {/* Instructions */}
      <div className="card-dark" style={{ padding: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8', marginBottom: 16 }}>Demo Instructions for Submission</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { step: '1', title: 'Run Locally', desc: 'Navigate to the project folder and run: npm run dev. Open http://localhost:5173 in your browser.' },
            { step: '2', title: 'Show Registration', desc: 'Go to "Registration" page, fill the form, complete registration. Copy your referral code from the success screen.' },
            { step: '3', title: 'Show Referral', desc: 'Register a second student using the first student\'s referral code. Then visit "Referral Engine" to see the attribution.' },
            { step: '4', title: 'Show Dashboard', desc: 'Go to "Dashboard" to see registrations, channel breakdown, and daily trend update in real time.' },
            { step: '5', title: 'Show Campaign Planner', desc: 'Open "Campaign Planner", edit a task status, and show the forecast chart.' },
            { step: '6', title: 'Show AI Copilot', desc: 'Open "AI Copilot", click a question. Show that answers use current demo metrics (not generic text).' },
            { step: '7', title: 'Show Simulation', desc: 'Open "Simulation Controls", add 50 simulated registrations, then check the dashboard update.' },
            { step: '8', title: 'Deploy for Preview', desc: 'Run: npm run build, then: npx serve dist to preview. Or deploy to Vercel/Netlify by uploading the dist/ folder.' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#f59e0b', flexShrink: 0 }}>{item.step}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#e8e8e8', marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#707070', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
