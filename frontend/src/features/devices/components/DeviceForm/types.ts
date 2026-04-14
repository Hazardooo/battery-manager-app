// DeviceForm/types.ts
import type { Device } from "@/features/devices/types/device.types";

export interface DeviceFormData {
  deviceName: string;
  batteryType: string;
  batteryCount: number;
}

export interface DeviceFormViewProps {
  data: DeviceFormData;
  isEditMode: boolean;
  isSubmitting: boolean;
  onChange: (field: keyof DeviceFormData, value: string | number) => void;
  onSubmit: () => void;
  onDelete?: () => void;
}

export interface UseDeviceFormProps {
  device?: Device;
  onSuccess: () => void;
}
