import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { siteInfo } from '../../data/siteData';

export default function Header({ onOpenOffcanvas }) {
  const { pathname } = useLocation();
  const isLightHeader =
    pathname === '/' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/service') ||
    pathname.startsWith('/portfolio') ||
    [
      '/ui-and-ux-design',
      '/graphic-design',
      '/branding-and-rebranding',
      '/web-development',
      '/app-development',
      '/digital-marketing'
    ].includes(pathname);

  return (
    <header className={`header-area have-bottom-shape ${isLightHeader ? 'header-light-theme' : ''}`}>
      {/* Vertical Header Grid Lines aligning with page lines and '+' shapes */}
      <div className="header-grid-lines" aria-hidden="true">
        <span className="header-line header-line-left" />
        <span className="header-line header-line-right" />
      </div>

      <div className="container">
        <div className="header-area__inner">
          <div className="header__logo">
            <Link to="/" aria-label="Iconic Technologies Home">
              <img className="show-light" src="/assets/imgs/logo/logo.png" alt="Iconic Technologies Logo" />
              <img className="show-dark" src="/assets/imgs/logo/logo-light.png" alt="Iconic Technologies Logo Light" />
            </Link>
          </div>

          <div className="header__nav pos-center">
            <nav className="main-menu">
              <ul>
                <li>
                  <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about-us" className={({ isActive }) => (isActive ? 'active' : '')}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Services
                  </NavLink>
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
              </ul>
            </nav>
          </div>

          <div className="header__actions d-flex align-items-center gap-2 gap-sm-3">
            <div className="header__button">
              <Link to="/contact-us" className="wc-btn wc-btn-primary btn-text-flip">
                <span data-text="Let's Talk">Let's Talk</span>
              </Link>
            </div>

            <div className="header__navicon">
              <button
                onClick={onOpenOffcanvas}
                className="open-offcanvas"
                aria-label="Open navigation menu"
                type="button"
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
