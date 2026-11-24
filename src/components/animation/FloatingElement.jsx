import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * FloatingElement Component
 */
export default function FloatingElement({
  children,
  floatDistance = 10,
  duration = 4.5,
  rotate = false,
  glow = false,
  glowColor = 'rgba(229, 255, 0, 0.22)',
  className = '',
  as = 'div',
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return (
      <MotionComponent className={className} {...rest}>
        {children}
      </MotionComponent>
    );
  }

  const animateProps = {
    y: [0, -floatDistance, 0],
  };

  if (rotate) {
    animateProps.rotate = [0, 1.2, 0, -1.2, 0];
  }

  return (
    <div className={`relative inline-block ${className}`} style={{ width: '100%' }}>
      {glow && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl -z-10"
          animate={{
            opacity: [0.35, 0.7, 0.35],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: duration * 0.9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(20px)',
          }}
        />
      )}
      <MotionComponent
        animate={animateProps}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ willChange: 'transform' }}
        {...rest}
      >
        {children}
      </MotionComponent>
    </div>
  );
}
