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
} from "@/features/devices/types/device.types";

const DEFAULT_FORM_DATA: DeviceFormData = {
  deviceName: "",
  batteryType: "aa",
  batteryCount: 1,
};

interface UseDeviceFormProps {
  device?: Device;
  onSuccess: () => void;
}

export function useDeviceForm({ device, onSuccess }: UseDeviceFormProps) {
  const router = useRouter();
  const isEditMode = !!device;

  const [formData, setFormData] = useState<DeviceFormData>(DEFAULT_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (device) {
      setFormData({
        deviceName: device.deviceName,
        batteryType: device.batteryType,
        batteryCount: device.batteryCount,
      });
    } else {
      setFormData(DEFAULT_FORM_DATA);
    }
  }, [device]);

  const updateField = useCallback(
    (field: keyof DeviceFormData, value: string | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const submit = useCallback(async () => {
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

  const remove = useCallback(async () => {
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
    formData,
    isEditMode,
    isSubmitting,
    updateField,
    submit,
    remove,
  };
}
