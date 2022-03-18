import { Text } from 'react-native'

import { Theme } from './theme'
import { createComponent } from './component'
import {
  opacity,
  typography,
  spacing,
  OpacityProps,
  SpacingProps,
  TypographyProps
} from './modifiers'

export type TextProps<T extends Theme> =
  & OpacityProps<T>
  & TypographyProps<T>
  & SpacingProps<T>

export const textModifier = [
  opacity,
  typography,
  spacing
]

export function createText<
  T extends Theme,
  P = React.ComponentProps<typeof Text> & { children?: React.ReactNode }
>(BaseComponent: React.ComponentType<any> = Text) {
  return createComponent<TextProps<T> & Omit<P, keyof TextProps<T>>,T>(textModifier, BaseComponent)
}
