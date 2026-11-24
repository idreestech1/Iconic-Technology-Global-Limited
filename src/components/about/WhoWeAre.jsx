import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CounterUp from '../common/CounterUp';
import { siteInfo } from '../../data/siteData';

export default function WhoWeAre() {
  const [isSubtitleInView, setIsSubtitleInView] = useState(false);
  const [isTitleInView, setIsTitleInView] = useState(false);
  const [isDescInView, setIsDescInView] = useState(false);
  const [isMissionInView, setIsMissionInView] = useState(false);
  const [isVisionInView, setIsVisionInView] = useState(false);
  const [isCoreValuesTitleInView, setIsCoreValuesTitleInView] = useState(false);
  const [isValLeft1InView, setIsValLeft1InView] = useState(false);
  const [isValRight1InView, setIsValRight1InView] = useState(false);
  const [isValLeft2InView, setIsValLeft2InView] = useState(false);
  const [isValRight2InView, setIsValRight2InView] = useState(false);
  const [isGlobalModelInView, setIsGlobalModelInView] = useState(false);
  const [isThumb1InView, setIsThumb1InView] = useState(false);
  const [isThumb2InView, setIsThumb2InView] = useState(false);
  const [isStatDeploymentsInView, setIsStatDeploymentsInView] = useState(false);
  const [isStatMarketsInView, setIsStatMarketsInView] = useState(false);

  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const coreValuesTitleRef = useRef(null);
  const valLeft1Ref = useRef(null);
  const valRight1Ref = useRef(null);
  const valLeft2Ref = useRef(null);
  const valRight2Ref = useRef(null);
  const globalModelRef = useRef(null);
  const thumb1Ref = useRef(null);
  const thumb2Ref = useRef(null);
  const statDeploymentsRef = useRef(null);
  const statMarketsRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const isPreloaderActive = () => {
      const preloaderEl = document.getElementById('preloader');
      return !!preloaderEl && !document.body.classList.contains('website-ready');
    };

    const items = [
      { ref: subtitleRef, setInView: setIsSubtitleInView, triggered: false },
      { ref: titleRef, setInView: setIsTitleInView, triggered: false },
      { ref: descRef, setInView: setIsDescInView, triggered: false },
      { ref: missionRef, setInView: setIsMissionInView, triggered: false },
      { ref: visionRef, setInView: setIsVisionInView, triggered: false },
      { ref: coreValuesTitleRef, setInView: setIsCoreValuesTitleInView, triggered: false },
      { ref: valLeft1Ref, setInView: setIsValLeft1InView, triggered: false },
      { ref: valRight1Ref, setInView: setIsValRight1InView, triggered: false },
      { ref: valLeft2Ref, setInView: setIsValLeft2InView, triggered: false },
      { ref: valRight2Ref, setInView: setIsValRight2InView, triggered: false },
      { ref: globalModelRef, setInView: setIsGlobalModelInView, triggered: false },
      { ref: thumb1Ref, setInView: setIsThumb1InView, triggered: false },
      { ref: thumb2Ref, setInView: setIsThumb2InView, triggered: false },
      { ref: statDeploymentsRef, setInView: setIsStatDeploymentsInView, triggered: false },
      { ref: statMarketsRef, setInView: setIsStatMarketsInView, triggered: false },
    ];

    // Checks if the elements enter the viewport (triggers naturally as user scrolls)
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
            { rootMargin: '100px 0px -40px 0px' }
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

    const t1 = setTimeout(checkVisibility, 200);
    const t2 = setTimeout(checkVisibility, 500);
    const safetyTimer = setTimeout(() => {
      items.forEach((item) => {
        if (!item.triggered && item.ref.current) {
          const rect = item.ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight + 800) {
            item.triggered = true;
            item.setInView(true);
          }
        }
      });
    }, 1800);

    return () => {
      window.removeEventListener('website-ready', checkVisibility);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(safetyTimer);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      observers.forEach(({ observer, el }) => {
        if (observer && el) observer.unobserve(el);
      });
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
    <section className="awards-area">
      <div className="container">
        <div className="awards-area-inner section-spacing">
          <div className="section-header">
            <div className="section-title-wrapper">
              <motion.div
                ref={subtitleRef}
                className={`subtitle-wrapper animate__animated animate__fadeInRight ${isSubtitleInView ? 'is-in-view' : ''}`}
                variants={fadeInRightVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={isSubtitleInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                style={{ willChange: "transform, opacity" }}
              >
                <span className="section-subtitle has-left-line">02. Who We Are</span>
              </motion.div>
              <div ref={titleRef} className="title-wrapper">
                <motion.h2
                  className={`section-title animate__animated animate__fadeInUp ${isTitleInView ? 'is-in-view' : ''}`}
                  variants={fadeInUpVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  animate={isTitleInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                  style={{ willChange: "transform, opacity" }}
                >
                  About Iconic Technologies Global Limited
                </motion.h2>
              </div>
            </div>
          </div>

          <div className="section-content">
            <div ref={descRef} className="text-wrapper">
              <motion.p
                className={`text mb-4 animate__animated animate__fadeInLeft ${isDescInView ? 'is-in-view' : ''}`}
                variants={fadeInLeftVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={isDescInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                style={{ fontSize: '16px', lineHeight: '1.8', willChange: "transform, opacity" }}
              >
                <strong>Iconic Technologies Global Limited</strong> is a premier, globally recognized technology partner dedicated to empowering startups, enterprises, and corporate organizations. We provide a truly holistic approach to digital transformation, ensuring your business thrives at every touchpoint. From crafting captivating visual identities and immersive storytelling experiences to engineering robust web and mobile architecture, we seamlessly bridge the gap between creative design and complex infrastructure. By integrating data-driven business growth strategies and rigorous IT governance, we deliver secure, scalable, and intuitive digital ecosystems built to position our clients at the forefront of the global market.
              </motion.p>

              {/* Mission & Vision Cards */}
              <div className="row g-4 my-4">
                <div className="col-md-6">
                  <motion.div
                    ref={missionRef}
                    className={`animate__animated animate__fadeInRight ${isMissionInView ? 'is-in-view' : ''}`}
                    variants={fadeInRightVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate={isMissionInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '24px',
                      height: '100%',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                      willChange: "transform, opacity"
                    }}
                  >
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: 'rgba(37, 99, 235, 0.12)',
                          color: '#2563eb'
                        }}
                      >
                        <i className="fa-solid fa-bullseye"></i>
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                        Mission Statement
                      </h3>
                    </div>
                    <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                      {siteInfo?.about?.mission || 'To architect world-class digital ecosystems, high-performance software, and enduring brand identities that empower businesses to scale seamlessly and lead their markets globally.'}
                    </p>
                  </motion.div>
                </div>

                <div className="col-md-6">
                  <motion.div
                    ref={visionRef}
                    className={`animate__animated animate__fadeInLeft ${isVisionInView ? 'is-in-view' : ''}`}
                    variants={fadeInLeftVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate={isVisionInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '24px',
                      height: '100%',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                      willChange: "transform, opacity"
                    }}
                  >
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: 'rgba(37, 99, 235, 0.12)',
                          color: '#2563eb'
                        }}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                        Vision Statement
                      </h3>
                    </div>
                    <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                      {siteInfo?.about?.vision || 'To become the premier global technology partner recognized for engineering excellence, zero-defect architecture, and transformative digital experiences.'}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Core Values */}
              <div className="my-5">
                <motion.h3
                  ref={coreValuesTitleRef}
                  className={`mb-4 animate__animated animate__fadeInUp ${isCoreValuesTitleInView ? 'is-in-view' : ''}`}
                  variants={fadeInUpVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  animate={isCoreValuesTitleInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                  style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', willChange: "transform, opacity" }}
                >
                  Our Core Values
                </motion.h3>
                <div className="row g-3">
                  {(siteInfo?.about?.coreValues || [
                    { title: 'Engineering Rigor', description: 'Zero-compromise approach to code quality, system security, and high-availability architecture.' },
                    { title: 'Human-Centered Design', description: 'Transforming complex technical capabilities into intuitive, frictionless user journeys.' },
                    { title: 'Speed & Predictability', description: 'Agile sprint cadence with transparent milestone delivery and proactive communication.' },
                    { title: 'Compounding Business Value', description: 'Building resilient solutions designed to maximize conversion, retention, and long-term ROI.' }
                  ]).map((val, idx) => {
                    const isLeftCard1 = idx === 0;  // Engineering Rigor (fadeInRight)
                    const isRightCard1 = idx === 1; // Human-Centered Design (fadeInLeft)
                    const isLeftCard2 = idx === 2;  // Speed & Predictability (fadeInRight)
                    const isRightCard2 = idx === 3; // Compounding Business Value (fadeInLeft)

                    const isLeftCol = isLeftCard1 || isLeftCard2;

                    const cardRef = isLeftCard1 ? valLeft1Ref : isRightCard1 ? valRight1Ref : isLeftCard2 ? valLeft2Ref : valRight2Ref;
                    const cardInView = isLeftCard1 ? isValLeft1InView : isRightCard1 ? isValRight1InView : isLeftCard2 ? isValLeft2InView : isValRight2InView;
                    const animClass = isLeftCol ? 'animate__fadeInRight' : 'animate__fadeInLeft';
                    const variants = isLeftCol ? fadeInRightVariants : fadeInLeftVariants;

                    return (
                      <div className="col-md-6" key={idx}>
                        <motion.div
                          ref={cardRef}
                          className={`animate__animated ${animClass} ${cardInView ? 'is-in-view' : ''}`}
                          variants={variants}
                          initial={shouldReduceMotion ? false : "hidden"}
                          animate={cardInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderLeft: '4px solid #2563eb',
                            padding: '18px 20px',
                            borderRadius: '0 12px 12px 0',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
                            height: '100%',
                            willChange: "transform, opacity"
                          }}
                        >
                          <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                            {val.title}
                          </h4>
                          <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                            {val.description}
                          </p>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Global Operating Model */}
              <motion.div
                ref={globalModelRef}
                className={`p-4 my-4 animate__animated animate__fadeInUp ${isGlobalModelInView ? 'is-in-view' : ''}`}
                variants={fadeInUpVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={isGlobalModelInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                style={{
                  background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
                  border: '1px solid #bfdbfe',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(37, 99, 235, 0.06)',
                  willChange: "transform, opacity"
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span style={{ fontSize: '22px' }}>🌍</span>
                  <h3 style={{ fontSize: '19px', fontWeight: 700, margin: 0, color: '#1e3a8a' }}>
                    Our Global Operating Model
                  </h3>
                </div>
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  {siteInfo?.about?.globalOperatingModel || 'Operating with a distributed team of senior software engineers, UI/UX architects, and product strategists, Iconic Technologies delivers 24/7 velocity, rapid cross-timezone collaboration, and bank-grade data security protocols across every engagement.'}
                </p>
              </motion.div>
            </div>

            <div className="awards-list">
              <ul>
                <li>
                  <motion.div
                    ref={statDeploymentsRef}
                    className={`meta animate__animated animate__fadeInRight ${isStatDeploymentsInView ? 'is-in-view' : ''}`}
                    variants={fadeInRightVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate={isStatDeploymentsInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className="icon">
                      <img className="show-light" src="/assets/imgs/icon/icon-s-40.webp" alt="Projects Icon" />
                      <img className="show-dark" src="/assets/imgs/icon/icon-s-40-light.webp" alt="Projects Icon" />
                    </div>
                    <div className="content">
                      <CounterUp as="h3" className="number wc-counter" value="250+" start={1} duration={2000} />
                      <p className="text">Global Deployments Completed</p>
                    </div>
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    ref={statMarketsRef}
                    className={`meta animate__animated animate__fadeInLeft ${isStatMarketsInView ? 'is-in-view' : ''}`}
                    variants={fadeInLeftVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate={isStatMarketsInView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className="icon">
                      <img className="show-light" src="/assets/imgs/icon/icon-s-41.webp" alt="Industries Icon" />
                      <img className="show-dark" src="/assets/imgs/icon/icon-s-41-light.webp" alt="Industries Icon" />
                    </div>
                    <div className="content">
                      <CounterUp as="h3" className="number wc-counter" value="40+" start={1} duration={2000} />
                      <p className="text">International Markets Impacted</p>
                    </div>
                  </motion.div>
                </li>
              </ul>
            </div>
          </div>

          <div className="about-thumbs">
            <motion.div
              ref={thumb1Ref}
              className={`thumb-first animate__animated animate__fadeInUpBig ${isThumb1InView ? 'is-in-view' : ''}`}
              variants={fadeInUpBigVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={isThumb1InView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
              style={{ willChange: "transform, opacity" }}
            >
              <img
                src="/assets/imgs/gallery/weareImg1.jpg"
                alt="Iconic Technologies Global Engineering Team"
                loading="lazy"
                width="600"
                height="400"
              />
            </motion.div>
            <motion.div
              ref={thumb2Ref}
              className={`thumb-second animate__animated animate__fadeInUpBig ${isThumb2InView ? 'is-in-view' : ''}`}
              variants={fadeInUpBigVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={isThumb2InView ? "visible" : (shouldReduceMotion ? "visible" : "hidden")}
              transition={{ delay: 0.15 }}
              style={{ willChange: "transform, opacity" }}
            >
              <img
                src="/assets/imgs/gallery/weareImg2.jpg"
                alt="Iconic Technologies Digital Strategy Sessions"
                loading="lazy"
                width="600"
                height="400"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
