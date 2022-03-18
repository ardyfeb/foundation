import { ResponsiveValue } from '../responsive'
import { Theme } from '../theme'
import { NativeStyleProperty } from '../types'
import { getKeys } from '../utils'

import { createModifier } from './modifier'

export type SpacingProps<T extends Theme> = {
  [key in keyof typeof properties]?: ResponsiveValue<number, T>
}

const properties = {
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  ms: 'marginStart',
  me: 'marginEnd',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  ps: 'paddingStart',
  pe: 'paddingEnd'
}

export const spacing = getKeys(properties).map(
  property => {
    const styleProperty = properties[property] as NativeStyleProperty

    return createModifier(
      {
        property,
        styleProperty,
        themeKey: 'spacing',
        transform: ({ theme, value }) => value ? theme.spacing * value : undefined
      }
    )
  }
)
