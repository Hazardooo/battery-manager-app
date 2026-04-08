interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className = "", error, ...props }: InputProps) {
  return (
    <input
      className={`w-full p-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary disabled:opacity-50 ${error ? "border-danger" : ""} ${className}`}
      {...props}
    />
  );
}
