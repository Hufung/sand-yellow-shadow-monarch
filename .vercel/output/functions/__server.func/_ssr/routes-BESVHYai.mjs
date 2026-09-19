import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCcw, d as Check, f as BookOpen, l as Highlighter, p as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as papers, r as questions, t as Badge } from "./questions-4uhy6iuF.mjs";
import { n as errorEntries } from "./errors-BiFl4Djs.mjs";
import { t as Button } from "./button-DnYe4QNh.mjs";
import { a as weakHeadwords, i as useProgress, r as statsFrom, t as paperAccuracy } from "./progress-store-DyeV-hor.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BESVHYai.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHydrated(true);
	}, []);
	return hydrated;
}
function Home() {
	const hydrated = useHydrated();
	const attempts = useProgress((s) => s.attempts);
	const reset = useProgress((s) => s.reset);
	const liveAttempts = hydrated ? attempts : [];
	const stats = statsFrom(liveAttempts);
	const weak = weakHeadwords(liveAttempts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "red",
						children: "Common Errors trainer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl",
						children: ["Mark the sentence.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-primary",
							children: "Train the grammar."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-base leading-relaxed text-muted-foreground",
						children: "Exam-style proofreading from the Hong Kong Common Errors bank. Underline and replace a word, caret in a missing one, cross out the extra, or tick a clean sentence."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/practice",
								search: { mode: "mixed" },
								children: ["Start a mixed paper", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/bank",
								children: "Browse the atlas"
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "paper-sheet rounded-xl border border-border px-10 py-8 shadow-paper sm:px-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs uppercase tracking-[0.2em] text-muted-foreground",
							children: "Sample mark"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 font-display text-xl leading-9 text-foreground",
							children: [
								"I am afraid of",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-5 left-0 text-sm italic",
										children: "crossing"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "underline decoration-2 underline-offset-4",
										children: "acrossing"
									})]
								}),
								" ",
								"that road at night."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-sm text-muted-foreground",
							children: [questions.length, " items in the bank."]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					{
						label: "Items in bank",
						value: String(questions.length)
					},
					{
						label: "Error entries",
						value: String(errorEntries.length)
					},
					{
						label: "Answered",
						value: `${stats.answered}/${stats.total}`
					},
					{
						label: "Accuracy",
						value: stats.marks ? `${stats.accuracy}%` : "—"
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl tabular-nums",
						children: item.value
					})]
				}, item.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Sit a paper"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/practice",
					className: "text-sm font-medium text-primary hover:underline",
					children: "All modes"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: [papers.map((paper) => {
					const acc = paperAccuracy(liveAttempts, paper.id);
					const count = questions.filter((q) => q.paper === paper.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/practice",
						search: { mode: String(paper.id) },
						className: "group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [count, " questions"] }), acc !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm tabular-nums text-muted-foreground",
									children: [acc, "%"]
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display text-xl",
								children: paper.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: paper.subtitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary",
								children: ["Open paper", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 transition-transform group-hover:translate-x-0.5" })]
							})
						]
					}, paper.id);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/practice",
					search: { mode: "drill" },
					className: "group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "red",
							children: "Speed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-xl",
							children: "Atlas drills"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Short sentences, one trap each — built from the dictionary."
						})
					]
				})]
			})] }),
			weak.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlighter, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Needs another look"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: weak.map((word) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/bank",
							search: { q: word },
							className: "rounded-full border border-border bg-background px-3 py-1.5 text-sm hover:border-primary hover:text-primary",
							children: word
						}, word))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/practice",
							search: { mode: "review" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Review missed items"]
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-success" }), "Progress stays on this device."]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/bank",
						className: "inline-flex items-center gap-1 hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), "Atlas"]
					}), liveAttempts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: reset,
						className: "hover:text-foreground",
						children: "Reset marks"
					}) : null]
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
