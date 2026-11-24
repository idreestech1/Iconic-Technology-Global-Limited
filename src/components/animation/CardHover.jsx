import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * CardHover Component
 */
export default function CardHover({
  children,
  y = -6,
  scale = 1.02,
  tapScale = 0.98,
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

  return (
    <MotionComponent
      className={className}
      whileHover={{
        y,
        scale,
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{
        scale: tapScale,
        transition: { duration: 0.15, ease: 'easeOut' },
      }}
      style={{ willChange: 'transform' }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
