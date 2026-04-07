import type { DeviceCardProps } from "@/lib/types/device";
import { BatteryType } from "@/lib/types/batteries";

export function DeviceCard({
  deviceName,
  batteryType,
  batteryCount,
}: DeviceCardProps) {
  const getBatteryTextColorClass = (type: BatteryType) => {
    return `text-[var(--battery-${type.toLowerCase()})]`;
  };

  const batteryTextColorClass = getBatteryTextColorClass(
    batteryType as BatteryType,
  );

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:bg-card-hover transition-colors flex flex-col justify-between items-center max-w-sm w-full mx-auto">
      <h3 className="text-text-primary font-medium text-lg">{deviceName}</h3>
      <span className={`text-sm ${batteryTextColorClass}`}>
        {batteryType.toUpperCase()} × {batteryCount}
      </span>
    </div>
  );
}
