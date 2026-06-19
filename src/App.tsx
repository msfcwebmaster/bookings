import { useEffect, useMemo, useState } from "react";
import { format, parse, parseISO, addDays, compareAsc, endOfWeek, startOfWeek } from "date-fns";
import { Button } from "./components/Button";

type BookingRecord = {
  datefull: string;
  date: string;
  pitch: string;
  time: string;
  booking: string;
};

const BOOKING_URL =
  "https://script.google.com/macros/s/AKfycbw_7ZS6PM8xzNj8t10ZZrDKHRAemPXf_odqPUoXRSrXvw7jlNPVn_ypa3EEzeVFGwChKQ/exec";

const weekdayLabels: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const displayedDayOffsets = [2, 3, 5, 6];

const parseSlotStart = (time: string, date: Date) => {
  const [startTime] = time.split(" - ");
  return parse(startTime.trim().toUpperCase(), "h:mma", date);
};

const App = () => {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [bookings, setBookings] = useState<BookingRecord[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setFetchError(null);

    fetch(BOOKING_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load booking availability.");
        return response.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        setFetchError(error instanceof Error ? error.message : String(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

  const slotsByDay = useMemo(() => {
    const slotsMap = new Map<number, BookingRecord[]>();
    displayedDayOffsets.forEach((offset) => slotsMap.set(offset, []));

    if (!bookings) return slotsMap;

    for (const record of bookings) {
      const parsedDate = parseISO(record.date);
      if (parsedDate < weekStart || parsedDate > weekEnd) continue;
      const dayIndex = parsedDate.getDay();
      if (!slotsMap.has(dayIndex)) continue;
      slotsMap.get(dayIndex)?.push(record);
    }

    slotsMap.forEach((records) => {
      records.sort((a, b) => {
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);
        const startA = parseSlotStart(a.time, dateA);
        const startB = parseSlotStart(b.time, dateB);
        const result = compareAsc(startA, startB);
        return result !== 0 ? result : a.pitch.localeCompare(b.pitch);
      });
    });

    return slotsMap;
  }, [bookings, weekEnd, weekStart]);

  const weekLabel = `${format(weekStart, "d MMM yyyy")} — ${format(weekEnd, "d MMM yyyy")}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container py-16">
        <section className="mb-12 rounded-3xl border border-line bg-surface p-10 shadow-sm">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-mid-grey">Pitch bookings</p>
            <h1 className="mt-4 text-4xl font-bold uppercase leading-tight">Weekly booking availability</h1>
            <p className="mt-4 text-foreground/75">
              Read-only pitch availability for the current week. Wednesday, Thursday, Saturday and Sunday only.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-foreground/60">Week starting Monday</p>
              <p className="mt-1 text-2xl font-semibold">{weekLabel}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setWeekStart((c) => addDays(c, -7))}>
                Previous week
              </Button>
              <Button variant="default" size="sm" onClick={() => setWeekStart((c) => addDays(c, 7))}>
                Next week
              </Button>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="rounded-3xl border border-line bg-background p-10 text-center text-foreground/70">Loading booking availability…</div>
        ) : fetchError ? (
          <div className="rounded-3xl border border-destructive/30 bg-destructive/10 p-10 text-center text-destructive">
            {fetchError}
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-4">
            {displayedDayOffsets.map((offset) => {
              const dayDate = addDays(weekStart, offset);
              const records = slotsByDay.get(offset) ?? [];
              const dayLabel = weekdayLabels[dayDate.getDay()];

              return (
                <article key={dayLabel} className="rounded-3xl border border-line bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-mid-grey">{dayLabel}</p>
                      <p className="text-xl font-semibold">{format(dayDate, "d MMM")}</p>
                    </div>
                    <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-foreground/75">
                      {records.length} slots
                    </span>
                  </div>

                  {records.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-line/60 bg-surface p-8 text-center text-sm text-foreground/70">
                      No bookings found for this day.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {records.map((record, index) => {
                        const available = !record.booking?.trim();
                        return (
                          <div
                            key={`${record.pitch}-${record.time}-${index}`}
                            className={`rounded-3xl border p-4 ${available ? "border-grass/20 bg-grass/5" : "border-line/70 bg-surface"}`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-semibold">{record.pitch}</p>
                                <p className="mt-1 text-sm text-foreground/70">{record.time}</p>
                              </div>
                              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${available ? "bg-grass/10 text-grass" : "bg-foreground/10 text-foreground"}`}>
                                {available ? "Available" : "Booked"}
                              </span>
                            </div>
                            {!available && <p className="mt-3 text-sm text-foreground/75">{record.booking}</p>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
