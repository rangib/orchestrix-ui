'use client'

import { useTheme as useNextTheme } from 'next-themes'

/**
 * Enhanced theme hook with additional utilities
 */
export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()
  
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'
  const isLight = currentTheme === 'light'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return {
    theme: currentTheme,
    setTheme,
    isDark,
    isLight,
    toggleTheme,
  }
}