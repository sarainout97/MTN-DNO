import { useState } from 'react'
import { LOGIN, JUMP, ADDON, GPAIR, PLAN_FEE, PLATINUM_NUMBERS, plansFor } from './data.js'

const initial = {
  screen: 'landing',
  platform: 'ios',
  login: null,
  branch: null,
  numChoice: 'std',
  platinumIdx: 0,
  planIdx: 1,
  addons: { netflix: false, spotify: false, showmax: false, travel: false, convergence: false },
  gpIdx: null,
  courier: false,
  planMode: 'preset',
  diy: { d: 5000, v: 2000 },
  esent: { email: false, dl: false },
}

// Per-branch defaults applied whenever a branch is (re)selected.
const branchDefaults = br => ({
  branch: br,
  login: LOGIN[br],
  numChoice: { a1: 'std', a2: 'std', b: 'convert', c2: 'similar' }[br],
  platinumIdx: 0,
  planIdx: br === 'b' ? 0 : 1,
  addons: { netflix: false, spotify: false, showmax: false, travel: false, convergence: false },
  gpIdx: null,
  courier: false,
  planMode: 'preset',
  diy: { d: 5000, v: 2000 },
  esent: { email: false, dl: false },
})

// Shared tail once identity is established (face match → liveness → success),
// common to both the NIN path (a1) and the passport path (a2).
const FACE_TAIL = ['faceVerification', 'verifyingIdentity', 'identityVerified']

// The ordered screen chain for the current login method + branch.
function chainOf(s) {
  const L = s.login, br = s.branch
  // Branch is decided *at* the identity screen (NIN continue → a1, skip → a2),
  // so the shared pre-chain only runs up to 'identity' for email login. For
  // 'other' login the branch is decided later, at 'intent', so its whole KYC
  // sequence (through the face-tail) is already known and stays in `pre`.
  const pre = L === 'email' ? ['login', 'cred', 'whyEsim', 'beforeYouBegin', 'idType', 'identity']
    : L === 'other' ? ['login', 'cred', 'otp', 'beforeYouBegin', 'idType', 'identity', ...FACE_TAIL]
    : ['login', 'otp']
  if (!br) return pre.concat(L === 'email' ? [] : ['intent'])
  const mid = {
    a1: FACE_TAIL,
    a2: ['scan', 'readingPassport', 'reviewPassport', ...FACE_TAIL],
    b: ['whyEsim'],
    c2: ['whyEsim'],
  }[br]
  const hasAddons = ['a1', 'b', 'c2'].includes(br)
  return pre.concat(mid, ['number', 'plan', 'planDetails'], hasAddons ? ['addons'] : [], ['pay', 'activate', 'installing', 'activationSummary', 'done'])
}

export function useFlow() {
  const [s, setS] = useState(initial)
  // keepScroll: in-place updates (toggles, selections) shouldn't reset the
  // phone-screen scroll position; navigation should.
  const [scrollKey, setScrollKey] = useState(0)

  const patch = p => setS(prev => ({ ...prev, ...p }))
  const nav = p => { setS(prev => ({ ...prev, ...p })); setScrollKey(k => k + 1) }

  const plans = plansFor(s.branch)
  const isVisitor = s.branch === 'a2'
  const chosePlatinum = ['platinum', 'newplatinum'].includes(s.numChoice)
  const platinumPrice = isVisitor ? 15000 : 2000
  const platinumNumber = PLATINUM_NUMBERS[s.platinumIdx]
  const numPrice = chosePlatinum ? platinumPrice
    : s.numChoice === 'similar' ? 5000
    : s.numChoice === 'convert' ? 0
    : isVisitor ? 0
    : 700
  const addonSum = Object.keys(s.addons).reduce((sum, k) => sum + (s.addons[k] ? ADDON[k][2] : 0), 0)
  const diyTotal = s.diy.d + s.diy.v + PLAN_FEE
  const planPrice = s.planMode === 'diy' ? diyTotal : plans[s.planIdx][2]
  const total = planPrice + numPrice + addonSum + (s.gpIdx != null ? GPAIR[s.gpIdx][2] : 0)
  const hasAddonsStep = ['a1', 'b', 'c2'].includes(s.branch)

  const goto = id => {
    if (id === 'reset') return nav({ screen: 'landing', login: null, branch: null })
    const c = chainOf(s), i = c.indexOf(s.screen)
    if (id === 'next') id = c[Math.min(i + 1, c.length - 1)]
    else if (id === 'back') id = c[Math.max(i - 1, 0)]
    nav({ screen: id })
  }

  const setBranch = (br, screen) => nav({ ...branchDefaults(br), ...(screen ? { screen } : {}) })

  return {
    ...s,
    plans, chosePlatinum, platinumPrice, platinumNumber, numPrice, addonSum, diyTotal, planPrice, total, hasAddonsStep,
    scrollKey,
    goto,
    setBranch,
    preset: br => setBranch(br, JUMP[br]),
    setLogin: v => nav({ login: v, branch: null, screen: v === 'mtn' ? 'otp' : 'cred' }),
    socialLogin: () => nav({ login: 'email', branch: null, screen: 'cred' }),
    setPlatform: p => patch({ platform: p }),
    setNumChoice: v => patch({ numChoice: v }),
    setPlatinumIdx: i => patch({ platinumIdx: i }),
    pickPlan: i => {
      const c = chainOf(s)
      const next = c[Math.min(c.indexOf('plan') + 1, c.length - 1)]
      nav({ planIdx: i, planMode: 'preset', screen: next })
    },
    diyGo: () => nav({ planMode: 'diy', screen: 'planDetails' }),
    setDiy: (k, v) => setS(prev => ({ ...prev, diy: { ...prev.diy, [k]: v } })),
    optimize: budget => setS(prev => {
      const B = Math.max(600, budget || 10000)
      const rem = Math.max(600, B - PLAN_FEE)
      const v = Math.min(20000, Math.max(0, Math.round(rem * 0.3 / 100) * 100))
      const d = Math.min(50000, Math.max(500, rem - v))
      return { ...prev, diy: { d, v } }
    }),
    toggleAddon: k => patch({ addons: { ...s.addons, [k]: !s.addons[k] } }),
    setGp: i => patch({ gpIdx: i }),
    gpSkip: () => { setS(prev => ({ ...prev, gpIdx: null, screen: 'pay' })); setScrollKey(k => k + 1) },
    toggleCourier: () => patch({ courier: !s.courier }),
    esend: k => patch({ esent: { ...s.esent, [k]: true } }),
  }
}
