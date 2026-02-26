import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { IconMap } from "@/lib/icons";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeftPanelProps {
  products: Product[];
  onSelectItem: (product: Product) => void;
}

export default function LeftPanel({ products, onSelectItem }: LeftPanelProps) {
  const [leftTab, setLeftTab] = useState<"chairs" | "desks" | "accessories">(
    "chairs",
  );
  const [isMinimized, setIsMinimized] = useState(false);
  const leftPanelItems = products.filter((p) => p.category === leftTab);

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="absolute left-4 top-4 bg-white p-3 rounded-xl shadow-md z-40 hover:bg-slate-50 border border-slate-200 group transition-all"
        title="Expand Catalog"
      >
        <ChevronRight
          size={24}
          className="text-slate-600 group-hover:text-blue-600"
        />
      </button>
    );
  }

  return (
    <div className="absolute left-4 top-4 w-80 bg-white border border-slate-300 rounded-lg shadow-sm z-40 overflow-hidden flex flex-col transition-all">
      <div className="flex justify-between items-center bg-slate-100 p-2 border-b border-slate-300">
        <span className="font-semibold text-sm text-slate-700 ml-2">
          Product Catalog
        </span>
        <button
          onClick={() => setIsMinimized(true)}
          className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-colors"
          title="Minimize Panel"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="flex border-b border-slate-300">
        {(["chairs", "desks", "accessories"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setLeftTab(tab)}
            className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${leftTab === tab ? "bg-slate-50 border-b-2 border-slate-800 text-slate-900" : "text-slate-500 hover:bg-slate-50"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4 grid grid-cols-2 gap-4 h-87.5 overflow-y-auto bg-slate-50">
        {leftPanelItems.map((item) => {
          const Icon = IconMap[item.iconName];
          return (
            <button
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white border border-dashed border-slate-300 p-3 rounded-lg flex flex-col items-center justify-between hover:border-blue-400 hover:shadow-md transition-all h-32 group"
            >
              <div className="flex-1 flex items-center justify-center w-full relative">
                {item.imageUrl ? (
                  <Image
                    width={200}
                    height={200}
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-16 object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <Icon
                    size={32}
                    className="text-slate-400 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                )}
              </div>
              <span className="text-xs text-slate-600 font-medium text-center">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
