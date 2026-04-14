// features/devices/components/DeviceForm/useDeviceForm.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  createDevice,
  updateDevice,
  deleteDevice,
} from "@/features/devices/api";
import {
  Device,
  DeviceFormData,
  mapDeviceToDeviceBase,
} from "../../types/device.types";

interface UseDeviceFormProps {
  device?: Device;
  onSuccess: () => void;
}

export function useDeviceForm({ device, onSuccess }: UseDeviceFormProps) {
  const router = useRouter();
  const isEditMode = !!device;

  const [formData, setFormData] = useState<DeviceFormData>({
    deviceName: "",
    batteryType: "aa",
    batteryCount: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (device) {
      setFormData({
        deviceName: device.deviceName,
        batteryType: device.batteryType,
        batteryCount: device.batteryCount,
      });
    }
  }, [device]);

  // Переименовано: updateField → handleChange
  const handleChange = useCallback(
    (field: keyof DeviceFormData, value: string | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  // Переименовано: submit → handleSubmit
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const payload = mapDeviceToDeviceBase(formData);

      if (isEditMode && device) {
        await updateDevice(device.id, payload);
      } else {
        await createDevice(payload);
      }

      onSuccess();
      router.refresh();
    } catch (error) {
      alert(`Ошибка: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, device, isEditMode, onSuccess, router]);

  // Переименовано: remove → handleDelete
  const handleDelete = useCallback(async () => {
    if (!device || !confirm("Удалить устройство?")) return;

    setIsSubmitting(true);
    try {
      await deleteDevice(device.id);
      onSuccess();
      router.refresh();
    } catch (error) {
      alert(`Ошибка удаления: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [device, onSuccess, router]);

  return {
    data: formData, // ← formData → data
    isEditMode,
    isSubmitting,
    handleChange, // ← updateField → handleChange
    handleSubmit, // ← submit → handleSubmit
    handleDelete, // ← remove → handleDelete
  };
}
