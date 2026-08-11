"use client";

import { useEffect, useId, useRef, useState } from "react";

export function TextHoverEffect({
  text,
  duration = 140,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientId = useId().replace(/:/g, "");
  const maskId = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (!hovered) {
      setMaskPosition({ cx: "50%", cy: "50%" });
    }
  }, [hovered]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(event) => {
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMaskPosition({
          cx: `${((event.clientX - rect.left) / rect.width) * 100}%`,
          cy: `${((event.clientY - rect.top) / rect.height) * 100}%`,
        });
      }}
      className={className}
      role="img"
      aria-label={text}
    >
      <defs>
        <linearGradient id={gradientId}>
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="35%" stopColor="#a78bfa" />
          <stop offset="70%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient
          id={maskId}
          cx={maskPosition.cx}
          cy={maskPosition.cy}
          r="24%"
          style={{ transition: `cx ${duration}ms ease-out, cy ${duration}ms ease-out` }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={`${maskId}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${maskId})`} />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-transparent stroke-foreground/10 text-[6.25rem] font-bold"
        strokeWidth="0.4"
      >
        {text}
      </text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="footer-word-draw fill-transparent stroke-foreground/20 text-[6.25rem] font-bold"
        strokeWidth="0.35"
      >
        {text}
      </text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#${gradientId})`}
        mask={`url(#${maskId}-mask)`}
        className="fill-transparent text-[6.25rem] font-bold"
        strokeWidth="0.55"
        opacity={hovered ? 1 : 0.65}
      >
        {text}
      </text>
    </svg>
  );
}
