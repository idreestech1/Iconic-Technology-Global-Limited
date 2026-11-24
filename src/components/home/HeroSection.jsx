import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    // If website is already opened (e.g. navigated back from another page)
    if (document.body.classList.contains('website-ready')) {
      const titleTimer = setTimeout(() => setIsTitleVisible(true), 150);
      const arrowTimer = setTimeout(() => setIsArrowVisible(true), 300);
      const textTimer = setTimeout(() => setIsTextVisible(true), 450);
      return () => {
        clearTimeout(titleTimer);
        clearTimeout(arrowTimer);
        clearTimeout(textTimer);
      };
    }

    // Play animation strictly after website curtains finish opening completely
    const handleWebsiteReady = () => {
      const titleTimer = setTimeout(() => {
        setIsTitleVisible(true);
      }, 100);
      const arrowTimer = setTimeout(() => {
        setIsArrowVisible(true);
      }, 250);
      const textTimer = setTimeout(() => {
        setIsTextVisible(true);
      }, 450);
      return () => {
        clearTimeout(titleTimer);
        clearTimeout(arrowTimer);
        clearTimeout(textTimer);
      };
    };

    window.addEventListener('website-ready', handleWebsiteReady);

    // Fallback timers (curtains finish at 1900ms + clean pause)
    const fallbackTitleTimer = setTimeout(() => {
      setIsTitleVisible(true);
    }, 2000);
    const fallbackArrowTimer = setTimeout(() => {
      setIsArrowVisible(true);
    }, 2150);
    const fallbackTextTimer = setTimeout(() => {
      setIsTextVisible(true);
    }, 2350);

    return () => {
      window.removeEventListener('website-ready', handleWebsiteReady);
      clearTimeout(fallbackTitleTimer);
      clearTimeout(fallbackArrowTimer);
      clearTimeout(fallbackTextTimer);
    };
  }, []);

  // Scroll reveal effect for hero showcase banner (triggers when 100px of the component is visible)
  useEffect(() => {
    let triggered = false;

    const triggerBanner = () => {
      if (triggered) return;
      triggered = true;
      setIsBannerVisible(true);
    };

    const bannerEl = bannerRef.current;
    if (!bannerEl) return;

    // Checks if at least 100px of the component is showing within the viewport
    const checkVisibility = () => {
      if (triggered || !bannerEl) return;
      const rect = bannerEl.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 100) {
        triggerBanner();
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    // IntersectionObserver triggers when top of banner reaches 100px inside viewport
    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              triggerBanner();
            }
          });
        },
        {
          rootMargin: '0px 0px -100px 0px',
        }
      );
      observer.observe(bannerEl);
    }

    // Initial check in case it already shows 100px on large viewports
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      if (observer && bannerEl) observer.unobserve(bannerEl);
    };
  }, []);

  return (
    <section className="hero-area section-spacing-bottom have-bottom-shape">
      <div className="container">
        <div className="hero-area-inner">
          <div className="section-content">
            <div className="section-title-wrapper">
              <div className={`title-wrapper hero-title-wrap ${isTitleVisible ? 'is-visible' : ''}`}>
                <h1 className="section-title">
                  Architecting Digital Excellence. Designing Global Impact.
                </h1>
              </div>
            </div>
            <div className="section-content-end">
              <div className={`icon-wrapper hero-arrow-wrap ${isArrowVisible ? 'is-visible' : ''}`}>
                <img
                  className="icon-image show-light"
                  src="/assets/imgs/shape/img-s-2.webp"
                  alt="Decorative Arrow"
                  style={{ maxWidth: '55px' }}
                />
              </div>
              <div className={`text-wrapper hero-desc-wrap ${isTextVisible ? 'is-visible' : ''}`}>
                <p className="text">
                  <strong>Iconic Technologies Global Limited (RC 8967406)</strong> is a premier technology partner engineering scalable digital ecosystems for ambitious brands worldwide. We bridge the gap between world-class software development and high-converting visual identity, building the digital infrastructure necessary for global market positioning.
                </p>
              </div>
              <div className="btn-wrapper has_fade_anim">
                <Link to="/contact-us" className="wc-btn wc-btn-underline btn-text-flip">
                  <span data-text="Let’s Make Magic!">Let’s Make Magic!</span>
                  <img className="show-light" src="/assets/imgs/icon/arrow-right-half.webp" alt="Arrow" />
                  <img className="show-dark" src="/assets/imgs/icon/arrow-right-half-light.webp" alt="Arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={bannerRef}
          className={`thumb-wrapper hero-banner-wrap ${isBannerVisible ? 'is-visible' : ''}`}
        >
          <div className="hero-thumb">
            <img
              src="/assets/home-hearo-img.jpg"
              className="hero-banner-image"
              alt="Iconic Technologies Global Limited Showcase Banner"
              fetchpriority="high"
              width="1280"
              height="520"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
