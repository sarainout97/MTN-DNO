# MTN DNO · eSIM Onboarding v3 (login-first)

React port of the Claude Design prototype **"MTN DNO Onboarding v3 Standalone"** — an
interactive phone-frame demo of the DNO eSIM onboarding flow, built for testing by MTN.

## What it covers

Six routes, selectable from the toolbar or reached organically from the login screen:

| Preset | Route | Path highlights |
| --- | --- | --- |
| A1 | New customer with NIN | Email/social signup → NIN + selfie KYC → number choice (free/golden) |
| A2 | Visitor (no NIN) | Passport scan → free number → visitor packs → Apple/Google Pay + FX |
| B | Existing MTN → eSIM | OTP login → convert number or add line → keep plan option |
| C1 | Port-in from another network | Any-network PIN → NIN re-check → port consent + timeline |
| C2 | Add an MTN line | Similar/golden/free number beside the current line |
| D | Travel abroad | Dual profile (home line + travel eSIM) → trip-matched packs |

Plus: DIY plan builder (naira sliders + budget optimizer), add-ons (Netflix/Spotify/Showmax),
golden-pair upsell, payment summary, QR activation, referral close. iOS/Android bezel toggle.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build                                  # static bundle in dist/ — deploy to any static host
SINGLEFILE=1 npx vite build --outDir dist-single   # one self-contained HTML (fonts inlined)
```

The single-file output is what gets published as the shareable Claude artifact for MTN testing.

## Structure

- `src/data.js` — domain model: branches, plan catalogue, add-ons, golden pairs, pricing constants
- `src/useFlow.js` — all flow state + navigation (screen chain per login-method/branch)
- `src/ui.jsx` — shared primitives (gates bar, cards, tiers, pills, sliders …)
- `src/screens.jsx` — the 14 screens
- `src/App.jsx` — toolbar + phone bezel shell

Poppins (400–700, latin subset) is bundled locally in `src/fonts/` — no external requests at runtime.
"# MTN-DNO" 
