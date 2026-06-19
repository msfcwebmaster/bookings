import { Logo } from "./Logo";
import { StripeBar } from "./Stripes";

export const Header = () => (
  <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
    <StripeBar />
    <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
      <Logo />
      <div className="text-right text-sm uppercase tracking-[0.2em] text-foreground/70">
        <p>MSFC Bookings</p>
        <p className="text-foreground/50">Pitch availability only</p>
      </div>
    </div>
  </header>
);
