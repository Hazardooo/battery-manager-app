import type { Device } from "@/lib/types/device";
import { Card } from "@/app/components/ui/Card";
export function DeviceCard({ deviceName, batteryType, batteryCount }: Device) {
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
