import { Card } from "@/components/ui/card"
import { LevelRing } from "./level-ring"
import { Button } from "@/components/ui/button"
import { Check, Pencil } from "lucide-react"
import useProfile from "@/hooks/use-profile"
import { setName } from "@/store/slices/profileSlice"

export default function UserCard() {
  const {
    dispatch,
    profile,
    editing,
    setEditing,
    t,
    username,
    draft,
    setDraft,
  } = useProfile()

  return (
    <Card className="flex flex-col items-center gap-6 p-10">
      <LevelRing xp={profile.xp} />

      <div className="flex items-center gap-2">
        {editing ? (
          <>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="rounded-lg border border-[var(--color-hairline-strong)] bg-[var(--color-overlay)] px-3 py-1.5 text-center text-sm outline-none focus:border-[var(--color-gold)]"
            />
            <Button
              size="icon"
              variant="secondary"
              onClick={() => {
                dispatch(setName(draft.trim() || t("profile.defaultName")))
                setEditing(false)
              }}
            >
              <Check className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <h1 className="font-[var(--font-display)] text-xl font-semibold">
              {username}
            </h1>
            <button
              onClick={() => setEditing(true)}
              className="text-[var(--color-text-faint)] hover:text-[var(--color-text)]"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
    </Card>
  )
}
