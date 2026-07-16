import { useEffect, useRef, useState } from 'react'
import { useFlow } from './useFlow.js'
import Screen from './screens.jsx'
import { IconBattery } from './icons.jsx'
import heroBg from './assets/welcome-bg.png'

const PRESETS = [
  ['a1', 'A1 · New + NIN'],
  ['a2', 'A2 · Visitor'],
  ['b', 'B · MTN eSIM'],
  ['c2', 'C2 · Add line'],
]

const chipStyle = { border: '1px solid #3A3A3A', background: 'transparent', color: '#D9D4C8', font: "600 11px 'Poppins'", padding: '6px 12px', borderRadius: 999, cursor: 'pointer' }

function Toolbar({ flow }) {
  const tBtn = on => ({ border: 0, background: on ? '#FFCC00' : 'transparent', color: on ? '#141414' : '#BDB8AC', font: "600 12px 'Poppins'", padding: '7px 16px', borderRadius: 999, cursor: 'pointer' })
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '12px 20px',  borderBottom: '1px solid #232323', background: '#0B0B0B' }}>
      <div style={{ font: "700 14px 'Poppins'", letterSpacing: '.4px', color: '#fff' }}>
        MTN <span style={{ color: '#FFCC00' }}>DNO</span> <span style={{ color: '#6E6A60', fontWeight: 600 }}>· eSIM Onboarding</span>
      </div>
      <div style={{ display: 'flex', background: '#2A2A2A', borderRadius: 999, padding: 3 }}>
        <button onClick={() => flow.setPlatform('ios')} style={tBtn(flow.platform === 'ios')}>iOS</button>
        <button onClick={() => flow.setPlatform('android')} style={tBtn(flow.platform === 'android')}>Android</button>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button onClick={() => flow.goto('reset')} style={chipStyle}>Landing</button>
        {PRESETS.map(([br, label]) => (
          <button key={br} onClick={() => flow.preset(br)} style={chipStyle}>{label}</button>
        ))}
      </div>
    </div>
  )
}

// The actual app screen: status chrome (mockup only — a real device already
// draws its own) + the scrollable screen content. Shared by both the native
// full-bleed mobile shell and the desktop phone-mockup preview so the two
// never drift apart.
function ScreenContent({ flow, mockup }) {
  const ios = flow.platform === 'ios'
  const screenRef = useRef(null)
  const isLanding = flow.screen === 'landing'

  // Navigation resets the phone-screen scroll; in-place updates keep it.
  useEffect(() => {
    if (screenRef.current) screenRef.current.scrollTop = 0
  }, [flow.scrollKey])

  return (
    <>
      {isLanding && (
        <>
          {/* welcome-bg.png is a portrait composition purpose-built for this
              frame (phone artwork sitting right-of-center, empty dark column
              on the left for text) — a plain `cover` fit is correct here. */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img src={heroBg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(11,11,11,.1) 0%, rgba(11,11,11,.15) 25%, rgba(11,11,11,.4) 50%, rgba(11,11,11,.72) 68%, rgba(11,11,11,.94) 84%, #0B0B0B 100%)' }} />
          {/* Left-to-right scrim so the text column reads clearly without
              flattening the phone artwork on the right. */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(90deg, rgba(11,11,11,.6) 0%, rgba(11,11,11,.3) 42%, transparent 68%)' }} />
        </>
      )}
      {mockup && (
        <div style={{ height: 46, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 6px', font: "600 13px 'Poppins'", color: '#fff', position: 'relative', zIndex: 5 }}>
          <span>9:41</span><IconBattery style={{ width: 22, height: 22, color: '#fff' }} />
        </div>
      )}
      <div
        id="dno-screen"
        ref={screenRef}
        style={{
          flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2,
          WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain', touchAction: 'pan-y',
          paddingTop: mockup ? 0 : 'env(safe-area-inset-top)',
        }}
      >
        <div className="dno-fade" key={flow.screen} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Screen flow={flow} />
        </div>
      </div>
      {mockup && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 26, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 8, pointerEvents: 'none', zIndex: 30 }}>
          <div style={ios
            ? { width: 139, height: 5, borderRadius: 100, background: 'rgba(255,255,255,.7)' }
            : { width: 110, height: 4, borderRadius: 100, background: 'rgba(255,255,255,.5)' }} />
        </div>
      )}
    </>
  )
}

// The desktop-only phone bezel/notch chrome around ScreenContent — a design
// preview aid for reviewing the app on a laptop, not something a real phone
// visitor ever sees (see MobileApp below for that).
function PhoneMockup({ flow }) {
  const ios = flow.platform === 'ios'
  return (
    <div style={{ width: 430, height: 812, background: '#000', borderRadius: ios ? 46 : 38, border: `${ios ? 10 : 9}px solid ${ios ? '#141414' : '#0a0a0a'}`, boxShadow: '0 30px 80px rgba(0,0,0,.55)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      {ios
        ? <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, borderRadius: 20, background: '#000', zIndex: 40 }} />
        : <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 11, height: 11, borderRadius: '50%', background: '#000', zIndex: 40 }} />}
      <ScreenContent flow={flow} mockup />
    </div>
  )
}

