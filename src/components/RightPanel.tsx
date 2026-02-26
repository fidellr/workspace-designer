import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { IconMap } from "@/lib/icons";
import { Product } from "@/types";

export default function RightPanel({ products }: { products: Product[] }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const addAccessory = useWorkspaceStore((state) => state.addAccessory);
  const accessories = products.filter((p) => p.category === "accessories");

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="absolute right-4 top-10 bg-white p-3 rounded-xl shadow-md z-40 hover:bg-slate-50 border border-slate-200 group transition-all"
        aria-label="Expand Quick Add"
      >
        <ChevronLeft
          size={24}
          className="text-slate-600 group-hover:text-blue-600"
        />
      </button>
    );
  }

  return (
    <aside className="absolute right-4 top-10 w-64 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-xl shadow-sm z-40 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center bg-slate-100/90 p-2 border-b border-slate-300">
        <button
          onClick={() => setIsMinimized(true)}
          className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-colors"
          aria-label="Minimize Panel"
        >
          <ChevronRight size={20} />
        </button>
        <span className="font-semibold text-sm text-slate-700 mr-2">
          Quick Add
        </span>
      </div>

      <div className="p-4 space-y-4 max-h-112.5 overflow-y-auto">
        {accessories.map((item) => {
          const Icon = IconMap[item.iconName];
          return (
            <div
              key={item.id}
              className="border border-dashed border-slate-400 p-4 rounded-xl bg-white/80 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-20 w-full flex items-center justify-center mb-2">
                {item.imageUrl ? (
                  <Image
                    width={200}
                    height={200}
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                ) : (
                  <Icon size={40} className="text-slate-400" strokeWidth={1} />
                )}
              </div>
              <button
                onClick={() => addAccessory(item)}
                className="w-full bg-white border border-slate-200 text-slate-700 px-3 py-2 text-sm rounded-lg shadow-sm hover:bg-slate-50 font-medium transition-colors"
              >
                + Add {item.name}!
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
