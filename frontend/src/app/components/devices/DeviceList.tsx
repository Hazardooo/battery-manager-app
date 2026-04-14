// DeviceList.tsx
"use client";

import { useState } from "react";
import { DeviceCard } from "@/app/components/devices/DeviceCard";
import { AddDeviceCard } from "@/app/components/devices/AddDeviceCard";
import type { Device } from "@/lib/types/device";
import { DeviceForm } from "@/app/components/devices/DeviceForm";
import { SidePanel } from "@/app/components/ui/SidePanel";

interface DeviceListProps {
  devices: Device[];
}

type PanelMode = "create" | "edit" | null;

export function DeviceList({ devices }: DeviceListProps) {
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const openCreatePanel = () => {
    setSelectedDevice(null);
    setPanelMode("create");
  };

  const openEditPanel = (device: Device) => {
    setSelectedDevice(device);
    setPanelMode("edit");
  };

  const closePanel = () => {
    setPanelMode(null);
    setSelectedDevice(null);
  };

  const isPanelOpen = panelMode !== null;

  return (
    <div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 transition-all duration-300 ${isPanelOpen ? "mr-96" : ""}`}
      >
        <AddDeviceCard onClick={openCreatePanel} />

        {devices.map((device) => (
          <button
            key={device.id}
            onClick={() => openEditPanel(device)}
            className="text-left"
          >
            <DeviceCard
              id={device.id}
              deviceName={device.deviceName}
              batteryType={device.batteryType}
              batteryCount={device.batteryCount}
            />
          </button>
        ))}
      </div>

      {/* Одна панель для создания и редактирования */}
      <SidePanel
        isOpen={isPanelOpen}
        onClose={closePanel}
        title={
          panelMode === "create"
            ? "Новое устройство"
            : "Редактирование устройства"
        }
      >
        <DeviceForm
          device={selectedDevice || undefined}
          onSuccess={closePanel}
        />
      </SidePanel>
    </div>
  );
}
