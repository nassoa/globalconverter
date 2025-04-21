import DebugPanel from "@/components/debug-panel";
import GlobalConverter from "@/components/global-converter";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      {/* <div className="max-w-4xl mx-auto mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">GlobalConverter</h1>
        <Link
          href="/simple"
          className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Version simplifiée
        </Link>
      </div> */}
      <GlobalConverter />

      <DebugPanel />
    </main>
  );
}
