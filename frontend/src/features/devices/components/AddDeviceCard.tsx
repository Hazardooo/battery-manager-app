// features/devices/components/AddDeviceCard.tsx
import { PlusIcon } from "@/components/ui/icons/PlusIcon";
import { Card } from "@/components/ui/Card";

interface AddDeviceCardProps {
  onClick: () => void;
}

export function AddDeviceCard({ onClick }: AddDeviceCardProps) {
  return (
    <button onClick={onClick} className="group">
      <Card className="border-dashed flex flex-col justify-center items-center min-h-30 hover:border-primary">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <PlusIcon className="text-primary" />
        </div>
      </Card>
    </button>
  );
}
