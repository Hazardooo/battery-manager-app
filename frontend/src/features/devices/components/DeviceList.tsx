// features/devices/components/DeviceList.tsx
"use client";

import { useState } from "react";
import { DeviceCard } from "@/features/devices/components/DeviceCard";
import { AddDeviceCard } from "@/features/devices/components/AddDeviceCard";
import { DeviceForm } from "@/features/devices/components/DeviceForm";
import { SidePanel } from "@/components/ui/SidePanel";
import type { Device } from "@/features/devices/types/device.types";

interface DeviceListProps {
  devices: Device[];
}

export function DeviceList({ devices }: DeviceListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const close = () => {
    setIsOpen(false);
    // selectedId сбрасываем ПОСЛЕ анимации закрытия
    setTimeout(() => {
      setSelectedId(null);
    }, 300);
  };

  const toggleCreate = () => {
    if (isOpen && selectedId === null) {
      close();
    } else {
      setTitle("Новое устройство");
      setSelectedId(null);
      setIsOpen(true);
    }
  };

  const toggleEdit = (device: Device) => {
    if (isOpen && selectedId === device.id) {
      close();
    } else {
      setTitle("Редактирование устройства");
      setSelectedId(device.id);
      setIsOpen(true);
    }
  };

  const selectedDevice = selectedId
    ? devices.find((d) => d.id === selectedId)
    : null;

  return (
    <div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 transition-all duration-300 ${
          isOpen ? "mr-96" : ""
        }`}
      >
        <AddDeviceCard onClick={toggleCreate} />

        {devices.map((device) => (
          <button
            key={device.id}
            onClick={() => toggleEdit(device)}
            className="text-left"
          >
            <DeviceCard device={device} />
          </button>
        ))}
      </div>

      <SidePanel isOpen={isOpen} onClose={close} title={title}>
        <DeviceForm device={selectedDevice || undefined} onSuccess={close} />
      </SidePanel>
    </div>
  );
}
