// All onboarding screens — content 1:1 port of "MTN DNO Onboarding v3",
// refined to match the approved premium visual design.
import { useState } from 'react'
import { ADDON, GPAIR, NGN, PLAN_FEE, PLATINUM_NUMBERS, fmtData, fmtMin, GATES, GIDX } from './data.js'
import {
  BADGE, BackButton, PrimaryButton, SecondaryButton, Cta, Body, CBody, H1, Hl, Sub, Card, Li, Pill, Qopt,
  Tier, PlanCard, Otp, Face, Ring, Input, Select, TglRow, OptRow, SumRow, Divider,
  DistRow, DiyCat, PhoneField, Keypad, Radio, ProgressRing,
} from './ui.jsx'
import {
  IconCheck, IconPhone, IconShieldCheck, IconGift, IconApple, IconGoogle, IconFacebook, IconLock, IconMail,
  IconIdCard, IconUser, IconSun, IconImage, IconFlash, IconSparkle, IconSunglasses, IconGlobe,
  IconCar, IconHome, IconStar, IconHeart, IconDiamond, IconSearch,
  IconPlay, IconHelp, IconMore, IconGrid,
} from './icons.jsx'
import { COLORS } from './theme.js'
import whyEsimImg from './assets/why-esim.png'
import passportImg from './assets/passport-img.png'
import faceImg from './assets/face-img.png'
import installingImg from './assets/installing-esim.png'
import congratsImg from './assets/congratulations-img.png'
import celebrationBg from './assets/celebraiton-bg.png'
import mtnLogo from './assets/logo.png'
import qrCodeImg from './assets/qr-code.png'

const Spacer = () => <div style={{ height: 12 }} />

// Small cropped brand mark — logo1.jpg is a press photo of an MTN sign, not
// an isolated logo asset, so it's cropped to just the oval ring (measured at
// roughly x:[76,941] y:[21,462] of the 1022×575 source). The container's
// aspect ratio matches that crop exactly, and the image is scaled/positioned
// by percentage (not object-fit, which can't target an arbitrary rectangle)
// so the oval renders true and undistorted at any `size`.
function Logo({ size = 38 }) {
  const w = Math.round(size * 1.962)
  return (
    <div style={{ width: w, height: size, minWidth: w, borderRadius: '50%', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,.12)', background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
      <img
        src={mtnLogo}
        alt="MTN"
        style={{ position: 'absolute', left: '-18.79%', top: '-38.76%', width:'134.15%', height: '180.38%', maxWidth: 'none' }}
      />
    </div>
  )
}

// A generic check-style row (icon + label, optional sublabel) shared by the
// benefit/checklist screens (Why eSIM, Before You Begin, Reading Passport,
// Verifying Identity) — a thin wrapper over Li so those screens read as one
// consistent visual language.
const Check = (t, d) => ({ glyph: <IconCheck style={{ width: 15, height: 15 }} />, t, d, tone: 'green' })

// Derives the headline "your number" line shown at the end of the journey —
// shared by the Activation Summary and Congratulations screens so both
// present the exact same fact, just once, instead of two divergent copies.
function numberLineFor(flow) {
  const { branch: br } = flow
  if (br === 'a2') return flow.chosePlatinum ? `${flow.platinumNumber} · platinum` : '0816 208 5531'
  return {
    a1: flow.chosePlatinum ? `${flow.platinumNumber} · platinum` : '0813 447 2196',
    b: flow.numChoice === 'convert' ? '0813 447 2196 · now eSIM' : flow.chosePlatinum ? `${flow.platinumNumber} · new platinum line` : '0813 990 4417 · new line',
    c2: flow.numChoice === 'similar' ? '0812 314 7765 · mirrors Airtel' : flow.chosePlatinum ? `${flow.platinumNumber} · platinum` : '0813 990 4417',
  }[br]
}

// One header for every onboarding screen: a thin unlabeled progress line
// (fills according to the existing GIDX gate map — no boxed step tracker,
// no title bar) plus a back-arrow circle. `title` and `minimal` are accepted
// but unused — harmless leftovers from the old two-header system so every
// existing call site keeps working unchanged.
function Frame({ flow, back, center, cta, bg, bgVivid, bgClear, gap, children, progress = true, justify }) {
  const Wrap = center ? CBody : Body
  const idx = GIDX[flow.screen] ?? 0
  const pct = (idx / (GATES.length - 1)) * 100
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      {bg && (
        <>
          <div style={{
            position: 'absolute', inset: -40, zIndex: 0, backgroundImage: `url(${bg})`,
            backgroundSize: bgClear ? 'contain' : bgVivid ? 'contain' : 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            filter: bgClear ? 'none' : bgVivid ? 'blur(14px) brightness(1.2)' : 'blur(45px) brightness(.7)',
            transform: bgClear ? 'scale(3)' : bgVivid ? 'scale(1.15)' : 'scale(1.4)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: bgClear
              ? 'linear-gradient(180deg, rgba(11,11,11,.1) 0%, rgba(11,11,11,.25) 60%, #0B0B0B 90%)'
              : bgVivid
              ? 'linear-gradient(180deg, rgba(11,11,11,.05) 0%, rgba(11,11,11,.4) 55%, #0B0B0B 92%)'
              : 'linear-gradient(180deg, rgba(11,11,11,.35) 0%, rgba(11,11,11,.78) 45%, #0B0B0B 85%)',
          }} />
        </>
      )}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        {progress && (
          <div style={{ height: 2, background: 'rgba(255,255,255,.10)', flex: 'none' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLORS.accent, transition: 'width .32s cubic-bezier(.22, 1, .36, 1)' }} />
          </div>
        )}
        {back && (
          <div style={{ padding: '16px 16px 0' }}>
            <BackButton onClick={() => flow.goto(back)} />
          </div>
        )}
        <Wrap gap={gap} justify={justify}>{children}</Wrap>
        {cta}
      </div>
    </div>
  )
}

// The one entry screen — greeting + the actual sign-in logic that used to
// live on a separate "Login" screen reached via a middle tap. Merged here
// since the two screens showed the same phone-field-plus-social-row content
// with no real step between them.
function Landing({ flow }) {
  const LandingField = () => (
    <div className="dno-field" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', borderRadius: 18, background: 'rgba(20,20,20,.45)', border: '1px solid rgba(255,255,255,.10)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
      <input readOnly value="0803 200 1207" style={{ flex: 1, minWidth: 0, padding: '16px 0', border: 0, background: 'transparent', font: "600 16px 'Poppins'", color: '#fff', outline: 'none' }} />
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <IconCheck style={{ width: 14, height: 14 }} />
      </div>
    </div>
  )
  return (
    <>
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: 'max(18px, env(safe-area-inset-top)) 24px max(24px, env(safe-area-inset-bottom))' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <Logo size={46} />
        </div>

        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <div style={{ font: "700 34px/1.18 'Poppins'", letterSpacing: '-.3px' }}>
            <span style={{ fontStyle: 'italic' }}>y’ello</span> there!
          </div>
          <div style={{ font: "500 14px/1.55 'Poppins'", color: 'rgba(255,255,255,.70)', marginTop: 6 }}>Let’s get you signed on</div>
        </div>

        <div style={{ marginTop: 130, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <LandingField />
          <PrimaryButton label="Log In" onClick={() => flow.setLogin('mtn')} />
        </div>

        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Divider t="or continue with" />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <SocialIcon onClick={flow.socialLogin} bg="rgba(0,0,0,.45)"><IconApple style={{ width: 22, height: 22, color: '#fff' }} /></SocialIcon>
            <SocialIcon onClick={flow.socialLogin} bg="rgba(0,0,0,.45)"><IconGoogle style={{ width: 20, height: 20, color: '#fff' }} /></SocialIcon>
            <SocialIcon onClick={flow.socialLogin} bg="rgba(0,0,0,.45)"><IconFacebook style={{ width: 20, height: 20, color: '#fff' }} /></SocialIcon>
            <SocialIcon onClick={() => flow.setLogin('email')} bg="rgba(0,0,0,.45)"><IconMail style={{ width: 20, height: 20, color: '#fff' }} /></SocialIcon>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 18 }}>
          <div onClick={() => flow.setLogin('other')} style={{ textAlign: 'center', font: "600 12px 'Poppins'", color: '#A6A6A6', cursor: 'pointer' }}>
            Not on MTN? <span style={{ color: '#FFCC00', textDecoration: 'underline' }}>Use another network number</span>
          </div>
          <SecureFooter />
         
        </div>
      </div>
    </>
  )
}

