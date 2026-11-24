import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function AboutHero() {
  const [isTitleInView, setIsTitleInView] = useState(false);
  const [isContentInView, setIsContentInView] = useState(false);
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let triggered = false;
    let t1 = null;
    let t2 = null;

    const startAnimations = () => {
      if (triggered) return;
      triggered = true;

      // 1. Headline title floats up first right as page finishes opening
      t1 = setTimeout(() => {
        setIsTitleInView(true);
      }, 100);

      // 2. Left subtitle and Right text slide in next with smooth stagger
      t2 = setTimeout(() => {
        setIsContentInView(true);
      }, 280);
    };

    // Check if preloader is currently active on the page
    const isPreloaderActive = () => {
      const preloaderEl = document.getElementById('preloader');
      return !!preloaderEl && !document.body.classList.contains('website-ready');
    };

    if (isPreloaderActive()) {
      // Curtains are active: wait strictly until preloader curtains slide completely open
      window.addEventListener('website-ready', startAnimations, { once: true });
    } else {
      // Page is already open: run animation with brief settling pause
      t1 = setTimeout(startAnimations, 150);
    }

    // Safety fallback: if custom event timing was offset, trigger after curtain duration (1350ms)
    const fallbackTimer = setTimeout(() => {
      startAnimations();
    }, 1550);

    return () => {
      window.removeEventListener('website-ready', startAnimations);
      clearTimeout(fallbackTimer);
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, []);

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeInLeftVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeInRightVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} className="about-hero-area">
      <div className="container large">
        <div className="about-hero-area-inner">
          <div className="section-content">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <motion.h1
                  className={`section-title animate__animated animate__fadeInUp ${isTitleInView ? 'is-in-view' : ''}`}
                  variants={fadeInUpVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  animate={isTitleInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                  style={{ willChange: "transform, opacity" }}
                >
                  Architecting Digital Excellence.<br className="d-none d-md-inline" /> Designing Global Impact.
                </motion.h1>
              </div>
            </div>
            <div className="content-last">
              <motion.div
                className={`subtitle-wrapper animate__animated animate__fadeInLeft ${isContentInView ? 'is-in-view' : ''}`}
                variants={fadeInLeftVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={isContentInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                style={{ willChange: "transform, opacity" }}
              >
                <span className="section-subtitle has-right-line">01. About Iconic Technologies</span>
              </motion.div>
              <motion.div
                className={`text-wrapper animate__animated animate__fadeInRight ${isContentInView ? 'is-in-view' : ''}`}
                variants={fadeInRightVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={isContentInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                style={{ willChange: "transform, opacity" }}
              >
                <p className="text">
                  <strong>Iconic Technologies Global Limited (RC 8967406)</strong> is a formally incorporated LLC, engineering scalable digital ecosystems for ambitious brands worldwide. We bridge the gap between world-class software development and high-converting visual identity, building the digital infrastructure necessary for global market positioning.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
