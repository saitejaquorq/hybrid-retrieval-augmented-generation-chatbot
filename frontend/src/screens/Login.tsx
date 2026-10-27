// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Checkbox, Badge, Avatar, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, X, ChevronRight, ChevronDown, User, Clock, ArrowRight, AlertCircle, CheckCircle } = Icons;

const ORG = 'Kestrel Analytics';
const BUCKET = 's3://kestrel-research-vault';
const VALID_DOMAIN = 'kestrel.co';
const BUILD = 'v0.4.2';

const REMEMBERED = {
  name: 'Rosalind Achebe',
  email: 'rosalind.achebe@kestrel.co',
  when: '24 Oct 2026, 09:12',
  device: 'Chrome on macOS · this laptop',
};

const SESSION_NOTE = {
  at: '09:12',
  text: 'Your session expired after 12 hours. Sign in again and the conversation you had open — “Titan embedding cost per run” — will still be there.',
};

const ACCESS_NOTES = [
  'Anyone who signs in can query every indexed document. There are no per-team or per-document filters.',
  'Company SSO (AWS Cognito) is written down for a later release. This one is email and password only.',
  'Sessions last 12 hours. When one expires, or you sign out, you land back on this page.',
];

const hexToRgba = (hex, alpha) => {
  const h = String(hex || '').replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return `rgba(0,0,0,${alpha})`;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const muted = brand.neutralColor;
  const paper = brand.backgroundColor;

  const rule = hexToRgba(muted, 0.24);
  const ruleSoft = hexToRgba(muted, 0.14);
  const wash = hexToRgba(muted, 0.045);
  const accentRule = hexToRgba(accent, 0.45);

  const mono = `${brand.fontHeading}, ui-monospace, SFMono-Regular, Menlo, monospace`;
  const serif = `${brand.fontBody}, "Iowan Old Style", Georgia, serif`;
  const radius = brand.radius;

  const [email, setEmail] = React.useState(REMEMBERED.email);
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [keepSignedIn, setKeepSignedIn] = React.useState(true);
  const [status, setStatus] = React.useState('idle'); // idle | invalid | submitting | error | locked | offline | success
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [attempts, setAttempts] = React.useState(0);
  const [showNote, setShowNote] = React.useState(true);
  const [showReset, setShowReset] = React.useState(false);
  const [remembered, setRemembered] = React.useState(true);
  const [offline, setOffline] = React.useState(false);

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const timers = React.useRef([]);

  const after = (ms, fn) => {
    timers.current.push(setTimeout(fn, ms));
  };

  React.useEffect(() => {
    const down = () => setOffline(true);
    const up = () => setOffline(false);
    window.addEventListener('offline', down);
    window.addEventListener('online', up);
    return () => {
      window.removeEventListener('offline', down);
      window.removeEventListener('online', up);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const busy = status === 'submitting' || status === 'success';
  const locked = status === 'locked';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (busy || locked) return;

    const mail = email.trim();
    const fe = {};
    if (!mail) fe.email = 'Enter your work email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) fe.email = 'That is not a complete email address.';
    if (!password) fe.password = 'Enter your password.';

    setFieldErrors(fe);
    if (fe.email || fe.password) {
      setStatus('invalid');
      const target = fe.email ? emailRef.current : passwordRef.current;
      if (target && target.focus) target.focus();
      return;
    }

    if (offline) {
      setStatus('offline');
      return;
    }

    setStatus('submitting');
    after(1150, () => {
      const ok = mail.toLowerCase().endsWith('@' + VALID_DOMAIN) && password.length >= 8;
      if (ok) {
        setStatus('success');
        after(1100, () => navigate('chat'));
      } else {
        const next = attempts + 1;
        setAttempts(next);
        setStatus(next >= 3 ? 'locked' : 'error');
        if (passwordRef.current && passwordRef.current.focus) passwordRef.current.focus();
      }
    });
  };

  const useDifferentAddress = () => {
    setRemembered(false);
    setEmail('');
    setPassword('');
    setFieldErrors({});
    setStatus('idle');
    if (emailRef.current && emailRef.current.focus) emailRef.current.focus();
  };

  const fieldStyle = (invalid) => ({
    width: '100%',
    minHeight: '44px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: invalid ? ink : rule,
    borderRadius: radius,
    backgroundColor: paper,
    color: ink,
    fontFamily: mono,
    fontSize: '14px',
    padding: '10px 12px',
  });

  const labelStyle = {
    fontFamily: mono,
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: ink,
    fontWeight: 600,
  };

  const Stamp = ({ children, solid }) => (
    <span
      className="mg-stamp inline-flex items-center"
      style={{
        fontFamily: mono,
        fontSize: '11px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: 600,
        padding: '3px 8px',
        border: `1px solid ${solid ? accent : ink}`,
        backgroundColor: solid ? accent : 'transparent',
        color: ink,
        borderRadius: radius,
      }}
    >
      {children}
    </span>
  );

  const outLine = { fontFamily: mono, fontSize: '13px', lineHeight: 1.75, color: ink };
  const outMuted = { fontFamily: mono, fontSize: '12.5px', lineHeight: 1.75, color: muted };

  const renderOutput = () => {
    if (status === 'submitting') {
      return (
        <div className="mg-rise space-y-1">
          <p style={outMuted}>POST /auth/login</p>
          <p style={outLine} className="mg-caret">
            checking credentials for {email.trim() || '—'}
          </p>
        </div>
      );
    }

    if (status === 'success') {
      return (
        <div className="mg-rise space-y-3">
          <Stamp solid>
            <CheckCircle className="w-3 h-3 mr-1.5" aria-hidden="true" />
            Signed in
          </Stamp>
          <p style={outLine} className="tabular-nums">
            session opened 09:16 · expires in 12 h · {keepSignedIn ? 'kept on this device' : 'this browser tab only'}
          </p>
          <p style={outMuted} className="mg-caret">opening chat</p>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className="mg-rise space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <Stamp>
              <AlertCircle className="w-3 h-3 mr-1.5" aria-hidden="true" />
              Not recognised
            </Stamp>
            <Badge
              className="tabular-nums"
              style={{ fontFamily: mono, fontSize: '11px', backgroundColor: wash, color: ink, border: `1px solid ${rule}`, borderRadius: radius }}
            >
              attempt {attempts} of 3
            </Badge>
          </div>
          <p style={outLine}>AuthError: email or password not recognised.</p>
          <p style={outMuted}>
            We don’t say which of the two was wrong — that’s deliberate. Your entries are still in the fields above.
          </p>
        </div>
      );
    }

    if (status === 'locked') {
      return (
        <div className="mg-rise space-y-3">
          <Stamp>
            <AlertCircle className="w-3 h-3 mr-1.5" aria-hidden="true" />
            Locked
          </Stamp>
          <p style={outLine}>AuthError: three failed attempts — this address is locked for 15 minutes.</p>
          <p style={outMuted}>
            Priya Raghunathan on data-platform can clear it sooner. Mail it-help@{VALID_DOMAIN} from a phone or post in
            #data-platform with the time above.
          </p>
        </div>
      );
    }

    if (status === 'offline') {
      return (
        <div className="mg-rise space-y-3">
          <Stamp>
            <AlertCircle className="w-3 h-3 mr-1.5" aria-hidden="true" />
            No network
          </Stamp>
          <p style={outLine}>Nothing was sent — this browser is offline.</p>
          <p style={outMuted}>Your email and password are kept as typed. Press Sign in again once you’re back on the network.</p>
        </div>
      );
    }

    if (status === 'invalid') {
      return (
        <div className="mg-rise space-y-2">
          <p style={outLine}>Out [1]: nothing sent — check the field marked above.</p>
          <p style={outMuted}>Both an email address and a password are needed before anything reaches /auth/login.</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p style={outLine}>Out [1]: waiting — nothing has been sent yet.</p>
        <p style={outMuted}>
          Your password is checked against the staff directory. It is never passed to Bedrock or stored with a question.
        </p>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: paper, '--mg-ink': ink, fontFamily: serif }}
    >
      <style>{`
        @keyframes mg-rise { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @keyframes mg-stamp { from { opacity: 0; transform: rotate(-7deg) scale(1.07); } to { opacity: 1; transform: rotate(-1.5deg) scale(1); } }
        @keyframes mg-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .mg-rise { animation: mg-rise .24s ease-out both; }
        .mg-stamp { animation: mg-stamp .3s cubic-bezier(.2,.8,.3,1) both; transform: rotate(-1.5deg); }
        .mg-caret::after { content: '▌'; margin-left: 3px; animation: mg-blink 1s steps(1) infinite; }
        .mg-focus:focus-visible { outline: 2px solid var(--mg-ink); outline-offset: 2px; }
        .mg-field:focus { outline: 2px solid var(--mg-ink); outline-offset: 1px; }
        .mg-field:disabled { opacity: .55; cursor: not-allowed; }
        .mg-link { text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
        .mg-primary { transition: filter .15s ease, transform .08s ease; }
        .mg-primary:hover:not(:disabled) { filter: brightness(1.07); }
        .mg-primary:active:not(:disabled) { transform: translateY(1px); }
        .mg-primary:disabled { opacity: .6; cursor: progress; }
        .mg-ghost { transition: background-color .15s ease; }
        .mg-ghost:hover { background-color: ${wash}; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-16 py-10 lg:py-16">
        {/* Wordmark */}
        <div className="flex items-baseline gap-3">
          <span
            aria-hidden="true"
            className="inline-block"
            style={{ width: '2px', height: '22px', backgroundColor: accent, transform: 'translateY(3px)' }}
          />
          <span style={{ fontFamily: mono, fontSize: '16px', fontWeight: 600, color: ink, letterSpacing: '-0.01em' }}>
            marginalia
          </span>
          <span style={{ fontFamily: mono, fontSize: '12px', color: muted }}>
            {ORG} · internal document index
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12 lg:mt-16">
          {/* ───────── Main column ───────── */}
          <main className="lg:col-span-7">
            <h1
              data-wf="b-0-0"
              className="text-[34px] lg:text-[40px] font-semibold"
              style={{ fontFamily: mono, color: ink, letterSpacing: '-0.02em', lineHeight: 1.15 }}
            >
              Sign in to DocChat
            </h1>
            <p className="mt-4 text-[17px]" style={{ color: muted, lineHeight: 1.6, maxWidth: '68ch' }}>
              Marginalia answers questions from the documents in the {ORG} research bucket and shows the file and chunk
              each answer came from. Staff accounts only — nothing here is readable without signing in.
            </p>

            {/* Session note */}
            {showNote && (
              <div
                className="mg-rise mt-8 flex items-start gap-3 p-4"
                style={{ backgroundColor: wash, border: `1px solid ${ruleSoft}`, borderRadius: radius }}
              >
                <Clock className="w-4 h-4 mt-[3px] shrink-0" style={{ color: muted }} aria-hidden="true" />
                <div className="flex-1">
                  <p className="tabular-nums" style={{ fontFamily: mono, fontSize: '12px', color: ink, fontWeight: 600 }}>
                    Out [0]: session ended {SESSION_NOTE.at}
                  </p>
                  <p className="mt-1 text-[15px]" style={{ color: muted, lineHeight: 1.6, maxWidth: '60ch' }}>
                    {SESSION_NOTE.text}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNote(false)}
                  aria-label="Dismiss the session note"
                  className="mg-focus mg-ghost shrink-0 inline-flex items-center justify-center w-8 h-8"
                  style={{ color: muted, borderRadius: radius }}
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}

            {/* ───── Notebook cell: In [1] / Out [1] ───── */}
            <div className="relative mt-10">
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 hidden sm:block"
                style={{ left: '84px', width: '1px', backgroundColor: accentRule }}
              />

              {/* In [1] */}
              <form data-wf="b-2-0" onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row">
                <div
                  className="sm:w-[84px] shrink-0 sm:text-right sm:pr-4 pt-0 sm:pt-5 pb-2 sm:pb-0 tabular-nums"
                  style={{ fontFamily: mono, fontSize: '12.5px', color: ink, fontWeight: 600 }}
                >
                  In [1]:
                </div>

                <div
                  className="flex-1 sm:ml-6 p-6 sm:p-8"
                  style={{ border: `1px solid ${rule}`, borderRadius: radius, backgroundColor: paper }}
                >
                  <h2 style={{ ...labelStyle, fontSize: '11px', letterSpacing: '0.14em', color: muted }}>
                    Staff login
                  </h2>

                  <div className="mt-6 space-y-6">
                    {/* Email */}
                    <div>
                      <Label htmlFor="email" style={labelStyle}>Work email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="username"
                        autoCapitalize="none"
                        spellCheck={false}
                        ref={emailRef}
                        value={email}
                        disabled={busy || locked}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                        }}
                        aria-invalid={fieldErrors.email ? 'true' : undefined}
                        aria-describedby={fieldErrors.email ? 'email-error' : 'email-hint'}
                        className="mg-field mt-2"
                        style={fieldStyle(Boolean(fieldErrors.email))}
                      />
                      {fieldErrors.email ? (
                        <p
                          id="email-error"
                          className="mg-rise mt-2 flex items-center gap-1.5"
                          style={{ fontFamily: mono, fontSize: '12px', color: ink }}
                        >
                          <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          {fieldErrors.email}
                        </p>
                      ) : (
                        <p id="email-hint" className="mt-2" style={{ fontFamily: mono, fontSize: '12px', color: muted }}>
                          Your @{VALID_DOMAIN} address — personal addresses are not in the staff directory.
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <Label htmlFor="password" style={labelStyle}>Password</Label>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-pressed={showPassword}
                          className="mg-focus mg-ghost px-2 py-1"
                          style={{ fontFamily: mono, fontSize: '12px', color: ink, borderRadius: radius }}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        ref={passwordRef}
                        value={password}
                        disabled={busy || locked}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
                        }}
                        aria-invalid={fieldErrors.password ? 'true' : undefined}
                        aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                        className="mg-field mt-2"
                        style={fieldStyle(Boolean(fieldErrors.password))}
                      />
                      {fieldErrors.password && (
                        <p
                          id="password-error"
                          className="mg-rise mt-2 flex items-center gap-1.5"
                          style={{ fontFamily: mono, fontSize: '12px', color: ink }}
                        >
                          <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          {fieldErrors.password}
                        </p>
                      )}
                    </div>

                    {/* Keep signed in */}
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="keep"
                        checked={keepSignedIn}
                        disabled={busy || locked}
                        onChange={(e) =>
                          setKeepSignedIn(e && e.target ? e.target.checked : !keepSignedIn)
                        }
                        className="mg-focus"
                        style={{ accentColor: accent }}
                      />
                      <Label htmlFor="keep" className="text-[15px]" style={{ color: ink, fontFamily: serif }}>
                        Keep me signed in on this device for 12 hours
                      </Label>
                    </div>
                  </div>

                  <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${ruleSoft}` }}>
                    <Button
                      type="submit"
                      disabled={busy || locked}
                      className="mg-primary mg-focus w-full sm:w-auto inline-flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: locked ? wash : accent,
                        color: locked ? muted : ink,
                        border: `1px solid ${locked ? rule : accent}`,
                        borderRadius: radius,
                        fontFamily: mono,
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '0.01em',
                        minHeight: '46px',
                        padding: '0 24px',
                      }}
                    >
                      {status === 'submitting' && <span className="mg-caret">Signing you in</span>}
                      {status === 'success' && (
                        <>
                          <Check className="w-4 h-4" aria-hidden="true" />
                          Signed in
                        </>
                      )}
                      {locked && 'Locked for 15 minutes'}
                      {!busy && !locked && (
                        <>
                          Sign in
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </Button>

                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={() => setShowReset(!showReset)}
                        aria-expanded={showReset}
                        aria-controls="reset-help"
                        className="mg-focus mg-link inline-flex items-center gap-1.5"
                        style={{ fontFamily: mono, fontSize: '12.5px', color: muted }}
                      >
                        {showReset ? <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" /> : <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />}
                        Forgotten your password?
                      </button>
                      {showReset && (
                        <p
                          id="reset-help"
                          className="mg-rise mt-3 text-[15px]"
                          style={{ color: muted, lineHeight: 1.6, maxWidth: '60ch' }}
                        >
                          Resets go through data-platform. Mail it-help@{VALID_DOMAIN} from your {ORG} address and
                          Priya sends a reset link the same working day. There is no self-service reset in this release.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </form>

              {/* Out [1] */}
              <div className="flex flex-col sm:flex-row mt-5">
                <div
                  className="sm:w-[84px] shrink-0 sm:text-right sm:pr-4 pt-0 sm:pt-4 pb-2 sm:pb-0 tabular-nums"
                  style={{ fontFamily: mono, fontSize: '12.5px', color: muted, fontWeight: 600 }}
                >
                  Out [1]:
                </div>
                <div
                  role="status"
                  aria-live="polite"
                  className="flex-1 sm:ml-6 p-5 sm:p-6"
                  style={{
                    backgroundColor: wash,
                    border: `1px solid ${ruleSoft}`,
                    borderRadius: radius,
                    minHeight: '92px',
                  }}
                >
                  {renderOutput()}
                </div>
              </div>
            </div>
          </main>

          {/* ───────── Right-hand run rail ───────── */}
          <aside className="lg:col-span-5 lg:pl-10" style={{ borderLeft: `1px solid ${ruleSoft}` }}>
            <h2 style={{ ...labelStyle, fontSize: '11px', letterSpacing: '0.14em', color: muted }}>Access notes</h2>
            <ul className="mt-5 space-y-4">
              {ACCESS_NOTES.map((note, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden="true" style={{ fontFamily: mono, fontSize: '13px', color: accent, lineHeight: 1.6 }}>—</span>
                  <span className="text-[15px]" style={{ color: muted, lineHeight: 1.6 }}>{note}</span>
                </li>
              ))}
            </ul>

            <div className="h-px my-8" style={{ backgroundColor: ruleSoft }} role="presentation" />

            <h2 style={{ ...labelStyle, fontSize: '11px', letterSpacing: '0.14em', color: muted }}>Last device</h2>
            {remembered ? (
              <div className="mt-5">
                <div className="flex items-center gap-3">
                  <Avatar name={REMEMBERED.name} />
                  <div>
                    <p className="text-[15px] font-semibold" style={{ color: ink }}>{REMEMBERED.name}</p>
                    <p className="tabular-nums" style={{ fontFamily: mono, fontSize: '12px', color: muted }}>
                      {REMEMBERED.email}
                    </p>
                  </div>
                </div>
                <p className="mt-3 tabular-nums" style={{ fontFamily: mono, fontSize: '12px', color: muted }}>
                  Signed in {REMEMBERED.when} · {REMEMBERED.device}
                </p>
                <button
                  type="button"
                  onClick={useDifferentAddress}
                  className="mg-focus mg-link mt-3 inline-flex items-center gap-1.5"
                  style={{ fontFamily: mono, fontSize: '12.5px', color: ink }}
                >
                  <User className="w-3.5 h-3.5" aria-hidden="true" />
                  Not Rosalind? Use another address
                </button>
              </div>
            ) : (
              <div className="mt-5">
                <Empty
                  title="No remembered account"
                  description="This browser isn’t holding an address any more. Type a Kestrel email above and Marginalia will remember it next time."
                />
              </div>
            )}

            <div className="h-px my-8" style={{ backgroundColor: ruleSoft }} role="presentation" />

            <h2 style={{ ...labelStyle, fontSize: '11px', letterSpacing: '0.14em', color: muted }}>Trouble signing in</h2>
            <p className="mt-5 text-[15px]" style={{ color: muted, lineHeight: 1.6 }}>
              New starters are added to the staff directory by data-platform, usually within a day of their laptop
              arriving. Post in <span style={{ fontFamily: mono, fontSize: '13.5px', color: ink }}>#data-platform</span> or
              mail <span style={{ fontFamily: mono, fontSize: '13.5px', color: ink }}>it-help@{VALID_DOMAIN}</span>.
            </p>

            <div
              className="mt-6 flex items-start gap-3 p-4"
              style={{ border: `1px solid ${ruleSoft}`, borderRadius: radius, backgroundColor: offline ? wash : 'transparent' }}
            >
              {offline ? (
                <AlertCircle className="w-4 h-4 mt-[2px] shrink-0" style={{ color: ink }} aria-hidden="true" />
              ) : (
                <CheckCircle className="w-4 h-4 mt-[2px] shrink-0" style={{ color: muted }} aria-hidden="true" />
              )}
              <p className="tabular-nums" style={{ fontFamily: mono, fontSize: '12px', color: offline ? ink : muted, lineHeight: 1.7 }}>
                {offline
                  ? 'This browser is offline — sign-in will retry when the network returns. Last check 09:14.'
                  : 'Auth, index and Bedrock responding · checked 09:14'}
              </p>
            </div>
          </aside>
        </div>

        <footer className="mt-16 pt-6" style={{ borderTop: `1px solid ${ruleSoft}` }}>
          <p className="tabular-nums" style={{ fontFamily: mono, fontSize: '11.5px', color: muted, letterSpacing: '0.02em' }}>
            {ORG} internal tool · documents stay in {BUCKET} · marginalia {BUILD}
          </p>
        </footer>
      </div>
    </div>
  );
}
