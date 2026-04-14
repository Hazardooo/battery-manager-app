// app/(routes)/devices/page.tsx
import { getDevices } from "@/features/devices/api";
import { DeviceList } from "@/features/devices/components/DeviceList";
import { mapDeviceDTOToDevice } from "@/features/devices/types/device.types";

export default async function DevicesPage() {
  const devicesDTO = await getDevices();
  const devices = devicesDTO.map(mapDeviceDTOToDevice);

  return <DeviceList devices={devices} />;
}
