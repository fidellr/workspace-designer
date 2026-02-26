import WorkspaceBuilder from "@/components/WorkspaceBuilder";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans overflow-x-hidden pb-20">
      <header className="text-center pt-8 pb-4">
        <h1 className="text-4xl font-bold text-slate-700">
          Design Your Workspace!
        </h1>
        <p className="text-slate-500 mt-2">— Create Your Perfect Setup! —</p>
      </header>

      <WorkspaceBuilder />
    </main>
  );
}
