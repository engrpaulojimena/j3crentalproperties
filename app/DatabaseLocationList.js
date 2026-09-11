'use client'

import { useEffect, useMemo, useState } from 'react'

export default function DatabaseLocationList() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    fetch('/api/properties', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (!active) return
        setProperties(Array.isArray(data.properties) ? data.properties : [])
        setError(false)
      })
      .catch(() => {
        if (active) setError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const locations = useMemo(() => {
    const seen = new Set()
    const rows = []
    for (const property of properties) {
      const development = String(property.development_name || property.name || 'J3C Rental Property').trim()
      const key = development.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      rows.push({
        development,
        location: property.full_address || property.location || 'Location available on inquiry',
      })
    }
    return rows
  }, [properties])

  if (loading) return <p className="database-location-note">Loading live property areas…</p>
  if (error) return <p className="database-location-note">Live property areas are temporarily unavailable.</p>
  if (!locations.length) return <p className="database-location-note">No property locations are listed yet.</p>

  return (
    <ul className="area-list">
      {locations.map((item) => (
        <li key={item.development}>
          <strong>{item.development}</strong>
          <span>{item.location}</span>
        </li>
      ))}
    </ul>
  )
}
