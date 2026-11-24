import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { services } from '../../data/siteData';

const renderServiceTitle = (service) => {
  const title = service.shortTitle || service.title;
  if (title === 'UI/UX Design') {
    return (
      <>
        UI/UX<br />Design
      </>
    );
  }
  if (title === 'Graphic Design') {
    return (
      <>
        Graphic<br />Design
      </>
    );
  }
  if (title === 'Branding & Rebranding') {
    return (
      <>
        Branding &<br />Rebranding
      </>
    );
  }
  if (title === 'App Development') {
    return (
      <>
        App<br />Development
      </>
    );
  }
  if (title === 'Website Development') {
    return (
      <>
        Website<br />Development
      </>
    );
  }
  if (title === 'Digital Marketing') {
    return (
      <>
        Digital<br />Marketing
      </>
    );
  }
  const parts = title.split(' ');
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}<br />{parts[1]}
      </>
    );
  }
  return title;
};

export default function ServicesGrid() {
  const [isInView, setIsInView] = useState(false);
  const [isGridInView, setIsGridInView] = useState(false);
  const topWrapperRef = useRef(null);
  const gridWrapperRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let topTriggered = false;
    let gridTriggered = false;

    const isWebsiteReady = () => {
      return document.body.classList.contains('website-ready') || !document.getElementById('preloader');
    };

    const triggerTop = () => {
      if (topTriggered) return;
      topTriggered = true;
      setIsInView(true);
    };

    const triggerGrid = () => {
      if (gridTriggered) return;
      gridTriggered = true;
      setIsGridInView(true);
    };

    const checkVisibility = () => {
      // Strictly wait until website properly loads
      if (!isWebsiteReady()) return;

      if (!topTriggered && topWrapperRef.current) {
        const rect = topWrapperRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 60 && rect.bottom >= 0) {
          triggerTop();
        }
      }

      if (!gridTriggered && gridWrapperRef.current) {
        const rect = gridWrapperRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 40 && rect.bottom >= 0) {
          triggerGrid();
        }
      }
    };

    const handleWebsiteReady = () => {
      setTimeout(checkVisibility, 80);
    };

    window.addEventListener('website-ready', handleWebsiteReady);
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    let topObserver;
    if (typeof IntersectionObserver !== 'undefined' && topWrapperRef.current) {
      topObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !topTriggered) {
              if (isWebsiteReady()) {
                triggerTop();
                topObserver.unobserve(entry.target);
              }
            }
          });
        },
        {
          rootMargin: '0px 0px -60px 0px',
        }
      );
      topObserver.observe(topWrapperRef.current);
    }

    let gridObserver;
    if (typeof IntersectionObserver !== 'undefined' && gridWrapperRef.current) {
      gridObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !gridTriggered) {
              if (isWebsiteReady()) {
                triggerGrid();
                gridObserver.unobserve(entry.target);
              }
            }
          });
        },
        {
          rootMargin: '0px 0px -40px 0px',
        }
      );
      gridObserver.observe(gridWrapperRef.current);
    }

    if (isWebsiteReady()) {
      checkVisibility();
    }

    return () => {
      window.removeEventListener('website-ready', handleWebsiteReady);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      if (topObserver && topWrapperRef.current) topObserver.unobserve(topWrapperRef.current);
      if (gridObserver && gridWrapperRef.current) gridObserver.unobserve(gridWrapperRef.current);
    };
  }, []);

  const fadeInVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : 0.28,
      },
    },
  };

  return (
    <section className="service-area services-page-area">
      <div className="container">
        <div ref={topWrapperRef} className="service-top-wrapper">
          <div className="section-heading">
            <h2
              className={`section-title animate__animated animate__bounceIn ${isInView ? 'is-in-view' : ''}`}
              aria-label="Our exclusive services"
            >
              Our exclusive<br />services
            </h2>
          </div>
          <motion.div
            className={`content animate__animated animate__fadeIn ${isInView ? 'is-in-view' : ''}`}
            variants={fadeInVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
            style={{
              willChange: "opacity",
            }}
          >
            <p className="text">
              We bet on brands that shift categories and add value to people's lives; and on founders who are motivated to shape tomorrow.
            </p>
          </motion.div>
        </div>

        <div ref={gridWrapperRef} className="services-wrapper-box">
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                className={`service-item animate__animated animate__fadeIn ${isGridInView ? 'is-in-view' : ''}`}
                key={service.id}
                style={{
                  animationDelay: shouldReduceMotion ? '0s' : `${(index % 4) * 0.12}s`,
                }}
              >
                <div className="icon">
                  <Link to={`/service/${service.slug}`} aria-label={service.title}>
                    <img
                      className="show-light"
                      src={service.icon}
                      alt={service.title}
                      loading="lazy"
                      width="52"
                      height="52"
                    />
                  </Link>
                </div>
                <h3 className="title">
                  <Link to={`/service/${service.slug}`} className="service-title-link">
                    {renderServiceTitle(service)}
                  </Link>
                </h3>
                <ul className="service-features">
                  {service.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
