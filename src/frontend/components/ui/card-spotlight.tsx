"use client";

import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/utils";

type CardSpotlightProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  radius?: number;
};

export function CardSpotlight({
  children,
  radius = 360,
  className,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}: CardSpotlightProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      className={cn("card-spotlight group/spotlight relative overflow-hidden", className)}
      style={
        {
          "--spotlight-x": `${position.x}px`,
          "--spotlight-y": `${position.y}px`,
          "--spotlight-radius": `${radius}px`,
        } as CSSProperties
      }
      onMouseEnter={(event) => {
        setIsHovering(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setIsHovering(false);
        onMouseLeave?.(event);
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        onMouseMove?.(event);
      }}
      {...props}
    >
      <div aria-hidden className="card-spotlight__mask">
        {isHovering ? <CanvasRevealEffect /> : null}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CanvasRevealEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationFrame = 0;
    let disposed = false;
    const colors = [
      "rgba(124, 58, 237, ",
      "rgba(217, 70, 239, ",
      "rgba(99, 102, 241, ",
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * scale));
      canvas.height = Math.max(1, Math.floor(rect.height * scale));
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = () => {
      if (disposed) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      const gap = 12;
      const phase = frame * 0.075;
      for (let y = 0; y < height + gap; y += gap) {
        for (let x = 0; x < width + gap; x += gap) {
          const wave = Math.sin(x * 0.035 + y * 0.025 + phase);
          const opacity = Math.max(0, wave) * 0.28 + 0.04;
          context.fillStyle = `${colors[(x / gap + y / gap) % colors.length | 0]}${opacity})`;
          context.beginPath();
          context.arc(x, y, 1.35 + Math.max(0, wave) * 0.75, 0, Math.PI * 2);
          context.fill();
        }
      }

      frame += 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    draw();

    return () => {
      disposed = true;
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
