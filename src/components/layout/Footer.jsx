import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteInfo } from '../../data/siteData';
import { StaggerContainer, StaggerItem } from '../animation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="footer-area">
      <div className="container-fluid" style={{ maxWidth: '1440px', padding: '0 clamp(20px, 4vw, 60px)' }}>
        <StaggerContainer
          staggerDelay={0.08}
          delayChildren={0.1}
          className="footer-area-inner"
        >
          {/* Row 1-2, Column 1: Brand Logo & Mission */}
          <StaggerItem className="footer-widget-wrapper footer-brand-widget" y={25}>
            <div className="footer-logo">
              <Link to="/" aria-label="Iconic Technologies Home">
                <img
                  src="/assets/imgs/logo/logo-light.png"
                  alt="Iconic Technologies Logo"
                />
              </Link>
            </div>
            <p
              className="footer-brand-desc"
              style={{
                color: '#9ea0a6',
                fontSize: '14px',
                lineHeight: '1.6',
                marginTop: '20px',
                maxWidth: '240px'
              }}
            >
              Architecting Digital Excellence. Designing Global Impact. Engineering scalable ecosystems.
            </p>
          </StaggerItem>

          {/* Row 1, Column 2: Company */}
          <StaggerItem className="footer-widget-wrapper" y={25}>
            <h2 className="title">Company</h2>
            <ul className="footer-nav-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/services">Service</Link>
              </li>
              <li>
                <a
                  href="https://www.behance.net/iconictechglbltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Iconic Technologies Behance Portfolio"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Row 1, Column 3: Services */}
          <StaggerItem className="footer-widget-wrapper" y={25}>
            <h2 className="title">Services</h2>
            <ul className="footer-nav-list">
              <li>
                <Link to="/service/ui-and-ux-design">UI & UX Design</Link>
              </li>
              <li>
                <Link to="/service/graphic-design">Graphic Design</Link>
              </li>
              <li>
                <Link to="/service/branding-and-rebranding">Branding & Rebranding</Link>
              </li>
              <li>
                <Link to="/service/web-development">Web Development</Link>
              </li>
              <li>
                <Link to="/service/app-development">App Development</Link>
              </li>
              <li>
                <Link to="/service/digital-marketing">Digital Marketing</Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Row 1, Column 4: Newsletter */}
          <StaggerItem className="footer-widget-wrapper newsletter" y={25}>
            <h2 className="title">Newsletter</h2>
            <div className="newsletter-text">
              <p className="text">
                Feel free to reach out if you want to collaborate with us, or simply have a chat.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="subscribe-form">
              <div className="input-field">
                <span className="icon" aria-hidden="true">
                  <i className="fa-regular fa-envelope"></i>
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for newsletter"
                  autoComplete="email"
                  required
                />
                <button type="submit" className="subscribe-btn" aria-label="Subscribe to newsletter">
                  <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                </button>
              </div>
              {isSubscribed && (
                <p className="text-success mt-2" style={{ fontSize: '14px' }}>
                  Thank you for subscribing!
                </p>
              )}
            </form>
          </StaggerItem>

          {/* Row 2, Column 2: Term & Conditions */}
          <StaggerItem className="footer-widget-wrapper" y={25}>
            <h2 className="title">Term & Conditions</h2>
            <ul className="footer-nav-list">
              <li>
                <Link to="/contact-us">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/contact-us">Refund Policy</Link>
              </li>
              <li>
                <Link to="/contact-us">Privacy policy</Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Row 2, Column 3: Social Media */}
          <StaggerItem className="footer-widget-wrapper" y={25}>
            <h2 className="title">Social Media</h2>
            <ul className="social-links">
              <li>
                <a
                  href={siteInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.socials.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Behance"
                  title="Behance"
                >
                  <i className="fa-brands fa-behance" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.socials.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  title="TikTok"
                >
                  <i className="fa-brands fa-tiktok" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://iconictechnologiesgloballimited.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                  title="Website"
                >
                  <i className="fa-solid fa-globe" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </StaggerItem>

          {/* Row 2, Column 4: Full Contact Details (Email, Phone, WhatsApp, Location & Registration) */}
          <StaggerItem className="footer-widget-wrapper footer-contact-widget" y={25}>
            <h2 className="title">Contact Us</h2>
            <ul className="footer-nav-list contact-details-list">
              <li>
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="footer-contact-link"
                  title="Official Email"
                >
                  <i className="fa-regular fa-envelope" aria-hidden="true"></i>
                  <span>{siteInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteInfo.phoneRaw}`}
                  className="footer-contact-link"
                  title="Official Telephone"
                >
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  <span>{siteInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                  title="Chat on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" style={{ color: '#25D366' }}></i>
                  <span>WhatsApp: {siteInfo.whatsapp}</span>
                </a>
              </li>
              <li>
                <span className="footer-contact-text">
                  <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                  <span>{siteInfo.address}</span>
                  <span className="rc-pill">
                    RC 8967406
                  </span>
                </span>
              </li>
            </ul>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Full-width Centered Copyright Bar */}
      <div className="copyright-area">
        <div className="container-fluid" style={{ maxWidth: '1440px', padding: '0 clamp(20px, 4vw, 60px)' }}>
          <div className="copyright-area-inner">
            <div className="copyright-text">
              <p className="text">
                © {currentYear}{' '}
                <Link to="/" style={{ color: '#ffffff', fontWeight: 600 }}>
                  Iconic Technologies Global Limited
                </Link>{' '}
                (RC 8967406). All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
