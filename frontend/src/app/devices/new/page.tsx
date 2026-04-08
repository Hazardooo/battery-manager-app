import { DeviceForm } from "@/app/components/devices/DeviceForm";

export default function NewDevicePage() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-text-primary text-2xl font-bold text-center mb-6">
        Новое устройство
      </h1>
      <DeviceForm />
    </div>
  );
}
