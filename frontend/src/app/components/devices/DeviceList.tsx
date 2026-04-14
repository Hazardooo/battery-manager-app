import { DeviceCard } from "@/app/components/devices/DeviceCard";
import { AddDeviceCard } from "@/app/components/devices/AddDeviceCard";
import { DeviceCardProps } from "@/lib/types/device";

interface DeviceListProps {
  devices: DeviceCardProps[];
}

export function DeviceList({ devices }: DeviceListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {/*<AddDeviceCard onClick={() => } />*/}
      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          id={device.id}
          deviceName={device.deviceName}
          batteryType={device.batteryType}
          batteryCount={device.batteryCount}
        />
      ))}
    </div>
  );
}
