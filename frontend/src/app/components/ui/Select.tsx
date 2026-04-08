interface Option {
  readonly value: string;
  readonly label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly Option[];
}

export function Select({ options, className = "", ...props }: SelectProps) {
  return (
    <select
      className={`w-full p-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary disabled:opacity-50 ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
