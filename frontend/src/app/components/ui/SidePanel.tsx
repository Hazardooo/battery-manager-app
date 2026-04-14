interface SidePanelProps {
  children: React.ReactNode;
}
export function SidePanel({ children }: SidePanelProps) {
  return <div className="bg-card border border-border rounded">{children}</div>;
}
