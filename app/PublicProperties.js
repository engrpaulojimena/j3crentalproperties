'use client'

import { useEffect, useMemo, useState } from 'react'

const developmentProfiles = {
  'Fini Homes Condominium': {
    summary: 'Gated condominium community with 24-hour security, swimming pool, clubhouse, and convenient access to OLFU and Monumento LRT.',
    fallbackImage: '/photos/fini-building.jpg',
    portfolioLabel: 'J3C-managed rental community',
  },
  'Chateau Valenzuela': {
    summary: 'A secured, peaceful community with shared amenities and convenient access to NLEX, Dalandanan, and Paso de Blas.',
    fallbackImage: '/photos/chateau/buildings.jpg',
    portfolioLabel: 'J3C-managed rental community',
    gallery: [
      { src: '/photos/chateau/main-gate.jpg', label: 'Main Gate' },
      { src: '/photos/chateau/buildings.jpg', label: 'Buildings' },
      { src: '/photos/chateau/clubhouse.jpg', label: 'Clubhouse' },
      { src: '/photos/chateau/pool.jpg', label: 'Swimming Pool' },
      { src: '/photos/chateau/basketball-court.jpg', label: 'Basketball Court' },
      { src: '/photos/chateau/park.jpg', label: 'Pool & Landscaped Area' },
    ],
  },
}

