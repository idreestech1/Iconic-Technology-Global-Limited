import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * StaggerContainer Component
 * Orchestrates sequential cascade animations for children.
 */
export default function StaggerContainer({
  children,
  staggerDelay = 0.12,
  delayChildren = 0.05,
  viewportMargin = '-60px',
  once = true,
  className = '',
  as = 'div',
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  };

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      variants={containerVariants}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
