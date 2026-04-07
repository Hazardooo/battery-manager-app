import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-5 max-w-sm w-full mx-auto",
        hover && "hover:bg-card-hover transition-colors",
        className,
      )}
    >
      {children}
    </div>
  );
}