// Real brand marks (Google's official multi-color SVG as an <img>; Apple and
// Facebook as controllable-fill icon components tinted white) instead of
// text glyphs — matching the approved design's social row exactly.
function SocialIcon({ onClick, children, bg }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: bg || 'rgba(20,20,20,.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,.10)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {children}
    </div>
  )
}

const SecureFooter = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, font: "600 11px 'Poppins'", color: '#6E6A60' }}>
    <IconLock style={{ width: 12, height: 12 }} />Secure &amp; Encrypted
  </div>
)

// ---------- Credentials ----------
function Cred({ flow }) {
  if (flow.login === 'other') {
    return (
      <Frame flow={flow} back="back" cta={<Cta label="Send Code" onClick={() => flow.goto('next')} />}>
        <H1>Enter your phone number</H1>
        <Sub>We’ll send you a verification code to this number.</Sub>
        <PhoneField label="Phone number · any network" val="0902 314 7765" confirmed />
        <Pill t="Detected: Airtel · Prepaid" v="info" />
        <SecureFooter />
      </Frame>
    )
  }
  // Dedicated email screen — reached only via Login's Email icon, so it
  // never shows the social providers alongside the email field.
  return (
    <Frame flow={flow} back="back" cta={<Cta label="Continue with email" onClick={() => flow.goto('next')} />}>
      <H1>What’s your email?</H1>
      <Sub>This becomes your account. Your number comes two steps later.</Sub>
      <Input label="Email address" val="tawfik@gmail.com" />
      <SecureFooter />
    </Frame>
  )
}

// ---------- OTP ----------
function OtpScreen({ flow }) {
  const mtn = flow.login !== 'other'
  const number = mtn ? '+234 813 447 2196' : '+234 902 314 7765'
  return (
    <Frame flow={flow} minimal back="back" center cta={<Cta label="Continue" onClick={() => flow.goto('next')} />}>
      <H1>Enter verification code</H1>
      <Sub>We sent a 6-digit code to <Hl>{number}</Hl></Sub>
      <Otp arr={['7', '3', '9', '·', '·', '·']} f={3} />
      <div style={{ font: "600 11.5px 'Poppins'", color: '#6E6A60' }}>Resend code in <span style={{ color: '#FFCC00' }}>00:45</span></div>
      <Keypad />
      {mtn
        ? <Pill t="NIN on file · nothing to re-enter" v="good" />
        : <Pill t="Never share this code — MTN will never ask for it" v="neutral" />}
    </Frame>
  )
}

