import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * FadeInView Component
 * High-performance, GPU-accelerated scroll reveal wrapper with cubic-bezier easing.
 */
export default function FadeInView({
  children,
  delay = 0,
  duration = 0.7,
  y = 40,
  x = 0,
  direction = 'up',
  viewportMargin = '-60px',
  once = true,
  scale = 1,
  ease = [0.22, 1, 0.36, 1],
  className = '',
  as = 'div',
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion();

  let initialY = y;
  let initialX = x;
  if (direction === 'up') {
    initialY = y !== 0 ? y : 40;
    initialX = 0;
  } else if (direction === 'down') {
    initialY = -(y !== 0 ? y : 40);
    initialX = 0;
  } else if (direction === 'left') {
    initialX = 40;
    initialY = 0;
  } else if (direction === 'right') {
    initialX = -40;
    initialY = 0;
  } else if (direction === 'none') {
    initialY = 0;
    initialX = 0;
  }

  const MotionComponent = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return (
      <MotionComponent
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin: viewportMargin }}
        transition={{ duration: 0.3, delay }}
        {...rest}
      >
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      className={className}
      initial={{
        opacity: 0,
        y: initialY,
        x: initialX,
        scale: scale,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease,
      }}
      style={{ willChange: 'transform, opacity' }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
