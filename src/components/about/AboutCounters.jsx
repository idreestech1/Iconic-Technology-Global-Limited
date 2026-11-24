import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CounterUp from '../common/CounterUp';

export default function AboutCounters() {
  const [isBox1InView, setIsBox1InView] = useState(false);
  const [isBox2InView, setIsBox2InView] = useState(false);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let triggered1 = false;
    let triggered2 = false;

    const isPreloaderActive = () => {
      const preloaderEl = document.getElementById('preloader');
      return !!preloaderEl && !document.body.classList.contains('website-ready');
    };

    const trigger1 = () => {
      if (isPreloaderActive()) return;
      if (triggered1) return;
      triggered1 = true;
      setIsBox1InView(true);
    };

    const trigger2 = () => {
      if (isPreloaderActive()) return;
      if (triggered2) return;
      triggered2 = true;
      setIsBox2InView(true);
    };

    const el1 = box1Ref.current;
    const el2 = box2Ref.current;

    // Checks if the element enters the viewport (natural smooth trigger)
    const checkVisibility = () => {
      if (isPreloaderActive()) return;

      if (!triggered1 && el1) {
        const rect = el1.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 40 && rect.bottom >= 0) {
          trigger1();
        }
      }

      if (!triggered2 && el2) {
        const rect = el2.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 40 && rect.bottom >= 0) {
          trigger2();
        }
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    let observer1;
    let observer2;

    if (typeof IntersectionObserver !== 'undefined') {
      if (el1) {
        observer1 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !isPreloaderActive()) {
                trigger1();
                observer1?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: '0px 0px -40px 0px' }
        );
        observer1.observe(el1);
      }

      if (el2) {
        observer2 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !isPreloaderActive()) {
                trigger2();
                observer2?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: '0px 0px -40px 0px' }
        );
        observer2.observe(el2);
      }
    }

    if (isPreloaderActive()) {
      window.addEventListener('website-ready', () => {
        setTimeout(checkVisibility, 50);
      }, { once: true });
    } else {
      checkVisibility();
    }

    const mountTimer = setTimeout(checkVisibility, 200);

    const safetyTimer = setTimeout(() => {
      checkVisibility();
    }, 1750);

    return () => {
      window.removeEventListener('website-ready', checkVisibility);
      clearTimeout(mountTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      if (observer1 && el1) observer1.unobserve(el1);
      if (observer2 && el2) observer2.unobserve(el2);
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

  return (
    <div className="counter-area">
      <div className="counter-area-inner">
        <div className="thumb">
          <img
            src="/assets/imgs/gallery/aboutImg.jpg"
            alt="Palletio Design Studio workspace"
            loading="lazy"
            width="800"
            height="600"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="counter-wrapper-box">
          <div className="counter-wrapper">
            <div className="thumb overflow-hidden">
              <img
                src="/assets/imgs/gallery/aboutImg2.jpg"
                alt="Palletio Design Showcase"
                loading="lazy"
                width="400"
                height="300"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div ref={box1Ref} className="counter-box">
              <motion.p
                className={`text animate__animated animate__fadeInUp ${isBox1InView ? 'is-in-view' : ''}`}
                variants={fadeInUpVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={isBox1InView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                style={{ willChange: "transform, opacity" }}
              >
                We have 250+ Satisfied Clients
              </motion.p>
              <CounterUp as="h2" className="number wc-counter" value="250+" start={1} duration={2000} />
            </div>
            <div ref={box2Ref} className="counter-box dark">
              <motion.p
                className={`text animate__animated animate__fadeInUp ${isBox2InView ? 'is-in-view' : ''}`}
                variants={fadeInUpVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={isBox2InView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                style={{ willChange: "transform, opacity" }}
              >
                Client Satisfaction Rate
              </motion.p>
              <CounterUp as="h2" className="number wc-counter" value="98%" start={1} duration={2000} />
            </div>
            <div className="thumb overflow-hidden">
              <img
                src="/assets/imgs/gallery/aboutImg3.jpg"
                alt="Creative Collaboration"
                loading="lazy"
                width="400"
                height="300"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
