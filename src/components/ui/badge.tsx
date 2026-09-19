import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "red" | "sage" | "ink";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        tone === "muted" && "bg-muted text-muted-foreground",
        tone === "red" && "bg-primary/10 text-primary",
        tone === "sage" && "bg-success/10 text-success",
        tone === "ink" && "bg-foreground text-background",
        className,
      )}
    >
      {children}
    </span>
  );
}
