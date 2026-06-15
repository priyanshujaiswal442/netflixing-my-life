import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link
      href="/"
      className={cn(
        "font-bold tracking-tight transition-opacity hover:opacity-80",
        sizes[size],
        className
      )}
      aria-label="Netflixify My Life - Home"
    >
      <span className="text-primary">N</span>
      <span className="text-foreground">etflixify</span>
    </Link>
  );
}
