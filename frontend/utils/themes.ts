// utils/themes.ts
export const themes = {
  emerald: {
    from: "#10b981", // emerald-500
    via: "#0d9488", // teal-600
    to: "#06b6d4", // cyan-500
  },
  indigo: {
    from: "#6366f1", // indigo-500
    via: "#4f46e5", // indigo-600
    to: "#3b82f6", // blue-500
  },
  rose: {
    from: "#f43f5e", // rose-500
    via: "#e11d48", // rose-600
    to: "#fb7185", // pink-400
  },
} as const

export type ThemeName = keyof typeof themes
