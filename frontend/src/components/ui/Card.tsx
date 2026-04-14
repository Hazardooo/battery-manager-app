interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:bg-card-hover transition-colors flex flex-col justify-between items-center max-w-sm w-full mx-auto">
      {children}
    </div>
  );
}
