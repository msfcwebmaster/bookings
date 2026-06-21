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
          className="mt-1 inline-flex items-center justify-end gap-2 rounded-full border-2 border-background/10 px-3 py-1 text-xs font-semibold text-foreground/80 hover:bg-background/5"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" />
            <path d="M12 4.5l1.6 3.6 3.9.5-2.8 2.4.7 3.8L12 14.6l-3.4 1.7.7-3.8L6.5 8.6l3.9-.5L12 4.5z" fill="currentColor" />
          </svg>
          Visit club website
        </a>
      </div>
    </div>
  </header>
);
