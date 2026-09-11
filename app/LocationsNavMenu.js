'use client'

import { useEffect, useMemo, useState } from 'react'

function slugify(value) {
  return String(value || 'location')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'location'
}

export default function LocationsNavMenu() {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    let active = true
    fetch('/api/properties', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (active) setProperties(Array.isArray(data.properties) ? data.properties : [])
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  const groups = useMemo(() => {
    const byLocation = new Map()
    for (const property of properties) {
      const location = String(property.location || property.full_address || 'Other locations').trim()
      const development = String(property.development_name || property.name || 'J3C Rental Property').trim()
      if (!byLocation.has(location)) byLocation.set(location, new Set())
      byLocation.get(location).add(development)
    }
    return [...byLocation.entries()]
      .map(([location, developments]) => ({ location, developments: [...developments].sort() }))
      .sort((a, b) => a.location.localeCompare(b.location))
  }, [properties])

  return (
    <div className="desktop-location-nav">
      <a className="desktop-location-nav-trigger" href="#locations">Locations</a>
      {groups.length > 0 && (
        <div className="desktop-location-nav-panel" aria-label="J3C property locations">
          {groups.map((group) => {
            const firstDevelopment = group.developments[0]
            return (
              <div className="desktop-location-nav-group" key={group.location}>
                <a
                  className="desktop-location-heading"
                  href={`#location-${slugify(group.location)}-${slugify(firstDevelopment)}`}
                >
                  {group.location}
                </a>
                <div className="desktop-location-developments">
                  {group.developments.map((development) => (
                    <a
                      key={development}
                      href={`#location-${slugify(group.location)}-${slugify(development)}`}
                    >
                      {development}
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
