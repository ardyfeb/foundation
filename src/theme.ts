export interface Theme {
  colors: Record<string, string>
  spacing: number
  breakpoints: Record<string, Breakpoint>
  radius: Record<string, number>
  fonts: Record<string, string>
}

export type Breakpoint = number | Dimensions

export interface Dimensions {
  width: number
  height: number
}

export const createTheme = <T extends Theme>(theme: T): T => theme

export function isThemeKey<T extends Theme>(
  theme: T,
  key: keyof T | undefined
): key is keyof T {
  return !!theme[key as keyof T]
}
