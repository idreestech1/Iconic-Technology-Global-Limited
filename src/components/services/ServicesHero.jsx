import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ServicesHero() {
  const [isTitleInView, setIsTitleInView] = useState(false);
  const [isDescInView, setIsDescInView] = useState(false);
  const [isIconInView, setIsIconInView] = useState(false);
  const [isThumbInView, setIsThumbInView] = useState(false);

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const iconRef = useRef(null);
  const thumbRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const isPreloaderActive = () => {
      const preloaderEl = document.getElementById('preloader');
      return !!preloaderEl && !document.body.classList.contains('website-ready');
    };

    const items = [
      { ref: titleRef, setInView: setIsTitleInView, triggered: false },
      { ref: descRef, setInView: setIsDescInView, triggered: false },
      { ref: iconRef, setInView: setIsIconInView, triggered: false },
      { ref: thumbRef, setInView: setIsThumbInView, triggered: false },
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
      setTimeout(checkVisibility, 100);
    }

    const fallbackTimer = setTimeout(() => {
      items.forEach((item) => {
        if (!item.triggered && item.ref.current) {
          item.triggered = true;
          item.setInView(true);
        }
      });
    }, 1800);

    return () => {
      window.removeEventListener('website-ready', checkVisibility);
      clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      observers.forEach(({ observer, el }) => {
        if (observer && el) observer.unobserve(el);
      });
    };
  }, []);

  const fadeInDownBigVariants = {
    hidden: {
      opacity: 0,
      y: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

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

  const fadeInVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="hero-area1">
      <div className="container">
        <div className="hero-area1-inner">
          <div className="section-content">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <motion.h1
                  ref={titleRef}
                  className={`section-title animate__animated animate__fadeInDownBig ${isTitleInView ? 'is-in-view' : ''}`}
                  variants={fadeInDownBigVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  animate={isTitleInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                  style={{ willChange: "transform, opacity" }}
                >
                  'We make design that lead and inspire.
                </motion.h1>
              </div>
            </div>
            <motion.div
              ref={descRef}
              className={`text-wrapper animate__animated animate__fadeInUp ${isDescInView ? 'is-in-view' : ''}`}
              variants={fadeInUpVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={isDescInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
              transition={{ delay: 0.12 }}
              style={{ willChange: "transform, opacity" }}
            >
              <p className="text">
                We take a similar approach to design commercial we do impactfully approache, over the flowchart of user friendly wireframe.
              </p>
            </motion.div>
            <motion.div
              ref={iconRef}
              className={`icon animate__animated animate__fadeInUp ${isIconInView ? 'is-in-view' : ''}`}
              variants={fadeInUpVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={isIconInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
              transition={{ delay: 0.25 }}
              style={{ willChange: "transform, opacity" }}
            >
              <img className="show-light" src="/assets/imgs/shape/img-s-82.webp" alt="Shape" />
              <img className="show-dark" src="/assets/imgs/shape/img-s-82-light.webp" alt="Shape" />
            </motion.div>
          </div>
          <motion.div
            ref={thumbRef}
            className={`thumb animate__animated animate__fadeIn ${isThumbInView ? 'is-in-view' : ''}`}
            variants={fadeInVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isThumbInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
            transition={{ delay: 0.15 }}
            style={{ willChange: "opacity" }}
          >
            <img
              src="/assets/imgs/gallery/servicImage.png"
              alt="Iconic Technologies Global Service Showcase"
              fetchpriority="high"
              width="630"
              height="676"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '630 / 676',
                objectFit: 'cover',
                objectPosition: 'top center',
                borderRadius: '0',
                display: 'block'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
