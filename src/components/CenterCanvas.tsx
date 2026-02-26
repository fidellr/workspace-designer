import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { WorkspaceState, Product } from "@/types";
import { IconMap } from "@/lib/icons";

interface CenterCanvasProps {
  workspace: WorkspaceState;
  total: number;
  onRemoveMain: (type: "desks" | "chairs") => void;
  onRemoveAccessory: (index: number) => void;
  onRemoveExtra: (id: string) => void;
  onCheckoutClick: () => void;
}

const ResizableDraggableItem = ({
  item,
  initialWidth,
  initialLeft,
  initialTop,
  onRemove,
  stageRef,
}: {
  item: Product;
  initialWidth: number;
  initialLeft: string;
  initialTop: string;
  onRemove: () => void;
  stageRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [width, setWidth] = useState(initialWidth);
  const Icon = IconMap[item.iconName];

  const handleResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
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
      const widthFromY = distanceY * aspectRatio;

      const newWidth = Math.max(distanceX, widthFromY);

      setWidth(Math.max(60, newWidth));
    };

    const onUp = (upEvent: PointerEvent) => {
      handle.releasePointerCapture(upEvent.pointerId);
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
    };

    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
  };

  return (
    <motion.div
      drag
      dragConstraints={stageRef}
      dragMomentum={false}
      style={{ left: initialLeft, top: initialTop }}
      className="absolute pointer-events-auto cursor-grab active:cursor-grabbing group z-30"
    >
      <div
        style={{ width: `${width}px` }}
        className="relative flex items-center justify-center"
      >
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onRemove}
          className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 hover:bg-red-600 shadow-md"
        >
          <X size={16} />
        </button>

        <div
          onPointerDown={handleResizeStart}
          className="absolute -bottom-2 -right-2 w-5 h-5 bg-blue-500 rounded-full cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-md border-2 border-white flex items-center justify-center hover:scale-110 active:scale-95"
          title="Drag to resize"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full pointer-events-none" />
        </div>

        {item.imageUrl ? (
          <Image
            width={800}
            height={800}
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-auto object-contain mix-blend-multiply drop-shadow-xl pointer-events-none"
            draggable={false}
          />
        ) : (
          <Icon
            size={Math.max(32, width * 0.7)}
            className="text-slate-800 mx-auto drop-shadow-xl"
            strokeWidth={1.5}
          />
        )}
      </div>
    </motion.div>
  );
};

export default function CenterCanvas({
  workspace,
  total,
  onRemoveMain,
  onRemoveAccessory,
  onRemoveExtra,
  onCheckoutClick,
}: CenterCanvasProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  if (!workspace) return null;

  return (
    <>
      <div
        className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
        ref={stageRef}
      >
        {workspace.desks && (
          <ResizableDraggableItem
            item={workspace.desks}
            initialWidth={400}
            initialLeft="calc(50% - 200px)"
            initialTop="220px"
            onRemove={() => onRemoveMain("desks")}
            stageRef={stageRef}
          />
        )}

        {workspace.chairs && (
          <ResizableDraggableItem
            item={workspace.chairs}
            initialWidth={150}
            initialLeft="calc(50% - 75px)"
            initialTop="350px"
            onRemove={() => onRemoveMain("chairs")}
            stageRef={stageRef}
          />
        )}

        {workspace.accessories.map((acc, i) => {
          const spawnOffset = i * 20 - 40;
          return (
            <ResizableDraggableItem
              key={`acc-${i}`}
              item={acc}
              initialWidth={100}
              initialLeft={`calc(50% - 50px + ${spawnOffset}px)`}
              initialTop="150px"
              onRemove={() => onRemoveAccessory(i)}
              stageRef={stageRef}
            />
          );
        })}

        {workspace.extras.map((ext, i) => {
          return (
            <ResizableDraggableItem
              key={`ext-${ext.id}`}
              item={ext}
              initialWidth={120}
              initialLeft={`calc(${i % 2 === 0 ? "30%" : "70%"} - 60px)`}
              initialTop="400px"
              onRemove={() => onRemoveExtra(ext.id)}
              stageRef={stageRef}
            />
          );
        })}
      </div>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-auto">
        <div className="bg-white border-t border-x border-slate-200 px-6 py-2 rounded-t-xl font-bold text-slate-500 text-sm shadow-sm">
          Ready to Rent?
        </div>
        <button
          onClick={onCheckoutClick}
          className="bg-slate-900 border border-slate-900 px-12 py-4 rounded-b-xl rounded-t-none font-bold text-white text-xl shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 transition-all"
        >
          Rent Your Setup! (${total}/mo)
        </button>
      </div>
    </>
  );
}
