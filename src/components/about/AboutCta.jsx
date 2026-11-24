import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

export default function AboutCta() {
  const [isBadgeInView, setIsBadgeInView] = useState(false);
  const [isTitleInView, setIsTitleInView] = useState(false);
  const [isSubtitleInView, setIsSubtitleInView] = useState(false);
  const [isActionsInView, setIsActionsInView] = useState(false);

  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const isPreloaderActive = () => {
      const preloaderEl = document.getElementById('preloader');
      return !!preloaderEl && !document.body.classList.contains('website-ready');
    };

    const items = [
      { ref: badgeRef, setInView: setIsBadgeInView, triggered: false },
      { ref: titleRef, setInView: setIsTitleInView, triggered: false },
      { ref: subtitleRef, setInView: setIsSubtitleInView, triggered: false },
      { ref: actionsRef, setInView: setIsActionsInView, triggered: false },
    ];

    const checkVisibility = () => {
      if (isPreloaderActive()) return;
      items.forEach((item) => {
        if (!item.triggered && item.ref.current) {
          const rect = item.ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight - 30) {
            item.triggered = true;
            item.setInView(true);
          }
        }
      });
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    const observers = [];
    if (typeof IntersectionObserver !== 'undefined') {
      items.forEach((item) => {
        if (item.ref.current) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && !item.triggered && !isPreloaderActive()) {
                  item.triggered = true;
                  item.setInView(true);
                  observer.unobserve(entry.target);
                }
              });
            },
            { rootMargin: '80px 0px -40px 0px' }
          );
          observer.observe(item.ref.current);
          observers.push({ observer, el: item.ref.current });
        }
      });
    }

    if (isPreloaderActive()) {
      window.addEventListener('website-ready', () => {
        setTimeout(checkVisibility, 50);
      }, { once: true });
    } else {
      checkVisibility();
    }

    const safetyTimer = setTimeout(() => {
      checkVisibility();
    }, 1800);

    return () => {
      window.removeEventListener('website-ready', checkVisibility);
      clearTimeout(safetyTimer);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      observers.forEach(({ observer, el }) => {
        if (observer && el) observer.unobserve(el);
      });
    };
  }, []);

  const fadeInUpBigVariants = {
    hidden: {
      opacity: 0,
      y: 70,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="palletio-cta-section">
      <div className="container">
        <div className="ICONIC-cta-banner">
          {/* Ambient Glow Accent */}
          <div className="ICONIC-cta-glow" />

          {/* Floating Pill Badge */}
          <motion.div
            ref={badgeRef}
            className={`ICONIC-cta-badge animate__animated animate__fadeInUpBig ${isBadgeInView ? 'is-in-view' : ''}`}
            variants={fadeInUpBigVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isBadgeInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="badge-dot" />
            <span>Ready To Scale Your Vision?</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            ref={titleRef}
            className={`ICONIC-cta-title animate__animated animate__fadeInUpBig ${isTitleInView ? 'is-in-view' : ''}`}
            variants={fadeInUpBigVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isTitleInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
            transition={{ delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
          >
            Start your experience with<br />
            <span className="text-gradient-cyan">Iconic Technologies</span>
          </motion.h2>

          {/* Subtitle Description */}
          <motion.p
            ref={subtitleRef}
            className={`ICONIC-cta-subtitle animate__animated animate__fadeInUpBig ${isSubtitleInView ? 'is-in-view' : ''}`}
            variants={fadeInUpBigVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isSubtitleInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
            transition={{ delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
            From strategic brand elevation to full-stack engineering, we architect digital excellence that drives measurable business growth.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            ref={actionsRef}
            className={`ICONIC-cta-actions animate__animated animate__fadeInUpBig ${isActionsInView ? 'is-in-view' : ''}`}
            variants={fadeInUpBigVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isActionsInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
            transition={{ delay: 0.3 }}
            style={{ willChange: "transform, opacity" }}
          >
            <Link to="/contact-us" className="ICONIC-cta-btn primary-btn">
              <span>Let’s Build Something Iconic</span>
              <span className="btn-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </span>
            </Link>
            <Link to="/portfolio" className="ICONIC-cta-btn secondary-btn">
              <span>Explore Portfolio</span>
            </Link>
          </motion.div>

          {/* Trust Highlights */}
          <div className="ICONIC-cta-perks">
            <div className="perk-item">
              <span className="perk-check">✓</span> Rapid 2-Week Sprints
            </div>
            <div className="perk-item">
              <span className="perk-check">✓</span> Enterprise-Grade Security
            </div>
            <div className="perk-item">
              <span className="perk-check">✓</span> 100% On-Time Delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
