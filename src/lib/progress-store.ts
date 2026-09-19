import { create } from "zustand";
import { persist } from "zustand/middleware";
import { questions, type PaperId, type Question } from "@/data/questions";

export type Attempt = {
  questionId: string;
  correct: boolean;
  at: number;
};

type ProgressState = {
  attempts: Attempt[];
  record: (questionId: string, correct: boolean) => void;
  reset: () => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      attempts: [],
      record: (questionId, correct) =>
        set((s) => ({
          attempts: [...s.attempts, { questionId, correct, at: Date.now() }].slice(-800),
        })),
      reset: () => set({ attempts: [] }),
    }),
    { name: "red-ink-progress-v1" },
  ),
);

export function latestByQuestion(attempts: Attempt[]): Map<string, Attempt> {
  const map = new Map<string, Attempt>();
  for (const a of attempts) map.set(a.questionId, a);
  return map;
}

export function statsFrom(attempts: Attempt[]) {
  const latest = latestByQuestion(attempts);
  let correct = 0;
  for (const a of latest.values()) if (a.correct) correct += 1;
  const answered = latest.size;
  const total = questions.length;
  const accuracy = attempts.length
    ? Math.round((attempts.filter((a) => a.correct).length / attempts.length) * 100)
    : 0;
  return { answered, correct, total, accuracy, marks: attempts.length };
}

export function paperAccuracy(attempts: Attempt[], paper: PaperId | "drill"): number | null {
  const ids = new Set(
    questions.filter((q) => q.paper === paper).map((q) => q.id),
  );
  const subset = attempts.filter((a) => ids.has(a.questionId));
  if (!subset.length) return null;
  return Math.round((subset.filter((a) => a.correct).length / subset.length) * 100);
}

export function headwordStrength(attempts: Attempt[]): Map<string, { seen: number; correct: number }> {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const map = new Map<string, { seen: number; correct: number }>();
  for (const a of attempts) {
    const q = byId.get(a.questionId);
    if (!q) continue;
    const cur = map.get(q.headword) ?? { seen: 0, correct: 0 };
    cur.seen += 1;
    if (a.correct) cur.correct += 1;
    map.set(q.headword, cur);
  }
  return map;
}

export function weakHeadwords(attempts: Attempt[], limit = 6): string[] {
  const strength = headwordStrength(attempts);
  return [...strength.entries()]
    .filter(([, v]) => v.seen >= 1 && v.correct / v.seen < 0.7)
    .sort((a, b) => a[1].correct / a[1].seen - b[1].correct / b[1].seen)
    .slice(0, limit)
    .map(([k]) => k);
}

export function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function pickSession(kind: "mixed" | "drill" | "review" | PaperId, attempts: Attempt[]): Question[] {
  if (kind === "review") {
    const latest = latestByQuestion(attempts);
    const wrong = questions.filter((q) => latest.get(q.id)?.correct === false);
    return shuffle(wrong.length ? wrong : questions).slice(0, 8);
  }
  if (kind === "mixed") return shuffle(questions.filter((q) => q.paper !== "drill")).slice(0, 10);
  if (kind === "drill") return shuffle(questions.filter((q) => q.paper === "drill")).slice(0, 10);
  return questions.filter((q) => q.paper === kind);
}
