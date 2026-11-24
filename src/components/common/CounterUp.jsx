import React, { useEffect, useRef, useState } from 'react';

/**
 * CounterUp Component
 * Smoothly animates numbers from `start` (default: 1) to `end`/`value`
 * when scrolled into the viewport with an elegant ease-out deceleration curve.
 * 
 * Supports strings like "250+", "98%", "40+", "$500k", etc.
 */
export default function CounterUp({
  as: Component = 'span',
  value,
  end,
  start = 1,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  style = {},
  threshold = 0.15,
  ...rest
}) {
  // Parse target number, prefix, and suffix
  let targetNumber = end;
  let detectedPrefix = prefix;
  let detectedSuffix = suffix;

  if (value !== undefined && value !== null) {
    if (typeof value === 'number') {
      targetNumber = value;
    } else {
      const str = String(value).trim();
      const match = str.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
      if (match) {
        detectedPrefix = prefix || match[1] || '';
        targetNumber = parseFloat(match[2]);
        detectedSuffix = suffix || match[3] || '';
      } else {
        targetNumber = parseFloat(str) || 0;
      }
    }
  }

  const numericTarget = typeof targetNumber === 'number' && !isNaN(targetNumber) ? targetNumber : 0;
  const isDecimal = !Number.isInteger(numericTarget);
  const decimalPlaces = isDecimal ? (String(numericTarget).split('.')[1]?.length || 1) : 0;

  // Initial state starts at `start`
  const [count, setCount] = useState(() => Math.min(start, numericTarget));
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Respect reduced motion accessibility
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(numericTarget);
      setHasAnimated(true);
      return;
    }

    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            let startTime = null;
            let animationFrameId = null;

            const animate = (currentTime) => {
              if (!startTime) startTime = currentTime;
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease Out Cubic: 1 - (1 - progress)^3
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = start + (numericTarget - start) * easeProgress;

              if (isDecimal) {
                setCount(parseFloat(currentVal.toFixed(decimalPlaces)));
              } else {
                setCount(Math.round(currentVal));
              }

              if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
              } else {
                setCount(numericTarget);
              }
            };

            animationFrameId = requestAnimationFrame(animate);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [numericTarget, start, duration, hasAnimated, isDecimal, decimalPlaces, threshold]);

  return (
    <Component
      ref={elementRef}
      className={className}
      style={{
        fontVariantNumeric: 'tabular-nums',
        ...style
      }}
      {...rest}
    >
      {detectedPrefix}{count}{detectedSuffix}
    </Component>
  );
}
