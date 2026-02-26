import { useState, useCallback } from "react";

export function useResizable(initialWidth: number, minWidth = 60) {
  const [width, setWidth] = useState(initialWidth);

  const handleResizeStart = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const handle = e.currentTarget;
      const target = handle.parentElement;
      if (!target) return;

      handle.setPointerCapture(e.pointerId);
      const rect = target.getBoundingClientRect();
      const startLeft = rect.left;
      const startTop = rect.top;
      const aspectRatio = rect.height > 0 ? rect.width / rect.height : 1;

      const onMove = (moveEvent: PointerEvent) => {
        const distanceX = moveEvent.clientX - startLeft;
        const distanceY = moveEvent.clientY - startTop;
        const newWidth = Math.max(distanceX, distanceY * aspectRatio);
        setWidth(Math.max(minWidth, newWidth));
      };

      const onUp = (upEvent: PointerEvent) => {
        handle.releasePointerCapture(upEvent.pointerId);
        handle.removeEventListener("pointermove", onMove);
        handle.removeEventListener("pointerup", onUp);
      };

      handle.addEventListener("pointermove", onMove);
      handle.addEventListener("pointerup", onUp);
    },
    [minWidth]
  );

  return { width, handleResizeStart };
}
