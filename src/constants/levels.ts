import type { LevelMeta } from "@/types";

export const LEVELS: LevelMeta[] = [
  { id: "iniciante", name: "Iniciante", minXp: 0, color: "#8b93a1", gradient: "from-slate-400 to-slate-500" },
  { id: "condutor", name: "Condutor", minXp: 150, color: "#34d1bf", gradient: "from-teal-400 to-cyan-500" },
  { id: "condutor-seguro", name: "Condutor Seguro", minXp: 400, color: "#4ade80", gradient: "from-green-400 to-emerald-500" },
  { id: "especialista", name: "Especialista", minXp: 800, color: "#60a5fa", gradient: "from-blue-400 to-indigo-500" },
  { id: "instrutor", name: "Instrutor", minXp: 1400, color: "#a78bfa", gradient: "from-violet-400 to-purple-500" },
  { id: "mestre-da-estrada", name: "Mestre da Estrada", minXp: 2200, color: "#f5b942", gradient: "from-amber-400 to-orange-500" },
  { id: "lenda", name: "Lenda", minXp: 3500, color: "#f2545b", gradient: "from-rose-400 to-red-600" },
];

export function getLevelForXp(xp: number): LevelMeta {
  const sorted = [...LEVELS].sort((a, b) => b.minXp - a.minXp);
  return sorted.find((l) => xp >= l.minXp) ?? LEVELS[0];
}

export function getNextLevel(xp: number): LevelMeta | null {
  const current = getLevelForXp(xp);
  const idx = LEVELS.findIndex((l) => l.id === current.id);
  return LEVELS[idx + 1] ?? null;
}
