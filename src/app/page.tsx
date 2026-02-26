import WorkspaceBuilder from "@/components/WorkspaceBuilder";
import { getProductsService } from "@/services/productService";

export const revalidate = 3600;

export default async function Home() {
  const initialProducts = await getProductsService();
  return (
    <main className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans overflow-x-hidden pb-20">
      <header className="text-center pt-8 pb-4">
        <h1 className="text-4xl font-bold text-slate-700 tracking-tight">
          Design Your Workspace!
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          — Create Your Perfect Setup! —
        </p>
      </header>

      <WorkspaceBuilder initialProducts={initialProducts} />
    </main>
  );
}
