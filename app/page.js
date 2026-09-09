import GalleryShowcase from './GalleryShowcase'
import MotionObserver from './MotionObserver'

const gallery = [
  { src: '/photos/fini-living-01.jpg', label: 'Living Area', className: 'gallery-landscape' },
  { src: '/photos/fini-kitchen.jpg', label: 'Kitchen', className: 'gallery-portrait' },
  { src: '/photos/fini-bedroom.jpg', label: 'Bedroom', className: 'gallery-portrait' },
  { src: '/photos/fini-dining.jpg', label: 'Dining Area', className: 'gallery-landscape' },
  { src: '/photos/fini-living-02.jpg', label: 'Lounge', className: 'gallery-landscape' },
  { src: '/photos/fini-bathroom-02.jpg', label: 'Bathroom', className: 'gallery-portrait' },
]

const accountRows = [
  { due: 'Sep 15, 2026', water: '₱420', elec: '₱1,185', hoa: '₱600', total: '₱10,705', paid: '₱10,705', balance: '₱0' },
  { due: 'Oct 15, 2026', water: '—', elec: '—', hoa: '₱600', total: 'Pending', paid: '—', balance: '—' },
]

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
            <a href="#residence">Property</a>
            <a href="#gallery">Gallery</a>
            <a href="#services">Services</a>
            <a href="#tenant">Tenant Portal</a>
          </nav>

          <a className="btn btn-navy desktop-cta" href="#contact">Schedule a Viewing</a>

          <details className="mobile-menu">
            <summary aria-label="Open menu">Menu</summary>
            <div className="mobile-menu-panel">
              <a href="#residence">Property</a>
              <a href="#gallery">Gallery</a>
              <a href="#services">Services</a>
              <a href="#tenant">Tenant Portal</a>
              <a className="btn btn-gold" href="#contact">Schedule a Viewing</a>
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
            <h1>Comfortable living,<br /><em>professionally managed.</em></h1>
            <p className="hero-lead">Discover a more polished rental experience at Fini Homes Condominium—presented with actual property photos and supported by J3C from inquiry to tenancy.</p>
            <div className="hero-actions">
              <a className="btn btn-gold" href="#residence">Explore the Property <Arrow /></a>
              <a className="btn btn-glass" href="#gallery">View Photo Gallery</a>
            </div>
          </div>

          <aside className="hero-property-card" data-reveal style={{ '--reveal-delay': '120ms' }}>
            <div className="hero-card-topline"><span>Featured Rental</span><b>01</b></div>
            <h2>Fini Homes<br />Condominium</h2>
            <p>Marulas, Valenzuela</p>
            <div className="hero-card-divider" />
            <div className="hero-card-facts">
              <div><span>Property Type</span><strong>Condominium</strong></div>
              <div><span>Availability</span><strong>By Inquiry</strong></div>
              <div><span>Viewing</span><strong>By Schedule</strong></div>
            </div>
            <a href="#contact" className="hero-card-link">Ask about this unit <Arrow /></a>
          </aside>
        </div>

        <div className="hero-bottom">
          <div className="hero-bottom-inner">
            <span>Actual J3C property photos</span>
            <span>Fini Homes · Marulas, Valenzuela</span>
            <span>Tenant support ready</span>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="J3C rental services">
        <div className="section-container trust-inner">
          <p>More than a listing. A better rental experience.</p>
          <div className="trust-points">
            <span>Property Presentation</span><i />
            <span>Viewing Assistance</span><i />
            <span>Tenant Support</span>
          </div>
        </div>
      </section>

      <section className="residence section-pad" id="residence">
        <div className="section-container residence-grid">
          <div className="residence-copy" data-reveal>
            <p className="eyebrow"><span /> FEATURED RESIDENCE</p>
            <h2>Fini Homes,<br /><em>Marulas.</em></h2>
            <p className="lead">A real J3C-managed condominium presented using the property’s actual photos. This mockup keeps the experience credible while leaving rates, exact unit specifications, and live availability for J3C to confirm.</p>

            <div className="property-facts">
              <div><span>Residence</span><strong>Fini Homes Condominium</strong></div>
              <div><span>Location</span><strong>Marulas, Valenzuela</strong></div>
              <div><span>Rental Status</span><strong>Inquire for availability</strong></div>
              <div><span>Property Viewing</span><strong>By appointment</strong></div>
            </div>

            <a className="inline-cta" href="#contact"><span>Request current rental details</span><Arrow /></a>
          </div>

          <div className="property-collage" data-reveal style={{ '--reveal-delay': '120ms' }}>
            <figure className="collage-main">
              <img src="/photos/fini-living-01.jpg" alt="Living area at Fini Homes Condominium" />
              <figcaption>Living Area</figcaption>
            </figure>
            <figure className="collage-top">
              <img src="/photos/fini-bedroom.jpg" alt="Bedroom at Fini Homes Condominium" />
              <figcaption>Bedroom</figcaption>
            </figure>
            <figure className="collage-bottom">
              <img src="/photos/fini-kitchen.jpg" alt="Kitchen at Fini Homes Condominium" />
              <figcaption>Kitchen</figcaption>
            </figure>
            <div className="photo-badge"><strong>100%</strong><span>Actual property photos</span></div>
          </div>
        </div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="section-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> PHOTO TOUR</p>
              <h2>See the space<br /><em>before you visit.</em></h2>
            </div>
            <p>Real property imagery gives prospective renters a clearer sense of the unit and makes the website feel trustworthy from the first visit.</p>
          </div>

          <GalleryShowcase items={gallery} />
        </div>
      </section>

      <section className="brand-story" id="services">
        <div className="brand-story-image" data-reveal>
          <img src="/photos/fini-gate.jpg" alt="Fini Homes entrance" />
          <div className="brand-story-overlay" />
          <div className="brand-story-caption"><span>Fini Homes</span><strong>Marulas, Valenzuela</strong></div>
        </div>

        <div className="brand-story-copy" data-reveal style={{ '--reveal-delay': '100ms' }}>
          <div className="story-logo"><Logo /></div>
          <p className="eyebrow eyebrow-light"><span /> THE J3C EXPERIENCE</p>
          <h2>Rental support with<br /><em>care and clarity.</em></h2>
          <p>J3C can be positioned as more than a property listing page: a professional rental partner that helps tenants discover a unit, arrange a viewing, understand charges, and stay on top of their account.</p>

          <div className="services-list">
            <div><b>01</b><span><strong>Property Discovery</strong><small>Professional galleries and clear property information.</small></span></div>
            <div><b>02</b><span><strong>Viewing Coordination</strong><small>A direct path from inquiry to scheduled viewing.</small></span></div>
            <div><b>03</b><span><strong>Tenant Account Support</strong><small>Ready to expand into statements, balances, and payment records.</small></span></div>
          </div>
        </div>
      </section>

      <section className="tenant section-pad" id="tenant">
        <div className="section-container tenant-grid">
          <div className="tenant-copy" data-reveal>
            <p className="eyebrow"><span /> TENANT PORTAL CONCEPT</p>
            <h2>Rent and account details,<br /><em>all in one place.</em></h2>
            <p>Based on J3C’s existing Statement of Account workflow, the website can later grow into a secure tenant portal for monthly rent, utilities, HOA dues, payments, and balances.</p>
            <div className="feature-pills">
              <span>Monthly Statement</span>
              <span>Utility Breakdown</span>
              <span>Payment History</span>
              <span>Mobile Friendly</span>
            </div>
          </div>

          <div className="portal-shell" data-reveal style={{ '--reveal-delay': '120ms' }}>
            <div className="portal-top">
              <div className="portal-brand">
                <div className="portal-logo"><Logo compact /></div>
                <div><strong>J3C Tenant Portal</strong><span>Statement of Account</span></div>
              </div>
              <span className="sample-pill">DEMO PREVIEW</span>
            </div>

            <div className="portal-title">
              <div><span>Tenant</span><strong>Sample Tenant</strong></div>
              <div><span>Billing period</span><strong>September 2026</strong></div>
            </div>

            <div className="portal-stats">
              <div><span>Unit</span><strong>204</strong></div>
              <div><span>Base Rent</span><strong>₱8,500.00</strong></div>
              <div className="balance-stat"><span>Current Balance</span><strong>₱0.00</strong></div>
            </div>

            <div className="portal-table-wrap">
              <table className="portal-table">
                <thead><tr><th>Due Date</th><th>Water</th><th>Elec</th><th>HOA</th><th>Total Due</th><th>Paid</th><th>Balance</th></tr></thead>
                <tbody>
                  {accountRows.map((row, index) => (
                    <tr key={index}><td>{row.due}</td><td>{row.water}</td><td>{row.elec}</td><td>{row.hoa}</td><td>{row.total}</td><td>{row.paid}</td><td>{row.balance}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="portal-mobile-ledger" aria-label="Mobile account statement preview">
              {accountRows.map((row, index) => (
                <article className="ledger-card" key={`mobile-${index}`}>
                  <div className="ledger-card-head">
                    <div><span>Due date</span><strong>{row.due}</strong></div>
                    <span className={row.balance === '₱0' ? 'ledger-status paid' : 'ledger-status'}>{row.balance === '₱0' ? 'Paid' : 'Upcoming'}</span>
                  </div>
                  <div className="ledger-total">
                    <span>Total due</span>
                    <strong>{row.total}</strong>
                  </div>
                  <div className="ledger-grid">
                    <div><span>Water</span><strong>{row.water}</strong></div>
                    <div><span>Electricity</span><strong>{row.elec}</strong></div>
                    <div><span>HOA</span><strong>{row.hoa}</strong></div>
                    <div><span>Amount paid</span><strong>{row.paid}</strong></div>
                  </div>
                  <div className="ledger-balance"><span>Balance</span><strong>{row.balance}</strong></div>
                </article>
              ))}
            </div>

            <p className="portal-note">Concept only · Fictional tenant information · No live account connection</p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-image">
          <img src="/photos/fini-building.jpg" alt="Fini Homes Condominium exterior" />
          <div className="contact-overlay" />
          <div className="contact-message" data-reveal>
            <p>PRIVATE VIEWING</p>
            <h2>Your next home<br /><em>starts with a visit.</em></h2>
          </div>
        </div>

        <div className="contact-panel" data-reveal>
          <p className="eyebrow eyebrow-light"><span /> RENTAL INQUIRY</p>
          <h2>Schedule a<br />property viewing.</h2>
          <p>Send your details so J3C can confirm the latest availability, rental requirements, and viewing schedule.</p>

          <form className="inquiry-form">
            <div className="field-row">
              <label>Full name<input placeholder="Your name" /></label>
              <label>Contact number<input placeholder="09XX XXX XXXX" /></label>
            </div>
            <label>Email address<input type="email" placeholder="you@email.com" /></label>
            <label>Interested property<select defaultValue="Fini Homes Condominium"><option>Fini Homes Condominium</option><option>Other J3C property</option></select></label>
            <label>Message<textarea rows="4" placeholder="I would like to ask about availability and schedule a viewing." /></label>
            <button className="btn btn-gold btn-full" type="button">Send Rental Inquiry <Arrow /></button>
          </form>

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
          <p>Website concept using J3C branding and supplied property photos.</p>
          <div className="footer-links"><a href="#residence">Property</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></div>
        </div>
      </footer>
    </main>
  )
}