// ---------- Why eSIM ----------
function WhyEsim({ flow }) {
  return (
    <Frame flow={flow} title="Why eSIM?" back="back" center cta={<Cta label="Continue" onClick={() => flow.goto('next')} />}>
      <H1>Why choose eSIM?</H1>
      <Sub>It’s secure, instant and 100% digital.</Sub>
      <img src={whyEsimImg} alt="" style={{ width: '100%', maxWidth: 300, height: 'auto', objectFit: 'contain', margin: '4px auto' }} />
      <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {['Instant activation', 'Secure & encrypted', 'No physical SIM', 'Works worldwide'].map(t => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 26, height: 26, minWidth: 26, borderRadius: '50%', background: '#FFCC00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconCheck style={{ width: 14, height: 14, color: '#000' }} />
            </div>
            <span style={{ font: "700 15px 'Poppins'", color: '#fff' }}>{t}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

// ---------- Before you begin ----------
function BeforeYouBegin({ flow }) {
  return (
    <Frame flow={flow} title="Before you begin" back="back" cta={<Cta label="Continue" onClick={() => flow.goto('next')} />}>
      <H1>Before you begin</H1>
      <Sub>Make sure you have the following:</Sub>
      <Qopt glyph={<IconIdCard style={{ width: 18, height: 18 }} />} t="Valid ID" d="Passport or National ID" />
      <Qopt glyph={<IconUser style={{ width: 18, height: 18 }} />} t="A selfie" d="For identity verification" />
      <Qopt glyph={<IconSun style={{ width: 18, height: 18 }} />} t="Good lighting" d="We’ll guide you through" />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '4px 8px' }}>
        <IconSparkle style={{ width: 15, height: 15, color: '#FFCC00', marginTop: 2, minWidth: 15 }} />
        <span style={{ font: "500 12px 'Poppins'", color: '#A6A6A6', lineHeight: 1.45 }}>Your data is safe and encrypted and used only for verification.</span>
      </div>
    </Frame>
  )
}

// ---------- Select ID type ----------
const ID_TYPES = [
  ['passport', <IconIdCard style={{ width: 17, height: 17 }} />, 'Passport'],
  ['nin', <IconIdCard style={{ width: 17, height: 17 }} />, 'National ID'],
  ['dl', <IconCar style={{ width: 18, height: 18 }} />, "Driver's License"],
  ['perm', <IconHome style={{ width: 17, height: 17 }} />, 'Residence Permit'],
]
function IdType({ flow }) {
  const [sel, setSel] = useState('passport')
  return (
    <Frame flow={flow} title="Select ID Type" back="back" cta={<Cta label="Continue" onClick={() => flow.goto('next')} />}>
      <H1>Select your ID type.</H1>
      <Sub>Choose the type of document you want to use.</Sub>
      {ID_TYPES.map(([k, glyph, t]) => (
        <Radio key={k} sel={sel === k} onClick={() => setSel(k)} glyph={glyph} t={t} />
      ))}
    </Frame>
  )
}

// ---------- Identity (NIN) ----------
function Identity({ flow }) {
  if (flow.login === 'other') {
    return (
      <Frame flow={flow} title="Verify identity" back="back" cta={<Cta label="Continue" onClick={() => flow.goto('next')} />}>
        <H1>Your NIN, re-checked.</H1>
        <Sub>Step two, always: your NIN is registered with your current line — we verify it against NIMC, plus a selfie.</Sub>
        <Input label="National Identification Number" val="6314 ···· ····" />
      </Frame>
    )
  }
  return (
    <Frame
      flow={flow}
      title="Verify identity"
      back="back"
      cta={<Cta label="Verify & choose my number" onClick={() => flow.setBranch('a1', 'faceVerification')} skip={['I don’t have a NIN — scan a document', () => flow.setBranch('a2', 'scan')]} />}
    >
      <H1>Now, your NIN.</H1>
      <Sub>Step two, always. NIN + a selfie is the whole KYC — no store, no paper.</Sub>
      <Input label="National Identification Number" val="6314 ···· ····" />
      <div onClick={() => flow.goto('landing')} style={{ textAlign: 'center', font: "600 11.5px 'Poppins'", color: '#6E6A60', cursor: 'pointer' }}>
        Already on MTN? <span style={{ textDecoration: 'underline' }}>Log in with your number</span>
      </div>
    </Frame>
  )
}

// ---------- Document scan (visitor) ----------
// Yellow L-shaped corner brackets over the passport photo — a camera-reticle
// look, standing in for the old full dashed border.
function ScanCorners() {
  const corner = { position: 'absolute', width: 26, height: 26, borderColor: '#FFCC00', borderStyle: 'solid' }
  return (
    <>
      <div style={{ ...corner, top: 10, left: 10, borderWidth: '3px 0 0 3px', borderTopLeftRadius: 8 }} />
      <div style={{ ...corner, top: 10, right: 10, borderWidth: '3px 3px 0 0', borderTopRightRadius: 8 }} />
      <div style={{ ...corner, bottom: 10, left: 10, borderWidth: '0 0 3px 3px', borderBottomLeftRadius: 8 }} />
      <div style={{ ...corner, bottom: 10, right: 10, borderWidth: '0 3px 3px 0', borderBottomRightRadius: 8 }} />
    </>
  )
}

// Small round camera-chrome button (gallery / flash) either side of the shutter.
function CamBtn({ children }) {
  return (
    <div style={{ width: 44, height: 44, minWidth: 44, borderRadius: '50%', background: 'rgba(20,20,20,.55)', border: '1px solid rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>{children}</div>
  )
}

function Scan({ flow }) {
  return (
    <Frame flow={flow} title="Scan Passport" back="back" center>
      <H1>Scan your passport</H1>
      <Sub>Place your passport inside the frame.</Sub>
      <div style={{ width: '100%', maxWidth: 290, height: 190, borderRadius: 22, background: 'rgba(20,20,20,.55)', border: '1px solid rgba(255,255,255,.10)', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <img src={passportImg} alt="Passport" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
        <div style={{ position: 'absolute', left: '6%', right: '6%', height: 3, background: '#FFCC00', borderRadius: 3, animation: 'dnoScan 2.1s ease-in-out infinite', boxShadow: '0 0 12px rgba(255,204,0,.8)' }} />
        <ScanCorners />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '10px 0 8px' }}>
        <CamBtn><IconImage style={{ width: 19, height: 19 }} /></CamBtn>
        <button
          onClick={() => flow.goto('next')}
          aria-label="Capture"
          style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff', border: '4px solid #6E6A60', cursor: 'pointer' }}
        />
        <CamBtn><IconFlash style={{ width: 19, height: 19 }} /></CamBtn>
      </div>
    </Frame>
  )
}

// ---------- Reading passport ----------
function ReadingPassport({ flow }) {
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 0', zIndex: 2 }}>
        <BackButton onClick={() => flow.goto('back')} />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,.10)', zIndex: 1 }}>
        <div style={{ height: '100%', background: COLORS.accent, width: `${(flow.step / GIDX.length) * 100}%`, transition: 'width .32s cubic-bezier(.22, 1, .36, 1)' }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', gap: 24, position: 'relative', zIndex: 0, overflowY: 'auto' }}>
        <H1>Reading your passport</H1>
        <Sub>Please wait while we read your information.</Sub>
        <ProgressRing pct={65} img={passportImg} size={220} r={82} stroke={13} imgSize={130} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 300 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>Passport detected</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>Reading information</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>Verifying authenticity</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6E6A60' }} />
            <span style={{ font: "600 13px 'Poppins'", color: '#A6A6A6' }}>Almost done…</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '20px', paddingBottom: 40 }}>
        <Cta label="Continue" onClick={() => flow.goto('next')} />
      </div>
    </div>
  )
}

// Plain label/value pair — no bordered field box, just the fact itself.
const Field = ({ label, val }) => (
  <div>
    <div style={{ font: "700 10px 'Poppins'", letterSpacing: '.6px', color: '#A6A6A6', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ font: "700 14px 'Poppins'", marginTop: 2 }}>{val}</div>
  </div>
)

// ---------- Review passport ----------
function ReviewPassport({ flow }) {
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 0', zIndex: 2 }}>
        <BackButton onClick={() => flow.goto('back')} />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,.10)', zIndex: 1 }}>
        <div style={{ height: '100%', background: COLORS.accent, width: `${(flow.step / GIDX.length) * 100}%`, transition: 'width .32s cubic-bezier(.22, 1, .36, 1)' }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '20px', gap: 24, position: 'relative', zIndex: 0, overflowY: 'auto' }}>
        <H1>Review your information.</H1>
        <Sub>Please confirm that the details below are correct.</Sub>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, minWidth: 28, borderRadius: 8, background: 'rgba(34,197,94,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ADE80' }}>
            <IconIdCard style={{ width: 15, height: 15 }} />
          </div>
          <span style={{ font: "700 14px 'Poppins'" }}>Passport</span>
        </div>
        <Card style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
          <Field label="Name" val="Sara Albishlawy" />
          <Field label="Nationality" val="Syrian" />
          <Field label="Passport No." val="P1234567" />
          <Field label="Date of Expiry" val="12 Aug 2033" />
        </Card>
        <Card style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
          <Field label="Visa number" val="V-NG-2026-114892" />
          <Field label="Visa expiry date" val="19 Oct 2026" />
        </Card>
      </div>
      <div style={{ position: 'sticky', bottom: 0, marginTop: 'auto', padding: '18px 20px max(20px, env(safe-area-inset-bottom))', background: 'linear-gradient(180deg, transparent 0%, rgba(11,11,11,.72) 42%, #0B0B0B 82%)', display: 'flex', gap: 10 }}>
        <SecondaryButton label="Edit" onClick={() => flow.goto('back')} style={{ flex: 'none', width: 100 }} />
        <PrimaryButton label="Continue" onClick={() => flow.goto('next')} style={{ width: 'auto', flex: 1 }} />
      </div>
    </div>
  )
}

// ---------- Face verification (shared) ----------
// Small icon-badge pill — "Good lighting" / "No sunglasses" style hints.
function FeaturePill({ icon, t }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 16px 7px 7px', borderRadius: 999, background: 'rgba(20,20,20,.55)', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <div style={{ width: 24, height: 24, minWidth: 24, borderRadius: '50%', background: '#FFCC00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>{icon}</div>
      <span style={{ font: "700 13px 'Poppins'", color: '#fff' }}>{t}</span>
    </div>
  )
}

function FaceVerification({ flow }) {
  return (
    <Frame flow={flow} title="Face Verification" back="back" center cta={<Cta label="Continue" onClick={() => flow.goto('next')} />}>
      <H1>Face verification</H1>
      <Sub>Center your face inside the circle.</Sub>
      <Face img={faceImg} />
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <FeaturePill icon={<IconSun style={{ width: 13, height: 13 }} />} t="Good lighting" />
        <FeaturePill icon={<IconSunglasses style={{ width: 13, height: 13 }} />} t="No sunglasses" />
      </div>
    </Frame>
  )
}

