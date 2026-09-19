import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Minus, Plus, Underline } from "lucide-react";
import type { Question } from "@/data/questions";
import { checkMark, describeAnswer, tokenize, type StudentMark, type Token } from "@/lib/mark";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Tool = "replace" | "insert" | "delete" | "none";

const TOOLS: { id: Tool; label: string; hint: string; icon: typeof Underline }[] = [
  { id: "replace", label: "Replace", hint: "Tap a word, then write the correction above it.", icon: Underline },
  { id: "insert", label: "Insert", hint: "Tap a caret between words and add the missing word.", icon: Plus },
  { id: "delete", label: "Delete", hint: "Cross out one redundant word.", icon: Minus },
  { id: "none", label: "No error", hint: "Tick the sentence if it is already correct.", icon: Check },
];

type Props = {
  question: Question;
  index: number;
  total: number;
  onResolved: (correct: boolean) => void;
};

export function ProofDesk({ question, index, total, onResolved }: Props) {
  const tokens = useMemo(() => tokenize(question.prompt), [question.prompt]);
  const [tool, setTool] = useState<Tool>("replace");
  const [selected, setSelected] = useState<number | null>(null);
  const [gap, setGap] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [tries, setTries] = useState(0);
  const [verdict, setVerdict] = useState<"idle" | "correct" | "wrong">("idle");
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTool("replace");
    setSelected(null);
    setGap(null);
    setDraft("");
    setTries(0);
    setVerdict("idle");
  }, [question.id]);

  useEffect(() => {
    if ((tool === "replace" && selected !== null) || (tool === "insert" && gap !== null)) {
      inputRef.current?.focus();
    }
  }, [tool, selected, gap]);

  function pickWord(i: number) {
    if (verdict === "correct") return;
    if (tool === "none") setTool("replace");
    if (tool === "insert") return;
    setSelected(i);
    setGap(null);
    if (tool === "replace") setDraft("");
  }

  function pickGap(i: number) {
    if (verdict === "correct") return;
    setTool("insert");
    setGap(i);
    setSelected(null);
    setDraft("");
  }

  function currentMark(): StudentMark {
    if (tool === "none") return { type: "none" };
    if (tool === "delete" && selected !== null) return { type: "delete", index: selected };
    if (tool === "replace" && selected !== null && draft.trim()) {
      return { type: "replace", index: selected, to: draft.trim() };
    }
    if (tool === "insert" && gap !== null && draft.trim()) {
      return { type: "insert", gap, word: draft.trim() };
    }
    return { type: "empty" };
  }

  function submit() {
    const mark = currentMark();
    const ok = checkMark(question, mark);
    if (ok) {
      setVerdict("correct");
      return;
    }
    setTries((t) => t + 1);
    setVerdict("wrong");
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  }

  const revealed = verdict === "wrong" && tries >= 2;
  const canCheck =
    tool === "none" ||
    (tool === "delete" && selected !== null) ||
    (tool === "replace" && selected !== null && draft.trim().length > 0) ||
    (tool === "insert" && gap !== null && draft.trim().length > 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Question {index + 1} of {total}
        </p>
        <p className="font-display italic text-sm text-primary">{question.headword}</p>
      </div>

      <div
        className={cn(
          "paper-sheet relative overflow-hidden rounded-xl border border-border shadow-paper",
          shake && "motion-safe:animate-[shake_0.4s_ease-in-out]",
        )}
      >
        <div className="py-8 pl-10 pr-4 sm:py-10 sm:pl-16 sm:pr-8">
          <p className="mb-6 font-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Proofread the sentence
          </p>
          <Sentence
            tokens={tokens}
            tool={tool}
            selected={selected}
            gap={gap}
            draft={draft}
            onPickWord={pickWord}
            onPickGap={pickGap}
            ticked={tool === "none"}
            locked={verdict === "correct"}
          />
          {(tool === "replace" && selected !== null) || (tool === "insert" && gap !== null) ? (
            <label className="mt-6 flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {tool === "replace" ? "Write the correction" : "Word to insert"}
              </span>
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canCheck) submit();
                }}
                placeholder={tool === "replace" ? "replacement" : "missing word"}
                className="h-11 max-w-xs rounded-md border border-primary/40 bg-background px-3 font-display text-lg italic text-primary placeholder:text-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          const active = tool === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                if (verdict === "correct") return;
                setTool(t.id);
                setVerdict("idle");
                if (t.id !== "insert") setGap(null);
                if (t.id === "insert" || t.id === "none") setSelected(null);
                setDraft("");
              }}
              className={cn(
                "flex min-h-14 flex-col items-start gap-1 rounded-lg border px-3 py-2.5 text-left transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-muted",
              )}
            >
              <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                <Icon className="size-3.5" />
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-sm text-muted-foreground">{TOOLS.find((t) => t.id === tool)?.hint}</p>

      {verdict === "wrong" ? (
        <div className="rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-sm">
          <p className="font-medium text-primary">Not quite.</p>
          {revealed ? (
            <p className="mt-1 text-foreground">
              {describeAnswer(question)} {question.explanation}
            </p>
          ) : (
            <p className="mt-1 text-muted-foreground">
              Have another look — you have one more try before the mark is shown.
            </p>
          )}
        </div>
      ) : null}

      {verdict === "correct" ? (
        <div className="rounded-lg border border-success/25 bg-success/10 px-4 py-3 text-sm">
          <p className="font-medium text-success">Correct.</p>
          <p className="mt-1 text-foreground">{question.explanation}</p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        {verdict === "correct" || revealed ? (
          <Button variant="ink" onClick={() => onResolved(verdict === "correct")}>
            Continue
          </Button>
        ) : (
          <Button onClick={submit} disabled={!canCheck}>
            Check mark
          </Button>
        )}
        {verdict === "wrong" && !revealed ? (
          <Button variant="ghost" onClick={() => setTries(2)}>
            Show the mark
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function Sentence({
  tokens,
  tool,
  selected,
  gap,
  draft,
  onPickWord,
  onPickGap,
  ticked,
  locked,
}: {
  tokens: Token[];
  tool: Tool;
  selected: number | null;
  gap: number | null;
  draft: string;
  onPickWord: (i: number) => void;
  onPickGap: (i: number) => void;
  ticked: boolean;
  locked: boolean;
}) {
  return (
    <p
      className={cn(
        "font-display text-2xl leading-10 text-foreground",
        ticked && "underline decoration-success/70 decoration-2 underline-offset-8",
      )}
    >
      {tokens.map((token, i) => (
        <span key={`${token.raw}-${i}`} className="inline">
          <Gap
            active={tool === "insert" || gap === i}
            selected={gap === i}
            draft={draft}
            onClick={() => onPickGap(i)}
          />
          <button
            type="button"
            disabled={locked}
            onClick={() => onPickWord(i)}
            className={cn(
              "relative inline min-h-11 rounded-sm px-0.5 py-1 align-baseline transition-colors",
              selected === i &&
                tool === "replace" &&
                "bg-primary/10 text-primary underline decoration-2 underline-offset-4",
              selected === i && tool === "delete" && "text-primary line-through decoration-2",
              tool !== "insert" && "hover:bg-muted",
            )}
          >
            {selected === i && tool === "replace" && draft ? (
              <span className="absolute -top-6 left-0 font-display text-sm italic text-primary">{draft}</span>
            ) : null}
            {token.raw}
          </button>
        </span>
      ))}
      <Gap
        active={tool === "insert" || gap === tokens.length}
        selected={gap === tokens.length}
        draft={draft}
        onClick={() => onPickGap(tokens.length)}
      />
      {ticked ? (
        <span className="ml-3 inline-flex size-7 translate-y-0.5 items-center justify-center rounded-full border-2 border-success text-success">
          <Check className="size-4" strokeWidth={3} />
        </span>
      ) : null}
    </p>
  );
}

function Gap({
  active,
  selected,
  draft,
  onClick,
}: {
  active: boolean;
  selected: boolean;
  draft: string;
  onClick: () => void;
}) {
  if (!active && !selected) {
    return <span className="inline-block w-1"> </span>;
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Insert here"
      className={cn(
        "relative inline-flex h-11 w-3 align-middle sm:w-4",
        selected && "w-4",
      )}
    >
      <span
        className={cn(
          "absolute left-1/2 top-2 h-7 w-px -translate-x-1/2",
          selected ? "bg-primary" : "bg-border",
        )}
      />
      {selected ? (
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-xs italic text-primary">
          {draft || "^"}
        </span>
      ) : null}
    </button>
  );
}
