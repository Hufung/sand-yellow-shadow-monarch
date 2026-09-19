import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ProofDesk } from "@/components/proof-desk";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { papers, questions, type PaperId, type Question } from "@/data/questions";
import { pickSession, useProgress } from "@/lib/progress-store";

type Mode = "mixed" | "drill" | "review" | `${PaperId}`;

type Search = { mode?: string; headword?: string };

export const Route = createFileRoute("/practice")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    mode: typeof search.mode === "string" ? search.mode : undefined,
    headword: typeof search.headword === "string" ? search.headword : undefined,
  }),
  component: PracticePage,
});

function parseMode(raw?: string): Mode | null {
  if (!raw) return null;
  if (raw === "mixed" || raw === "drill" || raw === "review") return raw;
  if (["1", "2", "3", "4", "5"].includes(raw)) return raw as Mode;
  return null;
}

function PracticePage() {
  const { mode: rawMode, headword } = Route.useSearch();
  const mode = parseMode(rawMode);

  if (headword) return <HeadwordSession headword={headword} />;
  if (!mode) return <ModePicker />;
  const kind = mode === "mixed" || mode === "drill" || mode === "review" ? mode : (Number(mode) as PaperId);
  return <Session kind={kind} />;
}

function ModePicker() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Papers</p>
        <h1 className="mt-2 font-display text-4xl">Choose a set</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          One mistake or none. Underline and replace, caret in a word, cross one out, or tick.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {papers.map((paper) => {
          const count = questions.filter((q) => q.paper === paper.id).length;
          return (
            <Link
              key={paper.id}
              to="/practice"
              search={{ mode: String(paper.id) }}
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/40"
            >
              <Badge>{count} questions</Badge>
              <h2 className="mt-3 font-display text-2xl">{paper.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{paper.subtitle}</p>
            </Link>
          );
        })}
        <Link
          to="/practice"
          search={{ mode: "mixed" }}
          className="rounded-xl border border-border bg-card p-5 hover:border-primary/40"
        >
          <Badge tone="red">10 questions</Badge>
          <h2 className="mt-3 font-display text-2xl">Mixed paper</h2>
          <p className="mt-1 text-sm text-muted-foreground">A random ten from the original worksheets.</p>
        </Link>
        <Link
          to="/practice"
          search={{ mode: "drill" }}
          className="rounded-xl border border-border bg-card p-5 hover:border-primary/40"
        >
          <Badge tone="ink">10 questions</Badge>
          <h2 className="mt-3 font-display text-2xl">Atlas drills</h2>
          <p className="mt-1 text-sm text-muted-foreground">Short traps from the dictionary.</p>
        </Link>
        <Link
          to="/practice"
          search={{ mode: "review" }}
          className="rounded-xl border border-border bg-card p-5 hover:border-primary/40"
        >
          <Badge>Review</Badge>
          <h2 className="mt-3 font-display text-2xl">Missed items</h2>
          <p className="mt-1 text-sm text-muted-foreground">Re-mark the sentences you got wrong.</p>
        </Link>
      </div>
    </div>
  );
}

function HeadwordSession({ headword }: { headword: string }) {
  const set = useMemo(
    () => questions.filter((q) => q.headword.toLowerCase() === headword.toLowerCase()),
    [headword],
  );
  if (!set.length) {
    return (
      <div>
        <p>No questions for {headword}.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/bank">Back to atlas</Link>
        </Button>
      </div>
    );
  }
  return <Run items={set} title={headword} />;
}

function Session({ kind }: { kind: "mixed" | "drill" | "review" | PaperId }) {
  const [set] = useState(() => pickSession(kind, useProgress.getState().attempts));
  const title =
    kind === "mixed"
      ? "Mixed paper"
      : kind === "drill"
        ? "Atlas drills"
        : kind === "review"
          ? "Review"
          : (papers.find((p) => p.id === kind)?.title ?? "Paper");
  return <Run items={set} title={title} />;
}

function Run({ items, title }: { items: Question[]; title: string }) {
  const record = useProgress((s) => s.record);
  const [i, setI] = useState(0);
  const [results, setResults] = useState<{ id: string; correct: boolean }[]>([]);
  const current = items[i];
  const done = i >= items.length;

  if (!items.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-8">
        <h1 className="font-display text-2xl">Nothing to review yet</h1>
        <p className="mt-2 text-muted-foreground">Sit a paper first, then missed items will collect here.</p>
        <Button asChild className="mt-5">
          <Link to="/practice">Choose a paper</Link>
        </Button>
      </div>
    );
  }

  if (done) {
    const score = results.filter((r) => r.correct).length;
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <CheckCircle2 className="mx-auto size-10 text-success" />
          <h1 className="mt-4 font-display text-3xl">Paper marked</h1>
          <p className="mt-2 font-display text-5xl tabular-nums text-primary">
            {score}
            <span className="text-2xl text-muted-foreground">/{items.length}</span>
          </p>
          <ul className="mt-6 space-y-2 text-left">
            {items.map((q, idx) => {
              const r = results[idx];
              return (
                <li
                  key={q.id}
                  className="flex items-start justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2"
                >
                  <span className="text-sm">
                    <span className="font-medium">{q.headword}</span>
                    <span className="mt-0.5 block text-muted-foreground">
                      {q.prompt.slice(0, 72)}
                      {q.prompt.length > 72 ? "…" : ""}
                    </span>
                  </span>
                  <span className={r?.correct ? "text-success" : "text-primary"}>
                    {r?.correct ? "Tick" : "Miss"}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/practice">Another paper</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Back to desk</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/practice"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Papers
        </Link>
        <p className="font-display text-sm text-muted-foreground">{title}</p>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-300"
          style={{ width: `${(i / items.length) * 100}%` }}
        />
      </div>
      <ProofDesk
        key={current.id}
        question={current}
        index={i}
        total={items.length}
        onResolved={(correct) => {
          record(current.id, correct);
          setResults((r) => [...r, { id: current.id, correct }]);
          setI((n) => n + 1);
        }}
      />
    </div>
  );
}
