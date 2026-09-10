import GalleryShowcase from './GalleryShowcase'
import InquiryForm from './InquiryForm'
import MotionObserver from './MotionObserver'
import PublicProperties from './PublicProperties'
import LocationImageSlider from './LocationImageSlider'

const gallery = [
  { src: '/photos/unit-1/living-room-02.jpg', label: 'Fini Homes · Living Area', className: 'gallery-landscape' },
  { src: '/photos/unit-1/kitchen.jpg', label: 'Fini Homes · Kitchen', className: 'gallery-portrait' },
  { src: '/photos/chateau/main-gate.jpg', label: 'Chateau Valenzuela · Main Gate', className: 'gallery-landscape' },
  { src: '/photos/chateau/pool.jpg', label: 'Chateau Valenzuela · Swimming Pool', className: 'gallery-landscape' },
  { src: '/photos/unit-1/bedroom-bunk.jpg', label: 'Fini Homes · Bedroom', className: 'gallery-portrait' },
  { src: '/photos/chateau/basketball-court.jpg', label: 'Chateau Valenzuela · Basketball Court', className: 'gallery-landscape' },
]
const locationShowcase = {
  fini: [
    { src: '/photos/fini-building.jpg', label: 'Fini Homes Exterior', alt: 'Fini Homes Condominium exterior' },
    { src: '/photos/fini-dining.jpg', label: 'Dining Area', alt: 'Fini Homes dining area' },
    { src: '/photos/fini-living-02.jpg', label: 'Living Area', alt: 'Fini Homes living area' },
    { src: '/photos/fini-kitchen.jpg', label: 'Kitchen', alt: 'Fini Homes kitchen area' },
    { src: '/photos/fini-bedroom.jpg', label: 'Bedroom', alt: 'Fini Homes bedroom' },
    { src: '/photos/fini-bathroom-01.jpg', label: 'Bathroom', alt: 'Fini Homes bathroom' },
  ],
  chateau: [
    { src: '/photos/chateau/main-gate.jpg', label: 'Main Gate', alt: 'Chateau Valenzuela main gate' },
    { src: '/photos/chateau/buildings.jpg', label: 'Buildings', alt: 'Chateau Valenzuela buildings' },
    { src: '/photos/chateau/clubhouse.jpg', label: 'Clubhouse', alt: 'Chateau Valenzuela clubhouse' },
    { src: '/photos/chateau/pool.jpg', label: 'Swimming Pool', alt: 'Chateau Valenzuela swimming pool' },
    { src: '/photos/chateau/basketball-court.jpg', label: 'Basketball Court', alt: 'Chateau Valenzuela basketball court' },
    { src: '/photos/chateau/park.jpg', label: 'Park & Landscaped Area', alt: 'Chateau Valenzuela pool and landscaped area' },
  ],
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Logo({ compact = false }) {
  return (
    <img
      className={compact ? 'logo-image logo-image-compact' : 'logo-image'}
      src="/j3c-logo.jpg"
      alt="J3C Condominium Unit Rental logo"
    />
  )
}

export default function Home() {
  return (
    <main>
      <MotionObserver />

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="J3C Rental Properties home">
            <div className="logo-shell"><Logo compact /></div>
            <span className="brand-copy">
              <strong>J3C Rental Properties</strong>
              <small>Condominium Unit Rental · Valenzuela</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#properties">Available Units</a>
            <a href="#locations">Locations</a>
            <a href="#gallery">Gallery</a>
            <a href="#guidelines">FAQs & Guidelines</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="btn btn-navy desktop-cta" href="#contact">Inquire Now</a>

          <details className="mobile-menu">
            <summary aria-label="Open menu">Menu</summary>
            <div className="mobile-menu-panel">
              <a href="#properties">Available Units</a>
              <a href="#locations">Locations</a>
              <a href="#gallery">Gallery</a>
              <a href="#guidelines">FAQs & Guidelines</a>
              <a href="#contact">Contact</a>
              <a className="btn btn-gold" href="#contact">Inquire Now</a>
            </div>
          </details>
        </div>
      </header>

      <section className="hero" id="home">
        <img className="hero-bg" src="/photos/fini-building.jpg" alt="Fini Homes Condominium in Marulas, Valenzuela" fetchPriority="high" decoding="async" />
        <div className="hero-overlay" />
        <div className="hero-noise" />

        <div className="hero-container">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow eyebrow-light"><span /> J3C · VALENZUELA CITY</p>
            <h1>Find a space that<br /><em>feels like home.</em></h1>
            <p className="hero-lead">Explore J3C rental properties through real property photos, clear rental information, and a direct inquiry experience designed to make finding your next home simpler.</p>
            <div className="hero-actions">
              <a className="btn btn-gold" href="#properties">Browse Available Units <Arrow /></a>
              <a className="btn btn-glass" href="#contact">Inquire Now</a>
            </div>
          </div>

          <aside className="hero-property-card" data-reveal style={{ '--reveal-delay': '120ms' }}>
            <div className="hero-card-topline"><span>J3C Rental Collection</span><b>Live</b></div>
            <h2>Available homes<br />in one place.</h2>
            <p>Owner-managed rental listings</p>
            <div className="hero-card-divider" />
            <div className="hero-card-facts">
              <div><span>Listings</span><strong>Updated by J3C</strong></div>
              <div><span>Locations</span><strong>Multiple properties</strong></div>
              <div><span>Inquiries</span><strong>Direct to J3C</strong></div>
            </div>
            <a href="#properties" className="hero-card-link">Browse available units <Arrow /></a>
          </aside>
        </div>

        <div className="hero-bottom">
          <div className="hero-bottom-inner">
            <span>Actual J3C property photos</span>
            <span>Fini Homes · Chateau Valenzuela</span>
            <span>Direct rental inquiries</span>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="J3C rental information">
        <div className="section-container trust-inner">
          <p>Everything renters need, presented with clarity.</p>
          <div className="trust-points">
            <span>Property Details</span><i />
            <span>Rental Guidelines</span><i />
            <span>Direct Inquiry</span>
          </div>
        </div>
      </section>

      <section className="property-browser section-pad" id="properties">
        <div className="section-container">
          <div className="property-browser-heading" data-reveal>
            <div>
              <p className="eyebrow"><span /> AVAILABLE RENTALS</p>
              <h2>Find the unit that<br /><em>fits your next move.</em></h2>
            </div>
            <div className="property-browser-intro">
              <span>LIVE OWNER-MANAGED LISTINGS</span>
              <p>Units added or updated from the J3C owner dashboard appear here automatically. Rentals are grouped by property so visitors can compare units, availability, rates, and photos without a cluttered layout.</p>
            </div>
          </div>
          <PublicProperties />
        </div>
      </section>

      <section className="location-showcase section-pad" id="locations">
        <div className="section-container">
          <div className="section-heading location-showcase-heading" data-reveal>
            <div>
              <p className="eyebrow"><span /> J3C LOCATIONS</p>
              <h2>Two communities,<br /><em>one clear rental experience.</em></h2>
            </div>
            <p>Explore the neighborhoods where J3C currently manages rental units. Individual unit information stays in the live listings above, while shared community details are presented here once for a cleaner browsing experience.</p>
          </div>

          <div className="location-showcase-grid">
            <article className="location-property-card" data-reveal>
              <div className="location-property-media"><LocationImageSlider images={locationShowcase.fini} title="Fini Homes Condominium photos" /></div>
              <div className="location-property-copy">
                <span>MARULAS · VALENZUELA CITY</span>
                <h3>Fini Homes Condominium</h3>
                <p>80 Ramon Delfin Street, Barangay Marulas, Valenzuela City, 1440 Metro Manila</p>
                <div className="location-tags"><b>24-hr security</b><b>Swimming pool</b><b>Clubhouse</b><b>Near OLFU</b></div>
                <a href="https://maps.app.goo.gl/brh4UNvehwBPC4qc9" target="_blank" rel="noreferrer">Open location <Arrow /></a>
              </div>
            </article>

            <article className="location-property-card location-property-card-chateau" data-reveal style={{ '--reveal-delay': '100ms' }}>
              <div className="location-property-media"><LocationImageSlider images={locationShowcase.chateau} title="Chateau Valenzuela photos" /></div>
              <div className="location-property-copy">
                <span>LINGUNAN · VALENZUELA CITY</span>
                <h3>Chateau Valenzuela</h3>
                <p>16 P. Gregorio Street, Brgy. Lingunan, Valenzuela City, 1446 Metro Manila</p>
                <div className="location-tags"><b>5 J3C units</b><b>Pool</b><b>Basketball court</b><b>24-hr security</b></div>
                <a href="#properties">View Chateau units <Arrow /></a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="section-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> PROPERTY & COMMUNITY PHOTOS</p>
              <h2>See the spaces<br /><em>and surroundings.</em></h2>
            </div>
            <p>Actual J3C property and community photos are used throughout the website. Unit-specific photos remain attached to each listing, while shared amenity photos are shown at the property level.</p>
          </div>

          <GalleryShowcase items={gallery} />
        </div>
      </section>

      <section className="brand-story" id="services">
        <div className="brand-story-image" data-reveal>
          <img src="/photos/chateau/buildings.jpg" alt="Chateau Valenzuela community buildings" />
          <div className="brand-story-overlay" />
          <div className="brand-story-caption"><span>J3C Rental Properties</span><strong>Valenzuela City</strong></div>
        </div>

        <div className="brand-story-copy" data-reveal style={{ '--reveal-delay': '100ms' }}>
          <div className="story-logo"><Logo /></div>
          <p className="eyebrow eyebrow-light"><span /> THE J3C EXPERIENCE</p>
          <h2>Rental information,<br /><em>made easier.</em></h2>
          <p>Visitors can browse current and upcoming units, review real property photos, see rates and basic terms, then contact J3C directly for the next step.</p>

          <div className="services-list">
            <div><b>01</b><span><strong>Browse by Property</strong><small>Units are grouped by development so multiple J3C rentals stay organized.</small></span></div>
            <div><b>02</b><span><strong>Review Unit Details</strong><small>Rates, availability, furnishing, photos, and important rental information.</small></span></div>
            <div><b>03</b><span><strong>Inquire Directly</strong><small>Contact J3C through the website inquiry form or preferred messaging channel.</small></span></div>
          </div>
        </div>
      </section>

      <section className="info-hub section-pad" id="guidelines">
        <div className="section-container">
          <div className="info-hub-heading" data-reveal>
            <div>
              <p className="eyebrow"><span /> RENTAL INFORMATION HUB</p>
              <h2>Know what to expect<br /><em>before you inquire.</em></h2>
            </div>
            <p>This section replaces the tenant portal and will contain J3C&apos;s official FAQs, rental guidelines, requirements, rates and terms, plus location details. Draft placeholders are shown until final content is provided.</p>
          </div>

          <div className="info-hub-grid">
            <article className="info-card info-card-faq" data-reveal>
              <div className="info-card-number">01</div>
              <div className="info-card-kicker">Frequently Asked Questions</div>
              <h3>Quick answers for renters.</h3>
              <div className="faq-list">
                <details open>
                  <summary>How do I check if a unit is available?</summary>
                  <p>Availability may change. Use the inquiry section to contact J3C for the latest unit status.</p>
                </details>
                <details>
                  <summary>Where can I ask about rental rates?</summary>
                  <p>Current rates and payment terms will be confirmed by J3C through the website or direct inquiry channels.</p>
                </details>
                <details>
                  <summary>Can I ask to view the property?</summary>
                  <p>Yes. Send an inquiry and J3C can provide the next steps based on the property&apos;s availability.</p>
                </details>
              </div>
            </article>

            <article className="info-card" data-reveal style={{ '--reveal-delay': '80ms' }}>
              <div className="info-card-number">02</div>
              <div className="info-card-kicker">Guidelines & Requirements</div>
              <h3>Everything needed before renting.</h3>
              <ul className="info-checklist">
                <li><span>Rental requirements</span><small>Official document checklist to be supplied by J3C.</small></li>
                <li><span>Rental guidelines</span><small>Property rules, occupancy guidance, and renter responsibilities.</small></li>
                <li><span>Move-in information</span><small>Process and required steps will be added once confirmed.</small></li>
              </ul>
              <div className="draft-chip">Content for client confirmation</div>
            </article>

            <article className="info-card info-card-accent" data-reveal style={{ '--reveal-delay': '160ms' }}>
              <div className="info-card-number">03</div>
              <div className="info-card-kicker">Rates & Terms / Pricing</div>
              <h3>Clear costs. Clear expectations.</h3>
              <div className="rate-preview">
                <span>Current rental rate</span>
                <strong>Available upon inquiry</strong>
                <small>Final monthly rates, deposits, advance payments, lease terms, and applicable fees will be published after J3C confirmation.</small>
              </div>
              <a href="#contact" className="info-card-link">Ask about current rates <Arrow /></a>
            </article>

            <article className="info-card info-card-location" data-reveal style={{ '--reveal-delay': '240ms' }}>
              <div className="info-card-number">04</div>
              <div className="info-card-kicker">Location / How to Get There</div>
              <h3>J3C Locations</h3>
              <p className="location-copy">Fini Homes · Marulas & Chateau Valenzuela · Lingunan</p>
              <div className="location-visual" aria-hidden="true">
                <span className="map-road map-road-a" />
                <span className="map-road map-road-b" />
                <span className="map-road map-road-c" />
                <span className="map-pin">J3C</span>
              </div>
              <a className="info-card-link" href="#locations">View property locations <Arrow /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-image">
          <img src="/photos/fini-building.jpg" alt="Fini Homes Condominium exterior" />
          <div className="contact-overlay" />
          <div className="contact-message" data-reveal>
            <p>GET IN TOUCH</p>
            <h2>Questions about<br /><em>a property?</em></h2>
            <span className="contact-message-sub">J3C is one message away.</span>
          </div>
        </div>

        <div className="contact-panel" data-reveal>
          <p className="eyebrow eyebrow-light"><span /> INQUIRE NOW / CONTACT US</p>
          <h2>Start with<br />a simple inquiry.</h2>
          <p>Choose your preferred contact channel or leave your name, number, and question through the inquiry form below.</p>

          <div className="contact-channels" aria-label="Direct contact options">
            <a href="#inquiry-form" className="contact-channel channel-viber" aria-label="Contact J3C through Viber">
              <span className="channel-brand-icon" aria-hidden="true">
                <img src="https://cdn.simpleicons.org/viber/7360F2" alt="" />
              </span>
              <span><strong>Viber</strong><small>Official account to be connected</small></span>
              <Arrow />
            </a>
            <a href="#inquiry-form" className="contact-channel channel-whatsapp" aria-label="Contact J3C through WhatsApp">
              <span className="channel-brand-icon" aria-hidden="true">
                <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" />
              </span>
              <span><strong>WhatsApp</strong><small>Official number to be connected</small></span>
              <Arrow />
            </a>
            <a href="#inquiry-form" className="contact-channel channel-messenger" aria-label="Contact J3C through Messenger">
              <span className="channel-brand-icon" aria-hidden="true">
                <img src="https://cdn.simpleicons.org/messenger/00B2FF" alt="" />
              </span>
              <span><strong>Messenger</strong><small>Official page to be connected</small></span>
              <Arrow />
            </a>
          </div>

          <InquiryForm />

          <div className="office-line">
            <span>Management Office</span>
            <strong>306 Janina Bldg., Chateau Valenzuela</strong>
          </div>
        </div>
      </section>

      <footer>
        <div className="section-container footer-inner">
          <a className="brand footer-brand" href="#home">
            <div className="logo-shell"><Logo compact /></div>
            <span className="brand-copy"><strong>J3C Rental Properties</strong><small>Condominium Unit Rental</small></span>
          </a>
          <p>J3C Rental Properties · Valenzuela City</p>
          <div className="footer-links"><a href="#properties">Available Units</a><a href="#guidelines">FAQs & Guidelines</a><a href="#contact">Contact</a></div>
        </div>
      </footer>
    </main>
  )
}