function formatPeso(value) {
  const amount = Number(value || 0)
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatAvailabilityDate(value) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function statusLabel(property) {
  if (property.status === 'Available Soon' && property.available_on) {
    return `Available ${formatAvailabilityDate(property.available_on)}`
  }
  if (property.status === 'Occupied' && property.available_on) {
    return `Occupied · Available ${formatAvailabilityDate(property.available_on)}`
  }
  return property.status || 'Available'
}

function statusClass(property) {
  if (property.status === 'Occupied') return 'occupied-soon'
  if (property.status === 'Available Soon') return 'soon'
  return ''
}

function parseAmenities(value) {
  if (!value) return []
  let items = []
  if (Array.isArray(value)) items = value.filter(Boolean)
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) items = parsed.filter(Boolean)
  } catch {}
  if (!items.length) {
    items = String(value)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  const seen = new Set()
  return items.filter((item) => {
    const key = String(item)
      .normalize('NFKD')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const LOCATION_IMAGE_PREFIX = '[J3C_LOCATION]'

function isLocationGalleryImage(image) {
  return String(image?.alt_text || '').startsWith(LOCATION_IMAGE_PREFIX)
}

function getUnitImages(property) {
  return (property?.images || []).filter((image) => !isLocationGalleryImage(image))
}

function getCover(property) {
  const images = getUnitImages(property)
  return images.find((image) => Number(image.is_cover) === 1) || images[0] || null
}

function getDevelopmentName(property) {
  return property.development_name || property.location || 'J3C Rental Properties'
}

function getFallbackImage(property) {
  return developmentProfiles[getDevelopmentName(property)]?.fallbackImage || '/photos/fini-building.jpg'
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase()
}


export default function PublicProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [location, setLocation] = useState('All locations')
  const [query, setQuery] = useState('')
  const [activeProperty, setActiveProperty] = useState(null)
  const [activeImage, setActiveImage] = useState(0)

  async function loadProperties({ silent = false } = {}) {
    if (!silent) setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/properties', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not load properties.')
      setProperties(Array.isArray(data.properties) ? data.properties : [])
    } catch (err) {
      setError(err.message || 'Could not load properties.')
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
    const interval = window.setInterval(() => loadProperties({ silent: true }), 30000)
    const refreshOnFocus = () => loadProperties({ silent: true })
    window.addEventListener('focus', refreshOnFocus)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', refreshOnFocus)
    }
  }, [])

  useEffect(() => {
    if (!activeProperty) return

    function onKey(event) {
      if (event.key === 'Escape') setActiveProperty(null)
      if (event.key === 'ArrowRight') {
        const count = activeProperty.images?.length || 0
        if (count > 1) setActiveImage((current) => (current + 1) % count)
      }
      if (event.key === 'ArrowLeft') {
        const count = activeProperty.images?.length || 0
        if (count > 1) setActiveImage((current) => (current - 1 + count) % count)
      }
    }

    // Keep the site navigation usable while a unit is open. Any in-page
    // navigation choice (especially Available Units) closes the unit detail
    // first so the selected section can be shown normally.
    function onPageNavigation(event) {
      const link = event.target?.closest?.('a[href^="#"]')
      if (!link) return
      setActiveProperty(null)
    }

    function onHashChange() {
      setActiveProperty(null)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('hashchange', onHashChange)
    document.addEventListener('click', onPageNavigation)
    document.body.classList.add('property-modal-open')
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('hashchange', onHashChange)
      document.removeEventListener('click', onPageNavigation)
      document.body.classList.remove('property-modal-open')
    }
  }, [activeProperty])

  const listedProperties = useMemo(() => {
    return [...properties]
      .sort((a, b) => Number(b.is_featured || 0) - Number(a.is_featured || 0) || Number(b.id || 0) - Number(a.id || 0))
  }, [properties])

  const locations = useMemo(() => {
    return [...new Set(listedProperties.map((property) => getDevelopmentName(property)).filter(Boolean))].sort()
  }, [listedProperties])

  const visibleProperties = useMemo(() => {
    const needle = normalizeText(query)
    return listedProperties.filter((property) => {
      const development = getDevelopmentName(property)
      const locationMatch = location === 'All locations' || development === location
      if (!locationMatch) return false
      if (!needle) return true
      return [
        property.name,
        development,
        property.location,
        property.full_address,
        property.building_name,
        property.floor_label,
        property.description,
        property.amenities,
      ].some((value) => normalizeText(value).includes(needle))
    })
  }, [listedProperties, location, query])

  const groupedProperties = useMemo(() => {
    const groups = new Map()
    for (const property of visibleProperties) {
      const name = getDevelopmentName(property)
      if (!groups.has(name)) groups.set(name, [])
      groups.get(name).push(property)
    }
    return [...groups.entries()].map(([name, units]) => ({ name, units, profile: developmentProfiles[name] || {} }))
  }, [visibleProperties])

  function openProperty(property) {
    setActiveProperty({ ...property, images: getUnitImages(property) })
    setActiveImage(0)
  }

  function backToAvailableUnits() {
    setActiveProperty(null)
  }

  function inquire(property) {
    setActiveProperty(null)
    window.dispatchEvent(new CustomEvent('j3c:inquiry-property', { detail: { property: `${getDevelopmentName(property)} — ${property.name}` } }))
    window.setTimeout(() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  if (loading) {
    return (
      <div className="public-property-loading" aria-live="polite">
        {[1, 2, 3].map((item) => <div className="property-skeleton" key={item} />)}
      </div>
    )
  }

  if (error) {
    return (
      <div className="public-property-state">
        <span>Live listings</span>
        <h3>Property availability is being updated.</h3>
        <p>The rest of the J3C website remains available. Please use the inquiry section for current availability.</p>
        <button type="button" onClick={loadProperties}>Try again</button>
      </div>
    )
  }

  return (
    <>
      <div className="property-browser-toolbar">
        <div className="property-browser-status">
          <span className="live-dot" />
          <strong>{listedProperties.length}</strong>
          <span>{listedProperties.length === 1 ? 'rental unit listed' : 'rental units listed'}</span>
        </div>
        <div className="property-browser-controls">
          <label>
            <span>Search</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Property, building or location" />
          </label>
          <label>
            <span>Property</span>
            <select value={location} onChange={(event) => setLocation(event.target.value)}>
              <option>All locations</option>
              {locations.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </div>

      {visibleProperties.length === 0 ? (
        <div className="public-property-state compact">
          <span>J3C rentals</span>
          <h3>No matching unit found.</h3>
          <p>Try another property or contact J3C for upcoming availability.</p>
        </div>
      ) : (
        <div className="property-development-list">
          {groupedProperties.map((group, groupIndex) => {
            const profile = group.profile
            const address = group.units.find((unit) => unit.full_address)?.full_address
            const shortLocation = group.units.find((unit) => unit.location)?.location
            return (
              <section
                className={`property-development ${group.units.length === 1 ? 'single-unit' : ''}`}
                key={group.name}
                style={{ '--group-delay': `${Math.min(groupIndex, 4) * 90}ms` }}
              >
                <div className="property-development-head">
                  <div className="property-development-title">
                    <span className="property-development-kicker">J3C RENTAL COLLECTION</span>
                    <div className="property-development-name-row">
                      <h3>{group.name}</h3>
                      <span className="property-development-count">{group.units.length} {group.units.length === 1 ? 'unit' : 'units'}</span>
                    </div>
                    <p>{address || shortLocation}</p>
                  </div>
                  {(profile.portfolioLabel || profile.summary) && (
                    <div className="property-development-summary">
                      {profile.portfolioLabel && <strong>{profile.portfolioLabel}</strong>}
                      {profile.summary && <p>{profile.summary}</p>}
                    </div>
                  )}
                </div>

                <div className="public-property-grid grouped">
                  {group.units.map((property, index) => {
                    const cover = getCover(property)
                    const photoCount = getUnitImages(property).length
                    const fallback = getFallbackImage(property)
                    return (
                      <article className="public-property-card" key={property.id} style={{ '--card-delay': `${Math.min(index, 5) * 70}ms` }}>
                        <button className="property-card-media" type="button" onClick={() => openProperty(property)} aria-label={`View ${property.name}`}>
                          <img src={cover?.image_url || fallback} alt={cover?.alt_text || property.name} />
                          <span className={`property-status-badge ${statusClass(property)}`}>{statusLabel(property)}</span>
                          {photoCount > 0 ? (
                            <span className="property-photo-count">{photoCount} photo{photoCount === 1 ? '' : 's'}</span>
                          ) : (
                            <span className="property-photo-count community">Community photo</span>
                          )}
                          <span className="property-card-view">View unit <b>↗</b></span>
                        </button>

                        <div className="property-card-body">
                          <div className="property-card-heading">
                            <div>
                              <span className="property-unit-code">
                                {property.building_name || 'Rental listing'}
                                {property.floor_label ? ` · ${property.floor_label}` : ''}
                              </span>
                              <h3>{property.name}</h3>
                              <p>{property.location}</p>
                            </div>
                            <div className="property-card-price">
                              <span>Monthly rent</span>
                              <strong>{formatPeso(property.monthly_rate)}</strong>
                              {property.rent_includes && <small>{property.rent_includes}</small>}
                            </div>
                          </div>

                          {property.description && (
                            <p className="property-card-description">{property.description}</p>
                          )}

                          <div className="property-card-meta">
                            {Number(property.bedrooms) > 0 && <span>{property.bedrooms} Bedroom{Number(property.bedrooms) === 1 ? '' : 's'}</span>}
                            {property.furnishing && <span>{property.furnishing}</span>}
                            {property.available_on && <span>{statusLabel(property)}</span>}
                          </div>

                          <div className="property-card-actions">
                            <button type="button" className="property-view-button" onClick={() => openProperty(property)}>View unit <span>↗</span></button>
                            <button type="button" className="property-inquire-button" onClick={() => inquire(property)}>Inquire now <span aria-hidden="true">↗</span></button>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      )}

      {activeProperty && (
        <div className="property-detail-modal" role="dialog" aria-modal="true" aria-label={`${activeProperty.name} details`} onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveProperty(null)
        }}>
          <div className="property-detail-shell">
            <div className="property-detail-mobile-actions">
              <button className="property-detail-back" type="button" onClick={backToAvailableUnits}>
                <span aria-hidden="true">←</span> Back to Available Units
              </button>
              <button className="property-detail-close" type="button" onClick={() => setActiveProperty(null)} aria-label="Close property details">×</button>
            </div>

            <div className="property-detail-gallery">
              <div className="property-detail-main-image">
                <img
                  src={activeProperty.images?.[activeImage]?.image_url || getFallbackImage(activeProperty)}
                  alt={activeProperty.images?.[activeImage]?.alt_text || activeProperty.name}
                />
                {activeProperty.images?.length > 1 && (
                  <>
                    <button type="button" className="property-detail-arrow previous" onClick={() => setActiveImage((current) => (current - 1 + activeProperty.images.length) % activeProperty.images.length)}>‹</button>
                    <button type="button" className="property-detail-arrow next" onClick={() => setActiveImage((current) => (current + 1) % activeProperty.images.length)}>›</button>
                  </>
                )}
                <span className="property-detail-image-counter">
                  {activeProperty.images?.length ? `${activeImage + 1} / ${activeProperty.images.length}` : 'Community view'}
                </span>
              </div>

              {activeProperty.images?.length > 1 && (
                <div className="property-detail-thumbs">
                  {activeProperty.images.map((image, index) => (
                    <button key={image.id || image.image_url} type="button" className={index === activeImage ? 'active' : ''} onClick={() => setActiveImage(index)}>
                      <img src={image.image_url} alt={image.alt_text || `${activeProperty.name} photo ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="property-detail-content">
              <div className="property-detail-kicker"><span /> {activeProperty.status === 'Available' ? 'AVAILABLE RENTAL' : 'UPCOMING AVAILABILITY'}</div>
              <div className="property-detail-development">{getDevelopmentName(activeProperty)}</div>
              <h2>{activeProperty.name}</h2>
              <p className="property-detail-location">{activeProperty.full_address || activeProperty.location}</p>

              <div className="property-detail-price">
                <span>Monthly rent</span>
                <strong>{formatPeso(activeProperty.monthly_rate)}</strong>
                {activeProperty.rent_includes && <small>{activeProperty.rent_includes}</small>}
              </div>

              <div className="property-detail-facts">
                <div><span>Status</span><strong>{statusLabel(activeProperty)}</strong></div>
                {activeProperty.building_name && <div><span>Building</span><strong>{activeProperty.building_name}</strong></div>}
                {activeProperty.floor_label && <div><span>Floor</span><strong>{activeProperty.floor_label}</strong></div>}
                {Number(activeProperty.bedrooms) > 0 && <div><span>Bedrooms</span><strong>{activeProperty.bedrooms}</strong></div>}
                {activeProperty.furnishing && <div><span>Furnishing</span><strong>{activeProperty.furnishing}</strong></div>}
                {activeProperty.lease_term && <div><span>Minimum term</span><strong>{activeProperty.lease_term}</strong></div>}
              </div>

              {activeProperty.description && <p className="property-detail-description">{activeProperty.description}</p>}
              {activeProperty.utility_notes && <div className="property-detail-note-box"><span>Utilities / fixtures</span><p>{activeProperty.utility_notes}</p></div>}

              {parseAmenities(activeProperty.amenities).length > 0 && (
                <div className="property-detail-amenities">
                  <span>Highlights & amenities</span>
                  <div>{parseAmenities(activeProperty.amenities).map((item) => <b key={item}>{item}</b>)}</div>
                </div>
              )}

              {activeProperty.map_url && (
                <a className="property-detail-map" href={activeProperty.map_url} target="_blank" rel="noreferrer">
                  <span>Open in Google Maps</span><b>↗</b>
                </a>
              )}

              <button className="btn btn-gold btn-full property-detail-inquire" type="button" onClick={() => inquire(activeProperty)}>Inquire about this unit <span>↗</span></button>
              <small className="property-detail-note">Availability and rental terms are subject to confirmation by J3C Rental Properties.</small>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
