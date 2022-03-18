import { useContext } from 'react'

import { Theme } from '../theme'
import { ThemeContext } from '../context'

export const useTheme = <T extends Theme>() => useContext(ThemeContext) as T
