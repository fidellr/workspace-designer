import { Product } from "@/types";
import { products } from "@/data/products";

export async function getProductsService(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products;
}
