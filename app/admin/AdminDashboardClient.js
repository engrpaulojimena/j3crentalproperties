'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './AdminDashboard.module.css'

const STORAGE_KEY = 'j3c-admin-units-preview'

const seedUnits = [
  {
    id: 'u1',
    unit_code: '1',
    development_name: 'Fini Homes Condominium',
    building_name: '',
    floor_label: '3rd Floor',
    name: '2 Bedroom Unit - 3rd Floor',
    location: 'Marulas, Valenzuela City',
    full_address: '80 Ramon Delfin Street, Barangay Marulas, Valenzuela City, 1440 Metro Manila',
    rate: '18000',
    status: 'Available Soon',
    available_on: '2026-10-25',
    property_type: 'Condominium',
    bedrooms: '2',
    bathrooms: '1',
    furnishing: 'Fully Furnished',
    utility_notes: 'Window-type aircon in each room. Beddings are not available.',
    description: 'Fully furnished 2BR condo unit in a gated, quiet, and peaceful community.',
    rent_includes: 'Condo dues included',
    lease_term: 'Minimum 1 year contract',
    map_url: 'https://maps.app.goo.gl/brh4UNvehwBPC4qc9',
    amenities: 'Gated subdivision with 24-hour security, Aircon in each room (window type), Swimming pool, Clubhouse, Pay parking space for rent, Fully furnished, Near OLFU School and Hospital, 3–5 minutes from Monumento LRT',
    images: [
      { id: 'local-1', image_url: '/photos/unit-1/dining.jpg', alt_text: 'Dining area and kitchen', is_cover: 1 },
      { id: 'local-2', image_url: '/photos/unit-1/living-room-02.jpg', alt_text: 'Living room', is_cover: 0 },
      { id: 'local-3', image_url: '/photos/unit-1/living-room-01.jpg', alt_text: 'Living room and hallway', is_cover: 0 },
      { id: 'local-4', image_url: '/photos/unit-1/kitchen.jpg', alt_text: 'Kitchen', is_cover: 0 },
      { id: 'local-5', image_url: '/photos/unit-1/bedroom-bunk.jpg', alt_text: 'Bedroom with bunk bed', is_cover: 0 },
      { id: 'local-6', image_url: '/photos/unit-1/bedroom-empty.jpg', alt_text: 'Second bedroom', is_cover: 0 },
      { id: 'local-7', image_url: '/photos/unit-1/bathroom.jpg', alt_text: 'Bathroom', is_cover: 0 },
      { id: 'local-8', image_url: '/photos/unit-1/shower.jpg', alt_text: 'Shower area', is_cover: 0 },
    ],
  },
  {
    id: 'u2',
    unit_code: '2',
    development_name: 'Chateau Valenzuela',
    building_name: 'Janina Bldg.',
    floor_label: '3rd Floor',
    name: '2 Bedroom Unit - Janina Bldg.',
    location: 'Lingunan, Valenzuela City',
    full_address: '16 P. Gregorio Street, Brgy. Lingunan, Valenzuela City, 1446 Metro Manila',
    rate: '10000',
    status: 'Occupied',
    available_on: '2027-02-16',
    property_type: 'Condominium',
    bedrooms: '2',
    bathrooms: '1',
    furnishing: 'Semi Furnished',
    utility_notes: 'Own electric and water meter. Includes 1 window-type aircon.',
    description: 'Semi-furnished 2BR condominium unit in a secured, peaceful, and quiet community.',
    rent_includes: 'Condo dues included',
    lease_term: '1 Year Contract',
    map_url: '',
    amenities: 'Roof Deck, Laundry Cage, Swimming Pool, Basketball Court, Playground, Club House, Parking Area For Rent, 24-hour security, Easy access from NLEX, Near Lingunan Barangay Hall 3S Center, Walking distance to schools, drugstore, market, convenience store and other establishments, One ride to Dalandanan and Paso de Blas (VGC Terminal)',
    images: [],
  },
]

