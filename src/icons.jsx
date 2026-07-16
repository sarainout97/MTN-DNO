// Minimal hand-rolled line-icon set (lucide-style), sized/colored via inline
// style to match the rest of the phone screens' inline-style convention.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconCheck({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  )
}

export function IconIdCard({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <circle cx="8" cy="12" r="2.2" />
      <path d="M13.5 10h5M13.5 14h3.5" />
    </svg>
  )
}

export function IconUser({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </svg>
  )
}

export function IconSun({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8" />
    </svg>
  )
}

export function IconImage({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M21 15l-5.5-5.5L6 19" />
    </svg>
  )
}

export function IconFlash({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronDown({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <path d="M5 8.5l7 7 7-7" />
    </svg>
  )
}

export function IconSparkle({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} fill="currentColor" aria-hidden="true">
      <path d="M11 2l1.4 5.6L18 9l-5.6 1.4L11 16l-1.4-5.6L4 9l5.6-1.4L11 2z" />
      <path d="M18.5 14l.7 2.8 2.8.7-2.8.7-.7 2.8-.7-2.8-2.8-.7 2.8-.7z" />
    </svg>
  )
}

export function IconPhone({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function IconShieldCheck({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function IconGift({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <rect x="3" y="8" width="18" height="4" />
      <path d="M12 8v13M5 12v9h14v-9" />
      <path d="M12 8H7.5a2.5 2.5 0 1 1 0-5C10 3 12 8 12 8zM12 8h4.5a2.5 2.5 0 1 0 0-5C14 3 12 8 12 8z" />
    </svg>
  )
}

export function IconGlobe({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export function IconCar({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
      <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z" />
      <circle cx="7.5" cy="16" r="1.2" />
      <circle cx="16.5" cy="16" r="1.2" />
    </svg>
  )
}

export function IconHome({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      <path d="M10 20v-5h4v5" />
    </svg>
  )
}

export function IconStar({ style, className, filled }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8z" />
    </svg>
  )
}

export function IconHeart({ style, className, filled }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5s-7.5-4.6-9.8-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.8 5.5c-2.3 4.4-9.8 9-9.8 9z" />
    </svg>
  )
}

export function IconDiamond({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <path d="M3 9l4.5-5.5h9L21 9l-9 11.5L3 9z" />
      <path d="M3 9h18M9 3.5 7.5 9l4.5 11.5L16.5 9 15 3.5" />
    </svg>
  )
}

export function IconSearch({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </svg>
  )
}

// Brand marks — controllable-fill wrappers around the provided monochrome
// logomarks (src/assets/icons), so they can be tinted white/black to sit on
// a colored circular badge like the rest of the app's icon tiles.
export function IconApple({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

// Rendered as three flat stripes rather than the 🇳🇬 regional-indicator
// emoji — Windows Chrome/Edge don't render flag emoji at all (they fall back
// to the bare "NG" letter pair), so an emoji flag silently degrades to text
// on that platform. This SVG always renders the same everywhere.
export function IconFlagNG({ style, className }) {
  return (
    <svg viewBox="0 0 24 16" style={style} className={className} aria-hidden="true">
      <rect width="24" height="16" rx="2" fill="#fff" />
      <rect width="8" height="16" fill="#008751" />
      <rect x="16" width="8" height="16" fill="#008751" />
    </svg>
  )
}

export function IconFlagGH({ style, className }) {
  return (
    <svg viewBox="0 0 24 16" style={style} className={className} aria-hidden="true">
      <rect width="24" height="16" rx="2" fill="#006B3F" />
      <rect width="24" height="5.34" fill="#CE1126" />
      <rect y="10.66" width="24" height="5.34" fill="#FCD116" />
      <path d="M12 6.2l.9 2.05 2.2.2-1.65 1.5.5 2.15-2-1.2-2 1.2.5-2.15-1.65-1.5 2.2-.2z" fill="#000" />
    </svg>
  )
}

export function IconFlagUG({ style, className }) {
  return (
    <svg viewBox="0 0 24 16" style={style} className={className} aria-hidden="true">
      <rect width="24" height="16" rx="2" fill="#FCDC04" />
      <rect y="2.67" width="24" height="2.67" fill="#000" />
      <rect y="5.34" width="24" height="2.66" fill="#D90000" />
      <rect y="8" width="24" height="2.67" fill="#000" />
      <rect y="10.67" width="24" height="2.66" fill="#D90000" />
      <rect y="13.33" width="24" height="2.67" fill="#000" />
      <circle cx="12" cy="8" r="3" fill="#fff" />
    </svg>
  )
}

export function IconMail({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 6.5l8 6.2 8-6.2" />
    </svg>
  )
}

export function IconLock({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
    </svg>
  )
}

export function IconBattery({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
      <rect x="1" y="6" width="19" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.5" y="8.5" width="14" height="7" rx="1.5" fill="currentColor" />
      <rect x="21" y="9.5" width="2" height="5" rx="1" fill="currentColor" />
    </svg>
  )
}

export function IconSunglasses({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} {...base} aria-hidden="true">
      <circle cx="6.5" cy="13" r="3.2" />
      <circle cx="17.5" cy="13" r="3.2" />
      <path d="M9.7 12h4.6M3.3 10.5L1.5 8M20.7 10.5L22.5 8" />
    </svg>
  )
}

export function IconFacebook({ style, className }) {
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} fill="currentColor" aria-hidden="true">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  )
}
