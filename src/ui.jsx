// Shared UI primitives — visual 1:1 port of the design's helper renderers.
import { useState } from 'react'
import { NGN } from './data.js'
import { IconCheck, IconFlagNG, IconFlagGH, IconFlagUG, IconChevronDown, IconSparkle, IconStar, IconHeart } from './icons.jsx'

export const BADGE = {
  standard: { background: 'rgba(34,197,94,.18)', color: '#4ADE80' },
  platinum: { background: 'linear-gradient(135deg,#E8E8EC,#B8BAC4)', color: '#2A2C33' },
  info: { background: 'rgba(62,183,244,.14)', color: '#7CCFF7' },
}

// Shared back-arrow circle — the only "header" chrome on any screen now
// (paired with Frame's thin top progress line).
export function BackButton({ onClick }) {
  return (
    <div onClick={onClick} style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid #2C2C2C', background: '#141414', color: '#FFCC00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18 }}>←</div>
  )
}

// The one primary-button look used everywhere (Cta's own button, and any
// inline primary action that isn't the sticky bottom CTA).
export function PrimaryButton({ label, onClick, style, disabled }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: 18, borderRadius: 16, border: 0,
        background: disabled ? '#3A3A3A' : '#FFCC00', color: disabled ? '#7A7A7A' : '#000', font: "600 16px 'Poppins'",
        cursor: disabled ? 'default' : 'pointer', pointerEvents: disabled ? 'none' : 'auto',
        boxShadow: disabled ? 'none' : '0 8px 20px rgba(255,204,0,.25)', transition: 'transform .12s ease', ...style,
      }}
    >{label}</button>
  )
}

// The one secondary/outlined-button look (QR download/email, receipt actions …).
export function SecondaryButton({ label, onClick, style }) {
  return (
    <button onClick={onClick} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 15, borderRadius: 16, background: 'transparent', color: '#fff', border: '1.5px solid #383838', font: "600 14px 'Poppins'", cursor: 'pointer', ...style }}>{label}</button>
  )
}

// Sticky bottom CTA with optional underlined skip link: skip = [label, onClick]
//
// The scroll content behind this is often taller than the visible viewport,
// so this stays pinned to the bottom from the very start rather than only
// appearing once scrolled to the end — same as every other screen. The
// gradient above it needs to fade gradually (not a hard 32%-cutoff) and
// land on a background color matching the darkest screens (Landing's own
// backdrop is #0B0B0B, slightly darker than the plain #121212 phone
// background), or its top edge shows as a visible seam over busy content.
export function Cta({ label, onClick, skip, disabled }) {
  return (
    <div style={{ position: 'sticky', bottom: 0, marginTop: 'auto', padding: '18px 20px max(20px, env(safe-area-inset-bottom))', background: 'linear-gradient(180deg, transparent 0%, rgba(11,11,11,.65) 45%, #0B0B0B 80%)' }}>
      <PrimaryButton label={label} onClick={onClick} disabled={disabled} />
      {skip && (
        <div onClick={skip[1]} style={{ textAlign: 'center', font: "700 13.5px 'Poppins'", color: '#A6A6A6', textDecoration: 'underline', cursor: 'pointer', padding: '10px 4px 0' }}>{skip[0]}</div>
      )}
    </div>
  )
}

