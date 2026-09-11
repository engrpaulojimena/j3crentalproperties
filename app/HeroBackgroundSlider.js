'use client'

import { useEffect, useState } from 'react'

const slides = [
  { src: '/photos/hero/01-fini-entrance.webp', alt: 'Fini Homes community entrance' },
  { src: '/photos/hero/02-chateau-buildings.webp', alt: 'Chateau Valenzuela residential buildings' },
  { src: '/photos/hero/03-chateau-basketball.webp', alt: 'Chateau Valenzuela basketball court and clubhouse' },
  { src: '/photos/hero/04-chateau-pool-garden.webp', alt: 'Chateau Valenzuela pool and landscaped area' },
  { src: '/photos/hero/05-chateau-pool.webp', alt: 'Chateau Valenzuela swimming pool' },
  { src: '/photos/hero/06-chateau-clubhouse.webp', alt: 'Chateau Valenzuela clubhouse' },
]

export default function HeroBackgroundSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches || slides.length <= 1) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="hero-background-slider" aria-hidden="true">
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          className={`hero-background-slide ${index === activeIndex ? 'active' : ''}`}
          src={slide.src}
          alt=""
          loading={index === 0 ? 'eager' : undefined}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
        />
      ))}
    </div>
  )
}
