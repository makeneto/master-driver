# 🚗 Driving Master

Premium, gamified web application for studying for the driving test using **Active Recall**.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Redux Toolkit + Redux Persist · Framer Motion · Recharts · Sonner · React Confetti · React CountUp

## How to run the project

```bash
pnpm install
pnpm dev
```

Opens [http://localhost:3000](http://localhost:3000).

For production:

```bash
pnpm build
pnpm start
```

> This project uses **pnpm** as a package manager. If you don't have it installed:
> `npm install -g pnpm`

## Structure

```
src/
app/ # routes (App Router): home, quiz, dashboard, exam, profile, achievements, settings
components/
ui/ # base components in the shadcn/ui style (Button, Card, Gauge, etc.)
layout/ # Sidebar and mobile navigation
features/ # components by functionality (home, quiz, dashboard, profile, exam, achievements)
store/ # Redux Toolkit: quizSlice, profileSlice, statisticsSlice, settingsSlice, achievementsSlice
lib/ # spaced repetition algorithm, XP, utilities
data/ # questions.ts with the 102 questions
constants/ # topics, levels, achievements
types/ # shared types
```

## Design concept — "Night Drive" / "Day Drive"

Light theme by default (follows operating system preference), with manual switching
available in the Sidebar and Settings. Blue-gray background (never pure white/black),
gold headlight accents + teal dial, dashed "road line" divider as a structural element, and circular gauges inspired by a car's display instead of generic progress bars.

## Language

The application is available in **Portuguese**, **English**, and **French**, selectable in the
Sidebar or in Settings. The translation is saved in `localStorage` and applied to the entire interface (navigation, quiz, dashboard, profile, achievements, settings, and exam mode). The content of the 102 exam questions remains in Portuguese, as it is specific to the Portuguese driving exam.

## Light/Dark Theme

The theme automatically follows the device preference (`prefers-color-scheme`) on the first visit. The user can manually switch between light, dark, or "system" at any time — the choice is saved and respected on future visits.

## Persistence

All progress (XP, level, category statistics, achievements, settings, and study history) is automatically saved in `localStorage` via Redux Persist.

You can export/import this progress on the **Settings** page.
