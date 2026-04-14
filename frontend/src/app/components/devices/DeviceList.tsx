"use client";

import { useState } from "react";
import { DeviceCard } from "@/app/components/devices/DeviceCard";
import { AddDeviceCard } from "@/app/components/devices/AddDeviceCard";
import { DeviceCardProps } from "@/lib/types/device";
import { DeviceForm } from "@/app/components/devices/DeviceForm";
import { SidePanel } from "@/app/components/ui/SidePanel";

interface DeviceListProps {
  devices: DeviceCardProps[];
}

export function DeviceList({ devices }: DeviceListProps) {
  const [showNewDevicePanel, setShowNewDevicePanel] = useState(false);

  const showNewDevicePanelToggle = () => {
    setShowNewDevicePanel(!showNewDevicePanel);
  };

  const handleCloseNewDevicePanel = () => {
    setShowNewDevicePanel(false);
  };

  return (
    <div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 ${showNewDevicePanel ? "mr-96" : ""} grow transition-all duration-300`}
      >
        <AddDeviceCard onClick={showNewDevicePanelToggle} />
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            id={device.id}
            deviceName={device.deviceName}
            batteryType={device.batteryType}
            batteryCount={device.batteryCount}
          />
        ))}
      </div>

      <SidePanel
        isOpen={showNewDevicePanel}
        onClose={handleCloseNewDevicePanel}
        title="Новое устройство"
      >
        <DeviceForm onSuccess={handleCloseNewDevicePanel} />
      </SidePanel>
    </div>
  );
}
