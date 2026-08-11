import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  FC,
} from "react";
import { cn } from "@/shared/utils";

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 110,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn("relative inline-block", className)}
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden className="animated-shiny-text absolute inset-0">
        {children}
      </span>
    </span>
  );
};
