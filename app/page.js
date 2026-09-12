import GalleryShowcase from './GalleryShowcase'
import InquiryForm from './InquiryForm'
import MotionObserver from './MotionObserver'
import PublicProperties from './PublicProperties'
import LocationsShowcase from './LocationsShowcase'
import MobileMenu from './MobileMenu'
import LocationsNavMenu from './LocationsNavMenu'
import DatabaseLocationList from './DatabaseLocationList'
import HeroBackgroundSlider from './HeroBackgroundSlider'

const gallery = [
  { src: '/photos/unit-1/living-room-02.jpg', label: 'Fini Homes · Living Area', className: 'gallery-landscape' },
  { src: '/photos/unit-1/kitchen.jpg', label: 'Fini Homes · Kitchen', className: 'gallery-portrait' },
  { src: '/photos/chateau/main-gate.jpg', label: 'Chateau Valenzuela · Main Gate', className: 'gallery-landscape' },
  { src: '/photos/chateau/pool.jpg', label: 'Chateau Valenzuela · Swimming Pool', className: 'gallery-landscape' },
  { src: '/photos/unit-1/bedroom-bunk.jpg', label: 'Fini Homes · Bedroom', className: 'gallery-portrait' },
  { src: '/photos/chateau/basketball-court.jpg', label: 'Chateau Valenzuela · Basketball Court', className: 'gallery-landscape' },
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
              <small>Rental Properties · Multiple Locations</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#about">About Us</a>
            <LocationsNavMenu />
            <a href="#properties">Available Units</a>
            <a href="#gallery">Gallery</a>
            <a href="#guidelines">FAQs & Guidelines</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="btn btn-navy desktop-cta" href="#inquiry-form">Inquire Now</a>

          <MobileMenu />
        </div>
      </header>

      <section className="hero" id="home">
        <HeroBackgroundSlider />
        <div className="hero-overlay" />
        <div className="hero-noise" />

        <div className="hero-container">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow eyebrow-light"><span /> J3C · RENTAL PROPERTIES</p>
            <h1>Find a space that<br /><em>feels like home.</em></h1>
            <p className="hero-lead">Explore J3C rental properties through real property photos, clear rental information, and a direct inquiry experience designed to make finding your next home simpler.</p>
            <div className="hero-actions">
              <a className="btn btn-gold" href="#properties">Browse Available Units <Arrow /></a>
              <a className="btn btn-glass" href="#inquiry-form">Inquire Now</a>
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
            <span>Featured J3C rental communities</span>
            <span>Valenzuela · Taguig · Alabang · Manila · Quezon City · Tagaytay · Pampanga</span>
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
              <p className="eyebrow"><span /> FEATURED J3C COMMUNITIES</p>
              <h2>Featured locations,<br /><em>one clear rental experience.</em></h2>
            </div>
            <p>Property names, addresses, map links, unit counts, and location details below are pulled from the live rental database so updates made in Admin stay consistent on the public site.</p>
          </div>

          <LocationsShowcase />
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

      <section className="brand-story" id="about">
        <div className="brand-story-image" data-reveal>
          <img src="/photos/hero/01-fini-entrance.webp" alt="J3C rental property community entrance" />
          <div className="brand-story-overlay" />
          <div className="brand-story-caption"><span>J3C Rental Properties</span><strong>Serving renters since 2018</strong></div>
        </div>

        <div className="brand-story-copy" data-reveal style={{ '--reveal-delay': '100ms' }}>
          <div className="story-logo"><Logo /></div>
          <p className="eyebrow eyebrow-light"><span /> ABOUT J3C RENTAL PROPERTIES</p>
          <h2>Built through experience,<br /><em>managed with care.</em></h2>
          <p>J3C Rental Properties began in June 2018 with a studio-type condominium unit operated as a bedspace at Avida Towers San Lazaro in Sta. Cruz, Manila. The business grew through the collaboration of owner Nathaniel Alexander Torres and property manager Josephine De Guia, expanding from its first rental into a wider portfolio of condominium units and accommodations.</p>
          <p className="about-secondary-copy">Today, J3C manages 9 quality condo units across Valenzuela, Taguig, and Muntinlupa-Alabang, together with its bedspace accommodation in Manila. The focus remains simple: clean, safe, and comfortable living spaces supported by hands-on property management.</p>

          <div className="about-stats" aria-label="J3C business highlights">
            <div><strong>2018</strong><span>Established</span></div>
            <div><strong>9</strong><span>Quality condo units</span></div>
            <div><strong>2027</strong><span>Pampanga expansion</span></div>
          </div>

          <div className="about-values" aria-label="Why choose J3C Rental Properties">
            <div><strong>Proven Experience</strong><span>Serving renters since 2018.</span></div>
            <div><strong>Prime Locations</strong><span>Properties across key Metro Manila areas.</span></div>
            <div><strong>Trusted & Caring Service</strong><span>Hands-on management with a personal approach.</span></div>
          </div>

          <div className="services-list">
            <div><b>01</b><span><strong>Condominium Rentals</strong><small>Long-term and short-term rental options in fully furnished and semi-furnished units near key commercial districts and transport hubs.</small></span></div>
            <div><b>02</b><span><strong>Studio & Bedspace Accommodation</strong><small>Affordable accommodation options, including J3C&apos;s bedspace at Avida Towers San Lazaro in Sta. Cruz, Manila.</small></span></div>
            <div><b>03</b><span><strong>Property Management & Leasing</strong><small>Hands-on property oversight designed to support owners while keeping the rental experience clear and convenient for tenants.</small></span></div>
          </div>

          <div className="about-note">
            <span>COMING 2027</span>
            <p>J3C plans to expand into Pampanga with residential house and apartment rentals in Cheerful Homes, Mabalacat and Amaia Scapes, Mexico.</p>
          </div>
        </div>
      </section>

      <section className="team-section section-pad" id="team">
        <div className="section-container">
          <div className="team-heading" data-reveal>
            <div>
              <p className="eyebrow"><span /> THE PEOPLE BEHIND J3C</p>
              <h2>Meet the team<br /><em>behind every rental.</em></h2>
            </div>
            <p>From business direction to licensed property assistance and day-to-day tenant support, J3C keeps each rental experience personally managed.</p>
          </div>

          <div className="team-grid">
            <article className="team-card" data-reveal>
              <div className="team-card-mark" aria-hidden="true">NT</div>
              <span>FOUNDER / DIRECTOR</span>
              <h3>Nathaniel Alexander Torres</h3>
              <p>Business direction, rental portfolio oversight, and long-term growth of J3C Rental Properties.</p>
            </article>

            <article className="team-card" data-reveal style={{ '--reveal-delay': '90ms' }}>
              <div className="team-card-mark" aria-hidden="true">LP</div>
              <span>LICENSED PROFESSIONALS</span>
              <h3>Accredited Brokers &amp; Agents</h3>
              <p>Professional assistance for leasing coordination, property transactions, and renter guidance when required.</p>
            </article>

            <article className="team-card team-card-management" data-reveal style={{ '--reveal-delay': '180ms' }}>
              <div className="team-card-mark" aria-hidden="true">PM</div>
              <span>PROPERTY MANAGEMENT TEAM</span>
              <h3>Led by Josephine De Guia</h3>
              <p>Hands-on property operations, tenant coordination, viewing support, and day-to-day rental management.</p>
            </article>
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
            <p>Review J3C&apos;s official frequently asked questions, rental guidelines, move-in requirements, standard payment terms, and property location information before choosing a unit.</p>
          </div>

          <div className="info-hub-grid">
            <article className="info-card info-card-faq" data-reveal>
              <div className="info-card-number">01</div>
              <div className="info-card-kicker">Frequently Asked Questions</div>
              <h3>Quick answers for renters.</h3>
              <div className="faq-list">
                <details open>
                  <summary>How can I inquire or schedule a viewing?</summary>
                  <p>Browse the official website for property listings, or contact J3C directly by phone call, text, Viber, or WhatsApp to arrange a viewing with the property management team.</p>
                </details>
                <details>
                  <summary>Are water and electricity included in the rent?</summary>
                  <p>Unless a specific unit package states otherwise, water and electricity are separate and paid by the tenant based on individual consumption or billing statements.</p>
                </details>
                <details>
                  <summary>Can I reserve a unit in advance?</summary>
                  <p>Yes. A unit may be reserved after completing the initial reservation requirements and agreement terms.</p>
                </details>
                <details>
                  <summary>Are pets allowed?</summary>
                  <p>No. J3C&apos;s standard rental units follow a no-pets policy to help maintain cleanliness, hygiene, and resident comfort.</p>
                </details>
                <details>
                  <summary>Are condo dues included in the monthly rent?</summary>
                  <p>Yes. Condo dues are included in J3C rental rates and are handled by management to help ensure association dues remain updated.</p>
                </details>
              </div>
            </article>

            <article className="info-card" data-reveal style={{ '--reveal-delay': '80ms' }}>
              <div className="info-card-number">02</div>
              <div className="info-card-kicker">Rental Guidelines & House Rules</div>
              <h3>Simple rules for a peaceful stay.</h3>
              <ul className="info-checklist">
                <li><span>Quiet hours</span><small>Observe peace and quiet, especially during standard neighborhood resting hours.</small></li>
                <li><span>Cleanliness & maintenance</span><small>Keep the rented space clean and well-maintained. Major repairs caused by tenant negligence may be charged accordingly.</small></li>
                <li><span>No smoking indoors</span><small>Smoking inside enclosed rental units is strictly prohibited.</small></li>
                <li><span>No pets</span><small>Pets are not allowed within J3C rental property premises.</small></li>
                <li><span>Registered occupants only</span><small>Unauthorized sub-leasing and indefinite stays by unregistered occupants are prohibited.</small></li>
                <li><span>Scheduled inspections</span><small>Management may conduct routine property checks with prior notice for upkeep and safety.</small></li>
              </ul>
            </article>

            <article className="info-card" data-reveal style={{ '--reveal-delay': '120ms' }}>
              <div className="info-card-number">03</div>
              <div className="info-card-kicker">Rental Requirements</div>
              <h3>Prepare these before move-in.</h3>
              <ul className="info-checklist">
                <li><span>Two valid IDs</span><small>At least two government-issued IDs for tenant verification.</small></li>
                <li><span>Tenant information sheet</span><small>A fully accomplished and signed tenant profile form.</small></li>
                <li><span>Proof of capacity to pay</span><small>Employed applicants may submit a COE, payslips, or employment contract. Business owners or freelancers may submit business registration, bank statements, or proof of income source.</small></li>
                <li><span>Initial payment</span><small>Required deposits and advance payments must be completed before move-in.</small></li>
              </ul>
            </article>

            <article className="info-card info-card-accent" data-reveal style={{ '--reveal-delay': '160ms' }}>
              <div className="info-card-number">04</div>
              <div className="info-card-kicker">Rates & Terms / Pricing</div>
              <h3>Clear costs. Clear expectations.</h3>
              <div className="rate-preview">
                <span>Standard payment terms</span>
                <strong>1 month advance + 2 months deposit</strong>
                <small>Rental rates vary by location, unit type, and property features. Exact monthly rates are shown in the current listings or can be confirmed directly with J3C.</small>
              </div>
              <a href="#properties" className="info-card-link">View current rental rates <Arrow /></a>
            </article>

            <article className="info-card info-card-location" data-reveal style={{ '--reveal-delay': '240ms' }}>
              <div className="info-card-number">05</div>
              <div className="info-card-kicker">Locations / How to Get There</div>
              <h3>J3C Property Areas</h3>
              <DatabaseLocationList />
              <a className="info-card-link" href="#locations">View featured property locations <Arrow /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="contact">
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
          <div className="inquiry-section">
            <p className="eyebrow eyebrow-light"><span /> INQUIRE NOW</p>
            <h2>Start with<br />a simple inquiry.</h2>
            <p>Leave your name, number, property of interest, and question. We&apos;ll use the details you provide to assist you more efficiently.</p>
            <InquiryForm />
          </div>

          <div className="direct-contact-block" id="contact">
            <p className="eyebrow eyebrow-light"><span /> CONTACT US</p>
            <h3>Prefer to message us directly?</h3>
            <p>Choose Viber, WhatsApp, or Messenger below. Our property management team can also assist with viewings, rental questions, and tenant coordination.</p>

            <div className="contact-channels" aria-label="Direct contact options">
              <a href="viber://chat?number=%2B639473068528" className="contact-channel channel-viber" aria-label="Contact J3C through Viber">
                <span className="channel-brand-icon" aria-hidden="true">
                  <img src="https://cdn.simpleicons.org/viber/7360F2" alt="" />
                </span>
                <span><strong>Viber</strong><small>+63 947 306 8528</small></span>
                <Arrow />
              </a>
              <a href="https://wa.me/639473068528" target="_blank" rel="noreferrer" className="contact-channel channel-whatsapp" aria-label="Contact J3C through WhatsApp">
                <span className="channel-brand-icon" aria-hidden="true">
                  <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" />
                </span>
                <span><strong>WhatsApp</strong><small>+63 947 306 8528</small></span>
                <Arrow />
              </a>
              <a href="#inquiry-form" className="contact-channel channel-messenger" aria-label="Contact J3C through Messenger">
                <span className="channel-brand-icon" aria-hidden="true">
                  <img src="https://cdn.simpleicons.org/messenger/00B2FF" alt="" />
                </span>
                <span><strong>Messenger</strong><small>Use the inquiry form for now</small></span>
                <Arrow />
              </a>
            </div>

            <div className="management-office-card">
              <div className="office-card-heading">
                <span>Management Office</span>
                <strong>Property Management Team</strong>
              </div>

              <div className="management-team-list">
                <div><b>Josephine L. de Guia</b><small>Property Manager</small></div>
                <div><b>Froilan Jr. C. De Guia</b><small>Assistant Property Manager</small></div>
                <div><b>Antonio Ichban</b><small>Maintenance &amp; Company Driver</small></div>
              </div>

              <div className="office-contact-details">
                <p><span>Address</span><strong>Unit 7D, Tower 5, Avida Towers San Lazaro, Brgy. 350, Zone 35, Sta. Cruz, Manila, 1008</strong></p>
                <p><span>Contact</span><a href="tel:+639473068528">+63 947 306 8528</a></p>
                <p><span>Email</span><a href="mailto:j3crentalproperties@gmail.com">j3crentalproperties@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="section-container footer-inner">
          <a className="brand footer-brand" href="#home">
            <div className="logo-shell"><Logo compact /></div>
            <span className="brand-copy"><strong>J3C Rental Properties</strong><small>Condominium Unit Rental</small></span>
          </a>
          <p>J3C Rental Properties · Serving renters since 2018</p>
          <div className="footer-links"><a href="#about">About Us</a><a href="#properties">Available Units</a><a href="#guidelines">FAQs & Guidelines</a><a href="#contact">Contact</a></div>
        </div>
      </footer>
    </main>
  )
}
