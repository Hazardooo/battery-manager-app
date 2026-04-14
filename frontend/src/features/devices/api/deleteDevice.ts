// features/devices/api/deleteDevice.ts
import { apiClient } from "@/features/devices/api/client";

export async function deleteDevice(id: string): Promise<void> {
  await apiClient<void>(`/devices/${id}`, {
    method: "DELETE",
  });
}