// ---------- Verifying identity (shared) ----------
function VerifyingIdentity({ flow }) {
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 0', zIndex: 2 }}>
        <BackButton onClick={() => flow.goto('back')} />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,.10)', zIndex: 1 }}>
        <div style={{ height: '100%', background: COLORS.accent, width: `${(flow.step / GIDX.length) * 100}%`, transition: 'width .32s cubic-bezier(.22, 1, .36, 1)' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', gap: 24, position: 'relative', zIndex: 0 }}>
        <H1>Verifying your identity</H1>
      <Sub>Please don’t move.</Sub>
      <div style={{ width: 150, height: 150, borderRadius: '50%', border: '3px dashed #FFCC00', margin: '2px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgb(64, 98, 76)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 10px rgba(34,197,94,.15)' }}>
          <IconShieldCheck style={{ width: 40, height: 40, color: '#fff' }} />
        </div>
      </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 300 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>Matching face</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>Checking liveness</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>Verifying identity</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6E6A60' }} />
            <span style={{ font: "600 13px 'Poppins'", color: '#A6A6A6' }}>Almost done…</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '20px', paddingBottom: 40 }}>
        <Cta label="Continue" onClick={() => flow.goto('next')} />
      </div>
    </div>
  )
}

// ---------- Identity verified (shared) ----------
function IdentityVerified({ flow }) {
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Background with no blur */}
      <div style={{
        position: 'absolute', inset: -40, zIndex: 0, backgroundImage: `url(${celebrationBg})`,
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
        transform: 'scale(3)',
      }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(11,11,11,.1) 0%, rgba(11,11,11,.25) 60%, #0B0B0B 90%)' }} />
      
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <div style={{ height: 3, background: '#232323', flex: 'none' }}>
          <div style={{ height: '100%', width: `${(GIDX[flow.screen] ?? 0) / (GATES.length - 1) * 100}%`, background: '#FFCC00', transition: 'width .3s ease' }} />
        </div>
        <div style={{ padding: '16px 16px 0' }}>
          <BackButton onClick={() => flow.goto('back')} />
        </div>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 16px', gap: 0, textAlign: 'center', maxWidth: '100%' }}>
          <div style={{ width: 112, height: 112, borderRadius: '50%', background: 'rgb(64 98 76)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 10px rgba(34,197,94,.18)', marginBottom: 24 }}>
            <IconCheck style={{ width: 54, height: 54, color: '#fff' }} />
          </div>
          <H1>Identity Verified!</H1>
          <Sub>Your identity has been verified successfully.</Sub>
          <div style={{ marginTop: 24 }}>
            {flow.branch === 'a2'
              ? <div style={{ font: "700 13px 'Poppins'", color: '#4ADE80' }}>Selfie matched to document · 98.4%</div>
              : null}
          </div>
        </div>
        <div style={{ padding: '0 16px 16px' }}>
          <Cta label="Continue" onClick={() => flow.goto('next')} />
        </div>
      </div>
    </div>
  )
}

// ---------- Intent ----------
function Intent({ flow }) {
  const mtn = flow.login !== 'other'
  return (
    <Frame flow={flow} title="Choose Your Journey" back="back">
      <H1>Choose your journey</H1>
      <Sub>What are you looking for today?</Sub>
      {mtn ? (
        <Qopt onClick={() => flow.setBranch('b', 'whyEsim')} glyph="▤" t="eSIM for use here" d="Convert your number — or add a line" />
      ) : (
        <Qopt onClick={() => flow.setBranch('c2', 'whyEsim')} glyph="+" t="Get an MTN Line" d="Add an additional line to my account" />
      )}
    </Frame>
  )
}

// ---------- Number choice ----------
// Decorative search + category tabs matching the platinum-number picker's
// visual language — local-state only, doesn't filter the (short, per-branch)
// real number list below it.
const SEARCH_TABS = [
  ['Trending', IconFlash],
  ['Platinum', IconDiamond],
  ['Gold', IconStar],
  ['Favorites', IconHeart],
]
function PlatinumSearch() {
  const [tab, setTab] = useState('Trending')
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(20,20,20,.55)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
        <IconSearch style={{ width: 15, height: 15, color: '#6E6A60' }} />
        <span style={{ font: "500 13px 'Poppins'", color: '#6E6A60' }}>Search number</span>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {SEARCH_TABS.map(([t, Icon]) => {
          const on = tab === t
          return (
            <div
              key={t}
              onClick={() => setTab(t)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 999, font: "700 11px 'Poppins'", cursor: 'pointer', background: on ? COLORS.accent : 'rgba(255,255,255,.04)', color: on ? '#000' : '#D9D4C8', border: on ? 'none' : '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <Icon style={{ width: 12, height: 12 }} filled={on} />
              {t}
            </div>
          )
        })}
      </div>
    </>
  )
}

function NumberScreen({ flow }) {
  const { branch: br, numChoice } = flow
  const tier = (choice, badge, badgeStyle, name, num, price, silver) => (
    <Tier sel={numChoice === choice} onClick={() => flow.setNumChoice(choice)} badge={badge} badgeStyle={badgeStyle} name={name} num={num} price={price} silver={silver} />
  )
  const cta = <Cta label="Continue" onClick={() => flow.goto('next')} />

  const platinumSelect = () => (
    <Select label="Choose your platinum number" value={flow.platinumIdx} onChange={flow.setPlatinumIdx} options={PLATINUM_NUMBERS} />
  )

  if (br === 'a1') return (
    <Frame flow={flow} title="Choose Platinum Number" back="back" cta={cta}>
      <H1>Choose your platinum number</H1>
      <Sub>Find a number that represents you.</Sub>
      <PlatinumSearch />
      {tier('std', 'STANDARD', BADGE.standard, 'STANDARD', '0813 447 2196', NGN(700) + ' · one-time · tap to shuffle')}
      {tier('platinum', 'PLATINUM', BADGE.platinum, 'PLATINUM', flow.platinumNumber, NGN(2000) + ' · one-time')}
      {numChoice === 'platinum' && platinumSelect()}
    </Frame>
  )

  if (br === 'a2') return (
    <Frame flow={flow} title="Your number" back="back" cta={cta}>
      <H1>Here’s your number.<br /><Hl>It’s free.</Hl></H1>
      <Sub>Assigned instantly — active for your stay.</Sub>
      <PlatinumSearch />
      {tier('std', 'FREE', BADGE.standard, 'STANDARD', '0816 208 5531', '₦0 · tap to shuffle', true)}
      {flow.chosePlatinum
        ? <>
            {tier('platinum', 'PLATINUM', BADGE.platinum, 'PLATINUM', flow.platinumNumber, NGN(15000) + ' · memorable for your stay', true)}
            {platinumSelect()}
          </>
        : <div onClick={() => flow.setNumChoice('platinum')} style={{ textAlign: 'center', font: "700 12px 'Poppins'", color: '#A6A6A6', textDecoration: 'underline', cursor: 'pointer', padding: 2 }}>Staying longer? Platinum numbers from {NGN(15000)}</div>}
    </Frame>
  )

  if (br === 'b') return (
    <Frame flow={flow} title="Your number" back="back" cta={cta}>
      <H1>Keep it — or add a line.</H1>
      <PlatinumSearch />
      {tier('convert', 'FREE', BADGE.standard, 'CONVERT TO ESIM', '0813 447 2196', 'Same number, same plan — plastic retired safely', true)}
      <div style={{ font: "700 10px 'Poppins'", letterSpacing: '1.2px', color: '#A6A6A6', textTransform: 'uppercase' }}>Or a new eSIM line</div>
      {tier('newstd', 'STANDARD', BADGE.standard, 'NEW LINE · STANDARD', '0813 990 4417', NGN(700) + ' · randomly assigned', true)}
      {tier('newplatinum', 'PLATINUM', BADGE.platinum, 'NEW LINE · PLATINUM', flow.platinumNumber, NGN(2000) + ' · one-time', true)}
      {numChoice === 'newplatinum' && platinumSelect()}
      <div style={{ textAlign: 'center' }}><Pill t="4 of 5 number slots in use" v="neutral" /></div>
    </Frame>
  )

  // c2 · add an MTN line beside another network
  return (
    <Frame flow={flow} title="Pick your number" back="back" cta={cta}>
      <H1>Familiar, platinum,<br />or standard.</H1>
      <Sub>Your Airtel line stays untouched — this is your new MTN number.</Sub>
      <PlatinumSearch />
      {tier('similar', 'SIMILAR', BADGE.info, 'MIRRORS YOUR AIRTEL', '0812 314 7765', NGN(5000) + ' · same tail as 0902 314 7765')}
      {tier('platinum', 'PLATINUM', BADGE.platinum, 'PLATINUM', flow.platinumNumber, NGN(2000) + ' · one-time')}
      {tier('std', 'STANDARD', BADGE.standard, 'STANDARD', '0813 990 4417', NGN(700) + ' · randomly assigned')}
      {numChoice === 'platinum' && platinumSelect()}
    </Frame>
  )
}

