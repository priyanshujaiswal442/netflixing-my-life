import { Header } from "@/components/layout/header";
import { Hero } from "@/components/landing/hero";
import { DemoPosters } from "@/components/landing/demo-posters";
import { CtaSection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <DemoPosters />
      <CtaSection />
      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        <p>Netflixify My Life — Your story deserves the spotlight.</p>
      </footer>
    </main>
  );
}
