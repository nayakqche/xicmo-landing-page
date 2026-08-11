import type { ReactNode } from "react";
import { cn } from "@/shared/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function AuroraBackground({
  className,
  children,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div className={cn("aurora-background relative overflow-hidden", className)} {...props}>
      <div aria-hidden className="aurora-background-layer" />
      {children}
    </div>
  );
}
