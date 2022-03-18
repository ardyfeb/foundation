import { AnyObject } from './types'

export function getKeys<T extends AnyObject>(v: T): Array<keyof T> {
  return Object.keys(v)
}