// ---------- Plan ----------
function PlanTabs() {
  const [tab, setTab] = useState('eSIM Plans')
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {['eSIM Plans', 'Voice Plans'].map(t => (
        <div
          key={t}
          onClick={() => setTab(t)}
          style={{ flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 999, font: "700 12px 'Poppins'", cursor: 'pointer', background: tab === t ? COLORS.accent : 'rgba(255,255,255,.04)', color: tab === t ? '#000' : '#D9D4C8', border: tab === t ? 'none' : '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        >
          {t}
        </div>
      ))}
    </div>
  )
}

function Plan({ flow }) {
  const { branch: br } = flow
  const sub = { a2: 'Packs for your stay.', b: 'Your plan can stay.' }[br] || 'Pick the plan that suits you.'
  return (
    <Frame flow={flow} title="Choose your plan" back="back">
      <H1>Choose your plan</H1>
      <Sub>{sub}</Sub>
      <PlanTabs />
      {flow.plans.map((p, i) => (
        <PlanCard key={i} name={p[0]} per={p[1]} price={p[2]} tag={p[3]} sel={flow.planMode === 'preset' && i === flow.planIdx} onClick={() => flow.pickPlan(i)} silver={br === 'a2'} />
      ))}
      {flow.hasAddonsStep && (
        <div onClick={() => flow.goto('diy')} style={{ border: flow.planMode === 'diy' ? '1px solid rgba(255,204,0,.75)' : '1px dashed rgba(255,255,255,.18)', borderRadius: 22, background: 'rgba(0,0,0,.86)', padding: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 30px rgba(0,0,0,.35)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ font: "700 15px 'Poppins'" }}>
              Create your own{flow.planMode === 'diy' && <> · <span style={{ color: '#FFCC00' }}>{NGN(flow.diyTotal)}</span></>}
            </div>
            <div style={{ font: "600 10.5px 'Poppins'", color: '#A6A6A6' }}>Voice · data — sliders, live price</div>
          </div>
          <div style={{ fontSize: 22 }}>→</div>
        </div>
      )}
      {br === 'a2' && <div style={{ textAlign: 'center' }}><Pill t="Priced in NGN · ≈ USD shown at checkout" v="neutral" /></div>}
    </Frame>
  )
}

// ---------- Plan details ----------
function PlanDetails({ flow }) {
  const diyMode = flow.planMode === 'diy'
  const name = diyMode ? 'Custom plan' : flow.plans[flow.planIdx][0]
  const price = diyMode ? flow.diyTotal : flow.plans[flow.planIdx][2]
  const desc = diyMode ? `${fmtData(flow.diy.d)} · ${fmtMin(flow.diy.v)} · 30 days` : flow.plans[flow.planIdx][1]
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 0', zIndex: 2 }}>
        <BackButton onClick={() => flow.goto('plan')} />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,.10)', zIndex: 1 }}>
        <div style={{ height: '100%', background: COLORS.accent, width: `${(flow.step / GIDX.length) * 100}%`, transition: 'width .32s cubic-bezier(.22, 1, .36, 1)' }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '40px 20px', gap: 24, position: 'relative', zIndex: 0, overflowY: 'auto' }}>
        <H1>{name}</H1>
        <div style={{ font: "700 27px 'Poppins'" }}>{NGN(price)}</div>
        <Sub>{desc}</Sub>
        <Card style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
        <div style={{ font: "700 10px 'Poppins'", letterSpacing: 1, color: '#A6A6A6', textTransform: 'uppercase', marginBottom: 8 }}>What’s included</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>{desc}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>Night Data included</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>100 mins Voice</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>100 SMS</span>
          </div>
        </div>
      </Card>
      </div>
      <Cta label="Select Plan" onClick={() => flow.goto('next')} />
    </div>
  )
}

