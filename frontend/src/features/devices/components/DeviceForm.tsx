// features/devices/components/DeviceForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/Form"; // ← исправлен путь
import { FormField } from "@/components/ui/FormField"; // ← исправлен путь
import { Input } from "@/components/ui/Input"; // ← исправлен путь
import { Select } from "@/components/ui/Select"; // ← исправлен путь
import { Button } from "@/components/ui/Button"; // ← исправлен путь
import { BATTERY_OPTIONS } from "@/features/devices/types/device.types"; // ← исправлен путь
import {
  createDevice,
  updateDevice,
  deleteDevice,
} from "@/features/devices/api"; // ← исправлен путь
import type { Device } from "@/features/devices/types/device.types"; // ← исправлен путь

interface DeviceFormProps {
  device?: Device;
  onSuccess: () => void;
}

export function DeviceForm({ device, onSuccess }: DeviceFormProps) {
  const router = useRouter();
  const isEditMode = !!device;

  const [deviceName, setDeviceName] = useState("");
  const [batteryType, setBatteryType] = useState("aa");
  const [batteryCount, setBatteryCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (device) {
      setDeviceName(device.deviceName);
      setBatteryType(device.batteryType);
      setBatteryCount(device.batteryCount);
    }
  }, [device]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = {
        device_name: deviceName,
        battery_type: batteryType,
        battery_count: batteryCount,
      };

      if (isEditMode && device) {
        await updateDevice(device.id, data);
      } else {
        await createDevice(data);
      }

      onSuccess();
      router.refresh();
    } catch (error) {
      alert(`Ошибка: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!device) return;
    if (!confirm("Удалить устройство?")) return;

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
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Название" id="deviceName">
        <Input
          id="deviceName"
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Тип батареи" id="batteryType">
        <Select
          id="batteryType"
          value={batteryType}
          onChange={(e) => setBatteryType(e.target.value)}
          options={BATTERY_OPTIONS}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Количество" id="batteryCount">
        <Input
          id="batteryCount"
          type="number"
          min={1}
          value={batteryCount}
          onChange={(e) => setBatteryCount(Number(e.target.value))}
          required
          disabled={isSubmitting}
        />
      </FormField>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isEditMode
              ? "Сохранение..."
              : "Создание..."
            : isEditMode
              ? "Сохранить"
              : "Добавить"}
        </Button>

        {isEditMode && (
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isSubmitting}
            variant="danger"
          >
            Удалить
          </Button>
        )}
      </div>
    </Form>
  );
}
