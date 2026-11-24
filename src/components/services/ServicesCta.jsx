import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ServicesCta() {
  const [isInView, setIsInView] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    let triggered = false;

    const isWebsiteReady = () => {
      return document.body.classList.contains('website-ready') || !document.getElementById('preloader');
    };

    const triggerAnimation = () => {
      if (triggered) return;
      triggered = true;
      setIsInView(true);
    };

    const checkVisibility = () => {
      if (triggered || !bannerRef.current) return;
      // Strictly wait until website properly loads
      if (!isWebsiteReady()) return;

      const rect = bannerRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 50 && rect.bottom >= 0) {
        triggerAnimation();
      }
    };

    const handleWebsiteReady = () => {
      setTimeout(checkVisibility, 80);
    };

    window.addEventListener('website-ready', handleWebsiteReady);
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    let observer;
    if (typeof IntersectionObserver !== 'undefined' && bannerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !triggered) {
              if (isWebsiteReady()) {
                triggerAnimation();
                observer.unobserve(entry.target);
              }
            }
          });
        },
        {
          rootMargin: '0px 0px -50px 0px',
        }
      );
      observer.observe(bannerRef.current);
    }

    if (isWebsiteReady()) {
      checkVisibility();
    }

    return () => {
      window.removeEventListener('website-ready', handleWebsiteReady);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      if (observer && bannerRef.current) observer.unobserve(bannerRef.current);
    };
  }, []);

  return (
    <section className="palletio-cta-section services-cta">
      <div className="container">
        <div ref={bannerRef} className="services-cta-banner">
          <h2
            className={`services-cta-title animate__animated animate__fadeInUp ${isInView ? 'is-in-view' : ''}`}
          >
            Start your<br />
            experience with<br />
            Iconic Technologies
          </h2>
          <div
            className={`services-cta-btn-wrap animate__animated animate__fadeInUp ${isInView ? 'is-in-view' : ''}`}
          >
            <Link to="/contact-us" className="services-cta-link">
              <span className="link-text">LET’S TALK</span>
              <span className="arrow-sym">⟶</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