// ---------- DIY plan builder ----------
function Diy({ flow }) {
  const [budget, setBudget] = useState('')
  const d = flow.diy
  return (
    <Frame flow={flow} title="Create your own" back="plan" cta={<Cta label="Continue with this plan" onClick={flow.diyGo} />}>
      <H1>Slide the naira.<br /><Hl>See what you get.</Hl></H1>
      <Card>
        <span style={{ font: "700 11px 'Poppins'", letterSpacing: '.8px', color: '#A6A6A6', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Set your budget (optional)</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={budget}
            onChange={e => setBudget(e.target.value)}
            placeholder="Enter amount"
            inputMode="numeric"
            style={{ flex: 1, minWidth: 0, padding: 14, border: '1px solid rgba(255,255,255,.14)', borderRadius: 20, font: "600 15px 'Poppins'", background: 'rgba(20,20,20,.55)', color: '#fff', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
          />
          <button onClick={() => flow.optimize(parseInt(budget.replace(/[^0-9]/g, '')) || 0)} style={{ padding: '10px 16px', borderRadius: 999, border: 0, background: COLORS.accent, color: '#000', font: "600 12.5px 'Poppins'", cursor: 'pointer', boxShadow: '0 10px 22px rgba(255,204,0,.16)' }}>✦ Optimize</button>
        </div>
      </Card>
      <Card style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ font: "400 12.5px 'Poppins'", color: '#A6A6A6' }}>Your custom plan</div>
          <div>
            <span style={{ font: "600 22px 'Poppins'", color: '#FFCC00' }}>{NGN(flow.diyTotal)}</span>
            <span style={{ font: "600 10.5px 'Poppins'", color: '#A6A6A6' }}> /30 days</span>
          </div>
        </div>
      </Card>
      <DiyCat name="Data" glyph="◈" spend={NGN(d.d)} got={fmtData(d.d)} value={d.d} min={500} max={50000} minL={NGN(500)} maxL={NGN(50000)} onChange={v => flow.setDiy('d', v)} />
      <DiyCat name="Voice" glyph="☎" spend={NGN(d.v)} got={fmtMin(d.v)} value={d.v} min={0} max={20000} minL={NGN(0)} maxL={NGN(20000)} onChange={v => flow.setDiy('v', v)} />
      <Card>
        <div style={{ font: "700 10px 'Poppins'", letterSpacing: 1, color: '#A6A6A6', textTransform: 'uppercase', marginBottom: 8 }}>Breakdown</div>
        <DistRow name="Voice" color="#10B77F" val={NGN(d.v)} />
        <DistRow name="Data" color="#F07447" val={NGN(d.d)} />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', font: "600 12.5px 'Poppins'" }}>
          <span style={{ color: '#CFCFCF' }}>Plan fee</span><b>{NGN(PLAN_FEE)}</b>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', font: "700 12.5px 'Poppins'" }}>
          <span style={{ color: '#fff' }}>Total</span><b style={{ color: '#FFCC00' }}>{NGN(flow.diyTotal)}</b>
        </div>
      </Card>
      <div onClick={() => flow.goto('plan')} style={{ textAlign: 'center', font: "700 12.5px 'Poppins'", color: '#A6A6A6', textDecoration: 'underline', cursor: 'pointer', padding: 4 }}>Can’t decide? See our best-selling plans</div>
    </Frame>
  )
}

// ---------- Add-ons ----------
function Addons({ flow }) {
  const sel = flow.gpIdx != null ? GPAIR[flow.gpIdx] : null
  const needsEmail = flow.addons.netflix || flow.addons.spotify || flow.addons.convergence
  return (
    <Frame flow={flow} title="Add-ons" back="back" cta={<Cta label="Review & pay" onClick={() => flow.goto('next')} skip={['Skip add-ons', () => flow.goto('pay')]} />}>
      <H1>Perks, bundled in.</H1>
      <Sub>Billed with your line — toggle what you want, skip the rest.</Sub>
      <Card>
        {Object.keys(ADDON).map(k => (
          <TglRow key={k} icon={ADDON[k][0]} name={ADDON[k][1]} price={ADDON[k][2]} tag={k === 'convergence' ? 'NEW' : undefined} on={flow.addons[k]} onClick={() => flow.toggleAddon(k)} />
        ))}
      </Card>
      {needsEmail && (
        <Card>
          <div style={{ font: "700 10px 'Poppins'", letterSpacing: '1.2px', color: '#A6A6A6', textTransform: 'uppercase', marginBottom: 6 }}>Activation email</div>
          {flow.login === 'email'
            ? <Pill t="Sending activation links to tawfik@gmail.com — your MTN account email" v="info" />
            : <Input label="Email for streaming activation" val="tawfik@gmail.com" />}
        </Card>
      )}
      {flow.chosePlatinum && (
        <>
          <div style={{ font: "700 10px 'Poppins'", letterSpacing: '1.2px', color: '#A6A6A6', textTransform: 'uppercase' }}>Because you went platinum</div>
          <OptRow
            onClick={() => flow.goto('gpick')}
            on={!!sel}
            glyph="★"
            t={sel ? `Second platinum line · ${sel[0]}` : 'Second platinum line · matched pair'}
            d={sel ? `${sel[1]} · ${NGN(sel[2])} — tap to change` : `From ${NGN(30000)} · 50% off, platinum buyers only — tap to pick`}
          />
        </>
      )}
      <Card glass style={{ padding: '10px 16px' }}>
        <SumRow t="Running total" v={NGN(flow.total)} strong />
      </Card>
    </Frame>
  )
}

// ---------- Platinum pair picker ----------
function Gpick({ flow }) {
  const first = flow.branch === 'a2' ? '0810 500 0500' : '0810 123 3210'
  const cta = flow.gpIdx != null
    ? <Cta label={`Add ${GPAIR[flow.gpIdx][0]} · ${NGN(GPAIR[flow.gpIdx][2])}`} onClick={() => flow.goto('pay')} skip={['No thanks — continue without', flow.gpSkip]} />
    : <Cta label="Continue without a second line" onClick={flow.gpSkip} />
  return (
    <Frame flow={flow} title="Second platinum line" back="addons" cta={cta}>
      <H1>A pair for<br /><Hl>{first}</Hl>.</H1>
      <Sub>Matched to your platinum number — family, work, or business identity. Half price, offered once at checkout.</Sub>
      {GPAIR.map((o, i) => {
        const on = flow.gpIdx === i
        return (
          <div key={i} onClick={() => flow.setGp(i)} style={{ border: `1px solid ${on ? 'rgba(255,204,0,.75)' : 'rgba(255,255,255,.12)'}`, borderRadius: 22, padding: 14, background: 'rgba(0,0,0,.86)', position: 'relative', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,.35)' }}>
            <span style={{ position: 'absolute', top: 12, right: 12, font: "700 9px 'Poppins'", letterSpacing: '.8px', padding: '4px 8px', borderRadius: 999, ...BADGE.platinum }}>PLATINUM</span>
            <div style={{ font: "700 12px 'Poppins'", letterSpacing: 1 }}>
              {o[1].toUpperCase()}{on && <> · <span style={{ color: '#FFCC00' }}>SELECTED</span></>}
            </div>
            <div style={{ font: "700 19px 'Poppins'", letterSpacing: '.5px', margin: '6px 0 2px' }}>{o[0]}</div>
            <div style={{ font: "700 12px 'Poppins'", color: '#A6A6A6' }}>{NGN(o[2])} · 50% off · 48h reservation</div>
          </div>
        )
      })}
      <div style={{ textAlign: 'center' }}><Pill t="Counts within your 5-number allowance — checked" v="neutral" /></div>
    </Frame>
  )
}

// ---------- Payment ----------
function Pay({ flow }) {
  const { branch: br } = flow
  const diyMode = flow.planMode === 'diy'
  const planName = diyMode
    ? `Custom plan · ${fmtData(flow.diy.d)} · ${fmtMin(flow.diy.v)}`
    : flow.plans[flow.planIdx][0] + ' plan'
  return (
    <Frame flow={flow} title="Review & Pay" back="back" cta={<Cta label={`Pay ${NGN(flow.total)}`} onClick={() => flow.goto('next')} />}>
      <H1>Review your order</H1>
      {br === 'a2' && (
        <>
          {flow.platform === 'ios'
            ? <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: 15, borderRadius: 999, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(20,20,20,.55)', color: '#fff', font: "600 15px 'Poppins'", cursor: 'pointer', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>{''} Apple Pay</button>
            : <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: 15, borderRadius: 14, border: 0, background: '#fff', color: '#1a1a1a', font: "600 15px 'Poppins'", cursor: 'pointer' }}>G Pay · Google Pay</button>}
          <Divider t="OR PAY BY CARD" />
        </>
      )}
      <Card glass>
        <div style={{ font: "700 10px 'Poppins'", letterSpacing: 1, color: '#A6A6A6', textTransform: 'uppercase', marginBottom: 8 }}>Summary</div>
        <SumRow t={planName} v={NGN(flow.planPrice)} />
        {flow.chosePlatinum && <SumRow t="Platinum number" v={NGN(flow.platinumPrice)} />}
        {flow.numChoice === 'similar' && <SumRow t="Similar number" v={NGN(5000)} />}
        {!flow.chosePlatinum && flow.numChoice !== 'similar' && flow.numPrice > 0 && <SumRow t="SIM / number fee" v={NGN(flow.numPrice)} />}
        {Object.keys(flow.addons).filter(k => flow.addons[k]).map(k => (
          <SumRow key={k} t={ADDON[k][1]} v={NGN(ADDON[k][2])} />
        ))}
        {flow.gpIdx != null && <SumRow t={`2nd platinum · ${GPAIR[flow.gpIdx][0]}`} v={NGN(GPAIR[flow.gpIdx][2])} />}
        <SumRow t="Total today" v={NGN(flow.total)} strong />
      </Card>
      <Card style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 34, height: 34, minWidth: 34, borderRadius: 12, background: 'rgba(20,20,20,.55)', border: '1px solid rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 10px 'Poppins'", backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>VISA</div>
        <div style={{ flex: 1 }}>
          <div style={{ font: "700 10px 'Poppins'", letterSpacing: '.8px', color: '#A6A6A6', textTransform: 'uppercase' }}>Payment method</div>
          <div style={{ font: "600 13px 'Poppins'" }}>{br === 'a2' ? 'Visa •••• 8811' : 'Visa •••• 4921'}</div>
        </div>
        <span style={{ font: "700 12px 'Poppins'", color: '#FFCC00', textDecoration: 'underline', cursor: 'pointer' }}>Change</span>
      </Card>
      <Pill t="3-D Secure — handled inside the app" v="info" />
      {br === 'a2' && (
        <div style={{ textAlign: 'center' }}>
          <Pill t={`≈ $${(flow.total / 1530).toFixed(2)} · indicative · intl cards OK`} v="info" />
        </div>
      )}
    </Frame>
  )
}

// Small circular progress ring for the "binding to this device" status row —
// deliberately its own tiny inline SVG rather than reusing ProgressRing,
// which is hardcoded to a much larger fixed size for the install screen.
function MiniRing({ pct, size = 40, stroke = 4 }) {
  const r = (size - stroke) / 2, c = r * 2 * Math.PI
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)', flex: 'none' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#FFCC00" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
      />
    </svg>
  )
}

