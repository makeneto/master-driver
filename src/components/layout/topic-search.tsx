"use client"

import Link from "next/link"
import { Search, X } from "lucide-react"

import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { cn } from "@/lib/utils"
import { useTopicSearch } from "@/hooks/use-topic-search"

export function TopicSearch({ className }: { className?: string }) {
  const {
    t,
    topicText,
    inputRef,
    query,
    setQuery,
    setIsFocused,
    showResults,
    results,
    handleSubmit,
    clearOrFocus,
  } = useTopicSearch()
  return (
    <div
      className={cn("relative w-full max-w-[520px] hidden sm:block", className)}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsFocused(false)
        }
      }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="topic-search" className="sr-only">
          {t("search.label")}
        </label>
        <input
          id="topic-search"
          ref={inputRef}
          type="text"
          inputMode="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("search.placeholder")}
          autoComplete="off"
          className="w-full rounded-4xl border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-4 py-2 pr-11 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-text-muted)]/20"
          aria-label={t("search.label")}
          aria-describedby="topic-search-help"
        />

        <button
          type="button"
          onClick={clearOrFocus}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--color-text-muted)] transition hover:text-[var(--color-text)] cursor-pointer"
          aria-label={query ? "Limpar pesquisa" : "Pesquisar"}
        >
          {query ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
        </button>
      </form>

      {showResults && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] shadow-xl">
          {results.length > 0 ? (
            <div className="divide-y divide-[var(--color-gray-muted)]">
              {results.map((topic) => {
                const { name, description } = topicText(topic.id)
                return (
                  <Link
                    key={topic.id}
                    href={`/quiz?topic=${topic.id}`}
                    className="block px-4 py-3 transition hover:bg-[var(--color-overlay)]"
                    onClick={() => setQuery("")}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-overlay)] text-[var(--color-text)]">
                        <DynamicIcon name={topic.icon} className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text)]">
                          {name}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {description}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-[var(--color-text-muted)]">
              {t("search.noResults")}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
