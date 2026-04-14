// features/devices/components/DeviceForm/index.tsx
"use client";

import { useDeviceForm } from "@/features/devices/components/DeviceForm/useDeviceForm";
import { DeviceFormView } from "@/features/devices/components/DeviceForm/DeviceFormView";
import type { Device } from "@/features/devices/types/device.types";

interface DeviceFormProps {
  device?: Device;
  onSuccess: () => void;
}

export function DeviceForm({ device, onSuccess }: DeviceFormProps) {
  const {
    data,
    isEditMode,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleDelete,
  } = useDeviceForm({ device, onSuccess });

  return (
    <DeviceFormView
      data={data}
      isEditMode={isEditMode}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onDelete={isEditMode ? handleDelete : undefined}
    />
  );
}
