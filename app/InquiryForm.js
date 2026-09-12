'use client'

import { useEffect, useState } from 'react'

export default function InquiryForm() {
  const [submitState, setSubmitState] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [properties, setProperties] = useState([])
  const [selectedProperty, setSelectedProperty] = useState('')

  useEffect(() => {
    let active = true
    fetch('/api/properties', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (!active) return
        const available = (data.properties || []).filter((property) => property.status === 'Vacant' || property.status === 'Available' || property.status === 'Available Soon' || (property.status === 'Occupied' && property.available_on))
        setProperties(available)
        if (available.length && !selectedProperty) setSelectedProperty(`${available[0].development_name ? `${available[0].development_name} — ` : ''}${available[0].name}`)
      })
      .catch(() => {})

    function handlePropertySelection(event) {
      if (event.detail?.property) setSelectedProperty(event.detail.property)
    }
    window.addEventListener('j3c:inquiry-property', handlePropertySelection)
    return () => {
      active = false
      window.removeEventListener('j3c:inquiry-property', handlePropertySelection)
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitState === 'sending') return

    setSubmitState('sending')
    setSubmitMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(data.error || 'Unable to send inquiry.')

      setSubmitState('success')
      setSubmitMessage('Thank you! Your inquiry has been sent to J3C Rental Properties.')
      form.reset()
      setSelectedProperty(properties.length ? `${properties[0].development_name ? `${properties[0].development_name} — ` : ''}${properties[0].name}` : '')
    } catch (error) {
      setSubmitState('error')
      setSubmitMessage(error.message || 'Unable to send your inquiry. Please try again.')
    }
  }

  return (
    <form className="inquiry-form" id="inquiry-form" onSubmit={handleSubmit}>
      <div className="form-preview-note">
        <span>Rental inquiry</span>
        <small>Sent directly to j3crentalproperties@gmail.com</small>
      </div>

      <div className="field-row">
        <label>
          Full name
          <input name="name" placeholder="Your name" required />
        </label>
        <label>
          Contact number
          <input name="phone" inputMode="tel" placeholder="09XX XXX XXXX" required />
        </label>
      </div>

      <label>
        Email address <small className="optional-label">Optional</small>
        <input name="email" type="email" placeholder="you@email.com" />
      </label>

      <label>
        Property of interest
        <select name="property" value={selectedProperty} onChange={(event) => setSelectedProperty(event.target.value)}>
          {properties.length > 0 ? (
            properties.map((property) => {
              const label = `${property.development_name ? `${property.development_name} — ` : ''}${property.name}`
              return <option key={property.id} value={label}>{label} — {property.location}</option>
            })
          ) : (
            <>
              <option value="">Select from live properties</option>
              <option value="Not sure yet">Not sure yet</option>
            </>
          )}
        </select>
      </label>

      <label>
        Your inquiry
        <textarea name="message" rows="4" placeholder="Ask about availability, rates, requirements, or the property." required />
      </label>

      <input
        name="website"
        type="text"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      <button className="btn btn-gold btn-full" type="submit" disabled={submitState === 'sending'}>
        {submitState === 'sending' ? 'Sending Inquiry…' : 'Send Inquiry'} <span aria-hidden="true">↗</span>
      </button>

      {submitMessage && (
        <div className="form-demo-success" role="status" aria-live="polite">
          <strong>{submitState === 'success' ? 'Inquiry sent.' : 'Could not send inquiry.'}</strong>
          <span>{submitMessage}</span>
        </div>
      )}
    </form>
  )
}
