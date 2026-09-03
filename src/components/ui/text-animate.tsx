"use client";

import React from "react";

export type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "scaleUp";

export type AnimateBy = "character" | "word" | "line" | "text";

export interface TextAnimateProps extends React.HTMLAttributes<HTMLElement> {
  children: string;
  animation?: AnimationType;
  by?: AnimateBy;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  segmentClassName?: string;
  as?: React.ElementType;
  once?: boolean;
  startOnView?: boolean;
}

export function TextAnimate({
  children,
  animation = "blurInUp",
  by = "character",
  delay = 0,
  duration = 0.45,
  stagger = 0.015,
  className = "",
  segmentClassName = "",
  as: Component = "p",
  once = true,
  startOnView = true,
  ...props
}: TextAnimateProps) {
  if (typeof children !== "string") {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  const animationName = `text-animate-${animation}`;

  let charIndexCounter = 0;

  const renderContent = () => {
    if (by === "character") {
      const words = children.split(" ");
      return words.map((word, wordIdx) => {
        return (
          <span
            key={`word-${wordIdx}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.split("").map((char) => {
              const currentDelay = delay + charIndexCounter * stagger;
              charIndexCounter += 1;
              return (
                <span
                  key={`char-${charIndexCounter}`}
                  className={segmentClassName}
                  style={{
                    display: "inline-block",
                    animationName,
                    animationDuration: `${duration}s`,
                    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    animationDelay: `${currentDelay}s`,
                    animationFillMode: "both",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  {char}
                </span>
              );
            })}
            {wordIdx < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      });
    }

    if (by === "word") {
      const words = children.split(" ");
      return words.map((word, idx) => (
        <span
          key={`w-${idx}`}
          className={segmentClassName}
          style={{
            display: "inline-block",
            animationName,
            animationDuration: `${duration}s`,
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            animationDelay: `${delay + idx * stagger}s`,
            animationFillMode: "both",
            marginRight: "0.25em",
            willChange: "transform, opacity, filter",
          }}
        >
          {word}
        </span>
      ));
    }

    if (by === "line") {
      const lines = children.split("\n");
      return lines.map((line, idx) => (
        <span
          key={`l-${idx}`}
          className={segmentClassName}
          style={{
            display: "block",
            animationName,
            animationDuration: `${duration}s`,
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            animationDelay: `${delay + idx * stagger}s`,
            animationFillMode: "both",
            willChange: "transform, opacity, filter",
          }}
        >
          {line}
        </span>
      ));
    }

    // Default "text"
    return (
      <span
        className={segmentClassName}
        style={{
          display: "inline-block",
          animationName,
          animationDuration: `${duration}s`,
          animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          animationDelay: `${delay}s`,
          animationFillMode: "both",
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </span>
    );
  };

  return (
    <Component className={className} {...props}>
      {renderContent()}
    </Component>
  );
}

export default TextAnimate;
