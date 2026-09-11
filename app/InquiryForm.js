'use client'

import { useEffect, useState } from 'react'

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [properties, setProperties] = useState([])
  const [selectedProperty, setSelectedProperty] = useState('')

  useEffect(() => {
    let active = true
    fetch('/api/properties', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (!active) return
        const available = (data.properties || []).filter((property) => property.status === 'Available' || property.status === 'Available Soon' || (property.status === 'Occupied' && property.available_on))
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

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <form className="inquiry-form" id="inquiry-form" onSubmit={handleSubmit}>
      <div className="form-preview-note">
        <span>Inquiry form preview</span>
        <small>For direct assistance: j3crentalproperties@gmail.com</small>
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
              <option value="Fini Homes Condominium">Fini Homes Condominium</option>
              <option value="Other J3C property">Other J3C property</option>
              <option value="Not sure yet">Not sure yet</option>
            </>
          )}
        </select>
      </label>

      <label>
        Your inquiry
        <textarea name="message" rows="4" placeholder="Ask about availability, rates, requirements, or the property." required />
      </label>

      <button className="btn btn-gold btn-full" type="submit">
        Send Inquiry <span aria-hidden="true">↗</span>
      </button>

      {submitted && (
        <div className="form-demo-success" role="status">
          <strong>Preview submitted.</strong>
          <span>The live version will send this inquiry to J3C once the receiving email is confirmed.</span>
        </div>
      )}
    </form>
  )
}
