"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/app/components/ui/Form";
import { FormField } from "@/app/components/ui/FormField";
import { Input } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/Select";
import { Button } from "@/app/components/ui/Button";
import { BATTERY_OPTIONS } from "@/lib/types/batterytypes";
import { createDevice } from "@/lib/api/devices";

export function DeviceForm() {
  const router = useRouter();
  const [deviceName, setDeviceName] = useState("");
  const [batteryType, setBatteryType] = useState("aa");
  const [batteryCount, setBatteryCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createDevice({
        device_name: deviceName,
        battery_type: batteryType,
        battery_count: batteryCount,
      });

      router.push("/devices");
      router.refresh();
    } catch (error) {
      alert("Ошибка при создании устройства: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto space-y-4"
    >
      <h2 className="text-text-primary text-xl font-medium mb-4">
        Добавить устройство
      </h2>

      <FormField label="Название" id="deviceName">
        <Input
          id="deviceName"
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          placeholder="Например: Пульт от телевизора"
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
          max={20}
          value={batteryCount}
          onChange={(e) => setBatteryCount(Number(e.target.value))}
          required
          disabled={isSubmitting}
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Создание..." : "Добавить"}
      </Button>
    </Form>
  );
}
