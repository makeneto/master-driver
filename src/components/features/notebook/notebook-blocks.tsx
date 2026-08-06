import { Lightbulb, TriangleAlert, ListChecks } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NotebookBlock } from "@/i18n/notebook-content"

export function NotebookBlockRenderer({
  block,
  summaryLabel,
}: {
  block: NotebookBlock
  summaryLabel: string
}) {
  switch (block.kind) {
    case "heading":
      return <NotebookHeading text={block.text} />
    case "p":
      return <NotebookParagraph text={block.text} />
    case "callout":
      return <NotebookCallout tone={block.tone} text={block.text} />
    case "table":
      return <NotebookTable headers={block.headers} rows={block.rows} />
    case "list":
      return <NotebookList title={block.title} items={block.items} />
    case "summary":
      return <NotebookSummary title={summaryLabel} items={block.items} />
    default:
      return null
  }
}

export function NotebookHeading({ text }: { text: string }) {
  return (
    <h3 className="mt-8 mb-3 text-lg font-medium tracking-tight text-[var(--color-text)] first:mt-0">
      {text}
    </h3>
  )
}

export function NotebookParagraph({ text }: { text: string }) {
  return (
    <p className="mb-4 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
      {text}
    </p>
  )
}

export function NotebookCallout({
  tone,
  text,
}: {
  tone: "tip" | "warning"
  text: string
}) {
  const isTip = tone === "tip"
  return (
    <div
      className={cn(
        "mb-4 flex gap-3 rounded-xl border-l-4 p-4",
        isTip
          ? "border-l-[var(--color-teal)] bg-[var(--color-teal)]/10"
          : "border-l-[var(--color-gold)] bg-[var(--color-gold)]/10",
      )}
    >
      {isTip ? (
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-teal)]" />
      ) : (
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
      )}
      <p className="text-sm leading-relaxed text-[var(--color-text)]">{text}</p>
    </div>
  )
}

export function NotebookTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="mb-5 overflow-x-auto rounded-xl border border-[var(--color-hairline)]">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[var(--color-overlay)]">
            {headers.map((h) => (
              <th
                key={h}
                className="border-b border-[var(--color-hairline)] px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(i % 2 === 1 && "bg-[var(--color-overlay)]")}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border-b border-[var(--color-hairline)] px-4 py-2.5 text-[var(--color-text)] last:border-b-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function NotebookList({
  title,
  items,
}: {
  title?: string
  items: string[]
}) {
  return (
    <div className="mb-5">
      {title && (
        <p className="mb-2 text-sm font-semibold text-[var(--color-text)]">
          {title}
        </p>
      )}
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm leading-relaxed text-[var(--color-text-muted)]"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-faint)]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function NotebookSummary({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div className="mt-6 rounded-xl border border-[var(--color-hairline-strong)] bg-zinc-100 dark:bg-zinc-900 from-[var(--color-gold)]/10 to-[var(--color-teal)]/10 p-5">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
        <ListChecks className="h-4 w-4 text-[var(--color-gold)]" />
        {title}
      </p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm leading-relaxed text-[var(--color-text)]"
          >
            <span className="text-[var(--color-gold)]">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
