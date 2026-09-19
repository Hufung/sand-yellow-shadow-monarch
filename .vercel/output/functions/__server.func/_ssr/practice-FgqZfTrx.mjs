import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Minus, d as Check, m as ArrowLeft, o as Plus, t as Underline, u as CircleCheck } from "../_libs/lucide-react.mjs";
import { a as cn, r as Route$1 } from "./router-CdjbcmP6.mjs";
import { n as papers, r as questions, t as Badge } from "./questions-4uhy6iuF.mjs";
import { t as Button } from "./button-DnYe4QNh.mjs";
import { i as useProgress, n as pickSession } from "./progress-store-DyeV-hor.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-FgqZfTrx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function tokenize(prompt) {
	return prompt.split(/\s+/).filter(Boolean).map((raw) => {
		const leading = raw.match(/^[("'“‘[{]+/)?.[0] ?? "";
		let rest = raw.slice(leading.length);
		let trailing = rest.match(/[,;:!?)"'”’\]}]+$/)?.[0] ?? "";
		rest = rest.slice(0, rest.length - trailing.length);
		if (rest.endsWith(".") && !rest.slice(0, -1).includes(".")) {
			trailing = `.${trailing}`;
			rest = rest.slice(0, -1);
		}
		return {
			raw,
			core: rest,
			leading,
			trailing
		};
	});
}
function norm(s) {
	return s.trim().toLowerCase().replace(/\s+/g, " ");
}
function occurrenceIndex(tokens, word, nth = 0) {
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
function sameWord(a, b) {
	return norm(a) === norm(b);
}
function matchesAccepted(student, accepted, tokens) {
	if (student.type === "empty") return false;
	if (accepted.type === "none") return student.type === "none";
	if (student.type === "none") return false;
	if (accepted.type === "replace" && student.type === "replace") {
		const idx = occurrenceIndex(tokens, accepted.word, accepted.nth ?? 0);
		if (idx < 0 || student.index !== idx) {
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
function checkMark(question, student) {
	const tokens = tokenize(question.prompt);
	return question.accepted.some((accepted) => matchesAccepted(student, accepted, tokens));
}
function describeAnswer(question) {
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
var TOOLS = [
	{
		id: "replace",
		label: "Replace",
		hint: "Tap a word, then write the correction above it.",
		icon: Underline
	},
	{
		id: "insert",
		label: "Insert",
		hint: "Tap a caret between words and add the missing word.",
		icon: Plus
	},
	{
		id: "delete",
		label: "Delete",
		hint: "Cross out one redundant word.",
		icon: Minus
	},
	{
		id: "none",
		label: "No error",
		hint: "Tick the sentence if it is already correct.",
		icon: Check
	}
];
function ProofDesk({ question, index, total, onResolved }) {
	const tokens = (0, import_react.useMemo)(() => tokenize(question.prompt), [question.prompt]);
	const [tool, setTool] = (0, import_react.useState)("replace");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [gap, setGap] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [tries, setTries] = (0, import_react.useState)(0);
	const [verdict, setVerdict] = (0, import_react.useState)("idle");
	const [shake, setShake] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setTool("replace");
		setSelected(null);
		setGap(null);
		setDraft("");
		setTries(0);
		setVerdict("idle");
	}, [question.id]);
	(0, import_react.useEffect)(() => {
		if (tool === "replace" && selected !== null || tool === "insert" && gap !== null) inputRef.current?.focus();
	}, [
		tool,
		selected,
		gap
	]);
	function pickWord(i) {
		if (verdict === "correct") return;
		if (tool === "none") setTool("replace");
		if (tool === "insert") return;
		setSelected(i);
		setGap(null);
		if (tool === "replace") setDraft("");
	}
	function pickGap(i) {
		if (verdict === "correct") return;
		setTool("insert");
		setGap(i);
		setSelected(null);
		setDraft("");
	}
	function currentMark() {
		if (tool === "none") return { type: "none" };
		if (tool === "delete" && selected !== null) return {
			type: "delete",
			index: selected
		};
		if (tool === "replace" && selected !== null && draft.trim()) return {
			type: "replace",
			index: selected,
			to: draft.trim()
		};
		if (tool === "insert" && gap !== null && draft.trim()) return {
			type: "insert",
			gap,
			word: draft.trim()
		};
		return { type: "empty" };
	}
	function submit() {
		if (checkMark(question, currentMark())) {
			setVerdict("correct");
			return;
		}
		setTries((t) => t + 1);
		setVerdict("wrong");
		setShake(true);
		window.setTimeout(() => setShake(false), 420);
	}
	const revealed = verdict === "wrong" && tries >= 2;
	const canCheck = tool === "none" || tool === "delete" && selected !== null || tool === "replace" && selected !== null && draft.trim().length > 0 || tool === "insert" && gap !== null && draft.trim().length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
					children: [
						"Question ",
						index + 1,
						" of ",
						total
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display italic text-sm text-primary",
					children: question.headword
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("paper-sheet relative overflow-hidden rounded-xl border border-border shadow-paper", shake && "motion-safe:animate-[shake_0.4s_ease-in-out]"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-8 pl-10 pr-4 sm:py-10 sm:pl-16 sm:pr-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-6 font-display text-xs uppercase tracking-[0.22em] text-muted-foreground",
							children: "Proofread the sentence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sentence, {
							tokens,
							tool,
							selected,
							gap,
							draft,
							onPickWord: pickWord,
							onPickGap: pickGap,
							ticked: tool === "none",
							locked: verdict === "correct"
						}),
						tool === "replace" && selected !== null || tool === "insert" && gap !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-6 flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
								children: tool === "replace" ? "Write the correction" : "Word to insert"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								value: draft,
								onChange: (e) => setDraft(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter" && canCheck) submit();
								},
								placeholder: tool === "replace" ? "replacement" : "missing word",
								className: "h-11 max-w-xs rounded-md border border-primary/40 bg-background px-3 font-display text-lg italic text-primary placeholder:text-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							})]
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: TOOLS.map((t) => {
					const Icon = t.icon;
					const active = tool === t.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							if (verdict === "correct") return;
							setTool(t.id);
							setVerdict("idle");
							if (t.id !== "insert") setGap(null);
							if (t.id === "insert" || t.id === "none") setSelected(null);
							setDraft("");
						},
						className: cn("flex min-h-14 flex-col items-start gap-1 rounded-lg border px-3 py-2.5 text-left transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), t.label]
						})
					}, t.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: TOOLS.find((t) => t.id === tool)?.hint
			}),
			verdict === "wrong" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-primary",
					children: "Not quite."
				}), revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-foreground",
					children: [
						describeAnswer(question),
						" ",
						question.explanation
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted-foreground",
					children: "Have another look — you have one more try before the mark is shown."
				})]
			}) : null,
			verdict === "correct" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-success/25 bg-success/10 px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-success",
					children: "Correct."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-foreground",
					children: question.explanation
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [verdict === "correct" || revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ink",
					onClick: () => onResolved(verdict === "correct"),
					children: "Continue"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: submit,
					disabled: !canCheck,
					children: "Check mark"
				}), verdict === "wrong" && !revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => setTries(2),
					children: "Show the mark"
				}) : null]
			})
		]
	});
}
function Sentence({ tokens, tool, selected, gap, draft, onPickWord, onPickGap, ticked, locked }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("font-display text-2xl leading-10 text-foreground", ticked && "underline decoration-success/70 decoration-2 underline-offset-8"),
		children: [
			tokens.map((token, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gap, {
					active: tool === "insert" || gap === i,
					selected: gap === i,
					draft,
					onClick: () => onPickGap(i)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: locked,
					onClick: () => onPickWord(i),
					className: cn("relative inline min-h-11 rounded-sm px-0.5 py-1 align-baseline transition-colors", selected === i && tool === "replace" && "bg-primary/10 text-primary underline decoration-2 underline-offset-4", selected === i && tool === "delete" && "text-primary line-through decoration-2", tool !== "insert" && "hover:bg-muted"),
					children: [selected === i && tool === "replace" && draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -top-6 left-0 font-display text-sm italic text-primary",
						children: draft
					}) : null, token.raw]
				})]
			}, `${token.raw}-${i}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gap, {
				active: tool === "insert" || gap === tokens.length,
				selected: gap === tokens.length,
				draft,
				onClick: () => onPickGap(tokens.length)
			}),
			ticked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-3 inline-flex size-7 translate-y-0.5 items-center justify-center rounded-full border-2 border-success text-success",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-4",
					strokeWidth: 3
				})
			}) : null
		]
	});
}
function Gap({ active, selected, draft, onClick }) {
	if (!active && !selected) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-block w-1",
		children: " "
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-label": "Insert here",
		className: cn("relative inline-flex h-11 w-3 align-middle sm:w-4", selected && "w-4"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute left-1/2 top-2 h-7 w-px -translate-x-1/2", selected ? "bg-primary" : "bg-border") }), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-xs italic text-primary",
			children: draft || "^"
		}) : null]
	});
}
function parseMode(raw) {
	if (!raw) return null;
	if (raw === "mixed" || raw === "drill" || raw === "review") return raw;
	if ([
		"1",
		"2",
		"3",
		"4",
		"5"
	].includes(raw)) return raw;
	return null;
}
function PracticePage() {
	const { mode: rawMode, headword } = Route$1.useSearch();
	const mode = parseMode(rawMode);
	if (headword) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadwordSession, { headword });
	if (!mode) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModePicker, {});
	const kind = mode === "mixed" || mode === "drill" || mode === "review" ? mode : Number(mode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Session, { kind });
}
function ModePicker() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
				children: "Papers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "Choose a set"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-muted-foreground",
				children: "One mistake or none. Underline and replace, caret in a word, cross one out, or tick."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [
				papers.map((paper) => {
					const count = questions.filter((q) => q.paper === paper.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/practice",
						search: { mode: String(paper.id) },
						className: "rounded-xl border border-border bg-card p-5 hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [count, " questions"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-2xl",
								children: paper.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: paper.subtitle
							})
						]
					}, paper.id);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/practice",
					search: { mode: "mixed" },
					className: "rounded-xl border border-border bg-card p-5 hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "red",
							children: "10 questions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl",
							children: "Mixed paper"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "A random ten from the original worksheets."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/practice",
					search: { mode: "drill" },
					className: "rounded-xl border border-border bg-card p-5 hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "ink",
							children: "10 questions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl",
							children: "Atlas drills"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Short traps from the dictionary."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/practice",
					search: { mode: "review" },
					className: "rounded-xl border border-border bg-card p-5 hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Review" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl",
							children: "Missed items"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Re-mark the sentences you got wrong."
						})
					]
				})
			]
		})]
	});
}
function HeadwordSession({ headword }) {
	const set = (0, import_react.useMemo)(() => questions.filter((q) => q.headword.toLowerCase() === headword.toLowerCase()), [headword]);
	if (!set.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
		"No questions for ",
		headword,
		"."
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: "outline",
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/bank",
			children: "Back to atlas"
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Run, {
		items: set,
		title: headword
	});
}
function Session({ kind }) {
	const [set] = (0, import_react.useState)(() => pickSession(kind, useProgress.getState().attempts));
	const title = kind === "mixed" ? "Mixed paper" : kind === "drill" ? "Atlas drills" : kind === "review" ? "Review" : papers.find((p) => p.id === kind)?.title ?? "Paper";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Run, {
		items: set,
		title
	});
}
function Run({ items, title }) {
	const record = useProgress((s) => s.record);
	const [i, setI] = (0, import_react.useState)(0);
	const [results, setResults] = (0, import_react.useState)([]);
	const current = items[i];
	const done = i >= items.length;
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: "Nothing to review yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Sit a paper first, then missed items will collect here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/practice",
					children: "Choose a paper"
				})
			})
		]
	});
	if (done) {
		const score = results.filter((r) => r.correct).length;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto size-10 text-success" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-3xl",
						children: "Paper marked"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-display text-5xl tabular-nums text-primary",
						children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-2xl text-muted-foreground",
							children: ["/", items.length]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-2 text-left",
						children: items.map((q, idx) => {
							const r = results[idx];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: q.headword
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-0.5 block text-muted-foreground",
										children: [q.prompt.slice(0, 72), q.prompt.length > 72 ? "…" : ""]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: r?.correct ? "text-success" : "text-primary",
									children: r?.correct ? "Tick" : "Miss"
								})]
							}, q.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/practice",
								children: "Another paper"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: "Back to desk"
							})
						})]
					})
				]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/practice",
					className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Papers"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm text-muted-foreground",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 overflow-hidden rounded-full bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-primary transition-[width] duration-300",
					style: { width: `${i / items.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofDesk, {
				question: current,
				index: i,
				total: items.length,
				onResolved: (correct) => {
					record(current.id, correct);
					setResults((r) => [...r, {
						id: current.id,
						correct
					}]);
					setI((n) => n + 1);
				}
			}, current.id)
		]
	});
}
//#endregion
export { PracticePage as component };
