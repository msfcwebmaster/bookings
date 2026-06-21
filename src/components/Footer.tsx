import { StripeBar } from "./Stripes";

export const Footer = () => (
  <footer className="mt-24 bg-foreground text-background">
    <StripeBar />
    <div className="container grid gap-12 py-16 md:grid-cols-3">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-background/80">MSFC Bookings</h2>
        <p className="mt-4 text-sm text-background/70">
          Read-only pitch availability for Moordown & Southbourne FC. This site is for viewing current pitch bookings and availability only.
        </p>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-background/60">Quick info</h3>
        <ul className="mt-4 space-y-2 text-sm text-background/85">
          <li>Wednesday, Thursday, Saturday & Sunday slots</li>
          <li>Pulls live availability from Google Sheets</li>
          <li>Refresh button forces a fresh fetch</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-background/60">Connect</h3>
        <div className="mt-4 flex items-center gap-3">
          <a
            href="https://www.facebook.com/MoordownAndSouthbourne"
            target="_blank"
            rel="noreferrer"
            aria-label="Moordown & Southbourne FC on Facebook"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-background/15 bg-[#1877F2]/10 text-[#1877F2] transition hover:bg-[#1877F2]/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07C1.86 17.09 5.8 21.13 10.6 21.95v-6.93H7.9v-2.84h2.7V9.77c0-2.66 1.6-4.13 4.05-4.13 1.17 0 2.4.21 2.4.21v2.64h-1.35c-1.33 0-1.74.82-1.74 1.66v2H18l-.43 2.84h-2.53v6.93c4.8-.82 8.74-4.86 8.74-9.88z" />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/moordownsouthbournefc"
            target="_blank"
            rel="noreferrer"
            aria-label="Moordown & Southbourne FC on Instagram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-background/15 bg-[#E4405F]/10 text-[#E4405F] transition hover:bg-[#E4405F]/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm8.5 4.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 11.001 5.001A2.5 2.5 0 0112 9.5z" />
            </svg>
          </a>
        </div>

        <p className="mt-4 text-sm text-background/85">
          Visit the club website: <a href="https://www.moordownandsouthbournefc.co.uk/" target="_blank" rel="noreferrer" className="underline">Moordown &amp; Southbourne FC</a>
        </p>
      </div>
    </div>

    <div className="border-t border-background/15">
      <div className="container flex flex-col gap-4 py-6 text-xs text-background/60 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Moordown & Southbourne FC. All rights reserved.</p>
        <p>Booking view only. No bookings can be made here.</p>
      </div>
    </div>
  </footer>
);
