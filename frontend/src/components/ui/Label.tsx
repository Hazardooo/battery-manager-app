interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
}

export function FormLabel({ children, htmlFor }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className="block text-text-secondary text-sm mb-1">
      {children}
    </label>
  );
}
