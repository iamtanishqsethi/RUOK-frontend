"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { MotionProps } from "framer-motion";

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
}

export function TypingAnimation({
                                  children,
                                  className,
                                  duration = 100,
                                  delay = 0,
                                  as: Component = "div",
                                  startOnView = false,
                                  ...props
                                }: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setStarted(true);
            }, delay);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    let deleting = false;

    const animate = () => {
      setDisplayedText(children.substring(0, i));

      if (!deleting) {
        if (i < children.length) {
          i++;
        } else {
          deleting = true;
          setTimeout(animate, 1000); // Pause before deleting
          return;
        }
      } else {
        if (i > 0) {
          i--;
        } else {
          deleting = false;
        }
      }

      setTimeout(animate, duration);
    };

    const timeout = setTimeout(animate, delay);

    return () => clearTimeout(timeout);
  }, [children, duration, delay, started]);

  return (
      <MotionComponent
          ref={elementRef}
          className={cn(
              "text-4xl font-bold leading-[5rem] tracking-[-0.02em] relative",
              className
          )}
          {...props}
      >
        {displayedText}
      </MotionComponent>
  );
}