// A real phone visiting this app IS the canvas — no fake bezel, no notch,
// no scale-transform shrinking every font/button/icon down from a 390px
// desktop mockup. Just the screen content, full-bleed, respecting the
// device's actual safe areas (notch/home-indicator) via env() insets.
function MobileApp({ flow }) {
  return (
    <div style={{ width: '100vw', height: '100dvh', background: '#0000', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      <ScreenContent flow={flow} mockup={false} />
    </div>
  )
}

// Scales the whole phone mockup (bezel, fonts, buttons — everything,
// uniformly) down to fit short/narrow *desktop* browser windows. Only used
// for the desktop preview — a real phone renders through MobileApp instead,
// which needs no scaling since it already owns the whole viewport.
function usePhoneScale(vPadding = 48, hPadding = 24) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const compute = () => setScale(Math.min(1, (window.innerHeight - vPadding) / 812, (window.innerWidth - hPadding) / 390))
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [vPadding, hPadding])
  return scale
}

// A real touch-primary phone is the target we care about here — checking
// for a coarse pointer (rather than a width breakpoint) means a resized
// desktop browser window still gets the design-preview mockup, while an
// actual phone or tablet always gets the native full-bleed shell regardless
// of its exact width.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

// Discreet corner control that reveals the QA toolbar (platform + preset
// jump buttons) without it being part of the default app-like view.
function QaToggle({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Hide QA controls' : 'Show QA controls'}
      style={{
        position: 'fixed', top: 'max(14px, env(safe-area-inset-top))', right: 14, zIndex: 60, width: 34, height: 34, borderRadius: '50%',
        border: '1px solid #2A2A2A', background: 'rgba(20,20,20,.7)', color: open ? '#FFCC00' : '#6E6A60',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer',
        backdropFilter: 'blur(6px)',
      }}
    >
      ⚙
    </button>
  )
}

export default function App() {
  const flow = useFlow()
  const [showToolbar, setShowToolbar] = useState(false)
  const isMobile = useIsMobile()
  const scale = usePhoneScale(showToolbar ? 108 : 48)

  // A real phone gets the app itself, full-bleed — no desktop-page-with-a-
  // phone-drawn-on-it illusion. The QA toggle stays available (as a small
  // floating control) since it's still useful for testing on-device.
  if (isMobile) {
    return (
      <div style={{ minHeight: '100dvh', background: '#0B0B0B', color: '#fff' }}>
        {showToolbar && <Toolbar flow={flow} />}
        <QaToggle open={showToolbar} onClick={() => setShowToolbar(v => !v)} />
        <MobileApp flow={flow} />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0B0B0B', color: '#fff', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      {showToolbar && <Toolbar flow={flow} />}
      <QaToggle open={showToolbar} onClick={() => setShowToolbar(v => !v)} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px 12px' }}>
        {/* Sized to the scaled-down footprint so flexbox centers correctly —
            `transform: scale` alone doesn't shrink the box used for layout,
            only the paint, which left the phone mis-centered on short
            viewports. */}
        <div style={{ width: 390 * scale, height: 812 * scale, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <PhoneMockup flow={flow} />
          </div>
        </div>
      </div>
    </div>
  )
}
