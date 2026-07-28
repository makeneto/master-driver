"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export function HtmlLangSync() {
  const language = useAppSelector((s) => s.settings.language);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}
