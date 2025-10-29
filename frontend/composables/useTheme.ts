// composables/useTheme.ts
import { themes, type ThemeName } from "@/utils/themes"

export const useTheme = () => {
  const current = useState<ThemeName>("theme", () => "emerald")

  const applyTheme = (name: ThemeName) => {
    const theme = themes[name]
    if (!theme) return

    const root = document.documentElement
    root.style.setProperty("--theme-from", theme.from)
    root.style.setProperty("--theme-via", theme.via)
    root.style.setProperty("--theme-to", theme.to)
    current.value = name
    localStorage.setItem("theme", name)
  }

  const initTheme = () => {
    const saved = localStorage.getItem("theme") as ThemeName
    applyTheme(saved || current.value)
  }

  return {
    current,
    applyTheme,
    initTheme,
  }
}
