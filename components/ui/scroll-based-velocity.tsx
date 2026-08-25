"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollVelocityContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface ScrollVelocityRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
  numCopies?: number;
}

export function ScrollVelocityContainer({
  children,
  className,
  ...props
}: ScrollVelocityContainerProps) {
  return (
    <div
      className={cn("relative flex w-full flex-col items-center justify-center overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function ScrollVelocityRow({
  children,
  baseVelocity = 20,
  direction = 1,
  className,
  numCopies = 6,
  ...props
}: ScrollVelocityRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef<number>(direction);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * (baseVelocity / 5) * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -direction;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = direction;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-100 / numCopies, 0, v)}%`);

  return (
    <div className={cn("w-full overflow-hidden whitespace-nowrap flex flex-nowrap", className)} {...props}>
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <span key={i} className="flex items-center flex-shrink-0 mx-4">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
