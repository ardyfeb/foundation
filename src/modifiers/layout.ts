import { FlexStyle } from 'react-native'

import { ResponsiveValue } from '../responsive'
import { Theme } from '../theme'
import { getKeys } from '../utils'

import { createModifier } from './modifier'

export type LayoutProps<T extends Theme> = {
  [key in keyof typeof properties]?: ResponsiveValue<FlexStyle[key], T>
}

const properties = {
  width: true,
  height: true,
  minWidth: true,
  maxWidth: true,
  minHeight: true,
  maxHeight: true,
  overflow: true,
  aspectRatio: true,
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  justifyContent: true,
  flex: true,
  flexBasis: true,
  flexDirection: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,
}

export const layout = [
  ...getKeys(properties).map(property => createModifier({ property }))
]
