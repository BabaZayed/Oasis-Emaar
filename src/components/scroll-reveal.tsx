"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  once?: boolean;
  /** Use cinematic scale-in with blur effect */
  cinematic?: boolean;
  /** Use clip-path reveal (like curtains opening) */
  clipReveal?: boolean;
  /** Parallax depth factor (0 = none, 0.5 = subtle, 1 = moderate). Only works on immediate children wrapper */
  parallax?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
  cinematic = false,
  clipReveal = false,
  parallax,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const directionMap = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  const offset = directionMap[direction];

  // Cinematic: scale-in with blur dissolve
  if (cinematic) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, scale: 0.92, y: 30, filter: "blur(4px)" }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.92, y: 30, filter: "blur(4px)" }
        }
        transition={{
          duration: duration + 0.2,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    );
  }

  // Clip reveal: elegant curtain effect
  if (clipReveal) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
        animate={
          isInView
            ? { clipPath: "inset(0 0 0 0)", opacity: 1 }
            : { clipPath: "inset(100% 0 0 0)", opacity: 0 }
        }
        transition={{
          duration: duration + 0.3,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    );
  }

  // Parallax: subtle depth shift on scroll
  if (parallax && parallax > 0) {
    return (
      <ParallaxWrapper parallax={parallax} className={className}>
        <div ref={ref}>{children}</div>
      </ParallaxWrapper>
    );
  }

  // Default: directional fade
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/** Internal parallax wrapper that shifts content on scroll */
function ParallaxWrapper({
  children,
  parallax,
  className,
}: {
  children: ReactNode;
  parallax: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax * 40, parallax * -40]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
