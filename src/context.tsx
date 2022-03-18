import { default as React } from 'react'

import { DimensionsProvider } from './hooks/useDimensions'
import { Theme } from './theme'

export const ThemeContext = React.createContext(
  {
    colors: {},
    spacing: 4,
    breakpoints: {},
    radius: {}
  }
)

export const ThemeProvider: React.FunctionComponent<{ theme: Theme }> = props => {
  return (
    <ThemeContext.Provider value={props.theme}>
      <DimensionsProvider>
        {props.children}
      </DimensionsProvider>
    </ThemeContext.Provider>
  )
}
