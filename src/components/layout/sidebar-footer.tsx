import DonationCard from "../features/donation/donation-card"

export default function SidebarFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <section className="grid gap-3">
      <DonationCard />

      <p className="text-[10px] text-center tracking-widest text-[var(--color-text-muted)]">
        © Makene Neto | {currentYear}
      </p>
    </section>
  )
}
