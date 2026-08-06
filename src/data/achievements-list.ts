import type { Achievement } from "@/types"

export const ACHIEVEMENT_DEFS: Omit<Achievement, "unlocked" | "unlockedAt">[] =
  [
    {
      id: "first-answer",
      title: "Primeira Resposta",
      description: "Respondeste à tua primeira pergunta.",
      icon: "Sparkles",
    },
    {
      id: "first-ten-correct",
      title: "Primeiros 10 Acertos",
      description: "Acertaste 10 perguntas.",
      icon: "CheckCircle2",
    },
    {
      id: "hundred-answers",
      title: "100 Respostas",
      description: "Respondeste a 100 perguntas.",
      icon: "Layers",
    },
    {
      id: "seven-day-streak",
      title: "7 Dias Seguidos",
      description: "Estudaste 7 dias consecutivos.",
      icon: "Flame",
    },
    {
      id: "perfect-category",
      title: "100% numa Categoria",
      description: "Acertaste todas as perguntas de uma categoria.",
      icon: "Trophy",
    },
    {
      id: "streak-twenty",
      title: "Sequência de 20",
      description: "Acertaste 20 perguntas seguidas.",
      icon: "Zap",
    },
    {
      id: "all-categories",
      title: "Todas as Categorias",
      description: "Praticaste todas as categorias disponíveis.",
      icon: "Map",
    },
    {
      id: "thousand-answers",
      title: "1000 Perguntas",
      description: "Respondeste a 1000 perguntas no total.",
      icon: "Crown",
    },
  ]
