"use client";

import React, { useEffect, useRef, useState } from "react";

export interface ScrollVelocityContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function ScrollVelocityContainer({
  children,
  className = "",
  ...props
}: ScrollVelocityContainerProps) {
  return (
    <div
      className={`w-full overflow-hidden flex flex-col gap-3 relative select-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ScrollVelocityRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
  numCopies?: number;
  pauseOnHover?: boolean;
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 3,
  direction = 1,
  className = "",
  numCopies = 6,
  pauseOnHover = true,
  ...props
}: ScrollVelocityRowProps) {
  const baseX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const singleCopyRef = useRef<HTMLSpanElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const lastTime = useRef<number | null>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (singleCopyRef.current) {
        setContentWidth(singleCopyRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
      scrollVelocity.current = Math.min(Math.max(deltaY * 0.15, -12), 12);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollVelocity.current = 0;
      }, 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    let animId: number;

    const animate = (time: number) => {
      if (lastTime.current !== null) {
        const delta = Math.min((time - lastTime.current) / 1000, 0.1);
        const hoverMultiplier = isHovered.current ? 0.2 : 1;
        const currentSpeed =
          (baseVelocity + Math.abs(scrollVelocity.current) * 4) *
          direction *
          hoverMultiplier;

        baseX.current += currentSpeed * delta * 12;

        if (contentWidth > 0) {
          if (baseX.current >= contentWidth) {
            baseX.current = baseX.current % contentWidth;
          } else if (baseX.current <= -contentWidth) {
            baseX.current = baseX.current % contentWidth;
          }
        }

        if (containerRef.current) {
          const moveX = -baseX.current;
          containerRef.current.style.transform = `translate3d(${moveX}px, 0, 0)`;
        }
      }

      lastTime.current = time;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [baseVelocity, direction, contentWidth]);

  return (
    <div
      className={`overflow-hidden whitespace-nowrap flex flex-nowrap w-full ${className}`}
      onMouseEnter={() => {
        if (pauseOnHover) isHovered.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) isHovered.current = false;
      }}
      {...props}
    >
      <div
        ref={containerRef}
        className="flex flex-nowrap items-center will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <span
          ref={singleCopyRef}
          className="inline-flex items-center gap-6 px-4 shrink-0"
        >
          {children}
        </span>
        {Array.from({ length: Math.max(numCopies, 6) - 1 }).map((_, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-4 shrink-0"
            aria-hidden="true"
          >
            {children}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ScrollVelocityContainer;
