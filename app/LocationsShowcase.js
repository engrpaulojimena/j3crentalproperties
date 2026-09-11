'use client'

import { useEffect, useMemo, useState } from 'react'
import LocationImageSlider from './LocationImageSlider'

const communityImages = {
  'Fini Homes Condominium': [
    { src: '/photos/fini-building.jpg', label: 'Fini Homes Exterior', alt: 'Fini Homes Condominium exterior' },
    { src: '/photos/fini-dining.jpg', label: 'Dining Area', alt: 'Fini Homes dining area' },
    { src: '/photos/fini-living-02.jpg', label: 'Living Area', alt: 'Fini Homes living area' },
    { src: '/photos/fini-kitchen.jpg', label: 'Kitchen', alt: 'Fini Homes kitchen area' },
    { src: '/photos/fini-bedroom.jpg', label: 'Bedroom', alt: 'Fini Homes bedroom' },
    { src: '/photos/fini-bathroom-01.jpg', label: 'Bathroom', alt: 'Fini Homes bathroom' },
  ],
  'Chateau Valenzuela': [
    { src: '/photos/chateau/main-gate.jpg', label: 'Main Gate', alt: 'Chateau Valenzuela main gate' },
    { src: '/photos/chateau/buildings.jpg', label: 'Buildings', alt: 'Chateau Valenzuela buildings' },
    { src: '/photos/chateau/clubhouse.jpg', label: 'Clubhouse', alt: 'Chateau Valenzuela clubhouse' },
    { src: '/photos/chateau/pool.jpg', label: 'Swimming Pool', alt: 'Chateau Valenzuela swimming pool' },
    { src: '/photos/chateau/basketball-court.jpg', label: 'Basketball Court', alt: 'Chateau Valenzuela basketball court' },
    { src: '/photos/chateau/park.jpg', label: 'Park & Landscaped Area', alt: 'Chateau Valenzuela pool and landscaped area' },
  ],
}

function parseAmenities(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(Boolean)
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) return parsed.filter(Boolean)
  } catch {}
  return String(value).split(',').map((item) => item.trim()).filter(Boolean)
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function LocationsShowcase() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadLocations({ silent = false } = {}) {
    if (!silent) setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/properties', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not load property locations.')
      setProperties(Array.isArray(data.properties) ? data.properties : [])
    } catch (err) {
      setError(err.message || 'Could not load property locations.')
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    loadLocations()
    const refreshOnFocus = () => loadLocations({ silent: true })
    window.addEventListener('focus', refreshOnFocus)
    return () => window.removeEventListener('focus', refreshOnFocus)
  }, [])

  const communities = useMemo(() => {
    const groups = new Map()

    for (const property of properties) {
      const name = String(property.development_name || property.location || 'J3C Rental Property').trim()
      if (!groups.has(name)) groups.set(name, [])
      groups.get(name).push(property)
    }

    return [...groups.entries()].map(([name, units]) => {
      const location = units.find((unit) => unit.location)?.location || ''
      const address = units.find((unit) => unit.full_address)?.full_address || location
      const mapUrl = units.find((unit) => unit.map_url)?.map_url || ''
      const unitImages = units
        .flatMap((unit) => unit.images || [])
        .filter((image) => image?.image_url)
        .slice(0, 6)
        .map((image, index) => ({
          src: image.image_url,
          label: image.alt_text || `${name} photo ${index + 1}`,
          alt: image.alt_text || `${name} property photo`,
        }))
      const images = communityImages[name] || unitImages
      const amenities = [...new Set(units.flatMap((unit) => parseAmenities(unit.amenities)))].slice(0, 4)

      return {
        name,
        location,
        address,
        mapUrl,
        units,
        images: images.length ? images : [{ src: '/hero-building.svg', label: name, alt: `${name} property illustration` }],
        amenities,
      }
    })
  }, [properties])

  if (loading) {
    return (
      <div className="location-live-state" aria-live="polite">
        <span className="live-dot" /> Loading live property locations…
      </div>
    )
  }

  if (error) {
    return (
      <div className="location-live-state location-live-error">
        <strong>Live location data is temporarily unavailable.</strong>
        <button type="button" onClick={() => loadLocations()}>Try again</button>
      </div>
    )
  }

  if (!communities.length) {
    return <div className="location-live-state">No property locations are listed in the database yet.</div>
  }

  return (
    <div className="location-showcase-grid">
      {communities.map((community, index) => (
        <article
          className="location-property-card is-visible"
          data-reveal
          style={{ '--reveal-delay': `${Math.min(index, 5) * 80}ms` }}
          key={community.name}
        >
          <div className="location-property-media">
            <LocationImageSlider images={community.images} title={`${community.name} photos`} />
          </div>
          <div className="location-property-copy">
            <span>{community.location ? community.location.toUpperCase() : 'LIVE DATABASE LOCATION'}</span>
            <h3>{community.name}</h3>
            <p>{community.address}</p>
            <div className="location-tags">
              <b>{community.units.length} {community.units.length === 1 ? 'J3C unit' : 'J3C units'}</b>
              {community.amenities.map((amenity) => <b key={amenity}>{amenity}</b>)}
            </div>
            {community.mapUrl ? (
              <a href={community.mapUrl} target="_blank" rel="noreferrer">Open location <Arrow /></a>
            ) : (
              <a href="#properties">View available units <Arrow /></a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
