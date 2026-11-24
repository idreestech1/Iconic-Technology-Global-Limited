import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CounterUp from '../common/CounterUp';

export default function CounterSection() {
  const [isInView, setIsInView] = useState(false);
  const headerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let triggered = false;

    const triggerAnimation = () => {
      if (triggered) return;
      triggered = true;
      setIsInView(true);
    };

    const el = headerRef.current;
    if (!el) return;

    // Checks if at least 30% of the component is visible on screen
    const checkVisibility = () => {
      if (triggered || !el) return;
      const rect = el.getBoundingClientRect();
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;
      if (ratio >= 0.3 || (rect.top <= window.innerHeight - (rect.height * 0.3) && rect.bottom >= 0)) {
        triggerAnimation();
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              triggerAnimation();
            }
          });
        },
        {
          threshold: [0.3],
        }
      );
      observer.observe(el);
    }

    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      if (observer && el) observer.unobserve(el);
    };
  }, []);

  const fadeInUpBigVariants = {
    hidden: {
      opacity: 0,
      y: 90,
    },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : 0.05 + custom * 0.12,
      },
    }),
  };

  const stats = [
    {
      number: '200+',
      title: 'Projects Delivered',
      description: 'From startups to enterprises — built with precision & flair.'
    },
    {
      number: '150+',
      title: 'Happy Clients',
      description: 'Designs that delight users and deliver measurable results.'
    },
    {
      number: '7+',
      title: 'Years of Experience',
      description: 'Blending creativity and strategy since day one.'
    },
    {
      number: '40+',
      title: 'Industries Served',
      description: 'Cross-industry insights that drive smarter design decisions.'
    }
  ];

  return (
    <section className="palletio-counter-section">
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`palletio-counter-header animate__animated animate__fadeInUpBig ${isInView ? 'is-in-view' : ''}`}
        >
          <motion.div
            className={`palletio-counter-col-sub animate__animated animate__fadeInUpBig ${isInView ? 'is-in-view' : ''}`}
            custom={0}
            variants={fadeInUpBigVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="palletio-counter-subtitle">
              <span className="sub-tag-bold">We</span>
              <span className="sub-tag-light">Proudly</span>
            </div>
          </motion.div>

          <motion.div
            className={`palletio-counter-col-title animate__animated animate__fadeInUpBig ${isInView ? 'is-in-view' : ''}`}
            custom={1}
            variants={fadeInUpBigVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="palletio-counter-main-title">
              <span className="title-word">Design.</span>
              <span className="title-word">Build.</span>
              <span className="title-word">Elevate.</span>
            </h2>
          </motion.div>

          <motion.div
            className={`palletio-counter-col-desc animate__animated animate__fadeInUpBig ${isInView ? 'is-in-view' : ''}`}
            custom={2}
            variants={fadeInUpBigVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
            style={{ willChange: "transform, opacity" }}
          >
            <p className="palletio-counter-description">
              We craft purpose-driven experiences with a bold creative mindset and a modern digital approach.
            </p>
          </motion.div>
        </div>

        {/* 4 Oval Stat Cards */}
        <div className="palletio-counter-cards-wrapper">
          <div className="palletio-counter-cards-grid">
            {stats.map((stat, idx) => (
              <div className="palletio-oval-card" key={idx}>
                <CounterUp as="div" className="palletio-oval-number" value={stat.number} start={1} duration={2000} />
                <h3 className="palletio-oval-title">{stat.title}</h3>
                <p className="palletio-oval-desc">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
