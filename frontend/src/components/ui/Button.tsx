interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "accent" | "danger";
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-hover",
    accent: "bg-accent hover:bg-accent-hover",
    danger: "bg-danger hover:bg-danger-hover",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-3 text-white rounded-lg transition-colors font-medium mt-2 disabled:opacity-50 ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
