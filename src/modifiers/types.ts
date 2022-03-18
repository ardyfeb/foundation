import { Theme } from '../theme'

import { LayoutProps } from './layout'
import { BorderProps } from './border'
import { PositionProps } from './position'
import { SpacingProps } from './spacing'
import { TypographyProps } from './typography'
import { BackgroundProps } from './background'


export type ModifierProps<T extends Theme> =
  & SpacingProps<T>
  & BorderProps<T>
  & PositionProps<T>
  & LayoutProps<T>
  & TypographyProps<T>
  & BackgroundProps<T>
