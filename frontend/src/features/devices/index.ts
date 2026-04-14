// features/devices/index.ts
// Components
export { DeviceList } from "@/features/devices/components/DeviceList";
export { DeviceCard } from "@/features/devices/components/DeviceCard";
export { DeviceForm } from "@/features/devices/components/DeviceForm";
export { AddDeviceCard } from "@/features/devices/components/AddDeviceCard";

// Types
export type {
  Device,
  DeviceBase,
  DeviceDTO,
  DeviceFormData,
  BatteryType,
} from "./types/device.types";
export {
  mapDeviceDTOToDevice,
  mapDeviceToDeviceBase,
  BATTERY_OPTIONS,
} from "./types/device.types";

// API
export { getDevices, createDevice, updateDevice, deleteDevice } from "./api";
