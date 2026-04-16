"use client";

import { Form } from "@/components/ui/Form";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import {
  DeviceFormData,
  BATTERY_OPTIONS,
} from "@/features/devices/types/device.types";

interface DeviceFormViewProps {
  data: DeviceFormData;
  isEditMode: boolean;
  isSubmitting: boolean;
  onChange: (field: keyof DeviceFormData, value: string | number) => void;
  onSubmit: () => void;
  onDelete?: () => void;
}

export function DeviceFormView({
  data,
  isEditMode,
  isSubmitting,
  onChange,
  onSubmit,
  onDelete,
}: DeviceFormViewProps) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <FormField label="Название" id="deviceName">
        <Input
          id="deviceName"
          type="text"
          value={data.deviceName}
          onChange={(e) => onChange("deviceName", e.target.value)}
          required
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Тип батареи" id="batteryType">
        <Select
          id="batteryType"
          value={data.batteryType}
          onChange={(e) => onChange("batteryType", e.target.value)}
          options={BATTERY_OPTIONS}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Количество" id="batteryCount">
        <Input
          id="batteryCount"
          type="number"
          min={1}
          value={data.batteryCount}
          onChange={(e) => onChange("batteryCount", Number(e.target.value))}
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

        {isEditMode && onDelete && (
          <Button
            type="button"
            onClick={onDelete}
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
