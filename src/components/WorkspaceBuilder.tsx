"use client";

import { useState } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import CenterCanvas from "./CenterCanvas";
import BottomDock from "./BottomDock";
import CheckoutModal from "./CheckoutModal";
import { Product } from "@/types";

interface Props {
  initialProducts: Product[];
}

export default function WorkspaceBuilder({ initialProducts }: Props) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <section
        aria-label="Interactive Workspace Canvas"
        className="relative w-full max-w-7xl mx-auto h-150 mt-8 bg-white/40 rounded-3xl border border-slate-200 shadow-inner"
      >
        <LeftPanel products={initialProducts} />
        <RightPanel products={initialProducts} />

        <CenterCanvas onCheckoutClick={() => setIsCheckoutOpen(true)} />

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-48 border-t-2 border-slate-300 rounded-[100%] z-0 bg-linear-to-b from-slate-100 to-transparent pointer-events-none"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        />
      </section>

      <BottomDock products={initialProducts} />

      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
}
