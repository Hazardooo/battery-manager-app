import { apiClient } from "@/features/devices/api/client";
import { DeviceBase, DeviceDTO } from "@/features/devices/types/device.types";

export async function updateDevice(
  id: string,
  data: DeviceBase,
): Promise<DeviceDTO> {
  return apiClient<DeviceDTO>(`/devices/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
