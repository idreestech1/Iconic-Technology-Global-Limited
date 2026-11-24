import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const isPortfolioPath = (pathname) => {
  if (!pathname) return false;
  const clean = pathname.toLowerCase();
  return (
    clean === '/portfolio' ||
    clean.startsWith('/portfolio/') ||
    clean === '/work' ||
    clean.startsWith('/work/') ||
    clean === '/projects' ||
    clean.startsWith('/projects/') ||
    clean === '/gallery' ||
    clean.startsWith('/gallery/')
  );
};

function PreloaderAnimation() {
  const [isOpening, setIsOpening] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Synchronously ensure website-ready is cleared while preloader is active
  if (typeof document !== 'undefined' && !isFinished) {
    document.body.classList.remove('website-ready');
  }

  useEffect(() => {
    // Lock scrolling on document while preloader curtains are active
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.remove('website-ready');

    // Phase 1: Curtains slide open after holding logo
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 550);

    // Phase 2: Once curtains slide completely off screen, unmount cleanly & trigger page animations
    const finishTimer = setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.add('website-ready');
      window.dispatchEvent(new CustomEvent('website-ready'));
      if (window.ScrollTrigger) {
        try {
          window.ScrollTrigger.refresh();
        } catch (e) {
          // ignore
        }
      }
    }, 1350);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      id="preloader"
      className={`iconic-split-preloader ${isOpening ? 'is-opening loaded' : ''}`}
      aria-hidden="true"
    >
      <div id="container" className="container-preloader">
        {/* Left half curtain door */}
        <div className="loader-section section-left" />

        {/* Right half curtain door */}
        <div className="loader-section section-right" />

        {/* Center hairline seam accent */}
        <div className="curtain-split-line" />

        {/* Center brand presentation */}
        <div className="animation-preloader">
          <div className="txt-loading">
            <div className="preloader-logo-wrap">
              <div className="preloader-glow-halo" />
              <img
                src="/assets/imgs/logo/loader.png"
                alt="Iconic Technologies Loader"
                className="preloader-logo-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Preloader() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isPortfolioPath(pathname)) {
      document.body.classList.add('website-ready');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [pathname]);

  if (isPortfolioPath(pathname)) {
    return null;
  }

  return <PreloaderAnimation key={pathname} />;
}
