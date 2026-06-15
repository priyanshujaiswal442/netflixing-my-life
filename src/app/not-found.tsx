import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl text-muted">This series doesn&apos;t exist yet.</p>
        <p className="mt-2 text-sm text-muted">
          Perhaps it&apos;s still in production.
        </p>
        <Button asChild className="mt-8">
          <Link href="/create">Create Your Series</Link>
        </Button>
      </div>
    </main>
  );
}
