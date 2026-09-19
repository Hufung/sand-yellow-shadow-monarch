import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { entryLetter, errorEntries, letters } from "@/data/errors";
import { questionsForHeadword } from "@/data/questions";
import { cn } from "@/lib/utils";

type Search = { q?: string; letter?: string };

export const Route = createFileRoute("/bank")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : undefined,
    letter: typeof search.letter === "string" ? search.letter : undefined,
  }),
  component: BankPage,
});

function BankPage() {
  const { q, letter } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q ?? "");

  const filtered = useMemo(() => {
    const needle = (query || q || "").trim().toLowerCase();
    return errorEntries.filter((entry) => {
      const L = entryLetter(entry);
      if (letter && L !== letter.toUpperCase()) return false;
      if (!needle) return true;
      return (
        entry.headword.toLowerCase().includes(needle) ||
        entry.note.toLowerCase().includes(needle) ||
        entry.wrong.toLowerCase().includes(needle)
      );
    });
  }, [query, q, letter]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Atlas</p>
        <h1 className="mt-2 font-display text-4xl">Common errors A–Z</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Wrong line, right line, and the note behind each trap — the same bank the papers are drawn from.
        </p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            void navigate({ search: (prev) => ({ ...prev, q: e.target.value || undefined }) });
          }}
          placeholder="Search headwords, notes, examples"
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => void navigate({ search: (prev) => ({ ...prev, letter: undefined }) })}
          className={cn(
            "flex h-11 min-w-9 items-center justify-center rounded-md px-1 text-xs font-medium",
            !letter ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          All
        </button>
        {letters.map((L) => {
          const has = errorEntries.some((e) => entryLetter(e) === L);
          return (
            <button
              key={L}
              type="button"
              disabled={!has}
              onClick={() => void navigate({ search: (prev) => ({ ...prev, letter: L }) })}
              className={cn(
                "flex h-11 min-w-9 items-center justify-center rounded-md px-1 text-xs font-medium disabled:opacity-30",
                letter === L ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {L}
            </button>
          );
        })}
      </div>

      <p className="text-sm tabular-nums text-muted-foreground">{filtered.length} entries</p>

      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {filtered.map((entry) => {
          const n = questionsForHeadword(entry.headword).length;
          return (
            <li key={entry.id}>
              <Link
                to="/bank/$id"
                params={{ id: entry.id }}
                className="flex flex-col gap-1 px-4 py-4 hover:bg-muted/50 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-lg">{entry.headword}</h2>
                    {n > 0 ? <Badge>{n} to mark</Badge> : null}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{entry.note}</p>
                </div>
                <p className="shrink-0 font-display text-sm italic text-primary sm:max-w-xs sm:text-right">
                  {entry.wrong}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
