import { TextStyle } from 'react-native'

import { getKeys } from '../utils'
import { Theme } from '../theme'
import { ResponsiveValue } from '../responsive'

import { createModifier } from './modifier'
import { NativeStyleProperty } from '../types'

export type TypographyProps<T extends Theme> =
  & { [key in keyof typeof properties]?: ResponsiveValue<TextStyle[key], T> }
    & { [key in keyof typeof shortProperties]?: ResponsiveValue<TextStyle[typeof shortProperties[key]], T> }
      & { font?: ResponsiveValue<keyof T['fonts'], T> }
        & { color?: ResponsiveValue<keyof T['colors'], T> }

const properties = {
  fontStyle: true,
  lineHeight: true,
  textAlign: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  textTransform: true,
}

const shortProperties = {
  size: 'fontSize',
  weight: 'fontWeight',
  spacing: 'letterSpacing'
} as const

export const typography = [
  ...getKeys(properties).map(property => createModifier({ property })),
  ...getKeys(shortProperties).map(
    property => {
      const styleProperty = shortProperties[property] as NativeStyleProperty

      return createModifier(
        {
          property,
          styleProperty
        }
      )
    }
  ),
  createModifier(
    {
      property: 'font',
      styleProperty: 'fontFamily',
      themeKey: 'fonts'
    }
  ),
  createModifier(
    {
      property: 'color',
      styleProperty: 'color',
      themeKey: 'colors'
    }
  )
]
