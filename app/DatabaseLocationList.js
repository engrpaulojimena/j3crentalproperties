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
    const groups = new Map()
    for (const property of properties) {
      const location = String(property.location || property.full_address || 'Location available on inquiry').trim()
      const development = String(property.development_name || property.name || 'J3C Rental Property').trim()
      const key = location.toLowerCase()
      if (!groups.has(key)) groups.set(key, { location, developments: new Set() })
      groups.get(key).developments.add(development)
    }
    return [...groups.values()]
      .map((item) => ({ ...item, developments: [...item.developments].sort() }))
      .sort((a, b) => a.location.localeCompare(b.location))
  }, [properties])

  if (loading) return <p className="database-location-note">Loading live property areas…</p>
  if (error) return <p className="database-location-note">Live property areas are temporarily unavailable.</p>
  if (!locations.length) return <p className="database-location-note">No property locations are listed yet.</p>

  return (
    <ul className="area-list">
      {locations.map((item) => (
        <li key={item.location}>
          <strong>{item.location}</strong>
          <span>{item.developments.join(' · ')}</span>
        </li>
      ))}
    </ul>
  )
}
