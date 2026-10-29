import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { validateRegistration, generateReferralCode, resolveReferral, generateId } from '../store/dataStore';
import { CheckCircle, Copy, Share2, MessageCircle, Mail, AlertCircle, ExternalLink } from 'lucide-react';

const DEMO_REG_URL = 'https://demo.nxtwave-growthOS.local/register';

export default function RegisterPage() {
  const { data, addStudent } = useApp();
  const [form, setForm] = useState({ name: '', email: '', college: '', year: '', whatsapp: '', referralCode: '' });
  const [errors, setErrors] = useState({});
  const [referralStatus, setReferralStatus] = useState(null);
  const [registered, setRegistered] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    if (field === 'referralCode' && value.trim().length >= 6) {
      const result = resolveReferral(data.students, value.trim(), form.email);
      setReferralStatus(result);
    } else if (field === 'referralCode') {
      setReferralStatus(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateRegistration(form);

    // Check duplicate email
    if (data.students.find(s => s.email.toLowerCase() === form.email.toLowerCase())) {
      errs.email = 'This email is already registered.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Validate referral
    let usedReferral = '';
    if (form.referralCode.trim()) {
      const ref = resolveReferral(data.students, form.referralCode.trim(), form.email);
      if (!ref.valid) {
        setErrors(prev => ({ ...prev, referralCode: ref.reason }));
        return;
      }
      usedReferral = form.referralCode.trim().toUpperCase();
    }

    const referralCode = generateReferralCode(form.name);
    const student = {
      id: generateId(),
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      college: form.college.trim(),
      year: form.year,
      whatsapp: form.whatsapp.trim(),
      referralCode,
      usedReferral,
      channel: usedReferral ? 'Referral' : 'Direct',
      timestamp: Date.now(),
      simulated: false,
    };

    addStudent(student);
    setRegistered(student);
  };

  const copyReferralCode = () => {
    if (registered) {
      navigator.clipboard.writeText(registered.referralCode).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareMessage = registered
    ? `I'm joining a free online workshop: "Build Your First AI Project in 60 Minutes"! If you're a final-year engineering student interested in AI, join me! Register here: ${DEMO_REG_URL}. Use my referral code: ${registered.referralCode} [DEMO SIMULATION — No actual workshop URL is active]`
    : '';

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;

  if (registered) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="card-dark" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={32} color="#22c55e" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e8e8e8', marginBottom: 8 }}>Registration Successful!</h2>
          <p style={{ color: '#707070', fontSize: 14, marginBottom: 24 }}>
            Welcome, {registered.name}! This is a demo registration — no actual workshop spot has been booked.
          </p>

          <div style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: '#707070', marginBottom: 8 }}>Your Unique Referral Code</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
              <code style={{ fontSize: 28, fontWeight: 800, color: '#f59e0b', letterSpacing: 4 }}>{registered.referralCode}</code>
              <button onClick={copyReferralCode} className="btn-secondary" style={{ padding: '6px 10px' }}>
                {copied ? <CheckCircle size={16} color="#22c55e" /> : <Copy size={16} />}
              </button>
            </div>
            <div style={{ fontSize: 12, color: '#505050', marginTop: 8 }}>Share this code with friends to track referrals</div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: '#707070', marginBottom: 12 }}>Share Workshop (Demo — no messages are auto-sent)</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
              >
                <MessageCircle size={16} color="#22c55e" /> WhatsApp
              </a>
              <button
                className="btn-secondary"
                onClick={() => {
                  const subject = encodeURIComponent('Join me for a free AI workshop!');
                  const body = encodeURIComponent(shareMessage);
                  window.open(`mailto:?subject=${subject}&body=${body}`);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Mail size={16} /> Email
              </button>
              <button
                className="btn-secondary"
                onClick={() => { navigator.clipboard.writeText(shareMessage).catch(() => {}); }}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Copy size={16} /> Copy Message
              </button>
            </div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 8, padding: 12, fontSize: 12, color: '#a0a0a0', marginBottom: 20 }}>
            <strong style={{ color: '#f59e0b' }}>Share Message Preview:</strong><br />{shareMessage}
          </div>

          <button className="btn-primary" onClick={() => { setRegistered(null); setForm({ name: '', email: '', college: '', year: '', whatsapp: '', referralCode: '' }); }}>
            Register Another (Demo)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0d0d0d, #141414)', border: '1px solid #1e1e1e', borderRadius: 16, padding: '40px 32px', marginBottom: 32, textAlign: 'center' }}>
        <div className="badge-gold" style={{ display: 'inline-block', marginBottom: 16 }}>🆓 FREE ONLINE WORKSHOP</div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#e8e8e8', lineHeight: 1.2, marginBottom: 16 }}>
          Build Your First AI Project in<br /><span className="text-gradient-gold">60 Minutes</span>
        </h1>
        <p style={{ fontSize: 16, color: '#a0a0a0', maxWidth: 580, margin: '0 auto 24px', lineHeight: 1.6 }}>
          Stop only learning AI theory. Build a small, working AI project and understand how to take your first step — even if you're a complete beginner.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
          {['🔬 Hands-on & Beginner-friendly', '💡 Build a real mini AI project', '🧠 Understand how AI projects work', '🗺️ Learn your next steps'].map(tag => (
            <span key={tag} className="badge-blue" style={{ fontSize: 12 }}>{tag}</span>
          ))}
        </div>

        <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 8, padding: '10px 16px', display: 'inline-block' }}>
          <AlertCircle size={14} color="#f59e0b" style={{ display: 'inline', marginRight: 6 }} />
          <span style={{ fontSize: 12, color: '#a0a0a0' }}>Workshop date & time: <strong style={{ color: '#f59e0b' }}>[DEMO PLACEHOLDER — to be confirmed]</strong></span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Registration Form */}
        <div>
          <div className="card-dark" style={{ padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#e8e8e8', marginBottom: 4 }}>Register Now — It's Free</h2>
            <p style={{ fontSize: 13, color: '#707070', marginBottom: 24 }}>
              ⚠️ Demo mode: Your data stays in your browser only. No information is sent to any server.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: '#a0a0a0', fontWeight: 500, display: 'block', marginBottom: 6 }}>Full Name *</label>
                <input className="input-dark" placeholder="e.g. Arjun Sharma" value={form.name} onChange={e => handleChange('name', e.target.value)} />
                {errors.name && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.name}</div>}
              </div>

              <div>
                <label style={{ fontSize: 13, color: '#a0a0a0', fontWeight: 500, display: 'block', marginBottom: 6 }}>Email Address *</label>
                <input className="input-dark" type="email" placeholder="you@example.com" value={form.email} onChange={e => handleChange('email', e.target.value)} />
                {errors.email && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.email}</div>}
              </div>

              <div>
                <label style={{ fontSize: 13, color: '#a0a0a0', fontWeight: 500, display: 'block', marginBottom: 6 }}>College / University *</label>
                <input className="input-dark" placeholder="e.g. NIT Trichy" value={form.college} onChange={e => handleChange('college', e.target.value)} />
                {errors.college && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.college}</div>}
              </div>

              <div>
                <label style={{ fontSize: 13, color: '#a0a0a0', fontWeight: 500, display: 'block', marginBottom: 6 }}>Graduation Year *</label>
                <select className="input-dark" value={form.year} onChange={e => handleChange('year', e.target.value)} style={{ cursor: 'pointer' }}>
                  <option value="">Select year</option>
                  <option value="2025">2025 (Final Year)</option>
                  <option value="2026">2026 (Final Year)</option>
                  <option value="2027">2027 (Pre-final)</option>
                </select>
                {errors.year && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.year}</div>}
              </div>

              <div>
                <label style={{ fontSize: 13, color: '#a0a0a0', fontWeight: 500, display: 'block', marginBottom: 6 }}>WhatsApp Number (Optional)</label>
                <input className="input-dark" placeholder="+91 98765 43210" value={form.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} />
              </div>

              <div>
                <label style={{ fontSize: 13, color: '#a0a0a0', fontWeight: 500, display: 'block', marginBottom: 6 }}>Referral Code (Optional)</label>
                <input
                  className="input-dark"
                  placeholder="Enter a friend's referral code"
                  value={form.referralCode}
                  onChange={e => handleChange('referralCode', e.target.value.toUpperCase())}
                  style={{ borderColor: referralStatus ? (referralStatus.valid ? '#22c55e' : '#ef4444') : undefined }}
                />
                {referralStatus && (
                  <div style={{ fontSize: 12, marginTop: 4, color: referralStatus.valid ? '#22c55e' : '#ef4444' }}>
                    {referralStatus.valid ? `✓ ${referralStatus.reason} — Referred by ${referralStatus.referrer.name}` : `✗ ${referralStatus.reason}`}
                  </div>
                )}
                {errors.referralCode && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.referralCode}</div>}
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: 8, padding: '12px', fontSize: 15 }}>
                Register for Free Workshop →
              </button>
            </form>
          </div>
        </div>

        {/* Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Workshop Agenda */}
          <div className="card-dark" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e8e8e8', marginBottom: 16 }}>Workshop Agenda</h3>
            {[
              { time: '0:00–15 min', title: 'Introduction to AI Projects', desc: 'What separates learners from builders?' },
              { time: '15–35 min', title: 'Build a Mini AI App', desc: 'Hands-on: A working AI project from scratch' },
              { time: '35–50 min', title: 'How it Works Under the Hood', desc: 'Understanding what you just built' },
              { time: '50–60 min', title: 'Your Next Steps', desc: 'Resources, roadmap, and community' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600, whiteSpace: 'nowrap', marginTop: 2 }}>{item.time}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#e8e8e8' }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#707070' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Who Should Attend */}
          <div className="card-dark" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e8e8e8', marginBottom: 12 }}>Who Should Attend?</h3>
            {[
              'Final-year engineering students curious about AI',
              'Students who\'ve studied AI theory but never built anything',
              'Anyone who wants to add a real project to their portfolio',
              'Students exploring careers in software or data science',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#a0a0a0' }}>
                <span style={{ color: '#22c55e' }}>✓</span> {item}
              </div>
            ))}
          </div>

          {/* What You'll Build */}
          <div className="card-dark" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e8e8e8', marginBottom: 12 }}>What You'll Build</h3>
            <div style={{ fontSize: 13, color: '#a0a0a0', lineHeight: 1.7 }}>
              A small, working AI project that demonstrates how a real AI pipeline functions — from input to output. The exact project will be revealed during the workshop. Think of it as your "Hello World" for AI.
            </div>
          </div>

          {/* FAQ */}
          <div className="card-dark" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e8e8e8', marginBottom: 12 }}>FAQs</h3>
            {[
              { q: 'Do I need coding experience?', a: 'Basic Python knowledge is helpful but not required.' },
              { q: 'Is it really free?', a: 'Yes. The workshop is completely free.' },
              { q: 'Will I get a certificate?', a: 'This demo does not promise certificates. Check official NxtWave channels for actual benefits.' },
              { q: 'When is the workshop?', a: 'Date and time are placeholders in this demo. Actual schedule TBD.' },
            ].map((faq, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e8e8e8', marginBottom: 3 }}>Q: {faq.q}</div>
                <div style={{ fontSize: 12, color: '#707070' }}>A: {faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
