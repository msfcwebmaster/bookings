import { useCallback, useEffect, useMemo, useState } from "react";
import { format, parse, parseISO, addDays, compareAsc, endOfWeek, startOfWeek } from "date-fns";
import { Button } from "./components/Button";
import { Layout } from "./components/Layout";

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

const bookingDays = [
  { dayIndex: 3, offset: 2 }, // Wednesday
  { dayIndex: 4, offset: 3 }, // Thursday
  { dayIndex: 6, offset: 5 }, // Saturday
  { dayIndex: 0, offset: 6 }, // Sunday
];

const pitchOrder: Record<string, number> = {
  "3v3": 0,
  "5v5": 1,
  "7v7 (1)": 2,
  "7v7 (2)": 3,
  "9v9": 4,
};

const parseSlotStart = (time: string, date: Date) => {
  const [startTime] = time.split(" - ");
  return parse(startTime.trim().toUpperCase(), "h:mma", date);
};

const pitchFilters = [
  { value: "all", label: "All" },
  { value: "3v3", label: "3v3" },
  { value: "5v5", label: "5v5" },
  { value: "7v7", label: "7v7" },
  { value: "9v9", label: "9v9" },
] as const;

type PitchFilter = (typeof pitchFilters)[number]["value"];

const matchesPitchFilter = (record: BookingRecord, filter: PitchFilter) => {
  if (filter === "all") return true;
  if (filter === "7v7") return record.pitch.startsWith("7v7");
  return record.pitch === filter;
};

const App = () => {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedPitch, setSelectedPitch] = useState<PitchFilter>("all");
  const [bookings, setBookings] = useState<BookingRecord[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const loadBookings = useCallback(() => {
    setLoading(true);
    setFetchError(null);

    fetch(`${BOOKING_URL}?_=${Date.now()}`)
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

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

  const slotsByDay = useMemo(() => {
    const slotsMap = new Map<number, BookingRecord[]>();
    bookingDays.forEach((bookingDay) => slotsMap.set(bookingDay.dayIndex, []));

    if (!bookings) return slotsMap;

    for (const record of bookings) {
      if (!matchesPitchFilter(record, selectedPitch)) continue;
      const parsedDate = parseISO(record.date);
      if (parsedDate < weekStart || parsedDate > weekEnd) continue;
      const dayIndex = parsedDate.getDay();
      if (!slotsMap.has(dayIndex)) continue;
      slotsMap.get(dayIndex)?.push(record);
    }

    slotsMap.forEach((records) => {
      records.sort((a, b) => {
        const pitchOrderA = pitchOrder[a.pitch] ?? 999;
        const pitchOrderB = pitchOrder[b.pitch] ?? 999;
        if (pitchOrderA !== pitchOrderB) {
          return pitchOrderA - pitchOrderB;
        }
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);
        const startA = parseSlotStart(a.time, dateA);
        const startB = parseSlotStart(b.time, dateB);
        return compareAsc(startA, startB);
      });
    });

    return slotsMap;
  }, [bookings, weekEnd, weekStart]);

  const weekLabel = `${format(weekStart, "d MMM yyyy")} — ${format(weekEnd, "d MMM yyyy")}`;

  return (
    <Layout title="MSFC Bookings" description="Live pitch booking availability from Google Sheets.">
      <main className="container py-16">
        <section className="mb-12 rounded-3xl border border-line bg-surface p-10 shadow-sm">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-mid-grey">Pitch bookings</p>
            <h1 className="mt-4 text-4xl font-bold uppercase leading-tight">Weekly booking availability</h1>
            <p className="mt-4 text-foreground/75">
              Read-only pitch availability for the current week. To make a booking please message Pippa.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-foreground/60">Week starting Monday</p>
              <p className="mt-1 text-2xl font-semibold">{weekLabel}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
              <div className="flex flex-wrap gap-2">
                {pitchFilters.map((filter) => {
                  const active = filter.value === selectedPitch;
                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => setSelectedPitch(filter.value)}
                      className={`rounded-md border px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition ${
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-line bg-background text-foreground hover:bg-surface"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setWeekStart((c) => addDays(c, -7))}>
                  Previous week
                </Button>
                <Button variant="default" size="sm" onClick={() => setWeekStart((c) => addDays(c, 7))}>
                  Next week
                </Button>
                <Button variant="outline" size="sm" onClick={loadBookings}>
                  Refresh
                </Button>
              </div>
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
            {bookingDays.map(({ dayIndex, offset }) => {
              const dayDate = addDays(weekStart, offset);
              const records = slotsByDay.get(dayIndex) ?? [];
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
    </Layout>
  );
};

export default App;
