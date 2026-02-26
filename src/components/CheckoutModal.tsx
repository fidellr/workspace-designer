import { Product } from "@/types";
import { X } from "lucide-react";
import { IconMap } from "@/lib/icons";

interface CheckoutModalProps {
  selectedItems: Product[];
  total: number;
  isSetupValid: boolean;
  onClose: () => void;
}

export default function CheckoutModal({
  selectedItems,
  total,
  isSetupValid,
  onClose,
}: CheckoutModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-slate-800">
          Your Workspace
        </h2>
        <p className="text-slate-500 mb-6 text-sm">
          Review your selected items for Bali.
        </p>

        {!isSetupValid && (
          <div className="bg-amber-50 text-amber-700 p-4 rounded-xl mb-6 text-sm font-medium border border-amber-200">
            Warning: You should probably select at least one Desk and Chair to
            make this a functional workspace!
          </div>
        )}

        <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2">
          {selectedItems.length === 0 ? (
            <p className="text-slate-400 text-center py-8">
              Your canvas is empty!
            </p>
          ) : (
            selectedItems.map((item, idx) => {
              const Icon = IconMap[item.iconName];
              return (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-slate-100 pb-3"
                >
                  <span className="text-slate-700 font-medium flex items-center gap-3">
                    <span className="bg-slate-100 p-2 rounded-lg">
                      <Icon size={16} className="text-slate-500" />
                    </span>
                    {item.name}
                  </span>
                  <span className="text-slate-900 font-bold">
                    ${item.price}/mo
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-between items-center mb-8 pt-4 border-t-2 border-slate-800 text-xl font-bold text-slate-800">
          <span>Monthly Total</span>
          <span>${total}/mo</span>
        </div>

        <button
          disabled={selectedItems.length === 0}
          className="w-full py-4 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => alert("Redirecting to checkout system...")}
        >
          Confirm & Checkout
        </button>
      </div>
    </div>
  );
}
