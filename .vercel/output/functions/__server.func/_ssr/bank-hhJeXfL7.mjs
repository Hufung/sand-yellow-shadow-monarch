import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Search } from "../_libs/lucide-react.mjs";
import { a as cn, i as Route$2 } from "./router-CdjbcmP6.mjs";
import { i as questionsForHeadword, t as Badge } from "./questions-4uhy6iuF.mjs";
import { i as letters, n as errorEntries, t as entryLetter } from "./errors-BiFl4Djs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bank-hhJeXfL7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("flex h-11 w-full rounded-md border border-input bg-card px-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
	...props
}));
Input.displayName = "Input";
function BankPage() {
	const { q, letter } = Route$2.useSearch();
	const navigate = Route$2.useNavigate();
	const [query, setQuery] = (0, import_react.useState)(q ?? "");
	const filtered = (0, import_react.useMemo)(() => {
		const needle = (query || q || "").trim().toLowerCase();
		return errorEntries.filter((entry) => {
			const L = entryLetter(entry);
			if (letter && L !== letter.toUpperCase()) return false;
			if (!needle) return true;
			return entry.headword.toLowerCase().includes(needle) || entry.note.toLowerCase().includes(needle) || entry.wrong.toLowerCase().includes(needle);
		});
	}, [
		query,
		q,
		letter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
					children: "Atlas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl",
					children: "Common errors A–Z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-muted-foreground",
					children: "Wrong line, right line, and the note behind each trap — the same bank the papers are drawn from."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => {
						setQuery(e.target.value);
						navigate({ search: (prev) => ({
							...prev,
							q: e.target.value || void 0
						}) });
					},
					placeholder: "Search headwords, notes, examples",
					className: "pl-10"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void navigate({ search: (prev) => ({
						...prev,
						letter: void 0
					}) }),
					className: cn("flex h-11 min-w-9 items-center justify-center rounded-md px-1 text-xs font-medium", !letter ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"),
					children: "All"
				}), letters.map((L) => {
					const has = errorEntries.some((e) => entryLetter(e) === L);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !has,
						onClick: () => void navigate({ search: (prev) => ({
							...prev,
							letter: L
						}) }),
						className: cn("flex h-11 min-w-9 items-center justify-center rounded-md px-1 text-xs font-medium disabled:opacity-30", letter === L ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"),
						children: L
					}, L);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm tabular-nums text-muted-foreground",
				children: [filtered.length, " entries"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border overflow-hidden rounded-xl border border-border bg-card",
				children: filtered.map((entry) => {
					const n = questionsForHeadword(entry.headword).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/bank/$id",
						params: { id: entry.id },
						className: "flex flex-col gap-1 px-4 py-4 hover:bg-muted/50 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg",
									children: entry.headword
								}), n > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [n, " to mark"] }) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: entry.note
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "shrink-0 font-display text-sm italic text-primary sm:max-w-xs sm:text-right",
							children: entry.wrong
						})]
					}) }, entry.id);
				})
			})
		]
	});
}
//#endregion
export { BankPage as component };
