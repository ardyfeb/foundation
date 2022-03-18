import { Theme } from '../theme'
import { ResponsiveValue } from '../responsive'

import { createModifier } from './modifier'

export interface BackgroundProps<T extends Theme> {
  bgColor?: ResponsiveValue<keyof T['colors'], T>
}

export const background = createModifier(
  {
    property: 'bgColor',
    styleProperty: 'backgroundColor',
    themeKey: 'colors'
  }
)
