export interface DeviceBase {
  device_name: string;
  battery_type: string;
  battery_count: number;
}

export interface DeviceDTO extends DeviceBase {
  id: string;
}

export interface Device {
  id: string;
  deviceName: string;
  batteryType: string;
  batteryCount: number;
}

export interface DeviceFormData {
  deviceName: string;
  batteryType: string;
  batteryCount: number;
}

// Мапперы
export function mapDeviceDTOToDevice(dto: DeviceDTO): Device {
  return {
    id: dto.id,
    deviceName: dto.device_name,
    batteryType: dto.battery_type,
    batteryCount: dto.battery_count,
  };
}

export function mapDeviceToDeviceBase(device: DeviceFormData): DeviceBase {
  return {
    device_name: device.deviceName,
    battery_type: device.batteryType,
    battery_count: device.batteryCount,
  };
}

export const BATTERY_OPTIONS = [
  { value: "aa", label: "AA" },
  { value: "aaa", label: "AAA" },
  { value: "c", label: "C" },
  { value: "d", label: "D" },
  { value: "9v", label: "9V" },
] as const;

export type BatteryType = (typeof BATTERY_OPTIONS)[number]["value"];
