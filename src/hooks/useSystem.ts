import { useMemo } from 'react'
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native'

import { Dimensions, Theme } from '../theme'
import { NativeStyle } from '../types'
import { composeModifers } from '../modifiers/modifier'
import { getKeys } from '../utils'

import { useTheme } from './useTheme'
import { useDimensions } from './useDimensions'

function cleanSystemProps<S, P extends Record<string, unknown> & S>(props: P, omit: Record<keyof P, boolean>) {
  return getKeys(props).reduce(
    ({ cleaned, systemProps, serializedProps }, key) => {
      if (omit[key as keyof P]) {
        return {
          cleaned,
          systemProps: { ...systemProps, [key]: props[key] },
          serializedProps: `${serializedProps}${key}:${props[key]};`,
        }
      } else {
        return {
          cleaned: { ...cleaned, [key]: props[key] },
          systemProps,
          serializedProps,
        }
      }
    },
    { cleaned: {}, systemProps: {}, serializedProps: ''} as {
      cleaned: P
      systemProps: S
      serializedProps: string
    }
  )
}

export function useSystem<
  T extends Theme,
  S extends Record<string, any>,
  P extends S & { style?: StyleProp<NativeStyle> }
>(
  composed: {
    build: <IP extends P>(
      props: IP,
      {
        theme,
        dimensions,
      }: {
        theme: T;
        dimensions: Dimensions;
      },
    ) => ViewStyle | TextStyle | ImageStyle
    properties: (keyof P)[];
    propertiesMap: Record<keyof P, boolean>;
  },
  props: P
) {
  const theme = useTheme<T>()
  const dimensions = useDimensions()

  const { 
    cleaned,
    systemProps,
    serializedProps
  } = cleanSystemProps(props, composed.propertiesMap)

  const calculated = useMemo(
    () => {
      const styles = composed.build(
        systemProps as P, 
        { 
          theme, 
          dimensions 
        }
      )

      return [styles, props.style].filter(Boolean)
    },
    [theme, dimensions, props.style, serializedProps, composed]
  )

  return { ...cleaned, style: calculated }
}
