"use client";

import { useState, useEffect } from "react";
import { WorkspaceState, Product } from "@/types";
import { products as localProducts } from "@/data/products"; // fallback local import
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import CenterCanvas from "./CenterCanvas";
import BottomDock from "./BottomDock";
import CheckoutModal from "./CheckoutModal";

export default function WorkspaceBuilder() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [workspace, setWorkspace] = useState<WorkspaceState>({
    desks: null,
    chairs: null,
    accessories: [],
    extras: [],
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("API route not found or failed");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn("Falling back to local data:", err.message);
        setProducts(localProducts);
        setIsLoading(false);
      });
  }, []);

  const handleLeftPanelClick = (product: Product) => {
    if (product.category === "accessories") {
      handleAddAccessory(product);
    } else {
      setWorkspace((prev) => ({
        ...prev,
        [product.category]: product,
      }));
    }
  };

  const handleAddAccessory = (product: Product) => {
    setWorkspace((prev) => ({
      ...prev,
      accessories: [...prev.accessories, product],
    }));
  };

  const handleAddExtra = (product: Product) => {
    setWorkspace((prev) => {
      if (prev.extras.find((p) => p.id === product.id)) return prev;
      return { ...prev, extras: [...prev.extras, product] };
    });
  };

  const handleRemoveMain = (type: "desks" | "chairs") =>
    setWorkspace((prev) => ({ ...prev, [type]: null }));

  const handleRemoveAccessory = (index: number) =>
    setWorkspace((prev) => ({
      ...prev,
      accessories: prev.accessories.filter((_, i) => i !== index),
    }));

  const handleRemoveExtra = (id: string) =>
    setWorkspace((prev) => ({
      ...prev,
      extras: prev.extras.filter((e) => e.id !== id),
    }));

  if (isLoading) {
    return (
      <div className="min-h-150 flex items-center justify-center text-slate-500">
        Loading inventory...
      </div>
    );
  }

  const selectedItems = [
    workspace.desks,
    workspace.chairs,
    ...workspace.accessories,
    ...workspace.extras,
  ].filter(Boolean) as Product[];

  const total = selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <>
      <div className="relative w-full max-w-7xl mx-auto h-150 mt-8 bg-white/40 rounded-3xl border border-slate-200 shadow-inner">
        <LeftPanel products={products} onSelectItem={handleLeftPanelClick} />
        <RightPanel products={products} onAddAccessory={handleAddAccessory} />

        <CenterCanvas
          workspace={workspace}
          total={total}
          onRemoveMain={handleRemoveMain}
          onRemoveAccessory={handleRemoveAccessory}
          onRemoveExtra={handleRemoveExtra}
          onCheckoutClick={() => setIsCheckoutOpen(true)}
        />

        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-48 border-t-2 border-slate-300 rounded-[100%] z-0 bg-linear-to-b from-slate-100 to-transparent pointer-events-none"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        />
      </div>

      <BottomDock
        products={products}
        workspace={workspace}
        onAddExtra={handleAddExtra}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          selectedItems={selectedItems}
          total={total}
          isSetupValid={!!(workspace.desks && workspace.chairs)}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </>
  );
}
