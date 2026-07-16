// Domain model for the DNO onboarding flow — branches, plans, pricing.
// Ported 1:1 from "MTN DNO Onboarding v3 Standalone" (Claude Design project).

export const GATES = ['Start', 'Verify', 'Number', 'Plan', 'Pay', 'Live']

// Which gate each screen sits under (progress bar).
export const GIDX = {
  login: 0, cred: 0, otp: 1, identity: 1, scan: 1, intent: 2, number: 2,
  plan: 3, diy: 3, addons: 3, gpick: 3, pay: 4, activate: 5, done: 5,
  whyEsim: 1, beforeYouBegin: 1, idType: 1, readingPassport: 1, reviewPassport: 1,
  faceVerification: 1, verifyingIdentity: 1, identityVerified: 1,
  planDetails: 3, installing: 5, activationSummary: 5,
}

// Representative screen each gate jumps to when tapped — lets testers open
// any step directly, even ones not yet reached in the current session.
export const GATE_SCREEN = ['login', 'identity', 'number', 'plan', 'pay', 'activate']

// Branches: a1 new customer w/ NIN · a2 visitor (no NIN, visa-based) ·
// b existing MTN → eSIM · c2 add line.
export const BR = {
  a1: { tag: 'NEW · NIN' },
  a2: { tag: 'VISITOR' },
  b: { tag: 'MTN · ESIM' },
  c2: { tag: 'ADD LINE' },
}

// Login method implied by each branch, and the screen a toolbar preset jumps to.
export const LOGIN = { a1: 'email', a2: 'email', b: 'mtn', c2: 'other' }
export const JUMP = { a1: 'identity', a2: 'scan', b: 'otp', c2: 'otp' }

export const ADDON = {
  netflix: ['N', 'Netflix Standard', 4400],
  spotify: ['S', 'Spotify Premium', 1900],
  showmax: ['▶', 'Showmax', 3500],
  travel: ['✈', 'Travel Plan · roaming data', 12000],
  convergence: ['◆', 'Convergence Bundle · streaming + Apple Music', 8000],
}

// Platinum-pair upsell numbers: [number, blurb, price]
export const GPAIR = [
  ['0810 123 0123', 'Mirror pair · reads both ways', 60000],
  ['0810 123 3211', 'Sequential twin · +1 tail', 45000],
  ['0700 123 3210', 'Same tail · 0700 prefix', 30000],
]

// A couple of selectable Platinum numbers, offered via dropdown once that
// tier is chosen.
export const PLATINUM_NUMBERS = ['0810 123 3210', '0810 456 4560', '0810 999 8888']

export const MB_PER_N = 0.619
export const MIN_PER_N = 0.0586
export const PLAN_FEE = 100

export const NGN = v => '₦' + v.toLocaleString('en-NG')

// Plan catalogue per branch: [name, description, price, badge]
export function plansFor(branch) {
  if (branch === 'a2') return [
    ['Traveller', '8 GB · 15 days', 25000, ''],
    ['Visitor', '15 GB · 30 days', 45000, 'MOST POPULAR'],
    ['Extended', '30 GB · 60 days', 80000, ''],
  ]
  if (branch === 'b') return [
    ['Keep current plan', 'Nothing changes · ₦0', 0, 'SIMPLEST'],
    ['Power', '40 GB · 30 days', 35000, ''],
    ['Unlimited', '30 days', 75000, ''],
  ]
  return [
    ['Essential', '10 GB · 30 days', 15000, ''],
    ['Power', '40 GB + rollover · 30 days', 35000, 'MOST POPULAR'],
    ['Unlimited', '30 days', 75000, ''],
  ]
}

export const fmtData = spend => {
  const mb = spend * MB_PER_N
  return mb >= 1024 ? (mb / 1024).toFixed(1) + ' GB' : Math.round(mb) + ' MB'
}
export const fmtMin = spend => Math.round(spend * MIN_PER_N) + ' min'
