import { default as React } from 'react'
import { View } from 'react-native'

import { createComponent } from './component'
import {
  borders,
  spacing,
  background,
  shadow,
  opacity,
  layout,
  position,
  BorderProps,
  SpacingProps,
  OpacityProps,
  ShadowProps,
  PositionProps,
  LayoutProps,
  BackgroundProps,
} from './modifiers'
import { Theme } from './theme'

export type BoxProps<T extends Theme> =
  & BackgroundProps<T>
  & BorderProps<T>
  & LayoutProps<T>
  & OpacityProps<T>
  & PositionProps<T>
  & ShadowProps<T>
  & SpacingProps<T>

export const boxModifiers = [
  background,
  borders,
  layout,
  opacity,
  position,
  shadow,
  spacing,
]

export function createBox<
  T extends Theme,
  P = React.ComponentProps<typeof View> & { children?: React.ReactNode }
>(BaseComponent: React.ComponentType<any> = View) {
  return createComponent<BoxProps<T> & Omit<P, keyof BoxProps<T>>,T>(boxModifiers, BaseComponent)
}
