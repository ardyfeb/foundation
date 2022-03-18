import { default as React, useState, useEffect, useContext } from 'react'
import { Dimensions } from 'react-native'

import { Dimensions as DimensionsType } from '../theme'

export const DimensionsContext = React.createContext<DimensionsType>(
  {
    width: 0,
    height: 0,
  }
)

export const DimensionsProvider: React.FunctionComponent = props => {
  const [dimensions, setDimensions] = useState<DimensionsType>(
    Dimensions.get('window')
  )

  const onChange = (event: { window: DimensionsType }): void => {
    setDimensions(event.window)
  }

  useEffect(
    () => {
      const subscription = Dimensions.addEventListener('change', onChange)

      return function unmount(): void {
        subscription.remove()
      }
    },
    []
  )

  return (
    <DimensionsContext.Provider value={dimensions}>
      {props.children}
    </DimensionsContext.Provider>
  )
}

export const useDimensions = () => useContext(DimensionsContext)