const emptyForm = {
  unit_code: '',
  development_name: '',
  building_name: '',
  floor_label: '',
  name: '',
  location: '',
  full_address: '',
  rate: '',
  status: 'Available',
  available_on: '',
  property_type: 'Condominium',
  bedrooms: '',
  bathrooms: '',
  furnishing: '',
  utility_notes: '',
  description: '',
  rent_includes: '',
  lease_term: '',
  map_url: '',
  amenities: '',
  slug: '',
  is_featured: 0,
}

function formatPeso(value) {
  const amount = Number(value || 0)
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function normalizeLookupKey(value) {
  return String(value || '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function cleanLookupValue(value) {
  return String(value || '').trim().replace(/\s+/g, ' ')
}

function canonicalizeLookup(value, options) {
  const cleaned = cleanLookupValue(value)
  if (!cleaned) return ''
  const key = normalizeLookupKey(cleaned)
  return options.find((option) => normalizeLookupKey(option) === key) || cleaned
}

function fallbackImage(unit) {
  return unit?.development_name === 'Chateau Valenzuela' ? '/photos/chateau/buildings.jpg' : '/photos/fini-building.jpg'
}

function normalizeProperty(property) {
  return {
    id: property.id,
    unit_code: property.unit_code || '',
    development_name: property.development_name || '',
    building_name: property.building_name || '',
    floor_label: property.floor_label || '',
    name: property.name,
    location: property.location,
    full_address: property.full_address || '',
    rate: String(property.monthly_rate ?? property.rate ?? ''),
    status: property.status || 'Available',
    available_on: property.available_on || '',
    property_type: property.property_type || 'Condominium',
    bedrooms: String(property.bedrooms || ''),
    bathrooms: String(property.bathrooms || ''),
    furnishing: property.furnishing || '',
    utility_notes: property.utility_notes || '',
    description: property.description || '',
    rent_includes: property.rent_includes || '',
    lease_term: property.lease_term || '',
    map_url: property.map_url || '',
    amenities: property.amenities || '',
    slug: property.slug || '',
    is_featured: Number(property.is_featured || 0),
    images: Array.isArray(property.images) ? property.images : [],
    development_images: Array.isArray(property.development_images) ? property.development_images : [],
  }
}

export default function AdminDashboardClient() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [email, setEmail] = useState('')
  const [units, setUnits] = useState([])
  const [backendMode, setBackendMode] = useState('loading')
  const [statusMessage, setStatusMessage] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState('units')
  const [locationPhotoBusy, setLocationPhotoBusy] = useState('')
  const [activeLookup, setActiveLookup] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('j3c-admin-preview') !== 'active') {
      router.replace('/adminlogin')
      return
    }

    setEmail(sessionStorage.getItem('j3c-admin-email') || 'admin@j3crentalproperties.com')
    loadUnits()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  async function loadUnits() {
    setStatusMessage('')
    try {
      const response = await fetch('/api/properties', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to load cloud data.')
      setUnits((data.properties || []).map(normalizeProperty))
      setBackendMode('cloud')
    } catch {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        setUnits(stored ? JSON.parse(stored) : seedUnits)
      } catch {
        setUnits(seedUnits)
      }
      setBackendMode('demo')
    }
    setReady(true)
  }

  useEffect(() => {
    if (!ready || backendMode !== 'demo') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(units))
  }, [ready, backendMode, units])

  const stats = useMemo(() => {
    const available = units.filter((unit) => ['Available', 'Available Soon'].includes(unit.status)).length
    const occupied = units.filter((unit) => unit.status === 'Occupied').length
    return { total: units.length, available, occupied }
  }, [units])

  const developmentOptions = useMemo(() => {
    const seen = new Map()
    for (const unit of units) {
      const value = cleanLookupValue(unit.development_name)
      const key = normalizeLookupKey(value)
      if (value && key && !seen.has(key)) seen.set(key, value)
    }
    return [...seen.values()].sort((a, b) => a.localeCompare(b))
  }, [units])

  const locationOptions = useMemo(() => {
    const seen = new Map()
    for (const unit of units) {
      const value = cleanLookupValue(unit.location)
      const key = normalizeLookupKey(value)
      if (value && key && !seen.has(key)) seen.set(key, value)
    }
    return [...seen.values()].sort((a, b) => a.localeCompare(b))
  }, [units])

  const developmentOptionsForForm = useMemo(() => {
    const selectedLocationKey = normalizeLookupKey(form.location)
    if (!selectedLocationKey) return developmentOptions

    const matched = []
    const matchedKeys = new Set()

    for (const unit of units) {
      if (normalizeLookupKey(unit.location) !== selectedLocationKey) continue
      const development = cleanLookupValue(unit.development_name)
      const key = normalizeLookupKey(development)
      if (development && key && !matchedKeys.has(key)) {
        matchedKeys.add(key)
        matched.push(development)
      }
    }

    return matched.length ? matched.sort((a, b) => a.localeCompare(b)) : developmentOptions
  }, [developmentOptions, form.location, units])

  const developmentsAtSelectedLocation = useMemo(() => {
    const selectedLocationKey = normalizeLookupKey(form.location)
    if (!selectedLocationKey) return []
    const seen = new Map()
    for (const unit of units) {
      if (normalizeLookupKey(unit.location) !== selectedLocationKey) continue
      const development = cleanLookupValue(unit.development_name)
      const key = normalizeLookupKey(development)
      if (development && key && !seen.has(key)) seen.set(key, development)
    }
    return [...seen.values()].sort((a, b) => a.localeCompare(b))
  }, [form.location, units])


  const developmentGroups = useMemo(() => {
    const groups = new Map()
    for (const unit of units) {
      const name = cleanLookupValue(unit.development_name || unit.location || 'J3C Rental Property')
      if (!groups.has(name)) {
        groups.set(name, {
          name,
          location: unit.location || '',
          full_address: unit.full_address || '',
          units: [],
          images: Array.isArray(unit.development_images) ? unit.development_images : [],
        })
      }
      const group = groups.get(name)
      group.units.push(unit)
      if (!group.location && unit.location) group.location = unit.location
      if (!group.full_address && unit.full_address) group.full_address = unit.full_address
      if ((!group.images || group.images.length === 0) && Array.isArray(unit.development_images) && unit.development_images.length) {
        group.images = unit.development_images
      }
    }
    return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name))
  }, [units])

  function logout() {
    sessionStorage.removeItem('j3c-admin-preview')
    sessionStorage.removeItem('j3c-admin-email')
    router.replace('/adminlogin')
  }

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setSelectedFiles([])
    setStatusMessage('')
    setActiveLookup('')
    setModalOpen(true)
  }

  function openEdit(unit) {
    setEditingId(unit.id)
    setForm({
      unit_code: unit.unit_code || '',
      development_name: unit.development_name || '',
      building_name: unit.building_name || '',
      floor_label: unit.floor_label || '',
      name: unit.name,
      location: unit.location,
      full_address: unit.full_address || '',
      rate: unit.rate,
      status: unit.status,
      available_on: unit.available_on || '',
      property_type: unit.property_type || 'Condominium',
      bedrooms: unit.bedrooms || '',
      bathrooms: unit.bathrooms || '',
      furnishing: unit.furnishing || '',
      utility_notes: unit.utility_notes || '',
      description: unit.description || '',
      rent_includes: unit.rent_includes || '',
      lease_term: unit.lease_term || '',
      map_url: unit.map_url || '',
      amenities: unit.amenities || '',
      slug: unit.slug || '',
      is_featured: Number(unit.is_featured || 0),
    })
    setSelectedFiles([])
    setStatusMessage('')
    setActiveLookup('')
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm)
    setSelectedFiles([])
    setActiveLookup('')
  }

  function selectLookupValue(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
    setActiveLookup('')
  }

  function handleLookupBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) setActiveLookup('')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleFiles(event) {
    setSelectedFiles(Array.from(event.target.files || []))
  }

  async function uploadCloudinaryFile(file) {
    const signResponse = await fetch('/api/cloudinary/sign', { method: 'POST' })
    const signData = await signResponse.json()
    if (!signResponse.ok) throw new Error('Cloudinary is not configured yet.')

    const body = new FormData()
    body.append('file', file)
    body.append('api_key', signData.apiKey)
    body.append('timestamp', String(signData.timestamp))
    body.append('signature', signData.signature)
    body.append('upload_preset', signData.uploadPreset)

    const cloudResponse = await fetch(`https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`, {
      method: 'POST',
      body,
    })
    const cloudData = await cloudResponse.json()
    if (!cloudResponse.ok) throw new Error(cloudData.error?.message || 'Image upload failed.')
    return cloudData
  }

  async function uploadOneImage(file, propertyId, isCover) {
    const cloudData = await uploadCloudinaryFile(file)

    const saveResponse = await fetch(`/api/properties/${propertyId}/images`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        image_key: cloudData.public_id,
        image_url: cloudData.secure_url,
        alt_text: form.name,
        sort_order: 0,
        is_cover: isCover,
      }),
    })
    const saveData = await saveResponse.json()
    if (!saveResponse.ok) throw new Error(saveData.error || 'Could not save image record.')
  }

  async function uploadDevelopmentPhotos(developmentName, files, existingImages = []) {
    const chosen = Array.from(files || [])
    if (!chosen.length || backendMode !== 'cloud') return

    setLocationPhotoBusy(developmentName)
    setStatusMessage('')
    try {
      for (let index = 0; index < chosen.length; index += 1) {
        const cloudData = await uploadCloudinaryFile(chosen[index])
        const saveResponse = await fetch('/api/development-images', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            development_name: developmentName,
            image_key: cloudData.public_id,
            image_url: cloudData.secure_url,
            alt_text: `${developmentName} location photo`,
            sort_order: existingImages.length + index,
            is_cover: existingImages.length === 0 && index === 0,
          }),
        })
        const saveData = await saveResponse.json()
        if (!saveResponse.ok) throw new Error(saveData.error || 'Could not save location photo.')
      }
      await loadUnits()
      setStatusMessage(`${developmentName} location photos updated.`)
    } catch (error) {
      setStatusMessage(error.message || 'Location photo upload failed.')
    } finally {
      setLocationPhotoBusy('')
    }
  }

  async function deleteDevelopmentImage(imageId, developmentName) {
    if (backendMode !== 'cloud') return
    const ok = window.confirm(`Remove this ${developmentName} location photo?`)
    if (!ok) return

    setLocationPhotoBusy(developmentName)
    setStatusMessage('')
    try {
      const response = await fetch(`/api/development-images/${imageId}`, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not remove location photo.')
      await loadUnits()
      setStatusMessage(`${developmentName} location photo removed.`)
    } catch (error) {
      setStatusMessage(error.message || 'Location photo delete failed.')
    } finally {
      setLocationPhotoBusy('')
    }
  }

  async function saveUnit(event) {
    event.preventDefault()
    const canonicalDevelopment = canonicalizeLookup(form.development_name, developmentOptions)
    const canonicalLocation = canonicalizeLookup(form.location, locationOptions)

    const payload = {
      unit_code: form.unit_code.trim(),
      development_name: canonicalDevelopment,
      building_name: form.building_name.trim(),
      floor_label: form.floor_label.trim(),
      name: form.name.trim(),
      location: canonicalLocation,
      full_address: form.full_address.trim(),
      monthly_rate: Number(String(form.rate).replace(/[^0-9.]/g, '')),
      status: form.status,
      available_on: form.available_on || null,
      property_type: form.property_type.trim() || 'Condominium',
      bedrooms: Number(form.bedrooms || 0),
      bathrooms: Number(form.bathrooms || 0),
      furnishing: form.furnishing.trim(),
      utility_notes: form.utility_notes.trim(),
      description: form.description.trim(),
      rent_includes: form.rent_includes.trim(),
      lease_term: form.lease_term.trim(),
      map_url: form.map_url.trim(),
      amenities: form.amenities.trim(),
      slug: form.slug || '',
      is_featured: Number(form.is_featured || 0),
    }

    if (!payload.development_name || !payload.name || !payload.location || !payload.monthly_rate) {
      setStatusMessage('Property/development, unit name, location, and monthly rate are required.')
      return
    }
    setSaving(true)
    setStatusMessage('')

    try {
      if (backendMode === 'cloud') {
        const url = editingId ? `/api/properties/${editingId}` : '/api/properties'
        const response = await fetch(url, {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Could not save unit.')
        const savedProperty = data.property

        for (let index = 0; index < selectedFiles.length; index += 1) {
          const currentImages = savedProperty.images || []
          const shouldBeCover = currentImages.length === 0 && index === 0
          await uploadOneImage(selectedFiles[index], savedProperty.id, shouldBeCover)
        }

        await loadUnits()
      } else {
        const localPayload = {
          ...form,
          development_name: canonicalDevelopment,
          location: canonicalLocation,
          rate: String(form.rate).replace(/[^0-9]/g, ''),
          description: form.description.trim(),
        }
        if (editingId) {
          setUnits((current) => current.map((unit) => unit.id === editingId ? { ...unit, ...localPayload } : unit))
        } else {
          setUnits((current) => [{ id: `unit-${Date.now()}`, ...localPayload, images: [] }, ...current])
        }
      }

      closeModal()
      setStatusMessage(editingId ? 'Unit details updated successfully.' : 'Unit added successfully.')
    } catch (error) {
      setStatusMessage(error.message || 'Something went wrong while saving.')
    } finally {
      setSaving(false)
    }
  }

  async function deleteUnit(unit) {
    const ok = window.confirm(`Delete “${unit.name}”?`)
    if (!ok) return
    setStatusMessage('')

    try {
      if (backendMode === 'cloud') {
        const response = await fetch(`/api/properties/${unit.id}`, { method: 'DELETE' })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Could not delete unit.')
        await loadUnits()
      } else {
        setUnits((current) => current.filter((item) => item.id !== unit.id))
      }
    } catch (error) {
      setStatusMessage(error.message || 'Delete failed.')
    }
  }

  async function deleteImage(imageId) {
    if (backendMode !== 'cloud') return
    const ok = window.confirm('Remove this photo?')
    if (!ok) return

    try {
      const response = await fetch(`/api/property-images/${imageId}`, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not remove image.')
      await loadUnits()
    } catch (error) {
      setStatusMessage(error.message || 'Image delete failed.')
    }
  }

  if (!ready) return <main className={styles.loading}>Checking access…</main>

  const editingUnit = editingId ? units.find((unit) => String(unit.id) === String(editingId)) : null

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <img src="/j3c-logo.jpg" alt="J3C Rental Properties" />
          <div><strong>J3C</strong><span>Owner Console</span></div>
        </div>
        <div className={styles.navLabel}>Management</div>
        <nav className={styles.nav} aria-label="Admin navigation">
          <button className={activeSection === 'units' ? styles.active : ''} type="button" onClick={() => setActiveSection('units')}><span>▦</span>Units</button>
          <button className={activeSection === 'locations' ? styles.active : ''} type="button" onClick={() => setActiveSection('locations')}><span>▧</span>Location photos</button>
        </nav>
        <div className={styles.sidebarBottom}>
          <span>Signed in as</span><strong>{email}</strong><button onClick={logout}>Sign out</button>
        </div>
      </aside>

      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <p>OWNER / ADMIN</p>
            <h1>{activeSection === 'units' ? 'Rental units' : 'Location photos'}</h1>
            <span>{activeSection === 'units' ? 'Add, edit, delete, and upload unit photos.' : 'Manage the photos shown on each property/location card on the public website.'}</span>
          </div>
          {activeSection === 'units' && <button className={styles.addButton} onClick={openAdd}>+ Add unit</button>}
        </header>

        <div className={`${styles.backendBadge} ${backendMode === 'cloud' ? styles.backendCloud : styles.backendDemo}`}>
          <strong>{backendMode === 'cloud' ? 'Cloud database connected' : 'Demo mode'}</strong>
          <span>{backendMode === 'cloud' ? 'Changes are saved to Cloudflare D1. Photos upload to Cloudinary.' : 'Cloud integration is not configured yet, so changes stay in this browser.'}</span>
        </div>

        {statusMessage && <div className={styles.errorBanner}>{statusMessage}</div>}

        {activeSection === 'units' ? (
          <>
            <section className={styles.stats} aria-label="Unit summary">
              <article><span>Total units</span><strong>{stats.total}</strong></article>
              <article><span>Available</span><strong>{stats.available}</strong></article>
              <article><span>Occupied</span><strong>{stats.occupied}</strong></article>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHead}>
                <div><p>PROPERTY LIST</p><h2>Manage units</h2></div>
                <span>{units.length} {units.length === 1 ? 'unit' : 'units'}</span>
              </div>

              {units.length === 0 ? (
                <div className={styles.emptyState}>
                  <div>＋</div><h3>No units yet</h3><p>Add the first rental unit to start building the property list.</p><button onClick={openAdd}>Add first unit</button>
                </div>
              ) : (
                <div className={styles.unitList}>
                  {units.map((unit) => {
                    const cover = unit.images?.find((image) => image.is_cover) || unit.images?.[0]
                    return (
                      <article className={styles.unitCard} key={unit.id}>
                        <div className={styles.thumb}>
                          <img src={cover?.image_url || fallbackImage(unit)} alt={unit.name} />
                          {!cover && <span>No uploaded photo yet</span>}
                        </div>
                        <div className={styles.unitInfo}>
                          <div className={styles.unitTopLine}>
                            <h3>{unit.name}</h3>
                            <span className={unit.status === 'Occupied' ? styles.occupied : unit.status === 'Available Soon' ? styles.soon : styles.available}>{unit.status}</span>
                          </div>
                          <p>{unit.development_name ? `${unit.development_name} • ` : ''}{unit.location}{unit.available_on ? ` • ${unit.status === 'Occupied' ? 'Available ' : unit.status === 'Available Soon' ? 'Available ' : ''}${unit.available_on}` : ''}</p>
                          <strong>{formatPeso(unit.rate)} <small>/ month</small></strong>
                          {unit.description && <small className={styles.description}>{unit.description}</small>}
                          {unit.images?.length > 0 && <small className={styles.photoCount}>{unit.images.length} photo{unit.images.length > 1 ? 's' : ''}</small>}
                        </div>
                        <div className={styles.rowActions}>
                          <button type="button" onClick={() => openEdit(unit)}>Edit</button>
                          <button type="button" className={styles.deleteButton} onClick={() => deleteUnit(unit)}>Delete</button>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </section>
          </>
        ) : (
          <section className={styles.panel}>
            <div className={styles.panelHead}>
              <div><p>PUBLIC LOCATION GALLERIES</p><h2>Manage location photos</h2></div>
              <span>{developmentGroups.length} {developmentGroups.length === 1 ? 'location' : 'locations'}</span>
            </div>

            <div className={styles.locationPhotoList}>
              {developmentGroups.map((group) => {
                const isBusy = locationPhotoBusy === group.name
                const fallback = fallbackImage(group.units[0])
                return (
                  <article className={styles.locationPhotoCard} key={group.name}>
                    <div className={styles.locationPhotoHead}>
                      <div>
                        <p>{group.location || 'Property location'}</p>
                        <h3>{group.name}</h3>
                        {group.full_address && <span>{group.full_address}</span>}
                      </div>
                      <label className={`${styles.locationUploadButton} ${isBusy ? styles.busyButton : ''}`}>
                        {isBusy ? 'Uploading…' : '+ Add photos'}
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          disabled={backendMode !== 'cloud' || isBusy}
                          onChange={(event) => {
                            uploadDevelopmentPhotos(group.name, event.target.files, group.images || [])
                            event.target.value = ''
                          }}
                        />
                      </label>
                    </div>

                    {group.images?.length ? (
                      <div className={styles.locationPhotoGrid}>
                        {group.images.map((image, index) => (
                          <figure key={image.id}>
                            <img src={image.image_url} alt={image.alt_text || `${group.name} location photo`} />
                            <figcaption>{image.is_cover ? 'Cover photo' : `Photo ${index + 1}`}</figcaption>
                            <button type="button" aria-label="Remove photo" disabled={isBusy} onClick={() => deleteDevelopmentImage(image.id, group.name)}>×</button>
                          </figure>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.locationFallback}>
                        <img src={fallback} alt={`${group.name} current fallback`} />
                        <div>
                          <strong>Using automatic fallback photos</strong>
                          <span>Upload photos here to replace the pictures shown on the public {group.name} location card. These are separate from individual unit photos.</span>
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </section>
        )}
      </section>

      {modalOpen && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeModal()
        }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="unit-form-title">
            <div className={styles.modalHead}>
              <div><p>{editingId ? 'EDIT UNIT' : 'NEW UNIT'}</p><h2 id="unit-form-title">{editingId ? 'Update rental unit' : 'Add rental unit'}</h2></div>
              <button type="button" className={styles.closeButton} onClick={closeModal} aria-label="Close">×</button>
            </div>

            <form className={styles.form} onSubmit={saveUnit}>
              <div className={styles.formGrid}>
                <div className={styles.lookupField} onBlur={handleLookupBlur}>
                  <span className={styles.labelRow}><span>Development / property</span><small>{developmentsAtSelectedLocation.length ? `${developmentsAtSelectedLocation.length} existing at this location` : 'Select existing or type a new one'}</small></span>
                  <div className={styles.lookupControl}>
                    <input
                      name="development_name"
                      value={form.development_name}
                      onChange={handleChange}
                      onFocus={() => setActiveLookup('development_name')}
                      placeholder="Search or type property name"
                      autoComplete="off"
                      required
                    />
                    <button
                      type="button"
                      className={styles.lookupToggle}
                      onClick={() => setActiveLookup((current) => current === 'development_name' ? '' : 'development_name')}
                      aria-label="Show existing properties"
                      aria-expanded={activeLookup === 'development_name'}
                    >⌄</button>
                    {activeLookup === 'development_name' && developmentOptionsForForm.length > 0 && (
                      <div className={styles.lookupMenu}>
                        {developmentOptionsForForm.map((option) => (
                          <button type="button" key={option} onMouseDown={(event) => event.preventDefault()} onClick={() => selectLookupValue('development_name', option)}>
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <label>Unit no.<input name="unit_code" value={form.unit_code} onChange={handleChange} placeholder="e.g. 1 or 306" /></label>
              </div>
              <div className={styles.formGrid}>
                <label>Building<input name="building_name" value={form.building_name} onChange={handleChange} placeholder="e.g. Janina Bldg." /></label>
                <label>Floor<input name="floor_label" value={form.floor_label} onChange={handleChange} placeholder="e.g. 3rd Floor" /></label>
              </div>
              <label>Unit name<input name="name" value={form.name} onChange={handleChange} placeholder="e.g. 2 Bedroom Unit - 3rd Floor" required /></label>
              <div className={styles.formGrid}>
                <div className={styles.lookupField} onBlur={handleLookupBlur}>
                  <span className={styles.labelRow}><span>Location</span><small>Select existing or type a new one</small></span>
                  <div className={styles.lookupControl}>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      onFocus={() => setActiveLookup('location')}
                      placeholder="Search or type a new location"
                      autoComplete="off"
                      required
                    />
                    <button
                      type="button"
                      className={styles.lookupToggle}
                      onClick={() => setActiveLookup((current) => current === 'location' ? '' : 'location')}
                      aria-label="Show existing locations"
                      aria-expanded={activeLookup === 'location'}
                    >⌄</button>
                    {activeLookup === 'location' && locationOptions.length > 0 && (
                      <div className={styles.lookupMenu}>
                        {locationOptions.map((option) => (
                          <button type="button" key={option} onMouseDown={(event) => event.preventDefault()} onClick={() => selectLookupValue('location', option)}>
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <label>Property type<input name="property_type" value={form.property_type} onChange={handleChange} placeholder="Condominium" /></label>
              </div>
              <label>Full address<input name="full_address" value={form.full_address} onChange={handleChange} placeholder="Complete property address" /></label>
              <div className={styles.formGrid}>
                <label>Monthly rate<div className={styles.moneyInput}><span>₱</span><input inputMode="numeric" name="rate" value={form.rate} onChange={handleChange} placeholder="18000" required /></div></label>
                <label>Status<select name="status" value={form.status} onChange={handleChange}><option>Available</option><option>Available Soon</option><option>Occupied</option></select></label>
              </div>
              <div className={styles.formGrid}>
                <label>Available on<input type="date" name="available_on" value={form.available_on} onChange={handleChange} /></label>
                <label>Minimum lease term<input name="lease_term" value={form.lease_term} onChange={handleChange} placeholder="e.g. Minimum 1 year contract" /></label>
              </div>
              <div className={styles.formGrid}>
                <label>Bedrooms<input inputMode="numeric" name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="2" /></label>
                <label>Bathrooms<input inputMode="numeric" name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="1" /></label>
              </div>
              <div className={styles.formGrid}>
                <label>Furnishing<input name="furnishing" value={form.furnishing} onChange={handleChange} placeholder="e.g. Fully Furnished" /></label>
                <label>Utilities / included fixtures<input name="utility_notes" value={form.utility_notes} onChange={handleChange} placeholder="e.g. Own meters, 1 aircon" /></label>
              </div>
              <label>Short description<textarea name="description" value={form.description} onChange={handleChange} placeholder="Short public description of the unit" rows="3" /></label>
              <label>Rent inclusions<input name="rent_includes" value={form.rent_includes} onChange={handleChange} placeholder="e.g. Condo dues included" /></label>
              <label>Highlights & amenities<textarea name="amenities" value={form.amenities} onChange={handleChange} placeholder="Separate items with commas" rows="4" /></label>
              <label>Google Maps link<input name="map_url" value={form.map_url} onChange={handleChange} placeholder="https://maps.app.goo.gl/..." /></label>

              {editingUnit?.images?.length > 0 && (
                <div className={styles.currentPhotos}>
                  <strong>Current photos</strong>
                  <div className={styles.currentPhotoGrid}>
                    {editingUnit.images.map((image) => (
                      <figure key={image.id}>
                        <img src={image.image_url} alt={image.alt_text || editingUnit.name} />
                        {backendMode === 'cloud' && <button type="button" onClick={() => deleteImage(image.id)}>×</button>}
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              <label className={styles.uploadBox}>
                <span className={styles.uploadIcon}>▧</span>
                <span><strong>Property photos</strong><small>{backendMode === 'cloud' ? 'Choose one or more JPG, PNG, or WebP images. They will upload to Cloudinary when you save.' : 'Photo upload activates after the cloud environment variables are configured.'}</small></span>
                <input type="file" accept="image/*" multiple onChange={handleFiles} disabled={backendMode !== 'cloud'} />
                <b>{selectedFiles.length ? `${selectedFiles.length} selected` : 'Choose photos'}</b>
              </label>

              {statusMessage && <div className={styles.formError}>{statusMessage}</div>}
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelButton} onClick={closeModal} disabled={saving}>Cancel</button>
                <button type="submit" className={styles.saveButton} disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Add unit'}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}
