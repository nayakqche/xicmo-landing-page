"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/shared/utils";

export function SpotlightPointerCard({
  children,
  className,
  title = "Xicmo cost advantage",
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
}) {
  const [inside, setInside] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      className={cn("spotlight-pointer-card relative", className)}
      style={
        {
          "--spotlight-x": `${position.x}px`,
          "--spotlight-y": `${position.y}px`,
        } as CSSProperties
      }
      onMouseEnter={() => setInside(true)}
      onMouseLeave={() => setInside(false)}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }}
    >
      <div aria-hidden className="spotlight-pointer-card__glow" />
      {inside ? (
        <div
          aria-hidden
          className="spotlight-pointer-card__cursor"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          }}
        >
          <MousePointer2 className="h-5 w-5 -translate-x-2 -translate-y-2 -rotate-45 fill-primary text-primary" />
          <span>{title}</span>
        </div>
      ) : null}
      {children}
    </div>
  );
}
