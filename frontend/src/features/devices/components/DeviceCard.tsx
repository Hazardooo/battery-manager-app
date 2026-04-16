import type { Device } from "@/features/devices/types/device.types";
import { Card } from "@/components/ui/Card";

interface DeviceCardProps {
  device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
  return (
    <Card>
      <h3 className="text-primary font-medium text-lg">{device.deviceName}</h3>
      <span
        className="text-sm"
        style={{ color: `var(--battery-${device.batteryType})` }}
      >
        {device.batteryType.toUpperCase()} × {device.batteryCount}
      </span>
    </Card>
  );
}
