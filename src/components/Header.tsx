import { Logo } from "./Logo";
import { StripeBar } from "./Stripes";

export const Header = () => (
  <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
    <StripeBar />
    <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
      <Logo />
      <div className="text-right text-sm uppercase tracking-[0.2em] text-foreground/70">
        <a
          href="https://www.moordownandsouthbournefc.co.uk/"
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block rounded-full border-2 border-background/10 px-3 py-1 text-xs font-semibold text-foreground/80 hover:bg-background/5"
        >
          Visit club website
        </a>
      </div>
    </div>
  </header>
);
