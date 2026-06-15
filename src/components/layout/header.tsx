import { Logo } from "./logo";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden sm:block" aria-label="Main navigation">
          <span className="text-sm text-muted">Your life. Your series.</span>
        </nav>
      </div>
    </header>
  );
}
