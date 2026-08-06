export function getFirstWord(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:]/g, "")
      .split(/\s+/)[0] ?? ""
  )
}