// ---------- Activation ----------
function Activate({ flow }) {
  const { esent: es } = flow
  const [manualOpen, setManualOpen] = useState(true)
  const ebtn = (k, label, done) => (
    <SecondaryButton
      label={es[k] ? done : label}
      onClick={() => flow.esend(k)}
      style={{ color: es[k] ? '#4ADE80' : '#fff', border: `1.5px solid ${es[k] ? 'rgba(34,197,94,.5)' : '#383838'}` }}
    />
  )
  return (
    <Frame
      flow={flow} title="Activating" back="back"
      cta={(
        <Cta
          label={(
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
             Installed — Continue
            </div>
          )}
          onClick={() => flow.goto('next')}
        />
      )}
    >
      <H1>Your eSIM is <Hl>Ready</Hl></H1>
      <Sub>Scan the QR code with another device, or install directly on this phone.</Sub>

      <div style={{
        background: '#fff', borderRadius: 24, padding: '20px 20px 18px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 12, boxShadow: '0 0 60px rgba(255,204,0,.22)',
      }}>
        <div style={{ width: '100%', maxWidth: 220, height: 192, borderRadius: 14, overflow: 'hidden' }}>
          <img src={qrCodeImg} alt="eSIM activation QR code" style={{ width: '100%', height: '110%', objectFit: 'cover', objectPosition: 'top' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,.14)', border: '1px solid rgba(34,197,94,.35)', borderRadius: 999, padding: '7px 14px' }}>
          <div style={{ width: 16, height: 16, minWidth: 16, borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconCheck style={{ width: 9, height: 9, color: '#fff' }} />
          </div>
          <span style={{ font: "700 12.5px 'Poppins'", color: '#16A34A' }}>Ready to install</span>
        </div>
        <div style={{ font: "600 11.5px 'Poppins'", color: '#8A8A8A' }}>Activation expires in 30 days</div>
      </div>

      <Card style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <MiniRing pct={82} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: "700 13.5px 'Poppins'" }}>Binding to this device</div>
            <div style={{ font: "500 11.5px 'Poppins'", color: '#A6A6A6', marginTop: 2 }}>82% complete</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 6, background: 'rgba(255,255,255,.12)', overflow: 'hidden' }}>
            <span style={{ display: 'block', height: '100%', width: '82%', background: COLORS.accent, borderRadius: 6 }} />
          </div>
          <span style={{ font: "700 12.5px 'Poppins'", color: COLORS.accent, minWidth: 30, textAlign: 'right' }}>82%</span>
        </div>
      </Card>

      <PrimaryButton
        onClick={() => flow.goto('next')}
        label={(
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>↓ Install on This Device</span>
            <span style={{ font: "700 10px 'Poppins'", background: 'rgba(0,0,0,.14)', borderRadius: 999, padding: '5px 10px' }}>Recommended</span>
          </div>
        )}
      />

      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        {ebtn('email', '✉  Email QR', 'Sent ✓')}
        {ebtn('dl', '↓  Download QR', 'Saved ✓')}
      </div>

      <Card style={{ width: '100%' }}>
        <div onClick={() => setManualOpen(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <div style={{ width: 34, height: 34, minWidth: 34, borderRadius: 10, border: '1.5px solid #FFCC00', color: '#FFCC00', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 12px 'Poppins'" }}>{'>_'}</div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ font: "700 14px 'Poppins'" }}>Manual Installation</div>
            <div style={{ font: "500 11.5px 'Poppins'", color: '#A6A6A6', marginTop: 1 }}>If automatic installation doesn’t work, use these details.</div>
          </div>
          <span style={{ color: '#A6A6A6', fontSize: 13, transform: manualOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }}>▾</span>
        </div>
        {manualOpen && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: '1px solid #2C2C2C' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ font: "600 10px 'Poppins'", color: '#6E6A60', letterSpacing: '.6px' }}>SM-DP+ ADDRESS</div>
                <div style={{ font: "600 12.5px 'Poppins'" }}>smdp.mtn.com.ng</div>
              </div>
              <Pill t="Copy" v="neutral" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: '1px solid #2C2C2C' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ font: "600 10px 'Poppins'", color: '#6E6A60', letterSpacing: '.6px' }}>ACTIVATION CODE</div>
                <div style={{ font: "600 12.5px 'Poppins'" }}>K2-0813-4472196-X7</div>
              </div>
              <Pill t="Copy" v="neutral" />
            </div>
          </div>
        )}
      </Card>

      {flow.chosePlatinum && (
        <div style={{ width: '100%', textAlign: 'left' }}>
          <OptRow onClick={flow.toggleCourier} on={flow.courier} glyph="▤" t="Physical platinum SIM · keepsake" d="Free courier delivery — your eSIM stays primary" />
        </div>
      )}
    </Frame>
  )
}

// ---------- Installing eSIM ----------
function Installing({ flow }) {
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#0B0B0B' }}>
      <BackButton onClick={() => flow.goto('activate')} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#232323', zIndex: 1 }}>
        <div style={{ height: '100%', background: '#FFCC00', width: `${(flow.step / GIDX.length) * 100}%`, transition: 'width 0.3s' }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '44px 20px', gap: 24, position: 'relative', zIndex: 0, overflowY: 'auto', alignItems: 'center' }}>
        <H1>Please keep this<br />screen open.</H1>
        <ProgressRing pct={79} img={installingImg} label={79} size={220} r={82} stroke={13} imgSize={92} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>Connecting to network</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>Activating eSIM</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ font: "700 13px 'Poppins'", color: '#4ADE80', minWidth: 20 }}>✓</span>
            <span style={{ font: "600 13px 'Poppins'", color: '#fff' }}>Finalizing setup</span>
          </div>
        </div>
        <div style={{ font: "600 11.5px 'Poppins'", color: '#6E6A60' }}>Almost done…</div>
      </div>
      <Cta label="Continue" onClick={() => flow.goto('next')} />
    </div>
  )
}

