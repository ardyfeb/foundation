import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type NativeStyle = ViewStyle | TextStyle | ImageStyle

export type NativeStyleProperty =
  | keyof ViewStyle
  | keyof TextStyle
  | keyof ImageStyle

export type PropValue = string | number | undefined | null

export type AnyObject = Record<string, any>

export type ValueOf<T> = T[keyof T]
