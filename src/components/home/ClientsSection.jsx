import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clientLogos } from '../../data/siteData';

export default function ClientsSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let triggered = false;

    const triggerAnimation = () => {
      if (triggered) return;
      triggered = true;
      setIsInView(true);
    };

    const el = sectionRef.current;
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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} className="palletio-clients-section">
      <div className="container">
        {/* Dedicated Logo Grid Layout */}
        <motion.div
          className={`palletio-clients-grid animate__animated animate__fadeInUpBig ${isInView ? 'is-in-view' : ''}`}
          variants={fadeInUpBigVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Section Title (Col 3-5 on Desktop, Full Width Header on Tablet & Mobile) */}
          <div className="palletio-client-title-cell">
            <h2 className="palletio-client-main-title">
              Trusted by Bold<br />Brands Worldwide
            </h2>
          </div>

          {/* Row 1: Logo 1 (Flutterwave) in Col 2 */}
          <div className="palletio-client-box client-pos-rnp">
            <img
              src={clientLogos[0]}
              alt="Flutterwave Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>

          {/* Row 2: 5 Client Logos */}
          <div className="palletio-client-box client-pos-nostalgia">
            <img
              src={clientLogos[1]}
              alt="Paystack Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>
          <div className="palletio-client-box client-pos-genie">
            <img
              src={clientLogos[2]}
              alt="Moniepoint Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>
          <div className="palletio-client-box client-pos-kabadi">
            <img
              src={clientLogos[3]}
              alt="Kuda Bank Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>
          <div className="palletio-client-box client-pos-flowmark">
            <img
              src={clientLogos[4]}
              alt="Interswitch Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>
          <div className="palletio-client-box client-pos-caindia">
            <img
              src={clientLogos[5]}
              alt="Piggyvest Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>

          {/* Row 3: 5 Client Logos */}
          <div className="palletio-client-box client-pos-nextag">
            <img
              src={clientLogos[6]}
              alt="Dangote Group Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>
          <div className="palletio-client-box client-pos-ark">
            <img
              src={clientLogos[7]}
              alt="OPay Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>
          <div className="palletio-client-box client-pos-payrupya">
            <img
              src={clientLogos[8]}
              alt="MTN Nigeria Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>
          <div className="palletio-client-box client-pos-edwins">
            <img
              src={clientLogos[9]}
              alt="FairMoney Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>
          <div className="palletio-client-box client-pos-papertowns">
            <img
              src={clientLogos[10]}
              alt="Nomba Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>

          {/* Row 4: Carbon in Col 4 */}
          <div className="palletio-client-box client-pos-sleepfree">
            <img
              src={clientLogos[11]}
              alt="Carbon Logo"
              loading="lazy"
              width="140"
              height="60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
