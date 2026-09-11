'use client'

import { useEffect, useRef } from 'react'

const menuItems = [
  { href: '#about', label: 'About Us' },
  { href: '#locations', label: 'Locations' },
  { href: '#properties', label: 'Available Units' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#guidelines', label: 'FAQs & Guidelines' },
  { href: '#contact', label: 'Contact' },
]

export default function MobileMenu() {
  const detailsRef = useRef(null)

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false
  }

  useEffect(() => {
    function handlePointerDown(event) {
      const details = detailsRef.current
      if (details?.open && !details.contains(event.target)) closeMenu()
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') closeMenu()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <details className="mobile-menu" ref={detailsRef}>
      <summary aria-label="Open menu">Menu</summary>
      <div className="mobile-menu-panel">
        {menuItems.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
        ))}
      </div>
    </details>
  )
}
