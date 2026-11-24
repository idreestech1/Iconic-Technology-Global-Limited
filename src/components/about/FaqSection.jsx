import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { aboutFaqs } from '../../data/siteData';

export default function FaqSection() {
  const [activeId, setActiveId] = useState('faq-2');
  const [isTitleInView, setIsTitleInView] = useState(false);
  const [isAccordionInView, setIsAccordionInView] = useState(false);

  const titleRef = useRef(null);
  const accordionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleAccordion = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const isPreloaderActive = () => {
      const preloaderEl = document.getElementById('preloader');
      return !!preloaderEl && !document.body.classList.contains('website-ready');
    };

    const items = [
      { ref: titleRef, setInView: setIsTitleInView, triggered: false },
      { ref: accordionRef, setInView: setIsAccordionInView, triggered: false },
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
      y: 80,
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
    <section className="faq-area">
      <div className="container">
        <div className="faq-area-inner section-spacing-bottom">
          <div className="section-content">
            <div className="thumb">
              <img
                src="/assets/imgs/gallery/faqimg.jpg"
                alt="Palletio Design & Development Process"
                loading="lazy"
                width="600"
                height="700"
                style={{ width: '100%', height: 'auto', borderRadius: '14px' }}
              />
            </div>
            <div className="content-last">
              <div className="section-title-wrapper mb-4">
                <div className="title-wrapper">
                  <motion.h2
                    ref={titleRef}
                    className={`section-title animate__animated animate__fadeInUpBig ${isTitleInView ? 'is-in-view' : ''}`}
                    variants={fadeInUpBigVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate={isTitleInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                    style={{ willChange: "transform, opacity" }}
                  >
                    Working Across Design, Development & Digital Strategy
                  </motion.h2>
                </div>
              </div>

              <motion.div
                ref={accordionRef}
                className={`accordion-wrapper animate__animated animate__fadeInUpBig ${isAccordionInView ? 'is-in-view' : ''}`}
                variants={fadeInUpBigVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={isAccordionInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                transition={{ delay: 0.15 }}
                style={{ willChange: "transform, opacity" }}
              >
                <div className="accordion accordion-flush" id="accordionFlushExample">
                  {aboutFaqs.map((faq) => {
                    const isOpen = activeId === faq.id;
                    return (
                      <div className="accordion-item" key={faq.id}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => toggleAccordion(faq.id)}
                            aria-expanded={isOpen}
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          className={`faq-answer-collapse ${isOpen ? 'open' : ''}`}
                          style={{
                            maxHeight: isOpen ? '200px' : '0',
                            overflow: 'hidden',
                            transition: 'all 0.35s ease'
                          }}
                        >
                          <div className="accordion-body p-4" style={{ color: 'var(--palletio-subtext)', fontSize: '16px', lineHeight: '1.6' }}>
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
