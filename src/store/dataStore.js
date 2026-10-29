// =============================================================================
// NXTWAVE GROWTHOS - CORE DATA STORE
// Shared logic across all theme variants
// =============================================================================

const STORAGE_KEY = 'nxtwave_growthos_data';

// ─── Referral Code Generator ─────────────────────────────────────────────────
export function generateReferralCode(name) {
  const prefix = name ? name.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X') : 'STU';
  const suffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}${suffix}`;
}

// ─── Unique ID ────────────────────────────────────────────────────────────────
export function generateId() {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ─── Default Sample Data ─────────────────────────────────────────────────────
export function getDefaultData() {
  const now = Date.now();
  const day = 86400000;

  const sampleStudents = [
    { id: generateId(), name: 'Arjun Sharma', email: 'arjun@demo.com', college: 'NIT Trichy', year: '2025', whatsapp: '', referralCode: 'ARJ1A2', usedReferral: '', channel: 'College Club', timestamp: now - 6 * day, simulated: true },
    { id: generateId(), name: 'Priya Nair', email: 'priya@demo.com', college: 'BITS Pilani', year: '2025', whatsapp: '', referralCode: 'PRI2B3', usedReferral: 'ARJ1A2', channel: 'Referral', timestamp: now - 5 * day, simulated: true },
    { id: generateId(), name: 'Rahul Verma', email: 'rahul@demo.com', college: 'IIT Bombay', year: '2025', whatsapp: '', referralCode: 'RAH3C4', usedReferral: 'ARJ1A2', channel: 'Referral', timestamp: now - 5 * day, simulated: true },
    { id: generateId(), name: 'Sneha Iyer', email: 'sneha@demo.com', college: 'VJTI Mumbai', year: '2025', whatsapp: '', referralCode: 'SNE4D5', usedReferral: 'PRI2B3', channel: 'Referral', timestamp: now - 4 * day, simulated: true },
    { id: generateId(), name: 'Karan Mehta', email: 'karan@demo.com', college: 'Delhi Tech', year: '2025', whatsapp: '', referralCode: 'KAR5E6', usedReferral: '', channel: 'WhatsApp Community', timestamp: now - 4 * day, simulated: true },
    { id: generateId(), name: 'Ananya Reddy', email: 'ananya@demo.com', college: 'IIIT Hyderabad', year: '2025', whatsapp: '', referralCode: 'ANA6F7', usedReferral: 'RAH3C4', channel: 'Referral', timestamp: now - 3 * day, simulated: true },
    { id: generateId(), name: 'Vikram Singh', email: 'vikram@demo.com', college: 'Manipal MIT', year: '2025', whatsapp: '', referralCode: 'VIK7G8', usedReferral: '', channel: 'Email Outreach', timestamp: now - 3 * day, simulated: true },
    { id: generateId(), name: 'Divya Krishnan', email: 'divya@demo.com', college: 'Anna University', year: '2025', whatsapp: '', referralCode: 'DIV8H9', usedReferral: 'KAR5E6', channel: 'Referral', timestamp: now - 2 * day, simulated: true },
    { id: generateId(), name: 'Aditya Gupta', email: 'aditya@demo.com', college: 'SRM Chennai', year: '2025', whatsapp: '', referralCode: 'ADI9I0', usedReferral: 'SNE4D5', channel: 'Referral', timestamp: now - 2 * day, simulated: true },
    { id: generateId(), name: 'Meera Patel', email: 'meera@demo.com', college: 'DAIICT Gandhinagar', year: '2025', whatsapp: '', referralCode: 'MEE0J1', usedReferral: '', channel: 'College Club', timestamp: now - 1 * day, simulated: true },
    { id: generateId(), name: 'Rohit Kumar', email: 'rohit@demo.com', college: 'IIT Roorkee', year: '2025', whatsapp: '', referralCode: 'ROH1K2', usedReferral: 'ANA6F7', channel: 'Referral', timestamp: now - 1 * day, simulated: true },
    { id: generateId(), name: 'Sana Khan', email: 'sana@demo.com', college: 'Pune University', year: '2026', whatsapp: '', referralCode: 'SAN2L3', usedReferral: '', channel: 'Student Ambassador', timestamp: now - 12 * 3600000, simulated: true },
  ];

  const campaignDays = [
    { day: 1, date: new Date(now - 6 * day).toLocaleDateString('en-IN'), goal: 'Setup & Launch', activities: 'Finalize messaging, publish registration page, prepare ambassador kit', targetReg: 30, channel: 'All', owner: 'Campaign Lead', status: 'completed', actualReg: 2 },
    { day: 2, date: new Date(now - 5 * day).toLocaleDateString('en-IN'), goal: 'Club Outreach', activities: 'Contact college clubs and technical communities through outreach templates', targetReg: 60, channel: 'College Clubs', owner: 'Outreach Team', status: 'completed', actualReg: 3 },
    { day: 3, date: new Date(now - 4 * day).toLocaleDateString('en-IN'), goal: 'Ambassador Launch', activities: 'Launch ambassador referrals and personalized sharing', targetReg: 90, channel: 'Referral / WhatsApp', owner: 'Ambassador Team', status: 'completed', actualReg: 4 },
    { day: 4, date: new Date(now - 3 * day).toLocaleDateString('en-IN'), goal: 'Content Push', activities: 'Share AI project teaser, promote through student communities', targetReg: 120, channel: 'Communities', owner: 'Content Team', status: 'in-progress', actualReg: 2 },
    { day: 5, date: new Date(now - 2 * day).toLocaleDateString('en-IN'), goal: 'Referral Reminder', activities: 'Referral reminder, address registration objections', targetReg: 400, channel: 'Referral / Email', owner: 'Growth Team', status: 'in-progress', actualReg: 1 },
    { day: 6, date: new Date(now - 1 * day).toLocaleDateString('en-IN'), goal: 'Deadline Reminder', activities: 'Ethical deadline reminder (only if schedule confirmed)', targetReg: 470, channel: 'All Channels', owner: 'Campaign Lead', status: 'pending', actualReg: 0 },
    { day: 7, date: new Date(now).toLocaleDateString('en-IN'), goal: 'Final Push', activities: 'Final registration push and workshop preparation', targetReg: 500, channel: 'All Channels', owner: 'All Team', status: 'pending', actualReg: 0 },
  ];

  const channels = [
    { id: 'college_clubs', name: 'College Clubs & CRs', estimatedReach: 800, expectedReg: 150, actualReg: 3, spend: 0 },
    { id: 'student_communities', name: 'Student Communities', estimatedReach: 1200, expectedReg: 100, actualReg: 2, spend: 0 },
    { id: 'referral', name: 'Student Ambassador Referrals', estimatedReach: 600, expectedReg: 150, actualReg: 6, spend: 0 },
    { id: 'email_direct', name: 'Email & Direct Peer Sharing', estimatedReach: 400, expectedReg: 50, actualReg: 1, spend: 0 },
    { id: 'paid', name: 'Small Paid Promotion Test', estimatedReach: 3000, expectedReg: 50, actualReg: 0, spend: 0 },
  ];

  const budget = {
    total: 2000,
    allocations: [
      { id: 'college_clubs', label: 'College Clubs & CRs', allocated: 0, spent: 0, note: 'Permission-based, no cost' },
      { id: 'communities', label: 'Student Communities', allocated: 0, spent: 0, note: 'Permission-based, no cost' },
      { id: 'email', label: 'Email & Ambassador Sharing', allocated: 0, spent: 0, note: 'Permission-based, no cost' },
      { id: 'paid_ads', label: 'Paid Promotion Test', allocated: 1000, spent: 0, note: 'After message validation only' },
      { id: 'creative', label: 'Creative Assets & Content', allocated: 500, spent: 0, note: 'Design tools, visuals' },
      { id: 'contingency', label: 'Contingency', allocated: 500, spent: 0, note: 'If test results justify it' },
    ],
  };

  const thinkingLog = [
    {
      id: generateId(),
      title: 'Landing Page vs Full System',
      initialIdea: 'Build only a landing page.',
      aiSuggestion: 'Add a registration page and promote it across multiple channels.',
      myDecision: 'Build a referral system and channel tracker because they demonstrate how registrations can be acquired and measured.',
      createdAt: now - 3 * day,
    },
    {
      id: generateId(),
      title: 'Budget Allocation Strategy',
      initialIdea: 'Spend the full ₹2,000 on advertisements.',
      aiSuggestion: 'Run paid campaigns to generate traffic.',
      myDecision: 'Start with permission-based, low-cost student distribution channels, test the message, and only then allocate a small amount to paid promotion.',
      createdAt: now - 2 * day,
    },
    {
      id: generateId(),
      title: 'Message Strategy',
      initialIdea: 'Send the same generic message everywhere.',
      aiSuggestion: 'Distribute the same campaign message widely.',
      myDecision: 'Adapt the message to each channel, use community-relevant value propositions, and avoid spam or unsolicited bulk messages.',
      createdAt: now - 1 * day,
    },
  ];

  const reflections = {
    whatChanged: 'Started with just a landing page idea. Evolved into a complete growth engine with referral tracking, channel analytics, budget management, and AI-powered recommendations. The scope grew because real growth requires measurement.',
    improvements: 'With 24 more hours: integrate a real backend with proper auth, add email notification templates (not auto-send), build a proper A/B test framework for messaging, and add mobile-first responsive improvements.',
    rejectedAISuggestions: 'AI suggested spending the full budget on paid ads immediately. I rejected this because without message validation and landing page testing, paid ads would waste money. Also rejected the suggestion to use generic bulk messaging—ethical student outreach requires permission.',
  };

  return {
    students: sampleStudents,
    campaignDays,
    channels,
    budget,
    thinkingLog,
    reflections,
    campaignStartDate: now - 6 * day,
    simulationMode: true,
    initialized: true,
  };
}

// ─── LocalStorage Helpers ─────────────────────────────────────────────────────
export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return getDefaultData();
}

// ─── Registration Validation ──────────────────────────────────────────────────
export function validateRegistration({ name, email, college, year }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
  if (!college || college.trim().length < 2) errors.college = 'College name is required.';
  if (!year || !['2025', '2026', '2027'].includes(year)) errors.year = 'Please select a valid graduation year.';
  return errors;
}

// ─── Referral Attribution ─────────────────────────────────────────────────────
export function resolveReferral(students, code, newStudentEmail) {
  if (!code || !code.trim()) return { valid: false, referrer: null, reason: 'No code provided' };
  const trimmedCode = code.trim().toUpperCase();
  const referrer = students.find(s => s.referralCode === trimmedCode);
  if (!referrer) return { valid: false, referrer: null, reason: 'Code not found. Please check and try again.' };
  if (referrer.email === newStudentEmail) return { valid: false, referrer: null, reason: 'You cannot use your own referral code.' };
  return { valid: true, referrer, reason: 'Valid referral code!' };
}

// ─── Campaign Metrics ─────────────────────────────────────────────────────────
export function calculateMetrics(data) {
  const { students, budget, campaignStartDate } = data;
  const now = Date.now();
  const totalReg = students.length;
  const target = 500;
  const referralReg = students.filter(s => s.usedReferral && s.usedReferral.trim()).length;
  const daysElapsed = Math.min(7, Math.ceil((now - campaignStartDate) / 86400000));
  const daysRemaining = Math.max(0, 7 - daysElapsed);
  const totalSpent = budget.allocations.reduce((sum, a) => sum + a.spent, 0);
  const budgetRemaining = budget.total - totalSpent;
  const costPerReg = totalSpent > 0 && totalReg > 0 ? totalSpent / totalReg : 0;
  const conversionRate = totalReg > 0 ? ((totalReg / Math.max(totalReg * 4, 1)) * 100).toFixed(1) : '0.0';
  const referralRate = totalReg > 0 ? ((referralReg / totalReg) * 100).toFixed(1) : '0.0';
  const progressPct = Math.min(100, (totalReg / target) * 100).toFixed(1);

  // Channel breakdown
  const channelCounts = {};
  students.forEach(s => {
    channelCounts[s.channel] = (channelCounts[s.channel] || 0) + 1;
  });

  // Daily trend (last 7 days)
  const dailyTrend = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart = now - (i + 1) * 86400000;
    const dayEnd = now - i * 86400000;
    const count = students.filter(s => s.timestamp >= dayStart && s.timestamp < dayEnd).length;
    const label = new Date(dayStart).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    dailyTrend.push({ label, count, cumulative: 0 });
  }
  let cum = 0;
  dailyTrend.forEach(d => { cum += d.count; d.cumulative = cum; });

  // Referral leaderboard
  const referralMap = {};
  students.forEach(s => {
    if (s.usedReferral) {
      referralMap[s.usedReferral] = (referralMap[s.usedReferral] || 0) + 1;
    }
  });
  const leaderboard = Object.entries(referralMap)
    .map(([code, count]) => {
      const owner = students.find(s => s.referralCode === code);
      return { code, count, ownerName: owner ? owner.name : 'Unknown' };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Health indicator
  let healthScore = 0;
  if (progressPct >= 50) healthScore += 30;
  else if (progressPct >= 25) healthScore += 15;
  if (parseFloat(referralRate) >= 30) healthScore += 25;
  else if (parseFloat(referralRate) >= 15) healthScore += 12;
  if (daysRemaining > 2) healthScore += 20;
  else if (daysRemaining > 0) healthScore += 10;
  if (budgetRemaining > 0) healthScore += 25;

  let healthLabel = 'Critical';
  let healthColor = 'red';
  if (healthScore >= 80) { healthLabel = 'Excellent'; healthColor = 'green'; }
  else if (healthScore >= 60) { healthLabel = 'Good'; healthColor = 'gold'; }
  else if (healthScore >= 40) { healthLabel = 'Fair'; healthColor = 'yellow'; }

  return {
    totalReg, target, referralReg, daysElapsed, daysRemaining,
    totalSpent, budgetRemaining, costPerReg, conversionRate, referralRate,
    progressPct, channelCounts, dailyTrend, leaderboard,
    healthScore, healthLabel, healthColor,
    referralConversionRate: referralReg > 0 ? ((referralReg / Math.max(students.filter(s => s.usedReferral).length, 1)) * 100).toFixed(1) : '0.0',
  };
}

// ─── AI Rule-Based Recommendations ───────────────────────────────────────────
export function generateRecommendations(metrics, question) {
  const { totalReg, target, referralReg, daysRemaining, totalSpent, budgetRemaining, referralRate, progressPct, leaderboard, channelCounts } = metrics;
  const remaining = target - totalReg;
  const dailyNeeded = daysRemaining > 0 ? Math.ceil(remaining / daysRemaining) : remaining;

  const responses = {
    'next100': () => {
      const tips = [];
      if (parseFloat(referralRate) < 30) tips.push(`🔗 **Boost Referrals:** Only ${referralRate}% of registrations came from referrals. If each current student refers 2 peers, you'd get ${Math.round(totalReg * 2)} more registrations. Message your top referrers (${leaderboard[0]?.ownerName || 'top performers'}) to re-engage their networks.`);
      tips.push(`📣 **Club Outreach:** Contact 5–8 college technical clubs this week. A single club president sharing to their 200-member group can generate 15–30 registrations.`);
      if (budgetRemaining >= 500) tips.push(`💰 **Test Paid Promo:** With ₹${budgetRemaining} remaining, run a small ₹300–500 test on a student Facebook/Instagram group targeting final-year engineering students in Tier 2/3 cities.`);
      tips.push(`📱 **WhatsApp Communities:** Identify 3–5 relevant student WhatsApp communities (engineering groups, placement groups). Share with community admin permission first.`);
      return { title: 'How to get the next 100 registrations', points: tips };
    },
    'channel': () => {
      const sortedChannels = Object.entries(channelCounts).sort((a, b) => b[1] - a[1]);
      const top = sortedChannels[0];
      return {
        title: 'Channel Priority Recommendation',
        points: [
          `📊 **Current Top Channel:** "${top?.[0] || 'Referral'}" is driving the most registrations (${top?.[1] || 0} registrations).`,
          `🎯 **Prioritize Referrals:** Referral channels have ₹0 cost and compound over time. With ${totalReg} students registered, your potential referral network is ${totalReg * 3}+ peers.`,
          `🏫 **College Clubs:** High leverage — one outreach message to a club of 300 students beats 300 individual messages. Focus on coding clubs, AI/ML clubs, and placement cells.`,
          `⚠️ **Avoid:** Mass unsolicited messages — they violate community norms and reduce trust. Always get admin permission before posting in any group.`,
        ],
      };
    },
    'referral': () => ({
      title: 'How to Improve Referral Participation',
      points: [
        `📈 **Current Referral Rate:** ${referralRate}% (${referralReg}/${totalReg} registrations). Industry benchmark for student referrals is 25–35%.`,
        `✉️ **Activate Existing Referrers:** Send a reminder to your top ${Math.min(5, leaderboard.length)} referrers. Personalized messages ("You've referred X people — you're in our top 5!") outperform generic blasts.`,
        `🎮 **Make Sharing Easy:** Ensure the share message is pre-written and copy-paste ready. Reduce friction — students share more when it takes < 10 seconds.`,
        `🏆 **Create Soft Urgency:** "Referral leaderboard closes on Day 7" — students respond to friendly competition without needing prizes.`,
        `🔄 **Reciprocity:** Students who used someone's referral code are 3x more likely to share their own. Trigger this with a post-registration nudge.`,
      ],
    }),
    'budget': () => {
      const suggestedPaidSpend = Math.min(500, budgetRemaining * 0.5);
      return {
        title: `Remaining Budget Allocation (₹${budgetRemaining} left)`,
        points: [
          `💡 **Current Spend:** ₹${totalSpent} of ₹2,000 used (${((totalSpent / 2000) * 100).toFixed(0)}% of budget).`,
          budgetRemaining >= 1000
            ? `🎯 **Recommended:** Allocate ₹${Math.round(suggestedPaidSpend)} to a paid student community promotion test (validate message first), ₹${Math.round(budgetRemaining * 0.25)} for creative assets, keep ₹${Math.round(budgetRemaining * 0.25)} as contingency.`
            : `🎯 **Recommended:** With ₹${budgetRemaining} remaining, prioritize zero-cost channels (referrals, clubs). Only test paid if you have clear message-market fit data.`,
          `⛔ **Don't:** Spend the full budget without testing. A ₹200 test with a specific audience segment tells you more than a ₹1,000 broad campaign.`,
          `✅ **High ROI:** Student ambassador time costs ₹0. Invest in creating quality shareable content (AI project preview, short demo video) that ambassadors can share easily.`,
        ],
      };
    },
    'today': () => {
      const urgencyLevel = daysRemaining <= 2 ? 'HIGH' : daysRemaining <= 4 ? 'MEDIUM' : 'LOW';
      return {
        title: `Today's Priority Actions (${daysRemaining} days remaining)`,
        points: [
          `⏱️ **Urgency Level:** ${urgencyLevel} — You need ${dailyNeeded} registrations/day to hit 500.`,
          `1️⃣ **First:** Check referral leaderboard — message top referrers to re-engage their networks.`,
          `2️⃣ **Second:** Reach out to 2–3 college clubs you haven't contacted yet. Use the template in Campaign Planner.`,
          `3️⃣ **Third:** ${totalSpent === 0 && budgetRemaining >= 1000 ? 'Consider starting your paid promotion test if message is validated.' : 'Review landing page registration form — any friction points reducing conversion?'}`,
          `4️⃣ **Fourth:** Share your AI project teaser content on student communities (with permission) — content-led acquisition has lower drop-off.`,
          daysRemaining <= 2 ? `🚨 **Final Push:** Activate all dormant channels. This is the last window before the workshop.` : '',
        ].filter(Boolean),
      };
    },
    'target': () => ({
      title: `Distance from 500-Registration Target`,
      points: [
        `📍 **Current Position:** ${totalReg} registrations (${progressPct}% of target). Need ${remaining} more.`,
        `📅 **Timeline:** ${daysRemaining} days left. Need ~${dailyNeeded} registrations/day.`,
        remaining > 300 ? `⚠️ **Gap Analysis:** A significant gap remains. The strategy needs to scale beyond direct outreach. Focus on viral/referral loops and high-leverage club outreach.` : '',
        remaining > 100 ? `🎯 **Realistic Path:** ${Math.round(totalReg * 1.5)} via referral expansion + ${Math.round(remaining * 0.3)} via club outreach + ${Math.round(remaining * 0.2)} via paid test = ${Math.round(totalReg * 1.5 + remaining * 0.5)} additional possible.` : `✅ **On Track:** At current pace, 500 is achievable. Maintain referral momentum and club outreach.`,
        `💡 **Note:** These are planning estimates, not guaranteed outcomes. Actual results depend on message resonance, timing, and community receptivity.`,
      ].filter(Boolean),
    }),
  };

  const qMap = {
    'next100': responses.next100,
    'channel': responses.channel,
    'referral': responses.referral,
    'budget': responses.budget,
    'today': responses.today,
    'target': responses.target,
  };

  return qMap[question] ? qMap[question]() : responses.today();
}

