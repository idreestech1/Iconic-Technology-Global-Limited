import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { testimonials } from '../../data/siteData';

export default function TestimonialsSlider() {
  const [startIndex, setStartIndex] = useState(0);
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
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : 0.05 + custom * 0.12,
      },
    }),
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  const firstItem = testimonials[startIndex];
  const secondItem = testimonials[(startIndex + 1) % testimonials.length];
  const visibleCards = [firstItem, secondItem];

  return (
    <section ref={sectionRef} className="palletio-testimonial-section">
      <div className="container">
        {/* Section Heading */}
        <motion.div
          className={`palletio-testimonial-header animate__animated animate__fadeInUpBig ${isInView ? 'is-in-view' : ''}`}
          custom={0}
          variants={fadeInUpBigVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="palletio-testimonial-title-wrap">
            <div className="palletio-decor-rings">
              <span className="decor-ring"></span>
              <span className="decor-dot"></span>
            </div>
            <h2 className="palletio-testimonial-heading">
              What Our<br />
              Clients Say<br />
              About Us
            </h2>
          </div>
        </motion.div>

        <motion.div
          className={`palletio-testimonial-layout animate__animated animate__fadeInUpBig ${isInView ? 'is-in-view' : ''}`}
          custom={1}
          variants={fadeInUpBigVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Left: Rating Info Card with Navigation Arrows */}
          <div className="palletio-testimonial-rating-card">
            <div className="rating-card-top">
              <div className="rating-circle-icon">
                <span className="circle-ring"></span>
              </div>
              <h3 className="rating-score">4.9</h3>
              <div className="rating-stars-wrap">
                <div className="rating-stars" aria-label="5 out of 5 stars">
                  {'★'.repeat(5)}
                </div>
                <span className="reviews-count">(40+ reviews)</span>
              </div>
              <p className="rating-tagline">
                Real Stories. Real Results.<br />
                Voices Behind the Brands
              </p>
            </div>

            {/* Navigation buttons inside the rating card at bottom */}
            <div className="rating-card-arrows">
              <button
                onClick={prevSlide}
                className="testimonial-arrow-btn"
                aria-label="Previous testimonials"
                type="button"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                onClick={nextSlide}
                className="testimonial-arrow-btn"
                aria-label="Next testimonials"
                type="button"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Right: Two Testimonial Cards Side-by-Side */}
          <div className="palletio-testimonial-cards-row">
            {visibleCards.map((item, idx) => (
              <div className="palletio-testimonial-card" key={`${startIndex}-${idx}`}>
                <div className="quote-icon-wrap">
                  <svg width="36" height="30" viewBox="0 0 36 30" fill="none" aria-hidden="true">
                    <path
                      d="M0 17.5C0 9.5 4.5 3 13.5 0L15.5 3.5C10 5.5 8 8.5 7.5 12H15V30H0V17.5ZM21 17.5C21 9.5 25.5 3 34.5 0L36.5 3.5C31 5.5 29 8.5 28.5 12H36V30H21V17.5Z"
                      fill="#888888"
                    />
                  </svg>
                </div>
                <p className="testimonial-quote-text">
                  "{item.quote}"
                </p>
                <div className="testimonial-author-meta">
                  <h4 className="author-name">{item.author}</h4>
                  <span className="author-role">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