// ---------- Activation summary ----------
function ActivationSummary({ flow }) {
  const isVisitor = flow.branch === 'a2'
  const planName = flow.planMode === 'diy' ? 'Custom plan' : flow.plans[flow.planIdx][0] + ' plan'
  const planDesc = flow.planMode === 'diy' ? `${fmtData(flow.diy.d)} · ${fmtMin(flow.diy.v)}` : flow.plans[flow.planIdx][1]
  const adds = Object.keys(flow.addons).filter(k => flow.addons[k]).map(k => ADDON[k][1])
  return (
    <Frame flow={flow} title="Activation Summary" center cta={<Cta label="Continue " onClick={() => flow.goto('next')} />}>
      <div style={{ width: 104, height: 104, borderRadius: '50%', background: '#22C55E', margin: '8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 9px rgba(34,197,94,.15), 0 0 44px rgba(34,197,94,.55)' }}>
        <IconCheck style={{ width: 54, height: 54, color: '#fff' }} />
      </div>
      <H1>Your MTN Premium<br />is Active!</H1>
      <Sub>Here’s your summary.</Sub>
      <Card glass={!isVisitor} silver={isVisitor} style={{ width: '100%', textAlign: 'left' }}>
        <SumRow t="Premium Number" v={numberLineFor(flow)} dark={isVisitor} />
        <SumRow t="eSIM" v="Activated" dark={isVisitor} />
        <SumRow t={planName} v={planDesc} dark={isVisitor} />
        {adds.length > 0 && <SumRow t="Add-ons" v={adds.join(' · ')} dark={isVisitor} />}
        <SumRow t="Payment" v={NGN(flow.total)} strong dark={isVisitor} />
      </Card>
      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <SecondaryButton label="↓  Download eSIM QR" />
        <SecondaryButton label="✉  Email Receipt" />
      </div>
    </Frame>
  )
}

// A single dock item (icon + label); `onClick` is only wired up on Home,
// since Play/Help/More are static preview chrome, not real destinations.
function NavItem({ Icon, label, active, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, color: active ? COLORS.accent : '#6E6A60', cursor: onClick ? 'pointer' : 'default' }}>
      <Icon style={{ width: 20, height: 20 }} />
      <span style={{ font: "700 10px 'Poppins'" }}>{label}</span>
    </div>
  )
}

// A static preview of the post-onboarding app shell's bottom dock — Home /
// Play / Help / More plus a floating "apps" button — shown only on the
// final Done screens, matching the approved reference design.
function BottomNav({ onHome }) {
  return (
    <div style={{ position: 'relative', margin: '10px 20px max(10px, env(safe-area-inset-bottom))' }}>
      <div
        onClick={onHome}
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -55%)', zIndex: 2,
          width: 58, height: 58, borderRadius: '50%', background: COLORS.accent, border: '5px solid #0B0B0B',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: '0 10px 24px rgba(255,204,0,.35)',
        }}
      >
        <IconGrid style={{ width: 20, height: 20, color: '#000' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 12px 10px', borderRadius: 28, background: 'rgba(20,20,20,.92)', border: '1px solid rgba(255,255,255,.08)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
        <NavItem Icon={IconHome} label="Home" active onClick={onHome} />
        <NavItem Icon={IconPlay} label="Play" />
        <div style={{ width: 58, minWidth: 58 }} />
        <NavItem Icon={IconHelp} label="Help" />
        <NavItem Icon={IconMore} label="More" />
      </div>
    </div>
  )
}

// ---------- Done ----------
function Done({ flow }) {
  const { branch: br } = flow
  const cta = (
    <>
      <Cta label="Done" onClick={() => flow.goto('reset')} />
      <BottomNav onHome={() => flow.goto('reset')} />
    </>
  )

  if (br === 'a2') return (
    <Frame flow={flow} title="Welcome" center cta={cta} bg={celebrationBg} bgClear>
      <Ring e={<IconGlobe style={{ width: 46, height: 46, color: '#000' }} />} />
      <H1>Welcome to Lagos.</H1>
      <Sub>Your line is live until your visa expires — renew anytime with a new visa.</Sub>
      <Card glass>
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <Li glyph="▤" t={flow.chosePlatinum ? `${flow.platinumNumber} · platinum` : '0816 208 5531'} d="eSIM · active now" acc />
          <Li glyph="◈" t={`${flow.plans[flow.planIdx][0]} pack · live`} d={flow.plans[flow.planIdx][1]} acc />
        </div>
      </Card>
      <div style={{ font: "700 12px 'Poppins'", color: '#A6A6A6', textDecoration: 'underline', cursor: 'pointer' }}>Add streaming for your stay — from {NGN(1900)}/mo</div>
    </Frame>
  )

  const adds = Object.keys(flow.addons).filter(k => flow.addons[k]).map(k => ADDON[k][1])

  return (
    <Frame flow={flow} title="Congratulations" center cta={cta} bg={celebrationBg} bgClear>
      <img src={congratsImg} alt="" style={{ width: 168, height: 168, objectFit: 'contain', margin: '2px auto' }} />
      <H1>Congratulations!</H1>
      <Sub>Welcome to your MTN Premium benefits. Enjoy your premium benefits and stay connected.</Sub>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%', borderRadius: 22, padding: '12px 14px',
        background: 'linear-gradient(135deg, rgba(255,204,0,.14), rgba(255,204,0,.04))',
        border: '1px solid rgba(255,255,255,.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}>
        <div style={{ width: 38, height: 38, minWidth: 38, borderRadius: 12, background: 'rgba(255,204,0,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFCC00' }}>
          <IconGift style={{ width: 18, height: 18 }} />
        </div>
        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <div style={{ font: "700 12.5px 'Poppins'" }}>Earn from your circle</div>
          <div style={{ font: "600 10.5px 'Poppins'", color: '#A6A6A6', marginTop: 1 }}>Share <b style={{ color: '#FFCC00' }}>TAWFIK-25</b> — earn on their first recharge</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, minWidth: 38, borderRadius: 12, border: 0, background: '#25D366', color: '#fff', fontSize: 16, cursor: 'pointer' }}>↯</button>
      </div>
    </Frame>
  )
}

const SCREENS = {
  landing: Landing, cred: Cred, otp: OtpScreen,
  whyEsim: WhyEsim, beforeYouBegin: BeforeYouBegin, idType: IdType,
  identity: Identity, scan: Scan, readingPassport: ReadingPassport, reviewPassport: ReviewPassport,
  faceVerification: FaceVerification, verifyingIdentity: VerifyingIdentity, identityVerified: IdentityVerified,
  intent: Intent, number: NumberScreen, plan: Plan, planDetails: PlanDetails, diy: Diy, addons: Addons,
  gpick: Gpick, pay: Pay, activate: Activate, installing: Installing, activationSummary: ActivationSummary, done: Done,
}

export default function Screen({ flow }) {
  const S = SCREENS[flow.screen] || Landing
  return <S flow={flow} />
}
