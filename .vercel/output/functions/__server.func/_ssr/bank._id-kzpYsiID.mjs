import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as ArrowLeft, s as PenLine } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-CdjbcmP6.mjs";
import { i as questionsForHeadword, t as Badge } from "./questions-4uhy6iuF.mjs";
import { n as errorEntries, r as getEntry } from "./errors-BiFl4Djs.mjs";
import { t as Button } from "./button-DnYe4QNh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bank._id-kzpYsiID.js
var import_jsx_runtime = require_jsx_runtime();
function EntryPage() {
	const { id } = Route.useParams();
	const entry = getEntry(id);
	if (!entry) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: "Entry not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/bank",
				children: "Back to atlas"
			})
		})]
	});
	const related = questionsForHeadword(entry.headword);
	const idx = errorEntries.findIndex((e) => e.id === entry.id);
	const prev = errorEntries[idx - 1];
	const next = errorEntries[idx + 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-2xl flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/bank",
				className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Atlas"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Part ", entry.part] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: entry.headword
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-primary",
						children: "Wrong"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-xl leading-8 text-primary line-through decoration-1",
						children: entry.wrong
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-success",
						children: "Right"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-xl leading-8",
						children: entry.right
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base leading-relaxed",
				children: entry.note
			}),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Mark this error"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						related.length,
						" sentence",
						related.length === 1 ? "" : "s",
						" in the question bank."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/practice",
						search: { headword: entry.headword },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" }),
							"Drill ",
							entry.headword
						]
					})
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3 border-t border-border pt-5",
				children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/bank/$id",
					params: { id: prev.id },
					className: "text-sm hover:text-primary",
					children: ["← ", prev.headword]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/bank/$id",
					params: { id: next.id },
					className: "text-sm hover:text-primary",
					children: [next.headword, " →"]
				}) : null]
			})
		]
	});
}
//#endregion
export { EntryPage as component };
