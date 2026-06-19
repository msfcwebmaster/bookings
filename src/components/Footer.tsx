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
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-background/60">Contact</h3>
        <p className="mt-4 text-sm text-background/85">
          For booking questions, contact the club directly via the main site contact methods.
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
