"use client";

import { useCallback, useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { dictionaries, type Language } from "@/i18n/translations";

type Vars = Record<string, string | number>;

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}

export function useTranslation() {
  const language = useAppSelector((s) => s.settings.language) as Language;
  const dict = dictionaries[language] ?? dictionaries.pt;

  const t = useCallback(
    (key: string, vars?: Vars): string => {
      const value = getPath(dict, key);
      if (typeof value !== "string") return key;
      return interpolate(value, vars);
    },
    [dict]
  );

  const topicText = useCallback(
    (id: string): { name: string; description: string } => {
      const value = getPath(dict, `topics.${id}`) as { name: string; description: string } | undefined;
      return value ?? { name: id, description: "" };
    },
    [dict]
  );

  const levelName = useCallback(
    (id: string): string => {
      const value = getPath(dict, `levels.${id}`);
      return typeof value === "string" ? value : id;
    },
    [dict]
  );

  const achievementText = useCallback(
    (id: string): { title: string; description: string } => {
      const value = getPath(dict, `achievementDefs.${id}`) as { title: string; description: string } | undefined;
      return value ?? { title: id, description: "" };
    },
    [dict]
  );

  return useMemo(
    () => ({ t, topicText, levelName, achievementText, language }),
    [t, topicText, levelName, achievementText, language]
  );
}
