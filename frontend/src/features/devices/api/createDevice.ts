// features/devices/api/createDevice.ts
import { apiClient } from "@/features/devices/api/client";
import { DeviceBase, DeviceDTO } from "@/features/devices/types/device.types";

export async function createDevice(data: DeviceBase): Promise<DeviceDTO> {
  return apiClient<DeviceDTO>("/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