// `flex: 1, minHeight: 0` lets this fill the space between the header chrome
// and the sticky Cta rather than sizing to its own content — otherwise a
// screen with only a few elements leaves one large dead gap between the
// content and the CTA instead of the content breathing evenly within the
// available space. `justifyContent: 'center'` only has any visible effect
// when there's room left over (content shorter than the box) — a screen
// with enough content to fill or overflow the space renders identically to
// today, since there's nothing left to center within. Horizontal padding is
// deliberately modest (20px) — a real phone's own width is the canvas now,
// not a shrunk desktop mockup, so content should use nearly all of it.
export const Body = ({ children, gap = 22 }) => (
  <div style={{ flex: 1, minHeight: 0, padding: '20px 20px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap }}>{children}</div>
)
export const CBody = ({ children, gap = 22 }) => (
  <div style={{ flex: 1, minHeight: 0, padding: '20px 20px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap, textAlign: 'center', alignItems: 'center' }}>{children}</div>
)
export const H1 = ({ children, style }) => (
  <div style={{ font: "700 29px/1.2 'Poppins'", letterSpacing: '-.3px', ...style }}>{children}</div>
)
export const Hl = ({ children }) => <span style={{ color: '#FFCC00' }}>{children}</span>
export const Sub = ({ children, style }) => (
  <div style={{ font: "500 15px/1.55 'Poppins'", color: '#A6A6A6', ...style }}>{children}</div>
)
export const Card = ({ children, style, glass }) => (
  <div className={glass ? 'hvc-glass' : undefined} style={{ background: '#000', border: glass ? undefined : '1px solid #292929', borderRadius: 18, padding: 18, boxShadow: glass ? undefined : '0 4px 20px rgba(0,0,0,.22)', ...style }}>{children}</div>
)
// `tone` picks the icon tile's color: 'green' for a completed/success step
// (progress checklists — reading passport, verifying identity, installing),
// 'gold' (the `acc` shorthand) for a premium feature highlight, unset for
// plain/neutral rows.
export function Li({ glyph, t, d, acc, tone }) {
  const resolved = tone || (acc ? 'gold' : 'neutral')
  const TONE = {
    green: { background: '#22C55E', border: '#22C55E', color: '#fff' },
    gold: { background: '#FFCC00', border: '#FFCC00', color: '#000' },
    neutral: { background: '#000', border: '#383838', color: '#fff' },
  }[resolved]
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid #2C2C2C' }}>
      <div style={{ width: 38, height: 38, minWidth: 38, borderRadius: 12, background: TONE.background, border: `1px solid ${TONE.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TONE.color, font: "700 15px 'Poppins'" }}>{glyph}</div>
      <div style={{ flex: 1 }}>
        <div style={{ font: "700 14.5px 'Poppins'" }}>{t}</div>
        {d && <div style={{ font: "500 12.5px/1.45 'Poppins'", color: '#A6A6A6', marginTop: 2 }}>{d}</div>}
      </div>
    </div>
  )
}

export function Pill({ t }) {
  return <span style={{ font: "700 12px 'Poppins'", color: '#fff' }}>{t}</span>
}

// Tappable option row with a black/yellow glyph tile and a → chevron.
// `tone`: 'dark' (default) is the black-tile/yellow-glyph look used for
// tappable option rows; 'gold' is the yellow-tile/dark-glyph look used for
// informational feature rows (e.g. Before You Begin's checklist).
export function Qopt({ onClick, glyph, t, d, tone = 'dark' }) {
  const gold = tone === 'gold'
  return (
    <div onClick={onClick} style={{ background: '#000', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 14, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ width: 40, height: 40, minWidth: 40, borderRadius: 12, background: gold ? '#FFCC00' : '#000', color: gold ? '#000' : '#FFCC00', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 16px 'Poppins'" }}>{glyph}</div>
      <div style={{ flex: 1 }}>
        <div style={{ font: "700 15px 'Poppins'" }}>{t}</div>
        <div style={{ font: "600 12px 'Poppins'", color: '#A6A6A6', marginTop: 2 }}>{d}</div>
      </div>
      <div style={{ color: '#A6A6A6', fontSize: 18 }}>→</div>
    </div>
  )
}

// Number-choice tier card (standard / platinum / similar …) — star rating +
// favorite heart + Reserve/Selected footer echo a premium number-marketplace
// listing rather than a plain settings-style row.
export function Tier({ sel, onClick, badge, badgeStyle, name, num, price }) {
  return (
    <div onClick={onClick} style={{ border: `1.5px solid ${sel ? '#FFCC00' : '#292929'}`, borderRadius: 18, padding: 16, background: '#000', cursor: 'pointer', transition: 'border-color .15s ease', boxShadow: sel ? '0 0 24px rgba(255,204,0,.12)' : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 2, color: '#FFCC00' }}>
          {Array.from({ length: 5 }).map((_, i) => <IconStar key={i} filled style={{ width: 11, height: 11 }} />)}
        </div>
        <span style={{ font: "700 10px 'Poppins'", letterSpacing: '.8px', padding: '4px 9px', borderRadius: 999, ...badgeStyle }}>{badge}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, marginTop: 10 }}>
        <div>
          <div style={{ font: "700 20px 'Poppins'", letterSpacing: '.3px' }}>{num}</div>
          <div style={{ font: "600 11.5px 'Poppins'", color: '#A6A6A6', marginTop: 2 }}>{name}</div>
        </div>
        <IconHeart filled={sel} style={{ width: 18, height: 18, minWidth: 18, color: sel ? '#FFCC00' : '#6E6A60' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 14, paddingTop: 12, borderTop: '1px solid #232323' }}>
        <span style={{ font: "700 13px 'Poppins'", color: '#FFCC00' }}>{price}</span>
        <span style={{ font: "700 11.5px 'Poppins'", padding: '7px 16px', borderRadius: 10, background: sel ? 'rgba(255,204,0,.14)' : '#FFCC00', color: sel ? '#FFCC00' : '#000', border: sel ? '1px solid rgba(255,204,0,.4)' : 'none' }}>{sel ? 'Selected' : 'Reserve'}</span>
      </div>
    </div>
  )
}

export function PlanCard({ name, per, price, tag, sel, onClick }) {
  return (
    <div onClick={onClick} style={{ border: `1.5px solid ${sel ? '#FFCC00' : '#383838'}`, borderRadius: 18, background: '#000', padding: 18, position: 'relative', cursor: 'pointer', transition: 'border-color .15s ease' }}>
      {tag && <span style={{ position: 'absolute', top: -10, right: 16, background: '#FFCC00', color: '#000', font: "700 10px 'Poppins'", letterSpacing: '.8px', padding: '5px 10px', borderRadius: 999 }}>{tag}</span>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ font: "700 16px 'Poppins'" }}>{name}</div>
          <div style={{ font: "600 12px 'Poppins'", color: '#A6A6A6', marginTop: 2 }}>{per}</div>
        </div>
        <div style={{ font: "700 22px 'Poppins'" }}>{NGN(price)}</div>
      </div>
    </div>
  )
}

export function Otp({ arr, f }) {
  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {arr.map((c, i) => (
        <div key={i} style={{ width: 48, height: 58, border: `1.5px solid ${i < f ? '#FFCC00' : '#383838'}`, borderRadius: 16, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 24px 'Poppins'", color: i < f ? '#fff' : '#6E6A60' }}>{c}</div>
      ))}
    </div>
  )
}

// `img` renders a real headshot inside the frame — zoomed/positioned toward
// the upper face so the source photo's lower-right watermark falls outside
// the visible circle — otherwise falls back to the emoji placeholder. A
// green glow (not gold) reads as "actively scanning, looking good" rather
// than a generic brand accent; small sparkle decorations around the ring
// give it a little life without another animation to build.
export function Face({ e, img }) {
  return (
    <div style={{ position: 'relative', width: 220, height: 260, margin: '4px auto' }}>
      <IconSparkle style={{ position: 'absolute', top: 6, left: 2, width: 16, height: 16, color: '#FFCC00', opacity: .9 }} />
      <IconSparkle style={{ position: 'absolute', top: 40, right: -4, width: 11, height: 11, color: '#fff', opacity: .7 }} />
      <IconSparkle style={{ position: 'absolute', bottom: 26, left: -6, width: 13, height: 13, color: '#FFCC00', opacity: .8 }} />
      <div style={{
        width: 200, height: 240, borderRadius: 120, border: '3px solid #22C55E', margin: '10px auto', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#000', position: 'relative', overflow: 'hidden', boxShadow: '0 0 0 8px rgba(34,197,94,.14), 0 0 30px rgba(34,197,94,.25)',
      }}>
        <div style={{ position: 'absolute', left: '8%', right: '8%', height: 3, background: '#22C55E', borderRadius: 3, animation: 'dnoScan 2.1s ease-in-out infinite', zIndex: 2 }} />
        {img
          ? <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${img})`, backgroundSize: '100%', backgroundPosition: '26% 28%' }} />
          : <div style={{ fontSize: 56 }}>{e}</div>}
      </div>
    </div>
  )
}

export function Ring({ e, tone = 'gold' }) {
  const bg = tone === 'success' ? '#22C55E' : '#FFCC00'
  return (
    <div style={{ width: 104, height: 104, borderRadius: '50%', background: bg, margin: '8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, boxShadow: `0 0 0 9px ${tone === 'success' ? 'rgba(34,197,94,.15)' : 'rgba(255,204,0,.15)'}` }}>{e}</div>
  )
}

export function Input({ label, val }) {
  return (
    <>
      <span style={{ font: "700 12px 'Poppins'", letterSpacing: '.8px', color: '#A6A6A6', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>{label}</span>
      <input readOnly value={val} className="dno-field" style={{ width: '100%', padding: 16, border: '1.5px solid #383838', borderRadius: 16, font: "600 16px 'Poppins'", background: '#000', color: '#fff' }} />
    </>
  )
}

// Add-on toggle row (Netflix / Spotify / Showmax / Travel / Convergence)
export function TglRow({ icon, name, price, on, onClick, tag }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid #2C2C2C', cursor: 'pointer' }}>
      <div style={{ width: 38, height: 38, minWidth: 38, borderRadius: 12, background: '#000', color: '#FFCC00', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 15px 'Poppins'" }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ font: "700 14.5px 'Poppins'", display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
          {name}
          {tag && <span style={{ font: "700 9px 'Poppins'", letterSpacing: '.5px', color: '#000', background: '#FFCC00', borderRadius: 999, padding: '3px 8px' }}>{tag}</span>}
        </div>
        <div style={{ font: "600 12px 'Poppins'", color: '#A6A6A6', marginTop: 2 }}>+ {NGN(price)} / month</div>
      </div>
      <div style={{ width: 50, height: 28, borderRadius: 999, background: on ? '#21C45D' : '#383838', position: 'relative', flex: 'none' }}>
        <span style={{ position: 'absolute', top: 3, left: on ? 25 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: '.15s' }} />
      </div>
    </div>
  )
}

// Custom dropdown for picking among a couple of specific numbers — styled to
// match the rest of the app rather than a bare native <select>, which renders
// with the OS's own control chrome (default arrow, system font) and looks out
// of place next to everything else here.
export function Select({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ font: "700 12px 'Poppins'", letterSpacing: '.8px', color: '#A6A6A6', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>{label}</span>
      <div
        onClick={() => setOpen(v => !v)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, width: '100%', padding: 16, border: '1.5px solid #FFCC00', borderRadius: 16, background: '#000', cursor: 'pointer' }}
      >
        <span style={{ font: "600 16px 'Poppins'", color: '#fff' }}>{options[value]}</span>
        <IconChevronDown style={{ width: 16, height: 16, color: '#FFCC00', flex: 'none', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }} />
      </div>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6, background: '#000', border: '1.5px solid #383838', borderRadius: 16, overflow: 'hidden', zIndex: 10, boxShadow: '0 12px 30px rgba(0,0,0,.5)' }}>
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => { onChange(i); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '13px 16px', cursor: 'pointer',
                font: "600 14px 'Poppins'", color: i === value ? '#FFCC00' : '#fff', background: i === value ? 'rgba(255,204,0,.08)' : 'transparent',
                borderBottom: i < options.length - 1 ? '1px solid #232323' : 'none',
              }}
            >
              {opt}{i === value && <IconCheck style={{ width: 13, height: 13, color: '#FFCC00' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Dashed/solid optional-extra row with Add/Added pill (platinum pair, courier SIM)
export function OptRow({ on, glyph, t, d, onClick }) {
  return (
    <div onClick={onClick} style={{ border: on ? '1.5px solid #FFCC00' : '1.5px dashed #383838', borderRadius: 18, background: '#000', padding: 16, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'border-color .15s ease' }}>
      <div style={{ width: 38, height: 38, minWidth: 38, borderRadius: 12, background: on ? '#FFCC00' : '#000', color: on ? '#000' : '#fff', border: `1px solid ${on ? '#FFCC00' : '#383838'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{glyph}</div>
      <div style={{ flex: 1 }}>
        <div style={{ font: "700 14.5px 'Poppins'" }}>{t}</div>
        <div style={{ font: "600 12px 'Poppins'", color: '#A6A6A6', marginTop: 2 }}>{d}</div>
      </div>
      <Pill t={on ? 'Added' : 'Add'} v={on ? 'acc' : 'neutral'} />
    </div>
  )
}

export function SumRow({ t, v, strong }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', ...(strong ? { font: "700 14.5px 'Poppins'" } : { borderBottom: '1px solid #2C2C2C', font: "600 13.5px 'Poppins'" }) }}>
      <span style={{ color: strong ? '#fff' : '#CFCFCF' }}>{t}</span>
      <b style={strong ? { color: '#FFCC00' } : {}}>{v}</b>
    </div>
  )
}

export function Divider({ t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, font: "600 11.5px 'Poppins'", color: '#6E6A60', letterSpacing: 1 }}>
      <span style={{ flex: 1, height: 1, background: '#2C2C2C' }} />{t}<span style={{ flex: 1, height: 1, background: '#2C2C2C' }} />
    </div>
  )
}

export function DistRow({ name, color, val }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #2C2C2C', font: "600 13.5px 'Poppins'" }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#CFCFCF' }}>
        <span style={{ width: 12, height: 12, borderRadius: 3, background: color }} />{name}
      </span>
      <b>{val}</b>
    </div>
  )
}

const COUNTRIES = [
  { Flag: IconFlagNG, code: '+234', name: 'Nigeria' },
  { Flag: IconFlagGH, code: '+233', name: 'Ghana' },
  { Flag: IconFlagUG, code: '+256', name: 'Uganda' },
]

// Read-only phone number field with a tappable country flag + dial-code
// prefix (local-state only — this prototype's numbers are fixed demo data,
// so switching country changes only the flag/code shown, never the digits)
// and a native-picker-style dropdown, matching the design's phone-entry
// screens. `placeholder` renders the value in muted placeholder styling
// (the not-yet-typed Login state); `confirmed` adds a trailing green check
// (the verified Enter-Phone-Number state) — same field, two moments in the
// same flow.
export function PhoneField({ label, val, code = '+234', placeholder, confirmed }) {
  const [open, setOpen] = useState(false)
  const [country, setCountry] = useState(COUNTRIES.find(c => c.code === code) || COUNTRIES[0])
  return (
    <div style={{ position: 'relative' }}>
      {label && <span style={{ font: "700 12px 'Poppins'", letterSpacing: '.8px', color: '#A6A6A6', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>{label}</span>}
      <div className="dno-field" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', border: '1.5px solid #383838', borderRadius: 16, background: '#000' }}>
        <span
          onClick={() => setOpen(v => !v)}
          style={{ display: 'flex', alignItems: 'center', gap: 7, paddingRight: 12, borderRight: '1px solid #3A3A3A', font: "600 16px 'Poppins'", color: '#fff', cursor: 'pointer' }}
        >
          <country.Flag style={{ width: 21, height: 15 }} />{country.code}
          <span style={{ fontSize: 9, color: '#6E6A60', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }}>▾</span>
        </span>
        <input
          readOnly
          value={val}
          placeholder={placeholder ? val : undefined}
          style={{ flex: 1, minWidth: 0, padding: '16px 0', border: 0, background: 'transparent', font: "600 16px 'Poppins'", color: placeholder ? '#6E6A60' : '#fff', outline: 'none' }}
        />
        {confirmed && (
          <div style={{ width: 22, height: 22, minWidth: 22, borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconCheck style={{ width: 12, height: 12, color: '#fff' }} />
          </div>
        )}
      </div>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 6, width: 190, background: '#000', border: '1.5px solid #383838', borderRadius: 16, overflow: 'hidden', zIndex: 10, boxShadow: '0 12px 30px rgba(0,0,0,.5)' }}>
          {COUNTRIES.map(c => (
            <div
              key={c.code}
              onClick={() => { setCountry(c); setOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', cursor: 'pointer', background: c.code === country.code ? 'rgba(255,204,0,.1)' : 'transparent' }}
            >
              <c.Flag style={{ width: 21, height: 15 }} />
              <span style={{ flex: 1, font: "600 14px 'Poppins'" }}>{c.name}</span>
              <span style={{ font: "600 13px 'Poppins'", color: '#A6A6A6' }}>{c.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Decorative numeric keypad under the OTP boxes — a visual echo of the
// device's own keyboard, not a wired input (this prototype's OTP value is
// fixed, same as every other read-only field in the flow).
const KEYPAD_KEYS = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ['', ''], ['0', ''], ['⌫', ''],
]
export function Keypad() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%', maxWidth: 300, margin: '4px auto 0' }}>
      {KEYPAD_KEYS.map(([n, sub], i) => (
        <div
          key={i}
          style={{
            height: 58, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
            background: n ? '#000' : 'transparent', color: '#fff', cursor: n ? 'pointer' : 'default', userSelect: 'none',
          }}
        >
          <span style={{ font: "600 20px 'Poppins'" }}>{n}</span>
          {sub && <span style={{ font: "600 8px 'Poppins'", letterSpacing: 1, color: '#6E6A60' }}>{sub}</span>}
        </div>
      ))}
    </div>
  )
}

// Selectable list row with a leading icon tile — used for the ID-type picker
// (local-state only, doesn't touch flow state). Selected reads as "confirmed"
// (green border + green checkmark); unselected rows show a chevron, hinting
// they're tappable without implying a half-finished radio choice.
export function Radio({ sel, onClick, glyph, t, d }) {
  return (
    <div onClick={onClick} style={{ border: `1.5px solid ${sel ? '#22C55E' : '#2C2C2C'}`, borderRadius: 16, background: '#000', padding: 16, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
      <div style={{ width: 38, height: 38, minWidth: 38, borderRadius: 12, background: '#000', color: '#fff', border: '1px solid #383838', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 15px 'Poppins'" }}>{glyph}</div>
      <div style={{ flex: 1 }}>
        <div style={{ font: "700 14.5px 'Poppins'" }}>{t}</div>
        {d && <div style={{ font: "600 12px 'Poppins'", color: '#A6A6A6', marginTop: 2 }}>{d}</div>}
      </div>
      {sel
        ? (
          <div style={{ width: 24, height: 24, minWidth: 24, borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconCheck style={{ width: 13, height: 13, color: '#fff' }} />
          </div>
        )
        : <IconChevronDown style={{ width: 18, height: 18, color: '#6E6A60' }} />}
    </div>
  )
}

// SVG circular progress ring with an optional centered image + percentage
// label — used by the eSIM install screen.
export function ProgressRing({ pct, img, label, imgSize = 48, size = 168, r = 60, stroke = 11 }) {
  const cx = size / 2, cy = size / 2, circumference = 2 * Math.PI * r
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '4px auto' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#000" strokeWidth={stroke} />
        <circle
          cx={cx} cy={cy} r={r} fill="none" stroke="#FFCC00" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={circumference * (1 - pct / 100)}
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        {img && <img src={img} alt="" style={{ width: imgSize, height: imgSize, borderRadius: 14, objectFit: 'cover' }} />}
        <div style={{ font: "700 16px 'Poppins'" }}>{label != null ? `${label}%` : ''}</div>
      </div>
    </div>
  )
}

// DIY slider category card (Data / Voice)
export function DiyCat({ name, glyph, spend, got, value, min, max, minL, maxL, onChange }) {
  const fill = (100 * (value - min)) / (max - min)
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
        <div style={{ width: 48, height: 48, minWidth: 48, borderRadius: 14, background: 'rgba(255,204,0,.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFCC00', fontSize: 20 }}>{glyph}</div>
        <div>
          <div style={{ font: "600 16px 'Poppins'" }}>{name}</div>
          <div style={{ font: "400 13px 'Poppins'", color: '#A6A6A6', marginTop: 2 }}>{spend}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ font: "700 22px 'Poppins'", color: '#FFCC00' }}>{got}</div>
          <div style={{ font: "400 13px 'Poppins'", color: '#A6A6A6' }}>You get</div>
        </div>
      </div>
      <input type="range" className="dno-sl" min={min} max={max} step={100} value={value} onChange={e => onChange(+e.target.value)} style={{ '--fill': fill + '%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', font: "400 11px 'Poppins'", color: '#7A7A7A', marginTop: 7 }}>
        <span>{minL}</span><span>{maxL}</span>
      </div>
    </Card>
  )
}
