'use client'

import { useEffect, useState } from 'react'

export default function GalleryShowcase({ items }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const activeItem = activeIndex === null ? null : items[activeIndex]

  const close = () => setActiveIndex(null)
  const previous = () => setActiveIndex((current) => (current - 1 + items.length) % items.length)
  const next = () => setActiveIndex((current) => (current + 1) % items.length)

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex])

  return (
    <>
      <div className="gallery-grid" aria-label="Fini Homes property photo gallery">
        {items.map((item, index) => (
          <button
            className={`gallery-item gallery-button ${item.className}`}
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            data-reveal
            style={{ '--reveal-delay': `${index * 90}ms` }}
            aria-label={`Open ${item.label} photo`}
          >
            <img src={item.src} alt={`Fini Homes ${item.label.toLowerCase()}`} loading={index > 1 ? 'lazy' : 'eager'} />
            <span className="gallery-shine" aria-hidden="true" />
            <span className="gallery-view-label" aria-hidden="true">View photo</span>
            <span className="gallery-caption"><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong></span>
          </button>
        ))}
      </div>

      {activeItem && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${activeItem.label} photo viewer`} onMouseDown={(event) => {
          if (event.target === event.currentTarget) close()
        }}>
          <button className="lightbox-close" type="button" onClick={close} aria-label="Close photo viewer">×</button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={previous} aria-label="Previous photo">‹</button>

          <div className="lightbox-stage">
            <div className="lightbox-photo-wrap">
              <img key={activeItem.src} className="lightbox-photo" src={activeItem.src} alt={`Fini Homes ${activeItem.label.toLowerCase()}`} />
            </div>
            <div className="lightbox-meta">
              <span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
              <strong>{activeItem.label}</strong>
              <small>Fini Homes Condominium · Marulas, Valenzuela</small>
            </div>
          </div>

          <button className="lightbox-arrow lightbox-next" type="button" onClick={next} aria-label="Next photo">›</button>
        </div>
      )}
    </>
  )
}
