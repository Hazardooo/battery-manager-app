import { getDevices } from "@/lib/api/devices";
import { DeviceList } from "@/app/components/devices/DeviceList";
import { DeviceCardProps } from "@/lib/types/device";

export default async function DevicesPage() {
  const devices = await getDevices();

  const deviceCardsProps: DeviceCardProps[] = devices.map((device) => ({
    id: device.id,
    deviceName: device.device_name,
    batteryType: device.battery_type,
    batteryCount: device.battery_count,
  }));

  return <DeviceList devices={deviceCardsProps} />;
}
