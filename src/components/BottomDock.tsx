import Image from "next/image";
import { Product, WorkspaceState } from "@/types";
import { IconMap } from "@/lib/icons";

export default function BottomDock({
  products,
  workspace,
  onAddExtra,
}: {
  products: Product[];
  workspace: WorkspaceState;
  onAddExtra: (p: Product) => void;
}) {
  const columns = [
    { title: "Coffee Station", id: "e1" },
    { title: "Outdoor Gear", id: "e2", id2: "e3" },
    { title: "Relax Zone", id: "e4" },
    { title: "Garage Space", id: "e5" },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-28 pt-10 border-t border-dashed border-slate-300">
      <div className="grid grid-cols-4 gap-4 text-center">
        {columns.map((col, idx) => (
          <div
            key={idx}
            className="relative border-r border-dashed border-slate-300 last:border-0 px-4"
          >
            <div className="inline-block bg-white border border-slate-200 px-5 py-1.5 rounded-full font-bold text-slate-600 text-sm mb-6 shadow-sm -mt-14">
              {col.title}
            </div>
            <div className="flex justify-center gap-4">
              {[col.id, col.id2].filter(Boolean).map((itemId) => {
                const item = products.find((p) => p.id === itemId);
                if (!item) return null;
                const Icon = IconMap[item.iconName];
                const isAdded = workspace.extras.some((e) => e.id === item.id);

                return (
                  <div
                    key={item.id}
                    className={`border border-dashed p-4 rounded-xl flex flex-col items-center bg-white transition-all w-full max-w-[120px] ${isAdded ? "border-green-500 bg-green-50 ring-1 ring-green-500 opacity-50" : "border-slate-300 hover:border-slate-400"}`}
                  >
                    {item.imageUrl ? (
                      <Image
                        width={150}
                        height={150}
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-auto h-12 object-contain mix-blend-multiply mb-3"
                      />
                    ) : (
                      <Icon
                        size={32}
                        className={`${isAdded ? "text-green-600" : "text-slate-400"} mb-3`}
                        strokeWidth={1.5}
                      />
                    )}
                    <button
                      onClick={() => onAddExtra(item)}
                      disabled={isAdded}
                      className={`text-xs font-semibold w-full py-1.5 rounded ${isAdded ? "text-green-700 bg-green-100 cursor-not-allowed" : "text-slate-600 bg-slate-100 hover:bg-slate-200"}`}
                    >
                      {isAdded ? "On Canvas ✓" : `+ Add`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
