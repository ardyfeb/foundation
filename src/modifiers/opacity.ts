import { Theme } from '../theme'
import { ResponsiveValue } from '../responsive'

import { createModifier } from './modifier'

export interface OpacityProps<T extends Theme> {
  opacity?: ResponsiveValue<number, T>
}

export const opacity = createModifier(
  {
    property: 'opacity'
  }
)
