# 🔴 NxtWave GrowthOS (Crimson Edition)
### *AI Workshop Registration & Performance Growth Engine*
**NxtWave Growth Intern Assessment Submission**

---

## 🎯 Campaign Overview & Mission

This project is a performance-driven growth operating system engineered to deliver **500 qualified registrations** from final-year engineering students across India for NxtWave's live free workshop:

> **Workshop:** *"Build Your First AI Project in 60 Minutes"*  
> **Target Audience:** Final-year engineering students (CSE, IT, ECE, AI/DS, etc.) facing placement season  
> **Campaign Duration:** 7-Day Sprint  
> **Total Budget Cap:** ₹2,000  
> **Target Blended CAC:** ₹4.00 per registration  
> **Environment:** 100% simulated student cohort & growth loop (Strict compliance: zero actual messages/spam sent)

---

## 🔴 Design Philosophy: Midnight Navy & Crimson Red

- **Theme Identity:** High-Velocity Performance Marketing & Dynamic Urgency
- **Primary Palette:** Midnight Navy `#06080f`, Navy Slate Card Surfaces `#0e1424`, Vibrant Crimson Red Accents `#dc2626`, Coral Highlights `#ef4444`
- **UX Goal:** Drive high registration velocity using high-contrast visual hierarchy, subtle urgency cues, and intuitive call-to-actions.
- **Typography & Layout:** Clean Inter typography, bold crimson glowing outlines, responsive metrics grids, and reactive micro-interactions.

---

## 🚀 Quick Start (Running Locally)

This repository is completely self-contained. To run the application:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Open your browser at **`http://localhost:5173`**.

To build for production:
```bash
npm run build
```

---

## 🧭 System Architecture & Interactive Modules

The application is architected around 9 specialized modules accessible via the collapsible navigation sidebar:

### 1. 📊 Growth Dashboard (`/`)
- **Real-Time KPIs**: Total Registrations, Budget Spent (₹), Effective CAC (₹), Referral Share (%), and Days Remaining.
- **Dynamic Campaign Progress Bar**: Real-time progress toward 500 registrations with status indicators.
- **Interactive Recharts Visualizations**:
  - Registration Velocity Curve (Cumulative Target vs. Actual signups).
  - Channel Breakdown Donut Chart.
  - College Tier Distribution Bar Chart (Tier 1 vs Tier 2 vs Tier 3).
- **Interactive Simulation Controls**: Instant `Run Simulation (+10)` to test real-time metric updates.

### 2. 📝 Student Registration Portal (`/register`)
- **High-Converting Landing Experience**: Agenda breakdown, countdown timer, speaker highlight, and project teaser (LLM Resume Screener & AI Chatbot).
- **Streamlined Form**: Real-time validation, college search autocomplete, engineering branch selection, and AI interest tagging.
- **Instant Referral Link Generation**: Automatically mints a unique shareable referral link upon registration with instant copy and WhatsApp preview.

### 3. 🔄 Gamified Referral Engine (`/referral`)
- **Viral Expansion**: Implements a referral loop with an effective viral coefficient of $K = 1.35$.
- **Tiered Milestone Rewards**:
  - *Tier 1 (3 Referrals)*: Exclusive AI Project Source Code Bundle + Starter Prompt Templates.
  - *Tier 2 (5 Referrals)*: VIP Live Q&A Pass with the Speaker + Certificate of Completion.
  - *Tier 3 (10 Referrals)*: 1-on-1 AI Resume Review by Industry Mentors.
- **Campus Leaderboard**: Live ranking of top student referrers.

### 4. 📅 7-Day Campaign Playbook (`/campaign`)
Day-by-day roadmap designed for maximum registration velocity:
- **Day 1**: Campus Ambassador Network Launch (20 student leads across target colleges).
- **Day 2**: WhatsApp Placement Prep & Coding Communities Outreach.
- **Day 3**: LinkedIn Tech Creator Push (Hands-on project teasers & proof of work).
- **Day 4**: Mid-Campaign 48-Hour Referral Leaderboard Challenge.
- **Day 5**: College Placement Cell & Department Coordinator Partnerships.
- **Day 6**: Scarcity & FOMO Sequence (*"Only 75 Seats Remaining"*).
- **Day 7**: Final Registration Sprint, Reminder Cadence & Workshop Prep.

### 5. 💰 Channel Strategy & Unit Economics (`/channels`)
Comprehensive financial model respecting the ₹2,000 budget cap:
- **Campus Ambassadors**: ₹800 allocated → 160 registrations (₹5.00 CAC)
- **WhatsApp Communities**: ₹400 allocated → 120 registrations (₹3.33 CAC)
- **LinkedIn Nano-Creators**: ₹500 allocated → 90 registrations (₹5.55 CAC)
- **Gamified Referral Incentives**: ₹300 allocated → 95 registrations (₹3.15 CAC)
- **Organic Tech Communities**: ₹0 allocated → 35 registrations (₹0.00 CAC)
- **Overall Blended CAC**: **₹4.00 per student** (500 registrations for ₹2,000 total).

### 6. 🤖 AI Growth Copilot (`/copilot`)
- Rule-based diagnostic intelligence that evaluates registration velocity.
- Offers instant growth suggestions, headline A/B test ideas, and copy tweaks tailored to final-year engineers.

### 7. 🧠 First-Principles Growth Thinking (`/thinking`)
- Strategic analysis of engineering student psychographics:
  - **The Core Problem**: Final-year placement panic and lack of distinctive resume projects.
  - **The Hook**: "Build Your First AI Project in 60 Minutes" provides an instant, tangible artifact for resumes and LinkedIn.
  - **Post-Workshop Flywheel**: Converting free workshop attendees into NxtWave's full-stack & AI career tracks.

### 8. 🎛️ Simulation Controls (`/simulation`)
- Full sandbox to test various campaign conditions:
  - Add individual custom students with specific college and branch attributes.
  - Inject batch registrations (+10, +50, +100).
  - Simulate referral cascades and test edge cases.
  - One-click reset to clean baseline data.

### 9. 📋 Submission Kit (`/submission`)
- Built-in presentation kit containing:
  - Ready-to-copy Markdown summary for internship application portals.
  - 2-minute video pitch presentation script with timestamps and visual cues.
  - 10-point campaign execution checklist.

---

## 📊 Growth Math & Funnel Mechanics

$$\text{Total Target} = 500 \text{ Registrations} \quad\Big|\quad \text{Total Budget} = ₹2,000 \quad\Big|\quad \text{Blended CAC} = ₹4.00$$

```
[ Top of Funnel ]
Total Impressions / Reach: ~12,500 Final-Year Engineering Students
       │
       ▼ (8% CTR)
Landing Page Visitors: 1,000 Visitors
       │
       ▼ (37% Form Conversion Rate)
Direct Registrations: 370 Students
       │
       ▼ (Viral Loop Referral Factor K = 1.35)
Referral Registrations: 130 Students
       │
       ▼ (100% Target Met)
Total Registrations: 500 Confirmed Students
```

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Core:** React 19, Vite 8, React Router v7
- **Styling:** Tailwind CSS v4, Custom Crimson/Navy CSS Tokens
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **State Management:** Reactive Context Store with persistent LocalStorage

---

## 🛡️ Compliance & Safety Note

This project is a **100% simulated sandbox** created exclusively for the NxtWave Growth Intern Assessment. No actual emails, SMS, or WhatsApp messages are sent to external students. All metrics, user records, and referral trees are modeled client-side.
