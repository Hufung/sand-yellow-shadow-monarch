import type { AcceptedMark, Question } from "@/data/questions";

export type Token = {
  raw: string;
  core: string;
  leading: string;
  trailing: string;
};

export function coreWord(raw: string): string {
  let s = raw.replace(/^[("'“‘[{]+/, "");
  s = s.replace(/[,;:!?)"'”’\]}]+$/g, "");
  if (s.endsWith(".") && !s.slice(0, -1).includes(".")) {
    s = s.slice(0, -1);
  }
  return s.toLowerCase();
}

export function tokenize(prompt: string): Token[] {
  return prompt.split(/\s+/).filter(Boolean).map((raw) => {
    const leading = raw.match(/^[("'“‘[{]+/)?.[0] ?? "";
    let rest = raw.slice(leading.length);
    const trailMatch = rest.match(/[,;:!?)"'”’\]}]+$/);
    let trailing = trailMatch?.[0] ?? "";
    rest = rest.slice(0, rest.length - trailing.length);
    if (rest.endsWith(".") && !rest.slice(0, -1).includes(".")) {
      trailing = `.${trailing}`;
      rest = rest.slice(0, -1);
    }
    return { raw, core: rest, leading, trailing };
  });
}

export type StudentMark =
  | { type: "replace"; index: number; to: string }
  | { type: "insert"; gap: number; word: string }
  | { type: "delete"; index: number }
  | { type: "none" }
  | { type: "empty" };

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function occurrenceIndex(tokens: Token[], word: string, nth = 0): number {
  const target = norm(word);
  let seen = 0;
  for (let i = 0; i < tokens.length; i++) {
    const core = norm(tokens[i].core);
    const raw = norm(tokens[i].raw);
    if (core === target || raw === target || core.replace(/\.$/, "") === target.replace(/\.$/, "")) {
      if (seen === nth) return i;
      seen += 1;
    }
  }
  return -1;
}

function sameWord(a: string, b: string): boolean {
  return norm(a) === norm(b);
}

function matchesAccepted(student: StudentMark, accepted: AcceptedMark, tokens: Token[]): boolean {
  if (student.type === "empty") return false;
  if (accepted.type === "none") return student.type === "none";
  if (student.type === "none") return false;

  if (accepted.type === "replace" && student.type === "replace") {
    const idx = occurrenceIndex(tokens, accepted.word, accepted.nth ?? 0);
    if (idx < 0 || student.index !== idx) {
      // still accept if they selected the same word text
      if (!sameWord(tokens[student.index]?.core ?? "", accepted.word)) return false;
    }
    return sameWord(student.to, accepted.to);
  }

  if (accepted.type === "delete" && student.type === "delete") {
    const idx = occurrenceIndex(tokens, accepted.word, accepted.nth ?? 0);
    if (idx >= 0 && student.index === idx) return true;
    return sameWord(tokens[student.index]?.core ?? "", accepted.word);
  }

  if (accepted.type === "insert" && student.type === "insert") {
    if (!sameWord(student.word, accepted.word)) return false;
    if (accepted.after) {
      const idx = occurrenceIndex(tokens, accepted.after, accepted.nth ?? 0);
      return idx >= 0 && student.gap === idx + 1;
    }
    if (accepted.before) {
      const idx = occurrenceIndex(tokens, accepted.before, accepted.nth ?? 0);
      return idx >= 0 && student.gap === idx;
    }
    return true;
  }

  return false;
}

export function checkMark(question: Question, student: StudentMark): boolean {
  const tokens = tokenize(question.prompt);
  return question.accepted.some((accepted) => matchesAccepted(student, accepted, tokens));
}

export function describeAnswer(question: Question): string {
  const first = question.accepted[0];
  if (!first || first.type === "none") return "No error — tick the sentence.";
  if (first.type === "replace") return `Replace “${first.word}” with “${first.to}”.`;
  if (first.type === "delete") return `Cross out “${first.word}”.`;
  if (first.type === "insert") {
    if (first.after) return `Insert “${first.word}” after “${first.after}”.`;
    if (first.before) return `Insert “${first.word}” before “${first.before}”.`;
    return `Insert “${first.word}”.`;
  }
  return "";
}

export function toolLabel(type: AcceptedMark["type"]): string {
  switch (type) {
    case "replace":
      return "Replace";
    case "insert":
      return "Insert";
    case "delete":
      return "Delete";
    case "none":
      return "No error";
  }
}
