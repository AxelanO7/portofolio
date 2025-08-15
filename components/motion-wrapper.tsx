"use client";

import { ReactNode, useEffect, useState } from "react";
import { m, LazyMotion, domAnimation, MotionConfig } from "framer-motion";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  whileInView?: any;
  viewport?: any;
  variants?: any;
  [key: string]: any;
}

export function MotionWrapper({
  children,
  className = "",
  initial,
  animate,
  transition,
  whileInView,
  viewport,
  variants,
  ...props
}: MotionWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          className={className}
          initial={initial}
          animate={animate}
          transition={transition}
          whileInView={whileInView}
          viewport={viewport}
          variants={variants}
          {...props}
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
