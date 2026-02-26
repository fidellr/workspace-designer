export type ItemCategory =
  | "desks"
  | "chairs"
  | "accessories"
  | "coffee"
  | "outdoor"
  | "relax"
  | "garage";

export interface Product {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  iconName: string;
  imageUrl?: string;
}

export interface WorkspaceState {
  desks: Product | null;
  chairs: Product | null;
  accessories: Product[];
  extras: Product[];
}