// ─── Simulation Helpers ───────────────────────────────────────────────────────
const DEMO_NAMES = ['Raj Patel', 'Anjali Kumar', 'Suresh Babu', 'Deepa Menon', 'Akash Yadav', 'Riya Singh', 'Amit Joshi', 'Kavya Nair', 'Nikhil Sharma', 'Pooja Reddy', 'Harsh Agarwal', 'Tanvi Shah', 'Siddharth Rao', 'Manu Thomas', 'Shruti Desai'];
const DEMO_COLLEGES = ['IIT Delhi', 'NIT Warangal', 'BITS Pilani', 'VIT Vellore', 'SRM University', 'Amity University', 'Manipal MIT', 'Anna University', 'RVCE Bangalore', 'PESIT Bangalore', 'NIT Calicut', 'IIT Kharagpur'];
const DEMO_CHANNELS = ['College Club', 'WhatsApp Community', 'Student Ambassador', 'Email Outreach', 'Referral', 'Direct'];

export function createSimulatedStudent(existingStudents, channel = null) {
  const name = DEMO_NAMES[Math.floor(Math.random() * DEMO_NAMES.length)] + ' ' + String.fromCharCode(65 + Math.floor(Math.random() * 26)) + '.';
  const college = DEMO_COLLEGES[Math.floor(Math.random() * DEMO_COLLEGES.length)];
  const ch = channel || DEMO_CHANNELS[Math.floor(Math.random() * DEMO_CHANNELS.length)];

  // 35% chance of using a referral
  let usedReferral = '';
  if (existingStudents.length > 0 && Math.random() < 0.35) {
    const randomReferrer = existingStudents[Math.floor(Math.random() * existingStudents.length)];
    usedReferral = randomReferrer.referralCode;
  }

  return {
    id: generateId(),
    name,
    email: `demo_${generateId().slice(3, 10)}@sim.demo`,
    college,
    year: Math.random() > 0.5 ? '2025' : '2026',
    whatsapp: '',
    referralCode: generateReferralCode(name),
    usedReferral,
    channel: usedReferral ? 'Referral' : ch,
    timestamp: Date.now(),
    simulated: true,
  };
}
