import { create } from "zustand";
import { WorkspaceState, Product } from "@/types";

interface WorkspaceStore extends WorkspaceState {
  setMainItem: (product: Product) => void;
  addAccessory: (product: Product) => void;
  addExtra: (product: Product) => void;
  removeMain: (type: "desks" | "chairs") => void;
  removeAccessory: (index: number) => void;
  removeExtra: (id: string) => void;
  getTotal: () => number;
  getSelectedItems: () => Product[];
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  desks: null,
  chairs: null,
  accessories: [],
  extras: [],

  setMainItem: (product) =>
    set((state) => ({
      ...state,
      [product.category === "desks" ? "desks" : "chairs"]: product,
    })),

  addAccessory: (product) =>
    set((state) => ({
      accessories: [...state.accessories, product],
    })),

  addExtra: (product) =>
    set((state) => {
      if (state.extras.some((p) => p.id === product.id)) return state;
      return { extras: [...state.extras, product] };
    }),

  removeMain: (type) => set({ [type]: null }),

  removeAccessory: (index) =>
    set((state) => ({
      accessories: state.accessories.filter((_, i) => i !== index),
    })),

  removeExtra: (id) =>
    set((state) => ({
      extras: state.extras.filter((e) => e.id !== id),
    })),

  getTotal: () => {
    const { desks, chairs, accessories, extras } = get();
    return [desks, chairs, ...accessories, ...extras]
      .filter((item): item is Product => Boolean(item))
      .reduce((sum, item) => sum + item.price, 0);
  },

  getSelectedItems: () => {
    const { desks, chairs, accessories, extras } = get();
    return [desks, chairs, ...accessories, ...extras].filter(
      (item): item is Product => Boolean(item)
    );
  },
}));
