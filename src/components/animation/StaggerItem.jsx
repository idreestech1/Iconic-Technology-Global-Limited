import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * StaggerItem Component
 * Cascading child item placed inside <StaggerContainer />.
 */
export default function StaggerItem({
  children,
  y = 35,
  x = 0,
  duration = 0.65,
  scale = 1,
  ease = [0.22, 1, 0.36, 1],
  whileHover = null,
  whileTap = null,
  className = '',
  as = 'div',
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : y,
      x: shouldReduceMotion ? 0 : x,
      scale: shouldReduceMotion ? 1 : scale,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : duration,
        ease,
      },
    },
  };

  const MotionComponent = motion[as] || motion.div;

  const resolvedWhileHover = whileHover === true
    ? { y: -6, scale: 1.02, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }
    : whileHover;

  const resolvedWhileTap = whileTap === true
    ? { scale: 0.98 }
    : whileTap;

  return (
    <MotionComponent
      className={className}
      variants={itemVariants}
      whileHover={resolvedWhileHover}
      whileTap={resolvedWhileTap}
      style={{ willChange: 'transform, opacity' }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
