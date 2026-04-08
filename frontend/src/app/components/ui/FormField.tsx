import { FormLabel } from "./Label";

interface FormFieldProps {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string;
}

export function FormField({ label, id, children, error }: FormFieldProps) {
  return (
    <div>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {children}
      {error && <span className="text-danger text-sm mt-1">{error}</span>}
    </div>
  );
}
