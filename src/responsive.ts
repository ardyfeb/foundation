import { ModifierTransformer } from './modifiers/modifier'
import { Breakpoint, Dimensions, isThemeKey, Theme } from './theme'
import { PropValue, ValueOf } from './types'
import { getKeys } from './utils'

export type AtLeastOneResponsiveValue<
  V,
  T extends Theme,
  B = T['breakpoints'],
  R = { [Key in keyof B]: Record<Key, V> }
> = Partial<{ [K in keyof B]: V }> & R[keyof R]

export type ResponsiveValue<V, T extends Theme> =
  | V
  | AtLeastOneResponsiveValue<V, T>;

export function getBreakpointWidth(br: Breakpoint): number {
  if (typeof br == 'object') {
    return br.width
  }

  return br
}

export function getValueForScreenSize<T extends Theme, V>(
  params: {
    responsiveValue: AtLeastOneResponsiveValue<V, T>
    breakpoints: T['breakpoints']
    dimensions: Dimensions
  }
): V | undefined {
  const sorted = Object.entries(params.breakpoints).sort(
    (a,  b) => {
      return getBreakpointWidth(a[1]) - getBreakpointWidth(b[1])
    }
  )

  const { width, height } = params.dimensions

  return sorted.reduce<V | undefined>(
    (acc, [key, value]) => {
      if (typeof value == 'object') {
        if (
          width >= value.width &&
          height >= value.height &&
          params.responsiveValue[key] != undefined
        ) {
          return params.responsiveValue[key] as V
        }
      } else if (width >= value && params.responsiveValue[key] != undefined) {
        return params.responsiveValue[key] as V
      }

      return acc
    },
    undefined
  )
}

export function isResponsiveObjectValue<T extends Theme, V>(
  val: ResponsiveValue<V, T>,
  theme: T
): val is AtLeastOneResponsiveValue<V, T> {
  if (!val) return false
  if (typeof val != 'object') return false

  return getKeys(val).reduce<boolean>(
    (acc, key) => acc && theme.breakpoints[key as string] != undefined, true
  )
}

export function getResponsiveValue<
  V extends PropValue,
  T extends Theme,
  K extends keyof T | undefined
>(
  prop: ResponsiveValue<V, T>,
  options: {
    theme: T,
    transform: ModifierTransformer<T, K, V>,
    dimensions: Dimensions,
    themeKey?: K
  }
): (K extends keyof T ? ValueOf<T[K]> : never) | V | null | undefined {
  const value = isResponsiveObjectValue(prop, options.theme)
    ? getValueForScreenSize(
      {
        responsiveValue: prop,
        breakpoints: options.theme.breakpoints,
        dimensions: options.dimensions
      }
    )
    : prop

  if (options.transform) {
    return options.transform(
      {
        value,
        theme: options.theme,
        themeKey: options.themeKey
      }
    )
  }

  const { theme, themeKey } = options

  if (isThemeKey(theme, themeKey)) {
    const keyValue = (theme[themeKey] as any)[value as string]

    if (value && keyValue == undefined) {
      throw new Error(
        `Value '${value}' does not exist in theme[${themeKey}]`
      )
    }

    return value ? keyValue : value
  }

  return value
}
