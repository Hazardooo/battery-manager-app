"use client";

import React from "react";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function SidePanel({
  isOpen,
  onClose,
  title,
  children,
}: SidePanelProps) {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-card border-l border-border p-6 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"} w-96 z-50`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary transition-colors text-2xl"
        >
          &times;
        </button>
      </div>
      <div className="grow">{children}</div>
    </div>
  );
}
