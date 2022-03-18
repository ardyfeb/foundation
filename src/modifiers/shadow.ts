import { ViewStyle } from 'react-native'

import { Theme } from '../theme'
import { ResponsiveValue } from '../responsive'
import { getKeys } from '../utils'

import { createModifier } from './modifier'

export type ShadowProps<T extends Theme> =
  & { [key in keyof typeof properties]?: ResponsiveValue<ViewStyle[key], T> }
    & { shadowColor?: ResponsiveValue<keyof T['colors'], T> }

const properties = {
  shadowOpacity: true,
  shadowOffset: true,
  shadowRadius: true,
  elevation: true,
}

export const shadow = [
  ...getKeys(properties).map(property => createModifier({ property })),
  createModifier(
    {
      property: 'shadowColor',
      themeKey: 'colors'
    }
  )
]
