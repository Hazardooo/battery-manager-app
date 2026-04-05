"use client";

import { useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [batteryType, setBatteryType] = useState("");
  const [batteryCount, setBatteryCount] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDevice = {
      device_name: deviceName,
      battery_type: batteryType,
      battery_count: batteryCount,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDevice),
      });

      if (response.ok) {
        alert("Device added successfully!");
        setDeviceName("");
        setBatteryType("");
        setBatteryCount(1);
        setShowForm(false);
      } else {
        const errorData = await response.json();
        alert(
          `Failed to add device: ${errorData.detail || response.statusText}`,
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while adding the device.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Project Title */}
      <h1 className="text-5xl font-bold text-center mb-8">Battery Manager</h1>

      {/* Add Device Box */}
      {!showForm && (
        <div
          className="w-48 h-48 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => setShowForm(true)}
        >
          <span className="text-6xl text-gray-400">+</span>
        </div>
      )}

      {/* New Device Form */}
      {showForm && (
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Add New Device
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="deviceName"
                className="block text-sm font-medium text-gray-700"
              >
                Device Name
              </label>
              <input
                type="text"
                id="deviceName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="batteryType"
                className="block text-sm font-medium text-gray-700"
              >
                Battery Type
              </label>
              <input
                type="text"
                id="batteryType"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={batteryType}
                onChange={(e) => setBatteryType(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="batteryCount"
                className="block text-sm font-medium text-gray-700"
              >
                Battery Count
              </label>
              <input
                type="number"
                id="batteryCount"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={batteryCount}
                onChange={(e) => setBatteryCount(parseInt(e.target.value) || 0)}
                min="0"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Device
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
