import type { DeviceCardProps } from "@/lib/types/device";

export function DeviceCard({
  deviceName,
  batteryType,
  batteryCount,
}: DeviceCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:bg-card-hover transition-colors flex flex-col justify-between items-center max-w-sm w-full mx-auto">
      <h3 className="text-primary font-medium text-lg">{deviceName}</h3>
      <span
        className="text-sm"
        style={{ color: `var(--battery-${batteryType})` }}
      >
        {batteryType.toUpperCase()} × {batteryCount}
      </span>
    </div>
  );
}
