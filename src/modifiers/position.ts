import { FlexStyle } from 'react-native'

import { getKeys } from '../utils'
import { Theme } from '../theme'
import { ResponsiveValue } from '../responsive'

import { createModifier } from './modifier'

export type PositionProps<T extends Theme> =
  & { [key in keyof typeof properties]?: ResponsiveValue<FlexStyle[key], T> }
    & { zIndex?: ResponsiveValue<number, T> }

const properties = {
  position: true,
  top: true,
  right: true,
  bottom: true,
  left: true,
  start: true,
  end: true,
}

export const position = [
  ...getKeys(properties).map(property => createModifier({ property })),
  createModifier(
    {
      property: 'zIndex',
      styleProperty: 'zIndex'
    }
  )
]
