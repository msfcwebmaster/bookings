import badge from "../../../club-connect-main/src/assets/club-badge.png";

export const Logo = ({ inverted = false }: { inverted?: boolean }) => (
  <div className="flex items-center gap-3">
    <img src={badge} alt="Club badge" className="h-12 w-12 rounded-full object-cover" />
    <div className={`leading-tight ${inverted ? "text-background" : "text-foreground"}`}>
      <span className="block font-display text-base font-extrabold uppercase tracking-wide">
        MSFC Bookings
      </span>
      <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] opacity-70">
        Pitch availability
      </span>
    </div>
  </div>
);
