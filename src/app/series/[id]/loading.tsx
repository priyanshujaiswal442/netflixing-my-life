import { Header } from "@/components/layout/header";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div
            className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent"
            aria-label="Loading"
          />
          <p className="mt-4 text-muted">Loading your series...</p>
        </div>
      </div>
    </main>
  );
}
