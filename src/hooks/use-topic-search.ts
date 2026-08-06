"use client"

import { useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { TOPICS } from "@/data/topic-list"

export function useTopicSearch() {
  const { t, topicText } = useTranslation()
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const normalizedQuery = query.trim().toLowerCase()
  const showResults = isFocused && normalizedQuery.length > 0

  const results = useMemo(() => {
    if (!normalizedQuery) return []

    return TOPICS.map((topic) => {
      const { name, description } = topicText(topic.id)
      const titleMatch = name.toLowerCase().includes(normalizedQuery)
      const descriptionMatch = description
        .toLowerCase()
        .includes(normalizedQuery)

      return { topic, titleMatch, descriptionMatch }
    })
      .filter(
        ({ titleMatch, descriptionMatch }) => titleMatch || descriptionMatch,
      )
      .sort((a, b) => {
        if (a.titleMatch === b.titleMatch) return 0
        return a.titleMatch ? -1 : 1
      })
      .slice(0, 5)
      .map(({ topic }) => topic)
  }, [normalizedQuery, topicText])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (results.length > 0) {
      router.push(`/quiz?topic=${results[0].id}`)
      setQuery("")
    }
  }

  const clearOrFocus = () => {
    if (!query) {
      inputRef.current?.focus()
    } else {
      setQuery("")
    }
  }

  return {
    t,
    topicText,
    inputRef,
    query,
    setQuery,
    isFocused,
    setIsFocused,
    normalizedQuery,
    showResults,
    results,
    handleSubmit,
    clearOrFocus,
  }
}
