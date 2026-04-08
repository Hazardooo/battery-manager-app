import type { DeviceCardProps } from "@/lib/types/device";
import { Card } from "@/app/components/ui/Card";
export function DeviceCard({
  deviceName,
  batteryType,
  batteryCount,
}: DeviceCardProps) {
  return (
    <Card>
      <h3 className="text-primary font-medium text-lg">{deviceName}</h3>
      <span
        className="text-sm"
        style={{ color: `var(--battery-${batteryType})` }}
      >
        {batteryType.toUpperCase()} × {batteryCount}
      </span>
    </Card>
  );
}
