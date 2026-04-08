interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium mt-2 disabled:opacity-50"
    >
      {children}
    </button>
  );
}
