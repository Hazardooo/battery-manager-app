"use client";

import { useState, useEffect, SyntheticEvent, ChangeEvent } from "react"; // ← добавьте типы
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/Form";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { BATTERY_OPTIONS } from "@/features/devices/types/device.types";
import {
  createDevice,
  updateDevice,
  deleteDevice,
} from "@/features/devices/api";
import type { Device } from "@/features/devices/types/device.types";

interface DeviceFormProps {
  device?: Device;
  onSuccess: () => void;
}

const DEFAULT_DEVICE_NAME = "";
const DEFAULT_BATTERY_TYPE = "aa";
const DEFAULT_BATTERY_COUNT = 1;

export function DeviceForm({ device, onSuccess }: DeviceFormProps) {
  const router = useRouter();
  const isEditMode = !!device;

  const [deviceName, setDeviceName] = useState(DEFAULT_DEVICE_NAME);
  const [batteryType, setBatteryType] = useState(DEFAULT_BATTERY_TYPE);
  const [batteryCount, setBatteryCount] = useState(DEFAULT_BATTERY_COUNT);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (device) {
      setDeviceName(device.deviceName);
      setBatteryType(device.batteryType);
      setBatteryCount(device.batteryCount);
    } else {
      setDeviceName(DEFAULT_DEVICE_NAME);
      setBatteryType(DEFAULT_BATTERY_TYPE);
      setBatteryCount(DEFAULT_BATTERY_COUNT);
    }
  }, [device]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
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

  const handleDeviceNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeviceName(e.target.value);
  };

  const handleBatteryTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBatteryType(e.target.value);
  };

  const handleBatteryCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBatteryCount(Number(e.target.value));
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
          placeholder="Пульт от телевизора гостинной"
          onChange={handleDeviceNameChange}
          required
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Тип батареи" id="batteryType">
        <Select
          id="batteryType"
          value={batteryType}
          onChange={handleBatteryTypeChange}
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
          onChange={handleBatteryCountChange}
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
