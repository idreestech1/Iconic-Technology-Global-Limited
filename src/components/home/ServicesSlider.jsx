import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { services } from '../../data/siteData';

const TITLE_LINES = [
  "Our exclusive",
  "services"
];

export default function ServicesSlider() {
  const [isInView, setIsInView] = useState(false);
  const topWrapperRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let triggered = false;

    const triggerAnimation = () => {
      if (triggered) return;
      triggered = true;
      setIsInView(true);
    };

    const el = topWrapperRef.current;
    if (!el) return;

    // Checks if at least 80px of section top wrapper shows within the viewport
    const checkVisibility = () => {
      if (triggered || !el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 80 && rect.bottom >= 0) {
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
            if (entry.isIntersecting) {
              triggerAnimation();
            }
          });
        },
        {
          rootMargin: '0px 0px -80px 0px',
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

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : 0.06 + i * 0.16,
      },
    }),
  };

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : 0.28,
      },
    },
  };

  // Duplicate services array 4 times to ensure seamless infinite looping without gaps
  const duplicatedServices = [
    ...services,
    ...services,
    ...services,
    ...services
  ];

  return (
    <section className="service-area section-spacing">
      <div className="container">
        <div ref={topWrapperRef} className="service-top-wrapper">
          <div className="section-heading">
            <h2
              className="section-title"
              aria-label="Our exclusive services"
            >
              {TITLE_LINES.map((line, index) => (
                <span className="service-title-line-mask" key={index}>
                  <motion.span
                    className="service-title-line-inner"
                    custom={index}
                    variants={lineVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                    style={{
                      display: "block",
                      textAlign: "start",
                      position: "relative",
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>
          <motion.div
            className={`content animate__animated animate__fadeInUp ${isInView ? 'is-in-view' : ''}`}
            variants={fadeInUpVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
            style={{
              willChange: "transform, opacity",
            }}
          >
            <p className="text">
              We empower ambitious brands with tailor-made digital design and smart development.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="services-marquee-wrapper">
        <div className="container-hd">
          <div className="services-marquee-container">
            <div className="services-marquee-track">
              {duplicatedServices.map((service, index) => (
                <div className="service-item" key={`service-${index}`}>
                  <div className="icon">
                    <img
                      className="show-light"
                      src={service.icon}
                      alt={`${service.title} Icon`}
                      loading="lazy"
                      width="48"
                      height="48"
                    />
                  </div>
                  <h2 className="title">
                    <Link
                      to={`/service/${service.slug}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {service.shortTitle}
                    </Link>
                  </h2>
                  <ul className="service-features mb-4">
                    {service.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <Link
                    to={`/service/${service.slug}`}
                    className="wc-btn wc-btn-underline btn-text-flip text-white mt-auto"
                  >
                    <span data-text="Read More">Read More</span>
                    <img
                      className="show-light ms-2"
                      src="/assets/imgs/icon/arrow-right-half-light.webp"
                      alt="Arrow"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
