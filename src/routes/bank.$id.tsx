import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { errorEntries, getEntry } from "@/data/errors";
import { questionsForHeadword } from "@/data/questions";

export const Route = createFileRoute("/bank/$id")({
  component: EntryPage,
});

function EntryPage() {
  const { id } = Route.useParams();
  const entry = getEntry(id);
  if (!entry) {
    return (
      <div className="rounded-xl border border-border bg-card p-8">
        <h1 className="font-display text-2xl">Entry not found</h1>
        <Button asChild className="mt-4" variant="outline">
          <Link to="/bank">Back to atlas</Link>
        </Button>
      </div>
    );
  }
  const related = questionsForHeadword(entry.headword);
  const idx = errorEntries.findIndex((e) => e.id === entry.id);
  const prev = errorEntries[idx - 1];
  const next = errorEntries[idx + 1];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <Link to="/bank" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        Atlas
      </Link>

      <div>
        <Badge>Part {entry.part}</Badge>
        <h1 className="mt-3 font-display text-4xl">{entry.headword}</h1>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Wrong</p>
          <p className="mt-2 font-display text-xl leading-8 text-primary line-through decoration-1">{entry.wrong}</p>
        </div>
        <div className="px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-success">Right</p>
          <p className="mt-2 font-display text-xl leading-8">{entry.right}</p>
        </div>
      </div>

      <p className="text-base leading-relaxed">{entry.note}</p>

      {related.length > 0 ? (
        <div>
          <h2 className="font-display text-xl">Mark this error</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {related.length} sentence{related.length === 1 ? "" : "s"} in the question bank.
          </p>
          <Button asChild className="mt-4">
            <Link to="/practice" search={{ headword: entry.headword }}>
              <PenLine className="size-4" />
              Drill {entry.headword}
            </Link>
          </Button>
        </div>
      ) : null}

      <div className="flex justify-between gap-3 border-t border-border pt-5">
        {prev ? (
          <Link to="/bank/$id" params={{ id: prev.id }} className="text-sm hover:text-primary">
            ← {prev.headword}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to="/bank/$id" params={{ id: next.id }} className="text-sm hover:text-primary">
            {next.headword} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
