import { apiClient } from "@/features/devices/api/client";
import { DeviceDTO } from "@/features/devices/types/device.types";

export async function getDevices(): Promise<DeviceDTO[]> {
  return apiClient<DeviceDTO[]>("/devices");
}
