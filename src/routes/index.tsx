import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Highlighter, RotateCcw } from "lucide-react";
import { papers, questions } from "@/data/questions";
import { errorEntries } from "@/data/errors";
import { useHydrated } from "@/lib/use-hydrated";
import { paperAccuracy, statsFrom, useProgress, weakHeadwords } from "@/lib/progress-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const hydrated = useHydrated();
  const attempts = useProgress((s) => s.attempts);
  const reset = useProgress((s) => s.reset);
  const liveAttempts = hydrated ? attempts : [];
  const stats = statsFrom(liveAttempts);
  const weak = weakHeadwords(liveAttempts);

  return (
    <div className="flex flex-col gap-10">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <Badge tone="red">Common Errors trainer</Badge>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Mark the sentence.
            <span className="block text-primary">Train the grammar.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Exam-style proofreading from the Hong Kong Common Errors bank. Underline and replace a
            word, caret in a missing one, cross out the extra, or tick a clean sentence.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/practice" search={{ mode: "mixed" }}>
                Start a mixed paper
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/bank">Browse the atlas</Link>
            </Button>
          </div>
        </div>

        <div className="paper-sheet rounded-xl border border-border px-10 py-8 shadow-paper sm:px-14">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">Sample mark</p>
          <p className="mt-5 font-display text-xl leading-9 text-foreground">
            I am afraid of{" "}
            <span className="relative text-primary">
              <span className="absolute -top-5 left-0 text-sm italic">crossing</span>
              <span className="underline decoration-2 underline-offset-4">acrossing</span>
            </span>{" "}
            that road at night.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">{questions.length} items in the bank.</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Items in bank", value: String(questions.length) },
          { label: "Error entries", value: String(errorEntries.length) },
          { label: "Answered", value: `${stats.answered}/${stats.total}` },
          { label: "Accuracy", value: stats.marks ? `${stats.accuracy}%` : "—" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-card px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
            <p className="mt-1 font-display text-2xl tabular-nums">{item.value}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl">Sit a paper</h2>
          <Link to="/practice" className="text-sm font-medium text-primary hover:underline">
            All modes
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {papers.map((paper) => {
            const acc = paperAccuracy(liveAttempts, paper.id);
            const count = questions.filter((q) => q.paper === paper.id).length;
            return (
              <Link
                key={paper.id}
                to="/practice"
                search={{ mode: String(paper.id) }}
                className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted/40"
              >
                <div className="flex items-start justify-between">
                  <Badge>{count} questions</Badge>
                  {acc !== null ? <span className="text-sm tabular-nums text-muted-foreground">{acc}%</span> : null}
                </div>
                <h3 className="mt-3 font-display text-xl">{paper.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{paper.subtitle}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open paper
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            );
          })}
          <Link
            to="/practice"
            search={{ mode: "drill" }}
            className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <Badge tone="red">Speed</Badge>
            <h3 className="mt-3 font-display text-xl">Atlas drills</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Short sentences, one trap each — built from the dictionary.
            </p>
          </Link>
        </div>
      </section>

      {weak.length > 0 ? (
        <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Highlighter className="size-4 text-primary" />
            <h2 className="font-display text-xl">Needs another look</h2>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {weak.map((word) => (
              <Link
                key={word}
                to="/bank"
                search={{ q: word }}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
              >
                {word}
              </Link>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-5">
            <Link to="/practice" search={{ mode: "review" }}>
              <RotateCcw className="size-4" />
              Review missed items
            </Link>
          </Button>
        </section>
      ) : null}

      <section className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
        <p className="inline-flex items-center gap-2">
          <Check className="size-4 text-success" />
          Progress stays on this device.
        </p>
        <div className="flex gap-3">
          <Link to="/bank" className="inline-flex items-center gap-1 hover:text-foreground">
            <BookOpen className="size-4" />
            Atlas
          </Link>
          {liveAttempts.length > 0 ? (
            <button type="button" onClick={reset} className="hover:text-foreground">
              Reset marks
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
}
