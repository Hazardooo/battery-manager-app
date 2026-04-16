import { useState, useCallback } from "react";

interface UseSidePanelReturn<T> {
  selected: T | null;
  isOpen: boolean;
  isActive: (item: T | null) => boolean;
  open: (item: T) => void;
  close: () => void;
  toggle: (item: T) => void;
}

export function useSidePanel<
  T extends { id: string },
>(): UseSidePanelReturn<T> {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = null;
  const isOpen = selectedId !== null;

  const open = useCallback((item: T) => setSelectedId(item.id), []);
  const close = useCallback(() => setSelectedId(null), []);

  const toggle = useCallback((item: T) => {
    setSelectedId((prev) => (prev === item.id ? null : item.id));
  }, []);

  const isActive = useCallback(
    (item: T | null) => item !== null && selectedId === item.id,
    [selectedId],
  );

  return { selected, isOpen, isActive, open, close, toggle };
}
