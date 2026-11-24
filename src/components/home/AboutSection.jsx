import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import CounterUp from '../common/CounterUp';

const HEADLINE_LINES = [
  "At Iconic Technologies,",
  "we’re more than just a",
  "technology partner - we’re",
  "digital architects, software",
  "engineers, and global",
  "growth strategists."
];

function MagneticCircleButton({
  to = "/services",
  isReady = true,
  custom = 2,
  variants,
}) {
  const containerRef = useRef(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [bubblePos, setBubblePos] = useState({ x: 85, y: 85 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Smoother, gentler magnetic pull relative to static container
    const distanceX = (e.clientX - centerX) * 0.32;
    const distanceY = (e.clientY - centerY) * 0.32;
    setMagneticPos({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setBubblePos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      setBubblePos({ x, y });
    }
    setIsHovered(false);
    setMagneticPos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      className={`btn-wrapper btn-move animate__animated animate__bounceInDown ${isReady ? "is-in-view" : ""}`}
      custom={custom}
      variants={variants}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={isReady ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: "transform, opacity" }}
    >
      <motion.div
        className="btn-move-wrapper"
        animate={
          !isReady || isHovered || shouldReduceMotion
            ? { y: 0 }
            : {
                y: [0, -8, 0],
                transition: {
                  duration: 4.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.4,
                },
              }
        }
      >
        <motion.div
          className="magnetic-btn-wrap"
          animate={{
            x: magneticPos.x,
            y: magneticPos.y,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            type: "spring",
            damping: 28,
            stiffness: 90,
            mass: 0.18,
          }}
          style={{ willChange: "transform" }}
        >
          <Link
            to={to}
            className={`wc-btn wc-btn-circle iconic-magnetic-circle ${isHovered ? "is-hovered" : ""}`}
            aria-label="Explore our Services"
          >
            <span
              className="iconic-hover-bubble"
              style={{
                left: `${bubblePos.x}px`,
                top: `${bubblePos.y}px`,
              }}
            />
            <span className="iconic-btn-text">
              Explore our<br />Services
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function AboutSection() {
  const [isInView, setIsInView] = useState(false);
  const [isInfoInView, setIsInfoInView] = useState(false);
  const sectionContentRef = useRef(null);
  const infoAreaRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll reveal effect for title & lines (triggers when 100px of section-content shows)
  useEffect(() => {
    let triggered = false;

    const triggerAnimation = () => {
      if (triggered) return;
      triggered = true;
      setIsInView(true);
    };

    const el = sectionContentRef.current;
    if (!el) return;

    // Checks if at least 100px of the component shows within the viewport
    const checkVisibility = () => {
      if (triggered || !el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 100 && rect.bottom >= 0) {
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
          rootMargin: '0px 0px -100px 0px',
        }
      );
      observer.observe(el);
    }

    // Initial check in case it's already showing on load/refresh
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      if (observer && el) observer.unobserve(el);
    };
  }, []);

  // Scroll reveal effect for info area (triggers when 80px of info area shows, moving 20px from bottom to top)
  useEffect(() => {
    let infoTriggered = false;

    const triggerInfo = () => {
      if (infoTriggered) return;
      infoTriggered = true;
      setIsInfoInView(true);
    };

    const infoEl = infoAreaRef.current;
    if (!infoEl) return;

    const checkInfoVisibility = () => {
      if (infoTriggered || !infoEl) return;
      const rect = infoEl.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 80 && rect.bottom >= 0) {
        triggerInfo();
      }
    };

    window.addEventListener('scroll', checkInfoVisibility, { passive: true });
    window.addEventListener('resize', checkInfoVisibility, { passive: true });

    let infoObserver;
    if (typeof IntersectionObserver !== 'undefined') {
      infoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              triggerInfo();
            }
          });
        },
        {
          rootMargin: '0px 0px -80px 0px',
        }
      );
      infoObserver.observe(infoEl);
    }

    checkInfoVisibility();

    return () => {
      window.removeEventListener('scroll', checkInfoVisibility);
      window.removeEventListener('resize', checkInfoVisibility);
      if (infoObserver && infoEl) infoObserver.unobserve(infoEl);
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
        delay: shouldReduceMotion ? 0 : 0.06 + i * 0.09,
      },
    }),
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : 0.02,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : 0.08 + custom * 0.12,
      },
    }),
  };

  const bounceInDownVariants = {
    hidden: {
      opacity: 0,
      y: -120,
    },
    visible: (custom = 0) => ({
      opacity: 1,
      y: [-120, 20, -8, 4, 0],
      transition: {
        duration: 1.1,
        times: [0, 0.6, 0.75, 0.9, 1],
        ease: ["easeOut", "easeInOut", "easeInOut", "easeOut"],
        delay: shouldReduceMotion ? 0 : 0.12 + custom * 0.1,
      },
    }),
  };

  return (
    <section className="about-area">
      <div className="container">
        <div className="about-area-inner section-spacing-top">
          <div
            ref={sectionContentRef}
            className={`section-content ${isInView ? 'is-visible' : ''}`}
          >
            <div className="subtitle-wrapper">
              <div className="about-subtitle-mask">
                <motion.span
                  className="section-subtitle about-subtitle-inner"
                  variants={subtitleVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                >
                  Who we are
                </motion.span>
              </div>
            </div>
            <div className="content-last">
              <div className="section-title-wrapper">
                <div className="title-wrapper">
                  <h2
                    className="section-title"
                    aria-label="At Iconic Technologies, we’re more than just a technology partner - we’re digital architects, software engineers, and global growth strategists."
                  >
                    {HEADLINE_LINES.map((line, index) => (
                      <span className="about-line-mask" key={index}>
                        <motion.span
                          className="about-line-inner"
                          custom={index}
                          variants={lineVariants}
                          initial={shouldReduceMotion ? false : "hidden"}
                          animate={isInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                        >
                          {line}
                        </motion.span>
                      </span>
                    ))}
                  </h2>
                </div>
              </div>
              <div
                ref={infoAreaRef}
                className={`info-area ${isInfoInView ? 'is-visible' : ''}`}
              >
                <motion.div
                  className={`info-text animate__animated animate__fadeInUp ${isInfoInView ? 'is-in-view' : ''}`}
                  custom={0}
                  variants={fadeInUpVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  animate={isInfoInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                  style={{ willChange: "transform, opacity" }}
                >
                  <h3 className="number">
                    <CounterUp value={200} start={1} duration={2000} className="counter-val" />
                    <span className="counter-suffix">+</span>
                  </h3>
                  <p className="text">
                    Digital Ecosystems Engineered. We deliver zero-defect architecture and world-class design in every global deployment.
                  </p>
                </motion.div>
                <div className="info-last">
                  <motion.div
                    className={`text-wrapper animate__animated animate__fadeInUp ${isInfoInView ? 'is-in-view' : ''}`}
                    custom={1}
                    variants={fadeInUpVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate={isInfoInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <p className="text">
                      We provide a truly holistic approach to digital transformation. From crafting captivating visual identities and immersive storytelling experiences to engineering robust web and mobile architecture, we seamlessly bridge the gap between creative design and complex infrastructure.
                    </p>
                  </motion.div>
                  <MagneticCircleButton
                    to="/services"
                    isReady={isInfoInView}
                    custom={2}
                    variants={bounceInDownVariants}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
