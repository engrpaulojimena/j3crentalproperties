'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './AdminLogin.module.css'

const DEMO_EMAIL = 'admin@j3crentalproperties.com'
const DEMO_PASSWORD = 'J3C@Admin2026'

function EyeIcon({ hidden }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.3A10.6 10.6 0 0 1 12 4c5.4 0 9 5.1 9 8 0 1.2-.6 2.6-1.7 4M6.6 6.6C4.2 8.1 3 10.6 3 12c0 2.9 3.6 8 9 8a9.7 9.7 0 0 0 4.1-.9" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7S18 19 12 19s-9.5-7-9.5-7Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  )
}

export default function AdminLoginClient() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '').trim().toLowerCase()
    const password = String(form.get('password') || '')

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('Invalid email or password. Please check your temporary admin credentials.')
      return
    }

    setLoading(true)
    sessionStorage.setItem('j3c-admin-preview', 'active')
    sessionStorage.setItem('j3c-admin-email', email)

    window.setTimeout(() => {
      router.push('/admin')
    }, 450)
  }

  return (
    <main className={styles.page}>
      <section className={styles.visual} aria-label="J3C Rental Properties">
        <img className={styles.visualImage} src="/photos/fini-building.jpg" alt="Fini Homes Condominium" />
        <div className={styles.visualShade} />
        <div className={styles.visualGrid} />

        <div className={styles.visualTop}>
          <div className={styles.logoFrame}>
            <img src="/j3c-logo.jpg" alt="J3C Rental Properties" />
          </div>
          <div className={styles.brandText}>
            <strong>J3C Rental Properties</strong>
            <span>Private Management Console</span>
          </div>
        </div>

        <div className={styles.visualCopy}>
          <p className={styles.kicker}><span /> PROPERTY MANAGEMENT</p>
          <h1>Manage every unit<br /><em>with confidence.</em></h1>
          <p>
            A private workspace for owners and authorized staff to manage property listings,
            availability, rates, details, and photos from one place.
          </p>

          <div className={styles.featureRow}>
            <div><b>01</b><span>Units</span></div>
            <div><b>02</b><span>Photos</span></div>
            <div><b>03</b><span>Availability</span></div>
          </div>
        </div>

        <div className={styles.visualFooter}>
          <span>J3C Rental Properties</span>
          <span>Owner &amp; Admin Access</span>
        </div>
      </section>

      <section className={styles.loginPanel}>
        <div className={styles.loginShell}>
          <div className={styles.mobileBrand}>
            <div className={styles.mobileLogo}>
              <img src="/j3c-logo.jpg" alt="J3C Rental Properties" />
            </div>
            <div>
              <strong>J3C Rental Properties</strong>
              <span>Private Management Console</span>
            </div>
          </div>

          <div className={styles.secureBadge}>
            <span className={styles.secureDot} />
            Restricted access
          </div>

          <div className={styles.heading}>
            <p>WELCOME BACK</p>
            <h2>Sign in to your<br /><em>management portal.</em></h2>
            <span>Use your authorized owner or administrator account.</span>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Email address
              <div className={styles.inputWrap}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5h18v11H3z"/><path d="m3 7 9 6 9-6"/></svg>
                <input type="email" name="email" placeholder="admin@j3crentalproperties.com" autoComplete="username" required />
              </div>
            </label>

            <label>
              Password
              <div className={styles.inputWrap}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon hidden={showPassword} />
                </button>
              </div>
            </label>

            <div className={styles.formMeta}>
              <label className={styles.remember}>
                <input type="checkbox" name="remember" />
                <span>Keep me signed in</span>
              </label>
              <button type="button" className={styles.textButton}>Forgot password?</button>
            </div>

            <button className={styles.submitButton} type="submit" disabled={loading}>
              <span>{loading ? 'Signing in…' : 'Sign in securely'}</span>
              <span aria-hidden="true">→</span>
            </button>

            {error && (
              <div className={styles.errorNotice} role="alert">
                <strong>Unable to sign in</strong>
                <span>{error}</span>
              </div>
            )}
          </form>

          <div className={styles.securityNote}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.7 2.9 8.2 7 10 4.1-1.8 7-5.3 7-10V6l-7-3Z"/><path d="m9.5 12 1.6 1.6 3.7-4"/></svg>
            <div>
              <strong>Private access only</strong>
              <span>This page is intentionally not linked from the public website.</span>
            </div>
          </div>

          <p className={styles.helpText}>Need access? Contact the J3C system administrator.</p>
        </div>
      </section>
    </main>
  )
}
