import type { DeviceCardProps } from "@/lib/types/device";
import { BatteryType } from "@/lib/types/batteries";

const batteryColorClasses: Record<BatteryType, string> = {
  aa: "text-battery-aa",
  aaa: "text-battery-aaa",
  c: "text-battery-c",
  d: "text-battery-d",
  "9v": "text-battery-9v",
};

export function DeviceCard({
  deviceName,
  batteryType,
  batteryCount,
}: DeviceCardProps) {
  const batteryTextColorClass =
    batteryColorClasses[batteryType as BatteryType] ?? "text-text-secondary";

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:bg-card-hover transition-colors flex flex-col justify-between items-center max-w-sm w-full mx-auto">
      <h3 className="text-primary font-medium text-lg">{deviceName}</h3>
      <span className={`text-sm ${batteryTextColorClass}`}>
        {batteryType.toUpperCase()} × {batteryCount}
      </span>
    </div>
  );
}
