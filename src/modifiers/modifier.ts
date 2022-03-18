import { StyleSheet } from 'react-native'

import { Dimensions, Theme } from '../theme'
import { getResponsiveValue } from '../responsive'
import { AnyObject, NativeStyle, NativeStyleProperty } from '../types'

import { ModifierProps } from './types'

export interface Modifier<P extends Record<string, any>, T extends Theme> {
  property: keyof P
  func: ModifierFunction<P, T>
}

export interface ModifierFunction<P extends AnyObject = AnyObject, T extends Theme = Theme, S extends keyof any = string> {
  (props: P, context: { theme: T, dimensions: Dimensions }): Record<S, any>
}

export interface ModifierTransformer<T extends Theme, K extends keyof T | undefined, V> {
  (
    params: {
      value: V | undefined | null
      theme: T
      themeKey?: K
    }
  ): V | undefined | null
}

export function createModifier<
  T extends Theme = Theme,
  P extends AnyObject = AnyObject,
  S extends NativeStyleProperty = NativeStyleProperty,
  Tk extends keyof T | undefined = undefined,
  Pk extends keyof P = keyof P,
>(
  options: {
    property: Pk
    transform?: ModifierTransformer<T, Tk, P[Pk]>
    styleProperty?: S
    themeKey?: Tk
  }
) {
  const styleProp = options.styleProperty || options.property.toString()
  const func: ModifierFunction<P, T, S | Pk> = (props, { theme, dimensions }) => {
    const value = getResponsiveValue(
      props[options.property],
      {
        theme,
        dimensions,
        themeKey: options.themeKey,
        transform: options.transform!
      }
    )

    if (value == undefined) return {} as any

    return <{ [key in S | Pk]?: typeof value }>{
      [styleProp]: value
    }
  }

  return {
    property: options.property,
    themeKey: options.themeKey,
    func,
  }
}

export function composeModifers<
  T extends Theme,
  P extends ModifierProps<T>
>(modifiers: (Modifier<P, T> | Modifier<P, T>[])[]) {
  const flattened = modifiers.reduce(
    (acc: Modifier<P, T>[], mod)=> acc.concat(mod), []
  )

  const properties
   = flattened.map(func => func.property)

  const propertiesMap = properties.reduce((acc, prop) => ({ ...acc, [prop]: true }), {} as Record<keyof P, true>)
  const funcsMap = flattened.reduce((acc, each) => ({ [each.property]: each.func, ...acc }), {} as Record<keyof P, ModifierFunction<P, T, string>>)
  
  const build = (
    props: P,
    params: {
      theme: T
      dimensions: Dimensions
    }
  ): NativeStyle => {
    const styles = Object.keys(props).reduce(
      (style, prop) => {
        return {
          ...style,
          ...funcsMap[prop as keyof P](props, { theme: params.theme, dimensions: params.dimensions })
        }
      },
      {}
    )

    return StyleSheet.create({ stylesheet: styles }).stylesheet
  }

  return { build, properties, propertiesMap }
}
