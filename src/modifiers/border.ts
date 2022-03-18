import { ViewStyle } from 'react-native'

import { ResponsiveValue } from '../responsive'
import { Theme } from '../theme'
import { getKeys } from '../utils'

import { createModifier } from './modifier'

export type BorderProps<T extends Theme> =
  { [key in keyof typeof colorProperties]?: ResponsiveValue<keyof T['colors'], T> }
    & { [key in keyof typeof radiusProperties]?: ResponsiveValue<keyof T['radius'], T> }
      & { [key in keyof typeof widthProperties]?: ResponsiveValue<ViewStyle[key], T>  }

const colorProperties = {
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderLeftColor: true,
  borderBottomColor: true,
  borderStartColor: true,
  borderEndColor: true,
}

const widthProperties = {
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderStyle: true,
  borderTopWidth: true,
  borderStartWidth: true,
  borderEndWidth: true,
  borderWidth: true,
}

const radiusProperties = {
  borderRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderBottomStartRadius: true,
  borderBottomEndRadius: true,
  borderTopStartRadius: true,
  borderTopEndRadius: true,
}

export const borders = [
  ...getKeys(widthProperties).map(property => createModifier({ property })),
  ...getKeys(colorProperties).map(property => createModifier({ property, themeKey: 'colors' })),
  ...getKeys(radiusProperties).map(property => createModifier({ property, themeKey: 'radius' }))
]
