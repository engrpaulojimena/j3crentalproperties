'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

export default function LocationImageSlider({ images = [], title = 'Property photos', interval = 3800 }) {
  const slides = useMemo(() => images.filter((item) => item?.src), [images])
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(null)

  useEffect(() => {
    setActiveIndex(0)
  }, [slides.length])

  useEffect(() => {
    if (paused || slides.length <= 1) return undefined
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, interval)
    return () => window.clearInterval(timer)
  }, [interval, paused, slides.length])

  if (slides.length === 0) return null

  function previousSlide() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
  }

  function nextSlide() {
    setActiveIndex((current) => (current + 1) % slides.length)
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches?.[0]?.clientX ?? null
    setPaused(true)
  }

  function handleTouchEnd(event) {
    const endX = event.changedTouches?.[0]?.clientX ?? null
    if (touchStartX.current === null || endX === null) {
      setPaused(false)
      return
    }

    const delta = endX - touchStartX.current
    if (Math.abs(delta) > 40) {
      if (delta > 0) previousSlide()
      else nextSlide()
    }

    touchStartX.current = null
    setPaused(false)
  }

  return (
    <div
      className="location-slider"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="location-slider-frame">
        {slides.map((image, index) => (
          <figure key={image.src} className={`location-slide ${index === activeIndex ? 'active' : ''}`} aria-hidden={index !== activeIndex}>
            <img src={image.src} alt={image.alt || image.label || title} />
            {image.label && <figcaption>{image.label}</figcaption>}
          </figure>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button type="button" className="location-slider-arrow previous" onClick={previousSlide} aria-label="Previous photo">
            ‹
          </button>
          <button type="button" className="location-slider-arrow next" onClick={nextSlide} aria-label="Next photo">
            ›
          </button>

          <div className="location-slider-dots" role="tablist" aria-label={`${title} slides`}>
            {slides.map((image, index) => (
              <button
                key={`${image.src}-dot`}
                type="button"
                className={index === activeIndex ? 'active' : ''}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-selected={index === activeIndex}
                role="tab"
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
